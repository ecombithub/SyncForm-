import pricing1 from '../images/pricing1.png';
import pricing2 from '../images/pricing2.png';
import pricing3 from '../images/pricing3.png';
import pricing4 from '../images/pricing4.png';
import pricing5 from '../images/pricing5.png';
import pricing6 from '../images/pricing6.png';
import freeplan from '../images/freeplan.png';
import proplan from '../images/proplan.png';
import icondata from '../images/icondata.png';
import downimg from '../images/downimg.png';
import cross1 from '../images/cross1.png';
import cros1 from '../images/cros1.png';
import cros from '../images/cros.png';
import cancleimg from '../images/cancleimg.png';

import '../index.css';
import { authenticate, apiVersion } from "../shopify.server";
import axios from 'axios';
import { useSubmit, useActionData } from "@remix-run/react";
import React, { useState, useEffect } from 'react';
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
    const { shop, accessToken } = session;
    console.log('Access Token:', accessToken);
    console.log('Shop:', shop);
    try {
        const response = await axios.get(`https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
        });

        return { charges: response.data.recurring_application_charges || [], shop, apiUrl };
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

        const chargeData = selectedPlan === "free" ? null :
            {
                recurring_application_charge: {
                    name: selectedPlan === "pro" ? "Form Builder Pro Plan" :
                        selectedPlan === "pro_yearly" ? "Form Builder Pro Yearly Plan" :
                            selectedPlan === "pro_plus" ? "Form Builder Pro Plus Plan" :
                                selectedPlan === "pro_plus_yearly" ? "Form Builder Pro Plus Yearly Plan" :
                                    "Unknown Plan",
                    price: selectedPlan === "pro" ? 4.99 :
                        selectedPlan === "pro_yearly" ? 49.99 :
                            selectedPlan === "pro_plus" ? 14.99 :
                                selectedPlan === "pro_plus_yearly" ? 149.99 : 0,
                    return_url: `https://${shop}/admin/apps/syncform/app/pricing`,
                    trial_days: 7,
                    test: true,
                    interval: selectedPlan === "pro_yearly" || selectedPlan === "pro_plus_yearly" ? "annual" : "every_30_days"
                }
            };


        if (!chargeData) {
            return { success: false, message: "Free plan selected. No charge required." };
        }

        try {
            const existingChargesResponse = await axios.get(
                `https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`,
                {
                    headers: {
                        'X-Shopify-Access-Token': accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const activeCharges = existingChargesResponse.data.recurring_application_charges
                .filter(charge => charge.status === 'active');

            for (const charge of activeCharges) {
                await axios.delete(
                    `https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${charge.id}.json`,
                    {
                        headers: {
                            'X-Shopify-Access-Token': accessToken,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(`Deleted existing charge with ID: ${charge.id}`);
            }

            console.log('Creating new charge:', JSON.stringify(chargeData, null, 2));

            const response = await axios.post(
                `https://${shop}/admin/api/${apiVersion}/recurring_application_charges.json`,
                chargeData,
                {
                    headers: {
                        'X-Shopify-Access-Token': accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('New Recurring Charge Created:', response.data);

            return {
                success: true,
                confirmationUrl: response.data.recurring_application_charge.confirmation_url
            };

        } catch (error) {
            console.error('Error creating charge:', error.response ? error.response.data : error.message);
            return { success: false, message: error.response ? error.response.data : error.message };
        }
    }

    if (method === 'delete') {
        const chargeId = formData.get('charge_id');
        console.log("Charge ID received for deletion:", chargeId);

        try {
            const response = await axios.delete(
                `https://${shop}/admin/api/${apiVersion}/recurring_application_charges/${chargeId}.json`,
                {
                    headers: {
                        'X-Shopify-Access-Token': accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

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
    const { charges, error, shop, apiUrl } = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastChargeId, setLastChargeId] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupPlan, setPopupPlan] = useState(null);
    const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
    const [deletePlanData, setDeletePlanData] = useState({ chargeId: null, planName: null });
    const [isLoading, setIsLoading] = useState(false);

    const toggleViewMore = (section) => {
        setActiveSection((prevSection) => (prevSection === section ? null : section));
    }


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
            await axios.post(`${apiUrl}/payment/confirm`, paymentData);

        } catch (error) {

        }
    };

    const [data, setData] = useState(null);
    const fetchActivePlan = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/payment/active-plan?shop=${shop}`);
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching active plan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const activePlan = data?.activePlan || charges.find(charge => charge.status === 'active');

    useEffect(() => {
        if (activePlan && activePlan.id !== lastChargeId) {
            savePaymentData(activePlan);
            setLastChargeId(activePlan.id);
        }
    }, [activePlan]);

    const handleChoosePlan = async (plan) => {
        if (data?.activePlan?.plan === "pro_plus" && plan === "pro") {
            setPopupPlan(plan);
            setIsPopupVisible(true);
            return;
        }

        processPlanSelection(plan);
    };

    const processPlanSelection = async (plan) => {
        if (isSubmitting || (activePlan && activePlan.name.includes(plan))) return;

        setIsSubmitting(true);
        setTransactionStatus(null);
        setSelectedPlan(plan);

        const formData = new FormData();
        formData.append('plan', plan);

        if (plan === 'free' && hasActiveCharge) {

            alertPopup("You are already on a Free plan. You cannot switch to Free again.");
            setIsSubmitting(false);
            return;
        }

        try {
            submit(formData, { method: 'post' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmPlanChange = () => {
        setIsPopupVisible(false);
        if (popupPlan) {
            processPlanSelection(popupPlan);
        }
    };

    const handleDelete = (chargeId, planName) => {
        setDeletePlanData({ chargeId, planName });
        setIsDeletePopupVisible(true);
    };

    const proceedWithDeletion = async (chargeId) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("charge_id", chargeId);
            await submit(formData, { method: "delete" });

            const paymentData = {
                chargeId: `free-plan-${shop}`,
                shop,
                name: "lifeTime",
                plan: "free",
                price: 0,
                status: "active",
                billingOn: new Date().toISOString(),
            };

            const response = await axios.post(`${apiUrl}/payment/confirm`, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Payment confirmation response:", response);
        } catch (error) {
            console.error("Error during deletion:", error.response ? error.response.data : error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        setIsDeletePopupVisible(false);
        try {
            if (deletePlanData.chargeId) {

                await proceedWithDeletion(deletePlanData.chargeId);
            }

            await fetchActivePlan();

        } catch (error) {
            console.error("Error during deletion:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActivePlan();
    }, [shop]);


    const handleCancelDelete = () => {
        setIsDeletePopupVisible(false);
        setDeletePlanData({ chargeId: null, planName: null });
    };


    return (
        <div className='from_builder_pricing'>
            {isLoading && (
                <div className="skeleton-wrapper fade-in">
                    <div className="container skeleton-wred">
                        <div className="skeleton-wrp">
                            <div className="skeleton-wrp-left">
                                <div className="skeleton skeleton-header"></div>
                                <div className="skeleton-wrp-left-para">
                                    <div className="skeleton skeleton-paragraph"></div>
                                    <div className="skeleton skeleton-paragraph"></div>
                                </div>
                                <div className="skeleton-wrp-left-para">
                                    <div className="skeleton skeleton-paragraph"></div>
                                    <div className="skeleton skeleton-paragraph"></div>
                                </div>
                            </div>
                            <div className="skeleton-wrp-right">
                                <div className="skeleton-wrp-left-para right">
                                    <div className="skeleton skeleton-paragraph"></div>
                                    <div className="skeleton skeleton-paragraph two"></div>
                                </div>
                                <div className="skeleton-wrp-left-para right">
                                    <div className="skeleton skeleton-paragraph"></div>
                                    <div className="skeleton skeleton-paragraph two"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="container">
                <div className="from_builder_plan_title">
                    <h1>Pricing</h1>
                </div>
                <div className="form_builder_plan_add">
                    <div className="form_builders_plan">
                        <div className="form_builders_plan_p">
                            <p className='currentplan-show'>Plans</p>
                            <p className='choose-your-plan'>Choose Your Plan</p>
                        </div>
                        <div className={`form_builders_plan_btn ${selectedPlanadd === 'monthly' ? 'active' : ''}`}>
                            <div
                                className={`form_builders_plan_monthly ${selectedPlanadd === 'monthly' ? 'active' : ''}`}
                                onClick={() => handleTogglePlans('monthly')}
                            >
                                <p>Monthly Subscription</p>
                            </div>

                        </div>
                    </div>

                    {selectedPlanadd === 'monthly' ? (
                        <div className='form_builder_monthly_plans'>
                            <div className="form_builder_choose_pan">
                                <div className="form_builder_plan_table heading">
                                    <h2>Choose your plan</h2>
                                </div>
                                <div className="form_builder_plan_table activee bg first">
                                    {!isDeletePopupVisible ? (
                                        <>
                                            {activePlan?.plan === 'free' ? (
                                                <>
                                                    <img src={freeplan} alt="Free Plan" />
                                                    <p>Free</p>
                                                    <h2>$0.00<span className='monthly-number'>/lifetime</span></h2>
                                                    <p className='form_builder_plan_btn' style={{ backgroundColor: '#c1c1c1', color: 'white', border: '1px solid white' }}>
                                                        Current Plan
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    {activePlan && activePlan.status === 'active' ? (
                                                        <div className="charge-item">
                                                             <p>Free</p>
                                                            <h2>$0.00<span className='monthly-number'>/lifetime</span></h2>
                                                            <p className='form_builder_plan_btn' onClick={() => handleDelete(activePlan.chargeId, activePlan.name)}>
                                                                Choose this plan
                                                            </p>
                                                        </div>
                                                    ) : (

                                                        charges.length > 0 && charges.map(charge => {
                                                            if (charge.status === 'active') {
                                                                console.log('Rendering Choose this plan button for charge:', charge);
                                                                return (
                                                                    <div key={charge.id} className="charge-item">
                                                                        <p>{charge.name}</p>
                                                                        <h2>${charge.price}<span className='monthly-number'>/lifetime</span></h2>
                                                                        <p className='form_builder_plan_btn' onClick={() => handleDelete(charge.id, charge.name)}>
                                                                            Choose this plan
                                                                        </p>
                                                                    </div>
                                                                );
                                                            } else {
                                                                console.log('Charge is not active');
                                                                return null;
                                                            }
                                                        })
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}


                                    <button className="show-data-icon" onClick={() => toggleViewMore("first")}>
                                        {activeSection === "first" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>

                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "first" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            1
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "first" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Number of Email template(s)</span>
                                            1
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "first" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Customer data Export</span>
                                            <img className="show-img" src={cross1} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "first" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Advanced Elements </span>
                                            <img className="show-img" src={cross1} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "first" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>   Live Chat </span>
                                            <img className="show-img" src={pricing1} alt="Unlimited Forms" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form_builder_plan_table activee bg second">

                                    <p>Pro</p>
                                    <div className='before-adding'>
                                        <h2>$4.99<span className='monthly-number'>/mo</span></h2>
                                        <p className='form_build_h2_four'>
                                            {/* <span className='strikethrough'>14.99</span><span className='monthly-number'>/mo</span> */}
                                        </p>
                                    </div>

                                    {activePlan && activePlan.name === 'Form Builder Pro Plan' ? (
                                        <div>
                                            <img src={proplan} />
                                            <p className='form_builder_plan_btn' style={{ backgroundColor: '#33AADE', color: 'white', border: '1px solid white' }}>Current Plan</p>
                                        </div>
                                    ) : (
                                        <p className='form_builder_plan_btn' onClick={() => handleChoosePlan('pro')}>
                                            Choose this plan
                                        </p>
                                    )}
                                    <div className='monthly-wrap'>
                                        Monthly
                                    </div>
                                    <button className="show-data-icon" onClick={() => toggleViewMore("second")}>
                                        {activeSection === "second" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>
                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "second" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            Unlimited
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "second" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Number of Email template(s)</span>
                                            Unlimited
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "second" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Customer data Export</span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "second" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Advanced Elements</span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "second" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Live Chat </span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form_builder_plan_table activee bg third">

                                    <p>Pro +</p>
                                    <div className='before-adding'>
                                        <h2>14.99<span className='monthly-number'>/mo</span></h2>
                                        <p className='form_build_h2_four'>
                                            {/* <span className='strikethrough'>$49.99</span><span className='monthly-number'>/mo</span> */}
                                        </p>
                                    </div>

                                    {activePlan && activePlan.name === 'Form Builder Pro Plus Plan' ? (
                                        <div>
                                            <img src={proplan} />
                                            <p className='form_builder_plan_btn' style={{ backgroundColor: '#EE8208', color: 'white', border: '1px solid white' }}>Current Plan</p>
                                        </div>
                                    ) : (
                                        <p className='form_builder_plan_btn'
                                            onClick={() => handleChoosePlan('pro_plus')}
                                        >
                                            Choose this plan
                                        </p>
                                    )}
                                    <div className='monthly-wrap'>
                                        Monthly
                                    </div>
                                    <button className="show-data-icon" onClick={() => toggleViewMore("third")}>
                                        {activeSection === "third" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>
                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "third" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            Unlimited

                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "third" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of Email template(s)</span>
                                            Unlimited

                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "third" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Customer data Export</span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "third" ? 'visible' : 'hidden'}`}
                                        >

                                            <span>Advanced Elements</span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "third" ? 'visible' : 'hidden'}`}
                                        >

                                            <span>Live Chat </span>
                                            <img className="show-img" src={cros} alt="Unlimited Forms" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form_builder_plan_table activee bg four">
                                    <p>New Global Plan</p>
                                    <div className='before-adding'>
                                        <h2>$525.00<span className='monthly-number'>/mo</span></h2>
                                        <p className='form_build_h2_four'>
                                            <span className='strikethrough'>$1050.00</span><span className='monthly-number'>/mo</span>
                                        </p>
                                    </div>

                                    <p className='form_builder_plan_btn'>Choose this plan</p>
                                    <div className='monthly-wrap'>
                                        Monthly
                                    </div>

                                </div> */}
                            </div>
                            <div className='form_table_pricing'>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Number of form(s)</span>
                                    </div>
                                    <div className="form_builder_plan_table">
                                        1
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>

                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Number of Email template(s)
                                    </div>
                                    <div className="form_builder_plan_table">
                                        1
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Customer data Export
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={cross1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing2} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing3} alt="" />
                                    </div>
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Advanced Elements
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={cross1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing2} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing3} alt="" />
                                    </div>
                                </div>

                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Live Chat
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing2} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='form_builder_annually_plans'>
                            <div className="form_builder_choose_pan">
                                <div className="form_builder_plan_table heading">
                                    <h2>Choose your plan</h2>
                                </div>
                                <div className="form_builder_plan_table activee bg first">
                                    {!hasActiveCharge && (
                                        <>
                                            <img src={freeplan} />
                                            <p>Free</p>
                                            <h2>$0.00<span className='monthly-number'> lifetime</span></h2>
                                            <p className='form_builder_plan_btn'>Current Plan</p>
                                            <div className='monthly-wrap'>
                                                lifetime
                                            </div>
                                        </>
                                    )}
                                    {charges.map(charge => (
                                        <div key={charge.id} className="charge-item">
                                            {charge.status === 'active' && (
                                                <>
                                                    <p>Free</p>
                                                    <h2>$0.00<span className='monthly-number'> lifetime</span></h2>
                                                    <p className='form_builder_plan_btn' onClick={() => handleDelete(charge.id)}>Choose this plan</p>
                                                    <div className='monthly-wrap'>
                                                        lifetime
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    <button className="show-data-icon" onClick={() => toggleViewMore("four")}>
                                        {activeSection === "four" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>
                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "four" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            1
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "four" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Number of Email template(s)</span>
                                            1
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "four" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>   Customer data Export</span>
                                            <img className="show-img" src={cross1} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "four" ? 'visible' : 'hidden'}`}
                                        >
                                            <span> Advanced Elements </span>
                                            <img className="show-img" src={cross1} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "four" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>   Live Chat </span>
                                            <img className="show-img" src={pricing1} alt="Unlimited Forms" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form_builder_plan_table activee bg second">
                                    <p>Pro (Yearly)</p>
                                    <div className='before-adding'>
                                        <h2>$49.99<span className='monthly-number'>/year</span></h2>
                                        <p className='form_build_h2_four'>
                                            <span className='strikethrough'>$149.99</span><span className='monthly-number'>/year</span>
                                        </p>
                                    </div>

                                    {activePlan && activePlan.name === 'Form Builder Pro Yearly Plan' ? (
                                        <div>
                                            <img src={proplan} />
                                            <p className='form_builder_plan_btn' style={{ backgroundColor: '#9929AB', color: 'white', border: '1px solid white' }}>Current Plan</p>
                                        </div>
                                    ) : (
                                        <p className='form_builder_plan_btn'
                                            onClick={() => handleChoosePlan('pro_yearly')}
                                        >

                                            Choose this plan
                                        </p>
                                    )}
                                    <div className='monthly-wrap'>
                                        Yearly
                                    </div>
                                    <button className="show-data-icon" onClick={() => toggleViewMore("five")}>
                                        {activeSection === "five" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>
                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "five" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            Unlimited
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "five" ? 'visible' : 'hidden'}`}
                                        >
                                            <span> Number of Email template(s)</span>
                                            Unlimited
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "five" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Customer data Export</span>
                                            <img className="show-img" src={pricing6} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "five" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>   Advanced Elements </span>
                                            <img className="show-img" src={pricing6} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "five" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Live Chat </span>
                                            <img className="show-img" src={pricing6} alt="Unlimited Forms" />
                                        </div>
                                    </div>


                                </div>
                                <div className="form_builder_plan_table activee bg third">
                                    <p>Pro + (Yearly)</p>
                                    <div className='before-adding'>
                                        <h2>$149.99 <span className='monthly-number'>/year</span></h2>
                                        <p className='form_build_h2_four'>
                                            <span className='strikethrough'>$1050.00</span><span className='monthly-number'>/year</span>
                                        </p>
                                    </div>
                                    {activePlan && activePlan.name === 'Form Builder Pro Plus Yearly Plan' ? (
                                        <div>
                                            <img src={proplan} />
                                            <p className='form_builder_plan_btn' style={{ backgroundColor: '#9929AB', color: 'white', border: '1px solid white' }}>Current Plan</p>
                                        </div>
                                    ) : (
                                        <p className='form_builder_plan_btn'
                                            onClick={() => handleChoosePlan('pro_plus_yearly')}
                                        >

                                            Choose this plan
                                        </p>
                                    )}
                                    <div className='monthly-wrap'>
                                        Yearly
                                    </div>
                                    <button className="show-data-icon" onClick={() => toggleViewMore("six")}>
                                        {activeSection === "six" ? (
                                            <img
                                                className="show-img1"
                                                src={icondata}
                                                alt="Collapse Icon"

                                            />
                                        ) : (
                                            <img
                                                className="show-img1"
                                                src={downimg}
                                                alt="Expand Icon"

                                            />
                                        )}
                                    </button>
                                    <div className='shwo-unlimited-wrapedd'>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "six" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>Number of form(s)</span>
                                            Unlimited
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "six" ? 'visible' : 'hidden'}`}
                                        >
                                            <span> Number of Email template(s)</span>
                                            Unlimited
                                        </div>

                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "six" ? 'visible' : 'hidden'}`}
                                        >
                                            <span> Customer data Export</span>
                                            <img className="show-img" src={pricing5} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "six" ? 'visible' : 'hidden'}`}
                                        >
                                            <span> Advanced Elements </span>
                                            <img className="show-img" src={pricing5} alt="Unlimited Forms" />
                                        </div>
                                        <div
                                            className={`shwo-unlimited-form-data ${activeSection === "six" ? 'visible' : 'hidden'}`}
                                        >
                                            <span>  Live Chat </span>
                                            <img className="show-img" src={pricing5} alt="Unlimited Forms" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form_table_pricing'>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        <span>Number of form(s)</span>
                                    </div>
                                    <div className="form_builder_plan_table">
                                        1
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>

                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Number of Email template(s)
                                    </div>
                                    <div className="form_builder_plan_table">
                                        1
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                    <div className="form_builder_plan_table">
                                        Unlimited
                                    </div>
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Customer data Export
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={cross1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing6} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing5} alt="" />
                                    </div>
                                </div>
                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Advanced Elements
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={cross1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing6} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing5} alt="" />
                                    </div>
                                </div>

                                <div className="form_builder_choose_pan">
                                    <div className="form_builder_plan_table heading">
                                        Live Chat
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing1} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing6} alt="" />
                                    </div>
                                    <div className="form_builder_plan_table">
                                        <img src={pricing5} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="pricing-button-view">
                    <a href="https://syncform.app/pricing.html" target='_blank'><button style={{ cursor: "pointer" }}>View All Features</button></a>
                </div>
            </div>
            <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and Conditions</a></div>
            {isPopupVisible && (<div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp pricing-plan'>
                    <p>Are You Sure You Want to Downgrade Your Plan?</p>
                    <span><p>By switching to lower plan, all your previous data will be deleted and cannot be recovered. Make sure to download important information before any proceeding.</p></span>
                    <div className="form-buuilder-pricing-plan-btn">
                        <button className='pricing-plan-btn-wrapp' onClick={handleConfirmPlanChange}>Yes</button>
                        <button className='pricing-plan-btn-wrapp no' onClick={() => setIsPopupVisible(false)}>No</button>
                    </div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={() => setIsPopupVisible(false)}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>)}
            {isDeletePopupVisible && (<div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp pricing-plan'>
                    <p>Are You Sure You Want to Downgrade Your Plan?</p>
                    <span><p>By switching to lower plan, all your previous data will be deleted and cannot be recovered. Make sure to download important information before any proceeding.</p></span>
                    <div className="form-buuilder-pricing-plan-btn">
                        <button className='pricing-plan-btn-wrapp' onClick={handleConfirmDelete}>Yes</button>
                        <button className='pricing-plan-btn-wrapp no' onClick={handleCancelDelete}>No</button>
                    </div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={handleCancelDelete}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>)}
        </div>
    );
}
