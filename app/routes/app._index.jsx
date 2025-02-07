import { Link, useNavigate } from '@remix-run/react';
import React, { useState, useEffect } from 'react';
import user from '../images/user.png'
import '../index.css';
import dash1 from '../images/dash1.png';
import dash2 from '../images/dash2.png';
import dash3 from '../images/dash3.png';
import Vector1 from '../images/Vector10.png';
import vecter2 from '../images/Vector100.png';
import Vector3 from '../images/Vector1000.png';

import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import axios from 'axios';
import cancleimg from '../images/cancleimg.png';

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;
  const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
  const response = {
    assets: [],
    activeThemeId: null,
    shop,
    apiUrl,
    error: false,
    accessToken,
    errorMessage: ''
  };

  try {
    const themeResponse = await fetch(`https://${shop}/admin/api/${apiVersion}/themes.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!themeResponse.ok) {
      const errorText = await themeResponse.text();
      throw new Error(`Failed to fetch themes: ${errorText}`);
    }

    const themeData = await themeResponse.json();
    const activeTheme = themeData.themes.find(theme => theme.role === 'main');
    response.activeThemeId = activeTheme ? activeTheme.id : null;

    if (!response.activeThemeId) {
      throw new Error("No active theme found.");
    }

    const assetResponse = await fetch(`https://${shop}/admin/api/${apiVersion}/assets.json?theme_id=${response.activeThemeId}`, {
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

function Index() {
  const { activeThemeId, shop, apiUrl, accessToken } = useLoaderData() || {};
  const [dataSent, setDataSent] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [createdForms, setCreatedForms] = useState([]);
  const [error, setError] = useState(null);
  const [upgradePopup, setUpgradePopup] = useState(false);
  const navigator = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const saveShopDetails = async () => {
      if (shop && accessToken && !dataSent) {
        try {

          const response = await fetch(`${apiUrl}/api/save-shop`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shop, accessToken }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save the shop details');
          }

          const data = await response.json();
          if (data.success) {
            console.log("Shop details sent to the server.");
            setDataSent(true);
          }
        } catch (error) {
          console.error("Error sending shop details:", error);
        }
      }
    };

    const checkFreePlanStatusAndSendData = async () => {
      try {
        const planResponse = await axios.get(`${apiUrl}/payment/plan?shop=${shop}`);

        setIsSubmitting(true);
        if (planResponse.data.status === 'active') {
          const paymentData = {
            chargeId: `free-plan-${shop}`,
            shop: shop,
            name: "lifeTime",
            plan: "free",
            price: 0,
            status: "active",
            billingOn: new Date().toISOString(),
          };

          const response = await axios.post(`${apiUrl}payment/confirm`, paymentData);
          console.log("Payment data saved response:", response.data);
          setResponseData(response.data);
        } else {
          console.log("Free plan is not active, skipping the payment confirmation.");
        }
      } catch (error) {
        if (error.response) {
          console.error('Error response status:', error.response.status);
          console.error('Error response data:', error.response.data);

          if (error.response.status === 404 && error.response.data.error === 'Payment plan not found') {

            const paymentData = {
              chargeId: `free-plan-${shop}`,
              shop: shop,
              name: "lifeTime",
              plan: "free",
              price: 0,
              status: "active",
              billingOn: new Date().toISOString(),
            };

            const response = await axios.post(`${apiUrl}/payment/confirm`, paymentData);
            console.log("Payment data saved response (new free plan):", response.data);
            setResponseData(response.data);
          }
        } else {
          console.error('Error:', error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    if (shop && accessToken && !dataSent) {
      saveShopDetails();
      checkFreePlanStatusAndSendData();
    }
  }, [shop, accessToken, dataSent]);

  useEffect(() => {
    const fetchPaymentPlan = async () => {
      try {
        const response = await axios.get(`${apiUrl}/payment/plan?shop=${shop}`);
        setUserPlan(response.data);
        await fetchForms(response.data);
      } catch (error) {
        setError('Error fetching payment plan');
        console.error('Error fetching payment plan:', error);
      }
    };

    const fetchForms = async (userPlan) => {
      try {
        const response = await fetch(`${apiUrl}/get-forms`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const filteredForms = data.filter((form) => form.shop === shop);
        setCreatedForms(filteredForms);
        console.log('Filtered Forms:', filteredForms);

        if (userPlan?.plan === 'free' && userPlan.status === 'active') {

          const formsToKeep = filteredForms.slice(0, 1);

          const formsToDisable = filteredForms.slice(1);

          await Promise.all(
            formsToDisable.map(async (form) => {
              if (form.shop === shop) {
                console.log(`Deleting form with ID ${form.formId} for shop ${shop}`);
                try {
                  const deleteResponse = await fetch(`${apiUrl}/delete-form/${form.formId}`, {
                    method: 'DELETE',
                  });
                  if (!deleteResponse.ok) {
                    throw new Error(`Failed to delete form with ID ${form.formId}`);
                  }
                } catch (error) {
                  console.error(`Error deleting form with ID ${form.formId}:`, error);
                }
              }
            })
          );

          setCreatedForms(formsToKeep);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching forms:', error);
      }
    };

    fetchPaymentPlan();
  }, [shop]);

  const handleCreateForm = () => {
    if (userPlan?.plan === 'free' && userPlan.status === 'active' && createdForms.length >= 1) {
      setUpgradePopup(true);
      return;
    }

    navigator('/app/forms/new');
  };

  const handleCancle = () => {
    setUpgradePopup(false);
  }

  const handleUpgrade = () => {
    navigator('/app/pricing');
  }

  return (
    <>
      <div className="form_builder_dashboard">
        <div className="container">
          <div className="form-builder-customer_title">
            <h2>Forms Builder HUB</h2>
          </div>
          <div className="form_build_contact">
            <div className="form_build_count">
              <p style={{ fontWeight: 800 }}>Reach Out to Us!</p>
              <p>Expert Installation Support</p>
              <a target='_blank' href="https://calendly.com/ecom-support/shopify-expert">
                <button style={{ cursor: 'pointer' }}>
                  Book an appointment
                </button></a>
            </div>
            <div className="contact_img">
              <img src={user} alt="" />
            </div>
          </div>
          <div className="form_build_setup">
            <p>App setup steps</p>
            <div className="form_build_setup_options">
              <div className="form_build_wrap_apps">
                <div className="form_build_wrap_img">
                  <img src={dash1} alt="" />
                </div>
                <div className="form_build_wrap_elements">
                  <h4>Create the Form </h4>
                  <p>Go to the form page and create a new form.</p>
                </div>
              </div>
              <div className="form_build_wrap_apps">
                <div className="form_build_wrap_img">
                  <img src={dash2} alt="" />
                </div>
                <div className="form_build_wrap_elements">
                  <h4>Enable the App</h4>
                  <p> Go to the Theme customization>App embeds and enable the app.</p>
                </div>
              </div>
              <div className="form_build_wrap_apps">
                <div className="form_build_wrap_img">
                  <img src={dash3} alt="" />
                </div>
                <div className="form_build_wrap_elements">
                  <h4>Integrate the Form</h4>
                  <p>Integrate the form to your store by pasting the copied Form ID on your desired page.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="form_builder_theme_section">
            <div className="form_build_new_base">
              <h4>Create New Form</h4>
              <p>Creating a new form is a straightforward process. Simply select and customize fields to suit your needs, and launch your form in minutes.</p>
              <div className="form_build_app_bottm second">
                <div className="form_build_app_btn" style={{ cursor: "pointer" }} onClick={handleCreateForm}>
                  <p>New Form</p>
                </div>

                <div className="form_build_app_img">
                  <img src={vecter2} alt="" />
                </div>
              </div>
            </div>
            {upgradePopup && <div className='form_builder_plan_upgrade_popup'>
              <div className='form_builder_plan_upgrade_popup_wrapp'>
                <p>Need to Upgrade Your Plan To Create More Form</p>
                <div className='form_builder_upgrade_choose_plan' onClick={handleUpgrade}><p>Choose plans</p></div>
                <div className="form_builder_upgrade_popup_cancle" onClick={handleCancle}>
                  <img src={cancleimg} alt="" />
                </div>
              </div>
            </div>}
            <div className="form_build_new_base">
              <h4>Integration</h4>
              <p>Easily connect form with your Shopify store to enhance functionality. Sync responses with databases, trigger notifications, and seamless data management.</p>
              <div className="form_build_app_bottm second">
                <div className="form_build_app_btn">
                  <a href={`https://${shop}/admin/themes/${activeThemeId}/editor/?context=apps`} target='_blank' rel="">
                    <div className="form_build_app_btn">
                      <p>Theme editor</p>
                    </div>
                  </a>
                </div>
                <div className="form_build_app_img">
                  <img src={Vector1} alt="" />
                </div>
              </div>
            </div>

            <div className="form_build_new_base">
              <h4>Knowledgebase</h4>
              <p>A resource hub provides detailed guides, troubleshooting steps and support to help users for form creation and integration.</p>
              <div className="form_build_app_bottm second ">
                <div className="form_build_app_btn">
                  <p>Knowledge base</p>
                </div>
                <div className="form_build_app_img">
                  <img src={Vector3} alt="" />
                </div>
              </div>
            </div>

          </div>
          <div className='form-builder-add-text-wraped'>The form builder app by <span style={{ fontWeight: '600', color: '#686767' }}>HubsyntaxApp</span> | Privacy policy | Terms and conditions</div>
        </div>

      </div>
    </>
  );
}

export default Index;


