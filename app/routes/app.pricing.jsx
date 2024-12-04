import pricing1 from '../images/pricing1.png';
import pricing2 from '../images/pricing2.png';
import pricing3 from '../images/pricing3.png';
import pricing4 from '../images/pricing4.png';
import pricing5 from '../images/pricing5.png';
import pricing6 from '../images/pricing6.png';
import '../index.css';
import { authenticate, apiVersion } from "../shopify.server";
import axios from 'axios';
import { useSubmit, useActionData } from "@remix-run/react";
import React, { useState, useEffect } from 'react';
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    try {
        const response = await axios.get(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
        });
        return { charges: response.data.recurring_application_charges || [], shop };
    } catch (error) {
        console.error('Error fetching current charges:', error.response ? error.response.data : error.message);
        return { charges: [], error: error.response ? error.response.data : error.message };
    }
};

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    const method = request.method.toLowerCase();
    const formData = await request.formData();

    if (method === 'post') {
        const selectedPlan = formData.get('plan');
        const chargeData = selectedPlan === 'free' ? null : {
            recurring_application_charge: {
                name: selectedPlan === 'pro' ? 'Form Builder Pro Plan' : selectedPlan === 'pro_plus' ? 'Form Builder Pro Plus Plan' : 'Form Builder Pro Yearly Plan',
                price: selectedPlan === 'pro' ? 4.99 : selectedPlan === 'pro_plus' ? 19.90 : 99.90,
                return_url: 'https://admin.shopify.com/store/sahil-app-testing/apps/form-builder-hub/app/pricing',
                trial_days: 7,
                test: true,
            }
        };

        console.log('Charge data being sent:', JSON.stringify(chargeData, null, 2));

        try {
            const response = await axios.post(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, chargeData, {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Recurring Application Charge created:', response.data);
            const confirmationUrl = response.data.recurring_application_charge.confirmation_url;
            return { success: true, confirmationUrl };
        } catch (error) {
            console.error('Error creating charge:', error.response ? error.response.data : error.message);
            return { success: false, message: error.response ? error.response.data : error.message };
        }
    }

    if (method === 'delete') {
        const chargeId = formData.get('charge_id');
        console.log("Charge ID received:", chargeId);

        try {
            const response = await axios.delete(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${chargeId}.json`, {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to delete charge');
            }

            console.log("Charge deleted successfully!");
            return { success: true, chargeId };
        } catch (error) {
            console.error('Error deleting charge:', error);
            return { success: false, message: error.message || 'Error deleting charge' };
        }
    }
};

export default function Pricing() {
    const [selectedPlanadd, setSelectedPlanadd] = useState('monthly');
    const submit = useSubmit();
    const actionData = useActionData();
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { charges, error, shop } = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastChargeId, setLastChargeId] = useState(null);
    const activePlan = charges.find(charge => charge.status === 'active');

    const handleTogglePlans = (planType) => {
        setSelectedPlanadd(planType);
    };


    useEffect(() => {
        if (actionData?.success && actionData.confirmationUrl) {
            window.open(actionData.confirmationUrl);
        } else if (actionData?.message) {
            setTransactionStatus(actionData.message);
        }
    }, [actionData]);

    const savePaymentData = async (charge) => {
        const paymentData = {
            shop: shop,
            name: charge.name,
            plan: charge.name.includes('Pro Plus') ? 'pro_plus' : charge.name.includes('Yearly') ? 'pro_yearly' : 'pro',
            price: charge.price,
            status: charge.status,
            billingOn: new Date(),
            chargeId: charge.id,
        };

        try {
            const response = await axios.post('https://hubsyntax.online/payment/confirm', paymentData);
            console.log("Payment data saved response:", response.data);

        } catch (error) {
            console.error('Error saving payment data:', error);
        }
    };

    useEffect(() => {
        if (activePlan && activePlan.id !== lastChargeId) {
            savePaymentData(activePlan);
            setLastChargeId(activePlan.id);
        }
    }, [activePlan]);

    const handleChoosePlan = async (plan) => {
        if (isSubmitting || (activePlan && activePlan.name.includes(plan))) return;
        setIsSubmitting(true);
        setTransactionStatus(null);
        setSelectedPlan(plan);
        const formData = new FormData();
        formData.append('plan', plan);

        if (plan === 'free' && hasActiveCharge) {
            alert('You are already on a Free plan. You cannot switch to Free again.');
            setIsSubmitting(false);
            return;
        }

        submit(formData, { method: 'post' }).finally(() => {
            setIsSubmitting(false);
        });
    };

    const handleDelete = async (chargeId) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('charge_id', chargeId);
            await submit(formData, { method: 'delete' });
            console.log(`Deleted charge ID: ${chargeId}`);
        } catch (error) {
            console.error('Error during deletion:', error);
        }

        const paymentData = {
            chargeId: "1234",
            shop: shop,
            name: "lifeTime",
            plan: "free",
            price: 0,
            status: "active",
            billingOn: new Date().toISOString(),
        };

        try {
            const response = await axios.post('https://hubsyntax.online/payment/confirm', paymentData);
            console.log("Payment data saved response:", response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error response status:', error.response.status);
                console.error('Error response data:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasActiveCharge = charges.some(charge => charge.status === 'active');


    return (
        <div className='from_builder_pricing'>
            <div className="container">
                <div className="from_builder_plan_title">
                    <h2>Plan Pricing</h2>
                </div>
                <div className="form_builder_plan_add">
                    <div className="form_builders_plan">
                        <div className="form_builders_plan_p">
                            <p>Plans</p>
                        </div>
                        <div className="form_builders_plan_btn">
                            <div
                                className={`form_builders_plan_monthly ${selectedPlanadd === 'monthly' ? 'active' : ''}`}
                                onClick={() => handleTogglePlans('monthly')}
                            >
                                <p>Monthly 1 App</p>
                            </div>
                            <div
                                className={`form_builders_plan_annually ${selectedPlanadd === 'annually' ? 'active' : ''}`}
                                onClick={() => handleTogglePlans('annually')}
                            >
                                <div className='form_annualy_plans'>
                                    <p>Annually</p>
                                </div>
                                <div className='enjoy_paln'>
                                    <span style={{ background: "#45A7F6", color: "white" }}>
                                        Enjoy <span>up to 17% off</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedPlanadd === 'monthly' ? (
                        <div className='form_builder_monthly_plans'>
                            <div className="form_builder_choose_pan">
                                <div className="form_builder_plan_table heading">
                                    <h2>Choose your plan</h2>
                                </div>
                                <div className="form_builder_plan_table bg first">
                                    {!hasActiveCharge && (
                                        <>
                                            <p>Free</p>
                                            <h2>$0.00<span> lifetime</span></h2>
                                            <p className='form_builder_plan_btn'>Current Plan</p>
                                        </>
                                    )}
                                    {charges.map(charge => (
                                        <div key={charge.id} className="charge-item">
                                            {charge.status === 'active' && (
                                                <>
                                                    <p>Free</p>
                                                    <h2>$0.00<span> lifetime</span></h2>
                                                    <p className='form_builder_plan_btn' onClick={() => handleDelete(charge.id)}>Choose this plan</p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="form_builder_plan_table bg second">
                                    <p>Pro</p>
                                    <h2>$4.99<span>/mo</span></h2>
                                    {activePlan && activePlan.name === 'Form Builder Pro Plan' ? (
                                        <p className='form_builder_plan_btn' style={{ backgroundColor: '#33AADE', color:'white', border:'1px solid #FFFFFF' }}>Current Plan</p>
                                    ) : (
                                        <p className='form_builder_plan_btn' onClick={() => handleChoosePlan('pro')}>
                                            Choose this plan
                                        </p>
                                    )}
                                </div>

                                <div className="form_builder_plan_table bg third">
                                    <p>Pro +</p>
                                    <h2>$19.90<span>/mo</span></h2>
                                    {activePlan && activePlan.name === 'Form Builder Pro Plus Plan' ? (
                                        <p className='form_builder_plan_btn' style={{ backgroundColor: '#EE8208', color:'white', border:'1px solid #FFFFFF' }}>Current Plan</p>
                                    ) : (
                                        <p className='form_builder_plan_btn'
                                            onClick={() => handleChoosePlan('pro_plus')}
                                        >
                                            Choose this plan
                                        </p>
                                    )}
                                </div>
                                <div className="form_builder_plan_table bg four">
                                    <p>New Global Plan</p>
                                    <h2>$229.90<span>/mo</span></h2>
                                    <p className='form_build_h2_four'>
                                        <span className='strikethrough'>$1050.00</span><span>/mo</span>
                                    </p>
                                    <p className='form_builder_plan_btn'>Choose this plan</p>
                                </div>
                            </div>
                            <div className='form_table_pricing'>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Unlimited forms</span>
                                    </div>
                                    {[pricing1, pricing2, pricing3, pricing4].map((src, index) => (
                                        <div key={index} className="form_builder_plan_table">
                                            <img src={src} alt={`Pricing feature ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Unlimited forms</span>
                                    </div>
                                    {[pricing1, pricing2, pricing3, pricing4].map((src, index) => (
                                        <div key={index} className="form_builder_plan_table">
                                            <img src={src} alt={`Pricing feature ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='form_builder_annually_plans'>
                            <div className="form_builder_choose_pan">
                                <div className="form_builder_plan_table heading">
                                    <h2>Choose your plan</h2>
                                </div>
                                <div className="form_builder_plan_table bg first">
                                    {!hasActiveCharge && (
                                        <>
                                            <p>Free</p>
                                            <h2>$0.00<span> lifetime</span></h2>
                                            <p className='form_builder_plan_btn'>Current Plan</p>
                                        </>
                                    )}
                                    {charges.map(charge => (
                                        <div key={charge.id} className="charge-item">
                                            {charge.status === 'active' && (
                                                <>
                                                    <p>Free</p>
                                                    <h2>$0.00<span> lifetime</span></h2>
                                                    <p className='form_builder_plan_btn' onClick={() => handleDelete(charge.id)}>Choose this plan</p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="form_builder_plan_table bg second">
                                    <p>Pro (Yearly)</p>
                                    <h2>$99.90<span>/year</span></h2>
                                    {activePlan && activePlan.name === 'Form Builder Pro Yearly Plan' ? (
                                        <p className='form_builder_plan_btn' style={{ backgroundColor: '#9929AB', color:'white', border:'1px solid #FFFFFF' }}>Current Plan</p>
                                    ) : (
                                        <p className='form_builder_plan_btn'
                                            onClick={() => handleChoosePlan('pro_yearly')}
                                        >

                                            Choose this plan
                                        </p>
                                    )}
                                </div>
                                <div className="form_builder_plan_table bg third">
                                    <p>Pro +</p>
                                    <h2>$199.90<span>/year</span></h2>
                                    <p className='form_builder_plan_btn'>Choose this plan</p>
                                </div>
                            </div>
                            <div className='form_table_pricing'>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Unlimited forms</span>
                                    </div>
                                    {[pricing1, pricing6, pricing5].map((src, index) => (
                                        <div key={index} className="form_builder_plan_table">
                                            <img src={src} alt={`Annual pricing feature ${index + 1}`} />
                                        </div>

                                    ))}
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Unlimited forms</span>
                                    </div>
                                    {[pricing1, pricing6, pricing5].map((src, index) => (
                                        <div key={index} className="form_builder_plan_table">
                                            <img src={src} alt={`Annual pricing feature ${index + 1}`} />
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
