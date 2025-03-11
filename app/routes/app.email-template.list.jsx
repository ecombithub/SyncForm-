import '../index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from '@remix-run/react';
import search12 from '../images/search12.png';
import down from '../images/down.png';
import left from '../images/left1.png';
import right from '../images/right1.png';
import yplus from '../images/yplus.png';
import cancle1 from '../images/cancle1.png'
import rplus from '../images/rplus.png';
import copy12 from '../images/copy12.png'
import { format } from 'date-fns';
import oplus from '../images/oplus.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import plusicon from '../images/plusicon.png';
import copyeddd from '../images/copyeddd.png';
import cancleimg from '../images/cancleimg.png';

import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
    const { session } = await authenticate.admin(request);
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
    console.log("API URL:", apiUrl);

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

export default function EmailTemplate() {
    const generateUniqueFormId = () => {
        return 'Form' + Math.random().toString(36).substring(2, 15);
    };
    const [formsData, setFormsData] = useState([]);
    const [newformsData, setNewFormsData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formsPerPage] = useState(4);
    const [formsPer] = useState(4);
    const navigate = useNavigate();
    const [previwPopup, setPreviwPopup] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTempalte, setSearchTempalte] = useState('');
    const [deletePopup, setDeletePopup] = useState(false);
    const [formToDelete, setFormToDelete] = useState(null);
    const [showFormNames, setShowFormNames] = useState(false);
    const [showtemplate, setShowTemplate] = useState(false);
    const [selectedFormName, setSelectedFormName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const { shop, apiUrl } = useLoaderData() || {};
    const [isLoading, setIsLoading] = useState(false);
    const [matchedData, setMatchedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userPlan, setUserPlan] = useState(null);
    const [upgradePopup, setUphradePopup] = useState(false);

    const fetchForms = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/get/base64`);
            let fetchedData = response.data.data || [];

            fetchedData = fetchedData.filter(form => form.shop === shop);

            const planResponse = await axios.get(`${apiUrl}/payment/plan?shop=${shop}`);
            setUserPlan(planResponse.data);
            console.log("User Plan:", planResponse.data);

            if (planResponse.data?.plan === "free" && planResponse.data.status === "active") {
                if (fetchedData.length > 1) {
                    const [firstTemplate, ...formsToDelete] = fetchedData;

                    console.log("Forms to delete:", formsToDelete);

                    await Promise.all(formsToDelete.map(async (form) => {
                        const idToDelete = form.formId || form.templateId || form._id;
                        if (idToDelete) {
                            console.log("Deleting Form ID:", idToDelete);
                            try {
                                await axios.delete(`${apiUrl}/delete/${idToDelete}`);
                            } catch (err) {
                                console.error(`Failed to delete form ID ${idToDelete}:`, err);
                            }
                        } else {
                            console.error("Skipping deletion. Missing valid ID for:", form);
                        }
                    }));

                    fetchedData = [firstTemplate];
                }
            }

            fetchedData = fetchedData.slice().reverse();
            setFormsData(fetchedData);
            console.log("Final templates:", fetchedData);
        } catch (error) {
            setError(`Error fetching forms: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    const handlePreviw1 = async (form) => {
        try {
            setLoading(true);
            setSelectedForm(form);
            setPreviwPopup(!previwPopup);

            const response = await axios.get(`${apiUrl}/get/data`);
            const fetchedData = response.data.data || [];

            const matchedData = fetchedData.find(item => item.templateId === form.templateId);

            if (matchedData) {
                console.log("Matched data:", matchedData);
                setMatchedData(matchedData);
            } else {
                console.log("No matching data found for templateId:", form.templateId);
                setMatchedData(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {

            setLoading(false);
        }
    };

    const handlePreviw = async (form) => {
        try {
            setLoading(true);

            setSelectedForm(form);
            setPreviwPopup(!previwPopup);

            const response = await axios.get(`${apiUrl}/template/data`);
            const fetchedData = response.data.data || [];

            const matchedData = fetchedData.find(item => item.templateId === form.templateId);

            if (matchedData) {
                console.log("Matched data:", matchedData);
                setMatchedData(matchedData);
            } else {
                console.log("No matching data found for templateId:", form.templateId);
                setMatchedData(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {

            setLoading(false);
        }
    };

    const handleEditClick = async (form) => {
        try {

            const response = await axios.get(`${apiUrl}/get/data`);
            const fetchedData = response.data.data || [];

            const matchedData = fetchedData.find(item => item.templateId === form.templateId);

            if (matchedData) {
                const updatedForm = {
                    ...form,
                    ...matchedData,
                };

                navigate('/app/email-template/new', { state: { formData: updatedForm } });
            } else {
                console.error(`No matching template found for templateId: ${form.templateId}`);
            }
        } catch (error) {
            console.error(`Error fetching data for template edit: ${error.message}`);
        }
    };

    const tempalted = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/template/image`);
            const fetchedData = response.data.data || [];
            const reversedData = fetchedData.slice().reverse();
            setNewFormsData(reversedData);
            console.log("Filtered data fetchedData", fetchedData);
        } catch (error) {
            setError(`Error fetching forms: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleTemplate = async (form) => {
        if (userPlan?.plan === 'free' && userPlan.status === 'active') {
            setUphradePopup(true);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/template/data`);
            const fetchedData = response.data.data || [];

            console.log('Fetched Data:', fetchedData);
            const matchedData = fetchedData.find(item => item.templateId === form.templateId);

            if (matchedData) {
                console.log('Matched data:', matchedData, shop);

                const payload = {
                    ...matchedData,
                    shop,
                };

                const sendResponse = await axios.post(`${apiUrl}/send/api`, payload);

                console.log('Response from send API:', sendResponse.data);
                fetchForms();

            } else {
                console.log('No matching data found for templateId:', form.templateId);
            }
        } catch (error) {
            console.error('Error sending template data:', error.message);
            alert('Error sending template');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteForm = async () => {
        if (!formToDelete) return;

        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.delete(`${apiUrl}/delete/${formToDelete}`);
                console.log(response.data.message);

                setFormsData((prevForms) =>
                    prevForms.filter((form) => form.templateId !== formToDelete)
                );
            } catch (error) {
                console.error('Error deleting form:', error);
                setError('Failed to delete form. Please try again later.');
            } finally {
                closeDeletePopup();
                setLoading(false);
            }
        }, 2000);
    };

    const openDeletePopup = (templateId) => {
        setFormToDelete(templateId);
        setDeletePopup(true);
    };

    const closeDeletePopup = () => {
        setDeletePopup(false);
        setFormToDelete(null);
    };

    const handleCopyTemplate = async (template) => {
        if (userPlan?.plan === 'free' && userPlan.status === 'active') {
            setUphradePopup(true);
            return;
        }
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

        setLoading(true);

        try {
            const [base64Response, dataResponse] = await Promise.all([
                axios.get(`${apiUrl}/get/base64`),
                axios.get(`${apiUrl}/get/data`),
            ]);

            const base64Forms = base64Response.data.data || [];
            const dataForms = dataResponse.data.data || [];

            console.log('Fetched base64 Forms:', base64Forms);
            console.log('Fetched Data Forms:', dataForms);

            const base64Form = base64Forms.find(form => form.templateId === template.templateId);
            const dataForm = dataForms.find(form => form.templateId === template.templateId);

            if (base64Form && dataForm) {
                console.log('Matching form found in both responses:', dataForm);

                const copiedForm = {
                    ...dataForm,
                    templateId: generateUniqueFormId(),
                    formId: generateUniqueFormId(),
                    title: `Copy of ${dataForm.title}`,
                    createdAt: timestamp,
                    fields: Array.isArray(dataForm.fields)
                        ? dataForm.fields.map((field) => ({
                            ...field,
                            id: generateUniqueFormId(),
                        }))
                        : [],
                };

                delete copiedForm._id;

                const response = await axios.post(`${apiUrl}/copy-email`, copiedForm);

                console.log('Response from /copy-email API:', response);

                if (response.status === 201) {
                    setFormsData((prevForms) => [...prevForms, response.data]);
                }
            } else {
                if (!base64Form) {
                    console.error('Template ID not found in base64 response.');
                }
                if (!dataForm) {
                    console.error('Template ID not found in data response.');
                }
            }
        } catch (error) {
            console.error('Error copying template:', error.message);
            setError('Failed to copy template. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
        tempalted();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePage = (page) => {
        setCurrent(page);
    };


    const filteredForms = formsData.filter((form) =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredForms.length / formsPerPage);

    const currentForms = filteredForms.slice(
        (currentPage - 1) * formsPerPage,
        currentPage * formsPerPage
    );

    const filteredtemplate = newformsData.filter((form) =>
        form.title.toLowerCase().includes(searchTempalte.toLowerCase())
    );
    const total = Math.ceil(filteredtemplate.length / formsPer);

    const currenttemplate = filteredtemplate.slice(
        (current - 1) * formsPer,
        current * formsPer
    );

    const renderField = (field) => {
        const { viewMode = 'desktop' } = field;

        switch (field.type) {
            case 'heading':
                const HeadingTag = field.headingLevel || "h1";
                return <div style={{
                    borderWidth: `${field.headingBorderWidth}px`,
                    borderStyle: field.headingBorderStyle,
                    borderColor: field.headingBorderColor,
                    width: `${field.bannerImageWidth}%`,
                    height: field.bannerImageHeight || '400px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: `${field.headingmargin}px`,
                    position: 'relative',
                }}>
                    <div style={{
                        backgroundImage: field.headingbgImage ? `url(${field.headingbgImage})` : 'none',
                        backgroundColor: field.headingbg,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderWidth: `${field.headingBorderWidth}px`,
                        borderStyle: field.headingBorderStyle,
                        borderColor: field.headingBorderColor,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: field.headeropacity || 1,

                    }} />
                    <div style={{
                        zIndex: 99,
                        width: '100%',
                        textAlign: field.headingTextAlign || '',
                        padding: `${field.headingPadding}px`,
                    }}>
                        <HeadingTag style={{
                            color: field.headingColor,
                            letterSpacing: `${field.headingLetterSpacing}px`,
                            textAlign: field.headingTextAlign ? field.headingTextAlign : '',
                            fontWeight: field.headingFontWeight,
                            fontFamily: field.headingfamily,

                        }}>
                            {field.headingText}</HeadingTag>

                        {(field.editorContent) && (
                            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%', fontSize: `${field.headingsubheading}px`, fontFamily: field.subheadingfamily, letterSpacing: `${field.subheadingleter}px`, color: field.subheadingColor, }}
                                className="heading-editor-content"
                                dangerouslySetInnerHTML={{
                                    __html: field.editorContent
                                }}
                            />
                        )}
                        {field.headingUrl && (
                            <a href={field.headingUrl} target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        fontFamily: field.headingbtnfamily,
                                        background: field.headerbtnbg,
                                        color: field.headerbtncolor,
                                        height: `${field.headingbtnheight}px`,
                                        minWidth: `${field.headingbtnwidth}px`,
                                        fontSize: `${field.headingbtnFontSize}px`,
                                        borderRadius: `${field.headingbtnradious}px`,
                                        paddingLeft: `${field.headingbtnPadding}px`,
                                        paddingRight: `${field.headingbtnPadding}px`,
                                        paddingTop: `${field.headingbtntopPadding}px`,
                                        paddingBottom: `${field.headingbtntopPadding}px`,
                                        borderWidth: `${field.headingbtnBorderWidth}px`,
                                        borderStyle: field.headingbtnBorderStyle,
                                        borderColor: field.headingbtnBorderColor,
                                        fontWeight: field.headingbtnweight,
                                        marginTop: '20px'
                                    }}
                                >{field.headerbtn}</button>
                            </a>
                        )}
                    </div>
                </div>

            case 'description':
                return <div>
                    <p style={{
                        fontSize: `${field.descritionFontSize}px`,
                        backgroundColor: field.descriptionbg,
                        padding: `${field.descriptionPadding}px`,
                        letterSpacing: `${field.descriptionLetterSpacing}px`,
                        textAlign: field.descriptionTextAlign ? field.descriptionTextAlign : '',
                        borderWidth: `${field.descriptionBorderWidth}px`,
                        borderStyle: field.descriptionBorderStyle,
                        borderColor: field.descriptionBorderColor,
                        fontWeight: field.descritionFontWeight,
                        color: field.descritionColor
                    }}>{field.value}</p>
                </div>;
            case 'divider':
                return (
                    <div style={{ backgroundColor: field.dividerbgColor || 'transparent', width: '100%' }}>
                        <hr
                            style={{
                                border: `${field.dividerheight}px solid ${field.dividerColor}`,
                                width: `${field.dividerWidth}%`,
                                margin: 'auto',
                                marginLeft: field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'left' ? '0' : '',
                                marginRight: field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'right' ? '0' : '',
                            }}
                        />
                    </div>
                )

            case 'button':
                return (
                    <div style={{ backgroundColor: field.buttonbgColor, textAlign: field.buttonaline }}>
                        <a href={field.buttonUrll} target='_blank'>
                            <button
                                style={{
                                    fontFamily: field.buttonfamily,
                                    backgroundColor: field.buttonColor || '#008CBA',
                                    padding: `${field.buttonPadding}px` || '10px 20px',
                                    height: `${field.buttonHeight}px` || '10px',
                                    minWidth: `${field.buttonWidth}px`,
                                    fontSize: `${field.buttonFontSize}px` || 'Button',
                                    color: field.buttonTextColor,
                                    borderWidth: `${field.buttonBorderWidth}px`,
                                    borderStyle: field.buttonBorderStyle,
                                    borderColor: field.buttonBorderColor,
                                    letterSpacing: `${field.buttonLetterSpacing}px`,
                                    borderRadius: `${field.buttonradious}px`,
                                    fontWeight: field.buttonweight
                                }}
                            >
                                {field.buttonLabel || ''}
                            </button>
                        </a>
                    </div>
                );
            case 'costum':
                return (
                    <div style={{
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        width: '100%',
                        fontSize: `${field.costumFont}px`,
                        color: field.costumColor,
                        backgroundColor: field.costumBg,
                        textAlign: field.costumAline,
                        lineHeight: `${field.costumline}px`,
                        padding: `${field.costumPadding}px`,
                        fontFamily: field.costomfamily,
                        fontWeight: field.costumfontweight,
                        letterSpacing: `${field.costumLetter}px`
                    }}>
                        {field.costumText}
                    </div>
                );
            case 'product':
                return (
                    <div>
                        {field.products && field.products.length > 0 ? (
                            <div
                                className={`product-grid ${matchedData?.styles?.viewMode === 'mobile' ? 'mobile-view' : 'desktop-view'}`}
                                style={{
                                    display:  matchedData?.styles?.viewMode === 'mobile' ? 'block' : 'grid',
                                    gridTemplateColumns: `repeat(${field.productsPerRow}, 1fr)`,
                                    gap: '20px',
                                    padding: `${field.productPadding}px`,
                                    backgroundColor: field.productbg,
                                    borderWidth: `${field.productBorderWidth}px`,
                                    borderStyle: field.productBorderStyle,
                                    borderColor: field.productBorderColor,
                                    color: field.productTextColor,
                                    fontFamily: field.productfamily,
                                    lineHeight: `${field.productline}px`
                                }}
                            >
                                {field.products.map((product, index) => (
                                    <div key={index} className="product-item" style={{ display: 'flex',marginBottom:  matchedData?.styles?.viewMode === 'mobile' ? '15px' : '0', flexDirection: 'column', gap: '10px', textAlign: 'center' }}>

                                        {product.image ? (
                                            <div className="images-gallery">
                                                <img
                                                    src={product.image}
                                                    alt={product.images || 'Product Image'}
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                        <div>
                                            <p style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>{product.title}</p>
                                            {field.showPrice && (
                                                <p style={{ marginTop: '10px', fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>Price: ${product.price}</p>
                                            )}
                                        </div>
                                        {field.showbtnn && (
                                            <a
                                                href={field.buttonUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button
                                                    style={{
                                                        fontSize: `${field.productfontSize}px`,
                                                        minWidth: `${field.productwidth}px`,
                                                        height: `${field.productheight}px`,
                                                        fontFamily: field.productbtnfamily,
                                                        backgroundColor: field.productbackgroundColor,
                                                        borderWidth: `${field.productbtnBorderWidth}px`,
                                                        borderStyle: field.productbtnBorderStyle,
                                                        borderColor: field.productbtnBorderColor,
                                                        color: field.productbtnbg,
                                                        borderRadius: `${field.productradious}px`,
                                                    }}
                                                    className="show-bnt-prodcut"
                                                >
                                                    {field.productLabel || 'Buy Now'}
                                                </button>
                                            </a>
                                        )}

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                );

            case 'images':
                return <div style={{
                    textAlign: field.imgTextAlign ? field.imgTextAlign : '',
                    backgroundColor: field.imgbg,
                    borderWidth: `${field.imgBorderWidth}px`,
                    borderStyle: field.imgBorderStyle,
                    borderColor: field.imgBorderColor,
                }}>
                    <img src={field.value} alt={field.label} style={{
                        width: `${field.imgWidth}%`,
                        padding: `${field.imgPadding}px`,
                        verticalAlign:'bottom',
                    }} />
                </div>;
            case 'richtext':
                return <div>
                    <div style={{
                        textAlign: field.richTextAlign || '',
                        fontSize: `${field.richFontsize}px`,
                        letterSpacing: `${field.richspace}px`,
                        color: field.richtextcolor,
                        backgroundColor: field.richbgcolor,
                        paddingLeft: `${field.richleftPadding}px`,
                        paddingRight: `${field.richleftPadding}px`,
                        paddingTop: `${field.richtopPadding}px`,
                        paddingBottom: `${field.richtopPadding}px`,
                        display: 'flow-root',
                        textDecoration: field.richline,
                        fontFamily: field.richFontfamily,
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%'
                    }} dangerouslySetInnerHTML={{ __html: field.content }} />
                </div>;
            case 'Multicolumn':
                const columns = parseInt(field.columnCount);
                const columnsPerRow = field.columnsPerRow || 1;
                return (
                    <div style={{ display: 'flow-root', width: '100%' }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: `${field.Multigap || 10}px`,
                            padding: `${field.MultiPadding}px`,
                            textAlign: 'center',
                            backgroundColor: field.Multibgcolor,
                            color: field.MultiColor,
                            justifyContent: 'space-between'
                        }}>
                            {field.columnData.map((column, index) => (
                                <div
                                    key={column._id}
                                    style={{
                                        flex: `1 1 calc(100% / ${columnsPerRow} - ${field.Multigap || 10}px)`,
                                        maxWidth: `calc(100% / ${columnsPerRow} - ${field.Multigap || 10}px)`,
                                        fontSize: `${field.fontsizeMulticolumn}px`,
                                        borderWidth: `${field.MulticolumnbtnBorderWidth || 1}px`,
                                        borderStyle: field.MulticolumnbtnBorderStyle || 'solid',
                                        borderColor: field.MulticolumnbtnBorderColor || 'black',
                                        padding: `${field.MulticolumnPadding || 10}px`,
                                        backgroundColor: field.Multicolumnbgcolor,
                                        textAlign: field.Multitext,
                                        color: field.MultiColor,
                                        borderRadius: `${field.Multiborderradious}px`,
                                        fontFamily: field.Multifamily,
                                        letterSpacing: `${field.Multiletter}px`,
                                         display:'block'
                                    }}
                                >
                                    {column.image && (
                                        <img src={column.image} alt={`Column ${index}`} style={{ verticalAlign:'bottom', width: `${field.Multiimgwidth || 100}%`, height: 'auto' }} />
                                    )}

                                    <div
                                        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}
                                        dangerouslySetInnerHTML={{ __html: column.content }} />

                                    {column.isVisible && (
                                        <a href={column.Multibtnurl} target='_blank' onClick={(e) => e.preventDefault()}>
                                            <button style={{
                                                marginTop: "20px",
                                                backgroundColor: field.Multibtnbg,
                                                fontFamily: field.Multibtnfamily,
                                                borderWidth: `${field.MultibtnBorderWidth}px`,
                                                borderStyle: field.MultibtnBorderStyle,
                                                borderColor: field.MultibtnBorderColor,
                                                minWidth: `${field.Multibtnweight || '100'}px`,
                                                height: `${field.Multibtnheight || '40'}px`,
                                                color: field.Multibtncolor,
                                                borderRadius: `${field.Multibtnradious}px`,
                                                fontSize: `${field.Multibtnfont || '14'}px`,
                                                fontWeight: field.MultiWeight
                                            }}>
                                                {column.Multibtnlable || 'Click'}
                                            </button>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                );

            case 'html convert':
                return <div style={{ fontFamily: field.htmlfamily, whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%', padding: `${field.htmlPadding}px`, color: field.htmlColor, fontSize: `${field.htmlFontSize}px` }} dangerouslySetInnerHTML={{ __html: field.value }} />;

            case 'spacer':
                return (
                    <div
                        style={{
                            height: `${field.spacerHeight || 20}px`,
                            backgroundColor: field.spacerbg || '#EDEDED',
                            width: '100%',
                            display: 'flex'
                        }}
                    ></div>
                );
            case 'split-group':
                return (
                    <div
                        style={{
                            backgroundColor: field.splitbg,
                            display: matchedData?.styles?.viewMode === "mobile" ? "block" : "flex",
                            position: 'relative',
                            float: 'inline-start',
                            color: field.splitColor,
                            fontSize: `${field.splittextSize}px`,
                            fontFamily: field.splitfamily,
                            width:'100%'
                        }}
                    >
                        {field.children.map((child) => (
                            <div key={child.id} style={{ textAlign: child.splitTextAlin, padding: `${child.splitPadding}px`, width: matchedData?.styles?.viewMode === 'mobile' ? '100%' : child.width || '50%',display:"flex", letterSpacing: `${child.splitletter}px`, }}>
                                {child.add === 'image' ? (
                                    <img
                                        src={child.value} 
                                        alt="Uploaded Preview"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems:
                                                child.splittext === 'left'
                                                    ? 'flex-start'
                                                    : child.splittext === 'center'
                                                        ? 'center'
                                                        : 'flex-end',
                                        }}
                                    >
                                        <div style={{ width: '100%' }}>
                                            <div
                                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%', }}
                                                dangerouslySetInnerHTML={{ __html: child.value }}
                                            />
                                            {field.showbtnsplit && (
                                                <div>
                                                    <a href={field.splitbtnurl} target="_blank" onClick={(e) => e.preventDefault()}>
                                                        <button
                                                            style={{
                                                                marginTop: '20px',
                                                                fontFamily: field.splitbtnfamily,
                                                                backgroundColor: field.splitbtnbg,
                                                                fontSize: `${child.splitbtnfont}px`,
                                                                color: field.splitbtncolor || "#000",
                                                                height: `${child.splitbtnheight}px`,
                                                                minWidth: `${child.splitbtnwidth}px`,
                                                                borderRadius: `${child.splitbtnradious}px`,
                                                                borderWidth: `${child.splitBorderWidth}px`,
                                                                borderStyle: field.splitBorderStyle,
                                                                borderColor: field.splitBorderColor,
                                                                fontWeight: field.splitbtnWeight,
                                                            }}
                                                        >
                                                            {child.splitbtn}
                                                        </button>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'socalicon':
                return (
                    <div
                        style={{
                            backgroundColor: field.socalIconbg,
                            padding: `${field.socalIconPadding}px`,
                            display: 'flex',
                            justifyContent: field.socaliconTextAlign === 'center' ? 'center' :
                                field.socaliconTextAlign === 'right' ? 'flex-end' :
                                    'flex-start',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <div className="form-builder-icon" style={{ display: "flex", gap: `${field.socalIcongap}px` }}>
                            {field.value?.facebook?.url && !field.value.facebook.isHidden && (
                                <a href={field.value.facebook.url} target="_blank" rel="noopener noreferrer">
                                    <img src={facebook} alt="Facebook" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.value?.twitter?.url && !field.value.twitter.isHidden && (
                                <a href={field.value.twitter.url} target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} alt="Twitter" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.value?.instagram?.url && !field.value.instagram.isHidden && (
                                <a href={field.value.instagram.url} target="_blank" rel="noopener noreferrer">
                                    <img src={instagram} alt="Instagram" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.customIcons?.length > 0 && field.customIcons
                                .filter(icon => !icon.isHidden)
                                .map((icon, index) => (
                                    <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer">
                                        <img src={icon.src} alt={`custom-icon-${index}`} style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                    </a>
                                ))}
                        </div>
                    </div>

                );
            default:
                return null;
        }
    };

    const handleToggleFormNames = () => {
        setShowFormNames(!showFormNames);
    };

    const handleToggleTemplate = () => {
        setShowTemplate(!showtemplate);
    };

    const handleSelectFormName = (title) => {
        setSelectedFormName(title);
        setShowFormNames(false);
    };

    const handleSelectTemplate = (title) => {
        setSelectedTemplate(title);
        setShowTemplate(false);
    };

    const handleSelectAllForms = () => {
        setSelectedFormName(null);
        setShowFormNames(false);
    };

    const handleSelectAlltemplate = () => {
        setSelectedTemplate(null);
        setShowTemplate(false);
    };

    const handleCancle = () => {
        setUphradePopup(false);
    }

    const handleUpgrade = () => {
        navigate('/app/pricing');
    }

    const handleCreateTemplate = async () => {
        setIsLoading(true);
        try {

            const planResponse = await axios.get(`${apiUrl}/payment/plan?shop=${shop}`);
            const userPlan = planResponse.data;

            if (userPlan?.plan === "free" && userPlan.status === "active") {

                const templatesResponse = await axios.get(`${apiUrl}/get/base64`);
                const fetchedData = templatesResponse.data.data || [];

                if (fetchedData.length >= 1) {
                    setUphradePopup(true);
                    setIsLoading(false);
                    return;
                }
            }

            setTimeout(() => {
                navigate('/app/email-template/new');
            }, 1000);

        } catch (error) {
            console.error("Error checking plan or templates:", error);
            alert("Something went wrong while checking your plan or templates.");
        }
    };

    return (
        <>
            {isLoading && (
                <div className="skeleton-wrapper forms create fade-in">
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
                <div className="email-template-section">

                    <div className='container'>
                        <div className="email-tempalte-your">
                            <div className="email-tempalte-wrap">
                                <div className="email-template-h2">
                                    <h2>Your Email template</h2>
                                </div>
                                <div className="email-templete-search-bar">
                                    <div className='create-email-templates' onClick={handleCreateTemplate}>
                                        <img src={plusicon} alt="" />
                                        <p>Create blank email</p>
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
                                    <div className="form-builder-search-bar">
                                        <input id="search" type="search" placeholder="Search" value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} />
                                        <div className="form_build_icon_search">
                                            <img src={search12} alt="" />
                                        </div>
                                    </div>
                                    <div className="show_forms_all">
                                        <span className="name_build">
                                            Sort by :
                                            <span style={{ fontWeight: 700, cursor: 'pointer' }} onClick={handleToggleFormNames}>
                                                Email name <span className="form-short">
                                                    <img src={down} alt="" />
                                                </span>
                                            </span>
                                        </span>
                                        <div className={`form-names-list ${showFormNames ? 'show' : ''}`}>
                                            <div onClick={handleSelectAllForms}>All Templates</div>
                                            {currentForms.map(form => (
                                                <div key={form.id} onClick={() => handleSelectFormName(form.title)}>
                                                    {form.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="email-template-show">
                                <div className="email-template-show-wreped">
                                    {filteredForms.length === 0 ? (
                                        <p>No template available.</p>
                                    ) : (
                                        currentForms
                                            .filter(form => selectedFormName ? form.title === selectedFormName : true)
                                            .map((form) => (
                                                <div
                                                    key={form.createdAt}
                                                    className="email-templates"
                                                >
                                                    <div className='email-tempalte-text'>
                                                        <div>
                                                            {form.TemplateImage && (
                                                                <img
                                                                    src={form.TemplateImage}
                                                                    alt="Template"
                                                                    style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='email-title-t'>
                                                            <p>{form.title}</p>
                                                            <p>{form.createdAt}</p>
                                                        </div>
                                                        <div className='email-templete-icon-wrp'>
                                                            <div className="email-template-icons-all">
                                                        
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handleCopyTemplate(form)}>
                                                                    <img src={copy12} alt="" />
                                                                </div>
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handleEditClick(form)}>
                                                                    <img src={oplus} alt="" />
                                                                </div>
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => openDeletePopup(form.templateId)}>
                                                                    <img src={rplus} alt="" />
                                                                </div>
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handlePreviw1(form)}>
                                                                    <img src={yplus} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
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
                        <div className='email-templete-use-add'>
                            <div className="email-tempalte-your">
                                <div className="email-tempalte-wrap">
                                    <div className="email-template-h2">
                                        <h2>Saved templates</h2>
                                    </div>
                                    <div className="email-templete-search-bar">

                                        <div className="form-builder-search-bar">
                                            <input id="search" type="search" placeholder="Search" value={searchTempalte}
                                                onChange={(e) => setSearchTempalte(e.target.value)} />
                                            <div className="form_build_icon_search">
                                                <img src={search12} alt="" />
                                            </div>
                                        </div>

                                        <div className="show_forms_all">
                                            <span className="name_build">
                                              Sort by :
                                                <span style={{ fontWeight: 700, cursor: 'pointer' }} onClick={handleToggleTemplate}>
                                                    Email name <span className="form-short">
                                                        <img src={down} alt="" />
                                                    </span>
                                                </span>
                                            </span>
                                            <div className={`form-names-list ${showtemplate ? 'show' : ''}`}>
                                                <div onClick={handleSelectAlltemplate}>All Templates</div>
                                                {currenttemplate.map(form => (
                                                    <div key={form.id} onClick={() => handleSelectTemplate(form.title)}>
                                                        {form.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* <div className='create-email-templates' onClick={handleCreateTemplate}>
                                        <img src={plusicon} alt="" />
                                        <p>Create blank email</p>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="email-template-show">
                                    <div className="email-template-show-wreped">
                                        {filteredtemplate.length === 0 ? (
                                            <p>No template available.</p>
                                        ) : (
                                            currenttemplate.filter(form => selectedTemplate ? form.title === selectedTemplate : true).map((form) => (
                                                <div key={form.createdAt} className="email-templates">
                                                    <div className='email-tempalte-text'
                                                    >
                                                        <div>
                                                            {form.TemplateImage && (
                                                                <img
                                                                    src={form.TemplateImage}
                                                                    alt={`${form.title} preview`}
                                                                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='email-title-t'>
                                                            <h3>{form.title}</h3>
                                                            <h3>{form.createdAt}</h3>
                                                        </div>
                                                        <div className='email-templete-icon-wrp'>
                                                            <div className="email-template-icons-all" >
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handleTemplate(form)}>
                                                                    <img src={copyeddd} alt="" />
                                                                </div>
                                                                
                                                                <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handlePreviw(form)}>
                                                                    <img src={yplus} alt="" />
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className="pagination">
                                    <nav>
                                        <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
                                            <li>
                                                <button
                                                    type="button"
                                                    disabled={current === 1}
                                                    onClick={() => handlePage(current - 1)}
                                                >
                                                    <img src={left} alt="Previous" />
                                                </button>
                                            </li>
                                            {Array.from({ length: total }, (_, index) => (
                                                <li key={index + 1} aria-current={current === index + 1 ? 'page' : undefined}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePage(index + 1)}
                                                        className={`${current === index + 1 ? 'active' : 'inactive'}`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    type="button"
                                                    disabled={currentPage === total}
                                                    onClick={() => handlePage(currentPage + 1)}
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

                    {previwPopup && selectedForm && (
                        <div className='email-template-reviw-popup emial-wrap'>

                            {loading ? (
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
                            ) : (
                                <div className='email-tempalte-textt text-wraped email-templates-wredd'
                                    style={{
                                        width: matchedData?.styles?.width,
                                        backgroundColor: matchedData?.styles?.backgroundColor || '#fff',
                                        borderRadius: `${matchedData?.styles?.borderRadius}px` || 5,
                                        padding: `${matchedData?.styles?.templatePadding}px`,
                                        textAlign: matchedData?.styles?.textAlign || 'left',
                                        backgroundImage: matchedData?.styles?.backgroundImage
                                            ? `url(${matchedData?.styles.backgroundImage})`
                                            : '',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        fontFamily: matchedData?.styles?.fontFamily || ''
                                    }}
                                >
                                    <div className='form-builder-icon-deleted' onClick={() => setPreviwPopup(false)}>
                                        <img src={cancle1} alt="" />
                                    </div>
                                    <div>
                                        {matchedData?.fields?.map((field) => (
                                            <div className='form-builder-template-email' key={field.name}>
                                                {renderField(field)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            )}
           <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
        </>
    );
}
