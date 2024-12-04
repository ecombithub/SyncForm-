import React from 'react'
import blog1 from '../images/blog1.png';
import cancle1 from '../images/cancle1.png'
import { useState } from 'react';
import '../index.css';

export default function Support() {
    const [showPopup, setShowPopup] = useState(false);


    const handleShow = () => {
        setShowPopup(!showPopup);
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
                            <div className="form_builder_support_btn_first">
                                <p>Live chat</p>
                            </div>
                            <div className="form_builder_support_btn_second" onClick={handleShow}>
                                <p>Submit a ticket</p>
                            </div>
                        </div>

                    </div>
                    <div className='form-builder-wrap-popup-inputs'>
                        {showPopup && (
                            <div className="popup">
                                <div className="popup-content">
                                    <div className="it-services">
                                        <h2>IT Service Ticket</h2>
                                        <p>Please provide the details of the problem</p>
                                        <div className="service-form-input">
                                            <div className="servies-input">
                                                <label htmlFor="name">Name</label>
                                                <input type="name" />
                                            </div>
                                            <div className="servies-input">
                                                <label htmlFor="email">E-mail</label>
                                                <input type="email" />
                                            </div>
                                            <div className="servies-input">
                                                <label htmlFor="Department">Department</label>
                                                <input type="test" />
                                            </div>
                                            <div className="servies-input">
                                                <label htmlFor="Computer ID">Computer ID</label>
                                                <input type="test" />
                                            </div>
                                            <div className="servies-input textarea">
                                                <label htmlFor="Describe the Problem">Describe the Problem</label>
                                                <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                                            </div>
                                        </div>
                                        <div className="it-service-icon" onClick={handleHide}>
                                            <img src={cancle1} alt="" />
                                        </div>
                                        <button className='btn'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        )}
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

        </div>
    )
}
