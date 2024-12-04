import React from 'react'
import hub from '../images/hub.png';
import klaviyo from '../images/klaviyo.png';
import mail from '../images/mail.png';
import omnisend from '../images/omnisend.png';
import '../index.css';

export default function Setting() {
    return (
        <div className='form_builder_setting_page'>
            <div className="container">
                <div className="form_builder_setting_title">
                    <h2>Settings</h2>
                </div>
                <div className="form_builder_third_party">
                    <p>Third party intergration</p>
                    <div className="form_builder_third_apps">
                        <div className="forms_third_app">
                            <img src={klaviyo} alt="" />
                        </div>
                        <div className="forms_third_app">
                            <img src={mail} alt="" />
                        </div>

                        <div className="forms_third_app">
                            <img src={hub} alt="" />
                        </div>
                        <div className="forms_third_app">
                            <img src={omnisend} alt="" />
                        </div>
                    </div>
                </div>
                <div className="form_builder_customer_sync">
                    <div className="form_builder_customer_sync_setting">
                        <div className='form_import_shopify'>
                            <p>Customer sync settings</p>
                            <span>Import and sync new customer created in shopify</span>
                        </div>
                        <div className='form_builder_customer_forms_notifiaction'>
                            <div className="form_automtically_import">
                                <div className="form_checkbox_wrap data_forms">
                                    <input type="checkbox" />
                                </div>
                                <div className="form_text_wrap_auto">
                                    <p>Do not automatically import customers from shopify</p>
                                </div>
                            </div>
                            <div className="form_automtically_import two">
                                <div className="form_checkbox_wrap data_forms">
                                    <input type="checkbox" />
                                </div>
                                <div className="form_text_wrap_auto">
                                    <p>Automatically import customers from shopify</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form_builder_customer_notice">
                        <div className='form_import_shopify'>
                            <p>Customer Notifications</p>
                        </div>
                        <div className="form_builder_register_account">
                            <div className='form_builder_request first'>
                                <div className='form_builder_request_p'>
                                    <p>Sent automatically to the customer
                                        after they request register account</p>
                                </div>
                                <div className='form_builder_request_btn'>
                                    <p>Sent</p>
                                </div>
                            </div>
                            <div className='form_builder_request two'>
                                <div className='form_builder_request_p'>
                                    <p>Sent automatically to the customer when
                                        they complete their account denied</p>
                                </div>
                                <div className='form_builder_request_btn'>
                                    <p>Denied</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
