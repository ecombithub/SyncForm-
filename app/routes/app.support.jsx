import React from 'react'
import blog1 from '../images/blog1.png';
import cancle1 from '../images/cancle1.png'
import { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
    const { shop, accessToken } = session;

    const response = {
        assets: [],
        shop,
        apiUrl,
        error: false,
        accessToken,
        errorMessage: ''
    };

    console.log(shop);

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

    } catch (err) {
        console.error("Error fetching data:", err.message);
        response.error = true;
        response.errorMessage = err.message;
    }

    return response;
};

export default function Support() {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [theme, setTheme] = useState('');
    const [shop, setShop] = useState('');
    const [describe, setDescribe] = useState('');
    const { apiUrl } = useLoaderData() || {};

    const handleSubmit = async () => {
        if (!shop || !name || !email || !category || !theme || !describe) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/email-submit`, {
                name,
                email,
                category,
                theme,
                shop,
                describe
            });
            console.log('Response status:', response.status);
            if (response.status === 200) {
                alert('Form submitted successfully!');
                setName('');
                setEmail('');
                setCategory('');
                setTheme('');
                setShop('');
                setDescribe('');
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const handleShow = () => {
        setShowPopup(!showPopup);
        setName('');
        setEmail('');
        setCategory('');
        setTheme('');
        setShop('');
        setDescribe('');
    }
    const handleHide = () => {
        setShowPopup(!showPopup);
    }
    return (
        <div className='form_builder_support'>
            <div className="container">
                <div className="form_builder_support_title">
                    <h2>Help and support</h2>
                </div>
                <div className='form_builder_help_support'>
                    <div className="form_build_help_show">
                        <h4>Contact support</h4>
                        <p>Need Assistance? Our live chat support is ready to assist you in real-time. Connect with us now and experience speedy solutions to all your questions and concerns!</p>
                        <div className="form_builder_support_btn">
                            <div className="form_builder_support_btn_first" onClick={() => {
                                window.tidioChatApi?.open();
                            }}>
                                <p>Live chat</p>
                            </div>
                            <div className="form_builder_support_btn_second" onClick={handleShow}>
                                <p>Submit a ticket</p>
                            </div>
                        </div>

                    </div>

                    <div className="form_build_help_show know">
                        <h4>Knowledge base & roadmap</h4>
                        <p>In case you have any questions or difficulties setting up the app, you can check our Knowledge base.</p>
                        <div className="form_builder_support_btn">
                            <div className="form_builder_support_btn_first">
                                <p>Knowledge base</p>
                            </div>
                            <div className="form_builder_support_btn_second">
                                <p>Roadmap</p>
                            </div>
                        </div>
                    </div>
                    <div className="form_build_help_show rate">
                        <h4>Rate our app</h4>
                        <p>We want to hear from you! Share your experience today and let's create something extraordinary together!</p>
                        <div className="form_builder_support_btn">
                            <div className="form_builder_support_btn_first">
                                <p>Leave review</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="form_builder_reasons">
                    <h2>5 Reasons Why You Need a Form Builder for Your Business</h2>
                    <p>October 20, 2024</p>
                </div>
                <div className="form_builder_convert">
                    <div className="form_builder_blogs">
                        <img src={blog1} alt="" />
                        <h3>Maximize Engagement: Tips for Designing Forms That Convert</h3>
                        <div className='form_build_blog_btn'>
                            <div className="form_blog_data oct">
                                October 05, 2024
                            </div>
                            <div className="form_blog_data">
                                Read more
                            </div>
                        </div>
                    </div>
                    <div className="form_builder_blogs">
                        <img src={blog1} alt="" />
                        <h3>Maximize Engagement: Tips for Designing Forms That Convert</h3>
                        <div className='form_build_blog_btn'>
                            <div className="form_blog_data oct">
                                October 05, 2024
                            </div>
                            <div className="form_blog_data">
                                Read more
                            </div>
                        </div>
                    </div>
                    <div className="form_builder_blogs">
                        <img src={blog1} alt="" />
                        <h3>Maximize Engagement: Tips for Designing Forms That Convert</h3>
                        <div className='form_build_blog_btn'>
                            <div className="form_blog_data oct">
                                October 05, 2024
                            </div>
                            <div className="form_blog_data">
                                Read more
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-builder-wrap-popup-inputs'>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className="it-services">
                                <h2>Support ticket</h2>
                                <p>Please provide the details of the problem</p>
                                <div className="service-form-input">
                                    <div className="servies-input">
                                        <label htmlFor="name">Name</label>
                                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="servies-input">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="servies-input">
                                        <label htmlFor="Department">Category</label>
                                        <input type="test" value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </div>
                                    <div className="servies-input">
                                        <label htmlFor="Computer ID">Theme ID or Collaborator Code</label>
                                        <input type="test" value={theme} onChange={(e) => setTheme(e.target.value)} />
                                    </div>
                                    <div className="servies-input shop">
                                        <label htmlFor="Shop">Shop</label>
                                        <input type="test" value={shop} onChange={(e) => setShop(e.target.value)} />
                                    </div>
                                    <div className="servies-input textarea">
                                        <label htmlFor="Describe the Problem">Describe the Problem</label>
                                        <textarea id="w3review" name="w3review" rows="4" cols="50" value={describe} onChange={(e) => setDescribe(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="it-service-icon" onClick={handleHide}>
                                    <img src={cancle1} alt="" />
                                </div>
                                <button className='btn' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
