import React, { useEffect, useState,useRef } from 'react';
import '../index.css';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import cancleimg from '../images/cancleimg.png';
import { Link, useNavigate } from '@remix-run/react';
import axios from 'axios';

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
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
    const { shop, apiUrl, shopData } = useLoaderData() || {};
    const [status, setStatus] = useState('disactive');
    const [numberValue, setNumberValue] = useState(5);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userPlan, setUserPlan] = useState(null);
    const [upgradePopup, setUpgradePopup] = useState(false);
    const [activeBrand, setActiveBrand] = useState('active');
    const [numberPopup, setNumberPopup] = useState(false);

    const navigator = useNavigate();

    const validateEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!value) {
            setEmailError("Email is required");
        } else if (!emailPattern.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    
        setTimeout(() => {
            setEmailError("");
        }, 3000);
    };
    
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${apiUrl}/get-status/${shop}`);
                setStatus(response.data.status);
                setNumberValue(response.data.numberValue || 5);
                
            } catch (error) {
            }
        };

        fetchStatus();
    }, [shop, apiUrl]);

    useEffect(() => {
        if (status === 'active' && numberValue >= 5) {
            sendData();
        }
    }, [status, numberValue]);

    const handleNumberChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 5) {
            setNumberValue(value);
        } else {
            setNumberPopup(true);
        }
    };

    const fetchPaymentPlan = async () => {
        try {
            const response = await axios.get(`${apiUrl}/payment/active-plan?shop=${shop}`);
            setUserPlan(response.data);
       
        } catch (error) {
        
        }
    };

    useEffect(() => {
        fetchPaymentPlan();
    })

    const toggleStatus = () => {
        if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUpgradePopup(true);
            return;
        }
        setStatus(prevStatus => (prevStatus === 'active' ? 'disactive' : 'active'));
    };

    const handleUpgrade = () => {
        navigator('/app/pricing');
    }

    const handleCancle = () => {
        setUpgradePopup(false);
    }

    const sendData = async () => {
        try {
            const postData = {
                status,
                numberValue,
                shop,
                shopData,
            };
            const response = await axios.post(`${apiUrl}/user-email`, postData);
        

            if (response.data.message === 'Email will be sent when form count matches.') {
                const statusResponse = await axios.get(`${apiUrl}/get-status/${shop}`);
                setStatus(statusResponse.data.status);
             
            }
        } catch (error) {
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
    
    const handleBrandLogo = () => {
        if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUpgradePopup(true);
            return;
        }
    
        const newStatus = activeBrand === 'active' ? 'disactive' : 'active';
        setActiveBrand(newStatus);
    };
    
    useEffect(() => {
        let timeoutId;
    
        const sendStatusUpdate = async () => {
            try {
                await fetch(`${apiUrl}/api/brandLogo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: activeBrand, shop }),
                });
            } catch (error) {
               
            }
        };
    
        if (activeBrand) {
            timeoutId = setTimeout(sendStatusUpdate, 300);
        }
    
        return () => clearTimeout(timeoutId);
    }, [activeBrand]);
    
    
    useEffect(() => {
        const fetchStatusBrand = async () => {
            try {
                const response = await axios.get(`${apiUrl}/data/brandLogo/${shop}`);
                setActiveBrand(response.data.status);
            } catch (error) {
            
            }
        };

        if (shop) {
            fetchStatusBrand();
        }
    }, [shop, apiUrl]);


    const handleNumbercancle = () => {
        setNumberPopup(false);
    }


    return (
        <>
            {upgradePopup && <div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp'>
                    <p>You need to upgrade your plan to unlock this feature</p>
                    <div className='form_builder_upgrade_choose_plan' onClick={handleUpgrade}><p>Choose plans</p></div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={handleCancle}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>}

            {numberPopup && <div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp records-number '>
                    <p>Enter At Least 5 Records</p>

                    <div className="form_builder_upgrade_popup_cancle" onClick={handleNumbercancle}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>}

            <div className='form_builder_setting_page'>
                <div className="container">
                    <div className="form_builder_setting_title">
                        <h2>Settings</h2>
                    </div>
                    <div className='form_builder_complte_actions'>
                        <div className='form_builder_complte_toggle_wraped'>
                            <div className='form_builder_action_status'>
                                <p>Submission Notification</p>
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
                            <span>Enable this option to get notified once a particular number of form submissions are completed, you will automatically receive an email containing a CSV file. This file contains all collected data without manually exporting.</span>
                        </div>
                        <div className='form_builder_complte_toggle_wraped'>
                            <div className='form_builder_action_status'>
                                <p>Brand Logo</p>
                                <div className="toggle-switched">
                                    <input
                                        type="checkbox"
                                        id="status-toggle"
                                        checked={activeBrand === 'active'}
                                        onChange={handleBrandLogo}
                                        className="toggle-checkboxed"
                                    />
                                </div>
                            </div>
                            <span>This option toggles the app logo display in your form. When enabled, the logo does not appear on the form.</span>
                        </div>

                        <div className='form_builder_complte_toggle_wraped'>
                            <div className='form_builder_action_status'>
                                <p>Set Submission Notification Count</p>
                                <div className='form_builder_action_number'>
                                    <input
                                        type="number"
                                        value={numberValue}
                                        onChange={handleNumberChange}
                                    />
                                    <label>Enter at least 5 records</label>
                                </div>
                            </div>
                            <span>Choose how  many form responses are collected before triggering an email within a CSV file. By default, this is set to 5 submissions, but you can adjust it to a higher number based on your needs.</span>
                        </div>
                    </div>
                    <div className='form_builder_complte_actions'>
                        <div className='form_builder_comple_email'> <p>Integrate Email for Form Notifications</p>
                            <span>Store owners link their email address to integrate with form. Once a user submits the form, the provided email will send or receive notifications based on the configured template.</span>
                        </div>
                        <span></span>
                        <form onSubmit={handleSubmit}>
                            <div className='form_builder_complte_forms'>
                                <div className='form_build_inputs'>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={validateEmail}
                                        placeholder='Your email'
                                        required
                                    />
                                    {emailError && <p style={{color:"red", fontSize:"14px"}} className="error-message">{emailError}</p>}
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
                                    <span>
                                        <p>
                                            Note: An app password is a security code that allows authorized apps access to your email and is different from your email password. To generate an App Password,
                                            <a target='_blank' href="https://syncform.app/blogs/generate-app-password.html">
                                                <span style={{ fontFamily: "italic" }}>Click here</span>
                                            </a>.
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <button className='form_email_btn' type="submit">Submit</button>
                            {message && <p style={{ color: "red" }}>{message}</p>}
                        </form>

                    </div>
                </div>
                <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
            </div>
        </>
    );
}
