import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import plus from '../images/plusicon.png';
import vecter1 from '../images/vecter1.png';
import oplus from '../images/oplus.png';
import rplus from '../images/rplus.png';
import yplus from '../images/yplus.png';
import right from '../images/right1.png';
import left from '../images/left1.png';
import search12 from '../images/search12.png'
import copy22 from '../images/copy222.png'
import cancle1 from '../images/cancle1.png'
import multifile12 from '../images/multifile12.png';
import multifile1 from '../images/multifile1.png';
import multiimg from '../images/multiimg.png';
import multiimg1 from '../images/multiimg1.png';
import singleimage0 from '../images/singleimage0.png';
import singleimage1 from '../images/singleimage1.png';
import copy12 from '../images/copy12.png'
import file from '../images/file.png';
import singlefile from '../images/singlefile.png';
import cancleimg from '../images/cancleimg.png';
import '../index.css';
import { format } from 'date-fns';
import axios from 'axios';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import star from '../images/star1.png';

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;
    const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
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



const Formdata = () => {

    const CustomSelect = ({ options, selectedValue, onChange, formStyles }) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        const filteredOptions = options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="custom-select-container" style={{ position: 'relative', width: '100%' }}>
                <div
                    className="custom-select-box"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                        border: `1px solid ${formStyles.inputborderColor || '#ccc'}`,
                        padding: '8px',
                        borderRadius: `${formStyles.inputRadious || '4px'}px`,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: formStyles.inputBgColor || '#fff',
                        borderWidth: formStyles.inputwidth || '1px',
                        borderStyle: formStyles.inputstyle || 'solid',
                    }}
                >
                    <span>{selectedValue ? selectedValue : 'Select an option'}</span>
                    <span>{isDropdownOpen ? '▲' : '▼'}</span>
                </div>

                {isDropdownOpen && (
                    <div className="custom-select-dropdown" style={{
                        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                        maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px',
                        backgroundColor: '#fff', padding: '5px'
                    }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            style={{
                                width: '100%',
                                padding: '5px',
                                borderRadius: '4px',
                                marginBottom: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option.id}
                                    onClick={() => {
                                        onChange(option);
                                        setIsDropdownOpen(false);
                                        setSearchQuery('');
                                    }}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '8px', color: '#ccc' }}>No options found</div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const [selectedOption, setSelectedOption] = useState(null);
    const navigator = useNavigate();
    const [createdForms, setCreatedForms] = useState([]);
    const [view, setView] = useState('live');
    const [searchbar, setSearchbar] = useState('');
    const [currentFormId, setCurrentFormId] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [error, setError] = useState(null);
    const formsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredForms, setFilteredForms] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const { shop, apiUrl, accessToken } = useLoaderData() || {};
    const [upgradePopup, setUphradePopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [formToDelete, setFormToDelete] = useState(null);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedFormId, setCopiedFormId] = React.useState(null);
    const [loading, setLoading] = useState(false);



    const handleShowFormDetails = (formId) => {
        setIsLoading(true);
        setCurrentFormId(formId);

        setTimeout(() => {
            setIsLoading(false);
            setIsPopupVisible(true);
        }, 2000);
    };


    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            console.log(`Form ID: ${text} copied to clipboard!`);
            setCopiedFormId(text);
            setTimeout(() => setCopiedFormId(null), 2000);
        } catch (err) {
            console.error('Fallback: Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

    const handleFormId = (formId) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(formId)
                .then(() => {
                    alert(`Form ID: ${formId} copied to clipboard!`);
                    setCopiedFormId(formId);
                    setTimeout(() => setCopiedFormId(null), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy form ID: ', err);
                    fallbackCopyTextToClipboard(formId);
                });
        } else {
            console.error('Clipboard API not supported. Falling back to execCommand.');
            fallbackCopyTextToClipboard(formId);
        }
    };

    const handleEdit = (formId) => {
        const form = createdForms.find(form => {
            return form.formId === formId;
        });

        if (form) {
            navigator('/app/forms/new', {
                state: {
                    formTitle: form.title,
                    fields: form.fields,
                    formId: form.formId,
                    styles: form.styles,
                    isEditing: true,
                    toggleStatus: form.toggleStatus,
                    url: form.url,
                    editorValue: form.editorValue,
                    thankYouTimer: form.thankYouTimer,
                    submissionOption: form.submissionOption,
                    subject: form.subject
                },
            });
            setThankYouTimer(thankYouTimer);
            setEditorValue(editorValue);
            setUrl(url);
            setIsActive(isActive);
            setEditingFormId(formId);
            setSubmissionOption(submissionOption);
            setFormWidth(form.styles.width);
            setBackgroundImage(form.styles.backgroundImage);
            setBorderColor(form.styles.borderColor);
            setMarginForm(form.styles.marginForm);
            setPadding(form.styles.padding);
            setBorderRadius(form.styles.borderRadius);
            setSubject(subject);
        } else {
            alert('Form not found.');
        }
    };

    const openDeletePopup = (formId) => {
        setFormToDelete(formId);
        setDeletePopup(true);
    };

    const closeDeletePopup = () => {
        setDeletePopup(false);
        setFormToDelete(null);
    };

    const handleDeleteForm = async () => {
        if (!formToDelete) return;
        setIsLoading(true);
        setTimeout(async () => {
            try {

                await fetch(`${apiUrl}/delete-form/${formToDelete}`, {
                    method: 'DELETE',
                });

                const updatedForms = createdForms.filter(form => form.formId !== formToDelete);
                setCreatedForms(updatedForms);
                localStorage.setItem('createdForms', JSON.stringify(updatedForms));


                if (updatedForms.length === 0 && view === 'live') {
                    setView('draft');
                }

                if (currentFormId === formToDelete) {
                    setCurrentFormId(null);
                }

                closeDeletePopup();

            } catch (error) {
                console.error('Error deleting form:', error);
            } finally {

                setIsLoading(false);
            }
        }, 3000);
    };

    const handleSearch = (event) => {
        setSearchbar(event.target.value);
    };

    useEffect(() => {
        const filtered = createdForms.filter(form =>
            form.title.toLowerCase().includes(searchbar.toLowerCase()) ||
            form.formId.toLowerCase().includes(searchbar.toLowerCase())
        );
        setFilteredForms(filtered);
        setCurrentPage(1);
    }, [searchbar, createdForms]);

    const filteredByView = filteredForms.filter(form => form.status === view);
    const totalPages = Math.ceil(filteredByView.length / formsPerPage);
    const currentForms = filteredByView.slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchPaymentPlan = async () => {
            try {
                setLoading(true);
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
                setLoading(true);
                // await new Promise((resolve) => setTimeout(resolve, 3000));
                const response1 = await fetch(`${apiUrl}/get-forms`);
                if (!response1.ok) {
                    throw new Error('Network response was not ok');
                }
                const formsData = await response1.json();
                const filteredForms = formsData.filter((form) => form.shop === shop);

                setCreatedForms(filteredForms);
                console.log(filteredForms);

                const response2 = await axios.get(`${apiUrl}/api/forms`);
                const apiFormsData = response2.data;

                const response3 = await axios.get(`${apiUrl}/get/data`);
                const tempeltedata = response3.data;

                if (tempeltedata && Array.isArray(tempeltedata.data)) {
                    console.log("tempeltedata.data is an array");
                } else {
                    throw new Error('Template data is not an array or does not have a data property');
                }
                const updatedForms = filteredForms.map((form1) => {
                    const matchingForm = apiFormsData.find((form2) => form2.id === form1.formId);

                    const matchingTemplate = tempeltedata.data.find((template) => template.form_ids.includes(form1.formId));

                    const updatedForm = {
                        ...form1,
                        totalSubmissions: matchingForm
                            ? matchingForm.submissionCount || matchingForm.submissions?.length || 0
                            : 0,
                        templateTitle: matchingTemplate ? matchingTemplate.title : 'NA',
                    };

                    if (matchingTemplate) {
                        console.log(`Matching template title for formId ${form1.formId}: ${matchingTemplate.title}`);
                    } else {
                        console.log(`No matching template found for formId ${form1.formId}`);
                    }

                    return updatedForm;
                });

                setCreatedForms(updatedForms);

                if (userPlan?.plan === 'free' && userPlan.status === 'active') {
                    const formsToDisable = updatedForms.slice(1);
                    for (const form of formsToDisable) {
                        await fetch(`${apiUrl}/delete-form/${form.formId}`, {
                            method: 'DELETE',
                        });
                    }
                    setCreatedForms(updatedForms.slice(0, 1));
                }
            } catch (error) {
                setError('Error fetching forms');
                console.error('Error fetching forms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentPlan();

    }, [shop]);

    const handleCreateForm = () => {
        if (userPlan?.plan === 'free' && userPlan.status === 'active' && createdForms.length >= 1) {
            setUphradePopup(true);
            return;
        }

        setIsLoading(true);
        navigator('/app/forms/new');
    };


    const handleCancle = () => {
        setUphradePopup(false);
    }

    const handleUpgrade = () => {
        navigator('/app/pricing');
    }

    const handleCopyForm = async (formId) => {
        if (userPlan?.plan === 'free' && userPlan.status === 'active') {
            setUphradePopup(true);
            return;
        }

        const formToCopy = createdForms.find((form) => form.formId === formId);
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
        if (!formToCopy) {
            console.error("Form not found!");
            return;
        }

        setIsLoading(true);

        const copiedForm = {
            ...formToCopy,
            formId: generateUniqueId(),
            title: `Copy of ${formToCopy.title}`,
            createdAt: timestamp,
            fields: formToCopy.fields.map((field) => ({
                ...field,
                id: generateUniqueId(),
            })),
            status: 'live',
        };

        delete copiedForm._id;

        try {

            setTimeout(async () => {
                const response = await fetch(`${apiUrl}/copy-form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(copiedForm),
                });

                if (!response.ok) {
                    throw new Error('Failed to copy form');
                }

                const result = await response.json();
                console.log('Form copied successfully:', result);

                setCreatedForms((prevForms) => [...prevForms, result]);

                setIsLoading(false);

            }, 3000);
        } catch (error) {
            console.error('Error copying form:', error);
            setIsLoading(false);
        }
    };

    const generateUniqueId = (length = 21) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            uniqueId += charset[randomIndex];
        }
        return uniqueId;
    };

    return (
        <>
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
                <div>
                    <div className='builder-forms content-wrapper'>
                        <div className='container'>
                            <h3>Forms</h3>
                            <div className="builder-sections">
                                <div className="builder-sections-forms">
                                    <div
                                        className={`builder-sections-liveform ${view === 'live' ? 'active' : ''}`}
                                        onClick={() => setView('live')}
                                        style={{ backgroundColor: view === 'live' ? '#45A7F6' : '', cursor: 'pointer', color: view === 'live' ? 'white' : '', border: view === 'live' ? '1px solid #45A7F6' : '' }}
                                    >
                                        <p>Live Forms</p>
                                    </div>
                                    <div
                                        className={`builder-sections-draftform ${view === 'draft' ? 'active' : ''}`}
                                        onClick={() => setView('draft')}
                                        style={{ backgroundColor: view === 'draft' ? '#45A7F6' : '', cursor: 'pointer', color: view === 'draft' ? 'white' : '', border: view === 'draft' ? '1px solid #45A7F6' : '' }}
                                    >
                                        <p>Draft Forms</p>
                                    </div>
                                </div>
                                <div className='builder-sections-new-list'>

                                    <div className="builder-sections-newforms">
                                        <button
                                            className="builder-sections-btn action_btn"
                                            onClick={handleCreateForm}
                                        >
                                            <div className="btn-text">
                                                <img src={plus} alt="" />  New Form
                                            </div>
                                        </button>
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

                            {view === 'draft' && createdForms.filter(form => form.status === 'draft').length === 0 ? (
                                <div className='form-builder-live-wrap'>
                                    <div className='builder-live-form'>
                                        <div className='builder-live-p'>
                                            <h2>Draft Forms</h2>
                                        </div>
                                        <div className='form-builder-search-bar'>
                                            <input
                                                type="search"
                                                placeholder='search'
                                                value={searchbar}
                                                onChange={handleSearch}
                                            />
                                            <div className='form_build_icon_search'> <img src={search12} alt="" /></div>
                                        </div>
                                    </div>
                                    <div className="builder-block">
                                        <div className="builder-block-img">
                                            <img src={vecter1} alt="" />
                                        </div>
                                        <div className="builder-block-test">
                                            <p>No draft forms created!</p>
                                        </div>
                                    </div>
                                </div>
                            ) : view === 'live' && createdForms.filter(form => form.status === 'live').length === 0 ? (
                                <div className='form-builder-live-wrap'>
                                    <div className='builder-live-form'>
                                        <div className='builder-live-p'>
                                            <h2>Live Forms</h2>
                                        </div>
                                        <div className='form-builder-search-bar'>
                                            <input
                                                type="search"
                                                placeholder='search'
                                                value={searchbar}
                                                onChange={handleSearch}
                                            />
                                            <div className='form_build_icon_search'> <img src={search12} alt="" /></div>
                                        </div>
                                    </div>
                                    <div className="builder-block">
                                        <div className="builder-block-img">
                                            <img src={vecter1} alt="" />
                                        </div>
                                        <div className="builder-block-test">
                                            <p>No forms created!</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="form-builder-show">
                                    <div className="form-builder-wrrp">
                                        <div className='form-builder-search'>
                                            <div className='form_build_list'><h2>Forms list</h2> </div>
                                            <div className='form-builder-search-bar'>
                                                <input
                                                    type="search"
                                                    placeholder='search'
                                                    value={searchbar}
                                                    onChange={handleSearch}
                                                />
                                                <div className='form_build_icon_search'> <img src={search12} alt="" /></div>
                                            </div>

                                        </div>

                                        {createdForms.length > 0 ? (
                                            <div className="form-main-wrp">
                                                <div className='form-builder-table'>
                                                    <table>
                                                        <thead className="custom-thead">
                                                            <tr>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header ">Form name</th>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header ">
                                                                    Form ID
                                                                </th>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header ">Template name</th>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header form-hide" style={{ textAlign: "center" }}>Responses</th>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header form-hide">Date and time</th>
                                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentForms.filter(form => form.status === view).map(form => (
                                                                <tr key={form.formId}>
                                                                    <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" >
                                                                        <div className="form-builder-wrpp-show-Polaris" onClick={() => handleEdit(form.formId)} >{form.title}
                                                                            <div class="noUi-tooltip">Edit</div>
                                                                        </div>
                                                                    </th>
                                                                    <th
                                                                        data-polaris-header-cell="true"
                                                                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header"
                                                                        scope="col"
                                                                    >
                                                                        <div className="form-builder-wrpp-show-Polaris">
                                                                            <div className='form-builder-form-id'>{form.formId}</div>
                                                                            <div className="formId-copy-popup-Id" onClick={() => handleFormId(form.formId)}>
                                                                                <img src={copy22} alt="" />
                                                                            </div>

                                                                            {copiedFormId === form.formId && (
                                                                                <div className="copied-message" style={{ color: 'green' }}>
                                                                                    Copied !
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </th>
                                                                    <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header " scope="col">
                                                                        {form.templateTitle}
                                                                    </th>
                                                                    <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header form-hide" scope="col" style={{ textAlign: "center" }}>
                                                                        {form.totalSubmissions || 0}
                                                                    </th>
                                                                    <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header form-hide" scope="col">{form.createdAt}</th>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>
                                                                            <div className='form-builder-table-flex-btn'>
                                                                                <div className='form-builder-green-btn' onClick={() => handleCopyForm(form.formId)} >
                                                                                    <img src={copy12} alt="" />
                                                                                    <div className="noUi-tooltip-id">Copy Form</div>
                                                                                </div>
                                                                                <div className='form-builder-edit' onClick={() => handleEdit(form.formId)}>
                                                                                    <img src={oplus} alt="" />
                                                                                    <div className="noUi-tooltip-id">Edit</div>
                                                                                </div>
                                                                                <div className='form-delete-icon' onClick={() => openDeletePopup(form.formId)} style={{ cursor: 'pointer', color: 'red' }}>
                                                                                    <img src={rplus} alt="" />
                                                                                    <div className="noUi-tooltip-id">Delete</div>
                                                                                </div>
                                                                                <div className='form-show-icon' onClick={() => handleShowFormDetails(form.formId)}>
                                                                                    <img src={yplus} alt="" />
                                                                                    <div className="noUi-tooltip-id">Form Preview</div>
                                                                                </div>
                                                                            </div>
                                                                        </th>

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        ) : (
                                            <div className="form-builder-no-forms">
                                                <p>No forms created yet</p>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}
                            <div className='form_build_last_pages'>
                                <div className='form-builder-show-totle-form'>
                                    Showing data {currentForms.length} entries
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
                        </div>
                    </div>
                    <div className='popup'>
                        {isLoading && (
                            <div className="skeleton-wrapper forms fade-in">
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
                        )}
                        {deletePopup && (
                            <div className="form-builder-delete-popup">
                                <div className="form-builder-create section-wrp">
                                    <div className="form-builder-create-wrped popup">
                                        <div className="form-builder-delete-popup-pop">
                                            <div className="form_builder_delete_text_flex">
                                                <div className="form_builder_delete_text">
                                                    <p>Are you sure you want to delete?</p>
                                                </div>
                                                <div className="form_builder_delete_icon" style={{ cursor: "pointer" }} onClick={closeDeletePopup}>
                                                    <img src={cancle1} alt="Cancel" />
                                                </div>
                                            </div>
                                            <div className="form_delete_btn">
                                                <div className="form_delete first" onClick={handleDeleteForm}>
                                                    Delete
                                                </div>
                                                <div className="form_delete second" onClick={closeDeletePopup}>
                                                    Cancel
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isPopupVisible && currentFormId && (
                            <div className="form-builder-create section-wrp some">
                                <div className='form-builder-create-wrped'>
                                    {(view === 'live' || view === 'draft') && createdForms.length > 0 && filteredByView.map(form => (
                                        form.formId === currentFormId && (
                                            <div
                                                key={form.formId}
                                                style={{
                                                    ...form.styles,
                                                    position: 'relative',
                                                    padding: `${form.styles.padding}px`,
                                                    margin: `${form.styles.marginForm}px 0`,
                                                    backgroundColor: 'transparent',
                                                    border: 0,
                                                    boxShadow:0
                                                }}
                                                className="form-details"
                                            >
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundImage: `url(${form.styles.backgroundImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        opacity: form.styles.opacityForm,
                                                        borderRadius: `${form.styles.borderRadius}px`,
                                                        backgroundColor: form.styles.backgroundColor || '#FFFFFF',
                                                        borderWidth: form.styles.borderWidth,
                                                        borderStyle: form.styles.borderStyle,
                                                        borderColor: form.styles.borderColor,
                                                        boxShadow: form.styles.boxShadow
                                                      

                                                    }}
                                                ></div>
                                                <div className='form-builder-create-wrapping-forms '>
                                                    {form.fields.map(field => (
                                                        <div key={field.id} style={{ width: field.width, marginBottom: `${form.styles.inputGap}px` }} className={`input-field  ${field.customClass} input-gap ${parseFloat(field.width) <= 50 ? 'small-width' : ''}`} >
                                                            {field.type !== 'link' && field.type !== 'button' && field.type !== 'divider' && field.type !== 'heading' && field.type !== 'description' && field.type !== 'toggle' && <label style={{ color: form.styles.labelColor }}>{field.label} {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}</label>}
                                                            {field.type === 'name' && <input type="name" placeholder={field.placeholder} required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'text' && <input type="text" placeholder={field.placeholder} required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'textarea' && <textarea placeholder={field.placeholder} required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} name="w3review" rows="4" cols="50"></textarea>}
                                                            {field.type === 'description' && <p style={{ paddingLeft: `${field.textPadding}px`, paddingRight: `${field.textPadding}px`, fontSize: `${field.textSize}px`, lineHeight: `${field.textlineheight}px`, color: field.textColor, textAlign: field.textAline }}>{field.text}</p>}
                                                            {field.type === 'toggle' && (
                                                                <div className='form-build-toggle'>

                                                                    <label className="custom-toggle">
                                                                        <input type="checkbox" aria-label={field.label} required={field.required} disabled={field.disabled} readOnly={field.readonly} />
                                                                        <span className="slider"></span>
                                                                    </label>
                                                                    <div style={{ color: form.styles.labelColor }} >
                                                                        {field.label}
                                                                    </div>

                                                                </div>
                                                            )}
                                                            {field.type === 'heading' && <div className='email-templates-wredd'>  <field.level style={{ fontSize: `${field.fontSize || ''}px`, lineHeight: `${field.headingLineheight}px`, color: field.colorHeading, textAlign: field.textHeading }} >{field.text}</field.level></div>}
                                                            {field.type === 'number' && <input type="number" placeholder={field.placeholder} required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'multi-file' && (
                                                                field.multiOptions[field.id] === 'option1' ? (
                                                                    <input type="file" required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />
                                                                ) : field.multiOptions[field.id] === 'option2' ? (
                                                                    <div className="drag-and-drop-text third  multifile-second">
                                                                        <div className='form-builder-chaneging-wrap file multifile1 '>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped' required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.width === '25%' ? '20px' : undefined, textAlign: field.width === '25%' ? 'center' : undefined, }}>
                                                                                <img src={multifile1} alt="" />
                                                                                <div className="email-files drop">
                                                                                    <h2 style={{
                                                                                        fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '10px' : undefined,
                                                                                    }}> Drag & Drop <span style={{ color: "#09ae54" }}>images,</span></h2>
                                                                                    <h2 style={{
                                                                                        fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                    }}><span style={{ color: "#09ae54" }}>videos,</span> or any <span style={{ color: "#09ae54" }}>file</span></h2>
                                                                                </div>
                                                                                <span className='form-builder-changes-file-button' style={{
                                                                                    fontSize: field.width === '25%' ? '12px' : undefined,
                                                                                }}>Upload</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : field.multiOptions[field.id] === 'option3' ? (
                                                                    <div className="drag-and-drop-text third multifile-second">
                                                                        <div className='form-builder-chaneging-wrap file'>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped' required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.width === '25%' ? '20px' : undefined }}>
                                                                                <img src={multifile12} alt="" />
                                                                                <div className='email-files drop'>
                                                                                    <h3 style={{
                                                                                        color: "#404b52",
                                                                                        fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                    }}>Drag & drop files or <span style={{ color: '#79c27c', textDecoration: 'underline' }}>Browse</span></h3>
                                                                                    <p style={{
                                                                                        color: '#676767',
                                                                                        fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                        maxWidth: field.width === '25%' ? '100%' : undefined,
                                                                                        marginBottom: field.width === '25%' ? '30px' : undefined,
                                                                                    }}>Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, Al, Word, PPT</p>
                                                                                    <span className='form-builder-changes-file-button'
                                                                                        style={{
                                                                                            fontSize: field.width === '25%' ? '12px' : undefined,
                                                                                            padding: field.width === '25%' ? '10px 20px' : undefined,
                                                                                        }}
                                                                                    >Upload files</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : null
                                                            )}
                                                            {field.type === 'file' && (
                                                                field.fileOptions[field.id] === 'option1' ? (
                                                                    <input type="file" required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />
                                                                ) : field.fileOptions[field.id] === 'option2' ? (
                                                                    <div className="drag-and-drop-text third" required={field.required} disabled={field.disabled} readOnly={field.readonly} >
                                                                        <div className='form-builder-chaneging-wrap file'>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped'>
                                                                                <img src={singlefile} alt="" />
                                                                                <div className='email-files drop'>
                                                                                    <p>Drag & Drop your files here</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : field.fileOptions[field.id] === 'option3' ? (
                                                                    <div className="drag-and-drop-text first" required={field.required} disabled={field.disabled} readOnly={field.readonly}  >
                                                                        <div className='form-builder-chaneging-wrap file'>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, gap: field.width === '25%' ? '10px' : undefined, }}>
                                                                                <img src={file} alt="" style={{ width: field.width === '25%' ? '50px' : undefined }} />
                                                                                <div className="email-files drop"
                                                                                    style={{
                                                                                        width: field.width === '25%' ? '100%' :
                                                                                            field.width === '50%' ? '100%' :
                                                                                                field.width === '75%' ? '38%' :
                                                                                                    field.width === '100%' ? '26%' :
                                                                                                        field.width || '60%',
                                                                                    }}
                                                                                >
                                                                                    <p style={{
                                                                                        fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '10px' : undefined,
                                                                                    }}>Drop Files Here or <span>browse for files.</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                ) : null
                                                            )}

                                                            {field.type === 'email' && <input type="email" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'password' && <input type="password" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'url' && <input type="url" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'location' && <input type="location" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'date' && <input type="date" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'datetime' && <input type="datetime" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'time' && <input type="time" required={field.required} disabled={field.disabled} readOnly={field.readonly} placeholder={field.placeholder} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />}
                                                            {field.type === 'phone' && (
                                                                <div className='phone-edit'>
                                                                    <PhoneInput
                                                                        required={field.required} disabled={field.disabled} readOnly={field.readonly}
                                                                        country={'us'}
                                                                        value={field.value || ''}
                                                                        onChange={(phone) => {
                                                                            if (typeof field.onChange === 'function') {
                                                                                field.onChange(phone);
                                                                            } else {
                                                                                console.error('field.onChange is not a function');
                                                                            }
                                                                        }}
                                                                        placeholder={field.placeholder}
                                                                        containerStyle={{
                                                                            width: '100%',
                                                                        }}
                                                                        inputStyle={{
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${form.styles.inputRadious}px`,
                                                                            borderWidth: `${form.styles.inputwidth}px`,
                                                                            borderStyle: form.styles.inputstyle,
                                                                            borderColor: form.styles.inputborderColor,
                                                                            backgroundColor: form.styles.inputBgColor,
                                                                            width: '100%',
                                                                             height:'50px'
                                                                        }}
                                                                        buttonStyle={{
                                                                            borderRadius: `${form.styles.inputRadious}px`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}

                                                            {field.type === 'link' && (
                                                                <div>
                                                                    <a
                                                                        href={field.linkUrl}
                                                                        target={field.linkTarget}
                                                                        style={{
                                                                            fontSize: `${field.linkfontsize}px`,
                                                                            textDecoration: 'none',
                                                                            textAlign: field.linkaline,
                                                                            padding: field.padding,
                                                                        }}
                                                                        dangerouslySetInnerHTML={{ __html: field.linktext }}
                                                                    />
                                                                </div>
                                                            )}
                                                            {field.type === 'images' && (field.imageOptions[field.id] === 'option1' ? (
                                                                <input type="file" required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />
                                                            ) : field.imageOptions[field.id] === 'option2' ? (

                                                                <div className="drag-and-drop-text third" required={field.required} disabled={field.disabled} readOnly={field.readonly} >
                                                                    <div className='form-builder-chaneging-wrap file'>
                                                                        <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                        <div className='form-builder-changes-file-wraped'>
                                                                            <img src={singleimage0} alt="" />
                                                                            <div className='email-files drop'>
                                                                                <p style={{ color: "#676767" }}>Drag & Drop your image here</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : field.imageOptions[field.id] === 'option3' ? (
                                                                <div className="drag-and-drop-text first singleimages" required={field.required} disabled={field.disabled} readOnly={field.readonly} >
                                                                    <div className='form-builder-chaneging-wrap file'>
                                                                        <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                        <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, gap: field.width === '25%' ? '10px' : undefined, }}>
                                                                            <img src={singleimage1} style={{ width: field.width === '25%' ? '50px' : undefined }} />
                                                                            <div className='email-files drop'
                                                                                style={{
                                                                                    width: field.width === '25%' ? '100%' :
                                                                                        field.width === '50%' ? '100%' :
                                                                                            field.width === '75%' ? '38%' :
                                                                                                field.width === '100%' ? '26%' :
                                                                                                    field.width || '60%',
                                                                                }}
                                                                            >
                                                                                <h2 style={{
                                                                                    fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                    lineHeight: field.width === '25%' ? '10px' : undefined,
                                                                                }}>Drop image Here</h2>
                                                                                <h2 style={{
                                                                                    fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                    lineHeight: field.width === '25%' ? '10px' : undefined,
                                                                                }}>or <span style={{ color: "#00ac4f" }}>browse for image.</span></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                            )}
                                                            {field.type === 'multi-image' && (
                                                                field.multiimagesOptions[field.id] === 'option1' ? (
                                                                    <input type="file" required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }} />
                                                                ) : field.multiimagesOptions[field.id] === 'option2' ? (
                                                                    <div className="drag-and-drop-text third  multifile-second multi-image" required={field.required} disabled={field.disabled} readOnly={field.readonly} >
                                                                        <div className='form-builder-chaneging-wrap file '>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, gap: field.width === '25%' ? '10px' : undefined, }}>
                                                                                <img src={multiimg1} alt="" />
                                                                                <div className='email-files drop'>
                                                                                    <h2 style={{
                                                                                        color: "#404b52",
                                                                                        fontSize: field.width === '25%' ? '16px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '20px' : undefined,
                                                                                    }}>Drop your images here</h2>
                                                                                    <span><span style={{
                                                                                        color: "#9ed29f", fontSize: field.width === '25%' ? '16px' : undefined,
                                                                                        lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                    }}>Browse file </span>  from your computer </span>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : field.multiimagesOptions[field.id] === 'option3' ? (
                                                                    <div className="drag-and-drop-text third multifile-second multi" required={field.required} disabled={field.disabled} readOnly={field.readonly} >
                                                                        <div className='form-builder-chaneging-wrap file'>
                                                                            <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                            <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, gap: field.width === '25%' ? '10px' : undefined, }}>
                                                                                <img src={multiimg} alt="" style={{ width: field.width === '25%' ? '50px' : undefined }} />
                                                                                <div className='email-files drop'>
                                                                                    <h3 style={{ color: "#404b52", fontSize: field.width === '25%' ? '16px' : undefined, lineHeight: field.width === '25%' ? '16px' : undefined, }}>Drag & Drop  <span style={{ color: '#00ac4f', lineHeight: field.width === '25%' ? '16px' : undefined, fontSize: field.width === '25%' ? '16px' : undefined, }}>images,</span></h3>
                                                                                    <span style={{
                                                                                        fontSize: field.width === '25%' ? '12px' : undefined,

                                                                                    }} className='form-builder-changes-file-button'>Upload</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : null
                                                            )}
                                                            {field.type === 'slider' && (
                                                                <input
                                                                    type="range"
                                                                    placeholder={field.placeholder}
                                                                    min={field.min}
                                                                    max={field.max}
                                                                    step={field.step}
                                                                    required={field.required} disabled={field.disabled} readOnly={field.readonly}
                                                                    style={{
                                                                        padding: field.inputPadding,
                                                                        borderRadius: `${form.styles.inputRadious}px`,
                                                                        borderWidth: `${form.styles.inputwidth}px`,
                                                                        borderStyle: `${form.styles.inputstyle}`,
                                                                        borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`,
                                                                    }}
                                                                />
                                                            )}
                                                            {field.type === 'button' && <div style={{ textAlign: field.buttonaline }}><button style={{
                                                                backgroundColor: field.backgroundColor || '#45a7f6',
                                                                fontSize: `${field.buttontext || '16'}px`,
                                                                minHeight: field.buttonHeight || 'auto',
                                                                minWidth: `${field.btnwidth}px`,
                                                                padding: `${field.padding}px`,
                                                                color: field.btncolor,
                                                                borderWidth: `${field.buttonBorderWidth}px`,
                                                                borderRadius: `${field.btnradious}px`,
                                                                borderStyle: field.buttonBorderStyle,
                                                                borderColor: field.buttonBorderColor,
                                                            }}> <label>{field.label}</label> </button></div>}

                                                            {field.type === 'divider' && (
                                                                <div style={{display:'flex', justifyContent: field.dividerAline}}><hr required={field.required} disabled={field.disabled} readOnly={field.readonly} style={{ border: '1px solid ' + (field.dividerColor || '#000'),width: field.dividerWidth, margin:'0' }} /></div>
                                                            )}
                                                            {field.type === 'radio' && (
                                                                <div style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }}>
                                                                    {field.options.map(option => (
                                                                        <div key={option.id} className='form_radio_flex' >
                                                                            <input
                                                                                type="radio"
                                                                                name={field.name}
                                                                                value={option.value}
                                                                                required={field.required} disabled={field.disabled} readOnly={field.readonly}
                                                                            />
                                                                            <label>{option.label}</label>
                                                                        </div>

                                                                    ))}
                                                                    <div className='description'>{field.description}</div>
                                                                </div>
                                                            )}
                                                            {field.type === 'checkbox' && (
                                                                <div style={{ padding: field.inputPadding, borderRadius: `${form.styles.inputRadious}px`, borderWidth: `${form.styles.inputwidth}px`, borderStyle: `${form.styles.inputstyle}`, borderColor: `${form.styles.inputborderColor}`, backgroundColor: `${form.styles.inputBgColor}`, }}>
                                                                    {field.options.map(option => (
                                                                        <div key={option.id} className='form_checkbox_flex'>
                                                                            <input
                                                                                type="checkbox"
                                                                                name={field.name}
                                                                                value={option.value}
                                                                                required={field.required} disabled={field.disabled} readOnly={field.readonly}
                                                                            />
                                                                            <label>{option.label}</label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {field.type === 'select' && (
                                                                <div>
                                                                    <CustomSelect
                                                                        options={field.options}
                                                                        selectedValue={selectedOption ? selectedOption.label : ''}
                                                                        onChange={(option) => setSelectedOption(option)}
                                                                        formStyles={form.styles}
                                                                        required={field.required} disabled={field.disabled} readOnly={field.readonly}
                                                                    />
                                                                </div>
                                                            )}
                                                            {(field.type !== 'heading' && field.type !== 'description') && (
                                                                <div className='description' style={{ whiteSpace: 'pre-line', wordBreak: 'break-word', minHeight: `${form.styles.maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                            )}

                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='form-builder-icon-delete' onClick={() => setIsPopupVisible(false)}>
                                                    <img src={cancle1} alt="" />
                                                </div>
                                            </div>

                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            )}
          <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
        </>
    );
};

export default Formdata;
