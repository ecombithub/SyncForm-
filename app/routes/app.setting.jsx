import React, { useEffect, useState } from 'react';
import '../index.css';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import axios from 'axios';

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    console.log("Session Data:", session);

    const shop = session?.shop || null;
    const accessToken = session?.accessToken || null;

    if (!shop || !accessToken) {
        console.error("Error: Missing shop or access token in session.");
        return {
            assets: [],
            shop: null,
            apiUrl: process.env.PUBLIC_REACT_APP_API_URL,
            shopData: null,
            error: true,
            accessToken: null,
            errorMessage: "Missing shop or access token in session.",
        };
    }

    const response = {
        assets: [],
        shop,
        apiUrl: process.env.PUBLIC_REACT_APP_API_URL,
        shopData: null,
        error: false,
        accessToken,
        errorMessage: ''
    };

    console.log("Shop:", shop);

    try {
        const assetResponse = await fetch(`https://${shop}/admin/api/${apiVersion}/assets.json`, {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
        });

        if (!assetResponse.ok) {
            const errorText = await assetResponse.text();
            throw new Error(`Failed to fetch assets: ${errorText}`);
        }

        const assetData = await assetResponse.json();
        response.assets = assetData.assets || [];

        const shopQuery = `
        {
          shop {
            name
            email
            myshopifyDomain
            primaryDomain {
              host
            }
          }
        }`;

        const shopResponse = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: shopQuery }),
        });

        if (!shopResponse.ok) {
            const errorText = await shopResponse.text();
            throw new Error(`Failed to fetch shop data: ${errorText}`);
        }

        const shopData = await shopResponse.json();
        response.shopData = shopData.data.shop;

        console.log("Shop Data:", response.shopData);

    } catch (err) {
        console.error("Error fetching data:", err.message);
        response.error = true;
        response.errorMessage = err.message;
    }

    return response;
};



export default function Setting() {
    const { shop, apiUrl } = useLoaderData() || {};
    const shopData = { email: 'sahil@hubsyntax.com' };
    const [status, setStatus] = useState('disactive');
    const [numberValue, setNumberValue] = useState(10);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${apiUrl}/get-status/${shop}`);
                setStatus(response.data.status);
                setNumberValue(response.data.numberValue || 10);
                console.log(`Fetched Status: ${response.data.status}`);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        fetchStatus();
    }, [shop, apiUrl]);

    useEffect(() => {
        if (status === 'active' && numberValue >= 10) {
            sendData();
        }
    }, [status, numberValue]);

    const handleNumberChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 10) {
            setNumberValue(value);
        } else {
            alert("Enter at least 10 forms.");
        }
    };

    const toggleStatus = () => {
        setStatus(prevStatus => (prevStatus === 'active' ? 'disactive' : 'active'));
    };

    const sendData = async () => {
        try {
            const postData = {
                status,
                numberValue,
                shop,
                shopData,
            };

            console.log("Sending Data:", postData);
            const response = await axios.post(`${apiUrl}/user-email`, postData);
            console.log("Response:", response.data);

            if (response.data.message === 'Email will be sent when form count matches.') {
                const statusResponse = await axios.get(`${apiUrl}/get-status/${shop}`);
                setStatus(statusResponse.data.status);
                console.log(`Updated Status: ${statusResponse.data.status}`);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/save-settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ shop, email, password })
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Settings saved successfully!');
                setEmail('');
                setPassword('');
    
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className='form_builder_setting_page'>
            <div className="container">
                <div className="form_builder_setting_title">
                    <h2>Settings</h2>
                </div>
                <div className='form_builder_complte_actions'>
                    <div className='form_builder_action_status'>
                        <p>Click the button to automatically send data and complete the action.</p>
                        <div className="toggle-switched">
                            <input
                                type="checkbox"
                                id="status-toggle"
                                checked={status === 'active'}
                                onChange={toggleStatus}
                                className="toggle-checkboxed"
                            />
                        </div>
                    </div>
                    <div className='form_builder_action_status'>
                        <p>Enter the number of forms you want to send at once.</p>
                        <div className='form_builder_action_number'>
                            <input
                                type="number"
                                value={numberValue}
                                onChange={handleNumberChange}
                            />
                            <label>Enter at least 10 forms.</label>
                        </div>
                    </div>
                </div>
                <div className='form_builder_complte_actions'>
                    <div className='form_builder_comple_email'> <p>Enter your email to receive the data.</p></div>
                    <form onSubmit={handleSubmit}>
                        <div className='form_builder_complte_forms'>
                           <div className='form_build_inputs'>
                           <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Your email'
                                required
                            />
                           </div>
                            <div className='form_build_inputs'>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                     placeholder='Your Password'
                                    required
                                />
                            </div>
                        </div>
                        <button className='form_email_btn' type="submit">Submit</button>
                        {message && <p style={{color:"red"}}>{message}</p>}
                    </form>
                   
                </div>
            </div>
            <div className='form-builder-add-text-wraped'>The form builder app by <span style={{ fontWeight: '600', color: '#686767' }}>HubsyntaxApp</span> | Privacy policy | Terms and conditions</div>
        </div>
    );
}
