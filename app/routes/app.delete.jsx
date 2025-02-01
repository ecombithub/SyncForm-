// // import React, { useState } from 'react';
// // import { useSubmit, useActionData, useLoaderData } from "@remix-run/react";
// // import axios from 'axios';
// // import { authenticate, apiVersion } from "../shopify.server";

// // export const loader = async ({ request }) => {
// //     const { session } = await authenticate.admin(request);
// //     const { shop, accessToken } = session;

// //     try {
// //         const response = await axios.get(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, {
// //             headers: {
// //                 'X-Shopify-Access-Token': accessToken,
// //                 'Content-Type': 'application/json',
// //             },
// //         });
// //         return { charges: response.data.recurring_application_charges || [], shop };
// //     } catch (error) {
// //         console.error('Error fetching current charges:', error);
// //         return { charges: [], error: error.message || 'Error fetching charges' };
// //     }
// // };

// // export const action = async ({ request }) => {
// //     console.log("Action function called");
// //     const { session } = await authenticate.admin(request);
// //     console.log("Session data:", session);

// //     const formData = new URLSearchParams(await request.text());
// //     const chargeId = formData.get('charge_id');
// //     console.log("Charge ID received:", chargeId);

// //     try {
// //         const { shop, accessToken } = session;
// //         console.log(`Sending DELETE request to: https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${chargeId}.json`);

// //         const response = await fetch(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${chargeId}.json`, {
// //             method: "DELETE",
// //             headers: {
// //                 'X-Shopify-Access-Token': accessToken,
// //                 'Content-Type': 'application/json',
// //             },
// //         });

// //         console.log("Response status:", response.status);

       
// //         if (!response.ok) {
// //             const errorMessage = await response.text();
// //             console.error("Error response body:", errorMessage);
// //             throw new Error('Failed to delete charge: ' + errorMessage);
// //         }

// //         console.log("Charge deleted successfully!");
// //         return { success: true, chargeId };
// //     } catch (error) {
// //         console.error('Error deleting charge:', error);
// //         return { 
// //             success: false, 
// //             message: error.message || 'Error deleting charge'
// //         };
// //     }
// // };

// // function Delete() {
// //     const submit = useSubmit();
// //     const actionData = useActionData();
// //     const { charges, error } = useLoaderData();
// //     const [updatedCharges, setUpdatedCharges] = useState(charges);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [loadingChargeId, setLoadingChargeId] = useState(null);

// //     const handleDelete = async (chargeId) => {
// //         if (loadingChargeId === chargeId || isSubmitting) return;
// //         setLoadingChargeId(chargeId);
// //         setIsSubmitting(true);
    
// //         try {
// //             const formData = new URLSearchParams();
// //             formData.append('charge_id', chargeId);
// //             await submit(formData, { method: 'delete' });

// //             setUpdatedCharges(prevCharges => 
// //                 prevCharges.filter(charge => charge.id !== Number(chargeId))
// //             );

// //             console.log('Charge deleted successfully!', { success: true, chargeId });
// //         } catch (error) {
// //             console.error('Error during submit:', error);
// //         } finally {
// //             setLoadingChargeId(null);
// //             setIsSubmitting(false);
// //         }
// //     };

// //     return (
// //         <>
// //             {error && <p className="error">Error: {error}</p>}
// //             {updatedCharges.length === 0 ? (
// //                 <p>No recurring charges found.</p>
// //             ) : (
// //                 updatedCharges.map(charge => (
// //                     <div key={charge.id} className="charge-item">
// //                         <h4>Charge Details</h4>
// //                         <p><strong>ID:</strong> {charge.id}</p>
// //                         <p><strong>Name:</strong> {charge.name}</p>
// //                         <p><strong>Price:</strong> {charge.price}</p>
// //                         <p><strong>Billing On:</strong> {charge.billing_on}</p>
// //                         <p><strong>Status:</strong> {charge.status}</p>
// //                         <p><strong>Return URL:</strong> {charge.return_url}</p>
// //                         <button 
// //                             onClick={() => handleDelete(charge.id)} 
// //                             disabled={loadingChargeId === charge.id || isSubmitting}
// //                         >
// //                             {loadingChargeId === charge.id ? 'Deleting...' : 'Delete Charge'}
// //                         </button>
// //                     </div>
// //                 ))
// //             )}
// //         </>
// //     );
// // }

// // export default Delete;


// // export const loader = async ({ request }) => {
// //     const { session } = await authenticate.admin(request);
// //     const { shop, accessToken } = session;
// //     console.log('Access Token:', accessToken);
// //     console.log('Shop:', shop);
// //     try {
// //         const response = await axios.get(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, {
// //             headers: {
// //                 'X-Shopify-Access-Token': accessToken,
// //                 'Content-Type': 'application/json',
// //             },
// //         });

// //         return { charges: response.data.recurring_application_charges || [], shop };
// //     } catch (error) {
// //         console.error('Error fetching current charges:', error.response ? error.response.data : error.message);
// //         return { charges: [], error: error.response ? error.response.data : error.message };
// //     }
// // };

// // export const action = async ({ request }) => {
// //     const { session } = await authenticate.admin(request);
// //     const { shop, accessToken } = session;

// //     const method = request.method.toLowerCase();
// //     const formData = await request.formData();

// //     if (method === 'post') {
// //         const selectedPlan = formData.get('plan');
// //         const chargeData = selectedPlan === 'free' ? null : {
// //             recurring_application_charge: {
// //                 name: selectedPlan === 'pro' ? 'Form Builder Pro Plan' : selectedPlan === 'pro_plus' ? 'Form Builder Pro Plus Plan' : 'Form Builder Pro Yearly Plan',
// //                 price: selectedPlan === 'pro' ? 10.00 : selectedPlan === 'pro_plus' ? 20.00 : 99.90,
// //                 return_url: `https://${shop}/admin/apps/form-builder-hub/app/pricing`,
// //                 trial_days: 7,
// //                 test: true,
// //             }
// //         };

// //         console.log('Charge data being sent:', JSON.stringify(chargeData, null, 2));

// //         try {
// //             const response = await axios.post(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, chargeData, {
// //                 headers: {
// //                     'X-Shopify-Access-Token': accessToken,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });

// //             console.log('Recurring Application Charge created:', response.data);
// //             const confirmationUrl = response.data.recurring_application_charge.confirmation_url;
// //             return { success: true, confirmationUrl };
// //         } catch (error) {
// //             console.error('Error creating charge:', error.response ? error.response.data : error.message);
// //             return { success: false, message: error.response ? error.response.data : error.message };
// //         }
// //     }

// //     if (method === 'delete') {
// //         const chargeId = formData.get('charge_id');
// //         console.log("Charge ID received:", chargeId);

// //         try {
// //             const response = await axios.delete(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${chargeId}.json`, {
// //                 headers: {
// //                     'X-Shopify-Access-Token': accessToken,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });

// //             if (response.status !== 200) {
// //                 throw new Error('Failed to delete charge');
// //             }

// //             console.log("Charge deleted successfully!");
// //             return { success: true, chargeId };
// //         } catch (error) {
// //             console.error('Error deleting charge:', error);
// //             return { success: false, message: error.message || 'Error deleting charge' };
// //         }
// //     }
// // };


// import React, { useState } from 'react';
// import { useSubmit, useActionData, useLoaderData } from "@remix-run/react";
// import axios from 'axios';
// import { authenticate, apiVersion } from "../shopify.server";

// export const loader = async ({ request }) => {
//     const { session } = await authenticate.admin(request);
//     const { shop, accessToken } = session;

//     const query = `
//       {
//         currentAppInstallation {
//           activeSubscriptions {
//             id
//             name
//             status
//             lineItems {
//               plan {
//                 pricingDetails {
//                   ... on AppRecurringPricing {
//                     price {
//                       amount
//                       currencyCode
//                     }
//                   }
//                 }
//               }
//             }
//             test
//           }
//         }
//       }
//     `;

//     try {
//         const response = await axios.post(
//             `https://${shop}/admin/api/${apiVersion}/graphql.json`,
//             { query },
//             {
//                 headers: {
//                     'X-Shopify-Access-Token': accessToken,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         if (response.data && response.data.data && response.data.data.currentAppInstallation) {
//             const subscriptions = response.data.data.currentAppInstallation.activeSubscriptions || [];

//             if (subscriptions.length > 0) {
//                 return { charges: subscriptions, shop };
//             }
//         }

//         const restResponse = await axios.get(
//             `https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`,
//             {
//                 headers: {
//                     'X-Shopify-Access-Token': accessToken,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         return { charges: restResponse.data.recurring_application_charges || [], shop };
//     } catch (error) {
//         console.error('Error fetching current charges:', error);
//         return { charges: [], error: error.message || 'Error fetching charges' };
//     }
// };

// export const action = async ({ request }) => {
//     console.log("Action function called");
//     const { session } = await authenticate.admin(request);
//     console.log("Session data:", session);

//     const formData = new URLSearchParams(await request.text());
//     const chargeId = formData.get('charge_id');
//     console.log("Charge ID received:", chargeId);

//     const mutation = `
//         mutation {
//             appSubscriptionCancel(id: "${chargeId}") {
//                 userErrors {
//                     field
//                     message
//                 }
//             }
//         }
//     `;

//     try {
//         const { shop, accessToken } = session;
//         console.log(`Sending DELETE request via GraphQL for charge ID: ${chargeId}`);

//         const response = await axios.post(
//             `https://${shop}/admin/api/${apiVersion}/graphql.json`,
//             { query: mutation },
//             {
//                 headers: {
//                     'X-Shopify-Access-Token': accessToken,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         const userErrors = response.data.data.appSubscriptionCancel.userErrors;
//         if (userErrors.length > 0) {
//             const errorMessage = userErrors.map(error => error.message).join(', ');
//             console.error("Error canceling charge:", errorMessage);
//             throw new Error('Failed to delete charge: ' + errorMessage);
//         }

//         console.log("Charge deleted successfully!");
//         return { success: true, chargeId };
//     } catch (error) {
//         console.error('Error deleting charge via GraphQL:', error);
//         return { 
//             success: false, 
//             message: error.message || 'Error deleting charge'
//         };
//     }
// };


// function Setting() {
//     const submit = useSubmit();
//     const actionData = useActionData();
//     const { charges, error } = useLoaderData();
//     const [updatedCharges, setUpdatedCharges] = useState(charges);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [loadingChargeId, setLoadingChargeId] = useState(null);

//     const handleDelete = async (chargeId) => {
//         if (loadingChargeId === chargeId || isSubmitting) return;
//         setLoadingChargeId(chargeId);
//         setIsSubmitting(true);
    
//         try {
//             const formData = new URLSearchParams();
//             formData.append('charge_id', chargeId);
//             await submit(formData, { method: 'delete' });

//             setUpdatedCharges(prevCharges => 
//                 prevCharges.filter(charge => charge.id !== Number(chargeId))
//             );

//             console.log('Charge deleted successfully!', { success: true, chargeId });
//         } catch (error) {
//             console.error('Error during submit:', error);
//         } finally {
//             setLoadingChargeId(null);
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <>
//             {error && <p className="error">Error: {error}</p>}
//             {updatedCharges.length === 0 ? (
//                 <p>No recurring charges found.</p>
//             ) : (
//                 updatedCharges.map(charge => (
//                     <div key={charge.id} className="charge-item">
//                         <h4>Charge Details</h4>
//                         <p><strong>ID:</strong> {charge.id}</p>
//                         <p><strong>Name:</strong> {charge.name}</p>
//                         <p><strong>Price:</strong> {charge.price}</p>
//                         <p><strong>Billing On:</strong> {charge.billing_on}</p>
//                         <p><strong>Status:</strong> {charge.status}</p>
//                         <p><strong>Return URL:</strong> {charge.return_url}</p>
//                         <button 
//                             onClick={() => handleDelete(charge.id)} 
//                             disabled={loadingChargeId === charge.id || isSubmitting}
//                         >
//                             {loadingChargeId === charge.id ? 'Deleting...' : 'Delete Charge'}
//                         </button>
//                     </div>
//                 ))
//             )}
//         </>
//     );
// }

// export default Setting;






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
