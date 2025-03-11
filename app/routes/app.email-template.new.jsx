import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import image from '../images/image-0.png';
import divider2 from '../images/divider0.png';
import btn from '../images/btn0.png';
import emailtemp from '../images/emailtemp.png';
import phonem from '../images/phonem.png';
import cancle1 from '../images/disconnect.png'
import desk from '../images/desk.png';
import socail from '../images/socail0.png';
import htmlicon from '../images/htmlicon0.png';
import maximizesize from '../images/maximize-size1.png';
import deletep from '../images/deletep.png';
import delete1 from '../images/delete1.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import videoplay from '../images/videoplay.png';
import drop from '../images/slideicon.png';
import left from '../images/left.png';
import right from '../images/right.png';
import hdbg from '../images/hdbg.jpeg';
import product from '../images/product0.png';
import spacer from '../images/space0.png';
import banner from '../images/banner0.png';
import imghd from '../images/bgimg.jpeg';
import imghd1 from '../images/imghd1.png';
import itext from '../images/image-0.png';
import editicon from '../images/edit.png';
import savemail from '../images/savemail1.png';
import canclemail from '../images/canclemail1.png';
import multimedia from '../images/multimedia0.png';
import rich from '../images/rich0.png';
import costum from '../images/costum.png';
import remove from '../images/remove.png';
import redsign from '../images/redsign.png';
import file from '../images/file.png';
import cancleimg from '../images/cancleimg.png';
import bk from '../images/bk.png';
import dlrm from '../images/dlrm.png';
import search12 from '../images/search12.png';
import productcancle from '../images/productcancle.png';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';

import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Link } from "@remix-run/react";
import { authenticate, apiVersion } from "../shopify.server";

const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ color: [] }, { background: [] }],
    ['clean'],
];

const generateUniqueId = (length = 22) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        uniqueId += charset[randomIndex];
    }
    return uniqueId;
};

export const loader = async ({ request }) => {
    try {
        const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
        const { session } = await authenticate.admin(request);
        const { shop, accessToken } = session;
        console.log('apiUrl:', apiUrl);
        console.log('Shop:', shop);
        console.log('Access Token:', accessToken);

        const graphqlQuery = {
            query: `
                query {
                    products(first: 50) {
                        edges {
                            node {
                                id
                                title
                                featuredImage {
                                    src
                                }
                                variants(first: 10) {
                                    edges {
                                        node {
                                            id
                                            title
                                            price
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `
        };

        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken,
            },
            body: JSON.stringify(graphqlQuery),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        const products = responseData?.data?.products?.edges || [];

        const productsWithData = products.map(product => {
            const variants = product.node.variants.edges.map(variant => variant.node);
            const uniqueColors = Array.from(new Set(variants.map(variant => variant.option1))).join(' | ');
            const uniquePrices = Array.from(new Set(variants.map(variant => variant.price))).join(' | ');
            const uniqueSizes = Array.from(new Set(variants.map(variant => variant.option2))).join(' | ');

            return {
                id: product.node.id,
                title: product.node.title,
                color: uniqueColors,
                price: uniquePrices,
                size: uniqueSizes,
                image: product.node.featuredImage ? product.node.featuredImage.src : null,
            };
        });

        console.log('Processed Products:', productsWithData);

        return { products: productsWithData, shop: shop, apiUrl: apiUrl };
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return { products: [], shop: null };
    }
};

const EmailTemplateCreate = () => {

    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [emailTemplateId, setEmailTemplateId] = useState(null);
    const formBuilderRef = useRef(null);
    const [formTitle, setFormTitle] = useState('Email-Template');
    const [existingTitles, setExistingTitles] = useState([]);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [showHeadingPopup, setShowHeadingPopup] = useState(false);
    const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
    const [headingText, setHeadingText] = useState('');
    const [headingLevel, setHeadingLevel] = useState('h1');
    const [selectedOption, setSelectedOption] = useState('heading');
    const [imageUrl, setImageUrl] = useState(null);
    const [headingFontSize, setHeadingFontSize] = useState('40');
    const [descriptionText, setDescriptionText] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [borderRadious, setBorderRadious] = useState(5);
    const [templatePadding, setTemplatePadding] = useState('20');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [textAlign, setTextAlign] = useState('left');
    const [imageFieldId, setImageFieldId] = useState(null);
    const [showField, setShowField] = useState(true);
    const [showFields, setShowFields] = useState(true);
    const [showSocialIconPopup, setShowSocialIconPopup] = useState(false);
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [emailFieldPopup, setEmailFieldPopup] = useState(false);
    const [activeFieldId, setActiveFieldId] = useState(null);
    const [socalIconWidth, setSocalIconWidth] = useState(30);
    const [socalIconHeight, setSocalIconHeight] = useState(30);
    const [formDataAdd, setFormDataAdd] = useState([]);
    const [selectedFormIds, setSelectedFormIds] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [showVideoInput, setShowVideoInput] = useState(false);
    const { products, shop, apiUrl, apiVersion } = useLoaderData();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productTitles, setProductTitles] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [popupFieldTitle, setPopupFieldTitle] = useState('');
    const [showPrice, setShowPrice] = useState(false);
    const [showbtnn, setShowbtnn] = useState(false);
    const [productsPerRow, setProductsPerRow] = useState(3);
    const [lastProductFieldId, setLastProductFieldId] = useState(null);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const emailFieldRef = useRef(null);
    const popupRef = useRef(null);
    const [selectedIcons, setSelectedIcons] = useState({
        facebook: true,
        twitter: true,
        instagram: true,
    });
    const [customIcons, setCustomIcons] = useState([]);
    const [id, setId] = useState(null);
    const location = useLocation();
    const { formData } = location.state || {};
    const [viewMode, setViewMode] = useState('desktop');
    const [dividerColor, setDividerColor] = useState('#000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showbtn, setShowBtn] = useState(false);
    const [emailWidth, setEmailWidth] = useState('800px');
    const [headingColor, setHeadingColor] = useState('#000');
    const formsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [ReactQuill, setReactQuill] = useState(null);
    const [editorValue, setEditorValue] = useState('');
    const [headingUrl, setHeadingUrl] = useState('');
    const [texteditorValue, setTextEditorValue] = useState('');
    const [columnCount, setColumnCount] = useState(6);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [columnImages, setColumnImages] = useState({});
    const [editorValues, setEditorValues] = useState({});
    const [editorValueed, setEditorValueed] = useState('');
    const [currentFieldId, setCurrentFieldId] = useState(null);
    const [isPopupVisibleed, setPopupVisibleed] = useState(false);
    const [popupFieldId, setPopupFieldId] = useState(null);
    const [showFieldInput, setShowFieldInput] = useState(false);
    const [showFieldPro, setShowFieldPro] = useState(false);
    const [saveEmail, setSaveEmail] = useState(false);
    const [cancelEmail, setCancelEmail] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [columnsPerRow, setColumnsPerRow] = useState(3);
    const [showbtnsplit, setShowbtnsplit] = useState(false);
    const [showbtnmulti, setShowbtnmulti] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [connectedForms, setConnectedForms] = useState([]);
    const selectRef = useRef(null);
    const [fonts, setFonts] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [hoveredFieldId, setHoveredFieldId] = useState(null);
    const [isHeadingAdded, setIsHeadingAdded] = useState(false);
    const [isRichTextAdded, setIsRichTextAdded] = useState(false);
    const [isbuttonTextAdded, setIsbuttonTextAdded] = useState(false);
    const [isdividerTextAdded, setIsdividerTextAdded] = useState(false);
    const [issplitTextAdded, setIssplitTextAdded] = useState(false);
    const [isimagesTextAdded, setIsimagesTextAdded] = useState(false);
    const [issocialTextAdded, setIssocialTextAdded] = useState(false);
    const [ishtmlTextAdded, setIshtmlTextAdded] = useState(false);
    const [isspacerTextAdded, setIsspacerTextAdded] = useState(false);
    const [ismultiTextAdded, setIsmultiTextAdded] = useState(false);
    const [isproductTextAdded, setIsproductTextAdded] = useState(false);
    const [iscostomTextAdded, setIscostomTextAdded] = useState(false);
    const [disconnectForm, setDisconnectForm] = useState(false);
    const [disconnectFormId, setDisconnectFormId] = useState(null);

    useEffect(() => {
        const fetchFonts = async () => {
            try {
                const response = await fetch(`${apiUrl}/font-family`);
                const data = await response.json();
                if (data && data.data) {
                    setFonts(data.data);
                }
            } catch (error) {
                console.error('Error fetching fonts:', error);
            }
        };

        fetchFonts();
    }, []);

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        setFontFamily(selectedFont);
    };


    useEffect(() => {
        if (formData) {
            console.log('Form data received:', formData);
            console.log('Fields:', formData.fields);

            if (formData.fields && formData.fields.length > 0) {
                const field = formData.fields[0];

                if (field.columnData) {
                    console.log('Column Data:', field.columnData);
                } else {
                    console.log('Column Data not found in the first field');
                }
            } else {
                console.log('No fields found in formData');
            }

            if (Array.isArray(formData.fields)) {
                const validFields = formData.fields.map(field => {
                    if (!field.id) {
                        console.warn('Field missing ID:', field);
                    }

                    if (field.type === 'product') {
                        console.log('Price for product field:', field.price);
                        if (field.showPrice === true) {
                            setShowPrice(true);
                        }
                        if (field.showbtnn === true) {
                            setShowbtnn(true);
                        }
                    }
                    if (field.type === 'split') {
                        console.log('split for split field:', field.price);
                        if (field.showbtnsplit === true) {
                            setShowbtnsplit(true);
                        }
                    }

                    if (field.type === 'Multicolumn') {
                        console.log('split for split field:', field.price);
                        if (field.showbtnmulti === true) {
                            setShowbtnmulti(true);
                        }
                    }
                    return { ...field, id: field.id || generateUniqueId() };
                });

                setFields(validFields);
            }
            console.log('ViewMode:', formData.styles?.viewMode);

            if (formData.styles && formData.styles.viewMode) {
                setViewMode(formData.styles.viewMode);
            } else {
                console.log('viewMode not found in styles');
            }

            setEmailWidth(formData.styles.width);
            setBackgroundColor(formData.styles.backgroundColor);
            setBorderRadious(formData.styles.borderRadious);
            setBackgroundImage(formData.styles.backgroundImage);
            setTemplatePadding(formData.styles.templatePadding);
            setTextAlign(formData.styles.textAlign);
            setFontFamily(formData.styles.fontFamily);
            setEmailTemplateId(formData.templateId);
            setFormTitle(formData.title);
            setId(formData._id);
            setSelectedFormIds(formData.form_ids || []);
            const productsPerRow = formData.fields[0]?.productsPerRow || 3;
            setProductsPerRow(productsPerRow);
            const coloumPerRow = formData.fields[0]?.columnsPerRow || 3;
            setColumnsPerRow(coloumPerRow);
            console.log('Products per row:', formData.fields[0]?.productsPerRow);
            const columnCount = parseInt(formData.styles.columnCount) || '';
            setColumnCount(columnCount);
            setSelectedIcons(prevIcons => {
                console.log("Updating selectedIcons to:", prevIcons);
                return prevIcons; 
            });
        }
    }, [formData]);

    const createInputField = (type, add, parentId, initialValue = '') => {
        const id = generateUniqueId();
        console.log(`Creating field of type ${type} with ID: ${id}`);

        return {
            id,
            type,
            contentType: 'text',
            add: add,
            parentId: parentId,
            image: type === 'images' ? initialValue : null,
            headerbtnbg: type === 'heading' ? '#FFFFFF' : undefined,
            headerbtncolor: type === 'heading' ? '#000' : undefined,
            headingbtnPadding: type === 'heading' ? 5 : undefined,
            headingbtntopPadding: type === 'heading' ? 5 : undefined,
            headingbtnradious: type === 'heading' ? 4 : undefined,
            headingbtnFontSize: type === 'heading' ? 14 : undefined,
            headingbtnwidth: type === 'heading' ? '100' : undefined,
            headingbtnheight: type === 'heading' ? '35' : undefined,
            headingbtnweight: type === 'heading' ? '300' : undefined,
            headingbtnfamily: type === 'heading' ? '"Poppins", sans-serif' : undefined,
            headerbtn: type === 'heading' ? 'Click Now' : undefined,
            headingsubheading: type === 'heading' ? '16' : undefined,
            headeropacity: type === 'heading' ? '1' : undefined,
            subheadingColor: type === 'heading' ? '#000000' : undefined,
            subheadingleter: type === 'heading' ? '0' : undefined,
            subheadingfamily: type === 'heading' ? '' : undefined,
            subheadingline: type === 'heading' ? '50' : undefined,
            headingbtnBorderColor: type === 'heading' ? '#000000' : undefined,
            headingbtnBorderWidth: type === 'heading' ? '1' : undefined,
            headingbtnBorderStyle: type === 'heading' ? 'solid' : undefined,
            bannerImageWidth: type === 'heading' ? '100' : undefined,
            bannerImageHeight: type === 'heading' ? '600px' : undefined,
            bannerImageTextAlign: type === 'heading' ? '' : undefined,
            headingText: type === 'heading' ? 'The Three Lions Collection' : undefined,
            headingLevel: type === 'heading' ? 'h1' : null,
            headingfamily: type === 'heading' ? '' : undefined,
            headingFontSize: type === 'heading' ? '' : undefined,
            headingLetterSpacing: type === 'heading' ? 0 : undefined,
            headingPadding: type === 'heading' ? 20 : undefined,
            headingline: type === 'heading' ? 50 : undefined,
            headingTextAlign: type === 'heading' ? "" : undefined,
            headingColor: type === 'heading' ? '#000' : undefined,
            headingbg: type === 'heading' ? '' : undefined,
            headingmargin: type === 'heading' ? '0' : undefined,
            headingbgImage: type === 'heading' ? '' : undefined,
            headingBorderColor: type === 'heading' ? '#000000' : undefined,
            headingBorderWidth: type === 'heading' ? '0' : undefined,
            headingBorderStyle: type === 'heading' ? 'solid' : undefined,
            headingUrl: type === 'heading' ? '#' : undefined,
            headingFontWeight: type === 'heading' ? 600 : undefined,
            descritionFontSize: type === 'description' ? '16' : undefined,
            descritionColor: type === 'description' ? '#000' : undefined,
            descritionFontWeight: type === 'description' ? 500 : undefined,
            descriptionText: type === 'description' ? initialValue : 'No Description Provided',
            descriptionbg: type === 'description' ? '#0000' : undefined,
            descriptionPadding: type === 'description' ? 10 : undefined,
            descriptionLetterSpacing: type === 'description' ? 0 : undefined,
            descriptionTextAlign: type === 'description' ? "" : undefined,
            descriptionBorderColor: type === 'description' ? '#000000' : undefined,
            descriptionBorderWidth: type === 'description' ? '0' : undefined,
            descriptionBorderStyle: type === 'description' ? 'solid' : undefined,
            name: type === 'heading' ? initialValue :
                type === 'description' ? 'Description' :
                    `Field_${id}`,
            label: type === 'heading' ? 'Heading' :
                type === 'description' ? 'Description' :
                    type === 'button' ? 'Submit' :
                        `Default Label for ${type}`,
            value: initialValue || (type === 'description' ? 'No Description Provided' : ''),
            dividerColor: type === 'divider' ? '#000' : undefined,
            dividerAline: type === 'divider' ? '' : undefined,
            dividerbgColor: type === 'divider' ? '#FFFFFF' : undefined,
            dividerWidth: type === 'divider' ? '100' : undefined,
            dividerheight: type === 'divider' ? '1' : undefined,
            buttonColor: type === 'button' ? '#007BFF' : undefined,
            buttonfamily: type === 'button' ? '"Poppins", sans-serif' : undefined,
            buttonweight: type === 'button' ? '300' : undefined,
            buttonbgColor: type === 'button' ? '#FFFFFF' : undefined,
            buttonTextColor: type === 'button' ? '#FFFFFF' : undefined,
            buttonFontSize: type === 'button' ? 16 : undefined,
            buttonPadding: type === 'button' ? 10 : undefined,
            buttonWidth: type === 'button' ? 100 : undefined,
            buttonHeight: type === 'button' ? 40 : undefined,
            buttonradious: type === 'button' ? 2 : undefined,
            buttonLabel: type === 'button' ? 'Submit' : undefined,
            buttonaline: type === 'button' ? '' : undefined,
            buttonBorderColor: type === 'button' ? '#000000' : undefined,
            buttonBorderWidth: type === 'button' ? '1' : undefined,
            buttonBorderStyle: type === 'button' ? 'solid' : undefined,
            buttonLetterSpacing: type === 'button' ? 0 : undefined,
            buttonUrll: type === 'button' ? '' : undefined,
            socalIconWidth: type === 'socalicon' ? 30 : undefined,
            socalIconHeight: type === 'socalicon' ? 30 : undefined,
            socalIconPadding: type === 'socalicon' ? 10 : undefined,
            socalIcongap: type === 'socalicon' ? 5 : undefined,
            socalIconbg: type === 'socalicon' ? '#FFFFFF' : undefined,
            socaliconTextAlign: type === 'socalicon' ? "left" : undefined,
            htmlColor: type === 'html convert' ? '#000' : undefined,
            htmllineheight: type === 'html convert' ? '25' : undefined,
            htmlaline: type === 'html convert' ? '' : undefined,
            htmlFontSize: type === 'html convert' ? 16 : undefined,
            htmlPadding: type === 'html convert' ? 10 : undefined,
            icons: {
                facebook: { url: 'https://facebook.com', isHidden: false },
                twitter: { url: 'https://twitter.com', isHidden: false },
                instagram: { url: 'https://instagram.com', isHidden: false },
            },
            customIcons: [],
            spacerHeight: type === 'spacer' ? '20' : undefined,
            spacerbg: type === 'spacer' ? '#FFFFFF' : undefined,
            splittextSize: type === 'split' ? '14' : undefined,
            splittext: type === 'split' ? 'left' : undefined,
            splitbtn: type === 'split' ? 'Add Text' : undefined,
            splitbtnbg: type === 'split' ? '#FFFFFFF' : undefined,
            splitbtnfont: type === 'split' ? '14' : undefined,
            splitbtncolor: type === 'split' ? '#000' : undefined,
            splitbtnurl: type === 'split' ? '' : undefined,
            splitbtnfamily: type === 'split' ? '"Poppins", sans-serif' : undefined,
            splitbtnheight: type === 'split' ? '35' : undefined,
            splitbtnWeight: type === 'split' ? '100' : undefined,
            splitbtnwidth: type === 'split' ? '80' : undefined,
            splitletter: type === 'split' ? '0' : undefined,
            splitlineheight: type === 'split' ? '20' : undefined,
            splitfamily: type === 'split' ? '' : undefined,
            splitImage: type === 'split' ? '' : undefined,
            splitTextadd: type === 'split' ? '' : undefined,
            splitbtnradious: type === 'split' ? '2' : undefined,
            splitBorderColor: type === 'split' ? '#000000' : undefined,
            splitBorderWidth: type === 'split' ? '1' : undefined,
            splitBorderStyle: type === 'split' ? 'solid' : undefined,
            splitbg: type === 'split' ? '#FFFFFF' : undefined,
            splitheight: type === 'split' ? '300' : undefined,
            videoPadding: type === 'video' ? '20' : undefined,
            splitPadding: type === 'split' ? '0' : undefined,
            splitColor: type === 'split' ? '#000' : undefined,
            splitTextAlin: type === 'split' ? '' : undefined,
            videoBorderColor: type === 'video' ? '#000000' : undefined,
            videoBorderWidth: type === 'video' ? '0' : undefined,
            videoBorderStyle: type === 'video' ? 'solid' : undefined,
            imgWidth: type === 'images' ? '100' : undefined,
            imgTextAlign: type === 'images' ? "" : undefined,
            imgPadding: type === 'images' ? 10 : undefined,
            imgbg: type === 'images' ? '#FFFFFF' : undefined,
            imageValue: type === 'images' ? '' : undefined,
            imgBorderColor: type === 'images' ? '#000000' : undefined,
            imgBorderWidth: type === 'images' ? '0' : undefined,
            imgBorderStyle: type === 'images' ? 'solid' : undefined,
            productPadding: type === 'product' ? 10 : undefined,
            productfamily: type === 'product' ? '"Poppins", sans-serif' : undefined,
            productline: type === 'product' ? '10' : undefined,
            productbg: type === 'product' ? '#FFFFFF' : undefined,
            productBorderColor: type === 'product' ? '#000000' : undefined,
            productBorderWidth: type === 'product' ? '0' : undefined,
            productBorderStyle: type === 'product' ? 'solid' : undefined,
            productFontSize: type === 'product' ? 16 : undefined,
            productTextColor: type === 'product' ? '#000000' : undefined,
            productWeight: type === 'product' ? 400 : undefined,
            productLetterSpacing: type === 'product' ? 0 : undefined,
            productbtnBorderColor: type === 'product' ? '#000000' : undefined,
            productbtnBorderWidth: type === 'product' ? '1' : undefined,
            productbtnBorderStyle: type === 'product' ? 'solid' : undefined,
            productbtnbg: type === 'product' ? '#FFFFFF' : undefined,
            productradious: type === 'product' ? '3' : undefined,
            productLabel: type === 'product' ? 'Shop Now' : undefined,
            productfontSize: type === 'product' ? '12' : undefined,
            productbtnfamily: type === 'product' ? '"Poppins", sans-serif' : undefined,
            productwidth: type === 'product' ? '80' : undefined,
            productheight: type === 'product' ? '30' : undefined,
            productbackgroundColor: type === 'product' ? '#007BFF' : undefined,
            additionalButtons: [],
            displayStyle: 'flex',
            richline: type === 'richtext' ? 'line-Trough' : undefined,
            richleftPadding: type === 'richtext' ? 10 : undefined,
            richtopPadding: type === 'richtext' ? 10 : undefined,
            richFontsize: type === 'richtext' ? "14" : undefined,
            richlineheight: type === 'richtext' ? "30" : undefined,
            richspace: type === 'richtext' ? "0" : undefined,
            richFontfamily: type === 'richtext' ? '"Poppins", sans-serif' : undefined,
            richbgcolor: type === 'richtext' ? "#FFFFFF" : undefined,
            richtextcolor: type === 'richtext' ? "#000" : undefined,
            richTextAlign: type === 'richtext' ? "" : undefined,
            htmlfamily: type === 'html convert' ? '' : undefined,
            htmltext: type === 'html convert' ? '<h1>Your HTML Here</h1>' : undefined,
            fontsizeMulticolumn: type === 'Multicolumn' ? 14 : undefined,
            MulticolumnbtnBorderColor: type === 'Multicolumn' ? '#000000' : undefined,
            MulticolumnbtnBorderWidth: type === 'Multicolumn' ? '1' : undefined,
            MulticolumnbtnBorderStyle: type === 'Multicolumn' ? 'solid' : undefined,
            MulticolumnPadding: type === 'Multicolumn' ? 10 : undefined,
            MultiPadding: type === 'Multicolumn' ? '0' : undefined,
            Multicolumnbgcolor: type === 'Multicolumn' ? '#FFFFFFF' : undefined,
            Multibgcolor: type === 'Multicolumn' ? '#FFFFFFF' : '',
            Multitext: type === 'Multicolumn' ? 'center' : '',
            Multifamily: type === 'Multicolumn' ? '"Poppins", sans-serif' : '',
            Multiletter: type === 'Multicolumn' ? '0' : '',
            Multiheight: type === 'Multicolumn' ? '20' : '',
            Multigap: type === 'Multicolumn' ? '10' : '',
            Multibtnfamily: type === 'Multicolumn' ? '"Poppins", sans-serif' : '',
            MultiColor: type === 'Multicolumn' ? '#000000' : undefined,
            MultibtnBorderColor: type === 'Multicolumn' ? '#000000' : undefined,
            MultibtnBorderWidth: type === 'Multicolumn' ? '1' : undefined,
            MultibtnBorderStyle: type === 'Multicolumn' ? 'solid' : undefined,
            Multibtnheight: type === 'Multicolumn' ? '40' : undefined,
            Multibtnradious: type === 'Multicolumn' ? '2' : undefined,
            Multibtnweight: type === 'Multicolumn' ? '100' : undefined,
            MultiWeight: type === 'Multicolumn' ? '100' : undefined,
            Multibtnbg: type === 'Multicolumn' ? '#FFFFFF' : 'undefined',
            Multibtnlable: type === 'Multicolumn' ? 'Click' : 'undefined',
            Multibtncolor: type === 'Multicolumn' ? '#000000' : undefined,
            Multibtnfont: type === 'Multicolumn' ? '14' : undefined,
            Multibtnurl: type === 'Multicolumn' ? '' : undefined,
            Multiborderradious: type === 'Multicolumn' ? '2' : undefined,
            Multiimgwidth: type === 'Multicolumn' ? '100' : undefined,
            costumText: type === 'costum' ? 'Custom text content is text that is created by a user to be displayed in a specific place' : undefined,
            costumFont: type === 'costum' ? '14' : undefined,
            costumColor: type === 'costum' ? '#000000' : undefined,
            costumBg: type === 'costum' ? '#FFFFFF' : undefined,
            costumAline: type === 'costum' ? 'left' : undefined,
            costumline: type === 'costum' ? '25' : undefined,
            costumPadding: type === 'costum' ? '0' : undefined,
            costomfamily: type === 'costum' ? '"Poppins", sans-serif' : undefined,
            costumfontweight: type === 'costum' ? '' : undefined,
            costumLetter: type === 'costum' ? '0' : undefined,
        };
    };

    const addInputField = (type) => {
        let newField;
        if (type === 'images') {
            setImageFieldId(null);
            newField = createInputField('images');
            setFields((prevFields) => [...prevFields, newField]);
            setSelectedFieldId(newField.id);
            if (window.innerWidth < 540) {
                setIsimagesTextAdded(true);
                setTimeout(() => {
                    setIsimagesTextAdded(false);
                }, 3000);
            }
            if (window.innerWidth > 1400) {
                handleFieldClick(newField.id);
            }
            return;
        } else if (type === 'heading') {
            setEditorValue('');
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIsHeadingAdded(true);
                setTimeout(() => {
                    setIsHeadingAdded(false);
                }, 3000);
            }
            setSelectedFieldId(newField.id);
            if (window.innerWidth > 1400) {
                handleFieldClick(newField.id);
            }
        } else if (type === 'divider') {
            toggleColorPicker();
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIsdividerTextAdded(true);
                setTimeout(() => {
                    setIsdividerTextAdded(false);
                }, 3000);
            }
        } else if (type === 'button') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIsbuttonTextAdded(true);
                setTimeout(() => {
                    setIsbuttonTextAdded(false);
                }, 3000);
            }
        } else if (type === 'socalicon') {
            newField = createInputField('socalicon');
            setFields((prevFields) => {
                const updatedFields = [...prevFields, newField];
                console.log("Updated fields after adding new field:", updatedFields);

                setSelectedFieldId(newField.id);
                setSelectedIcons(newField.icons || {});
                setCustomIcons(newField.customIcons || []);
                setShowSocialIconPopup(true);

                return updatedFields;
            });
            if (window.innerWidth < 540) {
                setIssocialTextAdded(true);
                setTimeout(() => {
                    setIssocialTextAdded(false);
                }, 3000);
            }
        } else if (type === 'html convert') {
            newField = createInputField(type, type === 'html convert' ? '<h1>Your HTML Here</h1>' : '');
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIshtmlTextAdded(true);
                setTimeout(() => {
                    setIshtmlTextAdded(false);
                }, 3000);
            }
        } else if (type === 'split') {
            const parentId = generateUniqueId();
            const splitFields = [
                createInputField("split", "image", parentId),
                createInputField("split", "text", parentId),
            ];

            setFields((prevFields) => [
                ...prevFields,
                { id: parentId, type: "split-group", children: splitFields }
            ]);


            if (splitFields.length > 0) {
                setActiveFieldId(splitFields[0].id);
            }

            if (splitFields.length > 0 && window.innerWidth > 1400) {
                handleFieldClick(splitFields[0].id);
            }
            if (window.innerWidth < 540) {
                setIssplitTextAdded(true);
                setTimeout(() => {
                    setIssplitTextAdded(false);
                }, 3000);
            }
        }
        else if (type === 'spacer') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIsspacerTextAdded(true);
                setTimeout(() => {
                    setIsspacerTextAdded(false);
                }, 3000);
            }
        } else if (type === 'video') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            setShowVideoInput(true);
        } else if (type === 'product') {
            newField = createInputField('product');
            setFields((prevFields) => [...prevFields, newField]);
            setLastProductFieldId(newField.id);
            setIsPopupOpen(true);
            setSelectedProducts([])
            setSearchTerm('');
            if (window.innerWidth < 540) {
                setIsproductTextAdded(true);
                setTimeout(() => {
                    setIsproductTextAdded(false);
                }, 3000);
            }
        } else if (type === 'Multicolumn') {
            const id = generateUniqueId();
            const newField = {
                id,
                type: 'Multicolumn',
                columnCount: 6,
                columnData: Array(6).fill({ content: '', image: null })
            };
            setFields((prevFields) => {
                const updatedFields = [...prevFields, newField];
                if (newField.id && window.innerWidth > 1400) {
                    handleFieldClick(newField.id);
                }
                return updatedFields;
            });
            if (window.innerWidth < 540) {
                setIsmultiTextAdded(true);
                setTimeout(() => {
                    setIsmultiTextAdded(false);
                }, 3000);
            }
        } else if (type === 'richtext') {
            newField = createInputField('richtext');
            setFields((prevFields) => [...prevFields, newField]);
            setCurrentFieldId(newField.id);
            setEditorValueed('');
            if (window.innerWidth < 540) {
                setIsRichTextAdded(true);
                setTimeout(() => {
                    setIsRichTextAdded(false);
                }, 3000);
            }
        } else if (type === 'costum') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            if (window.innerWidth < 540) {
                setIscostomTextAdded(true);
                setTimeout(() => {
                    setIscostomTextAdded(false);
                }, 3000);
            }
        }
        if (newField && newField.id && window.innerWidth > 1400) {
            handleFieldClick(newField.id);
        }
    };

    useEffect(() => {

        const loadReactQuill = async () => {
            const { default: Quill } = await import('react-quill');
            setReactQuill(() => Quill);
        };

        loadReactQuill();
    }, []);

    const handleEdit = (field) => {
        setSelectedFieldId(field.id);
        setSelectedIcons(field.icons);
        setCustomIcons(field.customIcons || []);
        setShowSocialIconPopup(true);
    };

    const handleSaveSocialIcons = () => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === selectedFieldId
                    ? { ...field, icons: selectedIcons, customIcons }
                    : field
            )
        );
        setShowSocialIconPopup(false);

    };

    useEffect(() => {

        handleSaveSocialIcons();
    }, [selectedIcons, customIcons]);


    const handleIconUrlChange = (e, icon) => {
        setSelectedIcons((prevIcons) => ({
            ...prevIcons,
            [icon]: {
                ...prevIcons[icon],
                url: e.target.value,
            },
        }));
    };

    const handleCustomIconUpload = (e) => {
        const files = e.target.files;
        const filePromises = Array.from(files).map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises).then((fileUrls) => {
            const newIcons = fileUrls.map((url) => ({
                src: url,
                name: 'Custom Icon',
                isHidden: false
            }));
            setCustomIcons((prevIcons) => [...prevIcons, ...newIcons]);

        });
        setShowFileUpload(false);
    };

    const handleCustomIconUrlChange = (e, index) => {
        const newUrl = e.target.value;
        setCustomIcons((prevIcons) =>
            prevIcons.map((icon, i) =>
                i === index ? { ...icon, url: newUrl } : icon
            )
        );
    };

    const handleToggleIcon = (icon) => {
        setSelectedIcons((prevIcons) => {
            const updatedIcons = {
                ...prevIcons,
                [icon]: {
                    ...prevIcons[icon],
                    isHidden: !prevIcons[icon]?.isHidden,
                },
            };
    
            checkAndRemoveSocialIconFields(updatedIcons, customIcons);
            return updatedIcons;
        });
    };
    
    const toggleCustomIconVisibility = (index) => {
        setCustomIcons((prevIcons) => {
            const updatedIcons = prevIcons.map((icon, i) =>
                i === index ? { ...icon, isHidden: !icon.isHidden } : icon
            );
    
            checkAndRemoveSocialIconFields(selectedIcons, updatedIcons);
            return updatedIcons;
        });
    };
    
    const checkAndRemoveSocialIconFields = (updatedSelectedIcons, updatedCustomIcons) => {
        const visibleSelectedIcons = Object.values(updatedSelectedIcons).some(icon => !icon.isHidden);
        const visibleCustomIcons = updatedCustomIcons.some(icon => !icon.isHidden);
    
        if (!visibleSelectedIcons && !visibleCustomIcons) {
            console.log("All social icons are hidden. Removing only social icon fields.");
    
            setFields((prevFields) => {
                const newFields = prevFields.filter(field => field.type !== "socalicon"); // Corrected type
                console.log("Updated fields:", newFields); // Debugging log
                return newFields;
            });
        }
    };
    
    const handleImageUpload = (e, fieldId) => {
        const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;

                setFields((prevFields) =>
                    prevFields.map((field) =>
                        field.id === fieldId ? { ...field, value: imageUrl } : field
                    )
                );
                setShowImagePopup(false);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleAddHeading = (e) => {
        e.preventDefault();
        if (emailTemplateId) {
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.id === emailTemplateId
                        ? {
                            ...field,
                            headingText,
                            headingLevel,
                            headingFontSize,
                            headingColor,
                            imageUrl,
                            editorContent: editorValue,
                            headingUrl,
                        }
                        : field
                )
            );
        } else {
            const newField = createInputField('heading', headingText);
            newField.headingLevel = headingLevel;
            newField.headingFontSize = headingFontSize;
            newField.headingColor = headingColor;
            newField.imageUrl = imageUrl;
            newField.editorContent = editorValue;
            newField.headingUrl = headingUrl;
            setFields((prevFields) => [...prevFields, newField]);
        }
        setShowHeadingPopup(false);
        setHeadingText('');
        setHeadingLevel('h1');
        setHeadingFontSize('16');
        setEmailTemplateId(null);
        setImageUrl(null);
        setEditorValue('');
        setHeadingUrl('');
    };

    const handleEditorChange = (value, fieldId) => {
        console.log("Editor value changed:", value);
        console.log("Active field ID:", fieldId);
        setFields((prevFields) => {
            const updatedFields = prevFields.map((field) =>
                field.id === fieldId
                    ? { ...field, editorContent: value }
                    : field
            );
            console.log("Updated fields after editor change:", updatedFields);
            return updatedFields;
        });
    };


    const handleUpdateUrl = (id, newUrl) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, headingUrl: newUrl } : field
            )
        );
    };

    const handleAddDescription = (e) => {
        e.preventDefault();
        if (emailTemplateId) {
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.id === emailTemplateId
                        ? { ...field, descriptionText }
                        : field
                )
            );
        } else {
            const newField = createInputField('description', descriptionText);
            setFields((prevFields) => [...prevFields, newField]);
        }

        setShowDescriptionPopup(false);
        setDescriptionText('');
        setTextEditorValue('');
        setEmailTemplateId(null);
    };

    const handleDescriptionChange = (id, value) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, descriptionText: value } : field
            )
        );
    };

    const removeField = (id) => {
        console.log('Attempting to remove field with ID:', id);
        setFields((prevFields) => {
            const newFields = prevFields.filter(field => field.id !== id);
            setEmailFieldPopup(false)
            console.log('Remaining fields after removal:', newFields);
            return newFields;
        });
    };


    useEffect(() => {
        axios
            .get(`${apiUrl}/get-forms`)
            .then((res) => {
                console.log('API Response:', res.data);
                const filteredData = res.data.filter((form) => form.shop === shop);
                setFormDataAdd(filteredData);
            })
            .catch((error) => console.error('API Error:', error));
    }, [shop]);

    useEffect(() => {
        if (formDataAdd.length > 0) {
            const formIds = formDataAdd.map((form) => form.formId);
            console.log('All form IDs:', formIds);
        }
    }, [formDataAdd]);

    useEffect(() => {
        if (selectRef.current) {

            formDataAdd.forEach((form) => {
                const isFormIdMatched = formData?.form_ids?.includes(form.formId);
                if (isFormIdMatched && selectRef.current) {
                    const option = selectRef.current.querySelector(`option[value="${form.title}"]`);
                    if (option) {
                        option.disabled = false;
                        console.log(`Automatically enabling form ID: ${form.formId}`);
                    }
                }
            });
        }
    }, [formData, formDataAdd]);

    useEffect(() => {
        const fetchConnectedForms = async () => {
            try {
                const results = await Promise.all(
                    formDataAdd.map(async (form) => {
                        const response = await fetch(`${apiUrl}/check-form-connected/${form.formId}`);
                        const data = await response.json();
                        return data.isConnected ? form.formId : null;
                    })
                );
                setConnectedForms(results.filter((id) => id !== null));
            } catch (error) {
                console.error('Error fetching connected forms:', error);
            }
        };

        fetchConnectedForms();
    }, [formDataAdd]);


    const handleFormSelect = async (e) => {
    const title = e.target.value.trim();
    const selectedForm = formDataAdd.find((form) => form.title.trim() === title);

    if (selectedForm) {
        try {
            const isFormIdMatched = formData?.form_ids?.includes(selectedForm.formId);

            if (isFormIdMatched) {
                console.log(`Form ID ${selectedForm.formId} is found in formData.form_ids`);

                const checkResponse = await fetch(`${apiUrl}/check-form-connected/${selectedForm.formId}`);
                const checkData = await checkResponse.json();

                if (checkData.isConnected) {
                    setDisconnectForm(true);
                    setDisconnectFormId(selectedForm.formId);
                    return; 
                }
            } else {
                console.log(`Form ID ${selectedForm.formId} is NOT found in formData.form_ids`);
            }

            const response = await fetch(`${apiUrl}/get/data`);
            const tempeltedata = await response.json();
            const tempeltedataArray = tempeltedata?.data;

            if (tempeltedataArray && Array.isArray(tempeltedataArray)) {
                const isFormConnected = tempeltedataArray.some((template) =>
                    template.form_ids.includes(selectedForm.formId)
                );

                if (isFormConnected) {
                    alert(`The form "${selectedForm.title}" is already connected to another template and cannot be connected to a different one.`);
                    return;
                }
            } else {
                throw new Error('Invalid data received from /get/data.');
            }

            setSelectedFormIds((prevFormIds) =>
                prevFormIds.includes(selectedForm.formId)
                    ? prevFormIds.filter((id) => id !== selectedForm.formId)
                    : [...prevFormIds, selectedForm.formId]
            );

            setSelectedTitles((prevSelectedTitles) =>
                prevSelectedTitles.includes(title)
                    ? prevSelectedTitles.filter((t) => t !== title)
                    : [...prevSelectedTitles, title]
            );
        } catch (error) {
            console.error('Error checking or unlinking form connection:', error);
            alert('An error occurred while processing the form connection.');
        }
    }
};

const handleConfirmUnlink = async () => {
    if (!disconnectFormId) return;

    try {
        const unlinkResponse = await fetch(`${apiUrl}/unlink-template/${disconnectFormId}`, { method: 'PUT' });

        if (unlinkResponse.ok) {
            console.log('Template unlinked from form.');
            setConnectedForms((prevForms) => prevForms.filter((id) => id !== disconnectFormId));
        } else {
            alert('Failed to unlink template.');
        }
    } catch (error) {
        console.error('Error unlinking form:', error);
        alert('An error occurred while unlinking the form.');
    }

 
    setDisconnectForm(false);
    setDisconnectFormId(null);
};


    useEffect(() => {
        console.log('Selected form IDs:', selectedFormIds);
    }, [selectedFormIds]);


    const createOrUpdateForm = async () => {

        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
        let trimmedTitle = formTitle.trim();
        if (!trimmedTitle) {
            alert('Please provide a title for the template.');
            return;
        }

        // if (selectedFormIds.length === 0) {
        //     alert('Please select form before saving the template.');
        //     return;
        // }

        if (!id) {
            try {
                const response = await axios.get(`${apiUrl}/check-title/${trimmedTitle}`);
                if (response.data.exists) {

                    trimmedTitle = `${trimmedTitle}-${format(new Date(), "yyyyMMddHHmmss")}`;
                }
            } catch (error) {
                console.error('Error checking title:', error);
                return;
            }
        }

        const templateId = emailTemplateId || generateUniqueId();
        setEmailTemplateId(templateId);

        if (fields.length === 0) {
            console.warn('No fields to create the form.');
            return;
        }

        const validFields = fields.filter(field => field && field.type);

        const updatedFields = validFields.map(field => {
            let value = '';

            switch (field.type) {
                case 'images':
                    value = field.value || 'No Image Provided';
                    break;
                case 'heading':
                    value = field.value || '';
                    field.editorContent = field.editorContent;
                    field.headingUrl = field.headingUrl || '';
                    field.imageUrl = field.imageUrl || '';
                    break;
                case 'description':
                    value = field.value || '';
                    break;
                case 'socalicon':
                    value = field.icons || 'No Social Icons Provided';
                    break;
                case 'divider':
                    value = field.icons || 'No Social Icons Provided';
                    break;
                case 'button':
                    value = 'Button';
                case 'split-group':
                    console.log("Rendering field:", field);
                    field.children;
                    field.splitbg = field.splitbg || '';
                    field.width = field.width || '50%';
                    field.splitPadding = field.splitPadding || 0;
                    field.splitTextAlin = field.splitTextAlin || 'left';
                    console.log("Final value in split-group case:", value);
                    break;

                case 'spacer':
                    value = 'Spacer Field';
                    field.spacerHeight = field.spacerHeight || 30;
                    field.spacerbg = field.spacerbg || '#f0f0f0';
                    break;
                case 'video':
                    value = field.value;
                    field.videoPadding = field.videoPadding || 20;
                    field.videoBorderWidth = field.videoBorderWidth || 1;
                    field.videoBorderStyle = field.videoBorderStyle || 'solid';
                    field.videoBorderColor = field.videoBorderColor || '#000';
                    break;
                case 'richtext':
                    value = field.value;
                    field.content = field.content || editorValueed || field.value || '';
                    break;
                case 'Multicolumn':
                    value = field.value;

                    if (!field.columnData) {
                        field.columnData = Array.from({ length: columnCount }, (_, i) => ({
                            image: columnImages[`${field.id}-${i}`] || '',
                            content: editorValues[`${field.id}-${i}`] || '',
                            isVisible: false,
                            Multibtnurl: '',
                            Multibtnlable: '',

                        }));
                    } else {

                        for (let i = 0; i < columnCount; i++) {
                            field.columnData[i] = {
                                image: columnImages[`${field.id}-${i}`] || field.columnData[i]?.image,
                                content: editorValues[`${field.id}-${i}`] || field.columnData[i]?.content,
                                isVisible: field.columnData[i]?.isVisible ?? false,
                                Multibtnlable: field.columnData[i]?.Multibtnlable || '',
                                Multibtnurl: field.columnData[i]?.Multibtnurl || '',
                            };
                        }
                    }

                    const validColumns = field.columnData.filter(column => column.image || column.content);

                    field.columnData = validColumns;
                    field.columnsPerRow = field.columnsPerRow || 3;
                    field.columnCount = validColumns.length;

                    break;
                case 'product':
                    return {
                        ...field,
                        products: field.products || [],
                        productsPerRow: field.productsPerRow,
                        viewMode,
                        showPrice: field.showPrice,
                        buttonUrl: field.productUrl || `https://${shop}/admin/products?selectedView=all`,
                        showbtnn: field.showbtnn

                    };

                default:
                    value = '';
            }

            if (field.type === 'html convert') {
                return {
                    ...field,
                    value: field.value || '',
                };
            }

            if (field.type === 'button') {
            }

            if (field.type === 'socalicon') {
                field.socalIconHeight = field.socalIconHeight;
                field.socalIconWidth = field.socalIconWidth;

                const filteredIcons = {
                    facebook: field.icons.facebook?.isHidden ? undefined : field.icons.facebook,
                    twitter: field.icons.twitter?.isHidden ? undefined : field.icons.twitter,
                    instagram: field.icons.instagram?.isHidden ? undefined : field.icons.instagram,
                    send: field.icons.send?.isHidden ? undefined : field.icons.send,
                };

                field.icons = Object.fromEntries(
                    Object.entries(filteredIcons).filter(([key, value]) => value !== undefined)
                );

                field.customIcons = field.customIcons || [];
            } else {
                field.icons = {};
            }
            return {
                ...field,
                label: field.label || (field.type === 'button' ? 'Button' : `Default Label for ${field.type}`),
                name: field.name || `Field_${field.id}`,
                value: field.type === 'product' ? undefined : value,
                headerbtnbg: field.headerbtnbg || null,
                headeropacity: field.headeropacity || '',
                headerbtncolor: field.headerbtncolor || null,
                headerbtn: field.headerbtn || null,
                headingbtnfamily: field.headingbtnfamily  || '"Poppins", sans-serif',
                headingLevel: field.headingLevel || null,
                headingbtnPadding: field.headingbtnPadding || 10,
                headingbtntopPadding: field.headingbtntopPadding || 10,
                headingbtnradious: field.headingbtnradious || 4,
                headingbtnwidth: field.headingbtnwidth || 100,
                headingsubheading: field.headingsubheading || 16,
                headingbtnFontSize: field.headingbtnFontSize || 16,
                headingbtnheight: field.headingbtnheight || 40,
                headingbtnweight: field.headingbtnweight || 300,
                headingbtnBorderWidth: field.headingbtnBorderWidth || 1,
                headingbtnBorderStyle: field.headingbtnBorderStyle || 'solid',
                headingbtnBorderColor: field.headingbtnBorderColor || '#000',
                subheadingColor: field.subheadingColor || '',
                subheadingleter: field.subheadingleter || '',
                subheadingline: field.subheadingline || '',
                bannerImageWidth: field.bannerImageWidth || '100',
                bannerImageHeight: field.bannerImageHeight || '',
                bannerImageTextAlign: field.bannerImageTextAlign || '',
                richTextAlign: field.richTextAlign || '',
                richFontsize: field.richFontsize || '',
                richspace: field.richspace,
                richlineheight: field.richlineheight,
                richbgcolor: field.richbgcolor,
                richFontfamily: field.richFontfamily || '"Poppins", sans-serif',
                richtextcolor: field.richtextcolor,
                richline: field.richline,
                richleftPadding: field.richleftPadding || 10,
                richtopPadding: field.richtopPadding || 10,
                headingFontWeight: field.headingFontWeight || 600,
                headingColor: field.headingColor || '#000',
                headingbg: field.headingbg || '#ffff',
                headingPadding: field.headingPadding || 0,
                headingline: field.headingline || 0,
                headingbgImage: field.headingbgImage || '',
                headingmargin: field.headingmargin || '',
                headingLetterSpacing: field.headingLetterSpacing || 0,
                headingTextAlign: field.headingTextAlign || '',
                headingText: field.headingText,
                headingfamily: field.headingfamily,
                headingBorderWidth: field.headingBorderWidth || 1,
                headingBorderStyle: field.headingBorderStyle || 'solid',
                headingBorderColor: field.headingBorderColor || '#000',
                headingFontSize: field.type === 'heading' ? (field.headingFontSize || "16") : undefined,
                descritionFontWeight: field.descritionFontWeight || 600,
                descritionFontSize: field.descritionFontSize || 16,
                descritionColor: field.descritionColor || '#000',
                descriptionbg: field.descriptionbg || '#ffff',
                descriptionPadding: field.descriptionPadding || 10,
                descriptionLetterSpacing: field.descriptionLetterSpacing || 0,
                descriptionTextAlign: field.descriptionTextAlign || '',
                descriptionBorderWidth: field.descriptionBorderWidth || 1,
                descriptionBorderStyle: field.descriptionBorderStyle || 'solid',
                descriptionBorderColor: field.descriptionBorderColor || '#000',
                dividerColor: field.dividerColor || '#000',
                dividerbgColor: field.dividerbgColor || '',
                dividerAline: field.dividerAline,
                dividerWidth: field.dividerWidth || '100',
                dividerheight: field.dividerheight || '1',
                buttonbgColor: field.buttonbgColor || '',
                buttonColor: field.buttonColor || '#007BFF',
                buttonweight: field.buttonweight || 300,
                buttonfamily: field.buttonfamily || '"Poppins", sans-serif',
                buttonFontSize: field.buttonFontSize || 16,
                buttonTextColor: field.buttonTextColor || '#fff',
                buttonLetterSpacing: field.buttonLetterSpacing || 0,
                buttonUrll: field.buttonUrll || '',
                buttonBorderWidth: field.buttonBorderWidth || 1,
                buttonBorderStyle: field.buttonBorderStyle || 'solid',
                buttonBorderColor: field.buttonBorderColor || '#000',
                buttonWidth: field.buttonWidth || 150,
                buttonHeight: field.buttonHeight || 40,
                buttonradious: field.buttonradious || 40,
                buttonPadding: field.buttonPadding || 10,
                socalIconHeight: field.socalIconHeight || 30,
                socalIconWidth: field.socalIconWidth || 30,
                socalIconPadding: field.socalIconPadding || 10,
                socalIcongap: field.socalIcongap || '',
                socalIconbg: field.socalIconbg || '#FFFFFF',
                socaliconTextAlign: field.socaliconTextAlign || 'left',
                htmlFontSize: field.htmlFontSize || 16,
                htmlPadding: field.htmlPadding || 10,
                htmlColor: field.htmlColor || '#000',
                htmllineheight: field.htmllineheight,
                htmlaline: field.htmlaline,
                splitbg: field.splitbg || '',
                splitbtn: field.splitbtn || '',
                splitbtnbg: field.splitbtnbg || '#FFFFFF',
                splitbtnfont: field.splitbtnfont || '14',
                splitbtncolor: field.splitbtncolor || '#000',
                splitbtnurl: field.splitbtnurl || '',
                splitbtnfamily: field.splitbtnfamily ||  '"Poppins", sans-serif',
                splitbtnheight: field.splitbtnheight || '35',
                splitbtnWeight: field.splitbtnWeight || 100,
                splitbtnwidth: field.splitbtnwidth || '80',
                splitletter: field.splitletter || '',
                splitlineheight: field.splitlineheight || '',
                splitfamily: field.splitfamily || '',
                splitbtnradious: field.splitbtnradious || '2',
                splitheight: field.splitheight || '',
                width: field.width || '100%',
                spacerHeight: field.spacerHeight || 20,
                spacerbg: field.spacerbg || '#fff',
                videoPadding: field.videoPadding || 20,
                splitPadding: field.splitPadding || 0,
                splitColor: field.splitColor || '',
                splitTextAlin: field.splitTextAlin || 'left',
                videoBorderWidth: field.videoBorderWidth || 1,
                videoBorderStyle: field.videoBorderStyle || 'solid',
                videoBorderColor: field.videoBorderColor || '#000',
                imgWidth: field.imgWidth || '100',
                htmlfamily: field.htmlfamily,
                imgTextAlign: field.imgTextAlign || '',
                imgPadding: field.imgPadding || 10,
                imgbg: field.imgbg || '#ffff',
                imgBorderWidth: field.imgBorderWidth || 0,
                imgBorderStyle: field.imgBorderStyle || 'solid',
                imgBorderColor: field.imgBorderColor || '#000',
                productPadding: field.productPadding || 10,
                productfamily: field.productfamily  || '"Poppins", sans-serif',
                productline: field.productline,
                productbg: field.productbg || '#ffff',
                productBorderWidth: field.productBorderWidth || 0,
                productBorderStyle: field.productBorderStyle || 'solid',
                productBorderColor: field.productBorderColor || '#000',
                productFontSize: field.productFontSize || 16,
                productColor: field.productColor || '#000',
                productWeight: field.productWeight || 600,
                productLetterSpacing: field.productLetterSpacing || 0,
                productbtnBorderColor: field.productbtnBorderColor || '#000',
                productbtnBorderWidth: field.productbtnBorderWidth || 16,
                productbtnBorderStyle: field.productbtnBorderStyle || '#000',
                productbtnbg: field.productbtnbg || '',
                productradious: field.productradious || 0,
                productLabel: field.productLabel || 'Shop Now',
                productfontSize: field.productfontSize || '12',
                productbtnfamily: field.productbtnfamily || '"Poppins", sans-serif',
                productwidth: field.productwidth || 80,
                productheight: field.productheight || 30,
                productbackgroundColor: field.productbackgroundColor || '#007BFF',
                buttonLabel: field.buttonLabel || '',
                buttonaline: field.buttonaline || '',
                fontsizeMulticolumn: field.fontsizeMulticolumn || 14,
                Multicolumnbgcolor: field.Multicolumnbgcolor || '',
                Multibgcolor: field.Multibgcolor || '',
                Multitext: field.Multitext || '',
                Multifamily: field.Multifamily || '"Poppins", sans-serif',
                Multiletter: field.Multiletter,
                Multiheight: field.Multiheight,
                Multigap: field.Multigap || '',
                Multibtnfamily: field.Multibtnfamily || '"Poppins", sans-serif',
                Multibtnlable: field.Multibtnlable || '',
                Multibtncolor: field.Multibtncolor || '#0000',
                Multibtnbg: field.Multibtnbg || '',
                Multibtnweight: field.Multibtnweight || '100',
                MultiWeight: field.MultiWeight|| 100,
                Multibtnheight: field.Multibtnheight || '40',
                Multibtnradious: field.Multibtnradious || '2',
                Multibtnfont: field.Multibtnfont || '14',
                Multibtnurl: field.Multibtnurl || '',
                MulticolumnbtnBorderColor: field.MulticolumnbtnBorderColor || '',
                MulticolumnbtnBorderWidth: field.MulticolumnbtnBorderWidth || '',
                MulticolumnbtnBorderStyle: field.MulticolumnbtnBorderStyle || '',
                MultibtnBorderColor: field.MultibtnBorderColor || '#00000',
                Multiimgwidth: field.Multiimgwidth || '',
                Multiborderradious: field.Multiborderradious || '',
                MultiColor: field.MultiColor || '',
                MultibtnBorderWidth: field.MultibtnBorderWidth || '1',
                MultibtnBorderStyle: field.MultibtnBorderStyle || 'solid',
                MulticolumnPadding: field.MulticolumnPadding || '',
                MultiPadding: field.MultiPadding || '',
                splitBorderColor: field.splitBorderColor || '#000',
                splitBorderWidth: field.splitBorderWidth || '1',
                splitBorderStyle: field.splitBorderStyle || 'solid',
                splittextSize: field.splittextSize || '',
                showbtnmulti: showbtnmulti || false,
                costumText: field.costumText,
                costumFont: field.costumFont,
                costumColor: field.costumColor,
                costumBg: field.costumBg,
                costumAline: field.costumAline || 'left',
                costumline: field.costumline || 25,
                costumPadding: field.costumPadding || 0,
                costomfamily : field.costomfamily  || '"Poppins", sans-serif',
                costumfontweight: field.costumfontweight,
                costumLetter: field.costumLetter,

            };
        });

        console.log('Updated fields:', updatedFields);

        try {
            setSaveEmail(!saveEmail);

            const templateElement = document.getElementById('template-container');

            if (templateElement) {
                const htmlToImage = await import('html-to-image');
                try {
                    const clonedElement = templateElement.cloneNode(true);
                    clonedElement.style.margin = '0';
                    clonedElement.style.width = viewMode === 'desktop' ? '800px' : '400px';

                    let dataUrl;

                    if (viewMode !== 'desktop') {
                        document.body.appendChild(clonedElement);
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        dataUrl = await htmlToImage.toPng(clonedElement);
                        document.body.removeChild(clonedElement);
                    } else {
                        dataUrl = await htmlToImage.toPng(templateElement);
                    }
                    const formData = {
                        templateId,
                        shop,
                        form_ids: selectedFormIds.map(id => String(id)),
                        title: trimmedTitle,
                        fields: updatedFields,
                        createdAt: timestamp,
                        TemplateImage: dataUrl,
                        styles: {
                            backgroundImage,
                            backgroundColor,
                            borderRadious,
                            templatePadding,
                            textAlign,
                            fontFamily,
                            width: clonedElement.style.width,
                            dividerColor,
                            viewMode,
                        },
                    };

                    console.log(dataUrl);
                    const response = id
                        ? await axios.put(`${apiUrl}/update/${id}`, formData)
                        : await axios.post(`${apiUrl}/send/api`, formData);

                    console.log('Form saved successfully with title:', trimmedTitle);
                    const successMessage = id ? 'Form updated successfully' : 'Form created successfully';
                    console.log(successMessage, response.data);

                    if (!id) {
                        resetFormState();
                    }

                    setExistingTitles(prevTitles => [...prevTitles, trimmedTitle]);

                } catch (error) {
                    console.error('Error generating template image:', error);
                }
            }
        } catch (error) {
            console.error('Error saving form:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }

    };


    const resetFormState = () => {
        setFields([]);
        setEmailTemplateId(null);
        setHeadingText('');
        setBackgroundImage(null);
        setTemplatePadding('20')
        setBackgroundColor('#ffffff');
        setTextAlign('left');
        setBorderRadious(5)
        setId(null);
    };

    const handleContinue = () => {
        setIsLoading(true);
        setSaveEmail(false);
        setCancelEmail(false);

        setTimeout(() => {
            navigate('/app/email-template/list');
        }, 3000);
    };

    const handleBackgroundImageUpload = (e) => {
        let file;

        if (e.type === "drop") {
            file = e.dataTransfer.files[0];
        } else {
            file = e.target.files[0];
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const formBuilder = formBuilderRef.current;
        if (!formBuilder) return;

        const sortable = Sortable.create(formBuilder, {
            animation: 150,
            ghostClass: 'dragging',
            onEnd: (evt) => {
                const newFields = [...fields];
                const movedField = newFields.splice(evt.oldIndex, 1)[0];
                newFields.splice(evt.newIndex, 0, movedField);
                setFields(newFields);
            },
        });

        return () => {
            sortable.destroy();
        };
    }, [fields]);

    const toggleViewMode = (mode) => {
        setViewMode(mode);
        setEmailWidth(mode === 'desktop' ? '800px' : '400px');

        setFields((prevFields) =>
            prevFields.map((field) => ({
                ...field,
                columnsPerRow: mode === 'mobile' ? 1 : field.defaultColumnsPerRow || 3,

            }))
        );
    };

    // const toggleViewMode = (mode) => {
    //     setViewMode(mode);
    //     setEmailWidth(mode === 'desktop' ? '800px' : '400px');
    //     if (mode === 'mobile') {
    //         setProductsPerRow(1);
    //         setColumnsPerRow(1);
    //     } else {
    //         setProductsPerRow(3);
    //         setColumnsPerRow(3);
    //     }
    // };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    const togglebtn = () => {
        setShowBtn(!showbtn);
    };

    const toggleFields = () => {
        setShowFields(true);
        setDropdownVisible(false);
    };

    const toggleSettings = () => {
        setShowFields(false);
    };

    const renderField = (field) => {
        if (!field) return null;

        switch (field.type) {
            case 'html convert':
                return (
                    <div>
                        <textarea
                            value={field.value || field.htmltext}
                            onChange={(e) =>
                                setFields((prevFields) =>
                                    prevFields.map((f) => (f.id === field.id ? { ...f, value: e.target.value } : f))
                                )
                            }
                            rows="5"
                            cols="50"
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                );

            default:
                return;
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth > 1400 && popupRef.current && !popupRef.current.contains(event.target)) {
                setEmailFieldPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emailFieldRef.current && !emailFieldRef.current.contains(event.target)) {
                setActiveFieldId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleWidthChange = (newWidth) => {
        const parsedWidth = parseInt(newWidth, 10);
        if (selectedFieldId) {
            setFields((prevFields) => {
                return prevFields.map((field) => {
                    if (field.type === "split-group" && field.children.some((child) => child.id === selectedFieldId)) {
                        return {
                            ...field,
                            children: field.children.map((child) => ({
                                ...child,
                                width: child.id === selectedFieldId ? `${parsedWidth}%` : `${100 - parsedWidth}%`,
                            })),
                        };
                    }
                    return field;
                });
            });
        }
    };

    const handleVideoChange = (e, id) => {
        const updatedFields = fields.map(field => {
            if (field.id === id && field.type === 'video') {
                return { ...field, value: e.target.value };
            }
            return field;
        });
        setFields(updatedFields);
    };

    const getVideoEmbedUrl = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autohide=1&showinfo=0&controls=0`;
        }
        return null;
    };

    const handleProductClick = (product, isChecked) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (isChecked) {

                return [...prevSelectedProducts, product];
            } else {
                return prevSelectedProducts.filter((p) => p.id !== product.id);
            }
        });

        setFields((prevFields) => {
            return prevFields.map((field) => {
                if (field.id === lastProductFieldId && field.type === 'product') {
                    return {
                        ...field,
                        products: isChecked
                            ? [...(field.products || []), product]
                            : (field.products || []).filter((p) => p.id !== product.id)
                    };
                }
                return field;
            });
        });

        setIsPopupOpen(true);
    };

    const handleSaveClick = () => {
        console.log('Selected Products:', selectedProducts);

        setIsPopupOpen(false);
    };

    const handleClosePopup = () => {
        console.log('Before Clearing: ', selectedProducts);
        setLastProductFieldId('');
        setEmailFieldPopup(false);

        setFields((prevFields) => {
            return prevFields.map((field) => {
                if (field.id === lastProductFieldId && field.type === 'product') {
                    return {
                        ...field,
                        products: []
                    };
                }
                return field;
            });
        });

        setTimeout(() => {
            console.log('After Clearing (with delay): ', selectedProducts);
            setIsPopupOpen(false);

            if (lastProductFieldId) {
                removeField(lastProductFieldId);
            }
        }, 0);
    };

    const handleRemoveProductFromForm = (index) => {
        const productToRemove = productTitles?.[index];

        if (!productToRemove) return;

        setProductTitles((prevTitles) =>
            Array.isArray(prevTitles) ? prevTitles.filter((_, i) => i !== index) : prevTitles
        );

        setSelectedProducts((prevSelectedProducts) =>
            Array.isArray(prevSelectedProducts)
                ? prevSelectedProducts.filter((_, i) => i !== index)
                : prevSelectedProducts
        );

        setFields((prevFields) =>
            Array.isArray(prevFields)
                ? prevFields.map((field) =>
                    field.type === 'product'
                        ? {
                            ...field,
                            products: field.products.filter((_, i) => i !== index),
                        }
                        : field
                )
                : prevFields
        );

        setProductImage((prevProductImages) =>
            Array.isArray(prevProductImages)
                ? prevProductImages.filter((_, i) => i !== index)
                : prevProductImages
        );
    };

    const togglePrice = (e, fieldId) => {
        setShowPrice(!showPrice);
        setFields((prevFields) =>
            prevFields.map((f) =>
                f.id === fieldId ? { ...f, showPrice: !f.showPrice } : f
            )
        );
    };

    const togglebtnn = (e, fieldId) => {
        setShowbtnn(!showbtnn);
        setFields((prevFields) =>
            prevFields.map((f) =>
                f.id === fieldId ? { ...f, showbtnn: !f.showbtnn } : f
            )
        );
    };

    const togglesplit = (fieldId) => {
        setShowbtnsplit((prev) => !prev);

        setFields((prevFields) =>
            prevFields.map((f) =>
                f.id === fieldId ? { ...f, showbtnsplit: !f.showbtnsplit } : f
            )
        );
    };

    const AddProduct = () => {
        setIsPopupOpen(true);
    }

    useEffect(() => {
        console.log('isPopupOpen:', isPopupOpen);
        console.log('selectedProduct:', selectedProduct);
    }, [isPopupOpen, selectedProduct]);


    const handleAddProductToSelected = (fieldId, fieldTitle, fieldImage, products) => {
        console.log("Field ID:", fieldId);
        console.log("Field Title:", fieldTitle);
        console.log("Products:", products);
        console.log("Image:", fieldImage);
        setLastProductFieldId(fieldId);
        setPopupFieldTitle(fieldTitle);

        const productTitles = products.map(product => product.title);
        console.log("Product Titles:", productTitles);

        setProductTitles(productTitles);

        const productImages = products.map(product => product.image);
        console.log("Product images:", productImages);
        setProductImage(productImages);
    };


    const handleProductsPerRowChange = (e, fieldId) => {
        const updatedFields = fields.map((f) => {
            if (f.id === fieldId) {
                return {
                    ...f,
                    productsPerRow: Number(e.target.value),
                };
            }
            return f;
        });
        setFields(updatedFields);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / formsPerPage);

    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * formsPerPage,
        currentPage * formsPerPage
    );

    const generatePageNumbers = () => {
        const visiblePages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                visiblePages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return visiblePages;
    };

    const handleRemoveBackgroundImage = () => {
        setBackgroundImage('');
    };

    const RemoveImage = (fieldId) => {
        console.log(`Removing image for field with ID: ${fieldId}`);
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === fieldId
                    ? { ...field, imageUrl: null }
                    : field
            )
        );
    };

    const handleFileChange = (e, fieldId) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFields(prevFields =>
                    prevFields.map(f =>
                        f.id === fieldId ? { ...f, headingbgImage: reader.result } : f
                    )
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage5 = (id) => {
        const updatedFields = fields.map(field =>
            field.id === id ? { ...field, headingbgImage: null } : field
        );
        setFields(updatedFields);
    };


    const handleFieldClick = (fieldId) => {
        setSelectedFieldId(fieldId);
        setEmailFieldPopup(true);
        setActiveFieldId(fieldId);
        setHoveredFieldId(fieldId)
        const selectedField = fields.find((field) => field.id === fieldId);
        if (selectedField && selectedField.type === 'Multicolumn') {
            setIsPopupVisible(true);
            setColumnCount(selectedField.columnCount);
        }
        if (window.innerWidth <= 1400) {
            handleFieldPro();
        }
    };


    const handleColumnClick = (fieldId, columnIndex) => {
        setPopupFieldId(fieldId);

        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === fieldId
                    ? { ...field, selectedColumn: columnIndex }
                    : field
            )
        );
    };

    const handleEditorChangeee = (value) => {
        setEditorValueed(value);
    };

    const handleSave = () => {
        const updatedFields = fields.map((field) =>
            field.id === currentFieldId ? { ...field, content: editorValueed } : field
        );
        setFields(updatedFields);
        setPopupVisibleed(false);
    };

    const handleRemoveImage = (fieldId, index) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === fieldId
                    ? {
                        ...field,
                        columnData: field.columnData.map((col, i) =>
                            i === index ? { ...col, image: null } : col
                        ),
                    }
                    : field
            )
        );
    };


    const handleEditChange = (value, fieldId) => {
        setFields((prevFields) => {
            const updatedFields = prevFields.map((field) =>
                field.id === fieldId ? { ...field, content: value } : field
            );
            return updatedFields;
        });
    };

    useEffect(() => {
        if (window.innerWidth > 1400) {
            setShowFieldInput(true);
        } else {
            setShowFieldInput(false);
        }

        const handleResize = () => {
            if (window.innerWidth > 1400) {
                setShowFieldInput(true);
            } else {
                setShowFieldInput(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFieldInput = () => {
        if (window.innerWidth <= 1400) {
            setShowFieldInput(true);
        }
    };

    const hanldeCancleBtn = () => {
        setShowFieldInput(false);
    }

    useEffect(() => {
        if (window.innerWidth > 1400) {
            setShowFieldPro(true);
        } else {
            setShowFieldPro(false);
        }

        const handleResize = () => {
            if (window.innerWidth > 1400) {
                setShowFieldPro(true);
            } else {
                setShowFieldPro(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFieldPro = () => {
        if (window.innerWidth <= 1400) {
            setShowFieldPro(true);
        }
    };

    const hanldeCanclepro = () => {
        setShowFieldPro(false);
    }

    const addColumn = (fieldId) => {
        const updatedFields = fields.map(f => {
            if (f.id === fieldId) {
                if (f.columnCount < 6) {

                    return {
                        ...f,
                        columnCount: f.columnCount + 1,
                        columnData: [...f.columnData, { content: '', image: null }]
                    };
                } else {

                    alert('You cannot add more than 6 columns');
                    return f;
                }
            }
            return f;
        });
        setFields(updatedFields);
    };

    const removeColumn = (fieldId, index) => {
        console.log(`Attempting to remove column at index: ${index}`);

        setFields((prevFields) => {
            return prevFields.reduce((acc, field) => {
                if (field.id === fieldId) {
                    const updatedColumnData = field.columnData.filter((_, i) => i !== index);

                    if (updatedColumnData.length === 0) {
                        console.log(`No columns left, removing entire field: ${fieldId}`);
                        removeField(fieldId);
                        return acc;
                    }

                    acc.push({
                        ...field,
                        columnCount: field.columnCount - 1,
                        columnData: updatedColumnData
                    });
                } else {
                    acc.push(field);
                }
                return acc;
            }, []);
        });
    };

    const handleCustomIconRemove = (index) => {
        setCustomIcons((prevIcons) => prevIcons.filter((_, i) => i !== index));
    };

    const handleFileDrop = (e, fieldId, index) => {
        e.preventDefault();

        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const event = { target: { files: [file] } };
            handleImageChange1(event, fieldId, index);
        }
    };

    const handleImageChange1 = (e, fieldId, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedFields = fields.map(f =>
                    f.id === fieldId
                        ? {
                            ...f,
                            columnData: f.columnData.map((col, i) =>
                                i === index ? { ...col, image: reader.result } : col
                            ),
                        }
                        : f
                );
                setFields(updatedFields);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleCancle = () => {
        setCancelEmail(true);
    }

    const removeImage = (fieldId, index) => {
        const updatedFields = fields.map(f =>
            f.id === fieldId
                ? {
                    ...f,
                    columnData: f.columnData.map((col, i) =>
                        i === index ? { ...col, image: null } : col
                    ),
                }
                : f
        );
        setFields(updatedFields);
    };

    const handleColoumPerRowChange = (e, fieldId) => {
        const updatedFields = fields.map((f) => {
            if (f.id === fieldId) {
                return {
                    ...f,
                    columnsPerRow: Number(e.target.value),
                };
            }
            return f;
        });
        setFields(updatedFields);
    };

    const toggleButtonVisibility = (fieldId, columnIndex) => {
        const updatedFields = fields.map(field =>
            field.id === fieldId
                ? {
                    ...field,
                    columnData: field.columnData.map((col, index) =>
                        index === columnIndex ? { ...col, isVisible: !col.isVisible } : col
                    ),
                }
                : field
        );
        setFields(updatedFields);
    };

    const handleCopyField = (fieldId) => {
        const fieldToCopy = fields.find(field => field.id === fieldId);
        const copiedField = {
            ...fieldToCopy,
            id: generateUniqueId(),
        };
        setFields(prevFields => [...prevFields, copiedField]);
    };


    return (
        <div>

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
            <div className='email-campaing-templates'>
                <div className="builder-container text">
                    <div className='builder-contain-h3'>
                        <h3>Email campaign</h3>
                    </div>
                    <div className='builder_form_name'>
                        <div className='forms_build_flex-wraped'>
                            <div className='email-template-heading'>
                                <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className='template-select-forms'>
                                <select onChange={handleFormSelect} ref={selectRef}>
                                    <option value="">Select a form</option>
                                    {formDataAdd.map((form) => {
                                        const isFormConnected = connectedForms.includes(form.formId);
                                        const isFormIdMatched = formData?.form_ids?.includes(form.formId);
                                        const isDisabled = isFormConnected || isFormIdMatched;

                                        return (
                                            <option
                                                key={form.id}
                                                value={form.title}
                                                style={{
                                                    color: selectedFormIds.includes(form.formId) ? '#45A7F6' : (isDisabled ? '#A9A9A9' : 'black'),

                                                }}
                                                disabled={isDisabled}
                                            >
                                                {form.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='email-templete-btns-wrapedd'>
                            <div className='btn_form_bulider'>
                                <div className="form-submission-wrp">
                                    <button className="cancle-form-btn" onClick={handleCancle} >Cancel</button>
                                </div>
                                <div className="form-submission-wrp">
                                    <button className="create-form-btn action_btn" onClick={createOrUpdateForm} >Save</button>
                                </div>

                            </div>
                            <div className='form-Elements-btn email' onClick={handleFieldInput}>Email Elements</div>
                        </div>
                    </div>

                    <div className='builder-forms_rapp'>
                        <div className="builder-wrp">
                            <div className="controls-main-wrp email-tempalte">
                                {showFieldInput && (<div className="controls-wrp email">
                                    {showField && (<div className="controls">
                                        <div className='builder-form-element'>
                                            <div className='buil_form_texttt'>
                                                <div className='buil_form_texttt_p'>
                                                    <h2> Elements</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='controls-wrpping cancleimg pro email field' onClick={hanldeCancleBtn}><img src={cancleimg} alt="" /></div>
                                        <div className='builder_fieldes'>
                                            <div className='builder_form_select_control'>
                                                <div
                                                    className={`builder_form_fields ${showFields ? 'active' : ''}`}
                                                    onClick={toggleFields}
                                                >
                                                    <h2>Fields</h2>
                                                </div>
                                                <div
                                                    className={`builder_form_setting ${!showFields ? 'active' : ''}`}
                                                    onClick={toggleSettings}
                                                >
                                                    <h2>Settings</h2>
                                                </div>

                                            </div>
                                            {showFields ? (
                                                <div className='form-scroll-bar choose-wraped'>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={banner} alt="" /></span> <span><h4>Banner</h4></span>  {isHeadingAdded && <img className='form_builder-redsign' src={redsign} alt="" />}  </button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('richtext')}><span className='form_builder_field_img'><img src={rich} alt="" /></span> <span><h4>Rich Text</h4></span> {isRichTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div> */}
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span>{isbuttonTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span>{isdividerTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('split')}><span className='form_builder_field_img'><img src={itext} alt="" /></span> <span><h4>Images with Text</h4></span>{issplitTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span>{isimagesTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('socalicon')}><span className='form_builder_field_img'><img src={socail} alt="" /></span> <span><h4>Social Icon</h4></span>{issocialTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('html convert')}><span className='form_builder_field_img'><img src={htmlicon} alt="" /></span> <span><h4>HTML Block</h4></span>{ishtmlTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('spacer')}><span className='form_builder_field_img'><img src={spacer} alt="" /></span> <span><h4>Spacer</h4></span>{isspacerTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('Multicolumn')}><span className='form_builder_field_img'><img src={multimedia} /></span><span><h4>Multicolumn</h4></span>{ismultiTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('video')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>video</h4></span></button></div> */}
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('product')}><span className='form_builder_field_img'><img src={product} alt="" /></span> <span><h4>Product</h4></span>{isproductTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div>
                                                    <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('costum')}><span className='form_builder_field_img'><img src={costum} alt="" /></span> <span><h4>Custom Content</h4></span>{iscostomTextAdded && <img className='form_builder-redsign' src={redsign} alt="" />}</button></div></div>

                                            ) : (
                                                <div className='form-scroll-bar choose-wraped'>
                                                    <div className='edit_form_close'>
                                                        <div className='edit-formwrap'>
                                                            <h3>Edit Properties</h3>
                                                            <div className="builder_field_wrpp">
                                                                <div className='edit-form-options'>
                                                                    <div className="edit_setting_bg">
                                                                        <label htmlFor="font-family-selector">Font-Family</label>
                                                                        <select
                                                                            id="font-family-selector"
                                                                            value={fontFamily}
                                                                            onChange={handleFontChange}
                                                                        >
                                                                            <option value="">Select Font-Family</option>
                                                                            <option value="Arial, sans-serif">Arial</option>
                                                                            <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                            <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                            <option value="'Georgia', serif">Georgia</option>
                                                                            <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                            <option value="'Roboto', sans-serif">Roboto</option>
                                                                            <option value="'Raleway', sans-serif">Raleway</option>
                                                                            <option value="'Gotham', sans-serif">Gotham</option>
                                                                            <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                            <option value="'Lato', sans-serif">Lato</option>
                                                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                            <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                            <option value="'Poppins', sans-serif">Poppins</option>
                                                                            <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                            <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                            <option value="'Barlow', sans-serif">Barlow</option>
                                                                            <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                            <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                            <option value="'Inter', sans-serif">Inter</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='edit_setting_bg form'>
                                                                        <div className='checkbox-option bg-colors'>
                                                                            <label>  Background Color:</label>
                                                                            <div className="color-picker-container">

                                                                                <input
                                                                                    type="text"
                                                                                    className="color-code"
                                                                                    value={backgroundColor || '#ffffff'}
                                                                                    readOnly
                                                                                    onClick={(e) => {
                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                    }}
                                                                                    onPaste={(e) => {
                                                                                        const pastedText = e.clipboardData.getData('text');
                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                            setBackgroundColor(pastedText);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <input
                                                                                    type="color"
                                                                                    value={backgroundColor || '#FFFFFF'}
                                                                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label>Border-Radius (px):</label>
                                                                        <input
                                                                            type="number"
                                                                            id="Border-radious"
                                                                            value={borderRadious}
                                                                            onChange={(e) => setBorderRadious(e.target.value)}
                                                                            min="0"
                                                                        />
                                                                    </div>


                                                                    <div className='edit_setting_bg'>
                                                                        <label>Padding:</label>
                                                                        <input
                                                                            type="number"
                                                                            id="Padding"
                                                                            value={templatePadding}
                                                                            onChange={(e) => {
                                                                                let value = parseInt(e.target.value, 10);
                                                                                if (value > 30) value = 30;
                                                                                if (value < 0) value = 0;
                                                                                setTemplatePadding(value);
                                                                            }}
                                                                            min={0}
                                                                            max={30}
                                                                        />
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label htmlFor="textAlign">Text Alignment:</label>
                                                                        <select
                                                                            id="textAlign"
                                                                            value={textAlign}
                                                                            onChange={(e) => setTextAlign(e.target.value)}
                                                                        >
                                                                            <option value="">Select text align</option>
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label htmlFor="backgroundImage">Background Image:</label>

                                                                        {!backgroundImage && (
                                                                            <div
                                                                                className="upload-area"
                                                                                onClick={() => document.getElementById('fileInput').click()}
                                                                                onDragOver={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    e.dataTransfer.dropEffect = "copy";
                                                                                }}
                                                                                onDrop={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleBackgroundImageUpload(e);
                                                                                }}
                                                                            >
                                                                                <img src={file} alt="" />
                                                                                <p>Drag & Drop to Upload image</p>
                                                                                <p>OR</p>
                                                                                <span className="upload-btn">Browse image</span>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    onChange={handleBackgroundImageUpload}
                                                                                    style={{ display: 'none' }}
                                                                                    id="fileInput"
                                                                                />
                                                                            </div>

                                                                        )}

                                                                        {backgroundImage && (
                                                                            <div className='edit_setting_bg add-text'>
                                                                                <div
                                                                                    className="edit_setting_bg"
                                                                                    style={{
                                                                                        backgroundImage: `url(${backgroundImage})`,
                                                                                        backgroundRepeat: 'no-repeat',
                                                                                        backgroundSize: 'contain',
                                                                                        backgroundPosition: 'center',
                                                                                        height: '200px',
                                                                                        width: '100%',
                                                                                        border: '1px solid #ddd',
                                                                                    }}
                                                                                ></div>

                                                                                <span
                                                                                    className='rm-btn bg-img'
                                                                                    type="button"
                                                                                    onClick={handleRemoveBackgroundImage}
                                                                                    style={{

                                                                                        textAlign: 'center',
                                                                                    }}
                                                                                >
                                                                                    <img src={remove} alt="" />
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    )}
                                </div>)}

                                <div className='form_builder_build email email-templates-wredd'>
                                    <div id='bg_change' className="form-builder-wrp email-temp" >
                                        <div className='btn-email-templates'>
                                            <button className={`btn-templates desktop ${(viewMode === 'desktop' || emailWidth === '800px') && emailWidth !== '400px' ? 'active' : ''}`} onClick={() => toggleViewMode('desktop')}>
                                                <img src={desk} alt="Desktop" /> Desktop
                                            </button>
                                            <button className={`btn-templates mobile ${(viewMode === 'mobile' || emailWidth === '400px') && emailWidth !== '800px' ? 'active' : ''}`} onClick={() => toggleViewMode('mobile')}>
                                                <img src={phonem} alt="Mobile" /> Mobile
                                            </button>
                                        </div>

                                        <div
                                            className="form-builder email-template text-wraped"
                                            id="template-container"
                                            ref={formBuilderRef}
                                            style={{
                                                backgroundColor,
                                                width: emailWidth,
                                                textAlign,
                                                padding: `${templatePadding}px`,
                                                borderRadius: `${borderRadious}px`,
                                                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                margin: 'auto',
                                                fontFamily: fontFamily,
                                            }}
                                        >
                                            {fields.length === 0 ? (
                                                <div>
                                                    <div className="builder-block-img-forms">
                                                        {!(backgroundColor || backgroundImage) &&
                                                            <div className='builder_block_blank'>
                                                                <img src={emailtemp} alt="Email Template" />
                                                                <div className='builder-block-img-forms-paragraph'>
                                                                    <p>Let's create the Email.</p>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            ) : (
                                                <>

                                                    {fields
                                                        .filter((field) => field && field.id && field.type)
                                                        .map((field) => {
                                                            console.log('Rendering field:', field);
                                                            if (field.type === 'heading') {
                                                                const HeadingTag = field.headingLevel || 'h1';

                                                                return (
                                                                    <div
                                                                        key={field.id}
                                                                        onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100% ' }}
                                                                    >
                                                                        <div className='email-input-field'
                                                                            style={{
                                                                                borderWidth: `${field.headingBorderWidth}px`,
                                                                                borderStyle: field.headingBorderStyle,
                                                                                borderColor: field.headingBorderColor,
                                                                                backgroundRepeat: 'no-repeat',
                                                                                backgroundSize: 'cover',
                                                                                width: `${field.bannerImageWidth}%`,
                                                                                height: field.bannerImageHeight,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                margin: `${field.headingmargin}px`,
                                                                                position: 'relative',

                                                                            }}

                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    backgroundColor: field.headingbg && !field.headingbgImage ? field.headingbg : 'transparent',
                                                                                    backgroundImage: field.headingbgImage
                                                                                        ? `url(${field.headingbgImage})`
                                                                                        : field.headingbg
                                                                                            ? 'none'
                                                                                            : `url(${hdbg})`,
                                                                                    backgroundRepeat: 'no-repeat',
                                                                                    backgroundSize: 'cover',
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    right: 0,
                                                                                    bottom: 0,
                                                                                    opacity: field.headeropacity || 1,
                                                                                }}
                                                                            />
                                                                            <div className='email-input-field-h1' style={{
                                                                                zIndex: 99,
                                                                                width: '100%',
                                                                                textAlign: field.headingTextAlign || '',
                                                                                padding: `${field.headingPadding}px`,

                                                                            }}>
                                                                                {React.createElement(HeadingTag, {
                                                                                    style: {
                                                                                        fontWeight: field.headingFontWeight,
                                                                                        // fontSize: `${field.headingFontSize || ''}px`,
                                                                                        color: field.headingColor,
                                                                                        fontFamily: field.headingfamily,
                                                                                        letterSpacing: `${field.headingLetterSpacing}px`,
                                                                                        //lineHeight: `${field.headingline}px`,
                                                                                        wordBreak: 'break-word',
                                                                                    }
                                                                                }, field.headingText || field.value)}

                                                                                <div
                                                                                    className="heading-editor-content  ql-editored"
                                                                                    style={{
                                                                                        whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%', fontSize: `${field.headingsubheading}px`, fontFamily: field.subheadingfamily,
                                                                                        // lineHeight: `${field.subheadingline}px`, 
                                                                                        color: field.subheadingColor, letterSpacing: `${field.subheadingleter}px`
                                                                                    }}
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: editorValue || field.editorContent || 'It’s a numbers game',
                                                                                    }}
                                                                                />
                                                                                {field.headingUrl && (
                                                                                    <a href={field.headingUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                                console.log("Button clicked, but no navigation.");
                                                                                            }}
                                                                                            style={{
                                                                                                fontFamily: field.headingbtnfamily ||'"Poppins", sans-serif' ,
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
                                                                                        >
                                                                                            {field.headerbtn}
                                                                                        </button>
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}
                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === "split-group") {
                                                                return (
                                                                    <div style={{ width: '100%', position: 'relative' }} className={`email_field split-width ${activeFieldId === field.id ? 'active' : ''}`} onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)} >
                                                                        <div key={field.id} className="split-container" style={{ display: viewMode === "mobile" ? "block" : "flex", width: "100%", backgroundColor: field.splitbg || '#FFFFFF', }}>
                                                                            {field.children.map((child) => {
                                                                                const isImage = child.add === "image";
                                                                                return (
                                                                                    <div
                                                                                        key={child.id}
                                                                                        onClick={() => {
                                                                                            handleFieldClick(child.id);
                                                                                            setActiveFieldId(field.id);
                                                                                        }}
                                                                                        style={{
                                                                                            width: viewMode === "mobile" ? "100%" : child.width || "50%",
                                                                                            textAlign: child.splitTextAlin,
                                                                                            padding: `${child.splitPadding}px`,
                                                                                            position: 'relative',
                                                                                            display: 'flex',
                                                                                            color: field.splitColor,
                                                                                            fontSize: `${field.splittextSize}px`,
                                                                                            letterSpacing: `${child.splitletter}px`,
                                                                                            fontFamily: field.splitfamily,
                                                                                        }}
                                                                                    >
                                                                                        {isImage ? (
                                                                                            <img src={child.value || imghd1} alt="Uploaded Preview" style={{ width: "100%", height: "auto" }} />
                                                                                        ) : (
                                                                                            <div style={{ width: '100%', display: 'flex', alignItems: child.splittext === 'left' ? 'flex-start' : child.splittext === 'center' ? 'center' : 'flex-end' }}>
                                                                                                <div style={{ width: '100%' }}>
                                                                                                    <div className=' ql-editored' style={{ fontSize: '15px', color: field.splitColor, whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }} dangerouslySetInnerHTML={{ __html: child.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers ...' }} />
                                                                                                    <div >
                                                                                                        {field.showbtnsplit && (
                                                                                                            <a href={field.splitbtnurl} target='_blank' onClick={(e) => e.preventDefault()}>
                                                                                                                <button style={{
                                                                                                                    fontFamily: field.splitbtnfamily ||  '"Poppins", sans-serif',
                                                                                                                    marginTop: "20px",
                                                                                                                    backgroundColor: field.splitbtnbg,
                                                                                                                    fontSize: `${child.splitbtnfont}px`,
                                                                                                                    color: field.splitbtncolor,
                                                                                                                    height: `${child.splitbtnheight}px`,
                                                                                                                    minWidth: `${child.splitbtnwidth}px`,
                                                                                                                    borderRadius: `${child.splitbtnradious}px`,
                                                                                                                    borderWidth: `${child.splitBorderWidth}px`,
                                                                                                                    borderStyle: field.splitBorderStyle,
                                                                                                                    borderColor: field.splitBorderColor,
                                                                                                                    fontWeight: field.splitbtnWeight || 100,

                                                                                                                }}>
                                                                                                                    {child.splitbtn}</button>
                                                                                                            </a>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                        )}

                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className={`form-builder-drag-drop ${activeFieldId === field.id ? 'active' : ''}`}>
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'spacer') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: "100%" }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div style={{ width: '100%' }}>
                                                                            <div className='spacer-height-show' style={{ height: `${field.spacerHeight}px`, backgroundColor: field.spacerbg }}></div>
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );

                                                            }

                                                            if (field.type === 'description') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                    >
                                                                        <div style={{
                                                                            backgroundColor: field.descriptionbg,
                                                                            padding: `${field.descriptionPadding}px`,
                                                                        }}>
                                                                            <p style={{
                                                                                fontSize: `${field.descritionFontSize}px`,
                                                                                letterSpacing: `${field.descriptionLetterSpacing}px`,
                                                                                textAlign: field.descriptionTextAlign || '',
                                                                                borderWidth: `${field.descriptionBorderWidth}px`,
                                                                                borderStyle: field.descriptionBorderStyle,
                                                                                borderColor: field.descriptionBorderColor,
                                                                                fontWeight: field.descritionFontWeight,
                                                                                color: field.descritionColor
                                                                            }}>{field.descriptionText || field.value || ''}</p>

                                                                        </div>
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'images') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div className='email_field-images'
                                                                            style={{
                                                                                textAlign: field.imgTextAlign ? field.imgTextAlign : '',
                                                                                backgroundColor: field.imgbg,
                                                                                borderWidth: `${field.imgBorderWidth}px`,
                                                                                borderStyle: field.imgBorderStyle,
                                                                                borderColor: field.imgBorderColor,
                                                                                width: '100%',
                                                                                display: 'block'
                                                                            }}>

                                                                            <img src={field.value || imghd} alt="Dynamic" style={{
                                                                                width: `${field.imgWidth}%`,
                                                                                padding: `${field.imgPadding}px`,
                                                                                verticalAlign: 'bottom'
                                                                            }} />

                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'divider') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div style={{ backgroundColor: field.dividerbgColor, width: '100%' }}>
                                                                            <hr style={{
                                                                                border: `${field.dividerheight}px solid ${field.dividerColor}`,
                                                                                width: `${field.dividerWidth}%`,
                                                                                marginLeft: field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'left' ? '0' : '',
                                                                                marginRight: field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'right' ? '0' : '',
                                                                            }} />
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }


                                                            if (field.type === 'richtext') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                    >
                                                                        <div style={{ width: '100%' }} >
                                                                            <div
                                                                                className="ql-editored"
                                                                                style={{
                                                                                    textAlign: field.richTextAlign || '',
                                                                                    fontSize: `${field.richFontsize}px`,
                                                                                    letterSpacing: `${field.richspace}px`,
                                                                                    color: field.richtextcolor,
                                                                                    // lineHeight: `${field.richlineheight}px`,
                                                                                    backgroundColor: field.richbgcolor,
                                                                                    paddingLeft: `${field.richleftPadding}px`,
                                                                                    paddingRight: `${field.richleftPadding}px`,
                                                                                    paddingTop: `${field.richtopPadding}px`,
                                                                                    paddingBottom: `${field.richtopPadding}px`,
                                                                                    textDecoration: field.richline,
                                                                                    fontFamily: field.richFontfamily || '"Poppins", sans-serif',
                                                                                    whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                                                                    width: '100%'

                                                                                }}
                                                                                dangerouslySetInnerHTML={{ __html: editorValueed || field.content || 'Captivate customers with' }} />
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}

                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }


                                                            if (field.type === 'video') {

                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div className='email-tempalte-video-show' style={{ padding: `${field.videoPadding}px`, borderWidth: `${field.videoBorderWidth}px`, borderStyle: field.videoBorderStyle, borderColor: field.videoBorderColor }}>
                                                                            {field.value && getVideoEmbedUrl(field.value) ? (
                                                                                <iframe
                                                                                    height="250px"
                                                                                    width="500px"
                                                                                    src={getVideoEmbedUrl(field.value)}
                                                                                    title="Video Preview"
                                                                                    frameBorder="0"
                                                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                                    allowFullScreen
                                                                                ></iframe>) : (
                                                                                <div className='email-tempalte-img'>
                                                                                    <img src={videoplay} alt="" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'button') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field leftbtn ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div style={{ width: '100%', backgroundColor: field.buttonbgColor, textAlign: field.buttonaline }}>
                                                                            <a href={field.buttonUrll}
                                                                                onClick={(event) => {
                                                                                    event.preventDefault();
                                                                                    console.log("Button clicked!");
                                                                                }}
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    style={{
                                                                                        fontSize: `${field.buttonFontSize}px`,
                                                                                        color: field.buttonTextColor,
                                                                                        backgroundColor: field.buttonColor,
                                                                                        minWidth: `${field.buttonWidth}px`,
                                                                                        height: `${field.buttonHeight}px`,
                                                                                        padding: `${field.buttonPadding}px`,
                                                                                        borderWidth: `${field.buttonBorderWidth}px`,
                                                                                        borderStyle: field.buttonBorderStyle,
                                                                                        borderColor: field.buttonBorderColor,
                                                                                        letterSpacing: `${field.buttonLetterSpacing}px`,
                                                                                        borderRadius: `${field.buttonradious}px`,
                                                                                        fontWeight: field.buttonweight || 300,
                                                                                        fontFamily: field.buttonfamily || '"Poppins", sans-serif'
                                                                                    }}
                                                                                >
                                                                                    {field.buttonLabel}
                                                                                </button>
                                                                            </a>
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'costum') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field form-builder-and-preview ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div style={{ width: '100%', display: 'flex' }}>
                                                                            <div style={{
                                                                                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                                                                width: '100%',
                                                                                fontSize: `${field.costumFont}px`,
                                                                                color: field.costumColor,
                                                                                backgroundColor: field.costumBg,
                                                                                textAlign: field.costumAline,
                                                                                lineHeight: `${field.costumline}px`,
                                                                                padding: `${field.costumPadding}px`,
                                                                                fontFamily: field.costomfamily || '"Poppins", sans-serif' ,
                                                                                fontWeight: field.costumfontweight,
                                                                                letterSpacing: `${field.costumLetter}px`
                                                                            }}>
                                                                                {field.costumText}
                                                                            </div>
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}

                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                );
                                                            }

                                                            if (field.type === 'html convert') {
                                                                return (

                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field form-builder-and-preview ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div style={{ width: '100%' }}>
                                                                            <div style={{ fontFamily: field.htmlfamily, whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%', color: field.htmlColor, textAlign: field.htmlaline, fontSize: `${field.htmlFontSize}px`, padding: `${field.htmlPadding}px` }}
                                                                                className="preview-content ql-editored"
                                                                                dangerouslySetInnerHTML={{ __html: field.value || field.htmltext }}
                                                                            />
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}

                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                );
                                                            }
                                                            if (field.type === 'Multicolumn') {
                                                                return (
                                                                    <div key={field.id}
                                                                        onClick={() => handleFieldClick(field.id)}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => setHoveredFieldId(null)}
                                                                        className={`email_field columns-container ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        style={{ display: 'flex', width: '100%' }}
                                                                    >
                                                                        <div style={{ width: '100%' }}>
                                                                            <div className="columns-wrapper" style={{ display: 'grid', gap: `${field.Multigap || 10}px`, padding: `${field.MultiPadding}px`, gridTemplateColumns: `repeat(${viewMode === 'mobile' ? 1 : field.columnsPerRow || 3}, 1fr)`, backgroundColor: field.Multibgcolor }}>
                                                                                {Array.from({ length: field.columnCount }, (_, index) => (
                                                                                    <div
                                                                                        key={index}
                                                                                        style={{
                                                                                            fontSize: `${field.fontsizeMulticolumn}px`,
                                                                                            borderWidth: `${field.MulticolumnbtnBorderWidth}px`,
                                                                                            borderStyle: field.MulticolumnbtnBorderStyle,
                                                                                            borderColor: field.MulticolumnbtnBorderColor,
                                                                                            padding: `${field.MulticolumnPadding || 10}px`,
                                                                                            backgroundColor: field.Multicolumnbgcolor || '#FFFFFF',
                                                                                            textAlign: field.Multitext,
                                                                                            color: field.MultiColor,
                                                                                            borderRadius: `${field.Multiborderradious}px`,
                                                                                            fontFamily: field.Multifamily || '"Poppins", sans-serif',
                                                                                            letterSpacing: `${field.Multiletter}px`,
                                                                                            overflow: 'hidden',
                                                                                            display: 'block'

                                                                                        }}
                                                                                        className={`column ${field.selectedColumn === index ? 'active-column' : ''}`}
                                                                                        onClick={(e) => handleColumnClick(field.id, index)}
                                                                                    >
                                                                                        {field.columnData[index].image && (
                                                                                            <img
                                                                                                src={field.columnData[index].image}
                                                                                                alt={`Uploaded for Column ${index + 1}`}
                                                                                                style={{ width: `${field.Multiimgwidth || 100}%`, height: 'auto', verticalAlign: 'bottom' }}
                                                                                            />
                                                                                        )}

                                                                                        {field.columnData[index].content ? (
                                                                                            <div className=' ql-editored'
                                                                                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}
                                                                                                dangerouslySetInnerHTML={{
                                                                                                    __html: field.columnData[index].content,
                                                                                                }}
                                                                                            />
                                                                                        ) : null}
                                                                                        {field.columnData[index].isVisible && (
                                                                                            <a href={field.columnData[index].Multibtnurl} target="_blank" onClick={(e) => e.preventDefault()}>
                                                                                                <button
                                                                                                    style={{
                                                                                                        fontFamily: field.Multibtnfamily || '"Poppins", sans-serif' || '"Poppins", sans-serif',
                                                                                                        marginTop: '20px',
                                                                                                        backgroundColor: field.Multibtnbg || '#FFFFFF',
                                                                                                        borderWidth: `${field.MultibtnBorderWidth || 1}px`,
                                                                                                        borderStyle: field.MultibtnBorderStyle || 'solid',
                                                                                                        borderColor: field.MultibtnBorderColor || '#000',
                                                                                                        minWidth: `${field.Multibtnweight || '100'}px`,
                                                                                                        height: `${field.Multibtnheight || '40'}px`,
                                                                                                        color: field.Multibtncolor,
                                                                                                        borderRadius: `${field.Multibtnradious || 2}px`,
                                                                                                        fontSize: `${field.Multibtnfont || '14'}px`,
                                                                                                        fontWeight: field.MultiWeight|| 100
                                                                                                    }}
                                                                                                >
                                                                                                    {field.columnData[index].Multibtnlable}
                                                                                                </button>
                                                                                            </a>
                                                                                        )}


                                                                                        {!field.columnData[index].image &&
                                                                                            !field.columnData[index].content &&
                                                                                            !field.columnData[index].isVisible && (
                                                                                                <div>
                                                                                                    <h5>Column</h5>
                                                                                                    Elevate your online store with our easy-to-use Text Box feature.
                                                                                                    It's a game-changer for personalization, allowing customers to add their
                                                                                                    special touch directly from a user-friendly drop-down menu.
                                                                                                </div>
                                                                                            )}
                                                                                    </div>
                                                                                ))}

                                                                            </div>
                                                                        </div>
                                                                        {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                            <div id='form-drag' className='form-builder-drag-drop' >
                                                                                <img src={drop} alt="Drag" />
                                                                            </div>
                                                                        )}

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                <img src={editicon} alt="copy" />
                                                                            </button>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'product' && field.products) {
                                                                return (
                                                                    <div style={{ width: '100%' }} onClick={() => handleAddProductToSelected(field.id, field.title, field.image, field.products)}>
                                                                        <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => setHoveredFieldId(null)}
                                                                            className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                            style={{ display: 'flex', width: '100%' }}
                                                                            ref={emailFieldRef}
                                                                        >
                                                                            <div className={`template-products ${field.productsPerRow ? `row-${field.productsPerRow}` : 'row-3'} ${viewMode === 'mobile' ? 'mobile' : ''}`}
                                                                                style={{
                                                                                    padding: `${field.productPadding}px`,
                                                                                    backgroundColor: field.productbg,
                                                                                    borderWidth: `${field.productBorderWidth}px`,
                                                                                    borderStyle: field.productBorderStyle,
                                                                                    borderColor: field.productBorderColor,
                                                                                    color: field.productTextColor,
                                                                                    width: '100%',
                                                                                    fontFamily: field.productfamily || '"Poppins", sans-serif',
                                                                                    lineHeight: `${field.productline}px`
                                                                                }}
                                                                            >
                                                                                {field.products.map((product) => (
                                                                                    <div className='product-show' key={product.id}>

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
                                                                                        <div style={{ display: 'grid', gap: '0px', marginBottom: '10px' }}>
                                                                                            <p style={{ letterSpacing: `${field.productLetterSpacing}px`, fontWeight: field.productWeight }}>
                                                                                                {product.title.length > 15 ? `${product.title.slice(0, 15)}...` : product.title}
                                                                                            </p>

                                                                                            {field.showPrice && product.price && (
                                                                                                <p style={{ marginTop: '10px', fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>
                                                                                                    ${product.price}
                                                                                                </p>
                                                                                            )}
                                                                                        </div>

                                                                                        {field.showbtnn && (
                                                                                            <a href={`https://${shop}/admin/products?selectedView=all`} target="_blank" rel="noopener noreferrer">
                                                                                                <button
                                                                                                    style={{
                                                                                                        fontSize: `${field.productfontSize}px`,
                                                                                                        minWidth: `${field.productwidth}px`,
                                                                                                        height: `${field.productheight}px`,
                                                                                                        fontFamily: field.productbtnfamily || '"Poppins", sans-serif',
                                                                                                        backgroundColor: field.productbackgroundColor,
                                                                                                        borderWidth: `${field.productbtnBorderWidth}px`,
                                                                                                        borderStyle: field.productbtnBorderStyle,
                                                                                                        borderColor: field.productbtnBorderColor,
                                                                                                        color: field.productbtnbg,
                                                                                                        borderRadius: `${field.productradious}px`,
                                                                                                    }}
                                                                                                    className='show-bnt-prodcut'>{field.productLabel}</button>
                                                                                            </a>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}

                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first " onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'socalicon') {
                                                                return (
                                                                    <div style={{ width: '100%' }} onClick={() => handleEdit(field)}>
                                                                        <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => setHoveredFieldId(null)}
                                                                            className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
                                                                            style={{ display: 'flex', width: '100%' }}
                                                                            ref={emailFieldRef}

                                                                        >
                                                                            <div style={{ textAlign: field.socaliconTextAlign || '', backgroundColor: field.socalIconbg, padding: `${field.socalIconPadding}px`, width: '100%' }} >
                                                                                <div className="social-icons" style={{ gap: `${field.socalIcongap}px` }}>
                                                                                    {field.icons.facebook && field.icons.facebook.url && !field.icons.facebook.isHidden && (
                                                                                        <a href={field.icons.facebook.url} onClick={(e) => e.preventDefault()}>
                                                                                            <img src={facebook} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.icons.twitter && field.icons.twitter.url && !field.icons.twitter.isHidden && (
                                                                                        <a href={field.icons.twitter.url} onClick={(e) => e.preventDefault()}>
                                                                                            <img src={twitter} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.icons.instagram && field.icons.instagram.url && !field.icons.instagram.isHidden && (
                                                                                        <a href={field.icons.instagram.url} onClick={(e) => e.preventDefault()}>
                                                                                            <img src={instagram} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.customIcons.map((icon, index) =>
                                                                                        icon.url && !icon.isHidden ? (
                                                                                            <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
                                                                                                <img src={icon.src} alt={`Custom Icon ${index}`} style={{ width: `${field.socalIconWidth}px`, height: `${field.socalIconHeight}px` }} />
                                                                                            </a>
                                                                                        ) : null
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            {(activeFieldId === field.id || hoveredFieldId === field.id) && (
                                                                                <div id='form-drag' className='form-builder-drag-drop' >
                                                                                    <img src={drop} alt="Drag" />
                                                                                </div>
                                                                            )}

                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className="copy-btn first" onClick={() => handleFieldClick(field.id)}>
                                                                                    <img src={editicon} alt="copy" />
                                                                                </button>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }

                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {showFieldPro && (<div className='form-builder-change-pro email'>

                                    <div className='email-template-input-setting'>

                                        {emailFieldPopup && (<div className='form-builder-change-propertites email camp' ref={popupRef}>
                                            <div className='controls-wrpping cancleimg pro email' onClick={hanldeCanclepro}><img src={cancleimg} alt="" /></div>
                                            <div className='form-builder-change_show_all'>
                                                <div className='form_qucik'>
                                                    <p>Quick setup Settings</p>
                                                    <div className="form-builder-propertites-save-topions" onClick={hanldeCanclepro} >
                                                        Save
                                                    </div>
                                                </div>
                                                <div className='form_build_propertities emails'>

                                                    {fields.length > 0 && selectedFieldId && (
                                                        <div className='quick-setup-settings'>
                                                            {fields.map((field) => {
                                                                if (field.id === selectedFieldId && field.type === 'Multicolumn') {
                                                                    return (
                                                                        <div>
                                                                            <div key={field.id} className='column-settings'>
                                                                                <div className='setting_bg_email_templetes'>
                                                                                    {Array.from({ length: field.columnCount }, (_, index) => (
                                                                                        <div key={index} className="column-setting">
                                                                                            <div className=' form-builder-chaneging-wrap column-settings-show-apps'>
                                                                                                <label>Column {index + 1}</label>
                                                                                                <button className='rm-btn-remove-icon'
                                                                                                    onClick={() => removeColumn(field.id, index)}
                                                                                                >
                                                                                                    <img src={remove} alt="" />
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className='form-builder-chaneging-wrap textediter ' style={{ color: "black" }}>
                                                                                                <ReactQuill
                                                                                                    value={field.columnData[index].content || ''}
                                                                                                    onChange={(value) => {
                                                                                                        const updatedFields = fields.map(f =>
                                                                                                            f.id === field.id
                                                                                                                ? {
                                                                                                                    ...f,
                                                                                                                    columnData: f.columnData.map((col, i) =>
                                                                                                                        i === index ? { ...col, content: value } : col
                                                                                                                    ),
                                                                                                                }
                                                                                                                : f
                                                                                                        );
                                                                                                        setFields(updatedFields);
                                                                                                    }}
                                                                                                    modules={{ toolbar: toolbarOptions }}
                                                                                                />
                                                                                            </div>

                                                                                            <div
                                                                                                className='form-builder-chaneging-wrap file'
                                                                                                onClick={() => document.getElementById(`file-input-${field.id}-${index}`).click()}
                                                                                                onDragOver={(e) => e.preventDefault()}
                                                                                                onDrop={(e) => handleFileDrop(e, field.id, index)}
                                                                                                style={{ display: field.columnData[index]?.image ? 'none' : 'block', cursor: 'pointer' }}
                                                                                            >
                                                                                                <input
                                                                                                    type="file"
                                                                                                    accept="image/*"
                                                                                                    id={`file-input-${field.id}-${index}`}
                                                                                                    style={{ display: 'none' }}
                                                                                                    onChange={(e) => handleImageChange1(e, field.id, index)}
                                                                                                />
                                                                                                <div className='form-builder-changes-file-wraped'>
                                                                                                    <img src={file} alt="" />
                                                                                                    <div className='email-files drop'>
                                                                                                        <p>Drop Files Here or browse for files.</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                            {field.columnData[index].image && (
                                                                                                <div className='form-builder-chaneging-wrap images-upload'>
                                                                                                    <img
                                                                                                        src={field.columnData[index].image}
                                                                                                        alt={`Preview for Column ${index + 1}`}
                                                                                                        width='100%'
                                                                                                    />
                                                                                                    <button
                                                                                                        className='rm-btn remove-coloum'
                                                                                                        onClick={() => removeImage(field.id, index)}
                                                                                                    >
                                                                                                        <img src={remove} alt="" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            )}

                                                                                            {/* <button onClick={() => toggleButtonVisibility(field.id, index)}>
                                                                                            {field.columnData[index].isVisible ? 'Hide Column' : 'Show Column'}
                                                                                        </button> */}
                                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                                <label>Button Label</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    value={field.columnData[index].Multibtnlable}
                                                                                                    onChange={(e) => {
                                                                                                        const updatedLabel = e.target.value;
                                                                                                        const updatedFields = fields.map(f =>
                                                                                                            f.id === field.id
                                                                                                                ? {
                                                                                                                    ...f,
                                                                                                                    columnData: f.columnData.map((col, i) =>
                                                                                                                        i === index ? { ...col, Multibtnlable: updatedLabel, isVisible: updatedLabel.trim() !== '' } : col
                                                                                                                    ),
                                                                                                                }
                                                                                                                : f
                                                                                                        );
                                                                                                        setFields(updatedFields);
                                                                                                    }}
                                                                                                    placeholder="Column Label"
                                                                                                />
                                                                                            </div>
                                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                                <label>Button Url</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    value={field.columnData[index].Multibtnurl}
                                                                                                    onChange={(e) => {
                                                                                                        const updatedUrl = e.target.value;
                                                                                                        const updatedFields = fields.map(f =>
                                                                                                            f.id === field.id
                                                                                                                ? {
                                                                                                                    ...f,
                                                                                                                    columnData: f.columnData.map((col, i) =>
                                                                                                                        i === index ? { ...col, Multibtnurl: updatedUrl } : col
                                                                                                                    ),
                                                                                                                }
                                                                                                                : f
                                                                                                        );
                                                                                                        setFields(updatedFields);
                                                                                                    }}
                                                                                                    placeholder="Button Url"
                                                                                                />
                                                                                            </div>


                                                                                        </div>
                                                                                    ))}


                                                                                    <button className='add-forms icons' onClick={() => addColumn(field.id)}
                                                                                    >Add Column</button>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className="product-detalis-all">
                                                                                    <h3>Column layout</h3>
                                                                                    <div className="form-builder-chaneging-wrap select">
                                                                                        <select
                                                                                            onChange={(e) => handleColoumPerRowChange(e, field.id)}
                                                                                            value={field.columnsPerRow || (viewMode === 'mobile' ? 1 : 3)}
                                                                                        >
                                                                                            {[...Array(6).keys()].map((i) => (
                                                                                                <option key={i + 1} value={i + 1}>
                                                                                                    {i + 1} per row
                                                                                                </option>
                                                                                            ))}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label> Image-Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.Multiimgwidth || '100'}
                                                                                        onChange={(e) => {
                                                                                            const newValue = e.target.value;
                                                                                            if (newValue >= 25 && newValue <= 100) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multiimgwidth: newValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min='0'
                                                                                    />

                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.MultiColor || '#0000'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, MultiColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.MultiColor || '#000'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, MultiColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Background Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.Multibgcolor || '#FFFFFF'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, Multibgcolor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.Multibgcolor || '#FFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, Multibgcolor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label> Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.MultiPadding || '0'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, MultiPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors add-text-line'>
                                                                                        <label>Background Color Column</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.Multicolumnbgcolor || '#FFFFFF'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, Multicolumnbgcolor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.Multicolumnbgcolor || '#FFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, Multicolumnbgcolor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                min='0'
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Font-Family</label>
                                                                                    <select
                                                                                        value={field.Multifamily || '"Poppins", sans-serif'}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, Multifamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.Multitext}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, Multitext: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.Multiletter}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multiletter: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>

                                                                                {/* <div className='form-builder-chaneging-wrap number' >
                                                                                    <label> Line Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.Multiheight || '20'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, Multiheight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label> Column Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.MulticolumnPadding || '10'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, MulticolumnPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Column Gap</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.Multigap || '10'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, Multigap: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Coloum-Gap"
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font-Size</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.fontsizeMulticolumn || '14'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, fontsizeMulticolumn: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Font-Size"
                                                                                    />
                                                                                </div> */}

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Border-Radius (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.Multiborderradious}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multiborderradious: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"

                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Border Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.MulticolumnbtnBorderColor || '#0000'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, MulticolumnbtnBorderColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.MulticolumnbtnBorderColor || '#0000'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, MulticolumnbtnBorderColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Border Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.MulticolumnbtnBorderWidth || '1'}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, MulticolumnbtnBorderWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Border Style</label>
                                                                                    <select
                                                                                        value={field.MulticolumnbtnBorderStyle}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, MulticolumnbtnBorderStyle: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="solid">Solid</option>
                                                                                        <option value="dashed">Dashed</option>
                                                                                        <option value="dotted">Dotted</option>
                                                                                        <option value="double">double</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='product-detalis-all btn-split'>
                                                                                    <h3> Button Properties </h3>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Button Url</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={field.Multibtnurl}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multibtnurl: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            placeholder="Button Url"
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label> Text-color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.Multibtncolor || '#0000'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, Multibtncolor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.Multibtncolor || '#000000'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, Multibtncolor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label> Border Radius (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.Multibtnradious || '2'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multibtnradious: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label> Font Size (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.Multibtnfont || '14'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multibtnfont: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />

                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Font-Weight</label>
                                                                                        <select
                                                                                            value={field.MultiWeight || 100}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, MultiWeight: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="100">Thin</option>
                                                                                            <option value="500">Medium</option>
                                                                                            <option value="600">Semi Bold</option>
                                                                                            <option value="700">Bold</option>
                                                                                            <option value="800">Extra Bold</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label> Height (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.Multibtnheight || '40'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multibtnheight: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label> Width (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.Multibtnweight || '100'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, Multibtnweight: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-builder-chaneging-wrap number">
                                                                                        <label>  Font-Family</label>
                                                                                        <select
                                                                                            value={field.Multibtnfamily || '"Poppins", sans-serif'}
                                                                                            onChange={(e) => {
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) =>
                                                                                                        f.id === field.id ? { ...f, Multibtnfamily: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="">Select Font-Family</option>
                                                                                            <option value="Arial, sans-serif">Arial</option>
                                                                                            <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                            <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                            <option value="'Georgia', serif">Georgia</option>
                                                                                            <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                            <option value="'Roboto', sans-serif">Roboto</option>
                                                                                            <option value="'Raleway', sans-serif">Raleway</option>
                                                                                            <option value="'Gotham', sans-serif">Gotham</option>
                                                                                            <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                            <option value="'Lato', sans-serif">Lato</option>
                                                                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                            <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                            <option value="'Poppins', sans-serif">Poppins</option>
                                                                                            <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                            <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                            <option value="'Barlow', sans-serif">Barlow</option>
                                                                                            <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                            <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                            <option value="'Inter', sans-serif">Inter</option>


                                                                                        </select>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label>Background Color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.Multibtnbg || '#FFFFFF'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, Multibtnbg: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.Multibtnbg || '#FFFFFF'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, Multibtnbg: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label>Border Color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.MultibtnBorderColor || '#0000'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, MultibtnBorderColor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.MultibtnBorderColor || '#0000'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, MultibtnBorderColor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label>Border Width (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.MultibtnBorderWidth || '1'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, MultibtnBorderWidth: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>Border Style</label>
                                                                                        <select
                                                                                            value={field.MultibtnBorderStyle}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, MultibtnBorderStyle: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="solid">Solid</option>
                                                                                            <option value="dashed">Dashed</option>
                                                                                            <option value="dotted">Dotted</option>
                                                                                            <option value="double">double</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                                if (field.id === selectedFieldId && field.type === 'richtext') {
                                                                    return (
                                                                        <div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap textediter' style={{ color: 'black' }} >
                                                                                    <ReactQuill
                                                                                        value={editorValueed || field.content || 'Captivate customers with'}
                                                                                        onChange={(value) => handleEditChange(value, field.id)}
                                                                                        modules={{ toolbar: toolbarOptions }}
                                                                                    />

                                                                                </div>

                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font Size (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.richFontsize}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, richFontsize: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Font-Family</label>
                                                                                    <select
                                                                                        value={field.richFontfamily}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, richFontfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Text-color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.richtextcolor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, richtextcolor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.richtextcolor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, richtextcolor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.richTextAlign}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, richTextAlign: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.richspace}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, richspace: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>

                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Line-Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.richlineheight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, richlineheight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}

                                                                                <div className="form-builder-chaneging-wrap-custom-checkbox">
                                                                                    <label>Crossed-out</label>
                                                                                    <div className="form-builder-costom custom-checkbox-form-build">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            id={`richline-toggle-${field.id}`}
                                                                                            checked={field.richline === 'line-through'}
                                                                                            onChange={(e) => {
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) =>
                                                                                                        f.id === field.id
                                                                                                            ? { ...f, richline: e.target.checked ? 'line-through' : undefined }
                                                                                                            : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                        <label htmlFor={`richline-toggle-${field.id}`}></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Background Color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.richbgcolor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, richbgcolor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.richbgcolor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, richbgcolor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Padding (px)</label>
                                                                                    <div className='form-builder-chanege-top-bottom'>
                                                                                        <label> Left & Right</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.richleftPadding}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, richleftPadding: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            placeholder="Padding"
                                                                                            min='0'
                                                                                        />
                                                                                    </div>

                                                                                    <div className='form-builder-chanege-top-bottom'>
                                                                                        <label> Top & Bottom </label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.richtopPadding}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, richtopPadding: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            placeholder="Padding"
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                if (field.id === selectedFieldId && field.type === 'product') {
                                                                    return (
                                                                        <div>

                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className="show-select-product">
                                                                                    <h3>Products</h3>
                                                                                    {productTitles.length > 0 ? (
                                                                                        productTitles.map((title, index) => (
                                                                                            <div className='show-product-details add-forms' key={index} >
                                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                    {productImage[index] && (
                                                                                                        <img
                                                                                                            src={productImage[index]}
                                                                                                            alt={title}
                                                                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                                                                                        />
                                                                                                    )}
                                                                                                    <h4>{title.length > 35 ? title.slice(0, 35) + '...' : title}</h4>
                                                                                                </div>
                                                                                                <div style={{ cursor: "pointer" }} onClick={() => handleRemoveProductFromForm(index)}>
                                                                                                    <img src={deletep} alt="" style={{ width: '17px' }} />
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    ) : (
                                                                                        <p></p>
                                                                                    )}

                                                                                    <button className='product-btn-addproduct' onClick={AddProduct}>Add Product</button>
                                                                                </div>

                                                                                <div className='product-detalis-all add-forms '>
                                                                                    <h3>Product details</h3>
                                                                                    <label className="custom-checkbox">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={field.showPrice}
                                                                                            onChange={(e) => togglePrice(e, field.id)}
                                                                                        />
                                                                                        Price
                                                                                    </label>
                                                                                    <label className="custom-checkbox">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={field.showbtnn}
                                                                                            onChange={(e) => togglebtnn(e, field.id)}
                                                                                        />
                                                                                        Button
                                                                                    </label>
                                                                                </div>
                                                                                <div className="product-detalis-all add-forms ">
                                                                                    <h3>Product layout</h3>
                                                                                    <div className='form-builder-chaneging-wrap select'>
                                                                                        <select
                                                                                            onChange={(e) => handleProductsPerRowChange(e, field.id)}
                                                                                            value={field.productsPerRow || (viewMode === 'mobile' ? 1 : 3)}
                                                                                        >
                                                                                            {[...Array(4).keys()].map(i => (
                                                                                                <option key={i + 1} value={i + 1}>
                                                                                                    {i + 1} per row
                                                                                                </option>
                                                                                            ))}
                                                                                        </select>

                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.productPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Line Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.productline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Font-Family</label>
                                                                                    <select
                                                                                        value={field.productfamily || '"Poppins", sans-serif'}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, productfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.productbg}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.productbg || '#FFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, productbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Border Color</label>
                                                                                        <div className="color-picker-container">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.productBorderColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productBorderColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.productBorderColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, productBorderColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Border Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.productBorderWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productBorderWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Border Style</label>
                                                                                    <select
                                                                                        value={field.productBorderStyle}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productBorderStyle: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="solid">Solid</option>
                                                                                        <option value="dashed">Dashed</option>
                                                                                        <option value="dotted">Dotted</option>
                                                                                        <option value="double">double</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font Size (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.productFontSize}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productFontSize: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.productTextColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productTextColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.productTextColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, productTextColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font-Weight</label>
                                                                                    <select
                                                                                        value={field.productWeight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, productWeight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="100">Thin</option>
                                                                                        <option value="500">Medium</option>
                                                                                        <option value="600">Semi Bold</option>
                                                                                        <option value="700">Bold</option>
                                                                                        <option value="800">Extra Bold</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.productLetterSpacing}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productLetterSpacing: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap all-btn'>
                                                                                    <label> Button</label>
                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>Button Label</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={field.productLabel}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productLabel: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Font Size (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.productfontSize}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productfontSize: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Width (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.productwidth}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productwidth: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Height (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.productheight}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productheight: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-builder-chaneging-wrap number">
                                                                                        <label>  Font-Family</label>
                                                                                        <select
                                                                                            value={field.productbtnfamily || '"Poppins", sans-serif'}
                                                                                            onChange={(e) => {
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) =>
                                                                                                        f.id === field.id ? { ...f, productbtnfamily: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="">Select Font-Family</option>
                                                                                            <option value="Arial, sans-serif">Arial</option>
                                                                                            <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                            <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                            <option value="'Georgia', serif">Georgia</option>
                                                                                            <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                            <option value="'Roboto', sans-serif">Roboto</option>
                                                                                            <option value="'Raleway', sans-serif">Raleway</option>
                                                                                            <option value="'Gotham', sans-serif">Gotham</option>
                                                                                            <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                            <option value="'Lato', sans-serif">Lato</option>
                                                                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                            <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                            <option value="'Poppins', sans-serif">Poppins</option>
                                                                                            <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                            <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                            <option value="'Barlow', sans-serif">Barlow</option>
                                                                                            <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                            <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                            <option value="'Inter', sans-serif">Inter</option>


                                                                                        </select>
                                                                                    </div>


                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label>Background Color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.productbackgroundColor}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, productbackgroundColor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.productbackgroundColor}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productbackgroundColor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label> Text Color</label>
                                                                                            <div className="color-picker-container color_wraped">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.productbtnbg}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, productbtnbg: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.productbtnbg || '#FFFFFF'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productbtnbg: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label>Border Color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.productbtnBorderColor}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, productbtnBorderColor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.productbtnBorderColor}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, productbtnBorderColor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label>Border Width (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.productbtnBorderWidth}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productbtnBorderWidth: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>Border Style</label>
                                                                                        <select
                                                                                            value={field.productbtnBorderStyle}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, productbtnBorderStyle: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="solid">Solid</option>
                                                                                            <option value="dashed">Dashed</option>
                                                                                            <option value="dotted">Dotted</option>
                                                                                            <option value="double">double</option>
                                                                                        </select>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Border-Radius (px)</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={field.productradious}
                                                                                            onChange={(e) => {
                                                                                                const inputValue = e.target.value;
                                                                                                const newWidth = parseInt(inputValue, 10);

                                                                                                if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, productradious: inputValue } : f
                                                                                                        )
                                                                                                    );
                                                                                                }
                                                                                            }}
                                                                                            min="0"
                                                                                            max="100"

                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                }
                                                                if (field.id === selectedFieldId && field.type === 'heading') {
                                                                    return (
                                                                        <div key={field.id}>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap image'>
                                                                                    <label>Background Image</label>
                                                                                    {!field.headingbgImage && (
                                                                                        <div
                                                                                            className="upload-area"
                                                                                            onClick={() => document.getElementById('fileInput').click()}
                                                                                            onDragOver={(e) => e.preventDefault()}
                                                                                            onDrop={(e) => {
                                                                                                e.preventDefault();
                                                                                                const droppedFile = e.dataTransfer.files[0];
                                                                                                if (droppedFile) {
                                                                                                    handleFileChange({ target: { files: [droppedFile] } }, field.id);
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <img src={file} alt="" />
                                                                                            <p>Drag & Drop to Upload image </p>
                                                                                            <p>OR </p>
                                                                                            <span className='upload-btn'>Browse image </span>
                                                                                            <input
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                onChange={(e) => handleFileChange(e, field.id)}
                                                                                                style={{ display: 'none' }}
                                                                                                id="fileInput"
                                                                                            />
                                                                                        </div>
                                                                                    )}

                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap preview img-heading">
                                                                                    {field.headingbgImage && (
                                                                                        <div className="image-preview">
                                                                                            <img
                                                                                                src={field.headingbgImage}
                                                                                                alt="Background Preview"
                                                                                                style={{ maxWidth: '100%', objectFit: 'cover' }}
                                                                                            />
                                                                                            <button className='rm-btn showfirst'
                                                                                                onClick={() => handleRemoveImage5(field.id)}>
                                                                                                <img src={remove} alt="" />
                                                                                            </button>

                                                                                        </div>
                                                                                    )}

                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Image Width:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.bannerImageWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, bannerImageWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Image Width"
                                                                                    />
                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Image Height:</label>
                                                                                    <select
                                                                                        value={
                                                                                            field.bannerImageHeight === '300px'
                                                                                                ? 'small'
                                                                                                : field.bannerImageHeight === '500px'
                                                                                                    ? 'medium'
                                                                                                    : field.bannerImageHeight === '900px'
                                                                                                        ? 'large'
                                                                                                        : 'default'
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            const selectedValue = e.target.value;
                                                                                            const heightMapping = {
                                                                                                default: '600px',
                                                                                                small: '300px',
                                                                                                medium: '500px',
                                                                                                large: '900px',
                                                                                            };

                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id
                                                                                                        ? {
                                                                                                            ...f,
                                                                                                            bannerImageHeight: heightMapping[selectedValue],
                                                                                                        }
                                                                                                        : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="default">Default</option>
                                                                                        <option value="small">Small</option>
                                                                                        <option value="medium">Medium</option>
                                                                                        <option value="large">Large</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Opacity </label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headeropacity}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headeropacity: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Opacity"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white '>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Heading Text:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={field.headingText || field.value}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingText: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Enter Heading Text"
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Heading Level:</label>
                                                                                    <select
                                                                                        value={field.headingLevel}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingLevel: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="h1">H1</option>
                                                                                        <option value="h2">H2</option>
                                                                                        <option value="h3">H3</option>
                                                                                        <option value="h4">H4</option>
                                                                                        <option value="h5">H5</option>
                                                                                        <option value="h6">H6</option>
                                                                                    </select>
                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Heading Font Size:</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.headingFontSize}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, headingFontSize: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    placeholder="Font Size"
                                                                                />
                                                                            </div> */}
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingLetterSpacing}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, headingLetterSpacing: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>


                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Line Height</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div> */}
                                                                                <div className='form-builder-chaneging-wrap text'>
                                                                                    <label>Font-Weight</label>
                                                                                    <select
                                                                                        value={field.headingFontWeight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingFontWeight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="100">Thin</option>
                                                                                        <option value="500">Medium</option>
                                                                                        <option value="600">Semi Bold</option>
                                                                                        <option value="700">Bold</option>
                                                                                        <option value="800">Extra Bold</option>
                                                                                    </select>
                                                                                </div>



                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Font-Family</label>
                                                                                    <select
                                                                                        value={field.headingfamily}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, headingfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color </label>
                                                                                        <div className="color-picker-container">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.headingColor || '#ffffff'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, headingColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.headingColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className="form-builder-chaneging-wrap textediter" style={{ color: 'black' }}>
                                                                                    <label> Subheading</label>
                                                                                    <ReactQuill
                                                                                        value={editorValue || field.editorContent || 'Its a numbers game'}
                                                                                        onChange={(value) => handleEditorChange(value, field.id)}
                                                                                        modules={{ toolbar: toolbarOptions }}
                                                                                    />

                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>  Font-Size</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingsubheading}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingsubheading: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Font-Size"
                                                                                    />
                                                                                </div> */}
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>  Font-Family</label>
                                                                                    <select
                                                                                        value={field.subheadingfamily}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, subheadingfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>  Line-Height</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.subheadingline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, subheadingline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Padding"
                                                                                    />
                                                                                </div> */}

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.subheadingleter}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, subheadingleter: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.subheadingColor || '#ffffff'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, subheadingColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.subheadingColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, subheadingColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Margin </label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingmargin}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingmargin: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Margin"
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Padding</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Padding"
                                                                                        min='0'
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.headingTextAlign}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingTextAlign: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.headingbg || '#ffffff'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, headingbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.headingbg || '#ffffff'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Border Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.headingBorderColor || '#ffffff'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, headingBorderColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.headingBorderColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingBorderColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Border Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.headingBorderWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingBorderWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Border Width"
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Border Style</label>
                                                                                    <select
                                                                                        value={field.headingBorderStyle}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, headingBorderStyle: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="solid">Solid</option>
                                                                                        <option value="dashed">Dashed</option>
                                                                                        <option value="dotted">Dotted</option>
                                                                                        <option value="double">double</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className="form-builder-changing-wrap url">

                                                                                    <>
                                                                                        <div className='form-builder-chaneging-wrap'>
                                                                                            <label>Button Url:</label>
                                                                                            <input
                                                                                                type="url"
                                                                                                value={field.headingUrl}
                                                                                                onChange={(e) => handleUpdateUrl(field.id, e.target.value)}
                                                                                                placeholder="Update URL"
                                                                                            />
                                                                                        </div>

                                                                                        <div className='form-builder-chaneging-wrap'>
                                                                                            <label>Button Label</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={field.headerbtn}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headerbtn: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="form-builder-chaneging-wrap number">
                                                                                            <label>  Font-Family</label>
                                                                                            <select
                                                                                                value={field.headingbtnfamily || '"Poppins", sans-serif'}
                                                                                                onChange={(e) => {
                                                                                                    setFields((prevFields) =>
                                                                                                        prevFields.map((f) =>
                                                                                                            f.id === field.id ? { ...f, headingbtnfamily: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <option value="">Select Font-Family</option>
                                                                                                <option value="Arial, sans-serif">Arial</option>
                                                                                                <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                                <option value="'Georgia', serif">Georgia</option>
                                                                                                <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                                <option value="'Roboto', sans-serif">Roboto</option>
                                                                                                <option value="'Raleway', sans-serif">Raleway</option>
                                                                                                <option value="'Gotham', sans-serif">Gotham</option>
                                                                                                <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                                <option value="'Lato', sans-serif">Lato</option>
                                                                                                <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                                <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                                <option value="'Poppins', sans-serif">Poppins</option>
                                                                                                <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                                <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                                <option value="'Barlow', sans-serif">Barlow</option>
                                                                                                <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                                <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                                <option value="'Inter', sans-serif">Inter</option>


                                                                                            </select>
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                                            <div className='checkbox-option bg-colors'>
                                                                                                <label>Button Background</label>
                                                                                                <div className="color-picker-container color_wraped">

                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="color-code"
                                                                                                        value={field.headerbtnbg || '#ffffff'}
                                                                                                        readOnly
                                                                                                        onClick={(e) => {
                                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                                        }}
                                                                                                        onPaste={(e) => {
                                                                                                            e.preventDefault();
                                                                                                            const pastedText = e.clipboardData.getData('text').trim();
                                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                                setFields(prevFields =>
                                                                                                                    prevFields.map(f =>
                                                                                                                        f.id === field.id ? { ...f, headerbtnbg: pastedText } : f
                                                                                                                    )
                                                                                                                );
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                    <input
                                                                                                        type="color"
                                                                                                        value={field.headerbtnbg}
                                                                                                        onChange={(e) => {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, headerbtnbg: e.target.value } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                                            <div className='checkbox-option bg-colors'>
                                                                                                <label>Button Border color   </label>
                                                                                                <div className="color-picker-container color_wraped">

                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="color-code"
                                                                                                        value={field.headingbtnBorderColor || '#ffffff'}
                                                                                                        readOnly
                                                                                                        onClick={(e) => {
                                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                                        }}
                                                                                                        onPaste={(e) => {
                                                                                                            e.preventDefault();
                                                                                                            const pastedText = e.clipboardData.getData('text').trim();
                                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                                setFields(prevFields =>
                                                                                                                    prevFields.map(f =>
                                                                                                                        f.id === field.id ? { ...f, headingbtnBorderColor: pastedText } : f
                                                                                                                    )
                                                                                                                );
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                    <input
                                                                                                        type="color"
                                                                                                        value={field.headingbtnBorderColor}
                                                                                                        onChange={(e) => {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, headingbtnBorderColor: e.target.value } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap number' >
                                                                                            <label>Border Width (px)</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={field.headingbtnBorderWidth}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnBorderWidth: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                placeholder="Border Width"
                                                                                                min='0'
                                                                                            />
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap'>
                                                                                            <label>Border Style</label>
                                                                                            <select
                                                                                                value={field.headingbtnBorderStyle}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnBorderStyle: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <option value="solid">Solid</option>
                                                                                                <option value="dashed">Dashed</option>
                                                                                                <option value="dotted">Dotted</option>
                                                                                                <option value="double">double</option>
                                                                                            </select>
                                                                                        </div>

                                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                                            <div className='checkbox-option bg-colors'>
                                                                                                <label>Button text color</label>
                                                                                                <div className="color-picker-container color_wraped">

                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="color-code"
                                                                                                        value={field.headerbtncolor || '#ffffff'}
                                                                                                        readOnly
                                                                                                        onClick={(e) => {
                                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                                        }}
                                                                                                        onPaste={(e) => {
                                                                                                            e.preventDefault();
                                                                                                            const pastedText = e.clipboardData.getData('text').trim();
                                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                                setFields(prevFields =>
                                                                                                                    prevFields.map(f =>
                                                                                                                        f.id === field.id ? { ...f, headerbtncolor: pastedText } : f
                                                                                                                    )
                                                                                                                );
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                    <input
                                                                                                        type="color"
                                                                                                        value={field.headerbtncolor}
                                                                                                        onChange={(e) => {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, headerbtncolor: e.target.value } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Button Padding (px)</label>
                                                                                            <div className='form-builder-chanege-top-bottom'>
                                                                                                <label> Left & Right</label>
                                                                                                <input
                                                                                                    type="number"
                                                                                                    value={field.headingbtnPadding}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, headingbtnPadding: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                    placeholder="Padding"
                                                                                                    min='0'
                                                                                                />
                                                                                            </div>
                                                                                            <div className='form-builder-chanege-top-bottom'>
                                                                                                <label> Top & Bottom </label>
                                                                                                <input
                                                                                                    type="number"
                                                                                                    value={field.headingbtntopPadding}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, headingbtntopPadding: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                    placeholder="Padding"
                                                                                                    min='0'
                                                                                                />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Font-Weight</label>
                                                                                            <select
                                                                                                value={field.headingbtnweight}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnweight: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                              
                                                                                                <option value="500">Medium</option>
                                                                                                <option value="600">Semi Bold</option>
                                                                                                <option value="700">Bold</option>
                                                                                                <option value="800">Extra Bold</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Button Radius</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={field.headingbtnradious}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnradious: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                placeholder="Button Radius"
                                                                                                min='0'
                                                                                            />
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Button Height</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={field.headingbtnheight}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnheight: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                placeholder="Button Height"
                                                                                                min='0'
                                                                                            />
                                                                                        </div>
                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Button Width</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={field.headingbtnwidth}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnwidth: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                placeholder="Button Width"
                                                                                                min='0'
                                                                                            />
                                                                                        </div>

                                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                                            <label>Button Font-Size</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={field.headingbtnFontSize}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, headingbtnFontSize: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                                placeholder="Button Font-Size"
                                                                                                min='0'
                                                                                            />
                                                                                        </div>

                                                                                    </>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === 'description') {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap">
                                                                            <label>Description Text</label>
                                                                            <textarea
                                                                                type="text"
                                                                                value={field.descriptionText || field.value || ''}
                                                                                onChange={(e) => handleDescriptionChange(field.id, e.target.value)}
                                                                                placeholder="Enter Description"
                                                                            />

                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Font Size (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.descritionFontSize}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descritionFontSize: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Font-Weight</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.descritionFontWeight}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descritionFontWeight: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label> Color</label>
                                                                                <input
                                                                                    type="color"
                                                                                    value={field.descritionColor}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descritionColor: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label> Background Color</label>
                                                                                <input
                                                                                    type="color"
                                                                                    value={field.descriptionbg || '#ffffff'}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionbg: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label> Padding</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.descriptionPadding}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionPadding: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    placeholder="Padding"
                                                                                />
                                                                            </div>
                                                                            {/* <div className='form-builder-chaneging-wrap number'>
                                                                                <label> Letter Spacing</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.descriptionLetterSpacing}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionLetterSpacing: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    placeholder="Letter Spacing"
                                                                                />
                                                                            </div> */}
                                                                            <div className='form-builder-chaneging-wrap'>
                                                                                <label>Text Align </label>
                                                                                <select
                                                                                    value={field.descriptionTextAlign}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionTextAlign: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <option value="">Select text align</option>
                                                                                    <option value="left">Left</option>
                                                                                    <option value="center">Center</option>
                                                                                    <option value="right">Right</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label>Border Color</label>
                                                                                <input
                                                                                    type="color"
                                                                                    value={field.descriptionBorderColor}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionBorderColor: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                            <div className='form-builder-chaneging-wrap number' >
                                                                                <label>Border Width (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.descriptionBorderWidth}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionBorderWidth: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap'>
                                                                                <label>Border Style</label>
                                                                                <select
                                                                                    value={field.descriptionBorderStyle}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, descriptionBorderStyle: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <option value="solid">Solid</option>
                                                                                    <option value="dashed">Dashed</option>
                                                                                    <option value="dotted">Dotted</option>
                                                                                    <option value="double">double</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                    );
                                                                }
                                                                if (field.id === selectedFieldId && field.type === "images") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap file">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div>
                                                                                    {!field.value ? (
                                                                                        <div
                                                                                            className="upload-area"
                                                                                            onClick={() => document.getElementById(`fileInput-${field.id}`).click()}
                                                                                            onDragOver={(e) => e.preventDefault()}
                                                                                            onDrop={(e) => {
                                                                                                e.preventDefault();
                                                                                                handleImageUpload(e, field.id);
                                                                                            }}
                                                                                        >
                                                                                            <img src={file} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                                                                            <p>Drag & Drop to Upload image </p>
                                                                                            <p>OR</p>
                                                                                            <span className="upload-btn">Browse image </span>
                                                                                            <input
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                onChange={(e) => handleImageUpload(e, field.id)}
                                                                                                style={{ display: 'none' }}
                                                                                                id={`fileInput-${field.id}`}
                                                                                            />
                                                                                        </div>
                                                                                    ) : (

                                                                                        <div style={{ position: 'relative' }}>
                                                                                            <div className='form-builder-img-wrap'>
                                                                                                <img src={field.value} alt="Uploaded" style={{ display: 'flex', width: '100%', maxWidth: "100%", height: "auto", border: "1px solid #ccc", padding: "5px" }} />
                                                                                            </div>
                                                                                            <button className='update-image img rm-btn' onClick={() => document.getElementById(`fileInput-${field.id}`).click()}>
                                                                                                Update Image
                                                                                            </button>
                                                                                            <span className='update-image rmove-img rm-btn' onClick={() => removeField(field.id)}>
                                                                                                <img src={remove} alt="" />
                                                                                            </span>
                                                                                            <input
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                onChange={(e) => handleImageUpload(e, field.id)}
                                                                                                style={{ display: 'none' }}
                                                                                                id={`fileInput-${field.id}`}
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                </div>


                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Width</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.imgWidth}
                                                                                        onChange={(e) => {
                                                                                            const newWidth = parseInt(e.target.value, 10);

                                                                                            if (newWidth >= 25 && newWidth <= 100) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, imgWidth: newWidth } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.imgTextAlign}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, imgTextAlign: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background Color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.imgbg}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, imgbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.imgbg || '#ffffff'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, imgbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Padding</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.imgPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, imgPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        placeholder="Padding"
                                                                                        min='0'
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Border Color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.imgBorderColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, imgBorderColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.imgBorderColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, imgBorderColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Border Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.imgBorderWidth}
                                                                                        min='0'
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, imgBorderWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Border Style</label>
                                                                                    <select
                                                                                        value={field.imgBorderStyle}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, imgBorderStyle: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="solid">Solid</option>
                                                                                        <option value="dashed">Dashed</option>
                                                                                        <option value="dotted">Dotted</option>
                                                                                        <option value="double">double</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                                if (field.id === selectedFieldId && field.type === "divider") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Divider Color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.dividerColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, dividerColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.dividerColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, dividerColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>Divider Background color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.dividerbgColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, dividerbgColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.dividerbgColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, dividerbgColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Divider Alignment </label>
                                                                                    <select
                                                                                        value={field.dividerAline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, dividerAline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">left</option>
                                                                                        <option value="center">center</option>
                                                                                        <option value="right">right</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Height</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.dividerheight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, dividerheight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Width</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        max="100"
                                                                                        value={field.dividerWidth}
                                                                                        onChange={(e) => {
                                                                                            const value = parseInt(e.target.value, 10);
                                                                                            if (value <= 100) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, dividerWidth: value } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === "costum") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Costum Text</label>
                                                                                    <textarea rows="4" cols="50"
                                                                                        style={{ resize: 'vertical' }}

                                                                                        value={field.costumText}
                                                                                        onChange={(e) => {
                                                                                            console.log("Updated Text:", e.target.value);
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumText: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font Size (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.costumFont}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumFont: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Line-Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.costumline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter-Spacing (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.costumLetter}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumLetter: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font-Weight</label>
                                                                                    <select
                                                                                        value={field.costumfontweight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumfontweight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="100">Thin</option>
                                                                                        <option value="500">Medium</option>
                                                                                        <option value="600">Semi Bold</option>
                                                                                        <option value="700">Bold</option>
                                                                                        <option value="800">Extra Bold</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>  Font-Family</label>
                                                                                    <select
                                                                                        value={field.costomfamily || '"Poppins", sans-serif'}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, costomfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.costumPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.costumColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, costumColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.costumColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, costumColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background-color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.costumBg}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, costumBg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.costumBg}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, costumBg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.costumAline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, costumAline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === "html convert") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap color">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <label>Html Convert</label>
                                                                                <div className="form-builder-and-preview">
                                                                                    {fields.map((field) => renderField(field))}

                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>  Font-Family</label>
                                                                                    <select
                                                                                        value={field.htmlfamily}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, htmlfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>


                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.htmlColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, htmlColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.htmlColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, htmlColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.htmlaline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, htmlaline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font Size (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.htmlFontSize}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, htmlFontSize: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.htmlPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, htmlPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Line Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.htmllineheight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, htmllineheight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}
                                                                            </div>

                                                                        </div>
                                                                    );
                                                                }
                                                                if (field.type === "split-group" && field.children.some(child => child.id === selectedFieldId)) {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap color">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div>
                                                                                    <label htmlFor="widthSelect">Adjust Width: </label>
                                                                                    <select
                                                                                        id="widthSelect"
                                                                                        onChange={(e) => handleWidthChange(e.target.value)}
                                                                                        value={fields.flatMap((f) => (f.type === "split-group" ? f.children : []))
                                                                                            .find((f) => f.id === selectedFieldId)?.width || "50%"}
                                                                                    >
                                                                                        <option value="25%">25%</option>
                                                                                        <option value="50%">50%</option>
                                                                                        <option value="75%">75%</option>
                                                                                    </select>

                                                                                    <div style={{ marginTop: '10px' }}>
                                                                                        <label htmlFor="add">Content Type: </label>
                                                                                        <select
                                                                                            id="add"
                                                                                            onChange={(e) =>
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, add: e.target.value, value: e.target.value === "image" ? "" : child.value }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, add: e.target.value, value: e.target.value === "image" ? "" : f.value }
                                                                                                            : f;
                                                                                                    })
                                                                                                )
                                                                                            }
                                                                                            value={fields.flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                .find((f) => f.id === selectedFieldId)?.add || "text"}
                                                                                        >
                                                                                            <option value="text">Text</option>
                                                                                            <option value="image">Image</option>
                                                                                        </select>

                                                                                    </div>

                                                                                    <div style={{ marginTop: '10px' }} className="form-builder-chaneging-wrap">

                                                                                        {fields
                                                                                            .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                            .find((f) => f.id === selectedFieldId)?.add === "text" ? (
                                                                                            <div className='form-builder-chaneging-wrap textediter' style={{ color: 'black' }}>
                                                                                                <ReactQuill
                                                                                                    value={
                                                                                                        fields
                                                                                                            .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                            .find((f) => f.id === selectedFieldId)?.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers ...'
                                                                                                    }
                                                                                                    onChange={(content) =>
                                                                                                        setFields((prevFields) =>
                                                                                                            prevFields.map((f) => {
                                                                                                                if (f.type === "split-group") {
                                                                                                                    return {
                                                                                                                        ...f,
                                                                                                                        children: f.children.map((child) =>
                                                                                                                            child.id === selectedFieldId ? { ...child, value: content } : child
                                                                                                                        ),
                                                                                                                    };
                                                                                                                }
                                                                                                                return f.id === selectedFieldId ? { ...f, value: content } : f;
                                                                                                            })
                                                                                                        )
                                                                                                    }
                                                                                                    modules={{ toolbar: toolbarOptions }}
                                                                                                    style={{ width: '100%', minHeight: '150px', padding: '10px', fontSize: '16px', border: '1px solid #ccc' }}
                                                                                                />
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="form-builder-chaneging-wrap file" >
                                                                                                <label htmlFor="fileInput">Upload Image</label>
                                                                                                {!fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.value ? (
                                                                                                    <div
                                                                                                        className="upload-area"
                                                                                                        onClick={() => document.getElementById("fileInput").click()}
                                                                                                        onDragOver={(e) => e.preventDefault()}
                                                                                                        onDrop={(e) => {
                                                                                                            e.preventDefault();
                                                                                                            const file = e.dataTransfer.files[0];
                                                                                                            if (file) {
                                                                                                                const reader = new FileReader();
                                                                                                                reader.onload = () => {
                                                                                                                    setFields((prevFields) =>
                                                                                                                        prevFields.map((f) => {
                                                                                                                            if (f.type === "split-group") {
                                                                                                                                return {
                                                                                                                                    ...f,
                                                                                                                                    children: f.children.map((child) =>
                                                                                                                                        child.id === selectedFieldId ? { ...child, value: reader.result } : child
                                                                                                                                    ),
                                                                                                                                };
                                                                                                                            }
                                                                                                                            return f.id === selectedFieldId ? { ...f, value: reader.result } : f;
                                                                                                                        })
                                                                                                                    );
                                                                                                                };
                                                                                                                reader.readAsDataURL(file);
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        <img src={file} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                                                                                        <p>Drag & Drop to Upload Image</p>
                                                                                                        <p>OR</p>
                                                                                                        <span className="upload-btn">Browse Image</span>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div style={{ marginTop: "10px", position: 'relative' }}>
                                                                                                        <img
                                                                                                            src={fields
                                                                                                                .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                                .find((f) => f.id === selectedFieldId)?.value}
                                                                                                            alt="Uploaded Preview"
                                                                                                            style={{ display: 'flex', width: '100%', maxWidth: "100%", height: "auto", border: "1px solid #ccc", padding: "5px" }}
                                                                                                        />
                                                                                                        <div style={{ marginTop: "10px" }}>
                                                                                                            <button
                                                                                                                className="update-image img"
                                                                                                                onClick={() => document.getElementById("fileInput").click()}
                                                                                                                style={{ marginRight: "10px", cursor: 'pointer' }}
                                                                                                            >
                                                                                                                Update Image
                                                                                                            </button>
                                                                                                            <span
                                                                                                                className="update-image rmove-img rm-btn split-group"
                                                                                                                onClick={() => {
                                                                                                                    setFields((prevFields) =>
                                                                                                                        prevFields.map((f) => {
                                                                                                                            if (f.type === "split-group") {
                                                                                                                                return {
                                                                                                                                    ...f,
                                                                                                                                    children: f.children.map((child) =>
                                                                                                                                        child.id === selectedFieldId ? { ...child, value: "" } : child
                                                                                                                                    ),
                                                                                                                                };
                                                                                                                            }
                                                                                                                            return f.id === selectedFieldId ? { ...f, value: "" } : f;
                                                                                                                        })
                                                                                                                    );
                                                                                                                }}
                                                                                                            >
                                                                                                                <img src={remove} alt="Remove" />
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                                <input
                                                                                                    type="file"
                                                                                                    accept="image/*"
                                                                                                    id="fileInput"
                                                                                                    onChange={(e) => {
                                                                                                        const file = e.target.files[0];
                                                                                                        if (file) {
                                                                                                            const reader = new FileReader();
                                                                                                            reader.onload = () => {
                                                                                                                setFields((prevFields) =>
                                                                                                                    prevFields.map((f) => {
                                                                                                                        if (f.type === "split-group") {
                                                                                                                            return {
                                                                                                                                ...f,
                                                                                                                                children: f.children.map((child) =>
                                                                                                                                    child.id === selectedFieldId ? { ...child, value: reader.result } : child
                                                                                                                                ),
                                                                                                                            };
                                                                                                                        }
                                                                                                                        return f.id === selectedFieldId ? { ...f, value: reader.result } : f;
                                                                                                                    })
                                                                                                                );
                                                                                                            };
                                                                                                            reader.readAsDataURL(file);
                                                                                                        }
                                                                                                    }}
                                                                                                    style={{ display: "none" }}
                                                                                                />
                                                                                            </div>

                                                                                        )}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.splitColor || '#000'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, splitColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.splitColor || '#000'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, splitColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font-Size</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.splittextSize}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, splittextSize: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        onChange={(e) => {
                                                                                            const newValue = parseInt(e.target.value, 10) || 0;
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) => {
                                                                                                    if (f.type === "split-group") {
                                                                                                        return {
                                                                                                            ...f,
                                                                                                            children: f.children.map((child) =>
                                                                                                                child.id === selectedFieldId
                                                                                                                    ? { ...child, splitletter: newValue }
                                                                                                                    : child
                                                                                                            ),
                                                                                                        };
                                                                                                    }
                                                                                                    return f.id === selectedFieldId
                                                                                                        ? { ...f, splitletter: newValue }
                                                                                                        : f;
                                                                                                })
                                                                                            );
                                                                                        }}
                                                                                        value={
                                                                                            fields
                                                                                                .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                .find((f) => f.id === selectedFieldId)?.splitletter || 0
                                                                                        }
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>

                                                                                {/* <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Line Height</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.splitlineheight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, splitlineheight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div> */}
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>Font-Family</label>
                                                                                    <select
                                                                                        value={field.splitfamily}
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, splitfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>



                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Style</label>
                                                                                    <select
                                                                                        id="splittext"
                                                                                        onChange={(e) =>
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) => {
                                                                                                    if (f.type === "split-group") {
                                                                                                        return {
                                                                                                            ...f,
                                                                                                            children: f.children.map((child) =>
                                                                                                                child.id === selectedFieldId
                                                                                                                    ? { ...child, splittext: e.target.value }
                                                                                                                    : child
                                                                                                            ),
                                                                                                        };
                                                                                                    }
                                                                                                    return f.id === selectedFieldId
                                                                                                        ? { ...f, splittext: e.target.value }
                                                                                                        : f;
                                                                                                })
                                                                                            )
                                                                                        }
                                                                                        value={
                                                                                            fields.flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                .find((f) => f.id === selectedFieldId)?.splittext || "left"
                                                                                        }
                                                                                    >
                                                                                        <option value="left">Top</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="end">Bottom</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.splitbg || '#FFFFFF'}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, splitbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.splitbg || '#FFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, splitbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Padding</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        onChange={(e) => {
                                                                                            const newValue = parseInt(e.target.value, 10) || 0;
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) => {
                                                                                                    if (f.type === "split-group") {
                                                                                                        return {
                                                                                                            ...f,
                                                                                                            children: f.children.map((child) =>
                                                                                                                child.id === selectedFieldId
                                                                                                                    ? { ...child, splitPadding: newValue }
                                                                                                                    : child
                                                                                                            ),
                                                                                                        };
                                                                                                    }
                                                                                                    return f.id === selectedFieldId
                                                                                                        ? { ...f, splitPadding: newValue }
                                                                                                        : f;
                                                                                                })
                                                                                            );
                                                                                        }}
                                                                                        value={
                                                                                            fields
                                                                                                .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                .find((f) => f.id === selectedFieldId)?.splitPadding || 0
                                                                                        }
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        onChange={(e) => {
                                                                                            const newValue = e.target.value;
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) => {
                                                                                                    if (f.type === "split-group") {
                                                                                                        return {
                                                                                                            ...f,
                                                                                                            children: f.children.map((child) =>
                                                                                                                child.id === selectedFieldId
                                                                                                                    ? { ...child, splitTextAlin: newValue }
                                                                                                                    : child
                                                                                                            ),
                                                                                                        };
                                                                                                    }
                                                                                                    return f.id === selectedFieldId
                                                                                                        ? { ...f, splitTextAlin: newValue }
                                                                                                        : f;
                                                                                                })
                                                                                            );
                                                                                        }}
                                                                                        value={
                                                                                            fields
                                                                                                .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                .find((f) => f.id === selectedFieldId)?.splitTextAlin || ""
                                                                                        }
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>

                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='product-detalis-all btn-split'>
                                                                                    <h3>Add Button</h3>
                                                                                    <label className="custom-checkbox">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={field.showbtnsplit || false}
                                                                                            onChange={() => togglesplit(field.id)}
                                                                                        />
                                                                                        Button
                                                                                    </label>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Button Label</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            onChange={(e) => {
                                                                                                const newValue = e.target.value;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitbtn: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitbtn: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitbtn
                                                                                            }

                                                                                            placeholder="Letter Spacing"
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Button Url</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={field.splitbtnurl}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, splitbtnurl: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-builder-chaneging-wrap number">
                                                                                        <label>  Font-Family</label>
                                                                                        <select
                                                                                            value={field.splitbtnfamily || '"Poppins", sans-serif'}
                                                                                            onChange={(e) => {
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) =>
                                                                                                        f.id === field.id ? { ...f, splitbtnfamily: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="">Select Font-Family</option>
                                                                                            <option value="Arial, sans-serif">Arial</option>
                                                                                            <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                            <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                            <option value="'Georgia', serif">Georgia</option>
                                                                                            <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                            <option value="'Roboto', sans-serif">Roboto</option>
                                                                                            <option value="'Raleway', sans-serif">Raleway</option>
                                                                                            <option value="'Gotham', sans-serif">Gotham</option>
                                                                                            <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                            <option value="'Lato', sans-serif">Lato</option>
                                                                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                            <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                            <option value="'Poppins', sans-serif">Poppins</option>
                                                                                            <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                            <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                            <option value="'Barlow', sans-serif">Barlow</option>
                                                                                            <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                            <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                            <option value="'Inter', sans-serif">Inter</option>


                                                                                        </select>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors add-text-line'>
                                                                                            <label> Button Background color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.splitbtnbg || '#FFFFFF'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, splitbtnbg: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.splitbtnbg || '#FFFFFF'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, splitbtnbg: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Font-Size</label>
                                                                                        <input
                                                                                            type="number"

                                                                                            onChange={(e) => {
                                                                                                const newValue = parseInt(e.target.value, 10) || 0;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitbtnfont: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitbtnfont: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitbtnfont || 0
                                                                                            }
                                                                                            min='0'
                                                                                        />
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label> Button text color </label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.splitbtncolor || '#000'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, splitbtncolor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.splitbtncolor || '#000'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, splitbtncolor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Font-Weight</label>
                                                                                        <select
                                                                                            value={field.splitbtnWeight}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, splitbtnWeight: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="100">Thin</option>
                                                                                            <option value="500">Medium</option>
                                                                                            <option value="600">Semi Bold</option>
                                                                                            <option value="700">Bold</option>
                                                                                            <option value="800">Extra Bold</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Height</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            onChange={(e) => {
                                                                                                const newValue = parseInt(e.target.value, 10) || 0;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitbtnheight: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitbtnheight: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitbtnheight || 0
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Width</label>
                                                                                        <input
                                                                                            type="number"

                                                                                            onChange={(e) => {
                                                                                                const newValue = parseInt(e.target.value, 10) || 0;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitbtnwidth: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitbtnwidth: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitbtnwidth || 0
                                                                                            }
                                                                                            min='0'
                                                                                        />
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                                        <label>Border-Radius</label>
                                                                                        <input
                                                                                            type="number"

                                                                                            onChange={(e) => {
                                                                                                const newValue = parseInt(e.target.value, 10) || 0;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitbtnradious: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitbtnradious: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitbtnradious || 0
                                                                                            }
                                                                                            min='0'
                                                                                        />
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                                        <div className='checkbox-option bg-colors'>
                                                                                            <label>Border Color</label>
                                                                                            <div className="color-picker-container color_wraped">

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="color-code"
                                                                                                    value={field.splitBorderColor || '#000'}
                                                                                                    readOnly
                                                                                                    onClick={(e) => {
                                                                                                        navigator.clipboard.writeText(e.target.value);
                                                                                                    }}
                                                                                                    onPaste={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const pastedText = e.clipboardData.getData('text').trim();
                                                                                                        if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                            setFields(prevFields =>
                                                                                                                prevFields.map(f =>
                                                                                                                    f.id === field.id ? { ...f, splitBorderColor: pastedText } : f
                                                                                                                )
                                                                                                            );
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                                <input
                                                                                                    type="color"
                                                                                                    value={field.splitBorderColor || '#000'}
                                                                                                    onChange={(e) => {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, splitBorderColor: e.target.value } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='form-builder-chaneging-wrap number' >
                                                                                        <label>Border Width (px)</label>
                                                                                        <input
                                                                                            type="number"

                                                                                            onChange={(e) => {
                                                                                                const newValue = parseInt(e.target.value, 10) || 0;
                                                                                                setFields((prevFields) =>
                                                                                                    prevFields.map((f) => {
                                                                                                        if (f.type === "split-group") {
                                                                                                            return {
                                                                                                                ...f,
                                                                                                                children: f.children.map((child) =>
                                                                                                                    child.id === selectedFieldId
                                                                                                                        ? { ...child, splitBorderWidth: newValue }
                                                                                                                        : child
                                                                                                                ),
                                                                                                            };
                                                                                                        }
                                                                                                        return f.id === selectedFieldId
                                                                                                            ? { ...f, splitBorderWidth: newValue }
                                                                                                            : f;
                                                                                                    })
                                                                                                );
                                                                                            }}
                                                                                            value={
                                                                                                fields
                                                                                                    .flatMap((f) => (f.type === "split-group" ? f.children : [f]))
                                                                                                    .find((f) => f.id === selectedFieldId)?.splitBorderWidth || 0
                                                                                            }
                                                                                            min='0'
                                                                                        />
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap '>
                                                                                        <label>Border Style</label>
                                                                                        <select
                                                                                            value={field.splitBorderStyle || 'solid'}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, splitBorderStyle: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <option value="solid">Solid</option>
                                                                                            <option value="dashed">Dashed</option>
                                                                                            <option value="dotted">Dotted</option>
                                                                                            <option value="double">double</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === "video") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap file">
                                                                            <div className='form-builder-chaneging-wrap '>
                                                                                <label>Video Url</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={field.value}
                                                                                    onChange={(e) => handleVideoChange(e, field.id)}
                                                                                    placeholder="Enter video URL"
                                                                                />
                                                                                <iframe
                                                                                    src={getVideoEmbedUrl(field.value)}
                                                                                    title="Video Preview"
                                                                                    frameBorder="0"
                                                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                                    allowFullScreen
                                                                                ></iframe>
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Padding</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.videoPadding}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, videoPadding: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    min='0'
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label>Border Color</label>
                                                                                <input
                                                                                    type="color"
                                                                                    value={field.videoBorderColor}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, videoBorderColor: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                            <div className='form-builder-chaneging-wrap number' >
                                                                                <label>Border Width (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.videoBorderWidth}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, videoBorderWidth: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                    min='0'
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap'>
                                                                                <label>Border Style</label>
                                                                                <select
                                                                                    value={field.videoBorderStyle}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, videoBorderStyle: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <option value="solid">Solid</option>
                                                                                    <option value="dashed">Dashed</option>
                                                                                    <option value="dotted">Dotted</option>
                                                                                    <option value="double">double</option>
                                                                                </select>
                                                                            </div>

                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === "spacer") {
                                                                    return (
                                                                        <div key={field.id} className="form-builder-chaneging-wrap number">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label htmlFor="spacer-height-input">Spacer Height (px):</label>
                                                                                    <input
                                                                                        id="spacer-height-input"
                                                                                        type="number"
                                                                                        value={field.spacerHeight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, spacerHeight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min="0"
                                                                                    />
                                                                                    <p style={{ color: '#A8A8A8' }} className='spacer-height-text'>Current Spacer Height: {field.spacerHeight}px</p>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>  Background color</label>
                                                                                        <div className="color-picker-container color_wraped">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.spacerbg}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, spacerbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.spacerbg || '#FFFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, spacerbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                if (field.id === selectedFieldId && field.type === 'button') {
                                                                    return (
                                                                        <div key={field.id}>
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Button Label</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={field.buttonLabel}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonLabel: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>
                                                                                        Button Url
                                                                                        <input
                                                                                            type="text"
                                                                                            value={field.buttonUrll}
                                                                                            onChange={(e) => {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, buttonUrll: e.target.value } : f
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Button Position </label>
                                                                                    <select
                                                                                        value={field.buttonaline}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonaline: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font Size (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonFontSize}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonFontSize: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Text-color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.buttonTextColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, buttonTextColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.buttonTextColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, buttonTextColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Letter Spacing</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonLetterSpacing}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, buttonLetterSpacing: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder="Letter Spacing"
                                                                                    />
                                                                                </div>
                                                                                <div className="form-builder-chaneging-wrap number">
                                                                                    <label>  Font-Family</label>
                                                                                    <select
                                                                                        value={field.buttonfamily || '"Poppins", sans-serif' }
                                                                                        onChange={(e) => {
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === field.id ? { ...f, buttonfamily: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select Font-Family</option>
                                                                                        <option value="Arial, sans-serif">Arial</option>
                                                                                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                                                                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                                                                        <option value="'Georgia', serif">Georgia</option>
                                                                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                                                                        <option value="'Roboto', sans-serif">Roboto</option>
                                                                                        <option value="'Raleway', sans-serif">Raleway</option>
                                                                                        <option value="'Gotham', sans-serif">Gotham</option>
                                                                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                                                                        <option value="'Lato', sans-serif">Lato</option>
                                                                                        <option value="'Helvetica', sans-serif">Helvetica</option>
                                                                                        <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                                                        <option value="'Poppins', sans-serif">Poppins</option>
                                                                                        <option value="'Quicksand', sans-serif">Quicksand</option>
                                                                                        <option value="'Work Sans', sans-serif">Work Sans</option>
                                                                                        <option value="'Barlow', sans-serif">Barlow</option>
                                                                                        <option value="'Varela Round', sans-serif">Varela Round</option>
                                                                                        <option value="'Josefin Sans', sans-serif">Josefin Sans</option>
                                                                                        <option value="'Inter', sans-serif">Inter</option>

                                                                                    </select>
                                                                                </div>

                                                                            </div>

                                                                            <div className='setting_bg_email_templetes'>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Font-Weight</label>
                                                                                    <select
                                                                                        value={field.buttonweight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonweight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="100">Thin</option>
                                                                                        <option value="500">Medium</option>
                                                                                        <option value="600">Semi Bold</option>
                                                                                        <option value="700">Bold</option>
                                                                                        <option value="800">Extra Bold</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonHeight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonHeight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Button Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='setting_bg_email_templetes_white'>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label>  Background color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.buttonbgColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, buttonbgColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.buttonbgColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, buttonbgColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors add-text-line'>
                                                                                        <label> Button Background Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.buttonColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, buttonColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.buttonColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, buttonColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label> Border-Radius (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonradious}
                                                                                        onChange={(e) => {
                                                                                            const inputValue = e.target.value;
                                                                                            const newWidth = parseInt(inputValue, 10);

                                                                                            if (inputValue === "" || (newWidth >= 0 && newWidth <= 100)) {
                                                                                                setFields(prevFields =>
                                                                                                    prevFields.map(f =>
                                                                                                        f.id === field.id ? { ...f, buttonradious: inputValue } : f
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        min="0"
                                                                                        max="100"
                                                                                        placeholder=" Border-Radius"
                                                                                    />
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Border Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.buttonBorderColor}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, buttonBorderColor: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.buttonBorderColor}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, buttonBorderColor: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Border Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.buttonBorderWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonBorderWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Border Style</label>
                                                                                    <select
                                                                                        value={field.buttonBorderStyle}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, buttonBorderStyle: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="solid">Solid</option>
                                                                                        <option value="dashed">Dashed</option>
                                                                                        <option value="dotted">Dotted</option>
                                                                                        <option value="double">double</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                                if (field.type === "socalicon" && field.id === selectedFieldId) {
                                                                    return (
                                                                        <div key={field.id} className="description-field">
                                                                            <div className='setting_bg_email_templetes'>
                                                                                <div className="form-builder-chaneging-wrap h2">
                                                                                    <h2>Edit Social Icons</h2>

                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>
                                                                                            <div className='custom-checkbox socalicons'>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    checked={!selectedIcons.facebook.isHidden }
                                                                                                    onChange={() => handleToggleIcon('facebook')}
                                                                                                />
                                                                                                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                                                                                                Facebook URL
                                                                                            </div>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={selectedIcons.facebook.url}
                                                                                                onChange={(e) => handleIconUrlChange(e, 'facebook')}
                                                                                                style={{ display: selectedIcons.facebook.isHidden ? 'none' : 'block' }}
                                                                                            />
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>
                                                                                            <div className='custom-checkbox socalicons'>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    checked={!selectedIcons.twitter.isHidden}
                                                                                                    onChange={() => handleToggleIcon('twitter')}
                                                                                                />
                                                                                                <i class="fa fa-twitter" aria-hidden="true"></i>
                                                                                                Twitter URL
                                                                                            </div>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={selectedIcons.twitter.url}
                                                                                                onChange={(e) => handleIconUrlChange(e, 'twitter')}
                                                                                                style={{ display: selectedIcons.twitter.isHidden ? 'none' : 'block' }}
                                                                                            />
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap'>
                                                                                        <label>
                                                                                            <div className='custom-checkbox socalicons'>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    checked={!selectedIcons.instagram.isHidden}
                                                                                                    onChange={() => handleToggleIcon('instagram')}
                                                                                                />
                                                                                                <i class="fa fa-instagram" aria-hidden="true"></i>
                                                                                                Instagram URL
                                                                                            </div>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={selectedIcons.instagram.url}
                                                                                                onChange={(e) => handleIconUrlChange(e, 'instagram')}
                                                                                                style={{ display: selectedIcons.instagram.isHidden ? 'none' : 'block' }}
                                                                                            />
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='form-builder-chaneging-wrap'>

                                                                                        {customIcons.length > 0 && (
                                                                                            <div style={{ marginBottom: '20px' }}>
                                                                                                {customIcons.map((icon, index) => (
                                                                                                    <div key={index} className='form-builder-chaneging-wrap social-icons-img'>
                                                                                                        <div className='form-builder-chaneging-wrap socal'>
                                                                                                            <div className='custom-checkbox'>
                                                                                                                <input
                                                                                                                    type="checkbox"
                                                                                                                    checked={!icon.isHidden}
                                                                                                                    onChange={() => toggleCustomIconVisibility(index)}
                                                                                                                />

                                                                                                            </div>
                                                                                                            <div className='img-socal-costom'>
                                                                                                                <img src={icon.src} alt={icon.name}
                                                                                                                    style={{ width: "100%" }}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <input
                                                                                                            type="text"
                                                                                                            value={icon.url}
                                                                                                            onChange={(e) => handleCustomIconUrlChange(e, index)}
                                                                                                            placeholder="Custom URL"
                                                                                                        />
                                                                                                        <div style={{ marginTop: '10px' }}>
                                                                                                            <button className='rm-btn'
                                                                                                                onClick={() => handleCustomIconRemove(index)}
                                                                                                            >
                                                                                                                <img src={remove} alt="" />
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                        <button className='add-forms icons' style={{ cursor: 'pointer' }} onClick={() => setShowFileUpload((prev) => !prev)}> Add Icon </button>
                                                                                        {showFileUpload && !uploadedImage && (
                                                                                            <div className='form-builder-chaneging-wrap file'>
                                                                                                <label>Uplaod Image</label>
                                                                                                <div
                                                                                                    className="upload-area"
                                                                                                    onClick={() => document.getElementById('fileInput').click()}
                                                                                                    onDragOver={(e) => e.preventDefault()}
                                                                                                    onDrop={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        const droppedFile = e.dataTransfer.files[0];
                                                                                                        if (droppedFile) {
                                                                                                            handleCustomIconUpload({ target: { files: [droppedFile] } }, field.id);
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <img src={file} alt="" />
                                                                                                    <p>Drag & Drop to Upload image </p>
                                                                                                    <p>OR </p>
                                                                                                    <span className='upload-btn'>Browse image </span>
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        accept="image/*"
                                                                                                        onChange={handleCustomIconUpload}
                                                                                                        multiple
                                                                                                        style={{ display: 'none' }}
                                                                                                        id="fileInput"
                                                                                                    />
                                                                                                </div>

                                                                                            </div>
                                                                                        )}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='setting_bg_email_templetes_white'>
                                                                                <div className='form-builder-chaneging-wrap color'>
                                                                                    <div className='checkbox-option bg-colors'>
                                                                                        <label> Background Color</label>
                                                                                        <div className="color-picker-container">

                                                                                            <input
                                                                                                type="text"
                                                                                                className="color-code"
                                                                                                value={field.socalIconbg}
                                                                                                readOnly
                                                                                                onClick={(e) => {
                                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                                }}
                                                                                                onPaste={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    const pastedText = e.clipboardData.getData('text').trim();
                                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                        setFields(prevFields =>
                                                                                                            prevFields.map(f =>
                                                                                                                f.id === field.id ? { ...f, socalIconbg: pastedText } : f
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <input
                                                                                                type="color"
                                                                                                value={field.socalIconbg || '#FFFFFF'}
                                                                                                onChange={(e) => {
                                                                                                    setFields(prevFields =>
                                                                                                        prevFields.map(f =>
                                                                                                            f.id === field.id ? { ...f, socalIconbg: e.target.value } : f
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Social Icon Gap (px) </label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.socalIcongap}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, socalIcongap: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Social Icon Height (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.socalIconHeight}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, socalIconHeight: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number'>
                                                                                    <label>Social Icon Width (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.socalIconWidth}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, socalIconWidth: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap'>
                                                                                    <label>Text Align </label>
                                                                                    <select
                                                                                        value={field.socaliconTextAlign}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, socaliconTextAlign: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Select text align</option>
                                                                                        <option value="left">Left</option>
                                                                                        <option value="center">Center</option>
                                                                                        <option value="right">Right</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className='form-builder-chaneging-wrap number' >
                                                                                    <label>Padding (px)</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={field.socalIconPadding}
                                                                                        onChange={(e) => {
                                                                                            setFields(prevFields =>
                                                                                                prevFields.map(f =>
                                                                                                    f.id === field.id ? { ...f, socalIconPadding: e.target.value } : f
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                        min='0'
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                return null;
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>)}
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='form-builder-wrap-popup-inputs'>
                <div className='save-email-templates-add'>
                    {saveEmail && (<div className="popup ">
                        <div className="popup-content save">
                            <div className="save-email-template-popup">
                                <div className='cancle-save-email' onClick={() => setSaveEmail(false)}>
                                    <img src={cancleimg} alt="" />
                                </div>
                                <img src={savemail} alt="" />
                                <h2>Success</h2>
                                <p>Your Email has been save successfully!</p>
                                <p className="save-btn" onClick={handleContinue}>Continue</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='save-email-templates-add'>
                    {cancelEmail && (<div className="popup ">
                        <div className="popup-content save">
                            <div className="save-email-template-popup">
                                <div className='cancle-save-email' onClick={() => setCancelEmail(false)}>
                                    <img src={cancleimg} alt="" />
                                </div>
                                <img src={canclemail} alt="" />
                                <h2>Warning</h2>
                                <p>Are you sure you want to cancel this email?</p>
                                <p className="save-btn cancel" onClick={handleContinue}>Cancel</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="form-builder-prodcut-all">
                    {isPopupOpen && (
                        <div className="popup ">
                            <div className="popup-content product">
                                <div className='form-builder-search-bar-btns'>
                                    <div className="form-builder-search-bar search-bar">
                                        <input id="search" type="search" placeholder="Search" value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} />
                                        <div className="form_build_icon_search">
                                            <img src={search12} alt="" />
                                        </div>
                                    </div>
                                    <div className='form_build_product_btn'>
                                        <div className="procduct-canclebtn save" onClick={selectedProducts.length > 0 ? handleSaveClick : (e) => e.preventDefault()}>
                                            <span
                                                className={selectedProducts.length === 0 ? "disabled" : ""}
                                            >
                                                Save
                                            </span>
                                        </div>

                                        <span className="procduct-canclebtn  " onClick={handleClosePopup}>
                                            <span> Cancel</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="product-list">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((product) => (
                                            <div key={product.id} className="product-item">
                                                <div className='product-item-flex'>
                                                    <div className='custom-checkbox'>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedProducts.some((p) => p.id === product.id)}
                                                            onChange={(e) => handleProductClick(product, e.target.checked)}
                                                        />
                                                    </div>

                                                    <div className='product-itm-all-inline'>
                                                        {product.image ? (
                                                            <div className="images-galley">
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.title}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <p>No image available</p>
                                                        )}
                                                        <div className='product-itm-all-prices'>
                                                            <h3>{product.title}</h3>
                                                            <p className='price-product-all'>Price: ${product.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products available.</p>
                                    )}
                                </div>

                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <div className='show-all enteries'>
                                            Showing data {currentProducts.length} of {filteredProducts.length} products
                                        </div>

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
                                                {generatePageNumbers().map((page, index) => (
                                                    <li key={index} aria-current={currentPage === page ? 'page' : undefined}>
                                                        {page === '...' ? (
                                                            <span>...</span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => handlePageChange(page)}
                                                                className={`${currentPage === page ? 'active' : 'inactive'}`}
                                                            >
                                                                {page}
                                                            </button>
                                                        )}
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
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {disconnectForm && (
                    <div className="popup">
                        <div className="popup-content templete-popup-disconnect">
                            <div className='form-builder-email-templete-popup'>
                                <div className='form-builder-email-email-cancle-btn' onClick={()=>setDisconnectForm(false)}><img src={cancle1} alt="" /></div>
                                <p>Disconnect Email Template?</p>
                                <span>Are you sure you want to remove this email template from the form?</span>
                                <div className='form-builder-email-templete-popup-buttons'>
                                    <p className='form-builder-email-btn' onClick={handleConfirmUnlink}>Yes</p>
                                    <p className='form-builder-email-btn no' onClick={()=>setDisconnectForm(false)}>No</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showHeadingPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className="options">
                                <button style={{ padding: '10px', color: 'white', background: '#FD633E', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('heading')}>Heading</button>
                                <button style={{ padding: '10px', color: 'white', background: '#F27F01', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('image')}>Image</button>
                                <button style={{ padding: '10px', color: 'white', background: '#27A196', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('content')}>Content</button>
                                <button style={{ padding: '10px', color: 'white', background: '#D9A425', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('url')}>Button URL</button>
                            </div>
                            {selectedOption === 'heading' && (
                                <div className="heading-section">
                                    <label>
                                        <input
                                            type="text"
                                            value={headingText}
                                            onChange={(e) => setHeadingText(e.target.value)}
                                            placeholder="Heading Text"
                                        />
                                    </label>
                                    <label>
                                        <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
                                            <option value="h1">H1</option>
                                            <option value="h2">H2</option>
                                            <option value="h3">H3</option>
                                            <option value="h4">H4</option>
                                            <option value="h5">H5</option>
                                            <option value="h6">H6</option>
                                        </select>
                                    </label>
                                    <label>
                                        <input
                                            type="text"
                                            value={headingFontSize}
                                            onChange={(e) => setHeadingFontSize(e.target.value)}
                                            placeholder="Font Size"
                                        />
                                    </label>
                                </div>
                            )}
                            {selectedOption === 'content' && (
                                <div className="content-section">
                                    <div className='admin-input email'>
                                        <div className='admin-label'>
                                            <label htmlFor="content">Content</label>
                                        </div>
                                        {ReactQuill ? (
                                            <ReactQuill
                                                value={editorValue}
                                                onChange={setEditorValue}
                                                modules={{ toolbar: toolbarOptions }}
                                            />
                                        ) : (
                                            <p>Loading editor...</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {selectedOption === 'url' && (
                                <div className="form-builder-changing-wrap url url-section">
                                    <button style={{
                                        backgroundColor: '#9474ff',
                                        border: '1px solid black',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        height: '40px',
                                        width: '100px',
                                        fontSize: '16px'

                                    }}>Vist Now</button>
                                    <label>
                                        URL:
                                        <input
                                            type="url"
                                            value={headingUrl}
                                            onChange={(e) => setHeadingUrl(e.target.value)}
                                            placeholder="Enter URL (optional)"
                                        />
                                    </label>
                                </div>
                            )}

                            {selectedOption === 'image' && (
                                <div className="form-builder-changing-wrap file section">
                                    <label> Image:
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setImageUrl(reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                                    </label>
                                </div>
                            )}

                            <button onClick={handleAddHeading}>Add Heading</button>
                            <button className='heading_cancle' onClick={() => setShowHeadingPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
                {showDescriptionPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <label>
                                Description:
                                <textarea
                                    value={descriptionText}
                                    onChange={(e) => setDescriptionText(e.target.value)}
                                    placeholder="Description"
                                />
                            </label>
                            <button onClick={handleAddDescription}>Add Description</button>
                            <button className='heading_cancle' onClick={() => setShowDescriptionPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
                {isPopupVisibleed && (
                    <div className="popup">
                        <div className="popup-content">
                            <h4>Edit Rich Text</h4>
                            <div className="content-section">
                                <div className="admin-input email">
                                    <div className="admin-label">
                                        <label htmlFor="content">Content</label>
                                    </div>
                                    <ReactQuill
                                        value={editorValueed}
                                        onChange={handleEditorChangeee}
                                        modules={{ toolbar: toolbarOptions }}
                                    />
                                </div>
                            </div>

                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setPopupVisibleed(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
        </div >
    );
};

export default EmailTemplateCreate;