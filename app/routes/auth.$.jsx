


import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};




// // // import React, { useState, useEffect, useRef } from 'react';
// // // import Sortable from 'sortablejs';
// // // import axios from 'axios';
// // // import { useLocation } from 'react-router-dom';
// // // import image from '../images/image-.png';
// // // import divider2 from '../images/divider.png';
// // // import btn from '../images/btn.png';
// // // import emailtemp from '../images/emailtemp.png';
// // // import phonem from '../images/phonem.png';
// // // import desk from '../images/desk.png';
// // // import socail from '../images/socail.png';
// // // import htmlicon from '../images/htmlicon.png';
// // // import maximizesize from '../images/maximize-size.png';
// // // import deletep from '../images/deletep.png';
// // // import delete1 from '../images/delete.png';
// // // import facebook from '../images/facebook.png';
// // // import instagram from '../images/instagram.png';
// // // import twitter from '../images/twitter.png';
// // // import videoplay from '../images/videoplay.png';
// // // import left from '../images/left.png';
// // // import right from '../images/right.png';
// // // import hdbg from '../images/hdbg.jpeg';
// // // import product from '../images/product.png';
// // // import spacer from '../images/spacer.png';
// // // import banner from '../images/banner.png';
// // // import imghd from '../images/imghd.png';
// // // import imghd1 from '../images/imghd1.png';
// // // import itext from '../images/itext.png';
// // // import multimedia from '../images/multimedia.png';
// // // import rich from '../images/rich.png';
// // // import productcancle from '../images/productcancle.png';
// // // import { format } from 'date-fns';

// // // import 'react-quill/dist/quill.snow.css';

// // // import '../index.css';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useLoaderData, Link } from "@remix-run/react";
// // // import { authenticate, apiVersion } from "../shopify.server";

// // // const toolbarOptions = [
// // //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
// // //     ['bold', 'italic', 'underline'],
// // //     ['link', 'image'],
// // //     [{ list: 'ordered' }, { list: 'bullet' }],
// // //     [{ script: 'sub' }, { script: 'super' }],
// // //     [{ indent: '-1' }, { indent: '+1' }],
// // //     [{ direction: 'rtl' }],
// // //     [{ size: ['small', 'medium', 'large', 'huge'] }],
// // //     [{ color: [] }, { background: [] }],
// // //     [{ font: [] }],
// // //     [{ align: [] }],
// // //     ['clean'],
// // // ];

// // // const generateUniqueId = (length = 22) => {
// // //     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// // //     let uniqueId = '';
// // //     for (let i = 0; i < length; i++) {
// // //         const randomIndex = Math.floor(Math.random() * charset.length);
// // //         uniqueId += charset[randomIndex];
// // //     }
// // //     return uniqueId;
// // // };

// // // export const loader = async ({ request }) => {
// // //     try {
// // //         const { session } = await authenticate.admin(request);
// // //         const { shop, accessToken } = session;

// // //         const response = await fetch(
// // //             `https://${shop}/admin/api/${apiVersion}/products.json`,
// // //             {
// // //                 method: "GET",
// // //                 headers: {
// // //                     "Content-Type": "application/json",
// // //                     "X-Shopify-Access-Token": accessToken,
// // //                 }
// // //             }
// // //         );

// // //         if (!response.ok) {
// // //             throw new Error(`Failed to fetch products: ${response.statusText}`);
// // //         }

// // //         const responseData = await response.json();
// // //         const products = responseData?.products || [];

// // //         const productsWithData = products.map(product => {
// // //             const { variants } = product;
// // //             const uniqueColors = Array.from(new Set(variants.map(variant => variant.option1))).join(' | ');
// // //             const uniquePrices = Array.from(new Set(variants.map(variant => variant.price))).join(' | ');
// // //             const uniqueSizes = Array.from(new Set(variants.map(variant => variant.option2))).join(' | ');

// // //             return {
// // //                 ...product,
// // //                 color: uniqueColors,
// // //                 price: uniquePrices,
// // //                 size: uniqueSizes
// // //             };
// // //         });

// // //         return { products: productsWithData, shop, apiVersion };
// // //     } catch (err) {
// // //         console.error("Error fetching products:", err.message);
// // //         return { products: [] };
// // //     }
// // // };

// // // const EmailTemplateCreate = () => {

// // //     const navigate = useNavigate();
// // //     const [fields, setFields] = useState([]);
// // //     const [emailTemplateId, setEmailTemplateId] = useState(null);
// // //     const formBuilderRef = useRef(null);
// // //     const [formTitle, setFormTitle] = useState('Email-Template');
// // //     const [existingTitles, setExistingTitles] = useState([]);
// // //     const [showImagePopup, setShowImagePopup] = useState(false);
// // //     const [showHeadingPopup, setShowHeadingPopup] = useState(false);
// // //     const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
// // //     const [headingText, setHeadingText] = useState('');
// // //     const [headingLevel, setHeadingLevel] = useState('h1');
// // //     const [selectedOption, setSelectedOption] = useState('heading');
// // //     const [imageUrl, setImageUrl] = useState(null);
// // //     const [headingFontSize, setHeadingFontSize] = useState('40');
// // //     const [descriptionText, setDescriptionText] = useState('');
// // //     const [backgroundColor, setBackgroundColor] = useState('#ffffff');
// // //     const [borderRadious, setBorderRadious] = useState(5);
// // //     const [templatePadding, setTemplatePadding] = useState('20');
// // //     const [backgroundImage, setBackgroundImage] = useState(null);
// // //     const [textAlign, setTextAlign] = useState('left');
// // //     const [imageFieldId, setImageFieldId] = useState(null);
// // //     const [showField, setShowField] = useState(true);
// // //     const [showFields, setShowFields] = useState(true);
// // //     const [showSocialIconPopup, setShowSocialIconPopup] = useState(false);
// // //     const [selectedFieldId, setSelectedFieldId] = useState(null);
// // //     const [emailFieldPopup, setEmailFieldPopup] = useState(false);
// // //     const [activeFieldId, setActiveFieldId] = useState(null);
// // //     const [socalIconWidth, setSocalIconWidth] = useState(30);
// // //     const [socalIconHeight, setSocalIconHeight] = useState(30);
// // //     const [formDataAdd, setFormDataAdd] = useState([]);
// // //     const [selectedFormIds, setSelectedFormIds] = useState([]);
// // //     const [selectedTitles, setSelectedTitles] = useState([]);
// // //     const [showVideoInput, setShowVideoInput] = useState(false);
// // //     const { products, shop, apiVersion } = useLoaderData();
// // //     const [selectedProduct, setSelectedProduct] = useState(null);
// // //     const [isPopupOpen, setIsPopupOpen] = useState(false);
// // //     const [selectedProducts, setSelectedProducts] = useState([]);
// // //     const [productTitles, setProductTitles] = useState([]);
// // //     const [productImage, setProductImage] = useState([]);
// // //     const [popupFieldTitle, setPopupFieldTitle] = useState('');
// // //     const [showPrice, setShowPrice] = useState(false);
// // //     const [showbtnn, setShowbtnn] = useState(false);
// // //     const [productsPerRow, setProductsPerRow] = useState(3);
// // //     const [lastProductFieldId, setLastProductFieldId] = useState(null);
// // //     const [showFileUpload, setShowFileUpload] = useState(false);
// // //     const emailFieldRef = useRef(null);
// // //     const popupRef = useRef(null);
// // //     const [selectedIcons, setSelectedIcons] = useState({
// // //         facebook: true,
// // //         twitter: true,
// // //         instagram: true,
// // //     });
// // //     const [customIcons, setCustomIcons] = useState([]);
// // //     const [id, setId] = useState(null);
// // //     const location = useLocation();
// // //     const { formData } = location.state || {};
// // //     const [viewMode, setViewMode] = useState('desktop');
// // //     const [dividerColor, setDividerColor] = useState('#000');
// // //     const [showColorPicker, setShowColorPicker] = useState(false);
// // //     const [showbtn, setShowBtn] = useState(false);
// // //     const [emailWidth, setEmailWidth] = useState('800px');
// // //     const [headingColor, setHeadingColor] = useState('#000');
// // //     const formsPerPage = 3;
// // //     const [currentPage, setCurrentPage] = useState(1);
// // //     const [fontFamily, setFontFamily] = useState('Arial');
// // //     const [ReactQuill, setReactQuill] = useState(null);
// // //     const [editorValue, setEditorValue] = useState('');
// // //     const [headingUrl, setHeadingUrl] = useState('');
// // //     const [texteditorValue, setTextEditorValue] = useState('');
// // //     const [columnCount, setColumnCount] = useState(6);
// // //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// // //     const [columnImages, setColumnImages] = useState({});
// // //     const [editorValues, setEditorValues] = useState({});
// // //     const [editorValueed, setEditorValueed] = useState('');
// // //     const [currentFieldId, setCurrentFieldId] = useState(null);
// // //     const [isPopupVisibleed, setPopupVisibleed] = useState(false);
// // //     const [popupFieldId, setPopupFieldId] = useState(null);

// // //     const handleFontChange = (event) => {
// // //         setFontFamily(event.target.value);
// // //     };

// // //     useEffect(() => {
// // //         if (formData) {
// // //             console.log('Form data received:', formData);
// // //             console.log('Fields:', formData.fields);

// // //             if (formData.fields && formData.fields.length > 0) {
// // //                 const field = formData.fields[0];

// // //                 if (field.columnData) {
// // //                     console.log('Column Data:', field.columnData);
// // //                 } else {
// // //                     console.log('Column Data not found in the first field');
// // //                 }
// // //             } else {
// // //                 console.log('No fields found in formData');
// // //             }

// // //             if (Array.isArray(formData.fields)) {
// // //                 const validFields = formData.fields.map(field => {
// // //                     if (!field.id) {
// // //                         console.warn('Field missing ID:', field);
// // //                     }

// // //                     if (field.type === 'product') {
// // //                         console.log('Price for product field:', field.price);
// // //                         if (field.price === true) {
// // //                             setShowPrice(true);
// // //                         }
// // //                         if (field.showbtnn === true) {
// // //                             setShowbtnn(true);
// // //                         }
// // //                     }

// // //                     return { ...field, id: field.id || generateUniqueId() };
// // //                 });

// // //                 setFields(validFields);
// // //             }
// // //             setEmailWidth(formData.styles.width);
// // //             setBackgroundColor(formData.styles.backgroundColor);
// // //             setBorderRadious(formData.styles.borderRadious);
// // //             setBackgroundImage(formData.styles.backgroundImage);
// // //             setTemplatePadding(formData.styles.templatePadding);
// // //             setTextAlign(formData.styles.textAlign);
// // //             setFontFamily(formData.styles.fontFamily);
// // //             setEmailTemplateId(formData.templateId);
// // //             setFormTitle(formData.title);
// // //             setId(formData._id);
// // //             setSelectedFormIds(formData.form_ids || []);
// // //             const productsPerRow = formData.fields[0]?.productsPerRow || 3;
// // //             setProductsPerRow(productsPerRow);
// // //             console.log('Products per row:', formData.fields[0]?.productsPerRow);
// // //             const columnCount = parseInt(formData.styles.columnCount) || '';
// // //             setColumnCount(columnCount);

// // //         }
// // //     }, [formData]);

// // //     const createInputField = (type, add, initialValue = '') => {
// // //         const id = generateUniqueId();
// // //         console.log(`Creating field of type ${type} with ID: ${id}`);

// // //         return {
// // //             id,
// // //             type,
// // //             contentType: 'text',
// // //             add: add,
// // //             image: type === 'images' ? initialValue : null,
// // //             headerbtnbg: type === 'heading' ? '#FFFFFF' : undefined,
// // //             headerbtncolor: type === 'heading' ? '#000' : undefined,
// // //             headingbtnPadding: type === 'heading' ? 5 : undefined,
// // //             headingbtnradious: type === 'heading' ? 4 : undefined,
// // //             headingbtnFontSize: type === 'heading' ? 14 : undefined,
// // //             headingbtnwidth: type === 'heading' ? '100' : undefined,
// // //             headingbtnheight: type === 'heading' ? '35' : undefined,
// // //             headerbtn: type === 'heading' ? 'Click Now' : undefined,
// // //             headingbtnBorderColor: type === 'heading' ? '#000000' : undefined,
// // //             headingbtnBorderWidth: type === 'heading' ? '1' : undefined,
// // //             headingbtnBorderStyle: type === 'heading' ? 'solid' : undefined,
// // //             bannerImageWidth: type === 'heading' ? '100' : undefined,
// // //             bannerImageHeight: type === 'heading' ? '400px' : undefined,
// // //             bannerImageTextAlign: type === 'heading' ? '' : undefined,
// // //             headingText: type === 'heading' ? 'The Three Lions Collection' : undefined,
// // //             headingLevel: type === 'heading' ? 'h1' : null,
// // //             headingFontSize: type === 'heading' ? '40' : undefined,
// // //             headingLetterSpacing: type === 'heading' ? 0 : undefined,
// // //             headingPadding: type === 'heading' ? 20 : undefined,
// // //             headingTextAlign: type === 'heading' ? "" : undefined,
// // //             headingColor: type === 'heading' ? '#000' : undefined,
// // //             headingbg: type === 'heading' ? '#0000' : undefined,
// // //             headingbgImage: type === 'heading' ? '' : undefined,
// // //             headingBorderColor: type === 'heading' ? '#000000' : undefined,
// // //             headingBorderWidth: type === 'heading' ? '0' : undefined,
// // //             headingBorderStyle: type === 'heading' ? 'solid' : undefined,
// // //             headingFontWeight: type === 'heading' ? 600 : undefined,
// // //             descritionFontSize: type === 'description' ? '16' : undefined,
// // //             descritionColor: type === 'description' ? '#000' : undefined,
// // //             descritionFontWeight: type === 'description' ? 500 : undefined,
// // //             descriptionText: type === 'description' ? initialValue : 'No Description Provided',
// // //             descriptionbg: type === 'description' ? '#0000' : undefined,
// // //             descriptionPadding: type === 'description' ? 10 : undefined,
// // //             descriptionLetterSpacing: type === 'description' ? 0 : undefined,
// // //             descriptionTextAlign: type === 'description' ? "" : undefined,
// // //             descriptionBorderColor: type === 'description' ? '#000000' : undefined,
// // //             descriptionBorderWidth: type === 'description' ? '0' : undefined,
// // //             descriptionBorderStyle: type === 'description' ? 'solid' : undefined,
// // //             name: type === 'heading' ? initialValue :
// // //                 type === 'description' ? 'Description' :
// // //                     `Field_${id}`,
// // //             label: type === 'heading' ? 'Heading' :
// // //                 type === 'description' ? 'Description' :
// // //                     type === 'button' ? 'Submit' :
// // //                         `Default Label for ${type}`,
// // //             value: initialValue || (type === 'description' ? 'No Description Provided' : ''),
// // //             dividerColor: type === 'divider' ? '#000' : undefined,
// // //             dividerWidth: type === 'divider' ? '100' : undefined,
// // //             dividerheight: type === 'divider' ? '1' : undefined,
// // //             buttonColor: type === 'button' ? '#007BFF' : undefined,
// // //             buttonTextColor: type === 'button' ? '#FFF' : undefined,
// // //             buttonFontSize: type === 'button' ? 16 : undefined,
// // //             buttonPadding: type === 'button' ? 10 : undefined,
// // //             buttonWidth: type === 'button' ? 100 : undefined,
// // //             buttonHeight: type === 'button' ? 40 : undefined,
// // //             buttonradious: type === 'button' ? 2 : undefined,
// // //             buttonLabel: type === 'button' ? 'Submit' : undefined,
// // //             buttonBorderColor: type === 'button' ? '#000000' : undefined,
// // //             buttonBorderWidth: type === 'button' ? '1' : undefined,
// // //             buttonBorderStyle: type === 'button' ? 'solid' : undefined,
// // //             buttonLetterSpacing: type === 'button' ? 0 : undefined,
// // //             buttonUrll: type === 'button' ? '' : undefined,
// // //             socalIconWidth: type === 'socalicon' ? 30 : undefined,
// // //             socalIconHeight: type === 'socalicon' ? 30 : undefined,
// // //             socalIconPadding: type === 'socalicon' ? 10 : undefined,
// // //             socaliconTextAlign: type === 'socalicon' ? "" : undefined,
// // //             htmlColor: type === 'html convert' ? '#000' : undefined,
// // //             htmlFontSize: type === 'html convert' ? 16 : undefined,
// // //             htmlPadding: type === 'html convert' ? 10 : undefined,
// // //             icons: {
// // //                 facebook: { url: 'https://facebook.com', isHidden: false },
// // //                 twitter: { url: 'https://twitter.com', isHidden: false },
// // //                 instagram: { url: 'https://instagram.com', isHidden: false },
// // //             },
// // //             customIcons: [],
// // //             spacerHeight: type === 'spacer' ? '20' : undefined,
// // //             spacerbg: type === 'spacer' ? '#ffffff' : undefined,
// // //             splitbg: type === 'split' ? '#0000' : undefined,
// // //             videoPadding: type === 'video' ? '20' : undefined,
// // //             splitPadding: type === 'split' ? '10' : undefined,
// // //             splitTextAlin: type === 'split' ? 'left' : undefined,
// // //             videoBorderColor: type === 'video' ? '#000000' : undefined,
// // //             videoBorderWidth: type === 'video' ? '0' : undefined,
// // //             videoBorderStyle: type === 'video' ? 'solid' : undefined,
// // //             imgWidth: type === 'images' ? '100' : undefined,
// // //             imgTextAlign: type === 'images' ? "" : undefined,
// // //             imgPadding: type === 'images' ? 10 : undefined,
// // //             imgbg: type === 'images' ? '#0000' : undefined,
// // //             imgBorderColor: type === 'images' ? '#000000' : undefined,
// // //             imgBorderWidth: type === 'images' ? '0' : undefined,
// // //             imgBorderStyle: type === 'images' ? 'solid' : undefined,
// // //             productPadding: type === 'product' ? 10 : undefined,
// // //             productbg: type === 'product' ? '#0000' : undefined,
// // //             productBorderColor: type === 'product' ? '#000000' : undefined,
// // //             productBorderWidth: type === 'product' ? '0' : undefined,
// // //             productBorderStyle: type === 'product' ? 'solid' : undefined,
// // //             productFontSize: type === 'product' ? 16 : undefined,
// // //             productTextColor: type === 'product' ? '#000000' : undefined,
// // //             productWeight: type === 'product' ? 400 : undefined,
// // //             productLetterSpacing: type === 'product' ? 0 : undefined,
// // //             productbtnBorderColor: type === 'product' ? '#000000' : undefined,
// // //             productbtnBorderWidth: type === 'product' ? '1' : undefined,
// // //             productbtnBorderStyle: type === 'product' ? 'solid' : undefined,
// // //             productbtnbg: type === 'product' ? '#ffff' : undefined,
// // //             productradious: type === 'product' ? '3' : undefined,
// // //             productLabel: type === 'product' ? 'Shop Now' : undefined,
// // //             productfontSize: type === 'product' ? '12' : undefined,
// // //             productwidth: type === 'product' ? '80' : undefined,
// // //             productheight: type === 'product' ? '30' : undefined,
// // //             productbackgroundColor: type === 'product' ? '#007BFF' : undefined,
// // //             additionalButtons: [],
// // //             displayStyle: 'flex',
// // //             richTextAlign: type === 'heading' ? "" : undefined,
// // //             htmltext: type === 'html convert' ? '<h1>Your HTML Here</h1>' : undefined, 
// // //         };
// // //     };

// // //     const addInputField = (type) => {
// // //         let newField;
// // //         if (type === 'images') {
// // //             setImageFieldId(null);
// // //             newField = createInputField('images');
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setSelectedFieldId(newField.id);
// // //             handleFieldClick(newField.id);
// // //             return;
// // //         } else if (type === 'heading') {
// // //             setEditorValue('');
// // //             newField = createInputField(type);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setSelectedFieldId(newField.id);
// // //         } else if (type === 'divider') {
// // //             toggleColorPicker();
// // //             newField = createInputField(type);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         } else if (type === 'button') {
// // //             newField = createInputField(type);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         } else if (type === 'socalicon') {
// // //             newField = createInputField('socalicon');
// // //             setFields((prevFields) => {
// // //                 const updatedFields = [...prevFields, newField];
// // //                 console.log("Updated fields after adding new field:", updatedFields);

// // //                 setSelectedFieldId(newField.id);
// // //                 setSelectedIcons(newField.icons || {});
// // //                 setCustomIcons(newField.customIcons || []);
// // //                 setShowSocialIconPopup(true);

// // //                 return updatedFields;
// // //             });
// // //         } else if (type === 'html convert') {
// // //             newField = createInputField(type, type === 'html convert' ? '<h1>Your HTML Here</h1>' : '');
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         } else if (type === 'split') {
// // //             const splitFields = [
// // //                 createInputField('split', 'image', ''),
// // //                 createInputField('split', 'text', ''),
// // //             ];
// // //             setFields((prevFields) => [...prevFields, ...splitFields]);
// // //             splitFields.forEach((field) => {
// // //                 if (field.id) {
// // //                     handleFieldClick(field.id);
// // //                 }
// // //             });
// // //         } else if (type === 'spacer') {
// // //             newField = createInputField(type);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         } else if (type === 'video') {
// // //             newField = createInputField(type);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setShowVideoInput(true);
// // //         } else if (type === 'product') {
// // //             newField = createInputField('product');
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setLastProductFieldId(newField.id);
// // //             setIsPopupOpen(true);
// // //         } else if (type === 'Multicolumn') {
// // //             const id = generateUniqueId();
// // //             newField = { id, type: 'Multicolumn', columnCount: 6 };
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setColumnCount(6);
// // //         } else if (type === 'richtext') {
// // //             newField = createInputField('richtext');
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //             setCurrentFieldId(newField.id);

// // //         }

// // //         if (newField && newField.id) {
// // //             handleFieldClick(newField.id);
// // //         }
// // //     };

// // //     useEffect(() => {

// // //         const loadReactQuill = async () => {
// // //             const { default: Quill } = await import('react-quill');
// // //             setReactQuill(() => Quill);
// // //         };

// // //         loadReactQuill();
// // //     }, []);

// // //     const handleEdit = (field) => {
// // //         setSelectedFieldId(field.id);
// // //         setSelectedIcons(field.icons);
// // //         setCustomIcons(field.customIcons || []);
// // //         setShowSocialIconPopup(true);
// // //     };

// // //     const handleSaveSocialIcons = () => {
// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === selectedFieldId
// // //                     ? { ...field, icons: selectedIcons, customIcons }
// // //                     : field
// // //             )
// // //         );
// // //         setShowSocialIconPopup(false);

// // //     };

// // //     useEffect(() => {

// // //         handleSaveSocialIcons();
// // //     }, [selectedIcons, customIcons]);

// // //     const handleToggleIcon = (icon) => {
// // //         setSelectedIcons((prevIcons) => ({
// // //             ...prevIcons,
// // //             [icon]: {
// // //                 ...prevIcons[icon],
// // //                 isHidden: !prevIcons[icon]?.isHidden,
// // //             },
// // //         }));
// // //     };

// // //     const handleIconUrlChange = (e, icon) => {
// // //         setSelectedIcons((prevIcons) => ({
// // //             ...prevIcons,
// // //             [icon]: {
// // //                 ...prevIcons[icon],
// // //                 url: e.target.value,
// // //             },
// // //         }));
// // //     };

// // //     const handleCustomIconUpload = (e) => {
// // //         const files = e.target.files;
// // //         const filePromises = Array.from(files).map((file) => {
// // //             return new Promise((resolve) => {
// // //                 const reader = new FileReader();
// // //                 reader.onloadend = () => {
// // //                     resolve(reader.result);
// // //                 };
// // //                 reader.readAsDataURL(file);
// // //             });
// // //         });

// // //         Promise.all(filePromises).then((fileUrls) => {
// // //             const newIcons = fileUrls.map((url) => ({
// // //                 src: url,
// // //                 name: 'Custom Icon',
// // //                 isHidden: false
// // //             }));
// // //             setCustomIcons((prevIcons) => [...prevIcons, ...newIcons]);
// // //         });
// // //     };

// // //     const handleCustomIconUrlChange = (e, index) => {
// // //         const newUrl = e.target.value;
// // //         setCustomIcons((prevIcons) =>
// // //             prevIcons.map((icon, i) =>
// // //                 i === index ? { ...icon, url: newUrl } : icon
// // //             )
// // //         );
// // //     };

// // //     const toggleCustomIconVisibility = (index) => {
// // //         setCustomIcons((prevIcons) =>
// // //             prevIcons.map((icon, i) =>
// // //                 i === index ? { ...icon, isHidden: !icon.isHidden } : icon
// // //             )
// // //         );
// // //     };

// // //     const handleImageUpload = (e) => {
// // //         const file = e.target.files[0];
// // //         if (file) {
// // //             const reader = new FileReader();
// // //             reader.onloadend = () => {
// // //                 const newField = createInputField('images', reader.result);
// // //                 if (imageFieldId) {
// // //                     setFields((prevFields) =>
// // //                         prevFields.map((field) =>
// // //                             field.id === imageFieldId ? { ...field, value: reader.result } : field
// // //                         )
// // //                     );
// // //                 } else {
// // //                     setFields((prevFields) => [...prevFields, newField]);
// // //                 }
// // //                 setShowImagePopup(false);
// // //                 setImageFieldId(null);
// // //             };
// // //             reader.readAsDataURL(file);
// // //         }
// // //     };

// // //     const handleAddHeading = (e) => {
// // //         e.preventDefault();
// // //         if (emailTemplateId) {
// // //             setFields((prevFields) =>
// // //                 prevFields.map((field) =>
// // //                     field.id === emailTemplateId
// // //                         ? {
// // //                             ...field,
// // //                             headingText,
// // //                             headingLevel,
// // //                             headingFontSize,
// // //                             headingColor,
// // //                             imageUrl,
// // //                             editorContent: editorValue,
// // //                             headingUrl,
// // //                         }
// // //                         : field
// // //                 )
// // //             );
// // //         } else {
// // //             const newField = createInputField('heading', headingText);
// // //             newField.headingLevel = headingLevel;
// // //             newField.headingFontSize = headingFontSize;
// // //             newField.headingColor = headingColor;
// // //             newField.imageUrl = imageUrl;
// // //             newField.editorContent = editorValue;
// // //             newField.headingUrl = headingUrl;
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         }
// // //         setShowHeadingPopup(false);
// // //         setHeadingText('');
// // //         setHeadingLevel('h1');
// // //         setHeadingFontSize('16');
// // //         setEmailTemplateId(null);
// // //         setImageUrl(null);
// // //         setEditorValue('');
// // //         setHeadingUrl('');
// // //     };

// // //     const handleEditorChange = (value) => {
// // //         console.log("Editor value changed:", value);
// // //         console.log("Active field ID:", activeFieldId);
// // //         setEditorValue(value);

// // //         setFields((prevFields) => {
// // //             const updatedFields = prevFields.map((field) =>
// // //                 field.id === activeFieldId
// // //                     ? { ...field, editorContent: value }
// // //                     : field
// // //             );
// // //             console.log("Updated fields after editor change:", updatedFields);
// // //             return updatedFields;
// // //         });
// // //     };

// // //     const handleUpdateUrl = (id, newUrl) => {
// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === id ? { ...field, headingUrl: newUrl } : field
// // //             )
// // //         );
// // //     };

// // //     const handleAddDescription = (e) => {
// // //         e.preventDefault();
// // //         if (emailTemplateId) {
// // //             setFields((prevFields) =>
// // //                 prevFields.map((field) =>
// // //                     field.id === emailTemplateId
// // //                         ? { ...field, descriptionText }
// // //                         : field
// // //                 )
// // //             );
// // //         } else {
// // //             const newField = createInputField('description', descriptionText);
// // //             setFields((prevFields) => [...prevFields, newField]);
// // //         }

// // //         setShowDescriptionPopup(false);
// // //         setDescriptionText('');
// // //         setTextEditorValue('');
// // //         setEmailTemplateId(null);
// // //     };

// // //     const handleDescriptionChange = (id, value) => {
// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === id ? { ...field, descriptionText: value } : field
// // //             )
// // //         );
// // //     };

// // //     const removeField = (id) => {
// // //         console.log('Attempting to remove field with ID:', id);
// // //         setFields((prevFields) => {
// // //             const newFields = prevFields.filter(field => field.id !== id);
// // //             setEmailFieldPopup(false)
// // //             console.log('Remaining fields after removal:', newFields);
// // //             return newFields;
// // //         });
// // //     };


// // //     useEffect(() => {
// // //         axios
// // //             .get('http://localhost:4001/get-forms')
// // //             .then((res) => {
// // //                 console.log('API Response:', res.data);
// // //                 const filteredData = res.data.filter((form) => form.shop === shop);
// // //                 setFormDataAdd(filteredData);
// // //             })
// // //             .catch((error) => console.error('API Error:', error));
// // //     }, [shop]);

// // //     useEffect(() => {
// // //         if (formDataAdd.length > 0) {
// // //             const formIds = formDataAdd.map((form) => form.formId);
// // //             console.log('All form IDs:', formIds);
// // //         }
// // //     }, [formDataAdd]);

// // //     const handleFormSelect = async (e) => {
// // //         const title = e.target.value.trim();
// // //         const selectedForm = formDataAdd.find((form) => form.title.trim() === title);

// // //         if (selectedForm) {
// // //             try {
// // //                 const response = await fetch(`http://localhost:4001/check-form-connected/${selectedForm.formId}`);
// // //                 const data = await response.json();

// // //                 if (data.isConnected) {
// // //                     alert('This form is already connected to a template.');

// // //                     const confirmUnlink = window.confirm(
// // //                         'Do you want to unlink it?'
// // //                     );

// // //                     if (confirmUnlink) {
// // //                         const unlinkResponse = await fetch(
// // //                             `http://localhost:4001/unlink-template/${selectedForm.formId}`,
// // //                             { method: 'PUT' }
// // //                         );

// // //                         if (unlinkResponse.ok) {
// // //                             alert('Template unlinked from form.');

// // //                             const updatedCheckResponse = await fetch(
// // //                                 `http://localhost:4001/check-form-connected/${selectedForm.formId}`
// // //                             );
// // //                             const updatedCheckData = await updatedCheckResponse.json();

// // //                             if (!updatedCheckData.isConnected) {
// // //                                 console.log('Form is no longer connected to a template.');
// // //                             }
// // //                         } else {
// // //                             alert('Failed to unlink template.');
// // //                         }
// // //                     } else {
// // //                         return;
// // //                     }
// // //                 }

// // //                 setSelectedFormIds((prevFormIds) => {
// // //                     if (prevFormIds.includes(selectedForm.formId)) {
// // //                         return prevFormIds.filter((id) => id !== selectedForm.formId);
// // //                     } else {
// // //                         return [...prevFormIds, selectedForm.formId];
// // //                     }
// // //                 });

// // //                 setSelectedTitles((prevSelectedTitles) => {
// // //                     if (prevSelectedTitles.includes(title)) {
// // //                         return prevSelectedTitles.filter((t) => t !== title);
// // //                     } else {
// // //                         return [...prevSelectedTitles, title];
// // //                     }
// // //                 });
// // //             } catch (error) {
// // //                 console.error('Error checking or unlinking form connection:', error);
// // //                 alert('An error occurred while processing the form connection.');
// // //             }
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         console.log('Selected form IDs:', selectedFormIds);
// // //     }, [selectedFormIds]);

// // //     const createOrUpdateForm = async () => {
// // //         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
// // //         let trimmedTitle = formTitle.trim();
// // //         if (!trimmedTitle) {
// // //             alert('Please provide a title for the template.');
// // //             return;
// // //         }

// // //         if (!id) {
// // //             try {
// // //                 const response = await axios.get(`http://localhost:4001/check-title/${trimmedTitle}`);
// // //                 if (response.data.exists) {

// // //                     trimmedTitle = `${trimmedTitle}-${format(new Date(), "yyyyMMddHHmmss")}`;
// // //                 }
// // //             } catch (error) {
// // //                 console.error('Error checking title:', error);
// // //                 return;
// // //             }
// // //         }

// // //         const templateId = emailTemplateId || generateUniqueId();
// // //         setEmailTemplateId(templateId);

// // //         if (fields.length === 0) {
// // //             console.warn('No fields to create the form.');
// // //             return;
// // //         }

// // //         const validFields = fields.filter(field => field && field.type);

// // //         const updatedFields = validFields.map(field => {
// // //             let value = '';

// // //             switch (field.type) {
// // //                 case 'images':
// // //                     value = field.value || 'No Image Provided';
// // //                     break;
// // //                 case 'heading':
// // //                     value = field.value || '';
// // //                     field.editorContent = field.editorContent;
// // //                     field.headingUrl = field.headingUrl || '';
// // //                     field.imageUrl = field.imageUrl || '';
// // //                     break;
// // //                 case 'description':
// // //                     value = field.value || '';
// // //                     break;
// // //                 case 'socalicon':
// // //                     value = field.icons || 'No Social Icons Provided';
// // //                     break;
// // //                 case 'divider':
// // //                     value = field.icons || 'No Social Icons Provided';
// // //                     break;
// // //                 case 'button':
// // //                     value = 'Button';
// // //                 case 'split':
// // //                     value = field.value || 'No Value Provided';
// // //                     field.add = field.add;
// // //                     field.splitbg = field.splitbg || '';
// // //                     field.width = field.width || '100%';
// // //                     field.splitPadding = field.splitPadding || 0
// // //                     field.splitTextAlin = field.splitTextAlin || 'left'
// // //                     break;
// // //                 case 'spacer':
// // //                     value = 'Spacer Field';
// // //                     field.spacerHeight = field.spacerHeight || 30;
// // //                     field.spacerbg = field.spacerbg || '#f0f0f0';
// // //                     break;
// // //                 case 'video':
// // //                     value = field.value;
// // //                     field.videoPadding = field.videoPadding || 20;
// // //                     field.videoBorderWidth = field.videoBorderWidth || 1;
// // //                     field.videoBorderStyle = field.videoBorderStyle || 'solid';
// // //                     field.videoBorderColor = field.videoBorderColor || '#000';
// // //                     break;
// // //                 case 'richtext':
// // //                     value = field.value;
// // //                     field.content = field.content || editorValueed || field.value || '';
// // //                     break;
// // //                 case 'Multicolumn':
// // //                     value = field.value;
// // //                     if (!field.columnData) {
// // //                         field.columnData = Array.from({ length: columnCount }, (_, i) => ({
// // //                             image: columnImages[`${field.id}-${i}`] || '',
// // //                             content: editorValues[`${field.id}-${i}`] || '',
// // //                         }));
// // //                     } else {

// // //                         for (let i = 1; i < columnCount; i++) {
// // //                             field.columnData[i] = {
// // //                                 image: columnImages[`${field.id}-${i}`] || field.columnData[i]?.image,
// // //                                 content: editorValues[`${field.id}-${i}`] || field.columnData[i]?.content,
// // //                             };
// // //                         }
// // //                     }
// // //                     field.columnCount = columnCount;

// // //                     break;
// // //                 case 'product':
// // //                     return {
// // //                         ...field,
// // //                         products: field.products || [],
// // //                         productsPerRow,
// // //                         viewMode,
// // //                         price: showPrice,
// // //                         buttonUrl: field.productUrl || `https://${shop}/admin/products?selectedView=all`,
// // //                         showbtnn: showbtnn

// // //                     };

// // //                 default:
// // //                     value = '';
// // //             }

// // //             if (field.type === 'html convert') {
// // //                 return {
// // //                     ...field,
// // //                     value: field.value || '',
// // //                 };
// // //             }

// // //             if (field.type === 'button') {
// // //             }

// // //             if (field.type === 'socalicon') {
// // //                 field.socalIconHeight = socalIconHeight;
// // //                 field.socalIconWidth = socalIconWidth;
// // //                 field.icons = {
// // //                     facebook: {
// // //                         url: selectedIcons.facebook?.url || field.icons.facebook.url,
// // //                         isHidden: selectedIcons.facebook?.isHidden || false,
// // //                         value: selectedIcons.facebook?.value || 'Facebook',
// // //                     },
// // //                     twitter: {
// // //                         url: selectedIcons.twitter?.url || field.icons.twitter.url,
// // //                         isHidden: selectedIcons.twitter?.isHidden || false,
// // //                         value: selectedIcons.twitter?.value || 'Twitter',
// // //                     },
// // //                     instagram: {
// // //                         url: selectedIcons.instagram?.url || field.icons.instagram.url,
// // //                         isHidden: selectedIcons.instagram?.isHidden || false,
// // //                         value: selectedIcons.instagram?.value || 'Instagram',
// // //                     },
// // //                     send: {
// // //                         url: selectedIcons.send?.url || '',
// // //                         isHidden: selectedIcons.send?.isHidden || false,
// // //                         value: selectedIcons.send?.value || 'Send',
// // //                     },
// // //                 };

// // //                 field.customIcons = field.customIcons || [];
// // //             } else {
// // //                 field.icons = {};
// // //             }

// // //             return {
// // //                 ...field,
// // //                 label: field.label || (field.type === 'button' ? 'Button' : `Default Label for ${field.type}`),
// // //                 name: field.name || `Field_${field.id}`,
// // //                 value: field.type === 'product' ? undefined : value,
// // //                 headerbtnbg: field.headerbtnbg || null,
// // //                 headerbtncolor: field.headerbtncolor || null,
// // //                 headerbtn: field.headerbtn || null,
// // //                 headingLevel: field.headingLevel || null,
// // //                 headingbtnPadding: field.headingbtnPadding || 10,
// // //                 headingbtnradious: field.headingbtnradious || 4,
// // //                 headingbtnwidth: field.headingbtnwidth || 100,
// // //                 headingbtnFontSize: field.headingbtnFontSize || 16,
// // //                 headingbtnheight: field.headingbtnheight || 40,
// // //                 headingbtnBorderWidth: field.headingbtnBorderWidth || 1,
// // //                 headingbtnBorderStyle: field.headingbtnBorderStyle || 'solid',
// // //                 headingbtnBorderColor: field.headingbtnBorderColor || '#000',
// // //                 bannerImageWidth: field.bannerImageWidth || '100',
// // //                 bannerImageHeight: field.bannerImageHeight || '',
// // //                 bannerImageTextAlign: field.bannerImageTextAlign || '',
// // //                 richTextAlign: field.richTextAlign || '',
// // //                 headingFontWeight: field.headingFontWeight || 600,
// // //                 headingColor: field.headingColor || '#000',
// // //                 headingbg: field.headingbg || '#ffff',
// // //                 headingPadding: field.headingPadding || 0,
// // //                 headingbgImage: field.headingbgImage || '',
// // //                 headingLetterSpacing: field.headingLetterSpacing || 0,
// // //                 headingTextAlign: field.headingTextAlign || '',
// // //                 headingText: field.headingText,
// // //                 headingBorderWidth: field.headingBorderWidth || 1,
// // //                 headingBorderStyle: field.headingBorderStyle || 'solid',
// // //                 headingBorderColor: field.headingBorderColor || '#000',
// // //                 headingFontSize: field.type === 'heading' ? (field.headingFontSize || "16") : undefined,
// // //                 descritionFontWeight: field.descritionFontWeight || 600,
// // //                 descritionFontSize: field.descritionFontSize || 16,
// // //                 descritionColor: field.descritionColor || '#000',
// // //                 descriptionbg: field.descriptionbg || '#ffff',
// // //                 descriptionPadding: field.descriptionPadding || 10,
// // //                 descriptionLetterSpacing: field.descriptionLetterSpacing || 0,
// // //                 descriptionTextAlign: field.descriptionTextAlign || '',
// // //                 descriptionBorderWidth: field.descriptionBorderWidth || 1,
// // //                 descriptionBorderStyle: field.descriptionBorderStyle || 'solid',
// // //                 descriptionBorderColor: field.descriptionBorderColor || '#000',
// // //                 dividerColor: field.dividerColor || '#000',
// // //                 dividerWidth: field.dividerWidth || '100',
// // //                 dividerheight: field.dividerheight || '1',
// // //                 buttonColor: field.buttonColor || '#007BFF',
// // //                 buttonFontSize: field.buttonFontSize || 16,
// // //                 buttonTextColor: field.buttonTextColor || '#fff',
// // //                 buttonLetterSpacing: field.buttonLetterSpacing || 0,
// // //                 buttonUrll: field.buttonUrll || '',
// // //                 buttonBorderWidth: field.buttonBorderWidth || 1,
// // //                 buttonBorderStyle: field.buttonBorderStyle || 'solid',
// // //                 buttonBorderColor: field.buttonBorderColor || '#000',
// // //                 buttonWidth: field.buttonWidth || 150,
// // //                 buttonHeight: field.buttonHeight || 40,
// // //                 buttonradious: field.buttonradious || 40,
// // //                 buttonPadding: field.buttonPadding || 10,
// // //                 socalIconHeight: field.socalIconHeight || 30,
// // //                 socalIconWidth: field.socalIconWidth || 30,
// // //                 socalIconPadding: field.socalIconPadding || 10,
// // //                 socaliconTextAlign: field.socaliconTextAlign || '',
// // //                 htmlFontSize: field.htmlFontSize || 16,
// // //                 htmlPadding: field.htmlPadding || 10,
// // //                 htmlColor: field.htmlColor || '#000',
// // //                 splitbg: field.splitbg || '',
// // //                 width: field.width || '100%',
// // //                 spacerHeight: field.spacerHeight || 20,
// // //                 spacerbg: field.spacerbg || '#fff',
// // //                 videoPadding: field.videoPadding || 20,
// // //                 splitPadding: field.splitPadding || 0,
// // //                 splitTextAlin: field.splitTextAlin || 'left',
// // //                 videoBorderWidth: field.videoBorderWidth || 1,
// // //                 videoBorderStyle: field.videoBorderStyle || 'solid',
// // //                 videoBorderColor: field.videoBorderColor || '#000',
// // //                 imgWidth: field.imgWidth || '100',
// // //                 imgTextAlign: field.imgTextAlign || '',
// // //                 imgPadding: field.imgPadding || 10,
// // //                 imgbg: field.imgbg || '#ffff',
// // //                 imgBorderWidth: field.imgBorderWidth || 0,
// // //                 imgBorderStyle: field.imgBorderStyle || 'solid',
// // //                 imgBorderColor: field.imgBorderColor || '#000',
// // //                 productPadding: field.productPadding || 10,
// // //                 productbg: field.productbg || '#ffff',
// // //                 productBorderWidth: field.productBorderWidth || 0,
// // //                 productBorderStyle: field.productBorderStyle || 'solid',
// // //                 productBorderColor: field.productBorderColor || '#000',
// // //                 productFontSize: field.productFontSize || 16,
// // //                 productColor: field.productColor || '#000',
// // //                 productWeight: field.productWeight || 600,
// // //                 productLetterSpacing: field.productLetterSpacing || 0,
// // //                 productbtnBorderColor: field.productbtnBorderColor || '#000',
// // //                 productbtnBorderWidth: field.productbtnBorderWidth || 16,
// // //                 productbtnBorderStyle: field.productbtnBorderStyle || '#000',
// // //                 productbtnbg: field.productbtnbg || 600,
// // //                 productradious: field.productradious || 0,
// // //                 productLabel: field.productLabel || 'Shop Now',
// // //                 productfontSize: field.productfontSize || '12',
// // //                 productwidth: field.productwidth || 80,
// // //                 productheight: field.productheight || 30,
// // //                 productbackgroundColor: field.productbackgroundColor || '#007BFF',
// // //                 buttonLabel: field.buttonLabel || '',

// // //             };
// // //         });

// // //         console.log('Updated fields:', updatedFields);

// // //         const formData = {
// // //             templateId,
// // //             shop,
// // //             form_ids: selectedFormIds.map(id => String(id)),
// // //             title: trimmedTitle,
// // //             fields: updatedFields,
// // //             createdAt: timestamp,
// // //             styles: {
// // //                 backgroundImage,
// // //                 backgroundColor,
// // //                 borderRadious,
// // //                 templatePadding,
// // //                 textAlign,
// // //                 fontFamily,
// // //                 width: viewMode === 'desktop' ? '800px' : '400px',
// // //                 dividerColor,
// // //             },
// // //         };

// // //         try {
// // //             const response = id
// // //                 ? await axios.put(`http://localhost:4001/update/${id}`, formData)
// // //                 : await axios.post('http://localhost:4001/send/api', formData);
// // //             console.log('Form saved successfully with title:', trimmedTitle);
// // //             const successMessage = id ? 'Form updated successfully' : 'Form created successfully';
// // //             console.log(successMessage, response.data);
// // //             navigate('/app/emailTemplate/list')

// // //             if (!id) {
// // //                 resetFormState();
// // //             }

// // //             setExistingTitles(prevTitles => [...prevTitles, trimmedTitle]);
// // //         } catch (error) {
// // //             console.error('Error saving form:', error);
// // //             if (error.response) {
// // //                 console.error('Response data:', error.response.data);
// // //             }
// // //         }
// // //     };

// // //     const resetFormState = () => {
// // //         setFields([]);
// // //         setEmailTemplateId(null);
// // //         setHeadingText('');
// // //         setBackgroundImage(null);
// // //         setTemplatePadding('20')
// // //         setBackgroundColor('#ffffff');
// // //         setTextAlign('left');
// // //         setBorderRadious(5)
// // //         setId(null);
// // //     };

// // //     const handleBackgroundImageUpload = (e) => {
// // //         const file = e.target.files[0];
// // //         if (file) {
// // //             const reader = new FileReader();
// // //             reader.onloadend = () => {
// // //                 setBackgroundImage(reader.result);
// // //             };
// // //             reader.readAsDataURL(file);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const formBuilder = formBuilderRef.current;
// // //         if (!formBuilder) return;

// // //         const sortable = Sortable.create(formBuilder, {
// // //             animation: 150,
// // //             ghostClass: 'dragging',
// // //             onEnd: (evt) => {
// // //                 const newFields = [...fields];
// // //                 const movedField = newFields.splice(evt.oldIndex, 1)[0];
// // //                 newFields.splice(evt.newIndex, 0, movedField);
// // //                 setFields(newFields);
// // //             },
// // //         });

// // //         return () => {
// // //             sortable.destroy();
// // //         };
// // //     }, [fields]);

// // //     const toggleViewMode = (mode) => {
// // //         setViewMode(mode);
// // //         setEmailWidth(mode === 'desktop' ? '800px' : '400px');
// // //         if (mode === 'mobile') {
// // //             setProductsPerRow(1);
// // //         } else {
// // //             setProductsPerRow(3);
// // //         }
// // //     };

// // //     const toggleColorPicker = () => {
// // //         setShowColorPicker(!showColorPicker);
// // //     };

// // //     const togglebtn = () => {
// // //         setShowBtn(!showbtn);
// // //     };

// // //     const toggleFields = () => {
// // //         setShowFields(true);
// // //         setDropdownVisible(false);
// // //     };

// // //     const toggleSettings = () => {
// // //         setShowFields(false);
// // //     };

// // //     const renderField = (field) => {
// // //         if (!field) return null;

// // //         switch (field.type) {
// // //             case 'html convert':
// // //                 return (
// // //                     <div>
// // //                         <textarea
// // //                             value={field.value || field.htmltext}
// // //                             onChange={(e) =>
// // //                                 setFields((prevFields) =>
// // //                                     prevFields.map((f) => (f.id === field.id ? { ...f, value: e.target.value } : f))
// // //                                 )
// // //                             }
// // //                             rows="5"
// // //                             cols="50"
// // //                         />
// // //                     </div>
// // //                 );

// // //             default:
// // //                 return;
// // //         }
// // //     };


// // //     useEffect(() => {
// // //         const handleClickOutside = (event) => {
// // //             if (popupRef.current && !popupRef.current.contains(event.target)) {
// // //                 setEmailFieldPopup(false);
// // //             }
// // //         };

// // //         document.addEventListener('mousedown', handleClickOutside);

// // //         return () => {
// // //             document.removeEventListener('mousedown', handleClickOutside);
// // //         };
// // //     }, []);

// // //     useEffect(() => {
// // //         const handleClickOutside = (event) => {
// // //             if (emailFieldRef.current && !emailFieldRef.current.contains(event.target)) {
// // //                 setActiveFieldId(null);
// // //             }
// // //         };

// // //         document.addEventListener('mousedown', handleClickOutside);

// // //         return () => {
// // //             document.removeEventListener('mousedown', handleClickOutside);
// // //         };
// // //     }, []);

// // //     const handleWidthChange = (newWidth) => {
// // //         setFields((prevFields) => {
// // //             const selectedIndex = prevFields.findIndex((f) => f.id === selectedFieldId);

// // //             if (selectedIndex !== -1 && selectedIndex % 2 === 0) {
// // //                 return prevFields.map((f, index) => {
// // //                     if (index === selectedIndex) {
// // //                         return { ...f, width: newWidth };
// // //                     }
// // //                     if (index === selectedIndex + 1) {
// // //                         return { ...f, width: `${100 - parseInt(newWidth)}%` };
// // //                     }
// // //                     return f;
// // //                 });
// // //             } else if (selectedIndex !== -1) {
// // //                 return prevFields.map((f, index) => {
// // //                     if (index === selectedIndex) {
// // //                         return { ...f, width: newWidth };
// // //                     }
// // //                     if (index === selectedIndex - 1) {
// // //                         return { ...f, width: `${100 - parseInt(newWidth)}%` };
// // //                     }
// // //                     return f;
// // //                 });
// // //             }
// // //             return prevFields;
// // //         });
// // //     };

// // //     const handleVideoChange = (e, id) => {
// // //         const updatedFields = fields.map(field => {
// // //             if (field.id === id && field.type === 'video') {
// // //                 return { ...field, value: e.target.value };
// // //             }
// // //             return field;
// // //         });
// // //         setFields(updatedFields);
// // //     };

// // //     const getVideoEmbedUrl = (url) => {
// // //         const videoId = url.split('v=')[1]?.split('&')[0];
// // //         if (videoId) {
// // //             return `https://www.youtube.com/embed/${videoId}?autohide=1&showinfo=0&controls=0`;
// // //         }
// // //         return null;
// // //     };

// // //     const handleProductClick = (product, isChecked) => {
// // //         setSelectedProducts((prevSelectedProducts) => {
// // //             if (isChecked) {

// // //                 return [...prevSelectedProducts, product];
// // //             } else {
// // //                 return prevSelectedProducts.filter((p) => p.id !== product.id);
// // //             }
// // //         });

// // //         setFields((prevFields) => {
// // //             return prevFields.map((field) => {
// // //                 if (field.id === lastProductFieldId && field.type === 'product') {
// // //                     return {
// // //                         ...field,
// // //                         products: isChecked
// // //                             ? [...(field.products || []), product]
// // //                             : (field.products || []).filter((p) => p.id !== product.id)
// // //                     };
// // //                 }
// // //                 return field;
// // //             });
// // //         });

// // //         setIsPopupOpen(true);
// // //     };

// // //     const handleRemoveProductFromForm = (index) => {
// // //         const productToRemove = productTitles?.[index];

// // //         if (!productToRemove) return;

// // //         setProductTitles((prevTitles) =>
// // //             Array.isArray(prevTitles) ? prevTitles.filter((title, i) => i !== index) : prevTitles
// // //         );

// // //         setSelectedProducts((prevSelectedProducts) =>
// // //             Array.isArray(prevSelectedProducts)
// // //                 ? prevSelectedProducts.filter((product) => product.title !== productToRemove)
// // //                 : prevSelectedProducts
// // //         );

// // //         setFields((prevFields) =>
// // //             Array.isArray(prevFields)
// // //                 ? prevFields.map((field) =>
// // //                     field.type === 'product'
// // //                         ? { ...field, products: field.products.filter((product) => product.title !== productToRemove) }
// // //                         : field
// // //                 )
// // //                 : prevFields
// // //         );
// // //     };

// // //     const handleClosePopup = () => {
// // //         setIsPopupOpen(false);
// // //         setSelectedProduct(null);
// // //     };

// // //     const togglePrice = () => {
// // //         setShowPrice(!showPrice);
// // //     };

// // //     const togglebtnn = () => {
// // //         setShowbtnn(!showbtnn);
// // //     };

// // //     const AddProduct = () => {
// // //         setIsPopupOpen(true);
// // //     }

// // //     useEffect(() => {
// // //         console.log('isPopupOpen:', isPopupOpen);
// // //         console.log('selectedProduct:', selectedProduct);
// // //     }, [isPopupOpen, selectedProduct]);


// // //     const handleAddProductToSelected = (fieldId, fieldTitle, fieldImage, products) => {
// // //         console.log("Field ID:", fieldId);
// // //         console.log("Field Title:", fieldTitle);
// // //         console.log("Products:", products);
// // //         console.log("Image:", fieldImage);
// // //         setLastProductFieldId(fieldId);
// // //         setPopupFieldTitle(fieldTitle);

// // //         const productTitles = products.map(product => product.title);
// // //         console.log("Product Titles:", productTitles);

// // //         setProductTitles(productTitles);

// // //         const productImages = products.map(product => product.images.length > 0 ? product.images[0].src : null);
// // //         console.log("Product images:", productImages);
// // //         setProductImage(productImages);
// // //     };

// // //     const handleProductsPerRowChange = (e) => {
// // //         setProductsPerRow(parseInt(e.target.value, 6));
// // //     };


// // //     const totalPages = Math.ceil(products.length / formsPerPage);

// // //     const handlePageChange = (page) => {
// // //         if (page < 1 || page > totalPages) return;
// // //         setCurrentPage(page);
// // //     };

// // //     const currentProducts = products.slice(
// // //         (currentPage - 1) * formsPerPage,
// // //         currentPage * formsPerPage
// // //     );

// // //     const generatePageNumbers = () => {
// // //         const visiblePages = [];

// // //         if (totalPages <= 5) {
// // //             for (let i = 1; i <= totalPages; i++) {
// // //                 visiblePages.push(i);
// // //             }
// // //         } else {

// // //             if (currentPage <= 3) {
// // //                 visiblePages.push(1, 2, 3, 4, '...', totalPages);
// // //             }

// // //             else if (currentPage >= totalPages - 2) {
// // //                 visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
// // //             }

// // //             else {
// // //                 visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
// // //             }
// // //         }

// // //         return visiblePages;
// // //     };


// // //     const handleRemoveBackgroundImage = () => {
// // //         setBackgroundImage('');
// // //     };

// // //     const RemoveImage = (fieldId) => {
// // //         console.log(`Removing image for field with ID: ${fieldId}`);
// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === fieldId
// // //                     ? { ...field, imageUrl: null }
// // //                     : field
// // //             )
// // //         );
// // //     };

// // //     const handleFileChange = (e, fieldId) => {
// // //         const file = e.target.files[0];
// // //         if (file) {
// // //             const reader = new FileReader();
// // //             reader.onloadend = () => {
// // //                 setFields(prevFields =>
// // //                     prevFields.map(f =>
// // //                         f.id === fieldId ? { ...f, headingbgImage: reader.result } : f
// // //                     )
// // //                 );
// // //             };
// // //             reader.readAsDataURL(file);
// // //         }
// // //     };


// // //     const handleFieldClick = (fieldId) => {
// // //         setSelectedFieldId(fieldId);
// // //         setEmailFieldPopup(true);
// // //         setActiveFieldId(fieldId);
// // //         const selectedField = fields.find((field) => field.id === fieldId);
// // //         if (selectedField && selectedField.type === 'Multicolumn') {
// // //             setIsPopupVisible(true);
// // //             setColumnCount(selectedField.columnCount);
// // //         }
// // //     };

// // //     const handleColumnClick = (fieldId, columnIndex) => {
// // //         setPopupFieldId(fieldId);

// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === fieldId
// // //                     ? { ...field, selectedColumn: columnIndex }
// // //                     : field
// // //             )
// // //         );
// // //     };

// // //     const handleColumnSelection = (columnSelection) => {
// // //         const newColumnCount = Number(columnSelection);
// // //         setColumnCount(newColumnCount);
// // //         setFields((prevFields) =>
// // //             prevFields.map((field) =>
// // //                 field.id === popupFieldId
// // //                     ? { ...field, columnCount: newColumnCount }
// // //                     : field
// // //             )
// // //         );
// // //     };

// // //     const handleImageUploaded = (e, fieldId, columnIndex) => {
// // //         const file = e.target.files[0];
// // //         const reader = new FileReader();
// // //         reader.onloadend = () => {
// // //             setColumnImages((prevImages) => ({
// // //                 ...prevImages,
// // //                 [`${fieldId}-${columnIndex}`]: reader.result,
// // //             }));
// // //         };
// // //         if (file) reader.readAsDataURL(file);
// // //     };

// // //     const handleRemoveImage = (fieldId, columnIndex) => {
// // //         setColumnImages((prevImages) => {
// // //             const updatedImages = { ...prevImages };
// // //             delete updatedImages[`${fieldId}-${columnIndex}`];
// // //             return updatedImages;
// // //         });
// // //     };

// // //     const handleEditorChangeed = (value, fieldId, columnIndex) => {
// // //         setEditorValues((prevValues) => ({
// // //             ...prevValues,
// // //             [`${fieldId}-${columnIndex}`]: value,
// // //         }));
// // //     };

// // //     const handleEditorChangeee = (value) => {
// // //         setEditorValueed(value);
// // //     };

// // //     const handleSave = () => {
// // //         const updatedFields = fields.map((field) =>
// // //             field.id === currentFieldId ? { ...field, content: editorValueed } : field
// // //         );
// // //         setFields(updatedFields);
// // //         setPopupVisibleed(false);
// // //     };

// // //     const handleRemoveImage1 = (popupFieldId, selectedColumn) => {
// // //         setFields((prevFields) => {
// // //             const updatedFields = prevFields.map((field) => {
// // //                 if (field.id === popupFieldId) {
// // //                     const updatedColumnData = [...field.columnData];
// // //                     updatedColumnData[selectedColumn].image = null;
// // //                     return { ...field, columnData: updatedColumnData };
// // //                 }
// // //                 return field;
// // //             });
// // //             return updatedFields;
// // //         });
// // //     };

// // //     const handleImageUpload1 = (e, popupFieldId, selectedColumn) => {
// // //         const file = e.target.files[0];
// // //         if (file) {
// // //             const imageUrl = URL.createObjectURL(file);

// // //             setFields((prevFields) => {
// // //                 const updatedFields = prevFields.map((field) => {
// // //                     if (field.id === popupFieldId) {
// // //                         const updatedColumnData = [...field.columnData];
// // //                         updatedColumnData[selectedColumn].image = imageUrl;
// // //                         return { ...field, columnData: updatedColumnData };
// // //                     }
// // //                     return field;
// // //                 });
// // //                 return updatedFields;
// // //             });
// // //         }
// // //     };

// // //     const handleContentChange = (value, popupFieldId, selectedColumn) => {
// // //         setFields((prevFields) => {
// // //             const updatedFields = prevFields.map((field) => {
// // //                 if (field.id === popupFieldId) {
// // //                     const updatedColumnData = [...field.columnData];
// // //                     updatedColumnData[selectedColumn].content = value;
// // //                     return { ...field, columnData: updatedColumnData };
// // //                 }
// // //                 return field;
// // //             });
// // //             return updatedFields;
// // //         });
// // //     };

// // //     const handleEditChange = (value) => {
// // //         console.log("Editor value changed:", value);
// // //         console.log("Active field ID:", activeFieldId);
// // //         setEditorValueed(value);

// // //         setFields((prevFields) => {
// // //             const updatedFields = prevFields.map((field) =>
// // //                 field.id === activeFieldId
// // //                     ? { ...field, content: value }
// // //                     : field
// // //             );
// // //             console.log("Updated fields after editor change:", updatedFields);
// // //             return updatedFields;
// // //         });
// // //     };

// // //     return (
// // //         <div>
// // //             <div className='email-campaing-templates'>
// // //                 <div className="builder-container">
// // //                     <h3>Email campaign</h3>

// // //                     <div className='builder_form_name'>
// // //                         <div className='email-template-heading'>
// // //                             <input
// // //                                 type="text"
// // //                                 value={formTitle}
// // //                                 onChange={(e) => setFormTitle(e.target.value)}
// // //                                 placeholder="Enter Name"
// // //                             />
// // //                         </div>
// // //                         <div className='template-select-forms'>
// // //                             <select onChange={handleFormSelect}>
// // //                                 <option value="">Select a form</option>
// // //                                 {formDataAdd.map((form) => (
// // //                                     <option
// // //                                         key={form.id}
// // //                                         value={form.title}
// // //                                         style={{
// // //                                             color: selectedFormIds.includes(form.formId) ? '#45A7F6' : 'black',
// // //                                         }}
// // //                                     >
// // //                                         {form.title}
// // //                                     </option>
// // //                                 ))}
// // //                             </select>
// // //                         </div>
// // //                     </div>

// // //                     <div className='builder-forms_rapp'>
// // //                         <div className="builder-wrp">
// // //                             <div className="controls-main-wrp email-tempalte">
// // //                                 <div className="controls-wrp">
// // //                                     {showField && (<div className="controls">
// // //                                         <div className='builder-form-element'>
// // //                                             <div className='buil_form_texttt'>
// // //                                                 <div className='buil_form_texttt_p'>
// // //                                                     <h2> Elements</h2>
// // //                                                 </div>
// // //                                             </div>
// // //                                         </div>
// // //                                         <div className='builder_fieldes'>
// // //                                             <div className='builder_form_select_control'>
// // //                                                 <div
// // //                                                     className={`builder_form_fields ${showFields ? 'active' : ''}`}
// // //                                                     onClick={toggleFields}
// // //                                                 >
// // //                                                     <h2>Fields</h2>
// // //                                                 </div>
// // //                                                 <div
// // //                                                     className={`builder_form_setting ${!showFields ? 'active' : ''}`}
// // //                                                     onClick={toggleSettings}
// // //                                                 >
// // //                                                     <h2>Settings</h2>
// // //                                                 </div>

// // //                                             </div>
// // //                                             {showFields ? (
// // //                                                 <div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={banner} alt="" /></span> <span><h4>Banner</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('richtext')}><span className='form_builder_field_img'><img src={rich} alt="" /></span> <span><h4>Rich Text</h4></span></button></div>
// // //                                                     {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div> */}
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('split')}><span className='form_builder_field_img'><img src={itext} alt="" /></span> <span><h4>Images with Text</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('socalicon')}><span className='form_builder_field_img'><img src={socail} alt="" /></span> <span><h4>Social Icon</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('html convert')}><span className='form_builder_field_img'><img src={htmlicon} alt="" /></span> <span><h4>HTML Block</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('spacer')}><span className='form_builder_field_img'><img src={spacer} alt="" /></span> <span><h4>Spacer</h4></span></button></div>
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('Multicolumn')}><span className='form_builder_field_img'><img src={multimedia} /></span><span><h4>Multicolumn</h4></span></button></div>
// // //                                                     {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('video')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>video</h4></span></button></div> */}
// // //                                                     <div className='builderr_field_wrpp'> <button onClick={() => addInputField('product')}><span className='form_builder_field_img'><img src={product} alt="" /></span> <span><h4>Product</h4></span></button></div></div>

// // //                                             ) : (
// // //                                                 <div>
// // //                                                     <div className='edit_form_close'>
// // //                                                         <div className='edit-formwrap'>
// // //                                                             <h3>Edit Properties</h3>
// // //                                                             <div className="builder_field_wrpp">
// // //                                                                 <div className='edit-form-options'>
// // //                                                                     <div className="edit_setting_bg">
// // //                                                                         <label htmlFor="font-family-selector">Font-Family</label>
// // //                                                                         <select
// // //                                                                             id="font-family-selector"
// // //                                                                             value={fontFamily}
// // //                                                                             onChange={handleFontChange}
// // //                                                                             style={{ marginLeft: '10px', padding: '5px' }}
// // //                                                                         >
// // //                                                                             <option value="Arial">Arial</option>
// // //                                                                             <option value="Verdana">Verdana</option>
// // //                                                                             <option value="Times New Roman">Times New Roman</option>
// // //                                                                             <option value="Georgia">Georgia</option>
// // //                                                                             <option value="Courier New">Courier New</option>
// // //                                                                             <option value="Roboto">Roboto</option>
// // //                                                                         </select>
// // //                                                                     </div>
// // //                                                                     <div className='edit_setting_bg bgcolor'>
// // //                                                                         <label>
// // //                                                                             Background Color:
// // //                                                                         </label>
// // //                                                                         <div
// // //                                                                             style={{
// // //                                                                                 height: "50px",
// // //                                                                                 width: "50px",
// // //                                                                                 borderRadius: "50%",
// // //                                                                                 backgroundColor: backgroundColor,
// // //                                                                                 border: "1px solid #ccc",
// // //                                                                                 cursor: "pointer",
// // //                                                                             }}
// // //                                                                             onClick={() => document.getElementById('colorInput').click()}
// // //                                                                         >
// // //                                                                         </div>
// // //                                                                         <input
// // //                                                                             id="colorInput"
// // //                                                                             type="color"
// // //                                                                             style={{
// // //                                                                                 display: "none"
// // //                                                                             }}
// // //                                                                             value={backgroundColor}
// // //                                                                             onChange={(e) => setBackgroundColor(e.target.value)}
// // //                                                                         />
// // //                                                                     </div>
// // //                                                                     <div className='edit_setting_bg'>
// // //                                                                         <label>Border-Radious:</label>
// // //                                                                         <input
// // //                                                                             type="text"
// // //                                                                             id="Border-radious"
// // //                                                                             value={borderRadious}
// // //                                                                             onChange={(e) => setBorderRadious(e.target.value)}
// // //                                                                         />
// // //                                                                     </div>

// // //                                                                     <div className='edit_setting_bg'>
// // //                                                                         <label>Padding:</label>
// // //                                                                         <input
// // //                                                                             type="text"
// // //                                                                             id="Padding"
// // //                                                                             value={templatePadding}
// // //                                                                             onChange={(e) => setTemplatePadding(e.target.value)}
// // //                                                                         />
// // //                                                                     </div>

// // //                                                                     <div className='edit_setting_bg'>
// // //                                                                         <label htmlFor="textAlign">Text Alignment:</label>
// // //                                                                         <select
// // //                                                                             id="textAlign"
// // //                                                                             value={textAlign}
// // //                                                                             onChange={(e) => setTextAlign(e.target.value)}
// // //                                                                         >
// // //                                                                             <option value="left">Left</option>
// // //                                                                             <option value="center">Center</option>
// // //                                                                             <option value="right">Right</option>
// // //                                                                         </select>
// // //                                                                     </div>

// // //                                                                     <div className='edit_setting_bg'>
// // //                                                                         <label htmlFor="backgroundImage">Background Image:</label>
// // //                                                                         <input
// // //                                                                             type="file"
// // //                                                                             accept="image/*"
// // //                                                                             onChange={handleBackgroundImageUpload}
// // //                                                                         />
// // //                                                                         {backgroundImage && (
// // //                                                                             <button
// // //                                                                                 type="button"
// // //                                                                                 onClick={handleRemoveBackgroundImage}
// // //                                                                                 style={{
// // //                                                                                     margin: '10px 0',
// // //                                                                                     padding: '5px 10px',
// // //                                                                                     cursor: 'pointer',
// // //                                                                                     background: 'white',
// // //                                                                                     color: 'black',
// // //                                                                                     border: 'none',
// // //                                                                                     borderRadius: '5px',
// // //                                                                                     border: '1px solid rgb(221, 221, 221)'
// // //                                                                                 }}
// // //                                                                             >

// // //                                                                                 Remove Background
// // //                                                                             </button>
// // //                                                                         )}
// // //                                                                         {backgroundImage && (
// // //                                                                             <div
// // //                                                                                 className="edit_setting_bg"
// // //                                                                                 style={{
// // //                                                                                     backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
// // //                                                                                     backgroundRepeat: 'no-repeat',
// // //                                                                                     backgroundSize: 'contain',
// // //                                                                                     backgroundPosition: 'center',
// // //                                                                                     height: '200px',
// // //                                                                                     width: '100%',
// // //                                                                                     border: '1px solid #ddd',
// // //                                                                                 }}
// // //                                                                             >

// // //                                                                             </div>
// // //                                                                         )}
// // //                                                                     </div>
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             )}

// // //                                         </div>
// // //                                     </div>
// // //                                     )}
// // //                                 </div>

// // //                                 <div className='form_builder_build'>
// // //                                     <div id='bg_change' className="form-builder-wrp email-temp" >
// // //                                         <div className='btn-email-templates'>
// // //                                             <button className={`btn-templates ${(viewMode === 'desktop' || emailWidth === '800px') && emailWidth !== '400px' ? 'active' : ''}`} onClick={() => toggleViewMode('desktop')}>
// // //                                                 <img src={desk} alt="Desktop" /> Desktop
// // //                                             </button>
// // //                                             <button className={`btn-templates ${(viewMode === 'mobile' || emailWidth === '400px') && emailWidth !== '800px' ? 'active' : ''}`} onClick={() => toggleViewMode('mobile')}>
// // //                                                 <img src={phonem} alt="Mobile" /> Mobile
// // //                                             </button>
// // //                                         </div>

// // //                                         <div
// // //                                             className="form-builder email-template"
// // //                                             ref={formBuilderRef}
// // //                                             style={{
// // //                                                 backgroundColor,
// // //                                                 width: emailWidth,
// // //                                                 textAlign,
// // //                                                 padding: `${templatePadding}px`,
// // //                                                 borderRadius: `${borderRadious}px`,
// // //                                                 backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
// // //                                                 backgroundSize: 'cover',
// // //                                                 backgroundPosition: 'center',
// // //                                                 margin: 'auto',
// // //                                                 fontFamily
// // //                                             }}
// // //                                         >
// // //                                             {fields.length === 0 ? (
// // //                                                 <div>

// // //                                                     <div className="builder-block-img-forms">
// // //                                                         <div className='builder_block_blank'>
// // //                                                             <img src={emailtemp} alt="Email Template" />
// // //                                                             <div className='builder-block-img-forms-paragraph'>
// // //                                                                 <p>Let's create the Email.</p>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             ) : (
// // //                                                 <>
// // //                                                     {fields
// // //                                                         .filter((field) => field && field.id && field.type)
// // //                                                         .map((field) => {
// // //                                                             console.log('Rendering field:', field);
// // //                                                             if (field.type === 'heading') {
// // //                                                                 const HeadingTag = field.headingLevel || 'h1';

// // //                                                                 return (
// // //                                                                     <div
// // //                                                                         key={field.id}
// // //                                                                         onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                     >
// // //                                                                         <div className='email-input-field'
// // //                                                                             style={{
// // //                                                                                 backgroundColor: field.headingbg,
// // //                                                                                 borderWidth: `${field.headingBorderWidth}px`,
// // //                                                                                 borderStyle: field.headingBorderStyle,
// // //                                                                                 borderColor: field.headingBorderColor,
// // //                                                                                 backgroundImage: field.headingbgImage
// // //                                                                                     ? `url(${field.headingbgImage})`
// // //                                                                                     : `url(${hdbg})`,
// // //                                                                                 backgroundRepeat: 'no-repeat',
// // //                                                                                 backgroundSize: 'cover',
// // //                                                                                 width: `${field.bannerImageWidth}%`,
// // //                                                                                 height: field.bannerImageHeight || '400px',
// // //                                                                                 position: 'relative'
// // //                                                                             }}
// // //                                                                         >
// // //                                                                             <div style={{
// // //                                                                                 position: 'absolute', top: '40%',
// // //                                                                                 width: '100%',
// // //                                                                                 textAlign: field.headingTextAlign || '',
// // //                                                                                 padding: `${field.headingPadding}px`,
// // //                                                                             }}>
// // //                                                                                 {React.createElement(HeadingTag, {
// // //                                                                                     style: {
// // //                                                                                         fontWeight: field.headingFontWeight,
// // //                                                                                         fontSize: `${field.headingFontSize || 40}px`,
// // //                                                                                         color: field.headingColor,
// // //                                                                                         letterSpacing: `${field.headingLetterSpacing}px`,
// // //                                                                                     }
// // //                                                                                 }, field.headingText || field.value)}

// // //                                                                                 {(field.editorContent || editorValue) && (
// // //                                                                                     <div
// // //                                                                                         className="heading-editor-content"
// // //                                                                                         style={{ fontSize: '20px', margin: '20px 0' }}
// // //                                                                                         dangerouslySetInnerHTML={{
// // //                                                                                             __html: field.editorContent || editorValue || 'Its a numbers game'
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 )}
// // //                                                                                 <a href={field.headingUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
// // //                                                                                     <button
// // //                                                                                         onClick={(e) => {
// // //                                                                                             e.preventDefault();
// // //                                                                                             console.log("Button clicked, but no navigation.");
// // //                                                                                         }}
// // //                                                                                         style={{
// // //                                                                                             background: field.headerbtnbg,
// // //                                                                                             color: field.headerbtncolor,
// // //                                                                                             height: `${field.headingbtnheight}px`,
// // //                                                                                             width: `${field.headingbtnwidth}px`,
// // //                                                                                             fontSize: `${field.headingbtnFontSize}px`,
// // //                                                                                             borderRadius: `${field.headingbtnradious}px`,
// // //                                                                                             padding: `${field.headingbtnPadding}px`,
// // //                                                                                             borderWidth: `${field.headingbtnBorderWidth}px`,
// // //                                                                                             borderStyle: field.headingbtnBorderStyle,
// // //                                                                                             borderColor: field.headingbtnBorderColor,
// // //                                                                                         }}
// // //                                                                                     >
// // //                                                                                         {field.headerbtn}
// // //                                                                                     </button>
// // //                                                                                 </a>

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-radio-btn email'>
// // //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                     <img src={delete1} alt="delete" />
// // //                                                                                 </button>
// // //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                     <img src={maximizesize} alt="copy" />
// // //                                                                                 </button>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }
// // //                                                             if (field.type === 'description') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}

// // //                                                                     >
// // //                                                                         <div style={{
// // //                                                                             backgroundColor: field.descriptionbg,
// // //                                                                             padding: `${field.descriptionPadding}px`,
// // //                                                                         }}>
// // //                                                                             <p style={{
// // //                                                                                 fontSize: `${field.descritionFontSize}px`,
// // //                                                                                 letterSpacing: `${field.descriptionLetterSpacing}px`,
// // //                                                                                 textAlign: field.descriptionTextAlign || '',
// // //                                                                                 borderWidth: `${field.descriptionBorderWidth}px`,
// // //                                                                                 borderStyle: field.descriptionBorderStyle,
// // //                                                                                 borderColor: field.descriptionBorderColor,
// // //                                                                                 fontWeight: field.descritionFontWeight,
// // //                                                                                 color: field.descritionColor
// // //                                                                             }}>{field.descriptionText || field.value || ''}</p>

// // //                                                                         </div>
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'images') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                     >
// // //                                                                         <div className='email_field-images'
// // //                                                                             style={{
// // //                                                                                 textAlign: field.imgTextAlign ? field.imgTextAlign : '',
// // //                                                                                 backgroundColor: field.imgbg,
// // //                                                                                 borderWidth: `${field.imgBorderWidth}px`,
// // //                                                                                 borderStyle: field.imgBorderStyle,
// // //                                                                                 borderColor: field.imgBorderColor,
// // //                                                                             }}>

// // //                                                                             <img src={field.value || imghd} alt="Dynamic" style={{
// // //                                                                                 width: `${field.imgWidth}%`,
// // //                                                                                 padding: `${field.imgPadding}px`,
// // //                                                                             }} />

// // //                                                                         </div>

// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }
// // //                                                             if (field.type === 'divider') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                     >
// // //                                                                         <hr style={{
// // //                                                                             border: `1px solid ${field.dividerColor}`, width: `${field.dividerWidth}%`,
// // //                                                                             height: `${field.dividerheight}px`
// // //                                                                         }} />
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'split') {
// // //                                                                 const isImageUploaded = field.add === 'image' && field.value.startsWith('data:image');
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field split-width ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                         style={{
// // //                                                                             width: field.width,
// // //                                                                             backgroundColor: field.splitbg,
// // //                                                                             padding: `${field.splitPadding}px`,
// // //                                                                             border: '1px solid #B5B7C0',
// // //                                                                             height: '300px',
// // //                                                                             display: 'flex',
// // //                                                                             position: 'relative',
// // //                                                                             textAlign: field.splitTextAlin
// // //                                                                         }}
// // //                                                                     >
// // //                                                                         {field.add === 'image' ? (
// // //                                                                             <img
// // //                                                                                 src={isImageUploaded ? field.value : imghd1}
// // //                                                                                 alt="Uploaded Preview"
// // //                                                                                 style={{ width: '100%', height: 'auto' }}
// // //                                                                             />

// // //                                                                         ) : (
// // //                                                                             <div style={{ position: 'absolute', top: '40%' }}>
// // //                                                                                 <div dangerouslySetInnerHTML={{ __html: field.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers ...' }} />
// // //                                                                             </div>
// // //                                                                         )}
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'richtext') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                     >
// // //                                                                         <div style={{ textAlign: field.richTextAlign }} dangerouslySetInnerHTML={{ __html: field.content || 'Captivate customers with' }} />
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }
// // //                                                             if (field.type === 'spacer') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                     >
// // //                                                                         <div className='spacer-height-show' style={{ height: `${field.spacerHeight}px`, backgroundColor: field.spacerbg }}></div>
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );

// // //                                                             }
// // //                                                             if (field.type === 'video') {

// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                     >
// // //                                                                         <div className='email-tempalte-video-show' style={{ padding: `${field.videoPadding}px`, borderWidth: `${field.videoBorderWidth}px`, borderStyle: field.videoBorderStyle, borderColor: field.videoBorderColor }}>
// // //                                                                             {field.value && getVideoEmbedUrl(field.value) ? (
// // //                                                                                 <iframe
// // //                                                                                     height="250px"
// // //                                                                                     width="500px"
// // //                                                                                     src={getVideoEmbedUrl(field.value)}
// // //                                                                                     title="Video Preview"
// // //                                                                                     frameBorder="0"
// // //                                                                                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// // //                                                                                     allowFullScreen
// // //                                                                                 ></iframe>) : (
// // //                                                                                 <div className='email-tempalte-img'>
// // //                                                                                     <img src={videoplay} alt="" />
// // //                                                                                 </div>
// // //                                                                             )}
// // //                                                                         </div>
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>

// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'button') {
// // //                                                                 return (
// // //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field leftbtn ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         ref={emailFieldRef}
// // //                                                                     >
// // //                                                                         <a href={field.buttonUrll}
// // //                                                                             onClick={(event) => {
// // //                                                                                 event.preventDefault();
// // //                                                                                 console.log("Button clicked!");
// // //                                                                             }}
// // //                                                                         >
// // //                                                                             <button
// // //                                                                                 type="button"
// // //                                                                                 style={{
// // //                                                                                     fontSize: `${field.buttonFontSize}px`,
// // //                                                                                     color: field.buttonTextColor,
// // //                                                                                     backgroundColor: field.buttonColor,
// // //                                                                                     width: `${field.buttonWidth}px`,
// // //                                                                                     height: `${field.buttonHeight}px`,
// // //                                                                                     padding: `${field.buttonPadding}px`,
// // //                                                                                     borderWidth: `${field.buttonBorderWidth}px`,
// // //                                                                                     borderStyle: field.buttonBorderStyle,
// // //                                                                                     borderColor: field.buttonBorderColor,
// // //                                                                                     letterSpacing: `${field.buttonLetterSpacing}px`,
// // //                                                                                     borderRadius: `${field.buttonradious}px`
// // //                                                                                 }}
// // //                                                                             >
// // //                                                                                 {field.buttonLabel}
// // //                                                                             </button>
// // //                                                                         </a>

// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'html convert') {
// // //                                                                 return (
// // //                                                                     <div className="form-builder-and-preview">
// // //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                             className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                             ref={emailFieldRef}
// // //                                                                         >
// // //                                                                             <div>
// // //                                                                                 <div style={{ color: field.htmlColor, fontSize: `${field.htmlFontSize}px`, padding: `${field.htmlPadding}px` }}
// // //                                                                                     className="preview-content"
// // //                                                                                     dangerouslySetInnerHTML={{ __html: field.value || field.htmltext}}
// // //                                                                                 />
// // //                                                                                 <div className='form-builder-radio-btn email'>
// // //                                                                                     <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                         <img src={delete1} alt="delete" />
// // //                                                                                     </button>
// // //                                                                                     <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                         <img src={maximizesize} alt="copy" />
// // //                                                                                     </button>
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }
// // //                                                             if (field.type === 'Multicolumn') {
// // //                                                                 console.log("Field Data:", field)
// // //                                                                 console.log("Column Datas:", field.columnData);

// // //                                                                 return (
// // //                                                                     <div key={field.id}
// // //                                                                         onClick={() => handleFieldClick(field.id)}
// // //                                                                         className={`email_field columns-container ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                         data-columns={field.columnCount}
// // //                                                                     >

// // //                                                                         {Array.from({ length: field.columnCount }, (_, index) => (
// // //                                                                             <div
// // //                                                                                 key={index}
// // //                                                                                 className={`column ${field.selectedColumn === index ? 'active-column' : ''}`}
// // //                                                                                 onClick={(e) => handleColumnClick(field.id, index)}
// // //                                                                                 style={{
// // //                                                                                     border: field.selectedColumn === index ? '2px solid red' : '1px solid gray',
// // //                                                                                     cursor: 'pointer',
// // //                                                                                 }}
// // //                                                                             >
// // //                                                                                 {field.columnData && field.columnData[index] ? (
// // //                                                                                     <>
// // //                                                                                         {console.log("valuess", field.columnData[index])}
// // //                                                                                         {field.columnData[index].image && (
// // //                                                                                             <img
// // //                                                                                                 src={field.columnData[index].image}
// // //                                                                                                 alt={`Uploaded for Column ${index + 1}`}
// // //                                                                                                 style={{ width: '100px', height: '100px', marginTop: '10px' }}
// // //                                                                                             />
// // //                                                                                         )}

// // //                                                                                         {field.columnData[index].content && (
// // //                                                                                             <div
// // //                                                                                                 dangerouslySetInnerHTML={{
// // //                                                                                                     __html: field.columnData[index].content,
// // //                                                                                                 }}
// // //                                                                                             />
// // //                                                                                         )}
// // //                                                                                     </>
// // //                                                                                 ) : (

// // //                                                                                     columnImages[`${field.id}-${index}`] || editorValues[`${field.id}-${index}`] ? (
// // //                                                                                         <>

// // //                                                                                             {columnImages[`${field.id}-${index}`] && (
// // //                                                                                                 <img
// // //                                                                                                     src={columnImages[`${field.id}-${index}`]}
// // //                                                                                                     alt={`Uploaded for Column ${index + 1}`}
// // //                                                                                                     style={{ width: '100px', height: '100px', marginTop: '10px' }}
// // //                                                                                                 />
// // //                                                                                             )}

// // //                                                                                             {editorValues[`${field.id}-${index}`] && (
// // //                                                                                                 <div
// // //                                                                                                     dangerouslySetInnerHTML={{
// // //                                                                                                         __html: editorValues[`${field.id}-${index}`],
// // //                                                                                                     }}
// // //                                                                                                 />
// // //                                                                                             )}
// // //                                                                                         </>
// // //                                                                                     ) : (

// // //                                                                                         <div style={{ color: 'gray' }}>
// // //                                                                                             <h2>Column {index + 1}</h2>
// // //                                                                                             Elevate your online store with our easy-to-use Text Box feature.
// // //                                                                                             It's a game-changer for personalization, allowing customers to add their
// // //                                                                                             special touch directly from a user-friendly drop-down menu.
// // //                                                                                         </div>
// // //                                                                                     )
// // //                                                                                 )}
// // //                                                                             </div>
// // //                                                                         ))}
// // //                                                                         <div className='form-builder-radio-btn email'>
// // //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                 <img src={delete1} alt="delete" />
// // //                                                                             </button>
// // //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                 <img src={maximizesize} alt="copy" />
// // //                                                                             </button>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'product' && field.products) {
// // //                                                                 return (
// // //                                                                     <div onClick={() => handleAddProductToSelected(field.id, field.title, field.image, field.products)}>
// // //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                             className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                             ref={emailFieldRef}
// // //                                                                         >
// // //                                                                             <div className={`template-products ${productsPerRow ? `row-${productsPerRow}` : 'row-3'} ${viewMode === 'mobile' ? 'mobile' : ''}`}
// // //                                                                                 style={{
// // //                                                                                     padding: `${field.productPadding}px`,
// // //                                                                                     backgroundColor: field.productbg,
// // //                                                                                     borderWidth: `${field.productBorderWidth}px`,
// // //                                                                                     borderStyle: field.productBorderStyle,
// // //                                                                                     borderColor: field.productBorderColor,
// // //                                                                                     fontSize: `${field.productFontSize}px`,
// // //                                                                                     color: field.productTextColor,

// // //                                                                                 }}
// // //                                                                             >
// // //                                                                                 {field.products.map((product) => (
// // //                                                                                     <div className='product-show' key={product.id}>

// // //                                                                                         {product.images && product.images.length > 0 && (
// // //                                                                                             <div className="images-gallery">
// // //                                                                                                 <img
// // //                                                                                                     src={product.images[0].src}
// // //                                                                                                     alt={product.images[0].alt || 'Product Image'}
// // //                                                                                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
// // //                                                                                                 />
// // //                                                                                             </div>
// // //                                                                                         )}
// // //                                                                                         <div>
// // //                                                                                             <h4 style={{ letterSpacing: `${field.productLetterSpacing}px`, fontWeight: field.productWeight, }}>{product.title}</h4>
// // //                                                                                             {showPrice && product.variants && product.variants.length > 0 && (
// // //                                                                                                 <p style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}> ${product.variants[0].price}</p>
// // //                                                                                             )}
// // //                                                                                         </div>

// // //                                                                                         {showbtnn && (
// // //                                                                                             <a href={`https://${shop}/admin/products?selectedView=all`} target="_blank" rel="noopener noreferrer">
// // //                                                                                                 <button
// // //                                                                                                     style={{
// // //                                                                                                         fontSize: `${field.productfontSize}px`,
// // //                                                                                                         width: `${field.productwidth}px`,
// // //                                                                                                         height: `${field.productheight}px`,
// // //                                                                                                         backgroundColor: field.productbackgroundColor,
// // //                                                                                                         borderWidth: `${field.productbtnBorderWidth}px`,
// // //                                                                                                         borderStyle: field.productbtnBorderStyle,
// // //                                                                                                         borderColor: field.productbtnBorderColor,
// // //                                                                                                         color: field.productbtnbg,
// // //                                                                                                         borderRadius: `${field.productradious}px`,
// // //                                                                                                     }}
// // //                                                                                                     className='show-bnt-prodcut'>{field.productLabel}</button>
// // //                                                                                             </a>
// // //                                                                                         )}
// // //                                                                                     </div>
// // //                                                                                 ))}
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-radio-btn email'>
// // //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                     <img src={delete1} alt="delete" />
// // //                                                                                 </button>
// // //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                     <img src={maximizesize} alt="copy" />
// // //                                                                                 </button>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 );
// // //                                                             }

// // //                                                             if (field.type === 'socalicon') {
// // //                                                                 return (
// // //                                                                     <div onClick={() => handleEdit(field)}>
// // //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// // //                                                                             className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
// // //                                                                             ref={emailFieldRef}

// // //                                                                         >
// // //                                                                             <div style={{ textAlign: field.socaliconTextAlign || '', padding: `${field.socalIconPadding}px` }} >
// // //                                                                                 <div className="social-icons" >
// // //                                                                                     {field.icons.facebook && field.icons.facebook.url && !field.icons.facebook.isHidden && (
// // //                                                                                         <a href={field.icons.facebook.url} onClick={(e) => e.preventDefault()}>
// // //                                                                                             <img src={facebook} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// // //                                                                                         </a>
// // //                                                                                     )}
// // //                                                                                     {field.icons.twitter && field.icons.twitter.url && !field.icons.twitter.isHidden && (
// // //                                                                                         <a href={field.icons.twitter.url} onClick={(e) => e.preventDefault()}>
// // //                                                                                             <img src={twitter} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// // //                                                                                         </a>
// // //                                                                                     )}
// // //                                                                                     {field.icons.instagram && field.icons.instagram.url && !field.icons.instagram.isHidden && (
// // //                                                                                         <a href={field.icons.instagram.url} onClick={(e) => e.preventDefault()}>
// // //                                                                                             <img src={instagram} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// // //                                                                                         </a>
// // //                                                                                     )}
// // //                                                                                     {field.customIcons.map((icon, index) =>
// // //                                                                                         icon.url && !icon.isHidden ? (
// // //                                                                                             <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
// // //                                                                                                 <img src={icon.src} alt={`Custom Icon ${index}`} style={{ width: `${socalIconWidth}px`, }} />
// // //                                                                                             </a>
// // //                                                                                         ) : null
// // //                                                                                     )}
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-radio-btn email'>
// // //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// // //                                                                                     <img src={delete1} alt="delete" />
// // //                                                                                 </button>
// // //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// // //                                                                                     <img src={maximizesize} alt="copy" />
// // //                                                                                 </button>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                 )
// // //                                                             }
// // //                                                         })
// // //                                                     }

// // //                                                 </>
// // //                                             )}
// // //                                         </div>
// // //                                     </div>
// // //                                 </div>
// // //                                 <div className='form-builder-change-pro'>
// // //                                     <div className='email-template-input-setting'>
// // //                                         {emailFieldPopup && (<div className='form-builder-change-propertites' ref={popupRef}>
// // //                                             <div className='form-builder-change_show_all'>
// // //                                                 <div className='form_qucik'>
// // //                                                     <p>Quick setup Settings</p>
// // //                                                 </div>
// // //                                                 <div className='form_build_propertities'>

// // //                                                     {fields.length > 0 && selectedFieldId && (
// // //                                                         <div className='quick-setup-settings'>
// // //                                                             {fields.map((field) => {
// // //                                                                 if (field.id === selectedFieldId && field.type === 'Multicolumn') {
// // //                                                                     return (
// // //                                                                         <div>
// // //                                                                             <div className="form-builder-chaneging-wrap">
// // //                                                                                 <div className="form-builder-chaneging-wrap select">
// // //                                                                                     <label>Select Columns</label>
// // //                                                                                     <div className="column-options">
// // //                                                                                         <select
// // //                                                                                             value={columnCount}
// // //                                                                                             onChange={(e) => handleColumnSelection(e.target.value)}
// // //                                                                                         >
// // //                                                                                             {[1, 2, 3, 4, 5, 6].map((column) => (
// // //                                                                                                 <option key={column} value={column}>
// // //                                                                                                     {column} Columns
// // //                                                                                                 </option>
// // //                                                                                             ))}
// // //                                                                                         </select>
// // //                                                                                     </div>
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                             <div className="form-builder-chaneging-wrap updatemulti">
// // //                                                                                 {field.columnData && field.selectedColumn !== undefined ? (
// // //                                                                                     <>
// // //                                                                                         {field.columnData[field.selectedColumn]?.image ? (
// // //                                                                                             <div>
// // //                                                                                                 <div className="form-builder-chaneging-wrap file">
// // //                                                                                                     <label>Update Image</label>
// // //                                                                                                     <input
// // //                                                                                                         type="file"
// // //                                                                                                         accept="image/*"
// // //                                                                                                         onChange={(e) =>
// // //                                                                                                             handleImageUpload1(e, popupFieldId, fields.find((f) => f.id === popupFieldId)?.selectedColumn)
// // //                                                                                                         }
// // //                                                                                                         style={{ marginTop: '10px' }}
// // //                                                                                                     />
// // //                                                                                                 </div>
// // //                                                                                                 <img
// // //                                                                                                     src={field.columnData[field.selectedColumn].image}
// // //                                                                                                     alt="Selected Column Image"
// // //                                                                                                     style={{
// // //                                                                                                         width: '150px',
// // //                                                                                                         height: '150px',
// // //                                                                                                         marginBottom: '10px',
// // //                                                                                                     }}
// // //                                                                                                 />
// // //                                                                                                 <button
// // //                                                                                                     onClick={() =>
// // //                                                                                                         handleRemoveImage1(
// // //                                                                                                             popupFieldId,
// // //                                                                                                             fields.find((f) => f.id === popupFieldId)?.selectedColumn
// // //                                                                                                         )
// // //                                                                                                     }
// // //                                                                                                     style={{
// // //                                                                                                         display: 'block',
// // //                                                                                                         marginTop: '10px',
// // //                                                                                                         padding: '5px 10px',
// // //                                                                                                         cursor: 'pointer',
// // //                                                                                                     }}
// // //                                                                                                 >
// // //                                                                                                     Remove Image
// // //                                                                                                 </button>
// // //                                                                                             </div>
// // //                                                                                         ) : (
// // //                                                                                             field.columnData[field.selectedColumn]?.content && (
// // //                                                                                                 <div>
// // //                                                                                                     <div className="form-builder-chaneging-wrap file">
// // //                                                                                                         <label>Add Image</label>
// // //                                                                                                         <input
// // //                                                                                                             type="file"
// // //                                                                                                             accept="image/*"
// // //                                                                                                             onChange={(e) =>
// // //                                                                                                                 handleImageUpload1(e, popupFieldId, fields.find((f) => f.id === popupFieldId)?.selectedColumn)
// // //                                                                                                             }
// // //                                                                                                             style={{ marginTop: '10px' }}
// // //                                                                                                         />
// // //                                                                                                     </div>
// // //                                                                                                 </div>
// // //                                                                                             )
// // //                                                                                         )}

// // //                                                                                         <ReactQuill
// // //                                                                                             value={field.columnData[field.selectedColumn].content}
// // //                                                                                             modules={{ toolbar: toolbarOptions }}
// // //                                                                                             onChange={(value) =>
// // //                                                                                                 handleContentChange(value, popupFieldId, fields.find((f) => f.id === popupFieldId)?.selectedColumn)
// // //                                                                                             }
// // //                                                                                         />

// // //                                                                                     </>
// // //                                                                                 ) : (
// // //                                                                                     <p></p>
// // //                                                                                 )}
// // //                                                                             </div>

// // //                                                                             <div className="form-builder-chaneging-wrap">
// // //                                                                                 <div className="form-builder-chaneging-wrap file">
// // //                                                                                     <label>
// // //                                                                                         Column{' '}
// // //                                                                                         {fields.find((f) => f.id === popupFieldId)?.selectedColumn + 1}{' '}
// // //                                                                                         Selected
// // //                                                                                     </label>
// // //                                                                                     <input
// // //                                                                                         type="file"
// // //                                                                                         accept="image/*"
// // //                                                                                         onChange={(e) =>
// // //                                                                                             handleImageUploaded(
// // //                                                                                                 e,
// // //                                                                                                 popupFieldId,
// // //                                                                                                 fields.find((f) => f.id === popupFieldId)?.selectedColumn
// // //                                                                                             )
// // //                                                                                         }
// // //                                                                                     />


// // //                                                                                     {columnImages[
// // //                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// // //                                                                                     ] && (
// // //                                                                                             <div>
// // //                                                                                                 <img
// // //                                                                                                     src={
// // //                                                                                                         columnImages[
// // //                                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// // //                                                                                                         ]
// // //                                                                                                     }
// // //                                                                                                     alt="Image Preview"
// // //                                                                                                     style={{
// // //                                                                                                         maxWidth: '100%',
// // //                                                                                                         maxHeight: '200px',
// // //                                                                                                         marginTop: '10px',
// // //                                                                                                     }}
// // //                                                                                                 />
// // //                                                                                                 <button
// // //                                                                                                     onClick={() =>
// // //                                                                                                         handleRemoveImage(
// // //                                                                                                             popupFieldId,
// // //                                                                                                             fields.find((f) => f.id === popupFieldId)?.selectedColumn
// // //                                                                                                         )
// // //                                                                                                     }
// // //                                                                                                     style={{
// // //                                                                                                         display: 'block',
// // //                                                                                                         marginTop: '10px',
// // //                                                                                                         padding: '5px 10px',
// // //                                                                                                         cursor: 'pointer',
// // //                                                                                                     }}
// // //                                                                                                 >
// // //                                                                                                     Remove Image
// // //                                                                                                 </button>
// // //                                                                                             </div>
// // //                                                                                         )}
// // //                                                                                 </div>

// // //                                                                                 <ReactQuill
// // //                                                                                     value={
// // //                                                                                         editorValues[
// // //                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// // //                                                                                         ] || ''
// // //                                                                                     }
// // //                                                                                     onChange={(value) =>
// // //                                                                                         handleEditorChangeed(
// // //                                                                                             value,
// // //                                                                                             popupFieldId,
// // //                                                                                             fields.find((f) => f.id === popupFieldId)?.selectedColumn
// // //                                                                                         )
// // //                                                                                     }
// // //                                                                                     modules={{ toolbar: toolbarOptions }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === 'richtext') {
// // //                                                                     return (
// // //                                                                         <div>
// // //                                                                             <div >
// // //                                                                                 <ReactQuill
// // //                                                                                     value={editorValueed || field.content || 'Captivate customers with'}
// // //                                                                                     onChange={handleEditChange}
// // //                                                                                     modules={{ toolbar: toolbarOptions }}
// // //                                                                                 />

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.richTextAlign}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, richTextAlign: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     )
// // //                                                                 }
// // //                                                                 if (field.id === selectedFieldId && field.type === 'product') {
// // //                                                                     return (
// // //                                                                         <div>

// // //                                                                             <div>
// // //                                                                                 <div className="show-select-product">
// // //                                                                                     <h3>Products</h3>
// // //                                                                                     {productTitles.length > 0 ? (
// // //                                                                                         productTitles.map((title, index) => (
// // //                                                                                             <div className='show-product-details' key={index}>
// // //                                                                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
// // //                                                                                                     {productImage[index] && (
// // //                                                                                                         <img
// // //                                                                                                             src={productImage[index]}
// // //                                                                                                             alt={title}
// // //                                                                                                             style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
// // //                                                                                                         />
// // //                                                                                                     )}

// // //                                                                                                     <h4>{title.length > 35 ? title.slice(0, 35) + '...' : title}</h4>
// // //                                                                                                 </div>
// // //                                                                                                 <div style={{ cursor: "pointer" }} onClick={() => handleRemoveProductFromForm(index)}>
// // //                                                                                                     <img src={deletep} alt="" style={{ width: '70%' }} />
// // //                                                                                                 </div>
// // //                                                                                             </div>
// // //                                                                                         ))
// // //                                                                                     ) : (
// // //                                                                                         <p>No products selected</p>
// // //                                                                                     )}

// // //                                                                                     <button className='product-btn-addproduct' onClick={AddProduct}>Add Product</button>
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                             <div className='product-detalis-all'>
// // //                                                                                 <h3>Product details</h3>
// // //                                                                                 <label className="custom-checkbox">
// // //                                                                                     <input
// // //                                                                                         type="checkbox"
// // //                                                                                         checked={showPrice}
// // //                                                                                         onChange={togglePrice}
// // //                                                                                     />
// // //                                                                                     Price
// // //                                                                                 </label>
// // //                                                                                 <label className="custom-checkbox">
// // //                                                                                     <input
// // //                                                                                         type="checkbox"
// // //                                                                                         checked={showbtnn}
// // //                                                                                         onChange={togglebtnn}
// // //                                                                                     />
// // //                                                                                     Button
// // //                                                                                 </label>
// // //                                                                             </div>
// // //                                                                             <div className="product-detalis-all">
// // //                                                                                 <h3>Product layout</h3>
// // //                                                                                 <div className='form-builder-chaneging-wrap select'>
// // //                                                                                     <select onChange={handleProductsPerRowChange} defaultValue={3}>
// // //                                                                                         {[...Array(6).keys()].map(i => (
// // //                                                                                             <option key={i + 1} value={i + 1}>{i + 1} per row</option>
// // //                                                                                         ))}
// // //                                                                                     </select>
// // //                                                                                 </div>

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Padding (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.productPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Background Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.productbg || '#ffffff'}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.productBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.productBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.productBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Font Size (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.productFontSize}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productFontSize: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.productTextColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productTextColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Font-Weight</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.productWeight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productWeight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}

// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Letter Spacing</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.productLetterSpacing}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, productLetterSpacing: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Letter Spacing"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap all-btn'>
// // //                                                                                 <label> Button</label>
// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <label>Button Label</label>
// // //                                                                                     <input
// // //                                                                                         type="text"
// // //                                                                                         value={field.productLabel}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productLabel: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap number'>
// // //                                                                                     <label>Font Size (px)</label>
// // //                                                                                     <input
// // //                                                                                         type="number"
// // //                                                                                         value={field.productfontSize}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productfontSize: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap number'>
// // //                                                                                     <label>Width (px)</label>
// // //                                                                                     <input
// // //                                                                                         type="number"
// // //                                                                                         value={field.productwidth}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productwidth: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>

// // //                                                                                 <div className='form-builder-chaneging-wrap number'>
// // //                                                                                     <label>Height (px)</label>
// // //                                                                                     <input
// // //                                                                                         type="number"
// // //                                                                                         value={field.productheight}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productheight: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap color'>
// // //                                                                                     <label>Background Color</label>
// // //                                                                                     <input
// // //                                                                                         type="color"
// // //                                                                                         value={field.productbackgroundColor}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productbackgroundColor: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap color'>
// // //                                                                                     <label>Border Color</label>
// // //                                                                                     <input
// // //                                                                                         type="color"
// // //                                                                                         value={field.productbtnBorderColor}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productbtnBorderColor: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>

// // //                                                                                 <div className='form-builder-chaneging-wrap number' >
// // //                                                                                     <label>Border Width (px)</label>
// // //                                                                                     <input
// // //                                                                                         type="number"
// // //                                                                                         value={field.productbtnBorderWidth}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productbtnBorderWidth: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <label>Border Style</label>
// // //                                                                                     <select
// // //                                                                                         value={field.productbtnBorderStyle}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productbtnBorderStyle: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     >
// // //                                                                                         <option value="solid">Solid</option>
// // //                                                                                         <option value="dashed">Dashed</option>
// // //                                                                                         <option value="dotted">Dotted</option>
// // //                                                                                     </select>
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap color'>
// // //                                                                                     <label>Color</label>
// // //                                                                                     <input
// // //                                                                                         type="color"
// // //                                                                                         value={field.productbtnbg || '#ffffff'}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productbtnbg: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap number'>
// // //                                                                                     <label>Border-Radious</label>
// // //                                                                                     <input
// // //                                                                                         type="number"
// // //                                                                                         value={field.productradious || '#ffffff'}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, productradious: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </div>
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     )
// // //                                                                 }
// // //                                                                 if (field.id === selectedFieldId && field.type === 'heading') {
// // //                                                                     return (
// // //                                                                         <div key={field.id}>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Heading Text:</label>
// // //                                                                                 <input
// // //                                                                                     type="text"
// // //                                                                                     value={field.headingText || field.value}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingText: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Enter Heading Text"
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Heading Level:</label>
// // //                                                                                 <select
// // //                                                                                     value={field.headingLevel}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingLevel: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="h1">H1</option>
// // //                                                                                     <option value="h2">H2</option>
// // //                                                                                     <option value="h3">H3</option>
// // //                                                                                     <option value="h4">H4</option>
// // //                                                                                     <option value="h5">H5</option>
// // //                                                                                     <option value="h6">H6</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Heading Font Size:</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.headingFontSize}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingFontSize: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Font Size"
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.headingColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className="form-builder-chaneging-wrap">
// // //                                                                                 <label> Subheading</label>
// // //                                                                                 <ReactQuill
// // //                                                                                     value={editorValue || field.editorContent || 'Its a numbers game'}
// // //                                                                                     onChange={handleEditorChange}
// // //                                                                                     modules={{ toolbar: toolbarOptions }}
// // //                                                                                 />

// // //                                                                             </div>
// // //                                                                             <div className="form-builder-changing-wrap url">

// // //                                                                                 <>
// // //                                                                                     <label>Button Url:</label>
// // //                                                                                     <input
// // //                                                                                         type="url"
// // //                                                                                         value={field.headingUrl}
// // //                                                                                         onChange={(e) => handleUpdateUrl(field.id, e.target.value)}
// // //                                                                                         placeholder="Update URL"
// // //                                                                                     />

// // //                                                                                     <div className='form-builder-chaneging-wrap'>
// // //                                                                                         <label>Button Label</label>
// // //                                                                                         <input
// // //                                                                                             type="text"
// // //                                                                                             value={field.headerbtn}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headerbtn: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         />
// // //                                                                                     </div>

// // //                                                                                     <div className='form-builder-chaneging-wrap color'>
// // //                                                                                         <label>Button Background</label>
// // //                                                                                         <input
// // //                                                                                             type="color"
// // //                                                                                             value={field.headerbtnbg}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headerbtnbg: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap color'>
// // //                                                                                         <label>Border Color</label>
// // //                                                                                         <input
// // //                                                                                             type="color"
// // //                                                                                             value={field.headingbtnBorderColor}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderColor: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         />
// // //                                                                                     </div>

// // //                                                                                     <div className='form-builder-chaneging-wrap number' >
// // //                                                                                         <label>Border Width (px)</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnBorderWidth}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderWidth: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap'>
// // //                                                                                         <label>Border Style</label>
// // //                                                                                         <select
// // //                                                                                             value={field.headingbtnBorderStyle}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderStyle: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         >
// // //                                                                                             <option value="solid">Solid</option>
// // //                                                                                             <option value="dashed">Dashed</option>
// // //                                                                                             <option value="dotted">Dotted</option>
// // //                                                                                         </select>
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap color'>
// // //                                                                                         <label>Button Color</label>
// // //                                                                                         <input
// // //                                                                                             type="color"
// // //                                                                                             value={field.headerbtncolor}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headerbtncolor: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap number'>
// // //                                                                                         <label>Button Padding</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnPadding}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnPadding: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                             placeholder="Padding"
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap number'>
// // //                                                                                         <label>Button Radious</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnradious}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnradious: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                             placeholder="Padding"
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap number'>
// // //                                                                                         <label>Button Height</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnheight}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnheight: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                             placeholder="Padding"
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                     <div className='form-builder-chaneging-wrap number'>
// // //                                                                                         <label>Button Width</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnwidth}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnwidth: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                             placeholder="Padding"
// // //                                                                                         />
// // //                                                                                     </div>

// // //                                                                                     <div className='form-builder-chaneging-wrap number'>
// // //                                                                                         <label>Button Font-Size</label>
// // //                                                                                         <input
// // //                                                                                             type="number"
// // //                                                                                             value={field.headingbtnFontSize}
// // //                                                                                             onChange={(e) => {
// // //                                                                                                 setFields(prevFields =>
// // //                                                                                                     prevFields.map(f =>
// // //                                                                                                         f.id === field.id ? { ...f, headingbtnFontSize: e.target.value } : f
// // //                                                                                                     )
// // //                                                                                                 );
// // //                                                                                             }}
// // //                                                                                             placeholder="Padding"
// // //                                                                                         />
// // //                                                                                     </div>

// // //                                                                                 </>
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap image'>
// // //                                                                                 <label>Background Image</label>
// // //                                                                                 <input
// // //                                                                                     type="file"
// // //                                                                                     accept="image/*"
// // //                                                                                     onChange={(e) => handleFileChange(e, field.id)}
// // //                                                                                 />

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Image Width:</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.bannerImageWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, bannerImageWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Enter Heading Text"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className="form-builder-chaneging-wrap number">
// // //                                                                                 <label>Image Height:</label>
// // //                                                                                 <select
// // //                                                                                     value={
// // //                                                                                         field.bannerImageHeight === '100px'
// // //                                                                                             ? 'small'
// // //                                                                                             : field.bannerImageHeight === '200px'
// // //                                                                                                 ? 'medium'
// // //                                                                                                 : field.bannerImageHeight === '300px'
// // //                                                                                                     ? 'large'
// // //                                                                                                     : 'default'
// // //                                                                                     }
// // //                                                                                     onChange={(e) => {
// // //                                                                                         const selectedValue = e.target.value;
// // //                                                                                         const heightMapping = {
// // //                                                                                             default: '400px',
// // //                                                                                             small: '100px',
// // //                                                                                             medium: '200px',
// // //                                                                                             large: '300px',
// // //                                                                                         };

// // //                                                                                         setFields((prevFields) =>
// // //                                                                                             prevFields.map((f) =>
// // //                                                                                                 f.id === field.id
// // //                                                                                                     ? {
// // //                                                                                                         ...f,
// // //                                                                                                         bannerImageHeight: heightMapping[selectedValue],
// // //                                                                                                     }
// // //                                                                                                     : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="default">Default</option>
// // //                                                                                     <option value="small">Small</option>
// // //                                                                                     <option value="medium">Medium</option>
// // //                                                                                     <option value="large">Large</option>
// // //                                                                                 </select>
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap preview '>
// // //                                                                                 {field.headingbgImage && (
// // //                                                                                     <div className="image-preview">
// // //                                                                                         <img
// // //                                                                                             src={field.headingbgImage}
// // //                                                                                             alt="Background Preview"
// // //                                                                                             style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
// // //                                                                                         />
// // //                                                                                     </div>
// // //                                                                                 )}
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Background Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.headingbg || '#ffffff'}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Padding</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.headingPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Padding"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Letter Spacing</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.headingLetterSpacing}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingLetterSpacing: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Letter Spacing"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.headingTextAlign}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingTextAlign: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Font-Weight</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.headingFontWeight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingFontWeight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}

// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.headingBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.headingBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.headingBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, headingBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === 'description') {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap">
// // //                                                                             <label>Description Text</label>
// // //                                                                             <textarea
// // //                                                                                 type="text"
// // //                                                                                 value={field.descriptionText || field.value || ''}
// // //                                                                                 onChange={(e) => handleDescriptionChange(field.id, e.target.value)}
// // //                                                                                 placeholder="Enter Description"
// // //                                                                             />

// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Font Size (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.descritionFontSize}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descritionFontSize: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Font-Weight</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.descritionFontWeight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descritionFontWeight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.descritionColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descritionColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Background Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.descriptionbg || '#ffffff'}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Padding</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.descriptionPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Padding"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Letter Spacing</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.descriptionLetterSpacing}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionLetterSpacing: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Letter Spacing"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.descriptionTextAlign}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionTextAlign: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.descriptionBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.descriptionBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.descriptionBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, descriptionBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                         </div>

// // //                                                                     );
// // //                                                                 }
// // //                                                                 if (field.id === selectedFieldId && field.type === "images") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap file">
// // //                                                                             <div>

// // //                                                                                 {field.value ? (
// // //                                                                                     <div>

// // //                                                                                         <img src={field.value} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
// // //                                                                                         <button className='update-image' onClick={() => setImageFieldId(field.id)}>Update Image</button>
// // //                                                                                         <button className='update-image' onClick={() => removeField(field.id)}>Remove Image</button>
// // //                                                                                     </div>
// // //                                                                                 ) : (
// // //                                                                                     <div>

// // //                                                                                         <p></p>
// // //                                                                                         <button className='update-image' onClick={() => setImageFieldId(field.id)}>Upload Image</button>
// // //                                                                                     </div>
// // //                                                                                 )}
// // //                                                                                 {imageFieldId === field.id && (
// // //                                                                                     <input
// // //                                                                                         type="file"
// // //                                                                                         accept="image/*"
// // //                                                                                         onChange={(e) => handleImageUpload(e, field.id)}
// // //                                                                                     />
// // //                                                                                 )}
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Width</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.imgWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.imgTextAlign}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgTextAlign: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Background Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.imgbg || '#ffffff'}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Padding</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.imgPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Padding"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.imgBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.imgBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.imgBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, imgBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }
// // //                                                                 if (field.id === selectedFieldId && field.type === "divider") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap">
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Divider Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.dividerColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, dividerColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Width</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.dividerWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, dividerWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Height</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.dividerheight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, dividerheight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === "html convert") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap color">
// // //                                                                             <label>Html Convert</label>
// // //                                                                             <div className="form-builder-and-preview">
// // //                                                                                 {fields.map((field) => renderField(field))}

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.htmlColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, htmlColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Font Size (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.htmlFontSize}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, htmlFontSize: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Padding (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.htmlPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, htmlPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }
// // //                                                                 if (field.id === selectedFieldId && field.type === "split") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap color">
// // //                                                                             <div style={{ marginTop: '20px' }}>
// // //                                                                                 <label htmlFor="widthSelect">Adjust Width: </label>
// // //                                                                                 <select
// // //                                                                                     id="widthSelect"
// // //                                                                                     onChange={(e) => handleWidthChange(e.target.value)}
// // //                                                                                     value={fields.find((f) => f.id === selectedFieldId)?.width || '50%'}
// // //                                                                                 >
// // //                                                                                     <option value="25%">25%</option>
// // //                                                                                     <option value="50%">50%</option>
// // //                                                                                     <option value="75%">75%</option>
// // //                                                                                 </select>
// // //                                                                                 <div style={{ marginTop: '10px' }}>
// // //                                                                                     <label htmlFor="add">Content Type: </label>
// // //                                                                                     <select
// // //                                                                                         id="add"
// // //                                                                                         onChange={(e) =>
// // //                                                                                             setFields((prevFields) =>
// // //                                                                                                 prevFields.map((f) =>
// // //                                                                                                     f.id === selectedFieldId ? { ...f, add: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             )
// // //                                                                                         }
// // //                                                                                         value={fields.find((f) => f.id === selectedFieldId)?.add || 'text'}
// // //                                                                                     >
// // //                                                                                         <option value="text">Text</option>
// // //                                                                                         <option value="image">Image</option>
// // //                                                                                     </select>
// // //                                                                                 </div>

// // //                                                                                 <div style={{ marginTop: '10px' }} className='form-builder-chaneging-wrap file' >
// // //                                                                                     {fields.find((f) => f.id === selectedFieldId)?.add === 'text' ? (
// // //                                                                                         <div>
// // //                                                                                             {ReactQuill ? (
// // //                                                                                                 <ReactQuill
// // //                                                                                                     value={fields.find((f) => f.id === selectedFieldId)?.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers...'}
// // //                                                                                                     onChange={(value) => {
// // //                                                                                                         setFields((prevFields) =>
// // //                                                                                                             prevFields.map((f) =>
// // //                                                                                                                 f.id === selectedFieldId ? { ...f, value: value } : f
// // //                                                                                                             )
// // //                                                                                                         );
// // //                                                                                                     }}
// // //                                                                                                     modules={{ toolbar: toolbarOptions }}
// // //                                                                                                 />
// // //                                                                                             ) : (
// // //                                                                                                 <p>Loading editor...</p>
// // //                                                                                             )}
// // //                                                                                         </div>
// // //                                                                                     ) : (
// // //                                                                                         <div>
// // //                                                                                             <input
// // //                                                                                                 type="file"
// // //                                                                                                 accept="image/*"
// // //                                                                                                 onChange={(e) => {
// // //                                                                                                     const file = e.target.files[0];
// // //                                                                                                     if (file) {
// // //                                                                                                         const reader = new FileReader();
// // //                                                                                                         reader.onload = () => {
// // //                                                                                                             setFields((prevFields) =>
// // //                                                                                                                 prevFields.map((f) =>
// // //                                                                                                                     f.id === selectedFieldId
// // //                                                                                                                         ? { ...f, value: reader.result }
// // //                                                                                                                         : f
// // //                                                                                                                 )
// // //                                                                                                             );
// // //                                                                                                         };
// // //                                                                                                         reader.readAsDataURL(file);
// // //                                                                                                     }
// // //                                                                                                 }}
// // //                                                                                             />

// // //                                                                                             {fields.find((f) => f.id === selectedFieldId)?.value && (
// // //                                                                                                 <div style={{ marginTop: '10px' }}>
// // //                                                                                                     <img
// // //                                                                                                         src={fields.find((f) => f.id === selectedFieldId)?.value}
// // //                                                                                                         alt="Uploaded Preview"
// // //                                                                                                         style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', padding: '5px' }}
// // //                                                                                                     />
// // //                                                                                                 </div>
// // //                                                                                             )}
// // //                                                                                             <div style={{ marginTop: '10px' }}>
// // //                                                                                                 <button
// // //                                                                                                     onClick={() => {
// // //                                                                                                         document.querySelector('input[type="file"]').click();
// // //                                                                                                     }}
// // //                                                                                                     style={{ marginRight: '10px' }}
// // //                                                                                                 >
// // //                                                                                                     Update Image
// // //                                                                                                 </button>
// // //                                                                                                 <button
// // //                                                                                                     onClick={() => {
// // //                                                                                                         setFields((prevFields) =>
// // //                                                                                                             prevFields.map((f) =>
// // //                                                                                                                 f.id === selectedFieldId ? { ...f, value: '' } : f
// // //                                                                                                             )
// // //                                                                                                         );
// // //                                                                                                     }}
// // //                                                                                                 >
// // //                                                                                                     Remove Image
// // //                                                                                                 </button>
// // //                                                                                             </div>
// // //                                                                                         </div>
// // //                                                                                     )}
// // //                                                                                 </div>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Background color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.splitbg}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, splitbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Padding</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.splitPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, splitPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.splitTextAlin}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, splitTextAlin: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === "video") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap file">
// // //                                                                             <div className='form-builder-chaneging-wrap '>
// // //                                                                                 <label>Video Url</label>
// // //                                                                                 <input
// // //                                                                                     type="text"
// // //                                                                                     value={field.value}
// // //                                                                                     onChange={(e) => handleVideoChange(e, field.id)}
// // //                                                                                     placeholder="Enter video URL"
// // //                                                                                 />
// // //                                                                                 <iframe
// // //                                                                                     src={getVideoEmbedUrl(field.value)}
// // //                                                                                     title="Video Preview"
// // //                                                                                     frameBorder="0"
// // //                                                                                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// // //                                                                                     allowFullScreen
// // //                                                                                 ></iframe>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Padding</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.videoPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, videoPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.videoBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, videoBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.videoBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, videoBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.videoBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, videoBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === "spacer") {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="form-builder-chaneging-wrap number">
// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label htmlFor="spacer-height-input">Spacer Height (px):</label>
// // //                                                                                 <input
// // //                                                                                     id="spacer-height-input"
// // //                                                                                     type="number"
// // //                                                                                     value={field.spacerHeight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, spacerHeight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     min="0"
// // //                                                                                 />
// // //                                                                                 <p style={{ color: '#A8A8A8' }} className='spacer-height-text'>Current Spacer Height: {field.spacerHeight}px</p>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label> Spacer Background color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.spacerbg}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, spacerbg: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 if (field.id === selectedFieldId && field.type === 'button') {
// // //                                                                     return (
// // //                                                                         <div key={field.id}>

// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Button Label</label>
// // //                                                                                 <input
// // //                                                                                     type="text"
// // //                                                                                     value={field.buttonLabel}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonLabel: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Font Size (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonFontSize}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonFontSize: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Button Padding (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="text"
// // //                                                                                     value={field.buttonPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Height (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonHeight}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonHeight: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Background Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.buttonColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.buttonTextColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonTextColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>
// // //                                                                                     Button Url
// // //                                                                                     <input
// // //                                                                                         type="text"
// // //                                                                                         value={field.buttonUrll}
// // //                                                                                         onChange={(e) => {
// // //                                                                                             setFields(prevFields =>
// // //                                                                                                 prevFields.map(f =>
// // //                                                                                                     f.id === field.id ? { ...f, buttonUrll: e.target.value } : f
// // //                                                                                                 )
// // //                                                                                             );
// // //                                                                                         }}
// // //                                                                                     />
// // //                                                                                 </label>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Letter Spacing</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonLetterSpacing}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonLetterSpacing: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder="Letter Spacing"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label> Border-Radious</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonradious}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonradious: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                     placeholder=" Border-Radious"
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap color'>
// // //                                                                                 <label>Border Color</label>
// // //                                                                                 <input
// // //                                                                                     type="color"
// // //                                                                                     value={field.buttonBorderColor}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonBorderColor: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>

// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Border Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.buttonBorderWidth}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonBorderWidth: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Border Style</label>
// // //                                                                                 <select
// // //                                                                                     value={field.buttonBorderStyle}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, buttonBorderStyle: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="solid">Solid</option>
// // //                                                                                     <option value="dashed">Dashed</option>
// // //                                                                                     <option value="dotted">Dotted</option>
// // //                                                                                 </select>
// // //                                                                             </div>

// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }
// // //                                                                 if (field.type === "socalicon" && field.id === selectedFieldId) {
// // //                                                                     return (
// // //                                                                         <div key={field.id} className="description-field">

// // //                                                                             <div className="form-builder-chaneging-wrap">
// // //                                                                                 <h2>Edit Social Icons</h2>

// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <label>
// // //                                                                                         <div className='custom-checkbox socalicons'>
// // //                                                                                             <input
// // //                                                                                                 type="checkbox"
// // //                                                                                                 checked={!selectedIcons.facebook.isHidden}
// // //                                                                                                 onChange={() => handleToggleIcon('facebook')}
// // //                                                                                             />
// // //                                                                                             <i class="fa fa-facebook-square" aria-hidden="true"></i>
// // //                                                                                             Facebook URL
// // //                                                                                         </div>
// // //                                                                                         <input
// // //                                                                                             type="text"
// // //                                                                                             value={selectedIcons.facebook.url}
// // //                                                                                             onChange={(e) => handleIconUrlChange(e, 'facebook')}
// // //                                                                                             style={{ display: selectedIcons.facebook.isHidden ? 'none' : 'block' }}
// // //                                                                                         />
// // //                                                                                     </label>
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <label>
// // //                                                                                         <div className='custom-checkbox socalicons'>
// // //                                                                                             <input
// // //                                                                                                 type="checkbox"
// // //                                                                                                 checked={!selectedIcons.twitter.isHidden}
// // //                                                                                                 onChange={() => handleToggleIcon('twitter')}
// // //                                                                                             />
// // //                                                                                             <i class="fa fa-twitter" aria-hidden="true"></i>
// // //                                                                                             Twitter URL
// // //                                                                                         </div>
// // //                                                                                         <input
// // //                                                                                             type="text"
// // //                                                                                             value={selectedIcons.twitter.url}
// // //                                                                                             onChange={(e) => handleIconUrlChange(e, 'twitter')}
// // //                                                                                             style={{ display: selectedIcons.twitter.isHidden ? 'none' : 'block' }}
// // //                                                                                         />
// // //                                                                                     </label>
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <label>
// // //                                                                                         <div className='custom-checkbox socalicons'>
// // //                                                                                             <input
// // //                                                                                                 type="checkbox"
// // //                                                                                                 checked={!selectedIcons.instagram.isHidden}
// // //                                                                                                 onChange={() => handleToggleIcon('instagram')}
// // //                                                                                             />
// // //                                                                                             <i class="fa fa-instagram" aria-hidden="true"></i>
// // //                                                                                             Instagram URL
// // //                                                                                         </div>
// // //                                                                                         <input
// // //                                                                                             type="text"
// // //                                                                                             value={selectedIcons.instagram.url}
// // //                                                                                             onChange={(e) => handleIconUrlChange(e, 'instagram')}
// // //                                                                                             style={{ display: selectedIcons.instagram.isHidden ? 'none' : 'block' }}
// // //                                                                                         />
// // //                                                                                     </label>
// // //                                                                                 </div>
// // //                                                                                 <div className='form-builder-chaneging-wrap'>
// // //                                                                                     <button onClick={() => setShowFileUpload((prev) => !prev)}> + </button>
// // //                                                                                     {showFileUpload && (
// // //                                                                                         <div className='form-builder-chaneging-wrap file'>
// // //                                                                                             <input
// // //                                                                                                 type="file"
// // //                                                                                                 accept="image/*"
// // //                                                                                                 onChange={handleCustomIconUpload}
// // //                                                                                                 multiple
// // //                                                                                             />
// // //                                                                                         </div>
// // //                                                                                     )}
// // //                                                                                     {customIcons.length > 0 && (
// // //                                                                                         <div>
// // //                                                                                             {customIcons.map((icon, index) => (
// // //                                                                                                 <div key={index} className='form-builder-chaneging-wrap  '>
// // //                                                                                                     <div className='form-builder-chaneging-wrap socal'>
// // //                                                                                                         <div className='custom-checkbox'>
// // //                                                                                                             <input
// // //                                                                                                                 type="checkbox"
// // //                                                                                                                 checked={!icon.isHidden}
// // //                                                                                                                 onChange={() => toggleCustomIconVisibility(index)}
// // //                                                                                                             />

// // //                                                                                                         </div>
// // //                                                                                                         <div className='img-socal-costom'>
// // //                                                                                                             <img src={icon.src} alt={icon.name} style={{ width: "100%" }} />
// // //                                                                                                         </div>
// // //                                                                                                     </div>

// // //                                                                                                     <input
// // //                                                                                                         type="text"
// // //                                                                                                         value={icon.url}
// // //                                                                                                         onChange={(e) => handleCustomIconUrlChange(e, index)}
// // //                                                                                                         placeholder="Custom URL"
// // //                                                                                                     />

// // //                                                                                                 </div>
// // //                                                                                             ))}
// // //                                                                                         </div>
// // //                                                                                     )}
// // //                                                                                 </div>

// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Social Icon Height (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={socalIconHeight}
// // //                                                                                     onChange={(e) => setSocalIconHeight(e.target.value)}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number'>
// // //                                                                                 <label>Social Icon Width (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={socalIconWidth}
// // //                                                                                     onChange={(e) => setSocalIconWidth(e.target.value)}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap'>
// // //                                                                                 <label>Text Align </label>
// // //                                                                                 <select
// // //                                                                                     value={field.socaliconTextAlign}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, socaliconTextAlign: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 >
// // //                                                                                     <option value="">Select text align</option>
// // //                                                                                     <option value="left">left</option>
// // //                                                                                     <option value="center">center</option>
// // //                                                                                     <option value="right">right</option>
// // //                                                                                 </select>
// // //                                                                             </div>
// // //                                                                             <div className='form-builder-chaneging-wrap number' >
// // //                                                                                 <label>Padding (px)</label>
// // //                                                                                 <input
// // //                                                                                     type="number"
// // //                                                                                     value={field.socalIconPadding}
// // //                                                                                     onChange={(e) => {
// // //                                                                                         setFields(prevFields =>
// // //                                                                                             prevFields.map(f =>
// // //                                                                                                 f.id === field.id ? { ...f, socalIconPadding: e.target.value } : f
// // //                                                                                             )
// // //                                                                                         );
// // //                                                                                     }}
// // //                                                                                 />
// // //                                                                             </div>
// // //                                                                         </div>
// // //                                                                     );
// // //                                                                 }

// // //                                                                 return null;
// // //                                                             })}
// // //                                                         </div>
// // //                                                     )}
// // //                                                 </div>
// // //                                             </div>

// // //                                         </div>)}
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div className='btn_form_bulider'>
// // //                         <div className="form-submission-wrp">
// // //                             <button className="cancle-form-btn" >Cancle</button>
// // //                         </div>
// // //                         <div className="form-submission-wrp">
// // //                             <button className="create-form-btn action_btn" onClick={createOrUpdateForm} >Save</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //             </div>
// // //             <div className='form-builder-wrap-popup-inputs'>
// // //                 <div className="form-builder-prodcut-all">
// // //                     {isPopupOpen && (
// // //                         <div className="popup ">
// // //                             <div className="popup-content product">
// // //                                 <button className="procduct-canclebtn" onClick={handleClosePopup}>
// // //                                     <img src={productcancle} />
// // //                                 </button>
// // //                                 <div className="product-list">
// // //                                     {currentProducts.length > 0 ? (
// // //                                         currentProducts.map((product) => (
// // //                                             <div key={product.id} className="product-item">
// // //                                                 <div className='product-item-flex'>
// // //                                                     <div className='custom-checkbox'>
// // //                                                         <input
// // //                                                             type="checkbox"
// // //                                                             checked={selectedProducts.some((p) => p.id === product.id)}
// // //                                                             onChange={(e) => handleProductClick(product, e.target.checked)}
// // //                                                         />
// // //                                                     </div>
// // //                                                     <div className='product-itm-all-inline'>
// // //                                                         {product.images && product.images.length > 0 && (
// // //                                                             <div className="images-galley">
// // //                                                                 <img
// // //                                                                     src={product.images[0].src}
// // //                                                                     alt={product.images[0].alt || 'Product Image'}

// // //                                                                 />
// // //                                                             </div>
// // //                                                         )}
// // //                                                         <div className='product-itm-all-prices'>
// // //                                                             <h3>{product.title}</h3>
// // //                                                             {product.variants && product.variants.length > 0 &&
// // //                                                                 (<p className='price-product-all'>Price: ${product.variants[0].price}</p>)}
// // //                                                         </div>
// // //                                                     </div>

// // //                                                 </div>


// // //                                             </div>
// // //                                         ))
// // //                                     ) : (
// // //                                         <p>No products available.</p>
// // //                                     )}
// // //                                 </div>

// // //                                 {totalPages > 1 && (
// // //                                     <div className="pagination">
// // //                                         <div className='show-all enteries'>
// // //                                             Showing data {currentProducts.length} of {products.length} products
// // //                                         </div>
// // //                                         <nav>
// // //                                             <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
// // //                                                 <li>
// // //                                                     <button
// // //                                                         type="button"
// // //                                                         disabled={currentPage === 1}
// // //                                                         onClick={() => handlePageChange(currentPage - 1)}
// // //                                                     >
// // //                                                         <img src={left} alt="Previous" />
// // //                                                     </button>
// // //                                                 </li>
// // //                                                 {generatePageNumbers().map((page, index) => (
// // //                                                     <li key={index} aria-current={currentPage === page ? 'page' : undefined}>
// // //                                                         {page === '...' ? (
// // //                                                             <span>...</span>
// // //                                                         ) : (
// // //                                                             <button
// // //                                                                 type="button"
// // //                                                                 onClick={() => handlePageChange(page)}
// // //                                                                 className={`${currentPage === page ? 'active' : 'inactive'}`}
// // //                                                             >
// // //                                                                 {page}
// // //                                                             </button>
// // //                                                         )}
// // //                                                     </li>
// // //                                                 ))}
// // //                                                 <li>
// // //                                                     <button
// // //                                                         type="button"
// // //                                                         disabled={currentPage === totalPages}
// // //                                                         onClick={() => handlePageChange(currentPage + 1)}
// // //                                                     >
// // //                                                         <img src={right} alt="Next" />
// // //                                                     </button>
// // //                                                 </li>
// // //                                             </ul>
// // //                                         </nav>

// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //                 {showImagePopup && (
// // //                     <div className="popup">
// // //                         <div className="popup-content">
// // //                             <h3>Upload Image</h3>
// // //                             <input type="file" accept="image/*" onChange={handleImageUpload} />
// // //                             <button onClick={() => setShowImagePopup(false)}>Close</button>
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {showHeadingPopup && (
// // //                     <div className="popup">
// // //                         <div className="popup-content">
// // //                             <div className="options">
// // //                                 <button style={{ padding: '10px', color: 'white', background: '#FD633E', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('heading')}>Heading</button>
// // //                                 <button style={{ padding: '10px', color: 'white', background: '#F27F01', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('image')}>Image</button>
// // //                                 <button style={{ padding: '10px', color: 'white', background: '#27A196', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('content')}>Content</button>
// // //                                 <button style={{ padding: '10px', color: 'white', background: '#D9A425', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('url')}>Button URL</button>
// // //                             </div>
// // //                             {selectedOption === 'heading' && (
// // //                                 <div className="heading-section">
// // //                                     <label>
// // //                                         <input
// // //                                             type="text"
// // //                                             value={headingText}
// // //                                             onChange={(e) => setHeadingText(e.target.value)}
// // //                                             placeholder="Heading Text"
// // //                                         />
// // //                                     </label>
// // //                                     <label>
// // //                                         <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
// // //                                             <option value="h1">H1</option>
// // //                                             <option value="h2">H2</option>
// // //                                             <option value="h3">H3</option>
// // //                                             <option value="h4">H4</option>
// // //                                             <option value="h5">H5</option>
// // //                                             <option value="h6">H6</option>
// // //                                         </select>
// // //                                     </label>
// // //                                     <label>
// // //                                         <input
// // //                                             type="text"
// // //                                             value={headingFontSize}
// // //                                             onChange={(e) => setHeadingFontSize(e.target.value)}
// // //                                             placeholder="Font Size"
// // //                                         />
// // //                                     </label>
// // //                                 </div>
// // //                             )}
// // //                             {selectedOption === 'content' && (
// // //                                 <div className="content-section">
// // //                                     <div className='admin-input email'>
// // //                                         <div className='admin-label'>
// // //                                             <label htmlFor="content">Content</label>
// // //                                         </div>
// // //                                         {ReactQuill ? (
// // //                                             <ReactQuill
// // //                                                 value={editorValue}
// // //                                                 onChange={setEditorValue}
// // //                                                 modules={{ toolbar: toolbarOptions }}
// // //                                             />
// // //                                         ) : (
// // //                                             <p>Loading editor...</p>
// // //                                         )}
// // //                                     </div>
// // //                                 </div>
// // //                             )}
// // //                             {selectedOption === 'url' && (
// // //                                 <div className="form-builder-changing-wrap url url-section">
// // //                                     <button style={{
// // //                                         backgroundColor: '#9474ff',
// // //                                         border: '1px solid black',
// // //                                         color: 'white',
// // //                                         padding: '10px',
// // //                                         borderRadius: '4px',
// // //                                         height: '40px',
// // //                                         width: '100px',
// // //                                         fontSize: '16px'

// // //                                     }}>Vist Now</button>
// // //                                     <label>
// // //                                         URL:
// // //                                         <input
// // //                                             type="url"
// // //                                             value={headingUrl}
// // //                                             onChange={(e) => setHeadingUrl(e.target.value)}
// // //                                             placeholder="Enter URL (optional)"
// // //                                         />
// // //                                     </label>
// // //                                 </div>
// // //                             )}

// // //                             {selectedOption === 'image' && (
// // //                                 <div className="form-builder-changing-wrap file section">
// // //                                     <label> Image:
// // //                                         <input
// // //                                             type="file"
// // //                                             accept="image/*"
// // //                                             onChange={(e) => {
// // //                                                 const file = e.target.files[0];
// // //                                                 if (file) {
// // //                                                     const reader = new FileReader();
// // //                                                     reader.onloadend = () => {
// // //                                                         setImageUrl(reader.result);
// // //                                                     };
// // //                                                     reader.readAsDataURL(file);
// // //                                                 }
// // //                                             }}
// // //                                         />
// // //                                         {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
// // //                                     </label>
// // //                                 </div>
// // //                             )}

// // //                             <button onClick={handleAddHeading}>Add Heading</button>
// // //                             <button className='heading_cancle' onClick={() => setShowHeadingPopup(false)}>Close</button>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 {showDescriptionPopup && (
// // //                     <div className="popup">
// // //                         <div className="popup-content">
// // //                             <label>
// // //                                 Description:
// // //                                 <textarea
// // //                                     value={descriptionText}
// // //                                     onChange={(e) => setDescriptionText(e.target.value)}
// // //                                     placeholder="Description"
// // //                                 />
// // //                             </label>
// // //                             <button onClick={handleAddDescription}>Add Description</button>
// // //                             <button className='heading_cancle' onClick={() => setShowDescriptionPopup(false)}>Close</button>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //                 {isPopupVisibleed && (
// // //                     <div className="popup">
// // //                         <div className="popup-content">
// // //                             <h4>Edit Rich Text</h4>
// // //                             <div className="content-section">
// // //                                 <div className="admin-input email">
// // //                                     <div className="admin-label">
// // //                                         <label htmlFor="content">Content</label>
// // //                                     </div>
// // //                                     <ReactQuill
// // //                                         value={editorValueed}
// // //                                         onChange={handleEditorChangeee}
// // //                                         modules={{ toolbar: toolbarOptions }}
// // //                                     />
// // //                                 </div>
// // //                             </div>

// // //                             <button onClick={handleSave}>Save</button>
// // //                             <button onClick={() => setPopupVisibleed(false)}>Cancel</button>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //         </div >
// // //     );
// // // };

// // // export default EmailTemplateCreate;



// // import React, { useState, useEffect, useRef } from 'react';
// // import Sortable from 'sortablejs';
// // import axios from 'axios';
// // import { useLocation } from 'react-router-dom';
// // import image from '../images/image-.png';
// // import divider2 from '../images/divider.png';
// // import btn from '../images/btn.png';
// // import emailtemp from '../images/emailtemp.png';
// // import phonem from '../images/phonem.png';
// // import desk from '../images/desk.png';
// // import socail from '../images/socail.png';
// // import htmlicon from '../images/htmlicon.png';
// // import maximizesize from '../images/maximize-size.png';
// // import deletep from '../images/deletep.png';
// // import delete1 from '../images/delete.png';
// // import facebook from '../images/facebook.png';
// // import instagram from '../images/instagram.png';
// // import twitter from '../images/twitter.png';
// // import videoplay from '../images/videoplay.png';
// // import left from '../images/left.png';
// // import right from '../images/right.png';
// // import hdbg from '../images/hdbg.jpeg';
// // import product from '../images/product.png';
// // import spacer from '../images/spacer.png';
// // import banner from '../images/banner.png';
// // import imghd from '../images/imghd.jpeg';
// // import imghd1 from '../images/imghd1.png';
// // import itext from '../images/itext.png';
// // import editicon from '../images/editicon.png';
// // import savemail from '../images/savemail.png';
// // import multimedia from '../images/multimedia.png';
// // import rich from '../images/rich.png';
// // import cancleimg from '../images/cancleimg.png';
// // import productcancle from '../images/productcancle.png';
// // import { format } from 'date-fns';

// // import 'react-quill/dist/quill.snow.css';

// // import '../index.css';
// // import { useNavigate } from 'react-router-dom';
// // import { useLoaderData, Link } from "@remix-run/react";
// // import { authenticate, apiVersion } from "../shopify.server";

// // const toolbarOptions = [
// //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
// //     ['bold', 'italic', 'underline'],
// //     ['link', 'image'],
// //     [{ list: 'ordered' }, { list: 'bullet' }],
// //     [{ script: 'sub' }, { script: 'super' }],
// //     [{ indent: '-1' }, { indent: '+1' }],
// //     [{ direction: 'rtl' }],
// //     [{ size: ['small', 'medium', 'large', 'huge'] }],
// //     [{ color: [] }, { background: [] }],
// //     [{ font: [] }],
// //     [{ align: [] }],
// //     ['clean'],
// // ];

// // const generateUniqueId = (length = 22) => {
// //     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// //     let uniqueId = '';
// //     for (let i = 0; i < length; i++) {
// //         const randomIndex = Math.floor(Math.random() * charset.length);
// //         uniqueId += charset[randomIndex];
// //     }
// //     return uniqueId;
// // };

// // export const loader = async ({ request }) => {
// //     try {
// //         const { session } = await authenticate.admin(request);
// //         const { shop, accessToken } = session;
// //         console.log('Shop:', shop);
// //         console.log('Access Token:', accessToken);

// //         const graphqlQuery = {
// //             query: `
// //                 query {
// //                     products(first: 50) {
// //                         edges {
// //                             node {
// //                                 id
// //                                 title
// //                                 featuredImage {
// //                                     src
// //                                 }
// //                                 variants(first: 10) {
// //                                     edges {
// //                                         node {
// //                                             id
// //                                             title
// //                                             price
// //                                         }
// //                                     }
// //                                 }
// //                             }
// //                         }
// //                     }
// //                 }
// //             `
// //         };

// //         const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 "X-Shopify-Access-Token": accessToken,
// //             },
// //             body: JSON.stringify(graphqlQuery),
// //         });

// //         if (!response.ok) {
// //             throw new Error(`Failed to fetch products: ${response.statusText}`);
// //         }

// //         const responseData = await response.json();
// //         console.log('Response Data:', responseData);

// //         const products = responseData?.data?.products?.edges || [];

// //         const productsWithData = products.map(product => {
// //             const variants = product.node.variants.edges.map(variant => variant.node);
// //             const uniqueColors = Array.from(new Set(variants.map(variant => variant.option1))).join(' | ');
// //             const uniquePrices = Array.from(new Set(variants.map(variant => variant.price))).join(' | ');
// //             const uniqueSizes = Array.from(new Set(variants.map(variant => variant.option2))).join(' | ');

// //             return {
// //                 id: product.node.id,
// //                 title: product.node.title,
// //                 color: uniqueColors,
// //                 price: uniquePrices,
// //                 size: uniqueSizes,
// //                 image: product.node.featuredImage ? product.node.featuredImage.src : null,
// //             };
// //         });

// //         console.log('Processed Products:', productsWithData);

// //         return { products: productsWithData, shop: shop };
// //     } catch (err) {
// //         console.error("Error fetching products:", err.message);
// //         return { products: [], shop: null };
// //     }
// // };

// // const EmailTemplateCreate = () => {

// //     const navigate = useNavigate();
// //     const [fields, setFields] = useState([]);
// //     const [emailTemplateId, setEmailTemplateId] = useState(null);
// //     const formBuilderRef = useRef(null);
// //     const [formTitle, setFormTitle] = useState('Email-Template');
// //     const [existingTitles, setExistingTitles] = useState([]);
// //     const [showImagePopup, setShowImagePopup] = useState(false);
// //     const [showHeadingPopup, setShowHeadingPopup] = useState(false);
// //     const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
// //     const [headingText, setHeadingText] = useState('');
// //     const [headingLevel, setHeadingLevel] = useState('h1');
// //     const [selectedOption, setSelectedOption] = useState('heading');
// //     const [imageUrl, setImageUrl] = useState(null);
// //     const [headingFontSize, setHeadingFontSize] = useState('40');
// //     const [descriptionText, setDescriptionText] = useState('');
// //     const [backgroundColor, setBackgroundColor] = useState('#ffffff');
// //     const [borderRadious, setBorderRadious] = useState(5);
// //     const [templatePadding, setTemplatePadding] = useState('20');
// //     const [backgroundImage, setBackgroundImage] = useState(null);
// //     const [textAlign, setTextAlign] = useState('left');
// //     const [imageFieldId, setImageFieldId] = useState(null);
// //     const [showField, setShowField] = useState(true);
// //     const [showFields, setShowFields] = useState(true);
// //     const [showSocialIconPopup, setShowSocialIconPopup] = useState(false);
// //     const [selectedFieldId, setSelectedFieldId] = useState(null);
// //     const [emailFieldPopup, setEmailFieldPopup] = useState(false);
// //     const [activeFieldId, setActiveFieldId] = useState(null);
// //     const [socalIconWidth, setSocalIconWidth] = useState(30);
// //     const [socalIconHeight, setSocalIconHeight] = useState(30);
// //     const [formDataAdd, setFormDataAdd] = useState([]);
// //     const [selectedFormIds, setSelectedFormIds] = useState([]);
// //     const [selectedTitles, setSelectedTitles] = useState([]);
// //     const [showVideoInput, setShowVideoInput] = useState(false);
// //     const { products, shop, apiVersion } = useLoaderData();
// //     const [selectedProduct, setSelectedProduct] = useState(null);
// //     const [isPopupOpen, setIsPopupOpen] = useState(false);
// //     const [selectedProducts, setSelectedProducts] = useState([]);
// //     const [productTitles, setProductTitles] = useState([]);
// //     const [productImage, setProductImage] = useState([]);
// //     const [popupFieldTitle, setPopupFieldTitle] = useState('');
// //     const [showPrice, setShowPrice] = useState(false);
// //     const [showbtnn, setShowbtnn] = useState(false);
// //     const [productsPerRow, setProductsPerRow] = useState(3);
// //     const [lastProductFieldId, setLastProductFieldId] = useState(null);
// //     const [showFileUpload, setShowFileUpload] = useState(false);
// //     const emailFieldRef = useRef(null);
// //     const popupRef = useRef(null);
// //     const [selectedIcons, setSelectedIcons] = useState({
// //         facebook: true,
// //         twitter: true,
// //         instagram: true,
// //     });
// //     const [customIcons, setCustomIcons] = useState([]);
// //     const [id, setId] = useState(null);
// //     const location = useLocation();
// //     const { formData } = location.state || {};
// //     const [viewMode, setViewMode] = useState('desktop');
// //     const [dividerColor, setDividerColor] = useState('#000');
// //     const [showColorPicker, setShowColorPicker] = useState(false);
// //     const [showbtn, setShowBtn] = useState(false);
// //     const [emailWidth, setEmailWidth] = useState('800px');
// //     const [headingColor, setHeadingColor] = useState('#000');
// //     const formsPerPage = 3;
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [fontFamily, setFontFamily] = useState('Arial');
// //     const [ReactQuill, setReactQuill] = useState(null);
// //     const [editorValue, setEditorValue] = useState('');
// //     const [headingUrl, setHeadingUrl] = useState('');
// //     const [texteditorValue, setTextEditorValue] = useState('');
// //     const [columnCount, setColumnCount] = useState(6);
// //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// //     const [columnImages, setColumnImages] = useState({});
// //     const [editorValues, setEditorValues] = useState({});
// //     const [editorValueed, setEditorValueed] = useState('');
// //     const [currentFieldId, setCurrentFieldId] = useState(null);
// //     const [isPopupVisibleed, setPopupVisibleed] = useState(false);
// //     const [popupFieldId, setPopupFieldId] = useState(null);
// //     const [isFileInputVisible, setFileInputVisible] = useState(false);
// //     const [showFieldInput, setShowFieldInput] = useState(false);
// //     const [showFieldPro, setShowFieldPro] = useState(false);
// //     const [saveEmail, setSaveEmail] = useState(false);

// //     const handleFontChange = (event) => {
// //         setFontFamily(event.target.value);
// //     };

// //     useEffect(() => {
// //         if (formData) {
// //             console.log('Form data received:', formData);
// //             console.log('Fields:', formData.fields);

// //             if (formData.fields && formData.fields.length > 0) {
// //                 const field = formData.fields[0];

// //                 if (field.columnData) {
// //                     console.log('Column Data:', field.columnData);
// //                 } else {
// //                     console.log('Column Data not found in the first field');
// //                 }
// //             } else {
// //                 console.log('No fields found in formData');
// //             }

// //             if (Array.isArray(formData.fields)) {
// //                 const validFields = formData.fields.map(field => {
// //                     if (!field.id) {
// //                         console.warn('Field missing ID:', field);
// //                     }

// //                     if (field.type === 'product') {
// //                         console.log('Price for product field:', field.price);
// //                         if (field.price === true) {
// //                             setShowPrice(true);
// //                         }
// //                         if (field.showbtnn === true) {
// //                             setShowbtnn(true);
// //                         }
// //                     }

// //                     return { ...field, id: field.id || generateUniqueId() };
// //                 });

// //                 setFields(validFields);
// //             }
// //             setEmailWidth(formData.styles.width);
// //             setBackgroundColor(formData.styles.backgroundColor);
// //             setBorderRadious(formData.styles.borderRadious);
// //             setBackgroundImage(formData.styles.backgroundImage);
// //             setTemplatePadding(formData.styles.templatePadding);
// //             setTextAlign(formData.styles.textAlign);
// //             setFontFamily(formData.styles.fontFamily);
// //             setEmailTemplateId(formData.templateId);
// //             setFormTitle(formData.title);
// //             setId(formData._id);
// //             setSelectedFormIds(formData.form_ids || []);
// //             const productsPerRow = formData.fields[0]?.productsPerRow || 3;
// //             setProductsPerRow(productsPerRow);
// //             console.log('Products per row:', formData.fields[0]?.productsPerRow);
// //             const columnCount = parseInt(formData.styles.columnCount) || '';
// //             setColumnCount(columnCount);

// //         }
// //     }, [formData]);

// //     const createInputField = (type, add, initialValue = '') => {
// //         const id = generateUniqueId();
// //         console.log(`Creating field of type ${type} with ID: ${id}`);

// //         return {
// //             id,
// //             type,
// //             contentType: 'text',
// //             add: add,
// //             image: type === 'images' ? initialValue : null,
// //             headerbtnbg: type === 'heading' ? '#FFFFFF' : undefined,
// //             headerbtncolor: type === 'heading' ? '#000' : undefined,
// //             headingbtnPadding: type === 'heading' ? 5 : undefined,
// //             headingbtnradious: type === 'heading' ? 4 : undefined,
// //             headingbtnFontSize: type === 'heading' ? 14 : undefined,
// //             headingbtnwidth: type === 'heading' ? '100' : undefined,
// //             headingbtnheight: type === 'heading' ? '35' : undefined,
// //             headerbtn: type === 'heading' ? 'Click Now' : undefined,
// //             headingbtnBorderColor: type === 'heading' ? '#000000' : undefined,
// //             headingbtnBorderWidth: type === 'heading' ? '1' : undefined,
// //             headingbtnBorderStyle: type === 'heading' ? 'solid' : undefined,
// //             bannerImageWidth: type === 'heading' ? '100' : undefined,
// //             bannerImageHeight: type === 'heading' ? '400px' : undefined,
// //             bannerImageTextAlign: type === 'heading' ? '' : undefined,
// //             headingText: type === 'heading' ? 'The Three Lions Collection' : undefined,
// //             headingLevel: type === 'heading' ? 'h1' : null,
// //             headingFontSize: type === 'heading' ? '40' : undefined,
// //             headingLetterSpacing: type === 'heading' ? 0 : undefined,
// //             headingPadding: type === 'heading' ? 20 : undefined,
// //             headingTextAlign: type === 'heading' ? "" : undefined,
// //             headingColor: type === 'heading' ? '#000' : undefined,
// //             headingbg: type === 'heading' ? '#0000' : undefined,
// //             headingbgImage: type === 'heading' ? '' : undefined,
// //             headingBorderColor: type === 'heading' ? '#000000' : undefined,
// //             headingBorderWidth: type === 'heading' ? '0' : undefined,
// //             headingBorderStyle: type === 'heading' ? 'solid' : undefined,
// //             headingFontWeight: type === 'heading' ? 600 : undefined,
// //             descritionFontSize: type === 'description' ? '16' : undefined,
// //             descritionColor: type === 'description' ? '#000' : undefined,
// //             descritionFontWeight: type === 'description' ? 500 : undefined,
// //             descriptionText: type === 'description' ? initialValue : 'No Description Provided',
// //             descriptionbg: type === 'description' ? '#0000' : undefined,
// //             descriptionPadding: type === 'description' ? 10 : undefined,
// //             descriptionLetterSpacing: type === 'description' ? 0 : undefined,
// //             descriptionTextAlign: type === 'description' ? "" : undefined,
// //             descriptionBorderColor: type === 'description' ? '#000000' : undefined,
// //             descriptionBorderWidth: type === 'description' ? '0' : undefined,
// //             descriptionBorderStyle: type === 'description' ? 'solid' : undefined,
// //             name: type === 'heading' ? initialValue :
// //                 type === 'description' ? 'Description' :
// //                     `Field_${id}`,
// //             label: type === 'heading' ? 'Heading' :
// //                 type === 'description' ? 'Description' :
// //                     type === 'button' ? 'Submit' :
// //                         `Default Label for ${type}`,
// //             value: initialValue || (type === 'description' ? 'No Description Provided' : ''),
// //             dividerColor: type === 'divider' ? '#000' : undefined,
// //             dividerWidth: type === 'divider' ? '100' : undefined,
// //             dividerheight: type === 'divider' ? '1' : undefined,
// //             buttonColor: type === 'button' ? '#007BFF' : undefined,
// //             buttonTextColor: type === 'button' ? '#FFF' : undefined,
// //             buttonFontSize: type === 'button' ? 16 : undefined,
// //             buttonPadding: type === 'button' ? 10 : undefined,
// //             buttonWidth: type === 'button' ? 100 : undefined,
// //             buttonHeight: type === 'button' ? 40 : undefined,
// //             buttonradious: type === 'button' ? 2 : undefined,
// //             buttonLabel: type === 'button' ? 'Submit' : undefined,
// //             buttonBorderColor: type === 'button' ? '#000000' : undefined,
// //             buttonBorderWidth: type === 'button' ? '1' : undefined,
// //             buttonBorderStyle: type === 'button' ? 'solid' : undefined,
// //             buttonLetterSpacing: type === 'button' ? 0 : undefined,
// //             buttonUrll: type === 'button' ? '' : undefined,
// //             socalIconWidth: type === 'socalicon' ? 30 : undefined,
// //             socalIconHeight: type === 'socalicon' ? 30 : undefined,
// //             socalIconPadding: type === 'socalicon' ? 10 : undefined,
// //             socaliconTextAlign: type === 'socalicon' ? "" : undefined,
// //             htmlColor: type === 'html convert' ? '#000' : undefined,
// //             htmlFontSize: type === 'html convert' ? 16 : undefined,
// //             htmlPadding: type === 'html convert' ? 10 : undefined,
// //             icons: {
// //                 facebook: { url: 'https://facebook.com', isHidden: false },
// //                 twitter: { url: 'https://twitter.com', isHidden: false },
// //                 instagram: { url: 'https://instagram.com', isHidden: false },
// //             },
// //             customIcons: [],
// //             spacerHeight: type === 'spacer' ? '20' : undefined,
// //             spacerbg: type === 'spacer' ? '#ffffff' : undefined,
// //             splitbg: type === 'split' ? '#0000' : undefined,
// //             videoPadding: type === 'video' ? '20' : undefined,
// //             splitPadding: type === 'split' ? '10' : undefined,
// //             splitTextAlin: type === 'split' ? 'left' : undefined,
// //             videoBorderColor: type === 'video' ? '#000000' : undefined,
// //             videoBorderWidth: type === 'video' ? '0' : undefined,
// //             videoBorderStyle: type === 'video' ? 'solid' : undefined,
// //             imgWidth: type === 'images' ? '100' : undefined,
// //             imgTextAlign: type === 'images' ? "" : undefined,
// //             imgPadding: type === 'images' ? 10 : undefined,
// //             imgbg: type === 'images' ? '#0000' : undefined,
// //             imgBorderColor: type === 'images' ? '#000000' : undefined,
// //             imgBorderWidth: type === 'images' ? '0' : undefined,
// //             imgBorderStyle: type === 'images' ? 'solid' : undefined,
// //             productPadding: type === 'product' ? 10 : undefined,
// //             productbg: type === 'product' ? '#0000' : undefined,
// //             productBorderColor: type === 'product' ? '#000000' : undefined,
// //             productBorderWidth: type === 'product' ? '0' : undefined,
// //             productBorderStyle: type === 'product' ? 'solid' : undefined,
// //             productFontSize: type === 'product' ? 16 : undefined,
// //             productTextColor: type === 'product' ? '#000000' : undefined,
// //             productWeight: type === 'product' ? 400 : undefined,
// //             productLetterSpacing: type === 'product' ? 0 : undefined,
// //             productbtnBorderColor: type === 'product' ? '#000000' : undefined,
// //             productbtnBorderWidth: type === 'product' ? '1' : undefined,
// //             productbtnBorderStyle: type === 'product' ? 'solid' : undefined,
// //             productbtnbg: type === 'product' ? '#ffff' : undefined,
// //             productradious: type === 'product' ? '3' : undefined,
// //             productLabel: type === 'product' ? 'Shop Now' : undefined,
// //             productfontSize: type === 'product' ? '12' : undefined,
// //             productwidth: type === 'product' ? '80' : undefined,
// //             productheight: type === 'product' ? '30' : undefined,
// //             productbackgroundColor: type === 'product' ? '#007BFF' : undefined,
// //             additionalButtons: [],
// //             displayStyle: 'flex',
// //             richTextAlign: type === 'heading' ? "" : undefined,
// //             htmltext: type === 'html convert' ? '<h1>Your HTML Here</h1>' : undefined,
// //         };
// //     };

// //     const addInputField = (type) => {
// //         let newField;

// //         if (type === 'images') {
// //             setImageFieldId(null);
// //             newField = createInputField('images');
// //             setFields((prevFields) => [...prevFields, newField]);
// //             setSelectedFieldId(newField.id);
// //             if (window.innerWidth > 1400) {
// //                 handleFieldClick(newField.id);
// //             }
// //             return;
// //         } else if (type === 'heading') {
// //             setEditorValue('');
// //             newField = createInputField(type);
// //             setFields((prevFields) => [...prevFields, newField]);
// //             setSelectedFieldId(newField.id);
// //             if (window.innerWidth > 1400) {
// //                 handleFieldClick(newField.id);
// //             }
// //         } else if (type === 'divider') {
// //             toggleColorPicker();
// //             newField = createInputField(type);
// //             setFields((prevFields) => [...prevFields, newField]);
// //         } else if (type === 'button') {
// //             newField = createInputField(type);
// //             setFields((prevFields) => [...prevFields, newField]);
// //         } else if (type === 'socalicon') {
// //             newField = createInputField('socalicon');
// //             setFields((prevFields) => {
// //                 const updatedFields = [...prevFields, newField];
// //                 console.log("Updated fields after adding new field:", updatedFields);

// //                 setSelectedFieldId(newField.id);
// //                 setSelectedIcons(newField.icons || {});
// //                 setCustomIcons(newField.customIcons || []);
// //                 setShowSocialIconPopup(true);

// //                 return updatedFields;
// //             });
// //         } else if (type === 'html convert') {
// //             newField = createInputField(type, type === 'html convert' ? '<h1>Your HTML Here</h1>' : '');
// //             setFields((prevFields) => [...prevFields, newField]);
// //         } else if (type === 'split') {
// //             const splitFields = [
// //                 createInputField('split', 'image', ''),
// //                 createInputField('split', 'text', ''),
// //             ];
// //             setFields((prevFields) => [...prevFields, ...splitFields]);
// //             splitFields.forEach((field) => {
// //                 if (field.id && window.innerWidth > 1400) {
// //                     handleFieldClick(field.id);
// //                 }
// //             });
// //         } else if (type === 'spacer') {
// //             newField = createInputField(type);
// //             setFields((prevFields) => [...prevFields, newField]);
// //         } else if (type === 'video') {
// //             newField = createInputField(type);
// //             setFields((prevFields) => [...prevFields, newField]);
// //             setShowVideoInput(true);
// //         } else if (type === 'product') {
// //             newField = createInputField('product');
// //             setFields((prevFields) => [...prevFields, newField]);
// //             setLastProductFieldId(newField.id);
// //             setIsPopupOpen(true);
// //         } else if (type === 'Multicolumn') {
// //             const id = generateUniqueId();
// //             const newField = {
// //                 id,
// //                 type: 'Multicolumn',
// //                 columnCount: 6,
// //                 columnData: Array(6).fill({ content: '', image: null })
// //             };
// //             setFields((prevFields) => [...prevFields, newField]);
// //         } else if (type === 'richtext') {
// //             newField = createInputField('richtext');
// //             setFields((prevFields) => [...prevFields, newField]);
// //             setCurrentFieldId(newField.id);
// //         }

// //         if (newField && newField.id && window.innerWidth > 1400) {
// //             handleFieldClick(newField.id);
// //         }
// //     };


// //     useEffect(() => {

// //         const loadReactQuill = async () => {
// //             const { default: Quill } = await import('react-quill');
// //             setReactQuill(() => Quill);
// //         };

// //         loadReactQuill();
// //     }, []);

// //     const handleEdit = (field) => {
// //         setSelectedFieldId(field.id);
// //         setSelectedIcons(field.icons);
// //         setCustomIcons(field.customIcons || []);
// //         setShowSocialIconPopup(true);
// //     };

// //     const handleSaveSocialIcons = () => {
// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === selectedFieldId
// //                     ? { ...field, icons: selectedIcons, customIcons }
// //                     : field
// //             )
// //         );
// //         setShowSocialIconPopup(false);

// //     };

// //     useEffect(() => {

// //         handleSaveSocialIcons();
// //     }, [selectedIcons, customIcons]);

// //     const handleToggleIcon = (icon) => {
// //         setSelectedIcons((prevIcons) => ({
// //             ...prevIcons,
// //             [icon]: {
// //                 ...prevIcons[icon],
// //                 isHidden: !prevIcons[icon]?.isHidden,
// //             },
// //         }));
// //     };

// //     const handleIconUrlChange = (e, icon) => {
// //         setSelectedIcons((prevIcons) => ({
// //             ...prevIcons,
// //             [icon]: {
// //                 ...prevIcons[icon],
// //                 url: e.target.value,
// //             },
// //         }));
// //     };

// //     const handleCustomIconUpload = (e) => {
// //         const files = e.target.files;
// //         const filePromises = Array.from(files).map((file) => {
// //             return new Promise((resolve) => {
// //                 const reader = new FileReader();
// //                 reader.onloadend = () => {
// //                     resolve(reader.result);
// //                 };
// //                 reader.readAsDataURL(file);
// //             });
// //         });

// //         Promise.all(filePromises).then((fileUrls) => {
// //             const newIcons = fileUrls.map((url) => ({
// //                 src: url,
// //                 name: 'Custom Icon',
// //                 isHidden: false
// //             }));
// //             setCustomIcons((prevIcons) => [...prevIcons, ...newIcons]);
// //         });
// //     };

// //     const handleCustomIconUrlChange = (e, index) => {
// //         const newUrl = e.target.value;
// //         setCustomIcons((prevIcons) =>
// //             prevIcons.map((icon, i) =>
// //                 i === index ? { ...icon, url: newUrl } : icon
// //             )
// //         );
// //     };

// //     const toggleCustomIconVisibility = (index) => {
// //         setCustomIcons((prevIcons) =>
// //             prevIcons.map((icon, i) =>
// //                 i === index ? { ...icon, isHidden: !icon.isHidden } : icon
// //             )
// //         );
// //     };

// //     const handleImageUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 const newField = createInputField('images', reader.result);
// //                 if (imageFieldId) {
// //                     setFields((prevFields) =>
// //                         prevFields.map((field) =>
// //                             field.id === imageFieldId ? { ...field, value: reader.result } : field
// //                         )
// //                     );
// //                 } else {
// //                     setFields((prevFields) => [...prevFields, newField]);
// //                 }
// //                 setShowImagePopup(false);
// //                 setImageFieldId(null);
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const handleAddHeading = (e) => {
// //         e.preventDefault();
// //         if (emailTemplateId) {
// //             setFields((prevFields) =>
// //                 prevFields.map((field) =>
// //                     field.id === emailTemplateId
// //                         ? {
// //                             ...field,
// //                             headingText,
// //                             headingLevel,
// //                             headingFontSize,
// //                             headingColor,
// //                             imageUrl,
// //                             editorContent: editorValue,
// //                             headingUrl,
// //                         }
// //                         : field
// //                 )
// //             );
// //         } else {
// //             const newField = createInputField('heading', headingText);
// //             newField.headingLevel = headingLevel;
// //             newField.headingFontSize = headingFontSize;
// //             newField.headingColor = headingColor;
// //             newField.imageUrl = imageUrl;
// //             newField.editorContent = editorValue;
// //             newField.headingUrl = headingUrl;
// //             setFields((prevFields) => [...prevFields, newField]);
// //         }
// //         setShowHeadingPopup(false);
// //         setHeadingText('');
// //         setHeadingLevel('h1');
// //         setHeadingFontSize('16');
// //         setEmailTemplateId(null);
// //         setImageUrl(null);
// //         setEditorValue('');
// //         setHeadingUrl('');
// //     };

// //     const handleEditorChange = (value) => {
// //         console.log("Editor value changed:", value);
// //         console.log("Active field ID:", activeFieldId);
// //         setEditorValue(value);

// //         setFields((prevFields) => {
// //             const updatedFields = prevFields.map((field) =>
// //                 field.id === activeFieldId
// //                     ? { ...field, editorContent: value }
// //                     : field
// //             );
// //             console.log("Updated fields after editor change:", updatedFields);
// //             return updatedFields;
// //         });
// //     };

// //     const handleUpdateUrl = (id, newUrl) => {
// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === id ? { ...field, headingUrl: newUrl } : field
// //             )
// //         );
// //     };

// //     const handleAddDescription = (e) => {
// //         e.preventDefault();
// //         if (emailTemplateId) {
// //             setFields((prevFields) =>
// //                 prevFields.map((field) =>
// //                     field.id === emailTemplateId
// //                         ? { ...field, descriptionText }
// //                         : field
// //                 )
// //             );
// //         } else {
// //             const newField = createInputField('description', descriptionText);
// //             setFields((prevFields) => [...prevFields, newField]);
// //         }

// //         setShowDescriptionPopup(false);
// //         setDescriptionText('');
// //         setTextEditorValue('');
// //         setEmailTemplateId(null);
// //     };

// //     const handleDescriptionChange = (id, value) => {
// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === id ? { ...field, descriptionText: value } : field
// //             )
// //         );
// //     };

// //     const removeField = (id) => {
// //         console.log('Attempting to remove field with ID:', id);
// //         setFields((prevFields) => {
// //             const newFields = prevFields.filter(field => field.id !== id);
// //             setEmailFieldPopup(false)
// //             console.log('Remaining fields after removal:', newFields);
// //             return newFields;
// //         });
// //     };


// //     useEffect(() => {
// //         axios
// //             .get('http://localhost:4001/get-forms')
// //             .then((res) => {
// //                 console.log('API Response:', res.data);
// //                 const filteredData = res.data.filter((form) => form.shop === shop);
// //                 setFormDataAdd(filteredData);
// //             })
// //             .catch((error) => console.error('API Error:', error));
// //     }, [shop]);

// //     useEffect(() => {
// //         if (formDataAdd.length > 0) {
// //             const formIds = formDataAdd.map((form) => form.formId);
// //             console.log('All form IDs:', formIds);
// //         }
// //     }, [formDataAdd]);

// //     const handleFormSelect = async (e) => {
// //         const title = e.target.value.trim();
// //         const selectedForm = formDataAdd.find((form) => form.title.trim() === title);

// //         if (selectedForm) {
// //             try {
// //                 const response = await fetch(`http://localhost:4001/check-form-connected/${selectedForm.formId}`);
// //                 const data = await response.json();

// //                 if (data.isConnected) {
// //                     alert('This form is already connected to a template.');

// //                     const confirmUnlink = window.confirm(
// //                         'Do you want to unlink it?'
// //                     );

// //                     if (confirmUnlink) {
// //                         const unlinkResponse = await fetch(
// //                             `http://localhost:4001/unlink-template/${selectedForm.formId}`,
// //                             { method: 'PUT' }
// //                         );

// //                         if (unlinkResponse.ok) {
// //                             alert('Template unlinked from form.');

// //                             const updatedCheckResponse = await fetch(
// //                                 `http://localhost:4001/check-form-connected/${selectedForm.formId}`
// //                             );
// //                             const updatedCheckData = await updatedCheckResponse.json();

// //                             if (!updatedCheckData.isConnected) {
// //                                 console.log('Form is no longer connected to a template.');
// //                             }
// //                         } else {
// //                             alert('Failed to unlink template.');
// //                         }
// //                     } else {
// //                         return;
// //                     }
// //                 }

// //                 setSelectedFormIds((prevFormIds) => {
// //                     if (prevFormIds.includes(selectedForm.formId)) {
// //                         return prevFormIds.filter((id) => id !== selectedForm.formId);
// //                     } else {
// //                         return [...prevFormIds, selectedForm.formId];
// //                     }
// //                 });

// //                 setSelectedTitles((prevSelectedTitles) => {
// //                     if (prevSelectedTitles.includes(title)) {
// //                         return prevSelectedTitles.filter((t) => t !== title);
// //                     } else {
// //                         return [...prevSelectedTitles, title];
// //                     }
// //                 });
// //             } catch (error) {
// //                 console.error('Error checking or unlinking form connection:', error);
// //                 alert('An error occurred while processing the form connection.');
// //             }
// //         }
// //     };

// //     useEffect(() => {
// //         console.log('Selected form IDs:', selectedFormIds);
// //     }, [selectedFormIds]);

// //     const createOrUpdateForm = async () => {
// //         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
// //         let trimmedTitle = formTitle.trim();
// //         if (!trimmedTitle) {
// //             alert('Please provide a title for the template.');
// //             return;
// //         }

// //         if (!id) {
// //             try {
// //                 const response = await axios.get(`http://localhost:4001/check-title/${trimmedTitle}`);
// //                 if (response.data.exists) {

// //                     trimmedTitle = `${trimmedTitle}-${format(new Date(), "yyyyMMddHHmmss")}`;
// //                 }
// //             } catch (error) {
// //                 console.error('Error checking title:', error);
// //                 return;
// //             }
// //         }

// //         const templateId = emailTemplateId || generateUniqueId();
// //         setEmailTemplateId(templateId);

// //         if (fields.length === 0) {
// //             console.warn('No fields to create the form.');
// //             return;
// //         }

// //         const validFields = fields.filter(field => field && field.type);

// //         const updatedFields = validFields.map(field => {
// //             let value = '';

// //             switch (field.type) {
// //                 case 'images':
// //                     value = field.value || 'No Image Provided';
// //                     break;
// //                 case 'heading':
// //                     value = field.value || '';
// //                     field.editorContent = field.editorContent;
// //                     field.headingUrl = field.headingUrl || '';
// //                     field.imageUrl = field.imageUrl || '';
// //                     break;
// //                 case 'description':
// //                     value = field.value || '';
// //                     break;
// //                 case 'socalicon':
// //                     value = field.icons || 'No Social Icons Provided';
// //                     break;
// //                 case 'divider':
// //                     value = field.icons || 'No Social Icons Provided';
// //                     break;
// //                 case 'button':
// //                     value = 'Button';
// //                 case 'split':
// //                     value = field.value || 'No Value Provided';
// //                     field.add = field.add;
// //                     field.splitbg = field.splitbg || '';
// //                     field.width = field.width || '50%';
// //                     field.splitPadding = field.splitPadding || 0
// //                     field.splitTextAlin = field.splitTextAlin || 'left'
// //                     break;
// //                 case 'spacer':
// //                     value = 'Spacer Field';
// //                     field.spacerHeight = field.spacerHeight || 30;
// //                     field.spacerbg = field.spacerbg || '#f0f0f0';
// //                     break;
// //                 case 'video':
// //                     value = field.value;
// //                     field.videoPadding = field.videoPadding || 20;
// //                     field.videoBorderWidth = field.videoBorderWidth || 1;
// //                     field.videoBorderStyle = field.videoBorderStyle || 'solid';
// //                     field.videoBorderColor = field.videoBorderColor || '#000';
// //                     break;
// //                 case 'richtext':
// //                     value = field.value;
// //                     field.content = field.content || editorValueed || field.value || '';
// //                     break;
// //                 case 'Multicolumn':
// //                     value = field.value;
// //                     if (!field.columnData) {
// //                         field.columnData = Array.from({ length: columnCount }, (_, i) => ({
// //                             image: columnImages[`${field.id}-${i}`] || '',
// //                             content: editorValues[`${field.id}-${i}`] || '',
// //                         }));
// //                     } else {

// //                         for (let i = 1; i < columnCount; i++) {
// //                             field.columnData[i] = {
// //                                 image: columnImages[`${field.id}-${i}`] || field.columnData[i]?.image,
// //                                 content: editorValues[`${field.id}-${i}`] || field.columnData[i]?.content,
// //                             };
// //                         }
// //                     }
// //                     field.columnCount = columnCount;

// //                     break;
// //                 case 'product':
// //                     return {
// //                         ...field,
// //                         products: field.products || [],
// //                         productsPerRow,
// //                         viewMode,
// //                         price: showPrice,
// //                         buttonUrl: field.productUrl || `https://${shop}/admin/products?selectedView=all`,
// //                         showbtnn: showbtnn

// //                     };

// //                 default:
// //                     value = '';
// //             }

// //             if (field.type === 'html convert') {
// //                 return {
// //                     ...field,
// //                     value: field.value || '',
// //                 };
// //             }

// //             if (field.type === 'button') {
// //             }

// //             if (field.type === 'socalicon') {
// //                 field.socalIconHeight = socalIconHeight;
// //                 field.socalIconWidth = socalIconWidth;
// //                 field.icons = {
// //                     facebook: {
// //                         url: selectedIcons.facebook?.url || field.icons.facebook.url,
// //                         isHidden: selectedIcons.facebook?.isHidden || false,
// //                         value: selectedIcons.facebook?.value || 'Facebook',
// //                     },
// //                     twitter: {
// //                         url: selectedIcons.twitter?.url || field.icons.twitter.url,
// //                         isHidden: selectedIcons.twitter?.isHidden || false,
// //                         value: selectedIcons.twitter?.value || 'Twitter',
// //                     },
// //                     instagram: {
// //                         url: selectedIcons.instagram?.url || field.icons.instagram.url,
// //                         isHidden: selectedIcons.instagram?.isHidden || false,
// //                         value: selectedIcons.instagram?.value || 'Instagram',
// //                     },
// //                     send: {
// //                         url: selectedIcons.send?.url || '',
// //                         isHidden: selectedIcons.send?.isHidden || false,
// //                         value: selectedIcons.send?.value || 'Send',
// //                     },
// //                 };

// //                 field.customIcons = field.customIcons || [];
// //             } else {
// //                 field.icons = {};
// //             }

// //             return {
// //                 ...field,
// //                 label: field.label || (field.type === 'button' ? 'Button' : `Default Label for ${field.type}`),
// //                 name: field.name || `Field_${field.id}`,
// //                 value: field.type === 'product' ? undefined : value,
// //                 headerbtnbg: field.headerbtnbg || null,
// //                 headerbtncolor: field.headerbtncolor || null,
// //                 headerbtn: field.headerbtn || null,
// //                 headingLevel: field.headingLevel || null,
// //                 headingbtnPadding: field.headingbtnPadding || 10,
// //                 headingbtnradious: field.headingbtnradious || 4,
// //                 headingbtnwidth: field.headingbtnwidth || 100,
// //                 headingbtnFontSize: field.headingbtnFontSize || 16,
// //                 headingbtnheight: field.headingbtnheight || 40,
// //                 headingbtnBorderWidth: field.headingbtnBorderWidth || 1,
// //                 headingbtnBorderStyle: field.headingbtnBorderStyle || 'solid',
// //                 headingbtnBorderColor: field.headingbtnBorderColor || '#000',
// //                 bannerImageWidth: field.bannerImageWidth || '100',
// //                 bannerImageHeight: field.bannerImageHeight || '',
// //                 bannerImageTextAlign: field.bannerImageTextAlign || '',
// //                 richTextAlign: field.richTextAlign || '',
// //                 headingFontWeight: field.headingFontWeight || 600,
// //                 headingColor: field.headingColor || '#000',
// //                 headingbg: field.headingbg || '#ffff',
// //                 headingPadding: field.headingPadding || 0,
// //                 headingbgImage: field.headingbgImage || '',
// //                 headingLetterSpacing: field.headingLetterSpacing || 0,
// //                 headingTextAlign: field.headingTextAlign || '',
// //                 headingText: field.headingText,
// //                 headingBorderWidth: field.headingBorderWidth || 1,
// //                 headingBorderStyle: field.headingBorderStyle || 'solid',
// //                 headingBorderColor: field.headingBorderColor || '#000',
// //                 headingFontSize: field.type === 'heading' ? (field.headingFontSize || "16") : undefined,
// //                 descritionFontWeight: field.descritionFontWeight || 600,
// //                 descritionFontSize: field.descritionFontSize || 16,
// //                 descritionColor: field.descritionColor || '#000',
// //                 descriptionbg: field.descriptionbg || '#ffff',
// //                 descriptionPadding: field.descriptionPadding || 10,
// //                 descriptionLetterSpacing: field.descriptionLetterSpacing || 0,
// //                 descriptionTextAlign: field.descriptionTextAlign || '',
// //                 descriptionBorderWidth: field.descriptionBorderWidth || 1,
// //                 descriptionBorderStyle: field.descriptionBorderStyle || 'solid',
// //                 descriptionBorderColor: field.descriptionBorderColor || '#000',
// //                 dividerColor: field.dividerColor || '#000',
// //                 dividerWidth: field.dividerWidth || '100',
// //                 dividerheight: field.dividerheight || '1',
// //                 buttonColor: field.buttonColor || '#007BFF',
// //                 buttonFontSize: field.buttonFontSize || 16,
// //                 buttonTextColor: field.buttonTextColor || '#fff',
// //                 buttonLetterSpacing: field.buttonLetterSpacing || 0,
// //                 buttonUrll: field.buttonUrll || '',
// //                 buttonBorderWidth: field.buttonBorderWidth || 1,
// //                 buttonBorderStyle: field.buttonBorderStyle || 'solid',
// //                 buttonBorderColor: field.buttonBorderColor || '#000',
// //                 buttonWidth: field.buttonWidth || 150,
// //                 buttonHeight: field.buttonHeight || 40,
// //                 buttonradious: field.buttonradious || 40,
// //                 buttonPadding: field.buttonPadding || 10,
// //                 socalIconHeight: field.socalIconHeight || 30,
// //                 socalIconWidth: field.socalIconWidth || 30,
// //                 socalIconPadding: field.socalIconPadding || 10,
// //                 socaliconTextAlign: field.socaliconTextAlign || '',
// //                 htmlFontSize: field.htmlFontSize || 16,
// //                 htmlPadding: field.htmlPadding || 10,
// //                 htmlColor: field.htmlColor || '#000',
// //                 splitbg: field.splitbg || '',
// //                 width: field.width || '100%',
// //                 spacerHeight: field.spacerHeight || 20,
// //                 spacerbg: field.spacerbg || '#fff',
// //                 videoPadding: field.videoPadding || 20,
// //                 splitPadding: field.splitPadding || 0,
// //                 splitTextAlin: field.splitTextAlin || 'left',
// //                 videoBorderWidth: field.videoBorderWidth || 1,
// //                 videoBorderStyle: field.videoBorderStyle || 'solid',
// //                 videoBorderColor: field.videoBorderColor || '#000',
// //                 imgWidth: field.imgWidth || '100',
// //                 imgTextAlign: field.imgTextAlign || '',
// //                 imgPadding: field.imgPadding || 10,
// //                 imgbg: field.imgbg || '#ffff',
// //                 imgBorderWidth: field.imgBorderWidth || 0,
// //                 imgBorderStyle: field.imgBorderStyle || 'solid',
// //                 imgBorderColor: field.imgBorderColor || '#000',
// //                 productPadding: field.productPadding || 10,
// //                 productbg: field.productbg || '#ffff',
// //                 productBorderWidth: field.productBorderWidth || 0,
// //                 productBorderStyle: field.productBorderStyle || 'solid',
// //                 productBorderColor: field.productBorderColor || '#000',
// //                 productFontSize: field.productFontSize || 16,
// //                 productColor: field.productColor || '#000',
// //                 productWeight: field.productWeight || 600,
// //                 productLetterSpacing: field.productLetterSpacing || 0,
// //                 productbtnBorderColor: field.productbtnBorderColor || '#000',
// //                 productbtnBorderWidth: field.productbtnBorderWidth || 16,
// //                 productbtnBorderStyle: field.productbtnBorderStyle || '#000',
// //                 productbtnbg: field.productbtnbg || 600,
// //                 productradious: field.productradious || 0,
// //                 productLabel: field.productLabel || 'Shop Now',
// //                 productfontSize: field.productfontSize || '12',
// //                 productwidth: field.productwidth || 80,
// //                 productheight: field.productheight || 30,
// //                 productbackgroundColor: field.productbackgroundColor || '#007BFF',
// //                 buttonLabel: field.buttonLabel || '',

// //             };
// //         });

// //         console.log('Updated fields:', updatedFields);

// //         const formData = {
// //             templateId,
// //             shop,
// //             form_ids: selectedFormIds.map(id => String(id)),
// //             title: trimmedTitle,
// //             fields: updatedFields,
// //             createdAt: timestamp,
// //             styles: {
// //                 backgroundImage,
// //                 backgroundColor,
// //                 borderRadious,
// //                 templatePadding,
// //                 textAlign,
// //                 fontFamily,
// //                 width: viewMode === 'desktop' ? '800px' : '400px',
// //                 dividerColor,
// //             },
// //         };

// //         try {
// //             setSaveEmail(!saveEmail);
// //             const response = id
// //                 ? await axios.put(`http://localhost:4001/update/${id}`, formData)
// //                 : await axios.post('http://localhost:4001/send/api', formData);
// //             console.log('Form saved successfully with title:', trimmedTitle);
// //             const successMessage = id ? 'Form updated successfully' : 'Form created successfully';
// //             console.log(successMessage, response.data);

// //             if (!id) {
// //                 resetFormState();
// //             }
// //             setExistingTitles(prevTitles => [...prevTitles, trimmedTitle]);
// //         } catch (error) {
// //             console.error('Error saving form:', error);
// //             if (error.response) {
// //                 console.error('Response data:', error.response.data);
// //             }
// //         }
// //     };

// //     const resetFormState = () => {
// //         setFields([]);
// //         setEmailTemplateId(null);
// //         setHeadingText('');
// //         setBackgroundImage(null);
// //         setTemplatePadding('20')
// //         setBackgroundColor('#ffffff');
// //         setTextAlign('left');
// //         setBorderRadious(5)
// //         setId(null);
// //     };

// //     const handleContinue = () => {
// //         navigate('/app/emailTemplate/list');
// //         setSaveEmail(false);
// //     };


// //     const handleBackgroundImageUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setBackgroundImage(reader.result);
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     useEffect(() => {
// //         const formBuilder = formBuilderRef.current;
// //         if (!formBuilder) return;

// //         const sortable = Sortable.create(formBuilder, {
// //             animation: 150,
// //             ghostClass: 'dragging',
// //             onEnd: (evt) => {
// //                 const newFields = [...fields];
// //                 const movedField = newFields.splice(evt.oldIndex, 1)[0];
// //                 newFields.splice(evt.newIndex, 0, movedField);
// //                 setFields(newFields);
// //             },
// //         });

// //         return () => {
// //             sortable.destroy();
// //         };
// //     }, [fields]);

// //     const toggleViewMode = (mode) => {
// //         setViewMode(mode);
// //         setEmailWidth(mode === 'desktop' ? '800px' : '400px');
// //         if (mode === 'mobile') {
// //             setProductsPerRow(1);
// //         } else {
// //             setProductsPerRow(3);
// //         }
// //     };

// //     const toggleColorPicker = () => {
// //         setShowColorPicker(!showColorPicker);
// //     };

// //     const togglebtn = () => {
// //         setShowBtn(!showbtn);
// //     };

// //     const toggleFields = () => {
// //         setShowFields(true);
// //         setDropdownVisible(false);
// //     };

// //     const toggleSettings = () => {
// //         setShowFields(false);
// //     };

// //     const renderField = (field) => {
// //         if (!field) return null;

// //         switch (field.type) {
// //             case 'html convert':
// //                 return (
// //                     <div>
// //                         <textarea
// //                             value={field.value || field.htmltext}
// //                             onChange={(e) =>
// //                                 setFields((prevFields) =>
// //                                     prevFields.map((f) => (f.id === field.id ? { ...f, value: e.target.value } : f))
// //                                 )
// //                             }
// //                             rows="5"
// //                             cols="50"
// //                         />
// //                     </div>
// //                 );

// //             default:
// //                 return;
// //         }
// //     };


// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (popupRef.current && !popupRef.current.contains(event.target)) {
// //                 setEmailFieldPopup(false);
// //             }
// //         };

// //         document.addEventListener('mousedown', handleClickOutside);

// //         return () => {
// //             document.removeEventListener('mousedown', handleClickOutside);
// //         };
// //     }, []);

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (emailFieldRef.current && !emailFieldRef.current.contains(event.target)) {
// //                 setActiveFieldId(null);
// //             }
// //         };

// //         document.addEventListener('mousedown', handleClickOutside);

// //         return () => {
// //             document.removeEventListener('mousedown', handleClickOutside);
// //         };
// //     }, []);

// //     const handleWidthChange = (newWidth) => {
// //         setFields((prevFields) => {
// //             const selectedIndex = prevFields.findIndex((f) => f.id === selectedFieldId);

// //             if (selectedIndex !== -1 && selectedIndex % 2 === 0) {
// //                 return prevFields.map((f, index) => {
// //                     if (index === selectedIndex) {
// //                         return { ...f, width: newWidth };
// //                     }
// //                     if (index === selectedIndex + 1) {
// //                         return { ...f, width: `${100 - parseInt(newWidth)}%` };
// //                     }
// //                     return f;
// //                 });
// //             } else if (selectedIndex !== -1) {
// //                 return prevFields.map((f, index) => {
// //                     if (index === selectedIndex) {
// //                         return { ...f, width: newWidth };
// //                     }
// //                     if (index === selectedIndex - 1) {
// //                         return { ...f, width: `${100 - parseInt(newWidth)}%` };
// //                     }
// //                     return f;
// //                 });
// //             }
// //             return prevFields;
// //         });
// //     };

// //     const handleVideoChange = (e, id) => {
// //         const updatedFields = fields.map(field => {
// //             if (field.id === id && field.type === 'video') {
// //                 return { ...field, value: e.target.value };
// //             }
// //             return field;
// //         });
// //         setFields(updatedFields);
// //     };

// //     const getVideoEmbedUrl = (url) => {
// //         const videoId = url.split('v=')[1]?.split('&')[0];
// //         if (videoId) {
// //             return `https://www.youtube.com/embed/${videoId}?autohide=1&showinfo=0&controls=0`;
// //         }
// //         return null;
// //     };

// //     const handleProductClick = (product, isChecked) => {
// //         setSelectedProducts((prevSelectedProducts) => {
// //             if (isChecked) {

// //                 return [...prevSelectedProducts, product];
// //             } else {
// //                 return prevSelectedProducts.filter((p) => p.id !== product.id);
// //             }
// //         });

// //         setFields((prevFields) => {
// //             return prevFields.map((field) => {
// //                 if (field.id === lastProductFieldId && field.type === 'product') {
// //                     return {
// //                         ...field,
// //                         products: isChecked
// //                             ? [...(field.products || []), product]
// //                             : (field.products || []).filter((p) => p.id !== product.id)
// //                     };
// //                 }
// //                 return field;
// //             });
// //         });

// //         setIsPopupOpen(true);
// //     };

// //     const handleRemoveProductFromForm = (index) => {
// //         const productToRemove = productTitles?.[index];

// //         if (!productToRemove) return;

// //         setProductTitles((prevTitles) =>
// //             Array.isArray(prevTitles) ? prevTitles.filter((title, i) => i !== index) : prevTitles
// //         );

// //         setSelectedProducts((prevSelectedProducts) =>
// //             Array.isArray(prevSelectedProducts)
// //                 ? prevSelectedProducts.filter((product) => product.title !== productToRemove)
// //                 : prevSelectedProducts
// //         );

// //         setFields((prevFields) =>
// //             Array.isArray(prevFields)
// //                 ? prevFields.map((field) =>
// //                     field.type === 'product'
// //                         ? { ...field, products: field.products.filter((product) => product.title !== productToRemove) }
// //                         : field
// //                 )
// //                 : prevFields
// //         );
// //     };

// //     const handleClosePopup = () => {
// //         setIsPopupOpen(false);
// //         setSelectedProduct(null);
// //     };

// //     const togglePrice = () => {
// //         setShowPrice(!showPrice);
// //     };

// //     const togglebtnn = () => {
// //         setShowbtnn(!showbtnn);
// //     };

// //     const AddProduct = () => {
// //         setIsPopupOpen(true);
// //     }

// //     useEffect(() => {
// //         console.log('isPopupOpen:', isPopupOpen);
// //         console.log('selectedProduct:', selectedProduct);
// //     }, [isPopupOpen, selectedProduct]);


// //     const handleAddProductToSelected = (fieldId, fieldTitle, fieldImage, products) => {
// //         console.log("Field ID:", fieldId);
// //         console.log("Field Title:", fieldTitle);
// //         console.log("Products:", products);
// //         console.log("Image:", fieldImage);
// //         setLastProductFieldId(fieldId);
// //         setPopupFieldTitle(fieldTitle);

// //         const productTitles = products.map(product => product.title);
// //         console.log("Product Titles:", productTitles);

// //         setProductTitles(productTitles);

// //         const productImages = products.map(product => product.image);
// //         console.log("Product images:", productImages);
// //         setProductImage(productImages);
// //     };

// //     const handleProductsPerRowChange = (e) => {
// //         setProductsPerRow(parseInt(e.target.value, 6));
// //     };


// //     const totalPages = Math.ceil(products.length / formsPerPage);

// //     const handlePageChange = (page) => {
// //         if (page < 1 || page > totalPages) return;
// //         setCurrentPage(page);
// //     };

// //     const currentProducts = products.slice(
// //         (currentPage - 1) * formsPerPage,
// //         currentPage * formsPerPage
// //     );

// //     const generatePageNumbers = () => {
// //         const visiblePages = [];

// //         if (totalPages <= 5) {
// //             for (let i = 1; i <= totalPages; i++) {
// //                 visiblePages.push(i);
// //             }
// //         } else {

// //             if (currentPage <= 3) {
// //                 visiblePages.push(1, 2, 3, 4, '...', totalPages);
// //             }

// //             else if (currentPage >= totalPages - 2) {
// //                 visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
// //             }

// //             else {
// //                 visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
// //             }
// //         }

// //         return visiblePages;
// //     };


// //     const handleRemoveBackgroundImage = () => {
// //         setBackgroundImage('');
// //     };

// //     const RemoveImage = (fieldId) => {
// //         console.log(`Removing image for field with ID: ${fieldId}`);
// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === fieldId
// //                     ? { ...field, imageUrl: null }
// //                     : field
// //             )
// //         );
// //     };

// //     const handleFileChange = (e, fieldId) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setFields(prevFields =>
// //                     prevFields.map(f =>
// //                         f.id === fieldId ? { ...f, headingbgImage: reader.result } : f
// //                     )
// //                 );
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };


// //     const handleFieldClick = (fieldId) => {
// //         setSelectedFieldId(fieldId);
// //         setEmailFieldPopup(true);
// //         setActiveFieldId(fieldId);
// //         const selectedField = fields.find((field) => field.id === fieldId);
// //         if (selectedField && selectedField.type === 'Multicolumn') {
// //             setIsPopupVisible(true);
// //             setColumnCount(selectedField.columnCount);
// //         }
// //         if (window.innerWidth <= 1400) {
// //             handleFieldPro();
// //         }
// //     };

// //     const handleColumnClick = (fieldId, columnIndex) => {
// //         setPopupFieldId(fieldId);

// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === fieldId
// //                     ? { ...field, selectedColumn: columnIndex }
// //                     : field
// //             )
// //         );
// //     };

// //     const handleColumnSelection = (columnSelection) => {
// //         const newColumnCount = Number(columnSelection);
// //         setColumnCount(newColumnCount);
// //         setFields((prevFields) =>
// //             prevFields.map((field) =>
// //                 field.id === popupFieldId
// //                     ? { ...field, columnCount: newColumnCount }
// //                     : field
// //             )
// //         );
// //     };

// //     const handleImageUploaded = (e, fieldId, columnIndex) => {
// //         const file = e.target.files[0];
// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //             setColumnImages((prevImages) => ({
// //                 ...prevImages,
// //                 [`${fieldId}-${columnIndex}`]: reader.result,
// //             }));
// //         };
// //         if (file) reader.readAsDataURL(file);
// //     };

// //     const handleRemoveImage = (fieldId, columnIndex) => {
// //         setColumnImages((prevImages) => {
// //             const updatedImages = { ...prevImages };
// //             delete updatedImages[`${fieldId}-${columnIndex}`];
// //             return updatedImages;
// //         });
// //     };

// //     const handleEditorChangeed = (value, fieldId, columnIndex) => {
// //         setEditorValues((prevValues) => ({
// //             ...prevValues,
// //             [`${fieldId}-${columnIndex}`]: value,
// //         }));
// //     };

// //     const handleEditorChangeee = (value) => {
// //         setEditorValueed(value);
// //     };

// //     const handleSave = () => {
// //         const updatedFields = fields.map((field) =>
// //             field.id === currentFieldId ? { ...field, content: editorValueed } : field
// //         );
// //         setFields(updatedFields);
// //         setPopupVisibleed(false);
// //     };

// //     const handleRemoveImage1 = (popupFieldId, selectedColumn) => {
// //         setFields((prevFields) => {
// //             const updatedFields = prevFields.map((field) => {
// //                 if (field.id === popupFieldId) {
// //                     const updatedColumnData = [...field.columnData];
// //                     updatedColumnData[selectedColumn].image = null;
// //                     return { ...field, columnData: updatedColumnData };
// //                 }
// //                 return field;
// //             });
// //             return updatedFields;
// //         });
// //     };

// //     const handleImageUpload1 = (e, popupFieldId, selectedColumn) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const imageUrl = URL.createObjectURL(file);

// //             setFields((prevFields) => {
// //                 const updatedFields = prevFields.map((field) => {
// //                     if (field.id === popupFieldId) {
// //                         const updatedColumnData = [...field.columnData];
// //                         updatedColumnData[selectedColumn].image = imageUrl;
// //                         return { ...field, columnData: updatedColumnData };
// //                     }
// //                     return field;
// //                 });
// //                 return updatedFields;
// //             });
// //         }
// //     };

// //     const handleContentChange = (value, popupFieldId, selectedColumn) => {
// //         setFields((prevFields) => {
// //             const updatedFields = prevFields.map((field) => {
// //                 if (field.id === popupFieldId) {
// //                     const updatedColumnData = [...field.columnData];
// //                     updatedColumnData[selectedColumn].content = value;
// //                     return { ...field, columnData: updatedColumnData };
// //                 }
// //                 return field;
// //             });
// //             return updatedFields;
// //         });
// //     };

// //     const handleEditChange = (value) => {
// //         console.log("Editor value changed:", value);
// //         console.log("Active field ID:", activeFieldId);
// //         setEditorValueed(value);

// //         setFields((prevFields) => {
// //             const updatedFields = prevFields.map((field) =>
// //                 field.id === activeFieldId
// //                     ? { ...field, content: value }
// //                     : field
// //             );
// //             console.log("Updated fields after editor change:", updatedFields);
// //             return updatedFields;
// //         });
// //     };

// //     useEffect(() => {
// //         if (window.innerWidth > 1400) {
// //             setShowFieldInput(true);
// //         } else {
// //             setShowFieldInput(false);
// //         }

// //         const handleResize = () => {
// //             if (window.innerWidth > 1400) {
// //                 setShowFieldInput(true);
// //             } else {
// //                 setShowFieldInput(false);
// //             }
// //         };

// //         window.addEventListener("resize", handleResize);
// //         return () => window.removeEventListener("resize", handleResize);
// //     }, []);

// //     const handleFieldInput = () => {
// //         if (window.innerWidth <= 1400) {
// //             setShowFieldInput(true);
// //         }
// //     };

// //     const hanldeCancleBtn = () => {
// //         setShowFieldInput(false);
// //     }

// //     useEffect(() => {
// //         if (window.innerWidth > 1400) {
// //             setShowFieldPro(true);
// //         } else {
// //             setShowFieldPro(false);
// //         }

// //         const handleResize = () => {
// //             if (window.innerWidth > 1400) {
// //                 setShowFieldPro(true);
// //             } else {
// //                 setShowFieldPro(false);
// //             }
// //         };

// //         window.addEventListener("resize", handleResize);
// //         return () => window.removeEventListener("resize", handleResize);
// //     }, []);

// //     const handleFieldPro = () => {
// //         if (window.innerWidth <= 1400) {
// //             setShowFieldPro(true);
// //         }
// //     };

// //     const hanldeCanclepro = () => {
// //         setShowFieldPro(false);
// //     }

// //     const addColumn = (fieldId) => {
// //         const updatedFields = fields.map(f => {
// //           if (f.id === fieldId) {
// //             if (f.columnCount < 6) {
              
// //               return {
// //                 ...f,
// //                 columnCount: f.columnCount + 1,
// //                 columnData: [...f.columnData, { content: '', image: null }]
// //               };
// //             } else {
    
// //               alert('You cannot add more than 6 columns');
// //               return f; 
// //             }
// //           }
// //           return f;
// //         });
// //         setFields(updatedFields);
// //       };
      
// //       const removeColumn = (fieldId, index) => {
// //         console.log(`Attempting to remove column at index: ${index}`);
        
// //         if (index === 0) return; 
      
// //         const updatedFields = fields.map(f =>
// //           f.id === fieldId
// //             ? {
// //                 ...f,
// //                 columnCount: f.columnCount - 1,
// //                 columnData: f.columnData.filter((_, i) => i !== index)
// //               }
// //             : f
// //         );
      
// //         console.log(`Updated columns for field ${fieldId}:`, updatedFields);
// //         setFields(updatedFields);
// //       };
      

// //     return (
// //         <div>
// //             <div className='email-campaing-templates'>
// //                 <div className="builder-container">
// //                     <h3>Email campaign</h3>

// //                     <div className='builder_form_name'>
// //                         <div className='email-template-heading'>
// //                             <input
// //                                 type="text"
// //                                 value={formTitle}
// //                                 onChange={(e) => setFormTitle(e.target.value)}
// //                                 placeholder="Enter Name"
// //                             />
// //                         </div>
// //                         <div className='template-select-forms'>
// //                             <select onChange={handleFormSelect}>
// //                                 <option value="">Select a form</option>
// //                                 {formDataAdd.map((form) => (
// //                                     <option
// //                                         key={form.id}
// //                                         value={form.title}
// //                                         style={{
// //                                             color: selectedFormIds.includes(form.formId) ? '#45A7F6' : 'black',
// //                                         }}
// //                                     >
// //                                         {form.title}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <div className='form-Elements-btn email' onClick={handleFieldInput}>Form Elements</div>
// //                     <div className='builder-forms_rapp'>
// //                         <div className="builder-wrp">
// //                             <div className="controls-main-wrp email-tempalte">
// //                                 {showFieldInput && (<div className="controls-wrp email">
// //                                     {showField && (<div className="controls">
// //                                         <div className='builder-form-element'>
// //                                             <div className='buil_form_texttt'>
// //                                                 <div className='buil_form_texttt_p'>
// //                                                     <h2> Elements</h2>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                         <div className='controls-wrpping cancleimg pro email' onClick={hanldeCancleBtn}><img src={cancleimg} alt="" /></div>
// //                                         <div className='builder_fieldes'>
// //                                             <div className='builder_form_select_control'>
// //                                                 <div
// //                                                     className={`builder_form_fields ${showFields ? 'active' : ''}`}
// //                                                     onClick={toggleFields}
// //                                                 >
// //                                                     <h2>Fields</h2>
// //                                                 </div>
// //                                                 <div
// //                                                     className={`builder_form_setting ${!showFields ? 'active' : ''}`}
// //                                                     onClick={toggleSettings}
// //                                                 >
// //                                                     <h2>Settings</h2>
// //                                                 </div>

// //                                             </div>
// //                                             {showFields ? (
// //                                                 <div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={banner} alt="" /></span> <span><h4>Banner</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('richtext')}><span className='form_builder_field_img'><img src={rich} alt="" /></span> <span><h4>Rich Text</h4></span></button></div>
// //                                                     {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div> */}
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('split')}><span className='form_builder_field_img'><img src={itext} alt="" /></span> <span><h4>Images with Text</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('socalicon')}><span className='form_builder_field_img'><img src={socail} alt="" /></span> <span><h4>Social Icon</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('html convert')}><span className='form_builder_field_img'><img src={htmlicon} alt="" /></span> <span><h4>HTML Block</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('spacer')}><span className='form_builder_field_img'><img src={spacer} alt="" /></span> <span><h4>Spacer</h4></span></button></div>
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('Multicolumn')}><span className='form_builder_field_img'><img src={multimedia} /></span><span><h4>Multicolumn</h4></span></button></div>
// //                                                     {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('video')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>video</h4></span></button></div> */}
// //                                                     <div className='builderr_field_wrpp email'> <button onClick={() => addInputField('product')}><span className='form_builder_field_img'><img src={product} alt="" /></span> <span><h4>Product</h4></span></button></div></div>

// //                                             ) : (
// //                                                 <div>
// //                                                     <div className='edit_form_close'>
// //                                                         <div className='edit-formwrap'>
// //                                                             <h3>Edit Properties</h3>
// //                                                             <div className="builder_field_wrpp">
// //                                                                 <div className='edit-form-options'>
// //                                                                     <div className="edit_setting_bg">
// //                                                                         <label htmlFor="font-family-selector">Font-Family</label>
// //                                                                         <select
// //                                                                             id="font-family-selector"
// //                                                                             value={fontFamily}
// //                                                                             onChange={handleFontChange}
// //                                                                             style={{ marginLeft: '10px', padding: '5px' }}
// //                                                                         >
// //                                                                             <option value="Arial">Arial</option>
// //                                                                             <option value="Verdana">Verdana</option>
// //                                                                             <option value="Times New Roman">Times New Roman</option>
// //                                                                             <option value="Georgia">Georgia</option>
// //                                                                             <option value="Courier New">Courier New</option>
// //                                                                             <option value="Roboto">Roboto</option>
// //                                                                         </select>
// //                                                                     </div>
// //                                                                     <div className='edit_setting_bg bgcolor'>
// //                                                                         <label>
// //                                                                             Background Color:
// //                                                                         </label>
// //                                                                         <div
// //                                                                             style={{
// //                                                                                 height: "40px",
// //                                                                                 width: "115px",
// //                                                                                 borderRadius: "4px",
// //                                                                                 backgroundColor: backgroundColor,
// //                                                                                 border: "1px solid #ccc",
// //                                                                                 cursor: "pointer",
// //                                                                             }}
// //                                                                             onClick={() => document.getElementById('colorInput').click()}
// //                                                                         >
// //                                                                         </div>
// //                                                                         <input
// //                                                                             id="colorInput"
// //                                                                             type="color"
// //                                                                             style={{
// //                                                                                 display: "none"
// //                                                                             }}
// //                                                                             value={backgroundColor}
// //                                                                             onChange={(e) => setBackgroundColor(e.target.value)}
// //                                                                         />
// //                                                                     </div>
// //                                                                     <div className='edit_setting_bg'>
// //                                                                         <label>Border-Radious:</label>
// //                                                                         <input
// //                                                                             type="text"
// //                                                                             id="Border-radious"
// //                                                                             value={borderRadious}
// //                                                                             onChange={(e) => setBorderRadious(e.target.value)}
// //                                                                         />
// //                                                                     </div>

// //                                                                     <div className='edit_setting_bg'>
// //                                                                         <label>Padding:</label>
// //                                                                         <input
// //                                                                             type="text"
// //                                                                             id="Padding"
// //                                                                             value={templatePadding}
// //                                                                             onChange={(e) => setTemplatePadding(e.target.value)}
// //                                                                         />
// //                                                                     </div>

// //                                                                     <div className='edit_setting_bg'>
// //                                                                         <label htmlFor="textAlign">Text Alignment:</label>
// //                                                                         <select
// //                                                                             id="textAlign"
// //                                                                             value={textAlign}
// //                                                                             onChange={(e) => setTextAlign(e.target.value)}
// //                                                                         >
// //                                                                             <option value="left">Left</option>
// //                                                                             <option value="center">Center</option>
// //                                                                             <option value="right">Right</option>
// //                                                                         </select>
// //                                                                     </div>

// //                                                                     <div className='edit_setting_bg'>
// //                                                                         <label htmlFor="backgroundImage">Background Image:</label>
// //                                                                         <input
// //                                                                             type="file"
// //                                                                             accept="image/*"
// //                                                                             onChange={handleBackgroundImageUpload}
// //                                                                         />
// //                                                                         {backgroundImage && (
// //                                                                             <button
// //                                                                                 type="button"
// //                                                                                 onClick={handleRemoveBackgroundImage}
// //                                                                                 style={{
// //                                                                                     margin: '10px 0',
// //                                                                                     padding: '5px 10px',
// //                                                                                     cursor: 'pointer',
// //                                                                                     background: 'white',
// //                                                                                     color: 'black',
// //                                                                                     border: 'none',
// //                                                                                     borderRadius: '5px',
// //                                                                                     border: '1px solid rgb(221, 221, 221)'
// //                                                                                 }}
// //                                                                             >

// //                                                                                 Remove Background
// //                                                                             </button>
// //                                                                         )}
// //                                                                         {backgroundImage && (
// //                                                                             <div
// //                                                                                 className="edit_setting_bg"
// //                                                                                 style={{
// //                                                                                     backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
// //                                                                                     backgroundRepeat: 'no-repeat',
// //                                                                                     backgroundSize: 'contain',
// //                                                                                     backgroundPosition: 'center',
// //                                                                                     height: '200px',
// //                                                                                     width: '100%',
// //                                                                                     border: '1px solid #ddd',
// //                                                                                 }}
// //                                                                             >

// //                                                                             </div>
// //                                                                         )}
// //                                                                     </div>
// //                                                                 </div>
// //                                                             </div>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             )}

// //                                         </div>
// //                                     </div>
// //                                     )}
// //                                 </div>)}

// //                                 <div className='form_builder_build email'>
// //                                     <div id='bg_change' className="form-builder-wrp email-temp" >
// //                                         <div className='btn-email-templates'>
// //                                             <button className={`btn-templates ${(viewMode === 'desktop' || emailWidth === '800px') && emailWidth !== '400px' ? 'active' : ''}`} onClick={() => toggleViewMode('desktop')}>
// //                                                 <img src={desk} alt="Desktop" /> Desktop
// //                                             </button>
// //                                             <button className={`btn-templates ${(viewMode === 'mobile' || emailWidth === '400px') && emailWidth !== '800px' ? 'active' : ''}`} onClick={() => toggleViewMode('mobile')}>
// //                                                 <img src={phonem} alt="Mobile" /> Mobile
// //                                             </button>
// //                                         </div>

// //                                         <div
// //                                             className="form-builder email-template"
// //                                             ref={formBuilderRef}
// //                                             style={{
// //                                                 backgroundColor,
// //                                                 width: emailWidth,
// //                                                 textAlign,
// //                                                 padding: `${templatePadding}px`,
// //                                                 borderRadius: `${borderRadious}px`,
// //                                                 backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
// //                                                 backgroundSize: 'cover',
// //                                                 backgroundPosition: 'center',
// //                                                 margin: 'auto',
// //                                                 fontFamily
// //                                             }}
// //                                         >
// //                                             {fields.length === 0 ? (
// //                                                 <div>

// //                                                     <div className="builder-block-img-forms">
// //                                                         <div className='builder_block_blank'>
// //                                                             <img src={emailtemp} alt="Email Template" />
// //                                                             <div className='builder-block-img-forms-paragraph'>
// //                                                                 <p>Let's create the Email.</p>
// //                                                             </div>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             ) : (
// //                                                 <>
// //                                                     {fields
// //                                                         .filter((field) => field && field.id && field.type)
// //                                                         .map((field) => {
// //                                                             console.log('Rendering field:', field);
// //                                                             if (field.type === 'heading') {
// //                                                                 const HeadingTag = field.headingLevel || 'h1';

// //                                                                 return (
// //                                                                     <div
// //                                                                         key={field.id}
// //                                                                         onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                     >
// //                                                                         <div className='email-input-field'
// //                                                                             style={{

// //                                                                                 backgroundColor: field.headingbg,
// //                                                                                 borderWidth: `${field.headingBorderWidth}px`,
// //                                                                                 borderStyle: field.headingBorderStyle,
// //                                                                                 borderColor: field.headingBorderColor,
// //                                                                                 backgroundImage: field.headingbgImage
// //                                                                                     ? `url(${field.headingbgImage})`
// //                                                                                     : `url(${hdbg})`,
// //                                                                                 backgroundRepeat: 'no-repeat',
// //                                                                                 backgroundSize: 'cover',
// //                                                                                 width: `${field.bannerImageWidth}%`,
// //                                                                                 height: field.bannerImageHeight || '400px',
// //                                                                                 position: 'relative'
// //                                                                             }}
// //                                                                         >
// //                                                                             <div className='email-input-field-h1' style={{
// //                                                                                 position: 'absolute', top: '40%',
// //                                                                                 width: '100%',
// //                                                                                 textAlign: field.headingTextAlign || '',
// //                                                                                 padding: `${field.headingPadding}px`,
// //                                                                             }}>
// //                                                                                 {React.createElement(HeadingTag, {
// //                                                                                     style: {
// //                                                                                         fontWeight: field.headingFontWeight,
// //                                                                                         fontSize: `${field.headingFontSize || 40}px`,
// //                                                                                         color: field.headingColor,
// //                                                                                         letterSpacing: `${field.headingLetterSpacing}px`,
// //                                                                                     }
// //                                                                                 }, field.headingText || field.value)}

// //                                                                                 {(field.editorContent || editorValue) && (
// //                                                                                     <div
// //                                                                                         className="heading-editor-content"
// //                                                                                         style={{ fontSize: '20px', margin: '20px 0' }}
// //                                                                                         dangerouslySetInnerHTML={{
// //                                                                                             __html: field.editorContent || editorValue || 'Its a numbers game'
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 )}
// //                                                                                 <a href={field.headingUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
// //                                                                                     <button
// //                                                                                         onClick={(e) => {
// //                                                                                             e.preventDefault();
// //                                                                                             console.log("Button clicked, but no navigation.");
// //                                                                                         }}
// //                                                                                         style={{
// //                                                                                             background: field.headerbtnbg,
// //                                                                                             color: field.headerbtncolor,
// //                                                                                             height: `${field.headingbtnheight}px`,
// //                                                                                             width: `${field.headingbtnwidth}px`,
// //                                                                                             fontSize: `${field.headingbtnFontSize}px`,
// //                                                                                             borderRadius: `${field.headingbtnradious}px`,
// //                                                                                             padding: `${field.headingbtnPadding}px`,
// //                                                                                             borderWidth: `${field.headingbtnBorderWidth}px`,
// //                                                                                             borderStyle: field.headingbtnBorderStyle,
// //                                                                                             borderColor: field.headingbtnBorderColor,
// //                                                                                         }}
// //                                                                                     >
// //                                                                                         {field.headerbtn}
// //                                                                                     </button>
// //                                                                                 </a>

// //                                                                             </div>
// //                                                                             <div className='form-builder-radio-btn email'>
// //                                                                                 <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                     <img src={editicon} alt="copy" />
// //                                                                                 </button>
// //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                     <img src={delete1} alt="delete" />
// //                                                                                 </button>
// //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                     <img src={maximizesize} alt="copy" />
// //                                                                                 </button>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }
// //                                                             if (field.type === 'description') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                     >
// //                                                                         <div style={{
// //                                                                             backgroundColor: field.descriptionbg,
// //                                                                             padding: `${field.descriptionPadding}px`,
// //                                                                         }}>
// //                                                                             <p style={{
// //                                                                                 fontSize: `${field.descritionFontSize}px`,
// //                                                                                 letterSpacing: `${field.descriptionLetterSpacing}px`,
// //                                                                                 textAlign: field.descriptionTextAlign || '',
// //                                                                                 borderWidth: `${field.descriptionBorderWidth}px`,
// //                                                                                 borderStyle: field.descriptionBorderStyle,
// //                                                                                 borderColor: field.descriptionBorderColor,
// //                                                                                 fontWeight: field.descritionFontWeight,
// //                                                                                 color: field.descritionColor
// //                                                                             }}>{field.descriptionText || field.value || ''}</p>

// //                                                                         </div>
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'images') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex', justifyContent: 'center' }}
// //                                                                         ref={emailFieldRef}
// //                                                                     >
// //                                                                         <div className='email_field-images'
// //                                                                             style={{
// //                                                                                 textAlign: field.imgTextAlign ? field.imgTextAlign : '',
// //                                                                                 backgroundColor: field.imgbg,
// //                                                                                 borderWidth: `${field.imgBorderWidth}px`,
// //                                                                                 borderStyle: field.imgBorderStyle,
// //                                                                                 borderColor: field.imgBorderColor,
// //                                                                             }}>

// //                                                                             <img src={field.value || imghd} alt="Dynamic" style={{
// //                                                                                 width: `${field.imgWidth}%`,
// //                                                                                 padding: `${field.imgPadding}px`,
// //                                                                             }} />

// //                                                                         </div>

// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }
// //                                                             if (field.type === 'divider') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                         ref={emailFieldRef}
// //                                                                     >
// //                                                                         <hr style={{
// //                                                                             border: `1px solid ${field.dividerColor}`, width: `${field.dividerWidth}%`,
// //                                                                             height: `${field.dividerheight}px`
// //                                                                         }} />
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'split') {
// //                                                                 const isImageUploaded = field.add === 'image' && field.value.startsWith('data:image');
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field split-width ${activeFieldId === field.id ? 'active' : ''}`}

// //                                                                         style={{
// //                                                                             width: field.width,
// //                                                                             backgroundColor: field.splitbg,
// //                                                                             padding: `${field.splitPadding}px`,
// //                                                                             // border: '1px solid #B5B7C0',
// //                                                                             height: '300px',
// //                                                                             textAlign: field.splitTextAlin,
// //                                                                             position: 'relative',
// //                                                                             display: 'flex'

// //                                                                         }}
// //                                                                     >
// //                                                                         {field.add === 'image' ? (
// //                                                                             <img
// //                                                                                 src={isImageUploaded ? field.value : imghd1}
// //                                                                                 alt="Uploaded Preview"
// //                                                                                 style={{ width: '100%', height: 'auto' }}
// //                                                                             />

// //                                                                         ) : (
// //                                                                             <div style={{ position: 'absolute', top: '40%' }}>
// //                                                                                 <div dangerouslySetInnerHTML={{ __html: field.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers ...' }} />
// //                                                                             </div>
// //                                                                         )}
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'richtext') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                     >
// //                                                                         <div style={{ width: '100%' }}>
// //                                                                             <div style={{ textAlign: field.richTextAlign || '' }} dangerouslySetInnerHTML={{ __html: field.content || 'Captivate customers with' }} />
// //                                                                             <div className='form-builder-radio-btn email'>
// //                                                                                 <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                     <img src={editicon} alt="copy" />
// //                                                                                 </button>
// //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                     <img src={delete1} alt="delete" />
// //                                                                                 </button>
// //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                     <img src={maximizesize} alt="copy" />
// //                                                                                 </button>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }
// //                                                             if (field.type === 'spacer') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                         ref={emailFieldRef}
// //                                                                     >
// //                                                                         <div className='spacer-height-show' style={{ height: `${field.spacerHeight}px`, backgroundColor: field.spacerbg }}></div>
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );

// //                                                             }
// //                                                             if (field.type === 'video') {

// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                         ref={emailFieldRef}
// //                                                                     >
// //                                                                         <div className='email-tempalte-video-show' style={{ padding: `${field.videoPadding}px`, borderWidth: `${field.videoBorderWidth}px`, borderStyle: field.videoBorderStyle, borderColor: field.videoBorderColor }}>
// //                                                                             {field.value && getVideoEmbedUrl(field.value) ? (
// //                                                                                 <iframe
// //                                                                                     height="250px"
// //                                                                                     width="500px"
// //                                                                                     src={getVideoEmbedUrl(field.value)}
// //                                                                                     title="Video Preview"
// //                                                                                     frameBorder="0"
// //                                                                                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// //                                                                                     allowFullScreen
// //                                                                                 ></iframe>) : (
// //                                                                                 <div className='email-tempalte-img'>
// //                                                                                     <img src={videoplay} alt="" />
// //                                                                                 </div>
// //                                                                             )}
// //                                                                         </div>
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>

// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'button') {
// //                                                                 return (
// //                                                                     <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field leftbtn ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                         style={{ display: 'flex' }}
// //                                                                         ref={emailFieldRef}
// //                                                                     >
// //                                                                         <div style={{ width: '100%' }}>
// //                                                                             <a href={field.buttonUrll}
// //                                                                                 onClick={(event) => {
// //                                                                                     event.preventDefault();
// //                                                                                     console.log("Button clicked!");
// //                                                                                 }}
// //                                                                             >
// //                                                                                 <button
// //                                                                                     type="button"
// //                                                                                     style={{
// //                                                                                         fontSize: `${field.buttonFontSize}px`,
// //                                                                                         color: field.buttonTextColor,
// //                                                                                         backgroundColor: field.buttonColor,
// //                                                                                         width: `${field.buttonWidth}px`,
// //                                                                                         height: `${field.buttonHeight}px`,
// //                                                                                         padding: `${field.buttonPadding}px`,
// //                                                                                         borderWidth: `${field.buttonBorderWidth}px`,
// //                                                                                         borderStyle: field.buttonBorderStyle,
// //                                                                                         borderColor: field.buttonBorderColor,
// //                                                                                         letterSpacing: `${field.buttonLetterSpacing}px`,
// //                                                                                         borderRadius: `${field.buttonradious}px`
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     {field.buttonLabel}
// //                                                                                 </button>
// //                                                                             </a>
// //                                                                         </div>

// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'html convert') {
// //                                                                 return (
// //                                                                     <div className="form-builder-and-preview">
// //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                             className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                             style={{ display: 'flex' }}
// //                                                                             ref={emailFieldRef}
// //                                                                         >
// //                                                                             <div style={{ width: '100%' }}>
// //                                                                                 <div style={{ color: field.htmlColor, fontSize: `${field.htmlFontSize}px`, padding: `${field.htmlPadding}px` }}
// //                                                                                     className="preview-content"
// //                                                                                     dangerouslySetInnerHTML={{ __html: field.value || field.htmltext }}
// //                                                                                 />
// //                                                                                 <div className='form-builder-radio-btn email'>
// //                                                                                     <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                         <img src={editicon} alt="copy" />
// //                                                                                     </button>
// //                                                                                     <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                         <img src={delete1} alt="delete" />
// //                                                                                     </button>
// //                                                                                     <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                         <img src={maximizesize} alt="copy" />
// //                                                                                     </button>
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }
// //                                                             if (field.type === 'Multicolumn') {
// //                                                                 console.log("Field Data:", field)
// //                                                                 console.log("Column Datas:", field.columnData);

// //                                                                 return (
// //                                                                     <div key={field.id}
// //                                                                         onClick={() => handleFieldClick(field.id)}
// //                                                                         className={`email_field columns-container ${activeFieldId === field.id ? 'active' : ''}`}

// //                                                                         data-columns={field.columnCount}
// //                                                                     >

// //                                                                         {Array.from({ length: field.columnCount || 6 }, (_, index) => (
// //                                                                             <div
// //                                                                                 key={index}
// //                                                                                 className={`column ${field.selectedColumn === index ? 'active-column' : ''}`}
// //                                                                                 onClick={(e) => handleColumnClick(field.id, index)}
// //                                                                                 style={{
// //                                                                                     border: field.selectedColumn === index ? '2px solid red' : '1px solid gray',
// //                                                                                     cursor: 'pointer',
// //                                                                                 }}
// //                                                                             >
// //                                                                                 {field.columnData && field.columnData[index] ? (
// //                                                                                     <>
// //                                                                                         {console.log("valuess", field.columnData[index])}
// //                                                                                         {field.columnData[index].image && (
// //                                                                                             <img
// //                                                                                                 src={field.columnData[index].image}
// //                                                                                                 alt={`Uploaded for Column ${index + 1}`}
// //                                                                                                 style={{ width: '100px', height: '100px', marginTop: '10px' }}
// //                                                                                             />
// //                                                                                         )}

// //                                                                                         {field.columnData[index].content && (
// //                                                                                             <div
// //                                                                                                 dangerouslySetInnerHTML={{
// //                                                                                                     __html: field.columnData[index].content,
// //                                                                                                 }}
// //                                                                                             />
// //                                                                                         )}
// //                                                                                     </>
// //                                                                                 ) : (

// //                                                                                     columnImages[`${field.id}-${index}`] || editorValues[`${field.id}-${index}`] ? (
// //                                                                                         <>

// //                                                                                             {columnImages[`${field.id}-${index}`] && (
// //                                                                                                 <img
// //                                                                                                     src={columnImages[`${field.id}-${index}`]}
// //                                                                                                     alt={`Uploaded for Column ${index + 1}`}
// //                                                                                                     style={{ width: '100px', height: '100px', marginTop: '10px' }}
// //                                                                                                 />
// //                                                                                             )}

// //                                                                                             {editorValues[`${field.id}-${index}`] && (
// //                                                                                                 <div
// //                                                                                                     dangerouslySetInnerHTML={{
// //                                                                                                         __html: editorValues[`${field.id}-${index}`],
// //                                                                                                     }}
// //                                                                                                 />
// //                                                                                             )}
// //                                                                                         </>
// //                                                                                     ) : (

// //                                                                                         <div style={{ color: 'gray' }}>
// //                                                                                             <h2>Column {index + 1}</h2>
// //                                                                                             Elevate your online store with our easy-to-use Text Box feature.
// //                                                                                             It's a game-changer for personalization, allowing customers to add their
// //                                                                                             special touch directly from a user-friendly drop-down menu.
// //                                                                                         </div>
// //                                                                                     )
// //                                                                                 )}
// //                                                                             </div>
// //                                                                         ))}
// //                                                                         <div className='form-builder-radio-btn email'>
// //                                                                             <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                 <img src={editicon} alt="copy" />
// //                                                                             </button>
// //                                                                             <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                 <img src={delete1} alt="delete" />
// //                                                                             </button>
// //                                                                             <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                 <img src={maximizesize} alt="copy" />
// //                                                                             </button>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'product' && field.products) {
// //                                                                 return (
// //                                                                     <div onClick={() => handleAddProductToSelected(field.id, field.title, field.image, field.products)}>
// //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                             className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                             style={{ display: 'flex' }}
// //                                                                             ref={emailFieldRef}
// //                                                                         >
// //                                                                             <div className={`template-products ${productsPerRow ? `row-${productsPerRow}` : 'row-3'} ${viewMode === 'mobile' ? 'mobile' : ''}`}
// //                                                                                 style={{
// //                                                                                     padding: `${field.productPadding}px`,
// //                                                                                     backgroundColor: field.productbg,
// //                                                                                     borderWidth: `${field.productBorderWidth}px`,
// //                                                                                     borderStyle: field.productBorderStyle,
// //                                                                                     borderColor: field.productBorderColor,
// //                                                                                     fontSize: `${field.productFontSize}px`,
// //                                                                                     color: field.productTextColor,
// //                                                                                     width: '100%'
// //                                                                                 }}
// //                                                                             >
// //                                                                                 {field.products.map((product) => (
// //                                                                                     <div className='product-show' key={product.id}>

// //                                                                                         {product.image ? (
// //                                                                                             <div className="images-gallery">
// //                                                                                                 <img
// //                                                                                                     src={product.image}
// //                                                                                                     alt={product.images || 'Product Image'}
// //                                                                                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
// //                                                                                                 />
// //                                                                                             </div>
// //                                                                                         ) : (
// //                                                                                             <p>No image available</p>
// //                                                                                         )}
// //                                                                                         <div>
// //                                                                                             <h4 style={{ letterSpacing: `${field.productLetterSpacing}px`, fontWeight: field.productWeight, }}>{product.title}</h4>
// //                                                                                             {showPrice && product.price && (
// //                                                                                                 <p style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>
// //                                                                                                     ${product.price}
// //                                                                                                 </p>
// //                                                                                             )}
// //                                                                                         </div>

// //                                                                                         {showbtnn && (
// //                                                                                             <a href={`https://${shop}/admin/products?selectedView=all`} target="_blank" rel="noopener noreferrer">
// //                                                                                                 <button
// //                                                                                                     style={{
// //                                                                                                         fontSize: `${field.productfontSize}px`,
// //                                                                                                         width: `${field.productwidth}px`,
// //                                                                                                         height: `${field.productheight}px`,
// //                                                                                                         backgroundColor: field.productbackgroundColor,
// //                                                                                                         borderWidth: `${field.productbtnBorderWidth}px`,
// //                                                                                                         borderStyle: field.productbtnBorderStyle,
// //                                                                                                         borderColor: field.productbtnBorderColor,
// //                                                                                                         color: field.productbtnbg,
// //                                                                                                         borderRadius: `${field.productradious}px`,
// //                                                                                                     }}
// //                                                                                                     className='show-bnt-prodcut'>{field.productLabel}</button>
// //                                                                                             </a>
// //                                                                                         )}
// //                                                                                     </div>
// //                                                                                 ))}
// //                                                                             </div>
// //                                                                             <div className='form-builder-radio-btn email'>
// //                                                                                 <button className="copy-btn email" onClick={() => handleFieldClick(field.id)}>
// //                                                                                     <img src={editicon} alt="copy" />
// //                                                                                 </button>
// //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                     <img src={delete1} alt="delete" />
// //                                                                                 </button>
// //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                     <img src={maximizesize} alt="copy" />
// //                                                                                 </button>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 );
// //                                                             }

// //                                                             if (field.type === 'socalicon') {
// //                                                                 return (
// //                                                                     <div onClick={() => handleEdit(field)}>
// //                                                                         <div key={field.id} onClick={() => handleFieldClick(field.id)}
// //                                                                             className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
// //                                                                             style={{ display: 'flex', width: '100%' }}
// //                                                                             ref={emailFieldRef}

// //                                                                         >
// //                                                                             <div style={{ textAlign: field.socaliconTextAlign || '', padding: `${field.socalIconPadding}px`, width: '100%' }} >
// //                                                                                 <div className="social-icons" >
// //                                                                                     {field.icons.facebook && field.icons.facebook.url && !field.icons.facebook.isHidden && (
// //                                                                                         <a href={field.icons.facebook.url} onClick={(e) => e.preventDefault()}>
// //                                                                                             <img src={facebook} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// //                                                                                         </a>
// //                                                                                     )}
// //                                                                                     {field.icons.twitter && field.icons.twitter.url && !field.icons.twitter.isHidden && (
// //                                                                                         <a href={field.icons.twitter.url} onClick={(e) => e.preventDefault()}>
// //                                                                                             <img src={twitter} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// //                                                                                         </a>
// //                                                                                     )}
// //                                                                                     {field.icons.instagram && field.icons.instagram.url && !field.icons.instagram.isHidden && (
// //                                                                                         <a href={field.icons.instagram.url} onClick={(e) => e.preventDefault()}>
// //                                                                                             <img src={instagram} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
// //                                                                                         </a>
// //                                                                                     )}
// //                                                                                     {field.customIcons.map((icon, index) =>
// //                                                                                         icon.url && !icon.isHidden ? (
// //                                                                                             <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
// //                                                                                                 <img src={icon.src} alt={`Custom Icon ${index}`} style={{ width: `${socalIconWidth}px`, }} />
// //                                                                                             </a>
// //                                                                                         ) : null
// //                                                                                     )}
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                             <div className='form-builder-radio-btn email'>
// //                                                                                 <button className='remove-btn' onClick={() => removeField(field.id)}>
// //                                                                                     <img src={delete1} alt="delete" />
// //                                                                                 </button>
// //                                                                                 <button className="copy-btn" onClick={() => addInputField(field.type)}>
// //                                                                                     <img src={maximizesize} alt="copy" />
// //                                                                                 </button>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     </div>
// //                                                                 )
// //                                                             }
// //                                                         })
// //                                                     }

// //                                                 </>
// //                                             )}
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                                 {showFieldPro && (<div className='form-builder-change-pro email'>
// //                                     <div className='controls-wrpping cancleimg pro email' onClick={hanldeCanclepro}><img src={cancleimg} alt="" /></div>
// //                                     <div className='email-template-input-setting'>
// //                                         {emailFieldPopup && (<div className='form-builder-change-propertites email' ref={popupRef}>
// //                                             <div className='form-builder-change_show_all'>
// //                                                 <div className='form_qucik'>
// //                                                     <p>Quick setup Settings</p>
// //                                                 </div>
// //                                                 <div className='form_build_propertities'>

// //                                                     {fields.length > 0 && selectedFieldId && (
// //                                                         <div className='quick-setup-settings'>
// //                                                             {fields.map((field) => {
// //                                                                 if (field.id === selectedFieldId && field.type === 'Multicolumn') {
// //                                                                     return (
// //                                                                         <div>
// //                                                                             <div className="form-builder-chaneging-wrap">
// //                                                                                 <div className="form-builder-chaneging-wrap select">
// //                                                                                     <label>Select Columns</label>
// //                                                                                     <div className="column-options">
// //                                                                                         <select
// //                                                                                             value={columnCount}
// //                                                                                             onChange={(e) => handleColumnSelection(e.target.value)}
// //                                                                                         >
// //                                                                                             {[1, 2, 3, 4, 5, 6].map((column) => (
// //                                                                                                 <option key={column} value={column}>
// //                                                                                                     {column} Columns
// //                                                                                                 </option>
// //                                                                                             ))}
// //                                                                                         </select>
// //                                                                                     </div>
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                             <div className="form-builder-chaneging-wrap updatemulti">
// //                                                                                 {field.columnData && field.selectedColumn !== undefined && field.columnData[field.selectedColumn] ? (
// //                                                                                     <>
// //                                                                                         <div className="form-builder-chaneging-wrap updatemulti">
// //                                                                                             {field.columnData && field.selectedColumn !== undefined && field.columnData[field.selectedColumn] ? (
// //                                                                                                 <>

// //                                                                                                     {field.columnData[field.selectedColumn].image ? (
// //                                                                                                         <div>
// //                                                                                                             <img
// //                                                                                                                 src={field.columnData[field.selectedColumn].image}
// //                                                                                                                 alt="Selected Column Image"
// //                                                                                                                 style={{ width: '150px', height: '150px', marginBottom: '10px' }}
// //                                                                                                             />
// //                                                                                                             <button
// //                                                                                                                 onClick={() =>
// //                                                                                                                     handleRemoveImage1(
// //                                                                                                                         popupFieldId,
// //                                                                                                                         fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                                                     )
// //                                                                                                                 }
// //                                                                                                                 style={{
// //                                                                                                                     display: 'block',
// //                                                                                                                     marginTop: '10px',
// //                                                                                                                     padding: '5px 10px',
// //                                                                                                                     cursor: 'pointer',
// //                                                                                                                 }}
// //                                                                                                             >
// //                                                                                                                 Remove Image
// //                                                                                                             </button>
// //                                                                                                             <button
// //                                                                                                                 onClick={() => setFileInputVisible(true)}
// //                                                                                                                 style={{
// //                                                                                                                     display: 'block',
// //                                                                                                                     marginTop: '10px',
// //                                                                                                                     padding: '5px 10px',
// //                                                                                                                     cursor: 'pointer',
// //                                                                                                                 }}
// //                                                                                                             >
// //                                                                                                                 Update Image
// //                                                                                                             </button>
// //                                                                                                             {isFileInputVisible && (
// //                                                                                                                 <div className="form-builder-chaneging-wrap file">
// //                                                                                                                     <label>Upload Image</label>
// //                                                                                                                     <input
// //                                                                                                                         type="file"
// //                                                                                                                         accept="image/*"
// //                                                                                                                         onChange={(e) =>
// //                                                                                                                             handleImageUpload1(e, popupFieldId, fields.find((f) => f.id === popupFieldId)?.selectedColumn)
// //                                                                                                                         }
// //                                                                                                                         style={{ marginTop: '10px' }}
// //                                                                                                                     />
// //                                                                                                                 </div>
// //                                                                                                             )}
// //                                                                                                         </div>
// //                                                                                                     ) : (

// //                                                                                                         <div className="form-builder-chaneging-wrap file">
// //                                                                                                             <label>Upload Image</label>
// //                                                                                                             <input
// //                                                                                                                 type="file"
// //                                                                                                                 accept="image/*"
// //                                                                                                                 onChange={(e) =>
// //                                                                                                                     handleImageUpload1(
// //                                                                                                                         e,
// //                                                                                                                         popupFieldId,
// //                                                                                                                         fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                                                     )
// //                                                                                                                 }
// //                                                                                                                 style={{ marginTop: '10px' }}
// //                                                                                                             />
// //                                                                                                         </div>
// //                                                                                                     )}
// //                                                                                                 </>
// //                                                                                             ) : (
// //                                                                                                 <p></p>
// //                                                                                             )}
// //                                                                                         </div>

// //                                                                                         <div>
// //                                                                                             <ReactQuill
// //                                                                                                 value={field.columnData[field.selectedColumn].content}
// //                                                                                                 modules={{ toolbar: toolbarOptions }}
// //                                                                                                 onChange={(value) =>
// //                                                                                                     handleContentChange(
// //                                                                                                         value,
// //                                                                                                         popupFieldId,
// //                                                                                                         fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                                     )
// //                                                                                                 }
// //                                                                                             />
// //                                                                                         </div>
// //                                                                                     </>
// //                                                                                 ) : (
// //                                                                                     <p>No column selected or column data is missing.</p>
// //                                                                                 )}
// //                                                                             </div>

// //                                                                             <div className="form-builder-chaneging-wrap">
// //                                                                                 <div className="form-builder-chaneging-wrap file">
// //                                                                                     <label>
// //                                                                                         Column{' '}
// //                                                                                         {fields.find((f) => f.id === popupFieldId)?.selectedColumn + 1}{' '}
// //                                                                                         Selected
// //                                                                                     </label>
// //                                                                                     <input
// //                                                                                         type="file"
// //                                                                                         accept="image/*"
// //                                                                                         onChange={(e) =>
// //                                                                                             handleImageUploaded(
// //                                                                                                 e,
// //                                                                                                 popupFieldId,
// //                                                                                                 fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                             )
// //                                                                                         }
// //                                                                                     />
// //                                                                                     {columnImages[
// //                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// //                                                                                     ] && (
// //                                                                                             <div>
// //                                                                                                 <img
// //                                                                                                     src={
// //                                                                                                         columnImages[
// //                                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// //                                                                                                         ]
// //                                                                                                     }
// //                                                                                                     alt="Image Preview"
// //                                                                                                     style={{
// //                                                                                                         maxWidth: '100%',
// //                                                                                                         maxHeight: '200px',
// //                                                                                                         marginTop: '10px',
// //                                                                                                     }}
// //                                                                                                 />
// //                                                                                                 <button
// //                                                                                                     onClick={() =>
// //                                                                                                         handleRemoveImage(
// //                                                                                                             popupFieldId,
// //                                                                                                             fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                                         )
// //                                                                                                     }
// //                                                                                                     style={{
// //                                                                                                         display: 'block',
// //                                                                                                         marginTop: '10px',
// //                                                                                                         padding: '5px 10px',
// //                                                                                                         cursor: 'pointer',
// //                                                                                                     }}
// //                                                                                                 >
// //                                                                                                     Remove Image
// //                                                                                                 </button>
// //                                                                                             </div>
// //                                                                                         )}
// //                                                                                 </div>

// //                                                                                 <ReactQuill
// //                                                                                     value={
// //                                                                                         editorValues[
// //                                                                                         `${popupFieldId}-${fields.find((f) => f.id === popupFieldId)?.selectedColumn}`
// //                                                                                         ] || ''
// //                                                                                     }
// //                                                                                     onChange={(value) =>
// //                                                                                         handleEditorChangeed(
// //                                                                                             value,
// //                                                                                             popupFieldId,
// //                                                                                             fields.find((f) => f.id === popupFieldId)?.selectedColumn
// //                                                                                         )
// //                                                                                     }
// //                                                                                     modules={{ toolbar: toolbarOptions }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === 'richtext') {
// //                                                                     return (
// //                                                                         <div>
// //                                                                             <div >
// //                                                                                 <ReactQuill
// //                                                                                     value={editorValueed || field.content || 'Captivate customers with'}
// //                                                                                     onChange={handleEditChange}
// //                                                                                     modules={{ toolbar: toolbarOptions }}
// //                                                                                 />

// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.richTextAlign}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, richTextAlign: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     )
// //                                                                 }
// //                                                                 if (field.id === selectedFieldId && field.type === 'product') {
// //                                                                     return (
// //                                                                         <div>

// //                                                                             <div>
// //                                                                                 <div className="show-select-product">
// //                                                                                     <h3>Products</h3>
// //                                                                                     {productTitles.length > 0 ? (
// //                                                                                         productTitles.map((title, index) => (
// //                                                                                             <div className='show-product-details' key={index}>
// //                                                                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
// //                                                                                                     {productImage[index] && (
// //                                                                                                         <img
// //                                                                                                             src={productImage[index]}
// //                                                                                                             alt={title}
// //                                                                                                             style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
// //                                                                                                         />
// //                                                                                                     )}
// //                                                                                                     <h4>{title.length > 35 ? title.slice(0, 35) + '...' : title}</h4>
// //                                                                                                 </div>
// //                                                                                                 <div style={{ cursor: "pointer" }} onClick={() => handleRemoveProductFromForm(index)}>
// //                                                                                                     <img src={deletep} alt="" style={{ width: '70%' }} />
// //                                                                                                 </div>
// //                                                                                             </div>
// //                                                                                         ))
// //                                                                                     ) : (
// //                                                                                         <p>No products selected</p>
// //                                                                                     )}

// //                                                                                     <button className='product-btn-addproduct' onClick={AddProduct}>Add Product</button>
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                             <div className='product-detalis-all'>
// //                                                                                 <h3>Product details</h3>
// //                                                                                 <label className="custom-checkbox">
// //                                                                                     <input
// //                                                                                         type="checkbox"
// //                                                                                         checked={showPrice}
// //                                                                                         onChange={togglePrice}
// //                                                                                     />
// //                                                                                     Price
// //                                                                                 </label>
// //                                                                                 <label className="custom-checkbox">
// //                                                                                     <input
// //                                                                                         type="checkbox"
// //                                                                                         checked={showbtnn}
// //                                                                                         onChange={togglebtnn}
// //                                                                                     />
// //                                                                                     Button
// //                                                                                 </label>
// //                                                                             </div>
// //                                                                             <div className="product-detalis-all">
// //                                                                                 <h3>Product layout</h3>
// //                                                                                 <div className='form-builder-chaneging-wrap select'>
// //                                                                                     <select onChange={handleProductsPerRowChange} defaultValue={3}>
// //                                                                                         {[...Array(6).keys()].map(i => (
// //                                                                                             <option key={i + 1} value={i + 1}>{i + 1} per row</option>
// //                                                                                         ))}
// //                                                                                     </select>
// //                                                                                 </div>

// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Padding (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.productPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Background Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.productbg || '#ffffff'}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.productBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.productBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.productBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Font Size (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.productFontSize}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productFontSize: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.productTextColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productTextColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Font-Weight</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.productWeight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productWeight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}

// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Letter Spacing</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.productLetterSpacing}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, productLetterSpacing: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Letter Spacing"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap all-btn'>
// //                                                                                 <label> Button</label>
// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <label>Button Label</label>
// //                                                                                     <input
// //                                                                                         type="text"
// //                                                                                         value={field.productLabel}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productLabel: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap number'>
// //                                                                                     <label>Font Size (px)</label>
// //                                                                                     <input
// //                                                                                         type="number"
// //                                                                                         value={field.productfontSize}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productfontSize: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap number'>
// //                                                                                     <label>Width (px)</label>
// //                                                                                     <input
// //                                                                                         type="number"
// //                                                                                         value={field.productwidth}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productwidth: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>

// //                                                                                 <div className='form-builder-chaneging-wrap number'>
// //                                                                                     <label>Height (px)</label>
// //                                                                                     <input
// //                                                                                         type="number"
// //                                                                                         value={field.productheight}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productheight: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap color'>
// //                                                                                     <label>Background Color</label>
// //                                                                                     <input
// //                                                                                         type="color"
// //                                                                                         value={field.productbackgroundColor}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productbackgroundColor: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap color'>
// //                                                                                     <label>Border Color</label>
// //                                                                                     <input
// //                                                                                         type="color"
// //                                                                                         value={field.productbtnBorderColor}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productbtnBorderColor: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>

// //                                                                                 <div className='form-builder-chaneging-wrap number' >
// //                                                                                     <label>Border Width (px)</label>
// //                                                                                     <input
// //                                                                                         type="number"
// //                                                                                         value={field.productbtnBorderWidth}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productbtnBorderWidth: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <label>Border Style</label>
// //                                                                                     <select
// //                                                                                         value={field.productbtnBorderStyle}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productbtnBorderStyle: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     >
// //                                                                                         <option value="solid">Solid</option>
// //                                                                                         <option value="dashed">Dashed</option>
// //                                                                                         <option value="dotted">Dotted</option>
// //                                                                                     </select>
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap color'>
// //                                                                                     <label>Color</label>
// //                                                                                     <input
// //                                                                                         type="color"
// //                                                                                         value={field.productbtnbg || '#ffffff'}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productbtnbg: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap number'>
// //                                                                                     <label>Border-Radious</label>
// //                                                                                     <input
// //                                                                                         type="number"
// //                                                                                         value={field.productradious || '#ffffff'}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, productradious: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </div>
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     )
// //                                                                 }
// //                                                                 if (field.id === selectedFieldId && field.type === 'heading') {
// //                                                                     return (
// //                                                                         <div key={field.id}>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Heading Text:</label>
// //                                                                                 <input
// //                                                                                     type="text"
// //                                                                                     value={field.headingText || field.value}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingText: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Enter Heading Text"
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Heading Level:</label>
// //                                                                                 <select
// //                                                                                     value={field.headingLevel}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingLevel: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="h1">H1</option>
// //                                                                                     <option value="h2">H2</option>
// //                                                                                     <option value="h3">H3</option>
// //                                                                                     <option value="h4">H4</option>
// //                                                                                     <option value="h5">H5</option>
// //                                                                                     <option value="h6">H6</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Heading Font Size:</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.headingFontSize}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingFontSize: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Font Size"
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.headingColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className="form-builder-chaneging-wrap">
// //                                                                                 <label> Subheading</label>
// //                                                                                 <ReactQuill
// //                                                                                     value={editorValue || field.editorContent || 'Its a numbers game'}
// //                                                                                     onChange={handleEditorChange}
// //                                                                                     modules={{ toolbar: toolbarOptions }}
// //                                                                                 />

// //                                                                             </div>
// //                                                                             <div className="form-builder-changing-wrap url">

// //                                                                                 <>
// //                                                                                     <label>Button Url:</label>
// //                                                                                     <input
// //                                                                                         type="url"
// //                                                                                         value={field.headingUrl}
// //                                                                                         onChange={(e) => handleUpdateUrl(field.id, e.target.value)}
// //                                                                                         placeholder="Update URL"
// //                                                                                     />

// //                                                                                     <div className='form-builder-chaneging-wrap'>
// //                                                                                         <label>Button Label</label>
// //                                                                                         <input
// //                                                                                             type="text"
// //                                                                                             value={field.headerbtn}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headerbtn: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         />
// //                                                                                     </div>

// //                                                                                     <div className='form-builder-chaneging-wrap color'>
// //                                                                                         <label>Button Background</label>
// //                                                                                         <input
// //                                                                                             type="color"
// //                                                                                             value={field.headerbtnbg}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headerbtnbg: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap color'>
// //                                                                                         <label>Border Color</label>
// //                                                                                         <input
// //                                                                                             type="color"
// //                                                                                             value={field.headingbtnBorderColor}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderColor: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         />
// //                                                                                     </div>

// //                                                                                     <div className='form-builder-chaneging-wrap number' >
// //                                                                                         <label>Border Width (px)</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnBorderWidth}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderWidth: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap'>
// //                                                                                         <label>Border Style</label>
// //                                                                                         <select
// //                                                                                             value={field.headingbtnBorderStyle}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnBorderStyle: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         >
// //                                                                                             <option value="solid">Solid</option>
// //                                                                                             <option value="dashed">Dashed</option>
// //                                                                                             <option value="dotted">Dotted</option>
// //                                                                                         </select>
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap color'>
// //                                                                                         <label>Button Color</label>
// //                                                                                         <input
// //                                                                                             type="color"
// //                                                                                             value={field.headerbtncolor}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headerbtncolor: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap number'>
// //                                                                                         <label>Button Padding</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnPadding}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnPadding: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                             placeholder="Padding"
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap number'>
// //                                                                                         <label>Button Radious</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnradious}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnradious: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                             placeholder="Padding"
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap number'>
// //                                                                                         <label>Button Height</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnheight}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnheight: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                             placeholder="Padding"
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                     <div className='form-builder-chaneging-wrap number'>
// //                                                                                         <label>Button Width</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnwidth}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnwidth: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                             placeholder="Padding"
// //                                                                                         />
// //                                                                                     </div>

// //                                                                                     <div className='form-builder-chaneging-wrap number'>
// //                                                                                         <label>Button Font-Size</label>
// //                                                                                         <input
// //                                                                                             type="number"
// //                                                                                             value={field.headingbtnFontSize}
// //                                                                                             onChange={(e) => {
// //                                                                                                 setFields(prevFields =>
// //                                                                                                     prevFields.map(f =>
// //                                                                                                         f.id === field.id ? { ...f, headingbtnFontSize: e.target.value } : f
// //                                                                                                     )
// //                                                                                                 );
// //                                                                                             }}
// //                                                                                             placeholder="Padding"
// //                                                                                         />
// //                                                                                     </div>

// //                                                                                 </>
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap image'>
// //                                                                                 <label>Background Image</label>
// //                                                                                 <input
// //                                                                                     type="file"
// //                                                                                     accept="image/*"
// //                                                                                     onChange={(e) => handleFileChange(e, field.id)}
// //                                                                                 />

// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Image Width:</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.bannerImageWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, bannerImageWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Enter Heading Text"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className="form-builder-chaneging-wrap number">
// //                                                                                 <label>Image Height:</label>
// //                                                                                 <select
// //                                                                                     value={
// //                                                                                         field.bannerImageHeight === '100px'
// //                                                                                             ? 'small'
// //                                                                                             : field.bannerImageHeight === '200px'
// //                                                                                                 ? 'medium'
// //                                                                                                 : field.bannerImageHeight === '300px'
// //                                                                                                     ? 'large'
// //                                                                                                     : 'default'
// //                                                                                     }
// //                                                                                     onChange={(e) => {
// //                                                                                         const selectedValue = e.target.value;
// //                                                                                         const heightMapping = {
// //                                                                                             default: '400px',
// //                                                                                             small: '100px',
// //                                                                                             medium: '200px',
// //                                                                                             large: '300px',
// //                                                                                         };

// //                                                                                         setFields((prevFields) =>
// //                                                                                             prevFields.map((f) =>
// //                                                                                                 f.id === field.id
// //                                                                                                     ? {
// //                                                                                                         ...f,
// //                                                                                                         bannerImageHeight: heightMapping[selectedValue],
// //                                                                                                     }
// //                                                                                                     : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="default">Default</option>
// //                                                                                     <option value="small">Small</option>
// //                                                                                     <option value="medium">Medium</option>
// //                                                                                     <option value="large">Large</option>
// //                                                                                 </select>
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap preview '>
// //                                                                                 {field.headingbgImage && (
// //                                                                                     <div className="image-preview">
// //                                                                                         <img
// //                                                                                             src={field.headingbgImage}
// //                                                                                             alt="Background Preview"
// //                                                                                             style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
// //                                                                                         />
// //                                                                                     </div>
// //                                                                                 )}
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Background Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.headingbg || '#ffffff'}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Padding</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.headingPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Padding"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Letter Spacing</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.headingLetterSpacing}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingLetterSpacing: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Letter Spacing"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.headingTextAlign}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingTextAlign: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Font-Weight</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.headingFontWeight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingFontWeight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}

// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.headingBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.headingBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.headingBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, headingBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === 'description') {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap">
// //                                                                             <label>Description Text</label>
// //                                                                             <textarea
// //                                                                                 type="text"
// //                                                                                 value={field.descriptionText || field.value || ''}
// //                                                                                 onChange={(e) => handleDescriptionChange(field.id, e.target.value)}
// //                                                                                 placeholder="Enter Description"
// //                                                                             />

// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Font Size (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.descritionFontSize}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descritionFontSize: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Font-Weight</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.descritionFontWeight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descritionFontWeight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.descritionColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descritionColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Background Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.descriptionbg || '#ffffff'}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Padding</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.descriptionPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Padding"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Letter Spacing</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.descriptionLetterSpacing}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionLetterSpacing: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Letter Spacing"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.descriptionTextAlign}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionTextAlign: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.descriptionBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.descriptionBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.descriptionBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, descriptionBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                         </div>

// //                                                                     );
// //                                                                 }
// //                                                                 if (field.id === selectedFieldId && field.type === "images") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap file">
// //                                                                             <div>

// //                                                                                 {field.value ? (
// //                                                                                     <div>

// //                                                                                         <img src={field.value} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
// //                                                                                         <button className='update-image' onClick={() => setImageFieldId(field.id)}>Update Image</button>
// //                                                                                         <button className='update-image' onClick={() => removeField(field.id)}>Remove Image</button>
// //                                                                                     </div>
// //                                                                                 ) : (
// //                                                                                     <div>

// //                                                                                         <p></p>
// //                                                                                         <button className='update-image' onClick={() => setImageFieldId(field.id)}>Upload Image</button>
// //                                                                                     </div>
// //                                                                                 )}
// //                                                                                 {imageFieldId === field.id && (
// //                                                                                     <input
// //                                                                                         type="file"
// //                                                                                         accept="image/*"
// //                                                                                         onChange={(e) => handleImageUpload(e, field.id)}
// //                                                                                     />
// //                                                                                 )}
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Width</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.imgWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.imgTextAlign}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgTextAlign: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Background Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.imgbg || '#ffffff'}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Padding</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.imgPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Padding"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.imgBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.imgBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.imgBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, imgBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     );
// //                                                                 }
// //                                                                 if (field.id === selectedFieldId && field.type === "divider") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap">
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Divider Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.dividerColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, dividerColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Width</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.dividerWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, dividerWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Height</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.dividerheight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, dividerheight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === "html convert") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap color">
// //                                                                             <label>Html Convert</label>
// //                                                                             <div className="form-builder-and-preview">
// //                                                                                 {fields.map((field) => renderField(field))}

// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.htmlColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, htmlColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Font Size (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.htmlFontSize}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, htmlFontSize: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Padding (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.htmlPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, htmlPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     );
// //                                                                 }
// //                                                                 if (field.id === selectedFieldId && field.type === "split") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap color">
// //                                                                             <div style={{ marginTop: '20px' }}>
// //                                                                                 <label htmlFor="widthSelect">Adjust Width: </label>
// //                                                                                 <select
// //                                                                                     id="widthSelect"
// //                                                                                     onChange={(e) => handleWidthChange(e.target.value)}
// //                                                                                     value={fields.find((f) => f.id === selectedFieldId)?.width || '50%'}
// //                                                                                 >
// //                                                                                     <option value="25%">25%</option>
// //                                                                                     <option value="50%">50%</option>
// //                                                                                     <option value="75%">75%</option>
// //                                                                                 </select>
// //                                                                                 <div style={{ marginTop: '10px' }}>
// //                                                                                     <label htmlFor="add">Content Type: </label>
// //                                                                                     <select
// //                                                                                         id="add"
// //                                                                                         onChange={(e) =>
// //                                                                                             setFields((prevFields) =>
// //                                                                                                 prevFields.map((f) =>
// //                                                                                                     f.id === selectedFieldId ? { ...f, add: e.target.value } : f
// //                                                                                                 )
// //                                                                                             )
// //                                                                                         }
// //                                                                                         value={fields.find((f) => f.id === selectedFieldId)?.add || 'text'}
// //                                                                                     >
// //                                                                                         <option value="text">Text</option>
// //                                                                                         <option value="image">Image</option>
// //                                                                                     </select>
// //                                                                                 </div>

// //                                                                                 <div style={{ marginTop: '10px' }} className='form-builder-chaneging-wrap file' >
// //                                                                                     {fields.find((f) => f.id === selectedFieldId)?.add === 'text' ? (
// //                                                                                         <div>
// //                                                                                             {ReactQuill ? (
// //                                                                                                 <ReactQuill
// //                                                                                                     value={fields.find((f) => f.id === selectedFieldId)?.value || 'Use this section to add reviews or testimonials from your store’s happy customers Use this section to add reviews or testimonials from your store’s happy customers...'}
// //                                                                                                     onChange={(value) => {
// //                                                                                                         setFields((prevFields) =>
// //                                                                                                             prevFields.map((f) =>
// //                                                                                                                 f.id === selectedFieldId ? { ...f, value: value } : f
// //                                                                                                             )
// //                                                                                                         );
// //                                                                                                     }}
// //                                                                                                     modules={{ toolbar: toolbarOptions }}
// //                                                                                                 />
// //                                                                                             ) : (
// //                                                                                                 <p>Loading editor...</p>
// //                                                                                             )}
// //                                                                                         </div>
// //                                                                                     ) : (
// //                                                                                         <div>
// //                                                                                             <input
// //                                                                                                 type="file"
// //                                                                                                 accept="image/*"
// //                                                                                                 onChange={(e) => {
// //                                                                                                     const file = e.target.files[0];
// //                                                                                                     if (file) {
// //                                                                                                         const reader = new FileReader();
// //                                                                                                         reader.onload = () => {
// //                                                                                                             setFields((prevFields) =>
// //                                                                                                                 prevFields.map((f) =>
// //                                                                                                                     f.id === selectedFieldId
// //                                                                                                                         ? { ...f, value: reader.result }
// //                                                                                                                         : f
// //                                                                                                                 )
// //                                                                                                             );
// //                                                                                                         };
// //                                                                                                         reader.readAsDataURL(file);
// //                                                                                                     }
// //                                                                                                 }}
// //                                                                                             />

// //                                                                                             {fields.find((f) => f.id === selectedFieldId)?.value && (
// //                                                                                                 <div style={{ marginTop: '10px' }}>
// //                                                                                                     <img
// //                                                                                                         src={fields.find((f) => f.id === selectedFieldId)?.value}
// //                                                                                                         alt="Uploaded Preview"
// //                                                                                                         style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', padding: '5px' }}
// //                                                                                                     />
// //                                                                                                 </div>
// //                                                                                             )}
// //                                                                                             <div style={{ marginTop: '10px' }}>
// //                                                                                                 <button
// //                                                                                                     onClick={() => {
// //                                                                                                         document.querySelector('input[type="file"]').click();
// //                                                                                                     }}
// //                                                                                                     style={{ marginRight: '10px' }}
// //                                                                                                 >
// //                                                                                                     Update Image
// //                                                                                                 </button>
// //                                                                                                 <button
// //                                                                                                     onClick={() => {
// //                                                                                                         setFields((prevFields) =>
// //                                                                                                             prevFields.map((f) =>
// //                                                                                                                 f.id === selectedFieldId ? { ...f, value: '' } : f
// //                                                                                                             )
// //                                                                                                         );
// //                                                                                                     }}
// //                                                                                                 >
// //                                                                                                     Remove Image
// //                                                                                                 </button>
// //                                                                                             </div>
// //                                                                                         </div>
// //                                                                                     )}
// //                                                                                 </div>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Background color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.splitbg}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, splitbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Padding</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.splitPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, splitPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.splitTextAlin}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, splitTextAlin: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === "video") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap file">
// //                                                                             <div className='form-builder-chaneging-wrap '>
// //                                                                                 <label>Video Url</label>
// //                                                                                 <input
// //                                                                                     type="text"
// //                                                                                     value={field.value}
// //                                                                                     onChange={(e) => handleVideoChange(e, field.id)}
// //                                                                                     placeholder="Enter video URL"
// //                                                                                 />
// //                                                                                 <iframe
// //                                                                                     src={getVideoEmbedUrl(field.value)}
// //                                                                                     title="Video Preview"
// //                                                                                     frameBorder="0"
// //                                                                                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// //                                                                                     allowFullScreen
// //                                                                                 ></iframe>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Padding</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.videoPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, videoPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.videoBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, videoBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.videoBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, videoBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.videoBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, videoBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === "spacer") {
// //                                                                     return (
// //                                                                         <div key={field.id} className="form-builder-chaneging-wrap number">
// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label htmlFor="spacer-height-input">Spacer Height (px):</label>
// //                                                                                 <input
// //                                                                                     id="spacer-height-input"
// //                                                                                     type="number"
// //                                                                                     value={field.spacerHeight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, spacerHeight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     min="0"
// //                                                                                 />
// //                                                                                 <p style={{ color: '#A8A8A8' }} className='spacer-height-text'>Current Spacer Height: {field.spacerHeight}px</p>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label> Spacer Background color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.spacerbg}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, spacerbg: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 if (field.id === selectedFieldId && field.type === 'button') {
// //                                                                     return (
// //                                                                         <div key={field.id}>

// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Button Label</label>
// //                                                                                 <input
// //                                                                                     type="text"
// //                                                                                     value={field.buttonLabel}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonLabel: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Font Size (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonFontSize}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonFontSize: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Button Padding (px)</label>
// //                                                                                 <input
// //                                                                                     type="text"
// //                                                                                     value={field.buttonPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Height (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonHeight}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonHeight: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Background Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.buttonColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.buttonTextColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonTextColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>
// //                                                                                     Button Url
// //                                                                                     <input
// //                                                                                         type="text"
// //                                                                                         value={field.buttonUrll}
// //                                                                                         onChange={(e) => {
// //                                                                                             setFields(prevFields =>
// //                                                                                                 prevFields.map(f =>
// //                                                                                                     f.id === field.id ? { ...f, buttonUrll: e.target.value } : f
// //                                                                                                 )
// //                                                                                             );
// //                                                                                         }}
// //                                                                                     />
// //                                                                                 </label>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Letter Spacing</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonLetterSpacing}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonLetterSpacing: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder="Letter Spacing"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label> Border-Radious</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonradious}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonradious: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                     placeholder=" Border-Radious"
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap color'>
// //                                                                                 <label>Border Color</label>
// //                                                                                 <input
// //                                                                                     type="color"
// //                                                                                     value={field.buttonBorderColor}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonBorderColor: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>

// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Border Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.buttonBorderWidth}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonBorderWidth: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Border Style</label>
// //                                                                                 <select
// //                                                                                     value={field.buttonBorderStyle}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, buttonBorderStyle: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="solid">Solid</option>
// //                                                                                     <option value="dashed">Dashed</option>
// //                                                                                     <option value="dotted">Dotted</option>
// //                                                                                 </select>
// //                                                                             </div>

// //                                                                         </div>
// //                                                                     );
// //                                                                 }
// //                                                                 if (field.type === "socalicon" && field.id === selectedFieldId) {
// //                                                                     return (
// //                                                                         <div key={field.id} className="description-field">

// //                                                                             <div className="form-builder-chaneging-wrap">
// //                                                                                 <h2>Edit Social Icons</h2>

// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <label>
// //                                                                                         <div className='custom-checkbox socalicons'>
// //                                                                                             <input
// //                                                                                                 type="checkbox"
// //                                                                                                 checked={!selectedIcons.facebook.isHidden}
// //                                                                                                 onChange={() => handleToggleIcon('facebook')}
// //                                                                                             />
// //                                                                                             <i class="fa fa-facebook-square" aria-hidden="true"></i>
// //                                                                                             Facebook URL
// //                                                                                         </div>
// //                                                                                         <input
// //                                                                                             type="text"
// //                                                                                             value={selectedIcons.facebook.url}
// //                                                                                             onChange={(e) => handleIconUrlChange(e, 'facebook')}
// //                                                                                             style={{ display: selectedIcons.facebook.isHidden ? 'none' : 'block' }}
// //                                                                                         />
// //                                                                                     </label>
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <label>
// //                                                                                         <div className='custom-checkbox socalicons'>
// //                                                                                             <input
// //                                                                                                 type="checkbox"
// //                                                                                                 checked={!selectedIcons.twitter.isHidden}
// //                                                                                                 onChange={() => handleToggleIcon('twitter')}
// //                                                                                             />
// //                                                                                             <i class="fa fa-twitter" aria-hidden="true"></i>
// //                                                                                             Twitter URL
// //                                                                                         </div>
// //                                                                                         <input
// //                                                                                             type="text"
// //                                                                                             value={selectedIcons.twitter.url}
// //                                                                                             onChange={(e) => handleIconUrlChange(e, 'twitter')}
// //                                                                                             style={{ display: selectedIcons.twitter.isHidden ? 'none' : 'block' }}
// //                                                                                         />
// //                                                                                     </label>
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <label>
// //                                                                                         <div className='custom-checkbox socalicons'>
// //                                                                                             <input
// //                                                                                                 type="checkbox"
// //                                                                                                 checked={!selectedIcons.instagram.isHidden}
// //                                                                                                 onChange={() => handleToggleIcon('instagram')}
// //                                                                                             />
// //                                                                                             <i class="fa fa-instagram" aria-hidden="true"></i>
// //                                                                                             Instagram URL
// //                                                                                         </div>
// //                                                                                         <input
// //                                                                                             type="text"
// //                                                                                             value={selectedIcons.instagram.url}
// //                                                                                             onChange={(e) => handleIconUrlChange(e, 'instagram')}
// //                                                                                             style={{ display: selectedIcons.instagram.isHidden ? 'none' : 'block' }}
// //                                                                                         />
// //                                                                                     </label>
// //                                                                                 </div>
// //                                                                                 <div className='form-builder-chaneging-wrap'>
// //                                                                                     <button onClick={() => setShowFileUpload((prev) => !prev)}> + </button>
// //                                                                                     {showFileUpload && (
// //                                                                                         <div className='form-builder-chaneging-wrap file'>
// //                                                                                             <input
// //                                                                                                 type="file"
// //                                                                                                 accept="image/*"
// //                                                                                                 onChange={handleCustomIconUpload}
// //                                                                                                 multiple
// //                                                                                             />
// //                                                                                         </div>
// //                                                                                     )}
// //                                                                                     {customIcons.length > 0 && (
// //                                                                                         <div>
// //                                                                                             {customIcons.map((icon, index) => (
// //                                                                                                 <div key={index} className='form-builder-chaneging-wrap  '>
// //                                                                                                     <div className='form-builder-chaneging-wrap socal'>
// //                                                                                                         <div className='custom-checkbox'>
// //                                                                                                             <input
// //                                                                                                                 type="checkbox"
// //                                                                                                                 checked={!icon.isHidden}
// //                                                                                                                 onChange={() => toggleCustomIconVisibility(index)}
// //                                                                                                             />

// //                                                                                                         </div>
// //                                                                                                         <div className='img-socal-costom'>
// //                                                                                                             <img src={icon.src} alt={icon.name} style={{ width: "100%" }} />
// //                                                                                                         </div>
// //                                                                                                     </div>

// //                                                                                                     <input
// //                                                                                                         type="text"
// //                                                                                                         value={icon.url}
// //                                                                                                         onChange={(e) => handleCustomIconUrlChange(e, index)}
// //                                                                                                         placeholder="Custom URL"
// //                                                                                                     />

// //                                                                                                 </div>
// //                                                                                             ))}
// //                                                                                         </div>
// //                                                                                     )}
// //                                                                                 </div>

// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Social Icon Height (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={socalIconHeight}
// //                                                                                     onChange={(e) => setSocalIconHeight(e.target.value)}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number'>
// //                                                                                 <label>Social Icon Width (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={socalIconWidth}
// //                                                                                     onChange={(e) => setSocalIconWidth(e.target.value)}
// //                                                                                 />
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap'>
// //                                                                                 <label>Text Align </label>
// //                                                                                 <select
// //                                                                                     value={field.socaliconTextAlign}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, socaliconTextAlign: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <option value="">Select text align</option>
// //                                                                                     <option value="left">left</option>
// //                                                                                     <option value="center">center</option>
// //                                                                                     <option value="right">right</option>
// //                                                                                 </select>
// //                                                                             </div>
// //                                                                             <div className='form-builder-chaneging-wrap number' >
// //                                                                                 <label>Padding (px)</label>
// //                                                                                 <input
// //                                                                                     type="number"
// //                                                                                     value={field.socalIconPadding}
// //                                                                                     onChange={(e) => {
// //                                                                                         setFields(prevFields =>
// //                                                                                             prevFields.map(f =>
// //                                                                                                 f.id === field.id ? { ...f, socalIconPadding: e.target.value } : f
// //                                                                                             )
// //                                                                                         );
// //                                                                                     }}
// //                                                                                 />
// //                                                                             </div>
// //                                                                         </div>
// //                                                                     );
// //                                                                 }

// //                                                                 return null;
// //                                                             })}
// //                                                         </div>
// //                                                     )}
// //                                                 </div>
// //                                             </div>

// //                                         </div>)}
// //                                     </div>
// //                                 </div>)}
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className='btn_form_bulider'>
// //                         <div className="form-submission-wrp">
// //                             <button className="cancle-form-btn" >Cancle</button>
// //                         </div>
// //                         <div className="form-submission-wrp">
// //                             <button className="create-form-btn action_btn" onClick={createOrUpdateForm} >Save</button>
// //                         </div>
// //                     </div>
// //                 </div>

// //             </div>
// //             <div className='form-builder-wrap-popup-inputs'>
// //                 <div className='save-email-templates-add'>
// //                     {saveEmail && (<div className="popup ">
// //                         <div className="popup-content save">
// //                             <div className="save-email-template-popup">
// //                                 <div className='cancle-save-email' onClick={() => setSaveEmail(false)}>
// //                                     <img src={cancleimg} alt="" />
// //                                 </div>
// //                                 <img src={savemail} alt="" />
// //                                 <h2>Success</h2>
// //                                 <p>Your Email has been save successfully!</p>
// //                                 <p className="save-btn" onClick={handleContinue}>Continue</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                     )}
// //                 </div>
// //                 <div className="form-builder-prodcut-all">
// //                     {isPopupOpen && (
// //                         <div className="popup ">
// //                             <div className="popup-content product">
// //                                 <button className="procduct-canclebtn" onClick={handleClosePopup}>
// //                                     <img src={productcancle} />
// //                                 </button>
// //                                 <div className="product-list">
// //                                     {currentProducts.length > 0 ? (
// //                                         currentProducts.map((product) => (
// //                                             <div key={product.id} className="product-item">
// //                                                 <div className='product-item-flex'>
// //                                                     <div className='custom-checkbox'>
// //                                                         <input
// //                                                             type="checkbox"
// //                                                             checked={selectedProducts.some((p) => p.id === product.id)}
// //                                                             onChange={(e) => handleProductClick(product, e.target.checked)}
// //                                                         />
// //                                                     </div>
// //                                                     <div className='product-itm-all-inline'>
// //                                                         {product.image ? (
// //                                                             <div className="images-galley">
// //                                                                 <img
// //                                                                     src={product.image}
// //                                                                     alt={product.title}
// //                                                                 />
// //                                                             </div>
// //                                                         ) : (
// //                                                             <p>No image available</p>
// //                                                         )}
// //                                                         <div className='product-itm-all-prices'>
// //                                                             <h3>{product.title}</h3>
// //                                                             <p className='price-product-all'>Price: ${product.price}</p>
// //                                                         </div>
// //                                                     </div>

// //                                                 </div>


// //                                             </div>
// //                                         ))
// //                                     ) : (
// //                                         <p>No products available.</p>
// //                                     )}
// //                                 </div>

// //                                 {totalPages > 1 && (
// //                                     <div className="pagination">
// //                                         <div className='show-all enteries'>
// //                                             Showing data {currentProducts.length} of {products.length} products
// //                                         </div>
// //                                         <nav>
// //                                             <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
// //                                                 <li>
// //                                                     <button
// //                                                         type="button"
// //                                                         disabled={currentPage === 1}
// //                                                         onClick={() => handlePageChange(currentPage - 1)}
// //                                                     >
// //                                                         <img src={left} alt="Previous" />
// //                                                     </button>
// //                                                 </li>
// //                                                 {generatePageNumbers().map((page, index) => (
// //                                                     <li key={index} aria-current={currentPage === page ? 'page' : undefined}>
// //                                                         {page === '...' ? (
// //                                                             <span>...</span>
// //                                                         ) : (
// //                                                             <button
// //                                                                 type="button"
// //                                                                 onClick={() => handlePageChange(page)}
// //                                                                 className={`${currentPage === page ? 'active' : 'inactive'}`}
// //                                                             >
// //                                                                 {page}
// //                                                             </button>
// //                                                         )}
// //                                                     </li>
// //                                                 ))}
// //                                                 <li>
// //                                                     <button
// //                                                         type="button"
// //                                                         disabled={currentPage === totalPages}
// //                                                         onClick={() => handlePageChange(currentPage + 1)}
// //                                                     >
// //                                                         <img src={right} alt="Next" />
// //                                                     </button>
// //                                                 </li>
// //                                             </ul>
// //                                         </nav>

// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>
// //                 {showImagePopup && (
// //                     <div className="popup">
// //                         <div className="popup-content">
// //                             <h3>Upload Image</h3>
// //                             <input type="file" accept="image/*" onChange={handleImageUpload} />
// //                             <button onClick={() => setShowImagePopup(false)}>Close</button>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {showHeadingPopup && (
// //                     <div className="popup">
// //                         <div className="popup-content">
// //                             <div className="options">
// //                                 <button style={{ padding: '10px', color: 'white', background: '#FD633E', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('heading')}>Heading</button>
// //                                 <button style={{ padding: '10px', color: 'white', background: '#F27F01', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('image')}>Image</button>
// //                                 <button style={{ padding: '10px', color: 'white', background: '#27A196', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('content')}>Content</button>
// //                                 <button style={{ padding: '10px', color: 'white', background: '#D9A425', fontSize: '14px', border: 'none' }} onClick={() => setSelectedOption('url')}>Button URL</button>
// //                             </div>
// //                             {selectedOption === 'heading' && (
// //                                 <div className="heading-section">
// //                                     <label>
// //                                         <input
// //                                             type="text"
// //                                             value={headingText}
// //                                             onChange={(e) => setHeadingText(e.target.value)}
// //                                             placeholder="Heading Text"
// //                                         />
// //                                     </label>
// //                                     <label>
// //                                         <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
// //                                             <option value="h1">H1</option>
// //                                             <option value="h2">H2</option>
// //                                             <option value="h3">H3</option>
// //                                             <option value="h4">H4</option>
// //                                             <option value="h5">H5</option>
// //                                             <option value="h6">H6</option>
// //                                         </select>
// //                                     </label>
// //                                     <label>
// //                                         <input
// //                                             type="text"
// //                                             value={headingFontSize}
// //                                             onChange={(e) => setHeadingFontSize(e.target.value)}
// //                                             placeholder="Font Size"
// //                                         />
// //                                     </label>
// //                                 </div>
// //                             )}
// //                             {selectedOption === 'content' && (
// //                                 <div className="content-section">
// //                                     <div className='admin-input email'>
// //                                         <div className='admin-label'>
// //                                             <label htmlFor="content">Content</label>
// //                                         </div>
// //                                         {ReactQuill ? (
// //                                             <ReactQuill
// //                                                 value={editorValue}
// //                                                 onChange={setEditorValue}
// //                                                 modules={{ toolbar: toolbarOptions }}
// //                                             />
// //                                         ) : (
// //                                             <p>Loading editor...</p>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             )}
// //                             {selectedOption === 'url' && (
// //                                 <div className="form-builder-changing-wrap url url-section">
// //                                     <button style={{
// //                                         backgroundColor: '#9474ff',
// //                                         border: '1px solid black',
// //                                         color: 'white',
// //                                         padding: '10px',
// //                                         borderRadius: '4px',
// //                                         height: '40px',
// //                                         width: '100px',
// //                                         fontSize: '16px'

// //                                     }}>Vist Now</button>
// //                                     <label>
// //                                         URL:
// //                                         <input
// //                                             type="url"
// //                                             value={headingUrl}
// //                                             onChange={(e) => setHeadingUrl(e.target.value)}
// //                                             placeholder="Enter URL (optional)"
// //                                         />
// //                                     </label>
// //                                 </div>
// //                             )}

// //                             {selectedOption === 'image' && (
// //                                 <div className="form-builder-changing-wrap file section">
// //                                     <label> Image:
// //                                         <input
// //                                             type="file"
// //                                             accept="image/*"
// //                                             onChange={(e) => {
// //                                                 const file = e.target.files[0];
// //                                                 if (file) {
// //                                                     const reader = new FileReader();
// //                                                     reader.onloadend = () => {
// //                                                         setImageUrl(reader.result);
// //                                                     };
// //                                                     reader.readAsDataURL(file);
// //                                                 }
// //                                             }}
// //                                         />
// //                                         {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
// //                                     </label>
// //                                 </div>
// //                             )}

// //                             <button onClick={handleAddHeading}>Add Heading</button>
// //                             <button className='heading_cancle' onClick={() => setShowHeadingPopup(false)}>Close</button>
// //                         </div>
// //                     </div>
// //                 )}
// //                 {showDescriptionPopup && (
// //                     <div className="popup">
// //                         <div className="popup-content">
// //                             <label>
// //                                 Description:
// //                                 <textarea
// //                                     value={descriptionText}
// //                                     onChange={(e) => setDescriptionText(e.target.value)}
// //                                     placeholder="Description"
// //                                 />
// //                             </label>
// //                             <button onClick={handleAddDescription}>Add Description</button>
// //                             <button className='heading_cancle' onClick={() => setShowDescriptionPopup(false)}>Close</button>
// //                         </div>
// //                     </div>
// //                 )}
// //                 {isPopupVisibleed && (
// //                     <div className="popup">
// //                         <div className="popup-content">
// //                             <h4>Edit Rich Text</h4>
// //                             <div className="content-section">
// //                                 <div className="admin-input email">
// //                                     <div className="admin-label">
// //                                         <label htmlFor="content">Content</label>
// //                                     </div>
// //                                     <ReactQuill
// //                                         value={editorValueed}
// //                                         onChange={handleEditorChangeee}
// //                                         modules={{ toolbar: toolbarOptions }}
// //                                     />
// //                                 </div>
// //                             </div>

// //                             <button onClick={handleSave}>Save</button>
// //                             <button onClick={() => setPopupVisibleed(false)}>Cancel</button>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>

// //         </div >
// //     );
// // };

// // export default EmailTemplateCreate;


// {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// <div class="form_builder_app {{ block.id }}">
//   <div style="background-size: cover;" id="formData-{{ block.id }}"></div>
// </div>

// <script>
//   $(document).ready(function () {
//     const formId = '{{ block.settings.formId }}';
//     console.log('Form ID:', formId);

//     if (formId && formId !== 'default-id') {
//       fetchFormData(formId);
//     }

//     function fetchFormData(id) {
//       $('#formData-{{ block.id }}').empty();

//       $.ajax({
//         url: `http://localhost:4001/get-form/${id}`,
//         method: 'GET',
//         success: function (data) {
//           console.log('Fetched form data:', data);
//           displayFormData(data);
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//           console.error('Error: ' + errorThrown);
//           $('#formData-{{ block.id }}').append('<p></p>');
//         },
//       });
//     }

//     function displayFormData(formData) {
//       const container = $('#formData-{{ block.id }}');
//       const formTitle = formData.title || 'Form Data';
//       const formID = formData.formId || 'Unknown ID';
//       const formshop = formData.shop || 'Form shop';
//       console.log('Formshop:', formshop);
//       container.empty();

//       if (formData.styles) {
//         console.log('Form styles:', formData.styles);

//         container.css({
//           backgroundSize: 'cover',
//           backgroundColor: formData.styles.backgroundColor || '',
//           backgroundImage: formData.styles.backgroundImage || 'none',
//           backgroundRepeat: formData.styles.backgroundRepeat || 'no-repeat',
//           boxShadow: formData.styles.boxShadow || '',
//           width: formData.styles.width || '100%',
//           padding: formData.styles.padding || '20px',
//           borderColor: formData.styles.borderColor || '',
//           borderWidth: formData.styles.borderWidth || '',
//           borderStyle: formData.styles.borderStyle || '',
//           opacity: formData.styles.opacityForm || '',
//           borderRadius: formData.styles.borderRadius ? `${formData.styles.borderRadius}px` : '',
//           margin: 'auto',
//         });
//       }
//       container.append(`<h2 style="display:none">${formshop}</h2>`);
//       container.append(`<h2 style="display:none">${formTitle}</h2>`);
//       container.append(`<p style="display:none"><strong>Form ID:</strong> ${formID}</p>`);

//       if (formData.fields && formData.fields.length > 0) {
//         formData.fields.forEach((field) => {
//           const floatStyle =
//             (field.type === 'text' || field.type === 'name') && parseFloat(field.width) <= 50
//               ? 'float: inline-start;'
//               : '';
//           const inputGap = formData.styles.inputGap || '0px';
//           const labelColor = formData.styles.labelColor || '#000';
//           const inputRadius = formData.styles.inputRadious;
//           const inputBorderColor = formData.styles.inputborderColor;
//           const inputStyle = formData.styles.inputstyle;
//           const inputWidth = formData.styles.inputwidth;
//           const headingcolor = formData.styles.colorHeading;
//           const headingaline = formData.styles.textHeading;

//           const fieldHtml = `
//                   <div key="${field.id}" style= "width: ${
//             field.width
//           }; ${floatStyle} margin-bottom: ${inputGap}px;"class="${`input-field input-gap ${
//             parseFloat(field.width) <= 50 ? 'small-width' : ''
//           }`}">
//                       ${
//                         field.type !== 'heading' &&
//                         field.type !== 'description' &&
//                         field.type !== 'button' &&
//                         field.type !== 'toggle' &&
//                         field.type !== 'link' &&
//                         field.type !== 'divider'
//                           ? `<label style="color: ${labelColor};">${field.label}</label>`
//                           : ''
//                       }
//                      ${getFieldInput(
//                        field,
//                        formData.url,
//                        formData.submissionOption,
//                        formData.thankYouTimer,
//                        formData.editorValue,
//                        formshop,
//                        inputRadius,
//                        inputBorderColor,
//                        inputStyle,
//                        inputWidth,
//                        headingcolor,
//                        headingaline
//                      )}
//                   </div>
//                   `;
//           container.append(fieldHtml);
//         });
//         $('.input-gap').css('padding', '5px');
//       } else {
//         container.append('<p>No fields available.</p>');
//       }
//       container.append('<div class="clear-float"></div>');
//     }

//     function getFieldInput(
//       field,
//       url,
//       submissionOption,
//       thankYouTimer,
//       editorValue,
//       formshop,
//       inputRadius,
//       inputBorderColor,
//       inputStyle,
//       inputWidth,
//       headingcolor,
//       headingaline
//     ) {
//       const uniqueId = field.id || generateUniqueId();

//       switch (field.type) {
//         case 'name':
//           return `<input type="text" placeholder="${
//             field.placeholder || ''
//           }" style="width: 100%; padding: ${field.inputPadding}; border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} " aria-label="${field.label || 'Name'}" />`;
//         case 'text':
//           return `<input type="text" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'};padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} " aria-label="${field.label || 'Text Input'}" />`;
//         case 'toggle':
//           return `
//             <label style="display: inline-block; position: relative; width: 50px; height: 24px;">
//               <input 
//                 type="checkbox" 
//                 style="display: none;" 
//                 aria-label="${field.label || 'Toggle'}" 
//                  onchange="this.nextElementSibling.style.backgroundColor = this.checked ? '#45A7F6' : '#white'; 
//                           this.nextElementSibling.nextElementSibling.style.transform = this.checked ? 'translateX(26px)' : 'translateX(0)';" 
//               />
//               <span style="
//                 position: absolute;
//                 cursor: pointer;
//                 top: 0;
//                 left: 0;
//                 right: 0;
//                 bottom: 0;
//                 background-color: #cccccc;
//                 transition: 0.4s;
//                 border-radius: 24px;
//               "></span>
//               <span style="
//                 position: absolute;
//                 content: '';
//                 height: 18px;
//                 width: 18px;
//                 left: 3px;
//                 bottom: 3px;
//                 background-color: white;
//                 transition: 0.4s;
//                 border-radius: 50%;
//                 transform: translateX(0);
//               "></span>
//             </label>`;
//         case 'textarea':
//           return `<textarea placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'};padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} " aria-label="${field.label || 'Textarea'}"></textarea>`;
//         case 'checkbox':
//           return `
//                 <div>
//                   ${field.options
//                     .map(
//                       (option) => `
//                     <div class="form_checkbox_flex">
//                       <input type="checkbox" id="${option.id}" name="${field.name}" value="${option.value}" ${
//                         field.required ? 'required' : ''
//                       } ${field.readonly ? 'readonly' : ''} />
//                       <label for="${option.id}">${option.label}</label>
//                     </div>
//                   `
//                     )
//                     .join('')}
//                 </div>
//               `;
//         case 'radio':
//           return `
//                 <div>
//                   ${field.options
//                     .map(
//                       (option) => `
//                     <div class="form_radio_flex">
//                       <input type="radio" id="${option.id}" name="${field.name}" value="${option.value}" ${
//                         option.checked ? 'checked' : ''
//                       } aria-label="${field.label || 'Radio Input'}" />
//                       <label for="${option.id}">${option.label}</label>
//                     </div>
//                   `
//                     )
//                     .join('')}
//                 </div>
//               `;
//         case 'select':
//           const options = field.options
//             .map((option) => `<option value="${option.value}">${option.label}</option>`)
//             .join('');
//           return `
//                 <div>
//                   <select name="${
//                     field.name
//                   }" required="${field.required ? 'true' : 'false'}" style="width: ${field.width || 'auto'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " aria-label="${field.label || 'Select Input'}">
//                     ${options}
//                   </select>
//                 </div>
//               `;
//         case 'divider':
//           return `<hr style="border: 1px solid ${field.dividerColor}; width: 100%;" />`;
//         case 'description':
//           return `<p>${field.text}</p>`;
//           case 'heading':
//           return `<h1 style="font-size: ${field.fontSize || '16px'}; 
//                   color: ${headingcolor || '#000'}; 
//                   text-align: ${headingaline || 'center'};">
//                   ${field.text || 'Default Heading'}
//                   </h1>`;
        
//         case 'number':
//           return `<input type="number" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'file':
//           return `<input type="file" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'email':
//           return `<input type="email" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'phone':
//           return `<input type="tel" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'password':
//           return `<input type="password" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'url':
//           return `<input type="url" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'location':
//           return `<input type="text" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'date':
//           return `<input type="date" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'datetime':
//           return `<input type="datetime-local" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'time':
//           return `<input type="time" placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'link':
//           return `
//         <a
//         href="${field.linkUrl || '#'}"
//         target="${field.linkTarget || '_blank'}"
//          style="
//           width: ${field.width || '100%'};
//           text-decoration: none;
//           text-align: ${field.linkaline || 'left'};
//           padding: ${field.padding || '0'};
//           "
//              >${field.linktext || 'Default Link Text'}</a>
//       `;

//         case 'images':
//           return `<input type="file" multiple placeholder="${
//             field.placeholder || ''
//           }" style="width: ${field.width || '100%'}; padding: ${field.inputPadding};border-radius: ${inputRadius}px; border-color: ${inputBorderColor}; border-width:${inputWidth}px; border-style:${inputStyle} "  " />`;
//         case 'slider':
//           return `<input 
//                     type="range" 
//                     placeholder="${field.placeholder || ''}" 
//                     style="width: ${field.width || '100%'};" 
//                     min="${field.min}" 
//                     max="${field.max}" 
//                     step="${field.step}" 
//                     />`;
//         case 'button':
//           return `
//               <div>
//                 <button
//                   style="background-color: ${
//                     field.backgroundColor || '#007bff'
//                   }; height: ${field.buttonHeight || '40px'}; width: ${field.buttonWidth || '150px'};
//                    font-size: ${field.fontSize};
//                     padding: ${field.padding || '10px'};
//                     border-width: ${field.buttonBorderWidth}px;
//                     border-style: ${field.buttonBorderStyle || 'solid'};
//                     border-color: ${field.buttonBorderColor || '#000'};
//                      color:${field.btncolor}"
//                     data-url="${formUrl}"
//                     onclick="submitFormData('{{ block.id }}', this, '${
//                       editorValue || ''
//                     }', '${submissionOption || ''}', '${thankYouTimer || ''}', '${formshop}')">
//                   ${field.label || 'Submit'}
//                 </button>
//               </div>
//             `;
//         default:
//           return '';
//       }
//     }

//     function generateUniqueId() {
//       return Math.random().toString(36).substr(2, 9);
//     }

//     const currentTimestamp = new Date().toISOString();

//     window.submitFormData = function (blockId, button, editorValue, submissionOption, thankYouTimer, formshop) {
//       const container = $('#formData-' + blockId);
//       const formID = container.find('p').first().text().split(': ')[1];
//       console.log('Editor Value:', editorValue);
//       console.log('Submission Option:', submissionOption);
//       console.log('Thank You Timer:', thankYouTimer);
//       console.log('form_id:', formID);
//       console.log('formshop:', formshop);

//       const formData = {
//         id: formID,
//         shop: formshop || 'defaultShopName',
//         title: $('#formData-' + blockId + ' h2')
//           .text()
//           .replace(formshop, '')
//           .trim(),
//         fields: [],
//         send: currentTimestamp,
//         url: $(button).data('url') || '',
//         editorValue: editorValue,
//         thankYouTimer: thankYouTimer,
//       };

//       const emailField = $('#formData-' + blockId + ' input[type="email"]');
//       formData.email = emailField.val();
//       console.log('Email:', formData.email);

//       $.ajax({
//         url: 'http://localhost:4001/get/data',
//         method: 'GET',
//         data: { formId: formData.id },
//         success: function (response) {
//           console.log('API Response:', response);

//           const matchingForm = response.data.find((form) => form.form_ids.includes(formData.id));

//           if (matchingForm) {
//             console.log('Form IDs match. Proceeding with form submission.');

//             formData.TemplateTitle = matchingForm.title;
//             formData.TemplateId = matchingForm.templateId;
//           } else {
//             console.log('No matching form found, but proceeding with submission.');
//           }

//           let isValid = true;

//           $('#formData-' + blockId + ' .input-field').each(function () {
//             const fieldName = $(this).find('label').text().trim();
//             const input = $(this).find('input, select, textarea');
//             const fieldId = input.attr('id') || generateUniqueId();

//             let fieldValue;
//             if (input.is(':radio')) {
//               fieldValue = $('input[name="' + input.attr('name') + '"]:checked').val();
//             } else if (input.is(':checkbox')) {
//               fieldValue = [];
//               $(this)
//                 .find('input[type="checkbox"]:checked')
//                 .each(function () {
//                   fieldValue.push($(this).val());
//                 });
//               fieldValue = fieldValue.join(', ');
//             } else {
//               fieldValue = input.val();
//             }

//             if (input.attr('required') !== undefined && fieldValue.trim() === '') {
//               alert(`Please fill out the ${fieldName}`);
//               isValid = false;
//               return false;
//             }

//             if (fieldValue !== undefined && fieldValue.trim() !== '') {
//               formData.fields.push({
//                 id: fieldId,
//                 name: fieldName,
//                 value: fieldValue,
//                 send: currentTimestamp,
//               });
//             }
//           });

//           if (!isValid) return;

//           console.log('Form Data:', JSON.stringify(formData));

//           $.ajax({
//             url: 'http://localhost:4001/api/forms',
//             method: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(formData),
//             success: function (response) {
//               console.log('Form submitted successfully:', response);
//               alert('Form submitted successfully!');
//               const formUrl = $(button).data('url');

//               const successMessage = '<p id="success-message">Form submitted successfully!</p>';
//               const successElement = $(successMessage);

//               console.log('Sending Template Data:', {
//                 TemplateAll: matchingForm,
//                 email: formData.email,
//               });

//               setTimeout(function () {
//                 $('#success-message').remove();
//               }, 2000);

//               $.ajax({
//                 url: 'http://localhost:4001/api/template',
//                 method: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify({
//                   TemplateAll: matchingForm,
//                   email: formData.email,
//                 }),
//                 success: function (templateResponse) {
//                   console.log('Template data sent successfully:', templateResponse);
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                   console.error('Error sending template data:', errorThrown);
//                 },
//               });

//               if (editorValue) {
//                 const editorValueDisplay = `<p>${editorValue}</p>`;
//                 const messageElement = $(editorValueDisplay);
//                 $('#formData-' + blockId).append(messageElement);

//                 successElement.hide();
//                 $('#formData-' + blockId).append(successElement);
//               } else {
//                 $('#formData-' + blockId).append(successElement);
//               }

//               if (submissionOption === 'Hide form and show thank you message') {
//                 $(
//                   '#formData-' +
//                     blockId +
//                     ' .form, #formData-' +
//                     blockId +
//                     ' input, #formData-' +
//                     blockId +
//                     ' textarea, #formData-' +
//                     blockId +
//                     ' select, #formData-' +
//                     blockId +
//                     ' button, #formData-' +
//                     blockId +
//                     ' label'
//                 ).hide();
//               } else if (thankYouTimer) {
//                 const timerDuration = parseInt(thankYouTimer) * 1000;
//                 setTimeout(() => {
//                   $('#formData-' + blockId + ' p').fadeOut();
//                 }, timerDuration);
//               }

//               if (formUrl && formUrl !== 'undefined') {
//                 window.open(formUrl);
//               } else {
//                 console.log('No valid form URL provided.');
//               }

//               $(
//                 '#formData-' + blockId + ' input, #formData-' + blockId + ' textarea, #formData-' + blockId + ' select'
//               ).val('');
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//               console.error('Error submitting form:', {
//                 textStatus: textStatus,
//                 errorThrown: errorThrown,
//                 responseText: jqXHR.responseText,
//               });
//               $('#formData-' + blockId).append('<p>Error submitting form. Please try again.</p>');
//             },
//           });
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//           console.error('Error fetching data:', errorThrown);
//           alert('An error occurred while fetching form data. Please try again.');
//         },
//       });
//     };
//   });
// </script>

// {% schema %}
// {
//   "name": "Form Submission",
//   "target": "section",
//   "settings": [
//     { "type": "color", "id": "colour", "label": "Button Text Colour", "default": "#ff0000" },
//     { "type": "color", "id": "bgcolour", "label": "Button Background Colour", "default": "#ff0000" },
//     { "type": "text", "id": "formId", "label": "Form ID" }
//   ]
// }
// {% endschema %} */}




// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import multer from 'multer';
// import nodemailer from 'nodemailer';
// import sharp from 'sharp';

// const app = express();
// const port = 4001;
// import fs from 'fs';
// import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const fixedDirname = __dirname.replace(/^\/([A-Z]:)/, '$1'); 

// const uploadDirectory = path.join(fixedDirname, 'uploads');

// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
//     console.log('Uploads directory created');
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       const uploadDir = path.join(fixedDirname, 'uploads');
//       cb(null, uploadDir); 
//   },
//   filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());

// const mongoUri = 'mongodb://info:8HhuZSfsVy7clyTN@cluster0-shard-00-00.a86kc.mongodb.net:27017,cluster0-shard-00-01.a86kc.mongodb.net:27017,cluster0-shard-00-02.a86kc.mongodb.net:27017/form?ssl=true&replicaSet=atlas-gb66eq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(mongoUri)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('Error connectingcd  to MongoDB:', err);
//   });

// const formCreateSchema = new mongoose.Schema({
//   formId: { type: String, required: true },
//   title: { type: String, required: true },
//   shop: { type: String, required: true },
//   fields: [{
//     id: { type: String, required: true },
//     type: {
//       type: String,
//       required: true,
//       enum: ['text', 'name', 'button', 'divider', 'heading', 'radio', 'file', 'number', 'date', 'datetime', 'images', 'link', 'checkbox', 'location', 'toggle', 'select', 'textarea', 'password', 'email', 'phone', 'time', 'description', 'url', 'slider']
//     },
//     label: { type: String, required: true, default: function () { return this.name || 'Unnamed Field'; } },
//     name: String,
//     required: { type: Boolean, default: false },
//     readonly: { type: Boolean, default: false },
//     width: { type: String, default: '100%' },
//     text: { type: String, default: '' },
//     description: { type: String, default: '' },
//     placeholder: { type: String, default: '' },
//     level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], required: false },
//     fontSize: { type: String, default: '16px' },
//     padding: { type: String, default: '10px' },
//     color: { type: String, default: '#45a7f6' },
//     dividerColor: { type: String, default: '#000' },
//     buttonWidth: { type: String, default: 'auto' },
//     buttonHeight: { type: String, default: 'auto' },
//     backgroundColor: { type: String, default: '#45a7f6' },
//     inputPadding: { type: String, default: '10px' },
//     inputBorderRadious: { type: String, default: '4px' },
//     buttonBorderColor: { type: String, required: false },
//     buttonBorderWidth: { type: String, required: false },
//     buttonBorderStyle: { type: String, required: false },
//     linktext: { type: String, required: false },
//     linkUrl: { type: String, required: false },
//     linkTarget: { type: String, required: false },
//     linkaline: { type: String, required: false },
//     min: { type: String, required: false },
//     max: { type: String, required: false },
//     step: { type: String, required: false },
//     btnradious: { type: String, required: false },
//     btncolor: { type: String, required: false },
//     styles: {
//       display: { type: String, default: 'block' },
//       gap: { type: String, default: '0' }
//     },
//     options: [{
//       id: { type: String, required: true },
//       label: { type: String, required: true },
//       value: { type: String, required: true },
//       name: { type: String, required: true, default: function () { return this.label || this.value; } }
//     }]
//   }],
//   createdAt: { type: String, required: true },
//   toggleStatus: { type: String, required: false },
//   styles: {
//     backgroundColor: { type: String, required: true },
//     backgroundImage: { type: String, default: '' },
//     backgroundRepeat: { type: String, default: 'no-repeat' },
//     boxShadow: { type: String, default: '' },
//     width: { type: String, default: '100%' },
//     padding: { type: String, default: '0' },
//     borderColor: { type: String, default: '' },
//     borderRadius: { type: String, default: '0' },
//     borderWidth: { type: String, default: '1px' },
//     borderStyle: { type: String, default: 'solid' },
//     inputRadious: { type: String, default: '4' },
//     inputstyle: { type: String, default: 'solid' },
//     inputwidth: { type: String, default: '1' },
//     inputborderColor: { type: String, default: 'blue' },
//     inputBgColor: { type: String, default: '' },
//     labelColor: { type: String, default: 'blue' },
//     inputGap: { type: String, default: '10' },
//     opacityForm: { type: String, default: '1' },
//     textHeading: { type: String, default: '' },
//     colorHeading: { type: String, default: '' },

//   },
//   submissionOption: { type: String, required: true },
//   thankYouTimer: { type: Number },
//   editorValue: { type: String },
//   url: { type: String },
//   status: {
//     type: String,
//     enum: ['live', 'draft'],
//     required: true
//   },
// });

// // const FormModel = mongoose.model('forms_data', formCreateSchema);

// const formSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   id: { type: String, required: true },
//   shop: { type: String, required: false, },
//   currentUrl: { type: String, required: false, },
//   fields: [
//     {
//       id: { type: String, required: true },
//       name: { type: String, required: true },
//       value: { type: String, required: true },
//     },
//   ],
//   templateId: { type: String, required: false },
//   timestamp: { type: Date, default: Date.now },
//   submissions: [{
//     fields: Array,
//     timestamp: { type: String, default: Date.now }
//   }]
// });

// const Form = mongoose.model('Form_costumers', formSchema);

// const paymentDataSchema = new mongoose.Schema({
//   shop: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   status: { type: String, required: true },
//   billingOn: { type: Date, required: true },
//   plan: { type: String, required: true },
//   chargeId: { type: String, required: true, unique: true },
// });

// const Payment = mongoose.model('Payments', paymentDataSchema);

// const shopDetailsSchema = new mongoose.Schema({
//   shop: { type: String, required: true, unique: true },
//   accessToken: { type: String, required: true },
// });

// const ShopDetails = mongoose.model('ShopDetails', shopDetailsSchema);

// const columnSchema = new mongoose.Schema({
//   columnIndex: { type: Number, required: false },
//   image: { type: String, required: false },
//   content: { type: String, required: false },
//   isVisible: { type: Boolean, default: false },
//   Multibtnlable: { type: String, default: 'Shop Now' },
//   Multibtnurl: { type: String, default: false },
// });

// const emailTemplateSchema = new mongoose.Schema({
//   templateId: { type: String, required: true },
//   shop: { type: String, required: true },
//   // base64Image: { type: String, required: true },
//   form_ids: {
//     type: [String],
//     required: true,
//     validate: {
//       validator: function (value) {
//         return value.every(item => typeof item === 'string');
//       },
//       message: 'Each form_id must be a string',
//     },
//   },
//   title: { type: String, required: true },
//   headingText: {
//     text: { type: String, required: false },
//     fontSize: { type: String, required: false }
//   },
//   fields: [
//     {
//       name: { type: String, required: true },
//       label: { type: String, required: true },
//       type: { type: String, required: true },
//       headingbgImage: { type: String, required: false },
//       headerbtnbg: { type: String, required: false },
//       headerbtncolor: { type: String, required: false },
//       headingbtnPadding: { type: String, required: false },
//       headingbtntopPadding: { type: String, required: false },
//       headingbtnradious: { type: String, required: false },
//       headingbtnFontSize: { type: String, required: false },
//       headingbtnwidth: { type: String, required: false },
//       headingbtnheight: { type: String, required: false },
//       headingsubheading: { type: String, required: false },
//       headerbtn: { type: String, required: false },
//       columnCount: { type: Number, required: false },
//       columnData: { type: [columnSchema], required: false },
//       value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
//       bannerImageWidth: { type: String, required: false },
//       bannerImageHeight: { type: String, required: false },
//       bannerImageTextAlign: { type: String, required: false },
//       editorContent: { type: String, required: false },
//       headingUrl: { type: String, required: false },
//       richTextAlign: { type: String, required: false },
//       imageUrl: { type: String, required: false },
//       headingFontSize: { type: String, required: false },
//       headingLevel: { type: String, required: false },
//       headeropacity: { type: String, required: false },
//       headingFontWeight: { type: String, required: false },
//       headingColor: { type: String, required: false },
//       headingbg: { type: String, required: false },
//       subheadingColor: { type: String, required: false },
//       headingBorderColor: { type: String, required: false },
//       headingBorderWidth: { type: String, required: false },
//       headingbtnBorderWidth: { type: String, required: false },
//       headingbtnBorderStyle: { type: String, required: false },
//       headingbtnBorderColor: { type: String, required: false },
//       headingBorderStyle: { type: String, required: false },
//       headingLetterSpacing: { type: String, required: false },
//       headingPadding: { type: String, required: false },
//       headingTextAlign: { type: String, required: false },
//       headingText: { type: String, required: false },
      
//       descriptionText: { type: String, required: false },
//       texteditorValue: { type: String, required: false },
//       descritionFontSize: { type: String, required: false },
//       descritionFontWeight: { type: String, required: false },
//       descritionColor: { type: String, required: false },
//       descriptionbg: { type: String, required: false },
//       descriptionPadding: { type: String, required: false },
//       descriptionTextAlign: { type: String, required: false },
//       descriptionLetterSpacing: { type: String, required: false },
//       descriptionBorderColor: { type: String, required: false },
//       descriptionBorderWidth: { type: String, required: false },
//       descriptionBorderStyle: { type: String, required: false },
//       content: { type: String, required: false },
//       platform: { type: String, required: false },
//       image: { type: String, required: false },
//       url: { type: String, required: false },
//       dividerColor: { type: String, required: false },
//       dividerbgColor: { type: String, required: false },
//       dividerWidth: { type: String, required: false },
//       dividerheight: { type: String, required: false },
//       buttonLabel: { type: String, required: false },
//       buttonWidth: { type: String, required: false },
//       buttonHeight: { type: String, required: false },
//       buttonFontSize: { type: String, required: false },
//       buttonLetterSpacing: { type: String, required: false },
//       buttonBorderColor: { type: String, required: false },
//       buttonBorderWidth: { type: String, required: false },
//       buttonBorderStyle: { type: String, required: false },
//       buttonBackgroundColor: { type: String, required: false },
//       buttonradious: { type: String, required: false },
//       buttonColor: { type: String, required: false },
//       buttonbgColor: { type: String, required: false },
//       buttonaline: { type: String, required: false },
//       buttonUrll: { type: String, default: '' },
//       buttonTextColor: { type: String, default: false },
//       buttonPadding: { type: String, required: false },
//       htmlContent: { type: String, required: false, default: "" },
//       socalIconWidth: { type: String, required: false },
//       socalIconHeight: { type: String, required: false },
//       socalIconPadding: { type: String, required: false },
//       socalIconbg: { type: String, required: false },
//       socalIcongap: { type: String, required: false },
//       socaliconTextAlign: { type: String, required: false },
//       htmlFontSize: { type: String, required: false },
//       htmlPadding: { type: String, required: false },
//       htmlColor: { type: String, required: false },
//       splitbg: { type: String, required: false },
//       splitbtn: { type: String, required: false },
//       splitbtnbg: { type: String, required: false },
//       splittext: { type: String, required: false },
//       splitColor: { type: String, required: false },
//       splitbtnfont: { type: String, required: false },
//       splitbtncolor: { type: String, required: false },
//       splitbtnurl: { type: String, required: false },
//       splitbtnheight: { type: String, required: false },
//       splitbtnwidth: { type: String, required: false },
//       splitbtnradious: { type: String, required: false },
//       splitheight: { type: String, required: false },
//       add: { type: String, required: false },
//       width: { type: String, required: false },
//       spacerHeight: { type: String, required: false },
//       spacerbg: { type: String, required: false },
//       videoPadding: { type: String, required: false },
//       splitPadding: { type: String, required: false },
//       splitTextAlin: { type: String, required: false },
//       videoBorderWidth: { type: String, required: false },
//       videoBorderStyle: { type: String, required: false },
//       videoBorderColor: { type: String, required: false },
//       imgWidth: { type: String, required: false },
//       imgTextAlign: { type: String, required: false },
//       imgPadding: { type: String, required: false },
//       imgbg: { type: String, required: false },
//       imgBorderColor: { type: String, required: false },
//       imgBorderWidth: { type: String, required: false },
//       imgBorderStyle: { type: String, required: false },
//       products: { type: [Object], required: false },
//       productsPerRow: { type: Number, default: 3 },
//       columnsPerRow: { type: Number, default: 3 },
//       viewMode: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' },
//       price: { type: Boolean, default: false },
//       productPadding: { type: String, required: false },
//       productbg: { type: String, required: false },
//       productBorderWidth: { type: String, required: false },
//       productBorderStyle: { type: String, required: false },
//       productBorderColor: { type: String, required: false },
//       productFontSize: { type: String, required: false },
//       productTextColor: { type: String, required: false },
//       productWeight: { type: String, required: false },
//       productLetterSpacing: { type: String, required: false },
//       productbtnBorderColor: { type: String, required: false },
//       productbtnBorderWidth: { type: String, required: false },
//       productbtnBorderStyle: { type: String, required: false },
//       productbtnbg: { type: String, required: false },
//       productradious: { type: String, required: false },
//       productLabel: { type: String, required: false },
//       productfontSize: { type: String, required: false },
//       productwidth: { type: String, required: false },
//       productbackgroundColor: { type: String, required: false },
//       productheight: { type: String, required: false },
//       buttonUrl: { type: String, required: false },
//       showbtnn: { type: Boolean, default: false },
//       showbtnsplit: { type: Boolean, default: false },
//       showbtnmulti: { type: Boolean, default: false },
//       fontsizeMulticolumn: { type: String, required: false },
//       Multicolumnbgcolor: { type: String, required: false },
//       Multibgcolor: { type: String, required: false },
//       MultiPadding: { type: String, required: false },
//       Multitext: { type: String, required: false },
//       Multigap: { type: String, required: false },
//       MulticolumnbtnBorderWidth: { type: String, required: false },
//       MulticolumnbtnBorderColor: { type: String, required: false },
//       MulticolumnbtnBorderStyle: { type: String, required: false },
//       MultibtnBorderWidth: { type: String, required: false },
//       MultiColor: { type: String, required: false },
//       MultibtnBorderColor: { type: String, required: false },
//       MultibtnBorderStyle: { type: String, required: false },
//       Multibtnheight: { type: String, required: false },
//       Multibtnweight: { type: String, required: false },
//       Multibtncolor: { type: String, required: false },
//       Multibtnradious: { type: String, required: false },
//       Multibtnfont: { type: String, required: false },
//       splitBorderWidth: { type: String, required: false },
//       splitBorderColor: { type: String, required: false },
//       splitBorderStyle: { type: String, required: false },
//       richFontsize: { type: String, required: false },
//       richtopPadding: { type: String, required: false },
//       richleftPadding: { type: String, required: false },
//       richbgcolor: { type: String, required: false },
//       richtextcolor: { type: String, required: false },
//       MulticolumnPadding: { type: String, required: false },
//       Multibtnlable: { type: String, required: false },
//       Multibtnbg: { type: String, required: false },
//       Multibtnurl: { type: String, required: false },
//       icons: {
//         facebook: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Facebook' },
//         },
//         twitter: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Twitter' },
//         },
//         instagram: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Instagram' },
//         },
//         url: { type: String, required: false }
//       },
//       customIcons: [
//         {
//           url: { type: String, required: true },
//           src: { type: String, required: true },
//           isHidden: { type: Boolean, default: false }
//         }
//       ],
//     }
//   ],
//   createdAt: { type: String, required: true },
//   styles: {
//     width: { type: String, required: false },
//     backgroundImage: { type: String, required: false },
//     backgroundColor: { type: String, required: false },
//     borderRadious: { type: String, required: false },
//     textAlign: { type: String, required: false },
//     fontFamily: { type: String, required: false },
//     headingFontSize: { type: String, required: false },
//     dividerColor: { type: String, required: false },
//     templatePadding: { type: String, required: false }
//   }
// });
// const Email = mongoose.model('EmailTemplats', emailTemplateSchema);

// const coloumtemplate = new mongoose.Schema({
//   columnIndex: { type: Number, required: false },
//   image: { type: String, required: false },
//   content: { type: String, required: false },
//   isVisible: { type: Boolean, default: false },
//   Multibtnlable: { type: String, default: 'Shop Now' },
//   Multibtnurl: { type: String, default: false },
// });

// const ShowTemplats = new mongoose.Schema({
//   templateId: { type: String, required: true },
//   title: { type: String, required: true },
//   headingText: {
//     text: { type: String, required: false },
//     fontSize: { type: String, required: false }
//   },
//   fields: [
//     {

//       name: { type: String, required: true },
//       label: { type: String, required: true },
//       type: { type: String, required: true },
//       headerbtnbg: { type: String, required: false },
//       headerbtncolor: { type: String, required: false },
//       headingbtnPadding: { type: String, required: false },
//       headingbtntopPadding: { type: String, required: false },
//       headingbtnradious: { type: String, required: false },
//       headingbtnFontSize: { type: String, required: false },
//       headingbtnwidth: { type: String, required: false },
//       headingbtnheight: { type: String, required: false },
//       headingsubheading: { type: String, required: false },
//       headerbtn: { type: String, required: false },
//       columnCount: { type: Number, required: false },
//       columnData: { type: [coloumtemplate], required: false },
//       value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
//       bannerImageWidth: { type: String, required: false },
//       bannerImageHeight: { type: String, required: false },
//       bannerImageTextAlign: { type: String, required: false },
//       editorContent: { type: String, required: false },
//       headingUrl: { type: String, required: false },
//       richTextAlign: { type: String, required: false },
//       imageUrl: { type: String, required: false },
//       headingFontSize: { type: String, required: false },
//       headingLevel: { type: String, required: false },
//       headeropacity: { type: String, required: false },
//       headingFontWeight: { type: String, required: false },
//       headingColor: { type: String, required: false },
//       headingbg: { type: String, required: false },
//       subheadingColor: { type: String, required: false },
//       headingBorderColor: { type: String, required: false },
//       headingBorderWidth: { type: String, required: false },
//       headingbtnBorderWidth: { type: String, required: false },
//       headingbtnBorderStyle: { type: String, required: false },
//       headingbtnBorderColor: { type: String, required: false },
//       headingBorderStyle: { type: String, required: false },
//       headingLetterSpacing: { type: String, required: false },
//       headingPadding: { type: String, required: false },
//       headingTextAlign: { type: String, required: false },
//       headingText: { type: String, required: false },
//       headingbgImage: { type: String, required: false },
//       descriptionText: { type: String, required: false },
//       texteditorValue: { type: String, required: false },
//       descritionFontSize: { type: String, required: false },
//       descritionFontWeight: { type: String, required: false },
//       descritionColor: { type: String, required: false },
//       descriptionbg: { type: String, required: false },
//       descriptionPadding: { type: String, required: false },
//       descriptionTextAlign: { type: String, required: false },
//       descriptionLetterSpacing: { type: String, required: false },
//       descriptionBorderColor: { type: String, required: false },
//       descriptionBorderWidth: { type: String, required: false },
//       descriptionBorderStyle: { type: String, required: false },
//       content: { type: String, required: false },
//       platform: { type: String, required: false },
//       image: { type: String, required: false },
//       url: { type: String, required: false },
//       dividerColor: { type: String, required: false },
//       dividerWidth: { type: String, required: false },
//       dividerbgColor: { type: String, required: false },
//       dividerheight: { type: String, required: false },
//       buttonLabel: { type: String, required: false },
//       buttonWidth: { type: String, required: false },
//       buttonHeight: { type: String, required: false },
//       buttonFontSize: { type: String, required: false },
//       buttonLetterSpacing: { type: String, required: false },
//       buttonBorderColor: { type: String, required: false },
//       buttonBorderWidth: { type: String, required: false },
//       buttonBorderStyle: { type: String, required: false },
//       buttonBackgroundColor: { type: String, required: false },
//       buttonradious: { type: String, required: false },
//       buttonColor: { type: String, required: false },
//       buttonbgColor: { type: String, required: false },
//       buttonaline: { type: String, required: false },
//       buttonUrll: { type: String, default: '' },
//       buttonTextColor: { type: String, default: false },
//       buttonPadding: { type: String, required: false },
//       htmlContent: { type: String, required: false, default: "" },
//       socalIconWidth: { type: String, required: false },
//       socalIconHeight: { type: String, required: false },
//       socalIconPadding: { type: String, required: false },
//       socalIconbg: { type: String, required: false },
//       socalIcongap: { type: String, required: false },
//       socaliconTextAlign: { type: String, required: false },
//       htmlFontSize: { type: String, required: false },
//       htmlPadding: { type: String, required: false },
//       htmlColor: { type: String, required: false },
//       splitbg: { type: String, required: false },
//       splitbtn: { type: String, required: false },
//       splitbtnbg: { type: String, required: false },
//       splittext: { type: String, required: false },
//       splitColor: { type: String, required: false },
//       splitbtnfont: { type: String, required: false },
//       splitbtncolor: { type: String, required: false },
//       splitbtnurl: { type: String, required: false },
//       splitbtnheight: { type: String, required: false },
//       splitbtnwidth: { type: String, required: false },
//       splitbtnradious: { type: String, required: false },
//       splitheight: { type: String, required: false },
//       add: { type: String, required: false },
//       width: { type: String, required: false },
//       spacerHeight: { type: String, required: false },
//       spacerbg: { type: String, required: false },
//       videoPadding: { type: String, required: false },
//       splitPadding: { type: String, required: false },
//       splitTextAlin: { type: String, required: false },
//       videoBorderWidth: { type: String, required: false },
//       videoBorderStyle: { type: String, required: false },
//       videoBorderColor: { type: String, required: false },
//       imgWidth: { type: String, required: false },
//       imgTextAlign: { type: String, required: false },
//       imgPadding: { type: String, required: false },
//       imgbg: { type: String, required: false },
//       imgBorderColor: { type: String, required: false },
//       imgBorderWidth: { type: String, required: false },
//       imgBorderStyle: { type: String, required: false },
//       products: { type: [Object], required: false },
//       productsPerRow: { type: Number, default: 3 },
//       columnsPerRow: { type: Number, default: 3 },
//       viewMode: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' },
//       price: { type: Boolean, default: false },
//       productPadding: { type: String, required: false },
//       productbg: { type: String, required: false },
//       productBorderWidth: { type: String, required: false },
//       productBorderStyle: { type: String, required: false },
//       productBorderColor: { type: String, required: false },
//       productFontSize: { type: String, required: false },
//       productTextColor: { type: String, required: false },
//       productWeight: { type: String, required: false },
//       productLetterSpacing: { type: String, required: false },
//       productbtnBorderColor: { type: String, required: false },
//       productbtnBorderWidth: { type: String, required: false },
//       productbtnBorderStyle: { type: String, required: false },
//       productbtnbg: { type: String, required: false },
//       productradious: { type: String, required: false },
//       productLabel: { type: String, required: false },
//       productfontSize: { type: String, required: false },
//       productwidth: { type: String, required: false },
//       productbackgroundColor: { type: String, required: false },
//       productheight: { type: String, required: false },
//       buttonUrl: { type: String, required: false },
//       showbtnn: { type: Boolean, default: false },
//       showbtnsplit: { type: Boolean, default: false },
//       showbtnmulti: { type: Boolean, default: false },
//       fontsizeMulticolumn: { type: String, required: false },
//       Multicolumnbgcolor: { type: String, required: false },
//       Multibgcolor: { type: String, required: false },
//       Multigap: { type: String, required: false },
//       Multitext: { type: String, required: false },
//       MultiPadding: { type: String, required: false },
//       MulticolumnbtnBorderWidth: { type: String, required: false },
//       MulticolumnbtnBorderColor: { type: String, required: false },
//       MulticolumnbtnBorderStyle: { type: String, required: false },
//       MultibtnBorderWidth: { type: String, required: false },
//       MultibtnBorderColor: { type: String, required: false },
//       MultiColor: { type: String, required: false },
//       MultibtnBorderStyle: { type: String, required: false },
//       Multibtnheight: { type: String, required: false },
//       Multibtnweight: { type: String, required: false },
//       Multibtncolor: { type: String, required: false },
//       Multibtnradious: { type: String, required: false },
//       Multibtnfont: { type: String, required: false },
//       splitBorderWidth: { type: String, required: false },
//       splitBorderColor: { type: String, required: false },
//       splitBorderStyle: { type: String, required: false },
//       richFontsize: { type: String, required: false },
//       richbgcolor: { type: String, required: false },
//       richtopPadding: { type: String, required: false },
//       richleftPadding: { type: String, required: false },
//       richtextcolor: { type: String, required: false },
//       MulticolumnPadding: { type: String, required: false },
//       Multibtnlable: { type: String, required: false },
//       Multibtnurl: { type: String, required: false },
//       Multibtnbg: { type: String, required: false },
//       icons: {
//         facebook: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Facebook' },
//         },
//         twitter: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Twitter' },
//         },
//         instagram: {
//           url: { type: String, required: false },
//           isHidden: { type: Boolean, default: false },
//           value: { type: String, required: false, default: 'Instagram' },
//         },
//         url: { type: String, required: false }
//       },
//       customIcons: [
//         {
//           url: { type: String, required: true },
//           src: { type: String, required: true },
//           isHidden: { type: Boolean, default: false }
//         }
//       ],
//     }
//   ],
//   createdAt: { type: String, required: true },
//   styles: {
//     width: { type: String, required: false },
//     backgroundImage: { type: String, required: false },
//     backgroundColor: { type: String, required: false },
//     borderRadious: { type: String, required: false },
//     textAlign: { type: String, required: false },
//     fontFamily: { type: String, required: false },
//     headingFontSize: { type: String, required: false },
//     dividerColor: { type: String, required: false },
//     templatePadding: { type: String, required: false }
//   }
// });

// const Templated = mongoose.model('saveTempaltes', ShowTemplats);

// const templateSchema = new mongoose.Schema({
//   TemplateAll: { type: Object, required: false },
//   email: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const Template = mongoose.model('sendTemplates', templateSchema);

// const supportdata = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   category: { type: String, required: true },
//   theme: { type: String, required: true },
//   shop: { type: String, required: true },
//   describe: { type: String, required: true },
//   submittedAt: { type: Date, default: Date.now },
// });

// const Support = mongoose.model('supportEmails', supportdata);

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'sahil@hubsyntax.com',
//     pass: 'wqnr gaom dgzq asyu',
//   },
// });

// const sendEmails = (formData) => {
//   const mailOptions = {
//     from: 'sahil@hubsyntax.com',
//     to: `${formData.email}`,
//     subject: `Support Request: ${formData.name}`,
//     text: `
//       Name: ${formData.name}
//       Email: ${formData.email}
//       Category: ${formData.category}
//       Theme: ${formData.theme}
//       Shop: ${formData.shop}
//       Description: ${formData.describe}
//     `,
//   };

//   return transporter.sendMail(mailOptions);
// };

// app.post('/email-submit', async (req, res) => {
//   const { name, email, category, theme, shop, describe } = req.body;

//   try {
//     const newSupportEmail = new Support({
//       name,
//       email,
//       category,
//       theme,
//       shop,
//       describe,
//     });

//     await newSupportEmail.save();

//     await sendEmails(req.body);

//     res.status(200).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Error saving form data or sending email:', error);
//     res.status(500).json({ message: 'Failed to submit the form' });
//   }
// });

// app.post('/api/template', async (req, res) => {
//   try {
//     const { TemplateAll, email } = req.body;
//     console.log('Received template data:', TemplateAll, 'Email:', email);
//     const newTemplate = new Template({ TemplateAll, email });
//     await newTemplate.save();
//     await sendEmail(email, TemplateAll);
//     res.status(200).json({ message: 'Template data received and stored successfully!' });
//   } catch (error) {
//     console.error('Error receiving template data:', error);
//     res.status(500).json({ message: 'Error processing the request', error });
//   }
// });


// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);

// // const uploadDir = path.join(__dirname, 'upload');
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }

// const saveBase64Image = (base64Str, fileName) => {
//   const base64Data = base64Str.replace(/^data:image\/png;base64,/, '');
//   const filePath = path.join(uploadDir, fileName);
//   fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
//   return filePath;
// };


// const sendEmail = async (email, TemplateAll) => {
//   try {
//     console.log('Preparing to send email');
//     console.log('Email:', email);
//     console.log('TemplateAll:', TemplateAll);

//     const fields = TemplateAll.fields || [];
//     if (fields.length > 0) {
//       const fieldNames = fields.map(field => field.type);
//       console.log('Field types in TemplateAll:', fieldNames);
//     }

//     const attachments = [];

//     const renderFieldsHTML = () => {
//       return fields
//         .map((field) => {
//           switch (field.type) {
//             case 'heading':
//               const headingbgImage = field.headingbgImage || '';
//               const updatedimageUrl = headingbgImage.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
//                 if (match.startsWith('data:image/png;base64,')) {
//                   const uniqueId = `image-${Date.now()}`;
//                   const imagePath = saveBase64Image(match, `${uniqueId}.png`);
//                   attachments.push({
//                     filename: `${uniqueId}.png`,
//                     path: imagePath,
//                     cid: uniqueId,
//                   });

//                   return `cid:${uniqueId}`;
//                 }
//                 return match;
//               });

//               const editorContent = field.editorContent || '';
//               const updateeditorContent = editorContent.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
//                 if (match.startsWith('data:image/png;base64,')) {
//                   const uniqueId = `image-${Date.now()}`;
//                   const imagePath = saveBase64Image(match, `${uniqueId}.png`);
//                   attachments.push({
//                     filename: `${uniqueId}.png`,
//                     path: imagePath,
//                     cid: uniqueId,
//                   });

//                   return `cid:${uniqueId}`;
//                 }
//                 return match;
//               });

//               return `
//                <div style="background-image: url('${updatedimageUrl}');
//                 background-size: cover; background-position: center;
//                 border-width: ${field.headingBorderWidth || 1}px;
//                 border-style: ${field.headingBorderStyle || 'solid'};
//                 border-color: ${field.headingBorderColor || '#000'};
//                 width: ${field.bannerImageWidth || 100}%;
//                 height: ${field.bannerImageHeight || '400px'};
//                 opacity:${field.headeropacity};
//                ">
//              <table role="presentation" width="100%" height="100%" style="height: 100%; width: 100%; border-collapse: collapse;">
//                 <tr>
//           <td align="center" valign="middle" style="text-align: ${field.headingTextAlign || 'center'}; vertical-align: middle; padding: ${field.headingPadding || '20px'}px;">
//             <div style="width: 100%; text-align: ${field.headingTextAlign || 'center'};">
//             <h1 style="font-size: ${field.headingFontSize || 30}px; 
//               color: ${field.headingColor || '#000'}; 
//               font-weight: ${field.headingFontWeight || 'bold'}; 
//               line-height: 48px; 
//               letter-spacing: ${field.headingLetterSpacing || 0}px; 
//               text-align: ${field.headingTextAlign || 'center'};">
//               ${field.headingText || ''}
//             </h1>
//             <div style="font-size: ${field.headingsubheading}px; color:${field.subheadingColor}; margin: 20px 0;">
//               ${updateeditorContent || ''}
//             </div>
            
//             ${field.headingUrl ? `
//               <a href="${field.headingUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
//                 <button style="
//                   font-size: ${field.headingbtnFontSize || 16}px;
//                   width: ${field.headingbtnwidth || 'auto'}px;
//                   height: ${field.headingbtnheight || 'auto'}px;
//                   background-color: ${field.headerbtnbg || '#007bff'};
//                   border-width: ${field.headingbtnBorderWidth || 1}px;
//                   border-style: ${field.headingbtnBorderStyle || 'solid'};
//                   border-color: ${field.headingbtnBorderColor || '#007bff'};
//                   color: ${field.headerbtncolor || '#fff'};
//                   border-radius: ${field.headingbtnradious || 4}px;
//                   padding-left: ${field.headingbtnPadding || '10px'}px;
//                   padding-right: ${field.headingbtnPadding || '10px'}px;
//                   padding-top: ${field.headingbtntopPadding || '10px'}px;
//                   padding-bottom: ${field.headingbtntopPadding || '10px'}px;
//                   cursor: pointer;
//                 " class="show-bnt-product">
//                   ${field.headerbtn || 'Buy Now'}
//                 </button>
//               </a>
//             ` : ''}
//           </div>
//            </td>
//          </tr>
//         </table>
//               </div>
//             `;
//             case 'richtext':
//               const content = field.content || '';
//               const updatedContent = content
//                 .replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
//                   if (match.startsWith('data:image/png;base64,')) {
//                     const uniqueId = `image-${Date.now()}`;
//                     const imagePath = saveBase64Image(match, `${uniqueId}.png`);
//                     attachments.push({
//                       filename: `${uniqueId}.png`,
//                       path: imagePath,
//                       cid: uniqueId,
//                     });

//                     return `cid:${uniqueId}`;
//                   }
//                   return match;
//                 })
//                 .replace(/<p><br><\/p>/g, '');

//               return `
//                 <div>
//                   <div style="text-align: ${field.richTextAlign || 'left'};
//                       color:${field.richtextcolor};
//                       display: flow-root;
//                       font-size: ${field.richFontsize || 16}px;
//                       background-color: ${field.richbgcolor || '#007bff'};
//                       padding-left: ${field.richleftPadding || '10px'}px;
//                       padding-right: ${field.richleftPadding || '10px'}px;
//                       padding-top: ${field.richtopPadding || '10px'}px;
//                       padding-bottom: ${field.richtopPadding || '10px'}px;">
//                     ${updatedContent}
//                   </div>
//                 </div>
//               `;

//             case 'description':
//               return `<p style="font-size: ${field.descritionFontSize || 16}px; color: ${field.descritionColor || '#000'}; font-weight: ${field.descritionFontWeight || 'normal'};">${field.value}</p>`;
//             case 'button': {
//               return `
//                   <div style="background-color: ${field.buttonbgColor || '#008CBA' }; text-align: ${field.buttonaline || 'left'};">
//                     <a href="${field.buttonUrll || '#'}" target="_blank" style="text-decoration: none;">
//                       <button style="
//                         background-color: ${field.buttonColor || '#008CBA'};
//                         padding: ${field.buttonPadding || '10px 20px'}px;
//                         height: ${field.buttonHeight || '40'}px;
//                         width: ${field.buttonWidth || 'auto'}px;
//                         font-size: ${field.buttonFontSize || '16'}px;
//                         border: ${field.buttonBorderWidth || '0'}px 
//                                 ${field.buttonBorderStyle || 'none'} 
//                                 ${field.buttonBorderColor || '#000'};
//                         color: ${field.buttonTextColor || '#fff'};
//                         cursor: pointer;
//                         border-radius: ${field.buttonradious}px;
//                       ">
//                         ${field.buttonLabel || 'Click Here'}
//                       </button>
//                     </a>
//                   </div>`;
//             }
//             case 'Multicolumn': {
//               const columnsPerRow = field.columnsPerRow || 1;
//               let columnCount = 0;
//               let result = `
//                 <div style="color: ${field.MultiColor || '#000'}; padding: ${field.MultiPadding || '1px'}px; text-align: center; background-color: ${field.Multibgcolor || 'transparent'};">
//                   <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
//               `;
            
//               field.columnData.forEach((column, index) => {
//                 if (columnCount % columnsPerRow === 0) {
//                   if (columnCount > 0) result += '</tr>';
//                   result += '<tr>';
//                 }
            
//                 let imageCid = '';
//                 if (column.image && column.image.startsWith('data:image/png;base64,')) {
//                   const uniqueId = `image-${Date.now()}-${index}`;
//                   const imagePath = saveBase64Image(column.image, `${uniqueId}.png`);
//                   attachments.push({
//                     filename: `${uniqueId}.png`,
//                     path: imagePath,
//                     cid: uniqueId,
//                   });
//                   imageCid = `cid:${uniqueId}`;
//                 }
            
//                 let processedContent = column.content.replace(
//                   /<p><br><\/p>/g, 
//                   '' 
//                 ).replace(
//                   /<img src="data:image\/[a-zA-Z]*;base64,[^"]*"/g,
//                   (match) => {
//                     const uniqueId = `content-image-${Date.now()}-${index}`;
//                     const base64Data = match.match(/data:image\/[a-zA-Z]*;base64,[^"]*/)[0];
//                     const imagePath = saveBase64Image(base64Data, `${uniqueId}.png`);
//                     attachments.push({
//                       filename: `${uniqueId}.png`,
//                       path: imagePath,
//                       cid: uniqueId,
//                     });
//                     return `<img src="cid:${uniqueId}"`;
//                   }
//                 );
            
//                 result += `
//                   <td style="
//                     width: ${100 / columnsPerRow}%;
//                     text-align: ${field.Multitext || 'center'};
//                     font-size: ${field.fontsizeMulticolumn || 14}px;
//                     border-width: ${field.MulticolumnbtnBorderWidth || 1}px;
//                     border-style: ${field.MulticolumnbtnBorderStyle || 'solid'};
//                     border-color: ${field.MulticolumnbtnBorderColor || '#000'};
//                     padding: ${field.MulticolumnPadding || '10'}px;
//                     background-color: ${field.Multicolumnbgcolor || 'transparent'};
//                     color: ${field.MultiColor || '#000'};
//                   ">
//                     ${imageCid ? `<img src="${imageCid}" alt="Column ${index}" style="width: 100%; height: auto;" />` : ''}
//                     ${processedContent}
//                     ${
//                       column.isVisible
//                         ? `
//                       <a href="${column.Multibtnurl || '#'}" target="_blank" style="text-decoration: none;">
//                         <button style="
//                           margin-top: 20px;
//                           background-color: ${field.Multibtnbg || '#007BFF'};
//                           border-width: ${field.MultibtnBorderWidth || 2}px;
//                           border-style: ${field.MultibtnBorderStyle || 'solid'};
//                           border-color: ${field.MultibtnBorderColor || '#000'};
//                           width: ${field.Multibtnweight || 100}px;
//                           height: ${field.Multibtnheight || 40}px;
//                           color: ${field.Multibtncolor || '#000'};
//                           border-radius: ${field.Multibtnradious || 0}px;
//                           font-size: ${field.Multibtnfont || 14}px;
//                           cursor: pointer;
//                         ">
//                           ${column.Multibtnlable || 'Click'}
//                         </button>
//                       </a>
//                     `
//                         : ''
//                     }
//                   </td>
//                 `;
            
//                 columnCount++;
//               });
            
//               if (columnCount % columnsPerRow !== 0) result += '</tr>';
//               result += '</table></div>';
            
//               return result;
//             }
//             case 'images': {
//               if (field.value.startsWith('data:image/png;base64,')) {
//                 const uniqueId = `image-${Date.now()}`;
//                 const imagePath = saveBase64Image(field.value, `${uniqueId}.png`);
//                 attachments.push({
//                   filename: `${uniqueId}.png`,
//                   path: imagePath,
//                   cid: uniqueId,
//                 });

//                 return `
//                       <div style="
//                         text-align: ${field.imgTextAlign || 'center'};
//                         background-color: ${field.imgbg || 'transparent'};
//                         border-width: ${field.imgBorderWidth || 1}px;
//                         border-style: ${field.imgBorderStyle || 'solid'};
//                         border-color: ${field.imgBorderColor || '#000'};
//                         padding: ${field.imgPadding || 0}px;
//                       ">
//                         <img 
//                           src="cid:${uniqueId}" 
//                           alt="${field.label || 'Image'}" 
//                           style="width: ${field.imgWidth || 100}%;"
//                         />
//                       </div>`;
//               }
//               return '';
//             }

//             case 'split': {
//               const value = field.value || '';
//               const updatedValue = value.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, () => '');
            
//               return `
//                 <div style="
//                   overflow: hidden;
//                   background-color: ${field.splitbg || '#ffffff'}; 
//                   width: ${field.width || '100%'};
//                   height: ${field.splitheight || 'auto'}px;
//                   padding: ${field.splitPadding || 0}px;
//                   float: inline-start;
//                   color:${field.splitColor};
//                 ">
//                   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="
//                     width: 100%; 
//                     height: 100%; 
//                     text-align: ${field.splitTextAlin || 'left'};
//                     border-spacing: 0; 
//                     float: inline-start;
//                     color:${field.splitColor};
//                   ">
//                     <tr>
//                       <td style="
//                         vertical-align: ${field.splittext === 'end' ? 'bottom' : (field.splittext === 'left' || !field.splittext ? 'top' : field.splittext)};
//                         text-align: ${field.splitTextAlin || 'left'}; 
//                       ">
//                         ${
//                           field.value.startsWith('data:image/')
//                             ? (() => {
//                                 const uniqueId = `image-${Date.now()}`;
//                                 const imagePath = saveBase64Image(field.value, `${uniqueId}.png`);
//                                 attachments.push({
//                                   filename: `${uniqueId}.png`,
//                                   path: imagePath,
//                                   cid: uniqueId,
//                                 });
//                                 return `<img src="cid:${uniqueId}" alt="Uploaded Preview" style="width: 100%; height: auto; display: block;" />`;
//                               })()
//                             : `<div>${updatedValue}</div>`
//                         }
//                         ${
//                           field.showbtnsplit
//                             ? `
//                             <a href="${field.splitbtnurl || '#'}" target="_blank" style="text-decoration: none;">
//                               <button style="
//                                 margin-top: 20px;
//                                 background-color: ${field.splitbtnbg || '#007BFF'};
//                                 font-size: ${field.splitbtnfont || 14}px;
//                                 color: ${field.splitbtncolor || '#FFF'};
//                                 height: ${field.splitbtnheight || 40}px;
//                                 width: ${field.splitbtnwidth || 100}px;
//                                 border-radius: ${field.splitbtnradious || 0}px;
//                                 border-width: ${field.splitBorderWidth || 2}px;
//                                 border-style: ${field.splitBorderStyle || 'solid'};
//                                 border-color: ${field.splitBorderColor || '#000'};
//                                 cursor: pointer;
//                               ">
//                                 ${field.splitbtn || 'Click Me'}
//                               </button>
//                             </a>
//                             `
//                             : ''
//                         }
//                       </td>
//                     </tr>
//                   </table>
//                 </div>
//               `;
//             }
//             case 'product':
//               return `
//                 <div>
//                   ${field.products && field.products.length > 0 ? `
//                     <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-spacing: 0;">
//                       <tr>
//                         ${field.products.map((product, index) => `
//                           <td style="
//                             width: ${100 / field.productsPerRow}%;
//                             padding: ${field.productPadding}px;
//                             text-align: center;
//                             background-color: ${field.productbg};
//                             border-width: ${field.productBorderWidth}px;
//                             border-style: ${field.productBorderStyle};
//                             border-color: ${field.productBorderColor};
//                             font-size: ${field.productFontSize}px;
//                             color: ${field.productTextColor};
//                           ">
//                             ${product.image ? `
//                               <div class="images-gallery">
//                                 <img
//                                   src="${product.image}"
//                                   alt="${product.title || 'Product Image'}"
//                                   style="width: 150px; height: 150px; object-fit: cover; margin-bottom: 10px;"
//                                 />
//                               </div>
//                             ` : '<p>No image available</p>'}
            
//                             <div>
//                               <h4 style=" margin-top: 10px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
//                                 ${product.title}
//                               </h4>
            
//                               ${field.price && product.price ? `
//                                 <p style=" margin-top:10px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
//                                   Price: $${product.price}
//                                 </p>
//                               ` : ''}
            
//                               ${field.showbtnn ? `
//                                 <a href="${field.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
//                                   <button
//                                     style="
//                                       margin-top: 10px;
//                                       font-size: ${field.productfontSize}px;
//                                       width: ${field.productwidth}px;
//                                       height: ${field.productheight}px;
//                                       background-color: ${field.productbackgroundColor};
//                                       border-width: ${field.productbtnBorderWidth}px;
//                                       border-style: ${field.productbtnBorderStyle};
//                                       border-color: ${field.productbtnBorderColor};
//                                       color: ${field.productbtnbg};
//                                       border-radius: ${field.productradious}px;
//                                       cursor: pointer;
//                                     "
//                                     class="show-btn-product"
//                                   >
//                                     ${field.productLabel || 'Buy Now'}
//                                   </button>
//                                 </a>
//                               ` : ''}
//                             </div>
//                           </td>
//                         `).join('')}
//                       </tr>
//                     </table>
//                   ` : '<p>No products available</p>'}
//                 </div>
//               `;

//             case 'divider':
//               return ` <div style = "background-color: ${field.dividerbgColor || 'transparent'}; width:100%;"> <hr style="border-color: ${field.dividerColor || '#000'}; width: ${field.dividerWidth || '100%'}%; height: ${field.dividerHeight || '1px'}; margin: auto " /> </div>`;
//             case 'html convert':
//               return `<div style="color: ${field.htmlColor || '#000'}; font-size: ${field.htmlFontSize || '16px'};">${field.value}</div>`;
//             case 'spacer':
//               return `
//                       <div style="height: ${field.spacerHeight || '20px'}px; background-color: ${field.spacerbg || '#EDEDED'}; padding: ${field.splitPadding || '0'}px 0;">
//                       </div>
//                     `;
//             case 'socalicon':

//               if (field.value) {

//                 const icons = [];

//                 if (field.value.facebook && !field.value.facebook.isHidden && field.value.facebook.url) {
//                   icons.push(`
//                     <a href="${field.value.facebook.url}" target="_blank" rel="noopener noreferrer">
//                       <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/facebook.png?v=1732510414" 
//                            alt="Facebook" 
//                            style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
//                     </a>
//                   `);
//                 }

//                 if (field.value.twitter && !field.value.twitter.isHidden && field.value.twitter.url) {
//                   icons.push(`
//                     <a href="${field.value.twitter.url}" target="_blank" rel="noopener noreferrer">
//                       <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/twitter.png?v=1732510414" 
//                            alt="Twitter" 
//                            style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
//                     </a>
//                   `);
//                 }

//                 if (field.value.instagram && !field.value.instagram.isHidden && field.value.instagram.url) {
//                   icons.push(`
//                     <a href="${field.value.instagram.url}" target="_blank" rel="noopener noreferrer">
//                       <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/instagram.png?v=1732510414" 
//                            alt="Instagram" 
//                            style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
//                     </a>
//                   `);
//                 }

//                 if (field.customIcons && Array.isArray(field.customIcons)) {
//                   field.customIcons
//                     .filter(icon => !icon.isHidden && icon.url)
//                     .forEach((icon, index) => {
//                       const uniqueId = `custom-icon-${Date.now()}-${index}`;

//                       if (icon.src && icon.src.startsWith('data:image/png;base64,')) {
//                         const imagePath = saveBase64Image(icon.src, `${uniqueId}.png`);
//                         attachments.push({
//                           filename: `${uniqueId}.png`,
//                           path: imagePath,
//                           cid: uniqueId,
//                         });
//                         icons.push(`
//                           <a href="${icon.url} "style="padding-right: ${field.socalIcongap}px;" target="_blank" rel="noopener noreferrer">
//                             <img src="cid:${uniqueId}" 
//                                  alt="${uniqueId}" 
//                                  style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
//                           </a>
//                         `);
//                       }
//                     });
//                 }

//                 return `
//                   <div style="
//                     text-align: ${field.socaliconTextAlign || 'left'}; 
//                     background-color: ${field.socalIconbg || 'transparent'}; 
//                     padding: ${field.socalIconPadding || 0}px;
//                   ">
//                     ${icons.join('')}
//                   </div>
//                 `;
//               }
//               return '';
//             default:
//               return '';
//           }
//         })
//         .join('');
//     };

//     const fieldsHTML = renderFieldsHTML();

//     const backgroundImage = TemplateAll.styles.backgroundImage || '';
//     const updatedimageUrl = backgroundImage.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
//       if (match.startsWith('data:image/png;base64,')) {
//         const uniqueId = `image-${Date.now()}`;
//         const imagePath = saveBase64Image(match, `${uniqueId}.png`);
//         attachments.push({
//           filename: `${uniqueId}.png`,
//           path: imagePath,
//           cid: uniqueId,
//         });

//         return `cid:${uniqueId}`;
//       }
//       return match;
//     });
//     const userHtmlContent = `

//     <html>
//      <head>
//     <style>
//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//       }
      
//       h1{
//           font-size: 40px !important;
//           line-height: 50px;
//       }
//           h2 {
//          font-size: 30px !important;
//          line-height: 40px;
//        }
        
//      a {
//     text-decoration: none;
//      }
//     </style>
//   </head>
//       <body style="background-color: ${TemplateAll.styles.backgroundColor || 'white'};
//        width: ${TemplateAll.styles.width || '100%'}; 
//        border-radius: ${TemplateAll.styles.borderRadious || '0'}px;
//         text-align: ${TemplateAll.styles.textAlign || 'left'};
//         padding: ${TemplateAll.styles.templatePadding || '0'}px;
//         font-family: ${TemplateAll.styles.fontFamily || 'Arial'};
//         margin:auto;
//         background-image: url('${updatedimageUrl}');
//         background-repeat: no-repeat;
//         background-size: cover;
//          ">
//         <div>
//           ${fieldsHTML}
//         </div>
//       </body>
//     </html>
//   `;
//     const adminHtmlContent = `
//       <html>
//         <body>
//           <h1>New form submission from ${email}</h1>
//           <div>
//           </div>
//         </body>
//       </html>
//     `;
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'sahil@hubsyntax.com',
//         pass: 'wqnr gaom dgzq asyu',
//       },
//     });

//     const adminMailOptions = {
//       from: 'sahil@hubsyntax.com',
//       to: 'sahil@hubsyntax.com',
//       subject: 'New Customer Query EcombitHub',
//       html: adminHtmlContent,
//     };

//     const userMailOptions = {
//       from: 'sahil@hubsyntax.com',
//       to: email,
//       subject: 'Thank You for Your Query!',
//       html: userHtmlContent,
//       attachments,
//     };

//     console.log('Sending admin email to sahil@hubsyntax.com');
//     await transporter.sendMail(adminMailOptions);

//     console.log('Sending user email to:', email);
//     await transporter.sendMail(userMailOptions);

//     console.log('Emails sent successfully!');
//   } catch (error) {
//     console.error('');
//   }
// };

// app.get('/check-title/:title', async (req, res) => {
//   try {
//     const { title } = req.params;
//     const existingForm = await Email.findOne({ title });
//     if (existingForm) {
//       return res.json({ exists: true });
//     }
//     res.json({ exists: false });
//   } catch (error) {
//     console.error('Error checking title:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/copy-email', async (req, res) => {
//   const copiedForm = req.body;

//   try {
//     delete copiedForm._id;

//     if (!copiedForm || !copiedForm.formId) {
//       throw new Error('Invalid form data');
//     }
//     const savedForm = await Email.create(copiedForm);

//     res.status(201).json(savedForm);
//   } catch (error) {
//     console.error('Error copying form:', error.message);
//     res.status(500).json({ error: 'Failed to copy form', details: error.message });
//   }
// });

// app.get('/get/data', async (req, res) => {
//   try {
//     const data = await Email.find({});
//     res.status(200).json({ message: 'Form data retrieved', data: data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching forms', error: error.message });
//   }
// });

// app.get('/get/base64', async (req, res) => {
//   try {
 
//     const data = await Email.find({});
//     res.status(200).json({ message: 'Form data retrieved', data: data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching forms', error: error.message });
//   }
// });

// app.get('/check-form-connected/:formId', async (req, res) => {
//   const { formId } = req.params;

//   try {

//     const form = await Email.findOne({ form_ids: formId });

//     if (form) {
//       return res.status(200).json({ isConnected: true });
//     } else {
//       return res.status(200).json({ isConnected: false });
//     }
//   } catch (error) {
//     console.error('Error checking form connection:', error);
//     res.status(500).json({ message: 'Error checking form connection', error: error.message });
//   }
// });

// app.put('/unlink-template/:formId', async (req, res) => {
//   const { formId } = req.params;

//   try {
//     const form = await Email.findOne({ form_ids: formId });

//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     form.form_ids = form.form_ids.filter((id) => id !== formId);
//     await form.save();

//     res.status(200).json({ message: 'Template successfully unlinked from the form', data: form });
//   } catch (error) {
//     console.error('Error unlinking template:', error);
//     res.status(500).json({ message: 'Error unlinking template', error: error.message });
//   }
// });

// app.post('/send/api', upload.single('headingbgImage'), async (req, res) => {
//   try {
//     const { templateId, shop, title, fields, createdAt, form_ids } = req.body;

//     const formIds = Array.isArray(form_ids) ? form_ids : [form_ids];
//     const fieldsArray = Array.isArray(fields) ? fields : [fields];

//     const formData = new Email({
//       templateId,
//       shop,
//       title,
//       form_ids: formIds,
//       fields: fieldsArray,
//       createdAt,
//     });

//     if (req.file) {
//       formData.fields.forEach(field => {
//         if (field.type === 'heading' && field.headingbgImage === null) {
//           field.headingbgImage = req.file.path; 
//         }
//       });
//     }

//     const savedForm = await formData.save();
//     res.status(201).json({ message: 'Form saved successfully', data: savedForm });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving form', error: error.message });
//   }
// });


// app.get('/template/data', async (req, res) => {
//   try {
//     const data = await Templated.find({});
//     res.status(200).json({ message: 'Form data retrieved', data: data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching forms', error: error.message });
//   }
// });

// app.get('/template/image', async (req, res) => {
//   try {
//     const data = await Templated.find({}).select('templateId title  createdAt base64Image');
//     res.status(200).json({ message: 'Form data retrieved', data: data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching forms', error: error.message });
//   }
// });

// app.post('/template/api', upload.single('image'), async (req, res) => {
//   console.log('respose-data', req.body);
//   try {
//     const { templateId,base64Image, title, fields, createdAt, styles } = req.body;
//     const formData = new Templated({
//       templateId,
//       title,
//       base64Image,
//       fields,
//       createdAt,
//       styles,
//     });

//     if (req.file) {
//       formData.styles.backgroundImage = req.file.path;
//     }

//     const savedForm = await formData.save();
//     res.status(201).json({ message: 'Form saved successfully', data: savedForm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving form', error: error.message });
//   }
// });

// app.put('/update/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     let updatedFormData = req.body;

//     if (updatedFormData.base64Image) {
//       const base64Image = updatedFormData.base64Image;

//       if (!base64Image.startsWith('data:image')) {
//         throw new Error('Invalid base64 image format');
//       }
//     }

//     const updatedForm = await Email.findByIdAndUpdate(id, updatedFormData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedForm) {
//       return res.status(404).json({ message: 'Form not found' });
//     }

//     res.status(200).json({
//       message: 'Form updated successfully',
//       data: updatedForm,
//     });
//   } catch (error) {
//     console.error('Error updating form:', error);
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// });


// app.delete('/delete/:id', async (req, res) => {
//   const { id } = req.params;
//   try {

//     const result = await Email.findOneAndDelete({ templateId: id });
//     if (!result) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     res.status(200).json({ message: 'Form deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting form:", error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// app.post('/api/save-shop', async (req, res) => {
//   try {
//     const { shop, accessToken } = req.body;

//     if (!shop || !accessToken) {
//       return res.status(400).json({ error: "Shop domain and access token are required" });
//     }

//     const updatedShopDetails = await ShopDetails.findOneAndUpdate(
//       { shop },
//       { accessToken },
//       { new: true, upsert: true }
//     );
//     return res.json({ success: true, message: 'Shop details processed successfully.' });
//   } catch (e) {
//     console.error('Error occurred:', e);
//     return res.status(500).json({ error: 'Internal server error: ' + e.message });
//   }
// });


// app.get('/payment/plan', async (req, res) => {

//   const shop = req.query.shop;
//   if (!shop) {
//     return res.status(400).json({ error: 'Shop parameter is required' });
//   }

//   try {
//     const paymentPlan = await Payment.findOne({ shop });


//     if (!paymentPlan) {
//       return res.status(404).json({ error: 'Payment plan not found' });
//     }

//     const forms = await Form.countDocuments({ shop });
//     const maxFormsAllowed = paymentPlan.plan === 'free' ? 1 : Infinity;
//     const status = paymentPlan.status;

//     res.status(200).json({
//       plan: paymentPlan.plan,
//       formCount: forms,
//       maxForms: maxFormsAllowed,
//       status: status,
//     });
//   } catch (error) {
//     console.error('Error retrieving payment plan:', error);
//     res.status(500).json({ error: 'Failed to retrieve payment plan' });
//   }
// });

// app.post('/payment/confirm', async (req, res) => {

//   try {
//     const { chargeId, shop, name, plan, price, status, billingOn } = req.body;

//     if (!chargeId) {
//       return res.status(400).json({ error: "Charge ID is required" });
//     }
//     if (!shop || !name || !plan || status === undefined || billingOn === undefined || price === undefined) {
//       return res.status(400).json({ error: "All payment details are required" });
//     }

//     const existingActivePlan = await Payment.findOne({ shop, status: 'active' });
//     if (existingActivePlan) {
//       existingActivePlan.status = 'disactive';
//       await existingActivePlan.save();
//     }

//     let payment = await Payment.findOne({ chargeId, shop });
//     if (payment) {

//       payment.name = name;
//       payment.plan = plan;
//       payment.price = price;
//       payment.status = status;
//       payment.billingOn = billingOn;
//       await payment.save();
//     } else {

//       payment = new Payment({
//         shop,
//         name,
//         plan,
//         price,
//         status,
//         billingOn,
//         chargeId,
//       });
//       await payment.save();
//     }

//     res.json({ success: true, payment });
//   } catch (error) {
//     console.error('Error confirming payment:', error.message);
//     res.status(500).json({ error: 'Error confirming payment' });
//   }
// });


// // app.get('/api/customer', async (req, res) => {
// //   try {
// //     const forms = await Form.find({});

// //     const uniqueForms = forms.reduce((acc, current) => {
// //       const currentFieldValues = current.fields.map(field => field.value).sort().join('|');

// //       const duplicate = acc.find(form => {
// //         const existingFieldValues = form.fields.map(field => field.value).sort().join('|');
// //         return existingFieldValues === currentFieldValues;
// //       });

// //       if (!duplicate) {
// //         acc.push(current);
// //       }

// //       return acc;
// //     }, []);

// //     res.status(200).json(uniqueForms);
// //   } catch (error) {
// //     console.error('Error retrieving forms:', error);
// //     res.status(500).send({ error: 'Failed to retrieve forms' });
// //   }
// // });

// app.get('/api/customer', async (req, res) => {
//   try {
//     const forms = await Form.find({});
//     const emailMap = new Map();

//     forms.forEach(form => {
//       const shop = form.shop;
//       form.fields.forEach(field => {
//         if (field.name === 'Email') {
//           const email = field.value;
//           if (!emailMap.has(email)) {
//             emailMap.set(email, []);
//           }

//           emailMap.get(email).push(shop);
//         }
//       });
//     });
//     const emailArray = [...emailMap].map(([email, shops]) => ({ email, shops }));

//     res.status(200).json(emailArray);
//   } catch (error) {
//     console.error('Error retrieving emails:', error);
//     res.status(500).send({ error: 'Failed to retrieve emails' });
//   }
// });

// app.get('/api/forms', async (req, res) => {
//   try {
//     const forms = await Form.find({});
//     res.status(200).json(forms);
//   } catch (error) {
//     console.error('Error retrieving forms:', error);
//     res.status(500).send({ error: 'Failed to retrieve forms' });
//   }
// });

// app.post('/api/forms', async (req, res) => {
//   try {
//     const formsData = req.body;
//     const { title, id, fields, timestamp, currentUrl, shop } = formsData;
//     console.log("data", req.body);
//     if (!shop) {
//       return res.status(400).send({ error: 'Shop field is missing from the form submission.' });
//     }
//     if (!title || !id || !fields || !Array.isArray(fields) || fields.length === 0) {
//       return res.status(400).send({ error: 'Missing required fields: title, id, and fields are required.' });
//     }

//     for (const field of fields) {
//       if (!field.id || !field.value) {
//         return res.status(400).send({ error: 'Each field must have an id and a value.' });
//       }
//     }

//     let form = await Form.findOne({ id });

//     if (!form) {
//       form = new Form({
//         title,
//         id,
//         shop,
//         currentUrl,
//         fields,
//         timestamp: timestamp || new Date().toISOString(),
//         submissionCount: 0,
//         submissions: []
//       });
//       await form.save();
//     }

//     form.submissionCount += 1;
//     form.submissions.push({
//       fields,
//       timestamp: new Date().toISOString(),
//     });

//     await form.save();

//     const emailField = fields.find(field => field.name === 'Email');
//     const email = emailField ? emailField.value : null;

//     if (!email) {
//       return res.status(400).send({ error: 'Email field is missing from the form submission.' });
//     }


//     res.status(201).send({
//       message: 'Form submitted successfully!',
//       submissionCount: form.submissionCount,
//       submissions: form.submissions
//     });
//   } catch (error) {
//     console.error('Error saving form submission:', error);
//     res.status(500).send({ error: 'Failed to save form submission' });
//   }
// });


// app.get('/get-forms', async (req, res) => {
//   try {
//     const forms = await FormModel.find();
//     res.json(forms);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.post('/copy-form', async (req, res) => {
//   const copiedForm = req.body;

//   try {
//     if (!copiedForm || !copiedForm.formId) {
//       throw new Error('Invalid form data');
//     }
//     const savedForm = await FormModel.create(copiedForm);

//     res.status(201).json(savedForm);
//   } catch (error) {
//     console.error('Error copying form:', error.message);
//     res.status(500).json({ error: 'Failed to copy form', details: error.message });
//   }
// });

// app.get('/get-form/:formId', async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const form = await FormModel.findOne({ formId });

//     if (!form) {
//       return res.status(404).send('Form not found');
//     }

//     res.json(form);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.post('/form-data', async (req, res) => {
//   try {
//     const { title } = req.body;

//     let existingForm = await FormModel.findOne({ title: title.trim() });
//     let newTitle = title.trim();

//     let counter = 1;
//     while (existingForm) {
//       newTitle = `${title.trim()} ${counter}`;
//       existingForm = await FormModel.findOne({ title: newTitle });
//       counter++;
//     }

//     const { formId, shop, fields, createdAt, styles, submissionOption, toggleStatus, thankYouTimer, editorValue, url, status } = req.body;
//     const newFormEntry = new FormModel({
//       formId,
//       shop,
//       title: newTitle,
//       fields,
//       createdAt,
//       styles,
//       toggleStatus,
//       submissionOption,
//       thankYouTimer,
//       editorValue,
//       url,
//       status
//     });

//     await newFormEntry.save();

//     res.status(201).send({ message: 'Form created successfully', title: newTitle });
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });


// app.put('/update-form/:formId', async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const updatedForm = await FormModel.findOneAndUpdate({ formId }, req.body, { new: true });

//     if (!updatedForm) {
//       return res.status(404).send('Form not found');
//     }

//     res.status(200).send('Form updated successfully');
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.delete('/delete-form/:formId', async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const result = await FormModel.deleteOne({ formId });

//     if (result.deletedCount === 0) {
//       return res.status(404).send('Form not found');
//     }

//     res.status(200).send('Form deleted successfully');
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// // import express from 'express';
// // import mongoose from 'mongoose';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';

// // const app = express();
// // const port = 4001;

// // app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// // app.use(bodyParser.json({ limit: '50mb' }));

// // const mongoUri = 'mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0';

// // mongoose.connect(mongoUri)
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch(err => {
// //     console.error('Error connectingcd  to MongoDB:', err);
// //   });

// //   const formCreateSchema = new mongoose.Schema({
// //     formId: { type: String, required: true },
// //     title: { type: String, required: true },
// //     fields: [{
// //         id: { type: String, required: true },
// //         type: { 
// //             type: String, 
// //             required: true, 
// //             enum: ['text', 'name', 'button', 'divider', 'heading', 'radio','file','number','date','datetime','images','link', 'checkbox','location','toggle', 'select','textarea','password', 'email', 'phone','time','description','url','slider']
// //         },
// //         label: { type: String, required: true },
// //         name: String,
// //         required: { type: Boolean, default: false },
// //         readonly: { type: Boolean, default: false },
// //         width: { type: String, default: '100%' },
// //         text: { type: String, default: '' }, 
// //         description: { type: String, default: '' },
// //         level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], required: false },
// //         fontSize: { type: String, default: '16px' },
// //         padding: { type: String, default: '10px' }, 
// //         color: { type: String, default: '#45a7f6' },
// //         dividerColor: { type: String, default: '#000' },
// //         buttonWidth: { type: String, default: 'auto' },   
// //         buttonHeight: { type: String, default: 'auto' }, 
// //         backgroundColor: { type: String, default: '#45a7f6' }, 
// //         options: [{
// //             id: { type: String, required: true },
// //             label: { type: String, required: true }, 
// //             value: { type: String, required: true },
// //             name: { type: String, required: true, default: function() { return this.label || this.value; } } 
// //         }]
// //     }],
// //     createdAt: { type: String, required: true },
// //     styles: {
// //         backgroundColor: { type: String, required: true },
// //         backgroundImage: { type: String, default: '' },
// //         backgroundRepeat: { type: String, default: 'no-repeat' },
// //         boxShadow: { type: String, default: '' },
// //         width: { type: String, default: '100%' },
// //         padding: { type: String, default: '0' },
// //         borderColor: { type: String, default: '' },
// //         borderRadius: { type: String, default: '0' },
// //         borderWidth: { type: String, default: '1px' }, 
// //         borderStyle: { type: String, default: 'solid' } 

// //     },
// //     status: { 
// //         type: String, 
// //         enum: ['live', 'draft'], 
// //         required: true 
// //     },
// // });

// // const FormModel = mongoose.model('forms_data', formCreateSchema);

// // const formSchema = new mongoose.Schema({
// //     title: { type: String, required: true },
// //     id: { type: String, required: true },
// //     fields: [
// //         {
// //             id: { type: String, required: true },
// //             name: { type: String, required: true },
// //             value: { type: String, required: true },
// //         },
// //     ],
// // });

// // const Form = mongoose.model('Form_costumers', formSchema);

// // app.get('/api/forms', async (req, res) => {
// //   try {
// //       const forms = await Form.find({});
// //       res.status(200).json(forms);
// //   } catch (error) {
// //       console.error('Error retrieving forms:', error);
// //       res.status(500).send({ error: 'Failed to retrieve forms' });
// //   }
// // });

// // app.post('/api/forms', async (req, res) => {
// //   try {
// //       const formsData = req.body;
// //       const { title, id, fields } = formsData;

// //       if (!title || !id || !fields || !Array.isArray(fields) || fields.length === 0) {
// //           return res.status(400).send({ error: 'Missing required fields: title, id, and fields are required.' });
// //       }
// //       for (const field of fields) {
// //           if (!field.id || !field.value) {
// //               return res.status(400).send({ error: 'Each field must have an id and a value.' });
// //           }
// //       }

// //       const newForm = new Form({
// //           title,
// //           id,
// //           fields,
// //       });
// //       await newForm.save();
// //       res.status(201).send({ message: 'Form saved successfully!' });
// //   } catch (error) {
// //       console.error('Error saving forms:', error);
// //       res.status(500).send({ error: 'Failed to save forms' });
// //   }
// // });

// // app.get('/get-forms', async (req, res) => {
// //   try {
// //     const forms = await FormModel.find(); 
// //     res.json(forms);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.error('Error:', error.message);
// //   }
// // });

// // app.get('/get-form/:formId', async (req, res) => {
// //   try {
// //       const { formId } = req.params;
// //       const form = await FormModel.findOne({ formId });

// //       if (!form) {
// //           return res.status(404).send('Form not found');
// //       }

// //       res.json(form);
// //   } catch (error) {
// //       res.status(500).send('Error: ' + error.message);
// //       console.error('Error:', error.message);
// //   }
// // });

// // app.post('/form-data', async (req, res) => {
// //   try {
// //     const { title } = req.body;

// //     const existingForm = await FormModel.findOne({ title: title.trim() });
// //     if (existingForm) {
// //       return res.status(400).send('A form with this title already exists. Please choose a different title.');
// //     }

// //     const { formId, fields, createdAt, styles, status } = req.body; 
// //     const newFormEntry = new FormModel({ formId, title, fields, createdAt, styles, status });
// //     await newFormEntry.save();

// //     res.status(201).send('Form created successfully');
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.error('Error:', error.message);
// //   }
// // });

// // app.put('/update-form/:formId', async (req, res) => {
// //   try {
// //       const { formId } = req.params;
// //       const updatedForm = await FormModel.findOneAndUpdate({ formId }, req.body, { new: true });

// //       if (!updatedForm) {
// //           return res.status(404).send('Form not found');
// //       }

// //       res.status(200).send('Form updated successfully');
// //   } catch (error) {
// //       res.status(500).send('Error: ' + error.message);
// //       console.error('Error:', error.message);
// //   }
// // });

// // app.delete('/delete-form/:formId', async (req, res) => {
// //   try {
// //     const { formId } = req.params;
// //     const result = await FormModel.deleteOne({ formId });

// //     if (result.deletedCount === 0) {
// //       return res.status(404).send('Form not found');
// //     }

// //     res.status(200).send('Form deleted successfully');
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.error('Error:', error.message);
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });
















// // import express from 'express';
// // import mongoose from 'mongoose';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';

// // const app = express();
// // const port = 4001;

// // app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// // app.use(express.json());

// // const mongoUri = 'mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0';

// // mongoose.connect(mongoUri)
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch(err => {
// //     console.error('Error connecting to MongoDB:', err);
// //   });

// //   const formCreate = new mongoose.Schema({
// //   formId: { type: String, required: true },
// //   title: { type: String, required: true },
// //   fields: [{
// //     id: { type: String, required: true },
// //     type: { type: String, required: true }
// //   }],
// //   createdAt: { type: String, required: true },
// // });

// // const FormModel = mongoose.model('forms_data', formCreate);

// // const formSchema = new mongoose.Schema({
// //     title: { type: String, required: true },
// //     id: { type: String, required: true },
// //     fields: [
// //         {
// //             id: { type: String, required: true },
// //             name: { type: String, required: true },
// //             value: { type: String, required: true },
// //         },
// //     ],
// // });

// // const Form = mongoose.model('Form_costumers', formSchema);

// // app.get('/api/forms', async (req, res) => {
// //   try {
// //       const forms = await Form.find({});
// //       res.status(200).json(forms);
// //   } catch (error) {
// //       console.error('Error retrieving forms:', error);
// //       res.status(500).send({ error: 'Failed to retrieve forms' });
// //   }
// // });

// // app.post('/api/forms', async (req, res) => {
// //     try {
// //         const formsData = req.body;
// //         await Form.insertMany(formsData);
// //         res.status(201).send({ message: 'Forms saved successfully!' });
// //     } catch (error) {
// //         console.error('Error saving forms:', error);
// //         res.status(500).send({ error: 'Failed to save forms' });
// //     }
// // });

// // app.get('/get-forms', async (req, res) => {
// //   try {
// //     const forms = await FormModel.find(); 
// //     res.json(forms);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.post('/form-data', async (req, res) => {
// //   try {
// //     const { formId, title, fields, createdAt } = req.body;
// //     const newFormEntry = new FormModel({ formId, title, fields, createdAt });
// //     await newFormEntry.save();

// //     res.send('Success');
// //     // console.log('Data saved:', newFormEntry);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });









// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import nodemailer from 'nodemailer';

// // const app = express();
// // const port = process.env.PORT || 4001;

// // app.use(express.json());
// // app.use(cors());

// // const sendEmail = async (name, lastName, email, message,emailSubject, emailMessage) => {
// //   try {
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: 'sahil@hubsyntax.com',
// //         pass: 'tdry xexo fqgj alzq',
// //       },
// //     });

// //     const adminHtmlContent = `
// //   <html>
// //   <head>
// //     <style>
// //         @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');


// //       .container {
// //         font-family: "Roboto", sans-serif!important;
// //         border: 1px solid #e3e3e3;
// //         height: 600px;
// //         width: 100%;
// //         max-width: 600px;
// //         margin: 50px auto; 
// //         padding: 20px;
// //         background-color: #f6f8fc;
// //         border-radius: 10px;
// //         font-weight: 600;
// //       }

// //       p {
// //         font-size: 18px;
// //         text-align: left;

// //       }

// //     </style>
// //   </head>
// //   <body>
// //     <div class="container">
// //       <p> Name: ${name}</p>
// //        <p>last Name: ${lastName}</p>
// //        <p>email: ${email}</p>
// //        <p>message: ${message}</p>

// //     </div>
// //   </body>
// //   </html>
// //   `;

// //     const userHtmlContent = `
// //   <html>
// //   <head>

// //     <style>
// //       @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

// //       * {
// //         margin: 0;
// //         padding: 0;
// //         box-sizing: border-box;
// //         line-height: 28px;
// //         color: black!important;
// //         text-decoration: none !important;
// //         background-color: white;
// //         font-family: "Roboto", sans-serif!important;
// //       }
// //       .container {
// //       text-align: center;
// //       border: 1px solid #e3e3e3;
// //       height: auto;
// //       width: 100%;
// //       max-width: 800px;
// //       margin: 50px auto;
// //       box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
// //       }

// //       h1 {
// //         margin: 0;
// //       }
// //       p {
// //        font-size: 18px;
// //       text-align: left;
// //       font-weight: 600;
// //       }

// //       .need {
// //         margin-top: 30px;
// //         margin-bottom: 30px;
// //       }
// //     </style>
// //   </head>
// //   <body>
// //     <div class="container">
// //       <img src="cid:user-image" style="width: 100%;" alt="Service Image" />
// //       <div class="elements">
// //         <div class="need">
// //         <p>Hello ${name}</p>
// //         <p>${emailMessage}</p>
// //           <p>At <span class="text-color">EcombitHub,</span> we’re passionate about empowering e-commerce entrepreneurs like you to achieve success. Whether
// //             you’re just starting out or looking to scale your online store, we’ve got you covered with a range of services
// //             designed to meet your unique needs.</p>
// //         </div>
// //       </div>
// //     </div>
// //   </body>
// //   </html>
// //   `;

// //     const adminMailOptions = {
// //       from: email,
// //       to: 'sahil@hubsyntax.com',
// //       subject: 'New Customer Query builder-form',
// //       html: adminHtmlContent,

// //     };

// //     const userMailOptions = {
// //       from: '"EcombitHub Support" <sahil@hubsyntax.com>',
// //       to: email,
// //       subject: emailSubject || 'Welcome to builder-form',
// //       html: userHtmlContent,
// //     };

// //     await transporter.sendMail(adminMailOptions);
// //     await transporter.sendMail(userMailOptions);
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //   }
// // };


// // app.post('/register', async (req, res) => {
// //   const { name, lastName, email, message, emailSubject, emailMessage } = req.body;
// //   await sendEmail(name, lastName, email, message, emailSubject, emailMessage);  
// //   res.status(200).json({ message: 'Email sent successfully' });
// // });


// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

































// // import express from 'express';
// // import mongoose from 'mongoose';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';

// // const app = express();
// // const port = 4001;

// // app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// // const mongoUri = 'mongodb+srv://info:HeTtLubQ6ViUMts3@cluster0.4mbsgst.mongodb.net/diamond?retryWrites=true&w=majority';
// // mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0
// // mongoose.connect(mongoUri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => {
// //   console.log('Connected to MongoDB');
// // }).catch(err => {
// //   console.error('Error connecting to MongoDB:', err);
// // });

// // const formSchema = new mongoose.Schema({
// //   name: String,
// //   number: Number,
// // });

// // const settingSchema = new mongoose.Schema({
// //   data: String
// // });

// // const FormModel = mongoose.model('forms', formSchema);
// // const Model = mongoose.model('settingdatas', settingSchema);

// // app.get('/data', async (req, res) => {
// //   try {
// //     const formEntries = await FormModel.find();
// //     res.json(formEntries);
// //     // console.log('Data retrieved:', formEntries);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.post('/submit', async (req, res) => {
// //   try {
// //     const { name, number } = req.body;
// //     const newFormEntry = new FormModel({ name, number });
// //     await newFormEntry.save();
// //     res.send('Success');
// //     // console.log('Data saved:', newFormEntry);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.get('/settingdata', async (req, res) => {
// //   try {
// //     const formEntries = await Model.find();
// //     res.json(formEntries);
// //     console.log('Data retrieved:', formEntries);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.post('/setting', async (req, res) => {
// //   try {
// //     const { data } = req.body;
// //     const newFormEntry = new Model({ data });
// //     await newFormEntry.save();
// //     res.send('Success');
// //     // console.log('Data saved:', newFormEntry);
// //   } catch (error) {
// //     res.status(500).send('Error: ' + error.message);
// //     console.log('Error:', error.message);
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });