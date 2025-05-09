import React, { useEffect, useState, useRef } from 'react';
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
    const [numberValue, setNumberValue] = useState(50);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userPlan, setUserPlan] = useState(null);
    const [upgradePopup, setUpgradePopup] = useState(false);
    const [activeBrand, setActiveBrand] = useState('active');
    const [numberPopup, setNumberPopup] = useState(false);
    const [emailPopup, setEmailPopup] = useState(false);

    const navigator = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/get-shop/${shop}`);
                setStatus(response.data.data.status); 
                setNumberValue(response.data.data.numberValue || 50);
            } catch (error) {
                console.error('Error fetching shop status:', error);
            }
        };
    
        fetchStatus();
    }, [shop, apiUrl]);

    useEffect(() => {
        if (status === 'active' && numberValue >= 50) {
            sendData();
        }
    }, [status, numberValue]);

    const handleNumberChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 50) {
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
        if (!['pro', 'pro-plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
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
          };
      
          const response = await axios.post(`${apiUrl}/api/save-shop`, postData);
      
          if (response.status === 5001) {
            console.log('Data processed successfully. Email will be sent when submission count matches.');
          
            console.log('Status set to disactive immediately after email submission.');
          }
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/save-shop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({shop,notificationsEmail: email, notificationsPassword:password })
            });

            const result = await response.json();
            if (response.ok) {
                setEmailPopup(true);
                setEmail('');
                setPassword('');

            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleBrandLogo = () => {
        if (!['pro', 'pro-plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUpgradePopup(true);
            return;
        }

        const newStatus = activeBrand === 'active' ? 'disactive' : 'active';
        setActiveBrand(newStatus);
    };

    useEffect(() => {
        let timeoutId;
    
        const sendStatusUpdate = async () => {
            console.log('Sending brandLogoStatus:', activeBrand); 
    
            try {
                const response = await fetch(`${apiUrl}/api/save-shop`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ brandLogoStatus: activeBrand, shop }),
                });
    
                const data = await response.json();
                console.log('API response:', data);
            } catch (error) {
                console.error('Error updating brand logo status:', error);
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
                const response = await axios.get(`${apiUrl}/get/save-shop/${shop}`);
                setActiveBrand(response.data.brandLogoStatus);
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

            {emailPopup && <div className='form_builder_plan_upgrade_popup connect '>
                <div className='form_builder_plan_upgrade_popup_wrapp connect-email'>
                    <p>Congratulations</p>
                    <div className="form_builder_connect_wraped">
                        <p>Your email has been successfully connect with the SyncForm.</p>
                    </div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={() => setEmailPopup(false)}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div >}

            {numberPopup && <div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp records-number '>
                    <p>Enter At Least 50 Records</p>

                    <div className="form_builder_upgrade_popup_cancle" onClick={handleNumbercancle}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>}

            <div className='form_builder_setting_page'>
                <div className="container">
                    <div className="form_builder_setting_title">
                        <h1>Settings</h1>
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
                        {/* <div className='form_builder_complte_toggle_wraped'>
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
                        </div> */}

                        <div className='form_builder_complte_toggle_wraped'>
                            <div className='form_builder_action_status'>
                                <p>Set Submission Notification Count</p>
                                <div className='form_builder_action_number'>
                                    <input
                                        type="number"
                                        value={numberValue}
                                        onChange={handleNumberChange}
                                    />
                                    <label>Enter at least 50 records</label>
                                </div>
                            </div>
                            <span>Choose how  many form responses are collected before triggering an email within a CSV file. By default, this is set to 50 submissions, but you can adjust it to a higher number based on your needs.</span>
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
                                    <span>
                                        <p>
                                            Note: An app password is a security code that allows authorized apps access to your email and is different from your email password. To generate an App Password,
                                            <a target='_blank' href="https://syncform.app/blogs/generate-app-password.html">
                                                <span style={{ fontFamily: "italic", fontWeight: "bold" }}> Click here</span>
                                            </a>.
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <button className='form_email_btn' type="submit" style={{ cursor: "pointer" }}>Submit</button>

                        </form>

                    </div>
                </div>
                <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-and-condition.html">Terms and Conditions</a></div>
            </div>
        </>
    );
}
