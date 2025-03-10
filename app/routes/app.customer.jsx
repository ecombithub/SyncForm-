import axios from 'axios';
import '../index.css';
import customer1 from '../images/customer1.png';
import customer2 from '../images/customer2.png';
import customer3 from '../images/customer3.png';
import arrow from '../images/arrow.png';
import search12 from '../images/search12.png';
import down from '../images/down.png';
import left from '../images/left1.png';
import right from '../images/right1.png';
import dropicon from '../images/download.png';
import cancleimg from '../images/cancleimg.png';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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

function Customer() {
    const [createdForms, setCreatedForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFormNames, setShowFormNames] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');
    const [selectedFormName, setSelectedFormName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const formsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [showpop, setShowpop] = useState(false);
    const [selectedForms, setSelectedForms] = useState(new Set());
    const [uniqueEmailCount, setUniqueEmailCount] = useState(0);
    const [totalSubmissionCount, setTotalSubmissionCount] = useState(0)
    const [percentage, setPercentage] = useState(0);
    const [percentage1, setPercentage1] = useState(0);
    const { shop, apiUrl } = useLoaderData() || {};
    const [currentFormsed, setCurrentForms] = useState([]);
    const [upgradePopup, setUphradePopup] = useState(false);
    const [userPlan, setUserPlan] = useState(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/forms`);
                const forms = response.data;
                const matchedForms = forms.filter(form => form.shop === shop);
                setCurrentForms(matchedForms);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const response = await axios.get(`${apiUrl}/api/customer`);
                const forms = response.data;

                const matchedForms = forms.filter(form => form.shop === shop);

                let totalSubmissions = 0;
                let totalUniqueEmails = 0;

                if (matchedForms.length > 0) {
                    matchedForms.forEach((form) => {
                        const seenEmails = new Set();

                        form.submissions.forEach((submission) => {
                            totalSubmissions += 1;

                            submission.fields.forEach(field => {
                                if (field.name === "Email" && !seenEmails.has(field.value)) {
                                    seenEmails.add(field.value);
                                }
                            });
                        });

                        totalUniqueEmails += seenEmails.size;
                    });

                    setTotalSubmissionCount(totalSubmissions);
                    setUniqueEmailCount(totalUniqueEmails);
                } else {
                    console.log("No matching forms found for the shop.");
                }
            } catch (error) {
                console.error("Error fetching forms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [shop, apiUrl]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const response = await axios.get(`${apiUrl}/api/forms`);
                const filteredForms = response.data.filter(form => form.shop === shop);

                if (filteredForms.length > 0) {
                    const formsWithUniqueEmails = filteredForms.map(form => {
                        const seenEmails = new Set();
                        const uniqueSubmissions = form.submissions.filter(submission => {
                            let isUniqueEmail = false;
                            submission.fields.forEach(field => {
                                if (field.name === "Email" && !seenEmails.has(field.value)) {
                                    seenEmails.add(field.value);
                                    isUniqueEmail = true;
                                }
                            });
                            return isUniqueEmail;
                        });

                        return { ...form, uniqueSubmissions };
                    });

                    setCreatedForms(formsWithUniqueEmails);

                    formsWithUniqueEmails.forEach(form => {
                        console.log(`Form Title: ${form.title}, Form ID: ${form.id}`);
                        form.uniqueSubmissions.forEach(submission => {
                            const emailField = submission.fields.find(field => field.name === "Email");
                            const timestamp = new Date(submission.timestamp);
                            const formattedDate = format(timestamp, 'yyyy-MM-dd hh:mm:ss a');

                            if (emailField) {
                                console.log(`  Unique Email: ${emailField.value}, Date and Time: ${formattedDate}`);
                            }
                        });
                    });
                } else {
                    setCreatedForms([]);
                    console.log("No forms found for this shop");
                }
            } catch (error) {
                console.error('Error fetching forms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [shop, apiUrl]);

    useEffect(() => {
        const animatedValue = { value: 0 };

        gsap.to(animatedValue, {
            duration: 6,
            value: 16,
            onUpdate: () => {
                setPercentage(Math.round(animatedValue.value));
            },
            ease: 'power1.out',
        });
    }, []);

    useEffect(() => {
        const animatedValue = { value: 0 };

        gsap.to(animatedValue, {
            duration: 6,
            value: 22,
            onUpdate: () => {
                setPercentage1(Math.round(animatedValue.value));
            },
            ease: 'power1.out',
        });
    }, []);

    const handleShowPop = () => {
        setShowpop(!showpop);
        setSelectedForms(new Set());
    }

    const handleToggleFormNames = () => {
        setShowFormNames(prevState => !prevState);
    };

    const handleToggle = () => {
        setShowForm(prevState => !prevState);
    };

    const handleSelectFormName = (title) => {
        setSelectedFormName(title);
        setShowFormNames(false);
    };

    const handleSelectForm = (title) => {
        setSelectedForm(title);
        setShowForm(false);
    };

    const filteredForms = createdForms.flatMap(form => {
        return form.uniqueSubmissions.map(submission => ({
            ...form,
            submission
        }));
    }).filter(item => {
        const fullName = item.submission.fields.find(f => f.name === 'Full name')?.value ||
            `${item.submission.fields.find(f => f.name === 'First name')?.value || ''} ${item.submission.fields.find(f => f.name === 'Last name')?.value || ''}`.trim().toLowerCase();

        const email = item.submission.fields.find(f => f.name === 'Email')?.value.toLowerCase() || '';

        return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredForms.length / formsPerPage);
    const currentForms = filteredForms.slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCheckboxChange = (formId) => {
        setSelectedForms(prev => {
            const updated = new Set(prev);
            if (updated.has(formId)) {
                updated.delete(formId);
            } else {
                updated.add(formId);
            }
            return updated;
        });
    };


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            filteredForms.forEach(form => setSelectedForms(prev => new Set(prev).add(form.id)));

        } else {
            setSelectedForms(new Set());

        }
    };



    const handleSelectAllForms = () => {
        setSelectedFormName(null);
        setShowFormNames(true);
    };

    const handleSelect = () => {
        setSelectedForm(null);
        setShowForm(true);
    };

    const downloadSelectedCSV = () => {
        const csvRows = [];
        const headers = ['Title', 'Form ID', 'Submission ID', 'Name', 'Email', 'Phone', 'Field Details', 'Shop', 'Current URL', 'Timestamp'];
        csvRows.push(headers.join(','));

        if (selectedForms.size === 0) {
            alert('Please select at least one form to download.');
            return;
        }
        const selectedFormsArray = Array.from(selectedForms);

        selectedFormsArray.forEach(formId => {
            const form = currentFormsed.find(f => f.id === formId);
            if (form) {
                form.submissions.forEach((submission, index) => {
                    const nameField = submission.fields.find(field => field.name === 'First name' || field.name === 'Full name') || { value: 'N/A' };
                    const emailField = submission.fields.find(field => field.name === 'Email') || { value: 'N/A' };
                    const phoneField = submission.fields.find(field => field.name === 'Phone' || field.name === 'Number') || { value: 'N/A' };

                    const fieldDetails = Array.isArray(submission.fields)
                        ? submission.fields.map(field => `${field.name}: ${field.value || 'N/A'}`).join('; ')
                        : '';
                    const shop = form.shop || 'N/A';
                    const currentUrl = form.currentUrl || 'N/A';
                    const timestamp = submission.timestamp || 'N/A';

                    const values = [
                        form.title || '',
                        form.id || '',
                        index + 1,
                        nameField.value,
                        emailField.value,
                        phoneField.value,
                        fieldDetails,
                        shop,
                        currentUrl,
                        timestamp
                    ];
                    csvRows.push(values.join(','));
                });
            }
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Customers Data.csv');
        setSelectedForms(new Set());
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadAllCSV = () => {
        const csvRows = [];
        const headers = ['Title', 'Form ID', 'Submission ID', 'Name', 'Email', 'Phone', 'Field Details', 'Shop', 'Current URL', 'Timestamp'];
        csvRows.push(headers.join(','));

        currentFormsed.forEach(form => {
            form.submissions.forEach((submission, index) => {
                const nameField = submission.fields.find(field => field.name === 'First name' || field.name === 'Full name') || { value: 'N/A' };
                const emailField = submission.fields.find(field => field.name === 'Email') || { value: 'N/A' };
                const phoneField = submission.fields.find(field => field.name === 'Phone' || field.name === 'Number') || { value: 'N/A' };

                const fieldDetails = Array.isArray(submission.fields)
                    ? submission.fields.map(field => `${field.name}: ${field.value || 'N/A'}`).join('; ')
                    : '';
                const shop = form.shop || 'N/A';
                const currentUrl = form.currentUrl || 'N/A';
                const timestamp = submission.timestamp || 'N/A';

                const values = [
                    form.title || '',
                    form.id || '',
                    index + 1,
                    nameField.value,
                    emailField.value,
                    phoneField.value,
                    fieldDetails,
                    shop,
                    currentUrl,
                    timestamp
                ];
                csvRows.push(values.join(','));
            });
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Customers Data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const fetchPaymentPlan = async () => {
        try {
            console.log("Fetching payment plan...");
            const response = await axios.get(`${apiUrl}/payment/active-plan?shop=${shop}`);

            console.log("Response data:", response.data);
            setUserPlan(response.data);
            console.log("User plan set:", response.data);

            console.log("Forms fetched successfully with user plan data.");
        } catch (error) {
            console.error("Error fetching payment plan:", error);

        }
    };

    useEffect(() => {
        fetchPaymentPlan();
    }, []);

  
    const handleCancle = () => {
        setUphradePopup(false);
    }
    

    const handleUpgrade = () => {
        navigate('/app/pricing');
    }

    const handleshowPopup = () => {
        if (!['pro','pro_plus', 'pro_yearly','pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUphradePopup(true);
            return;
        }
        setShowpop(!showpop);
    };
    
    return (
        <>

            {upgradePopup && <div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp'>
                    <p>Need to Upgrade Your Plan To Create More Form</p>
                    <div className='form_builder_upgrade_choose_plan' onClick={handleUpgrade}><p>Choose plans</p></div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={handleCancle}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>}
            {loading ? (
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
                                    <div className="skeleton skeleton-paragraph "></div>
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
            ) : (
                <div className='form_builder_customer'>
                    <div className='container'>
                        <div className="form-builder-customer_title">
                            <h2>Forms Builder HUB</h2>
                        </div>
                        <div className="form-builder-customer-total">
                            <div className="form-tota-customer">
                                <div className="form-tota-customer-image">
                                    <img src={customer1} alt="" />
                                </div>
                                <div className="form-tota-customer-element">
                                    <p>Total customers</p>
                                    <h3>{uniqueEmailCount}</h3>

                                    <span>
                                        <span style={{ color: "#00AC4F" }}> {percentage}%
                                            <img src={arrow} alt="" /> <span className="text-content">this month</span>
                                        </span>
                                    </span>


                                </div>
                            </div>
                            <div className="form-tota-customer">
                                <div className="form-tota-customer-image">
                                    <img src={customer2} alt="" />
                                </div>
                                <div className="form-tota-customer-element">
                                    <p>Total forms</p>
                                    <h3>{createdForms.length}</h3>
                                </div>
                            </div>
                            <div className="form-tota-customer">
                                <div className="form-tota-customer-image">
                                    <img src={customer3} alt="" />
                                </div>
                                <div className="form-tota-customer-element">
                                    <p>Total forms submission</p>
                                    <h3>{totalSubmissionCount}</h3>
                                    <span>
                                        <span style={{ color: "#00AC4F" }}>
                                            <img src={arrow} alt="" />  {percentage1}%
                                        </span> this month
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form_builder_show_all_forms">
                            <div className="form_build_heading">
                                <div className="form_build_title">
                                    <h2>All Customers</h2>
                                </div>
                                <div className='form-build-customer-search'>
                                    <div className='form-builder-search-bar'>
                                        <input
                                            id="search"
                                            type="search"
                                            placeholder='Search'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className='form_build_icon_search'>
                                            <img src={search12} alt="" />
                                        </div>
                                    </div>
                                    <div className="form_builder_download"onClick={handleshowPopup}>
                                        <p>Download all CSV</p>
                                    </div>
                                    <div className="form_builder_download icon" onClick={handleShowPop}>
                                        <img src={dropicon} alt="" />
                                    </div>
                                    <div className='show_forms_all'>
                                        <span className='name_build'>
                                            Shot by  :
                                            <span style={{ fontWeight: 700, cursor: "pointer" }} onClick={handleToggleFormNames}>
                                                Forms name <span className='form-short'><img src={down} alt="" /></span>
                                            </span>
                                        </span>
                                        <div className={`form-names-list ${showFormNames ? 'show' : ''}`}>
                                            <div onClick={handleSelectAllForms}>All Forms</div>
                                            {createdForms.map(form => (
                                                <div key={form.id} onClick={() => handleSelectFormName(form.title)}>
                                                    {form.title}
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showpop && (
                                <div className='form_builder_popup_forms'>
                                    <div className='form_building_popupshow'>
                                        <div className="form_build_heading">
                                            <div className="form_build_title">
                                                <h2>Select form for download</h2>
                                            </div>
                                            <div className='form-build-customer-search'>
                                                <div className='form-builder-search-bar'>
                                                    <input
                                                        id="search"
                                                        type="search"
                                                        placeholder='Search'
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <div className='form_build_icon_search'>
                                                        <img src={search12} alt="" />
                                                    </div>
                                                </div>
                                                <div className="form_builder_download" onClick={downloadAllCSV}>
                                                    <p>Download all CSV</p>
                                                </div>
                                                <div className="form_builder_download icon" onClick={handleShowPop}>
                                                    <img src={dropicon} alt="" />
                                                </div>
                                                <div className='show_forms_all'>
                                                    <span className='name_build'>
                                                        Sort by :
                                                        <span style={{ fontWeight: 700, cursor: "pointer" }} onClick={handleToggle}>
                                                            Forms name <span className='form-short'><img src={down} alt="" /></span>
                                                        </span>
                                                    </span>
                                                    <div className={`form-names-list ${showForm ? 'show' : ''}`}>
                                                        <div onClick={handleSelect}>All Forms</div>
                                                        {currentFormsed.map(form => {
                                                            console.log(form.title);
                                                            return (
                                                                <div key={form.id} onClick={() => handleSelectForm(form.title)}>
                                                                    {form.title}
                                                                </div>
                                                            );
                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form_builder_select_optoion">
                                            <div className='form_select_check data_forms'>
                                                <input type="checkbox" onChange={handleSelectAll} />
                                                <div className='form_select_check test'>
                                                    <p>Select All Forms Data </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form_customer_tables">
                                            <div className="table-container">
                                                <div className="table-header">
                                                    <div></div>
                                                    <div> Form Name </div>
                                                    <div> id</div>
                                                    <div className='phone-forms'>Response</div>
                                                    <div className='form-date'> Date and time</div>

                                                </div>
                                                <div className="table-row-popup">
                                                    {currentFormsed.length > 0 ? (
                                                        currentFormsed
                                                            .filter(form => selectedForm ? form.title === selectedForm : true)
                                                            .map(form => (
                                                                <div key={form.id} className="table-row-data">
                                                                    <div className="data_forms">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedForms.has(form.id)}
                                                                            onChange={() => handleCheckboxChange(form.id)}
                                                                            id={`checkbox-${form.id}`}
                                                                        />
                                                                        <label htmlFor={`checkbox-${form.id}`}></label>
                                                                    </div>
                                                                    <div className="data_forms">{form.title}</div>
                                                                    <div className="data_forms">{form.id}</div>
                                                                    <div className="data_forms phone-forms">
                                                                        {form.submissionCount || form.submissions.length || 0}
                                                                    </div>
                                                                    <div className="data_forms form-date">
                                                                        {format(new Date(form.timestamp), 'yyyy-MM-dd hh:mm:ss a')}
                                                                    </div>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <div>No forms found</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form_build_cancle_option' style={{ cursor: "pointer" }} onClick={handleShowPop}><img src={cancleimg} alt="" /> </div>
                                        <div className="form_build_download_btn" onClick={downloadSelectedCSV}>
                                            Download
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="form_customer_tables">
                                <div className="table-container">
                                    <div className="table-header">
                                        <div>Form Name</div>
                                        <div>Customer Email</div>
                                        <div className='phone-forms'>Phone</div>
                                        <div>Name</div>
                                        <div className='phone-forms'>Country</div>
                                        <div className='phone-forms'>Status</div>
                                    </div>
                                    <div className="table-row">
                                        {currentForms.length > 0 ? (
                                            currentForms
                                                .filter(item => selectedFormName ? item.title === selectedFormName : true)
                                                .map((item, index) => {
                                                    const email = item.submission.fields.find(f => f.name === 'Email')?.value || 'N/A';
                                                    const phone = item.submission.fields.find(f => f.name === 'Phone')?.value || 'N/A';
                                                    const fullName = item.submission.fields.find(f => f.name === 'Full name')?.value ||
                                                        `${item.submission.fields.find(f => f.name === 'First name')?.value || ''} 
                                                      ${item.submission.fields.find(f => f.name === 'Last name')?.value || ''}`.trim() || 'N/A';
                                                    const country = item.submission.fields.find(f => f.name === 'Country')?.value || 'N/A';
                                                    const formTitle = item.formTitle || item.title;

                                                    return (
                                                        <div key={index} className="table-row-data">
                                                            <div className="data_forms">{formTitle}</div>
                                                            <div className="data_forms">{email}</div>
                                                            <div className="data_forms phone-forms">{phone}</div>
                                                            <div className="data_forms">{fullName}</div>
                                                            <div className="data_forms phone-forms">{country}</div>
                                                            <div className="data_forms phone-forms">
                                                                <div className="form-detail-status">
                                                                    <span>Active</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                        ) : (
                                            <div>No forms found</div>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className='form_build_last_pages'>
                            <div className='form-builder-show-totle-form'>
                                Showing  {uniqueEmailCount} customer
                            </div>
                            <div className="pagination">
                                <nav>
                                    <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
                                        <li>
                                            <button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                            >
                                                <img src={left} alt="Previous" />
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index + 1} aria-current={currentPage === index + 1 ? 'page' : undefined}>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={`${currentPage === index + 1 ? 'active' : 'inactive'}`}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                            >
                                                <img src={right} alt="Next" />
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Customer;

