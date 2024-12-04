import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import heading from '../images/heading.png';
import font from '../images/font-size.png';
import image from '../images/image-.png';
import divider2 from '../images/divider.png';
import btn from '../images/btn.png';
import emailtemp from '../images/emailtemp.png';
import phonem from '../images/phonem.png';
import desk from '../images/desk.png';
import socail from '../images/socail.png';
import htmlicon from '../images/htmlicon.png';
import maximizesize from '../images/maximize-size.png';
import deletep from '../images/deletep.png';
import delete1 from '../images/delete.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import videoplay from '../images/videoplay.png';
import left from '../images/left.png';
import right from '../images/right.png';
import product from '../images/product.png';
import spacer from '../images/spacer.png';
import spliti from '../images/spliti.png';
import { format } from 'date-fns';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Link } from "@remix-run/react";
import { authenticate, apiVersion } from "../shopify.server";

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
        const { session } = await authenticate.admin(request);
        const { shop, accessToken } = session;

        const response = await fetch(
            `https://${shop}/admin/api/${apiVersion}/products.json`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const responseData = await response.json();
        const products = responseData?.products || [];

        const productsWithData = products.map(product => {
            const { variants } = product;
            const uniqueColors = Array.from(new Set(variants.map(variant => variant.option1))).join(' | ');
            const uniquePrices = Array.from(new Set(variants.map(variant => variant.price))).join(' | ');
            const uniqueSizes = Array.from(new Set(variants.map(variant => variant.option2))).join(' | ');

            return {
                ...product,
                color: uniqueColors,
                price: uniquePrices,
                size: uniqueSizes
            };
        });

        return { products: productsWithData, shop, apiVersion };
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return { products: [] };
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
    const [headingFontSize, setHeadingFontSize] = useState('16');
    const [descriptionText, setDescriptionText] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
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
    const [selectedFieldIded, setSelectedFieldIded] = useState(null);
    const [showVideoInput, setShowVideoInput] = useState(false);
    const { products, shop, apiVersion } = useLoaderData();
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
    const [buttonLabel, setButtonLabel] = useState('Submit');
    const [fontSize, setFontSize] = useState(16);
    const [padding, setPadding] = useState('10px 20px');
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(40);
    const [btnbackgroundColor, setBtnBackgroundColor] = useState('#007BFF');
    const [showbtn, setShowBtn] = useState(false);
    const [emailWidth, setEmailWidth] = useState('800px');
    const [headingColor, setHeadingColor] = useState('#000');
    const formsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [fontFamily, setFontFamily] = useState('Arial');

    const handleFontChange = (event) => {
        setFontFamily(event.target.value);
    };

    useEffect(() => {
        if (formData) {
            console.log('Form data received:', formData);
            const validFields = formData.fields.map(field => {
                if (!field.id) {
                    console.warn('Field missing ID:', field);
                }
                if (field.type === 'product') {
                    console.log('Price for product field:', field.price);
                    if (field.price === true) {
                        setShowPrice(true);
                    }
                    if (field.showbtnn === true) {
                        setShowbtnn(true);
                    }
                }
                return { ...field, id: field.id || generateUniqueId() };
            });
            setFields(validFields);
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
            console.log('Products per row:', formData.fields[0]?.productsPerRow);

        }
    }, [formData]);

    const createInputField = (type, initialValue = '') => {
        const id = generateUniqueId();
        console.log(`Creating field of type ${type} with ID: ${id}`);

        return {
            id,
            type,
            image: type === 'images' ? initialValue : null,
            headingText: type === 'heading' ? initialValue : '',
            headingLevel: type === 'heading' ? 'h1' : null,
            headingFontSize: type === 'heading' ? '16' : undefined,
            headingLetterSpacing: type === 'heading' ? 0 : undefined,
            headingPadding: type === 'heading' ? 10 : undefined,
            headingTextAlign: type === 'heading' ? "" : undefined,
            headingColor: type === 'heading' ? '#000' : undefined,
            headingbg: type === 'heading' ? '#0000' : undefined,
            headingBorderColor: type === 'heading' ? '#000000' : undefined,
            headingBorderWidth: type === 'heading' ? '0' : undefined,
            headingBorderStyle: type === 'heading' ? 'solid' : undefined,
            headingFontWeight: type === 'heading' ? 600 : undefined,
            descritionFontSize: type === 'description' ? '16' : undefined,
            descritionColor: type === 'description' ? '#000' : undefined,
            descritionFontWeight: type === 'description' ? 500 : undefined,
            descriptionText: type === 'description' ? initialValue : '',
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
            value: initialValue || (type === 'description' ? 'No Description Provided' : 'No Value Provided'),
            dividerColor: type === 'divider' ? '#000' : undefined,
            dividerWidth: type === 'divider' ? '100' : undefined,
            dividerheight: type === 'divider' ? '1' : undefined,
            buttonColor: type === 'button' ? '#007BFF' : undefined,
            buttonTextColor: type === 'button' ? '#FFF' : undefined,
            buttonFontSize: type === 'button' ? 16 : undefined,
            buttonPadding: type === 'button' ? 10 : undefined,
            buttonWidth: type === 'button' ? 100 : undefined,
            buttonHeight: type === 'button' ? 40 : undefined,
            buttonradious: type === 'button' ? 2 : undefined,
            buttonBorderColor: type === 'button' ? '#000000' : undefined,
            buttonBorderWidth: type === 'button' ? '1' : undefined,
            buttonBorderStyle: type === 'button' ? 'solid' : undefined,
            buttonLetterSpacing: type === 'button' ? 0 : undefined,
            buttonUrll: type === 'button' ? '' : undefined,
            socalIconWidth: type === 'socalicon' ? 30 : undefined,
            socalIconHeight: type === 'socalicon' ? 30 : undefined,
            socalIconPadding: type === 'socalicon' ? 10 : undefined,
            socaliconTextAlign: type === 'socalicon' ? "" : undefined,
            htmlColor: type === 'html convert' ? '#000' : undefined,
            htmlFontSize: type === 'html convert' ? 16 : undefined,
            htmlPadding: type === 'html convert' ? 10 : undefined,
            icons: {
                facebook: { url: 'https://facebook.com', isHidden: false },
                twitter: { url: 'https://twitter.com', isHidden: false },
                instagram: { url: 'https://instagram.com', isHidden: false },
            },
            customIcons: [],
            spacerHeight: type === 'spacer' ? '20' : undefined,
            spacerbg: type === 'spacer' ? '#ffffff' : undefined,
            splitbg: type === 'split' ? '#0000' : undefined,
            videoPadding: type === 'video' ? '20' : undefined,
            splitPadding: type === 'split' ? '10' : undefined,
            videoBorderColor: type === 'video' ? '#000000' : undefined,
            videoBorderWidth: type === 'video' ? '0' : undefined,
            videoBorderStyle: type === 'video' ? 'solid' : undefined,
            imgWidth: type === 'images' ? '100' : undefined,
            imgTextAlign: type === 'images' ? "" : undefined,
            imgPadding: type === 'images' ? 10 : undefined,
            imgbg: type === 'images' ? '#0000' : undefined,
            imgBorderColor: type === 'images' ? '#000000' : undefined,
            imgBorderWidth: type === 'images' ? '0' : undefined,
            imgBorderStyle: type === 'images' ? 'solid' : undefined,
            productPadding: type === 'product' ? 10 : undefined,
            productbg: type === 'product' ? '#0000' : undefined,
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
            productbtnbg: type === 'product' ? '#0000' : undefined,
            productradious: type === 'product' ? '3' : undefined,
            productLabel: type === 'product' ? 'Shop Now' : undefined,
            productfontSize: type === 'product' ? '12' : undefined,
            productwidth: type === 'product' ? '80' : undefined,
            productheight: type === 'product' ? '30' : undefined,
            productbackgroundColor: type === 'product' ? '#007BFF' : undefined,
        };
    };

    const addInputField = (type) => {
        let newField;
        if (type === 'images') {
            setShowImagePopup(true);
            setImageFieldId(null);
        } else if (type === 'heading') {
            setShowHeadingPopup(true);

        } else if (type === 'description') {
            setShowDescriptionPopup(true);
        } else if (type === 'divider') {
            toggleColorPicker();
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        }
        else if (type === 'button') {
            togglebtn();
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'socalicon') {
            const newField = createInputField('socalicon');

            setFields((prevFields) => {
                const updatedFields = [...prevFields, newField];
                console.log("Updated fields after adding new field:", updatedFields);

                setSelectedFieldId(newField.id);
                setSelectedIcons(newField.icons || {});
                setCustomIcons(newField.customIcons || []);
                setShowSocialIconPopup(true);

                return updatedFields;
            });
        }
        if (type === 'html convert') {
            const newField = createInputField(type, type === 'html convert' ? '<h1>Your HTML Here</h1>' : '');
            setFields((prevFields) => [...prevFields, newField]);
        }
        if (type === 'split') {
            const splitFields = [
                createInputField('split', '', '50%'),
                createInputField('split', '', '50%'),
            ];
            setFields((prevFields) => [...prevFields, ...splitFields]);
        }
        if (type === 'spacer') {
            const newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        }
        if (type === 'video') {
            const newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
            setShowVideoInput(true);
        }
        if (type === 'product') {
            const newField = createInputField('product');
            setFields((prevFields) => [...prevFields, newField]);
            setLastProductFieldId(newField.id);
            setIsPopupOpen(true);
        }
    };

    const handleFieldClick = (fieldId) => {
        setSelectedFieldId(fieldId);
        setEmailFieldPopup(true);
        setActiveFieldId(fieldId);

    };

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

    const handleToggleIcon = (icon) => {
        setSelectedIcons((prevIcons) => ({
            ...prevIcons,
            [icon]: {
                ...prevIcons[icon],
                isHidden: !prevIcons[icon]?.isHidden,
            },
        }));
    };

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
    };

    const handleCustomIconUrlChange = (e, index) => {
        const newUrl = e.target.value;
        setCustomIcons((prevIcons) =>
            prevIcons.map((icon, i) =>
                i === index ? { ...icon, url: newUrl } : icon
            )
        );
    };

    const toggleCustomIconVisibility = (index) => {
        setCustomIcons((prevIcons) =>
            prevIcons.map((icon, i) =>
                i === index ? { ...icon, isHidden: !icon.isHidden } : icon
            )
        );
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newField = createInputField('images', reader.result);
                if (imageFieldId) {
                    setFields((prevFields) =>
                        prevFields.map((field) =>
                            field.id === imageFieldId ? { ...field, value: reader.result } : field
                        )
                    );
                } else {
                    setFields((prevFields) => [...prevFields, newField]);
                }
                setShowImagePopup(false);
                setImageFieldId(null);
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

                        }
                        : field
                )
            );
        } else {
            const newField = createInputField('heading', headingText);
            newField.headingLevel = headingLevel;
            newField.headingFontSize = headingFontSize;
            newField.headingColor = headingColor;

            setFields((prevFields) => [...prevFields, newField]);
        }

        setShowHeadingPopup(false);
        setHeadingText('');
        setHeadingLevel('h1');
        setHeadingFontSize('16');
        setEmailTemplateId(null);
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
        setEmailTemplateId(null);
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
            .get('http://localhost:4001/get-forms')
            .then((res) => setFormDataAdd(res.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (formDataAdd.length > 0) {
            const formIds = formDataAdd.map((form) => form.formId);
            console.log('All form IDs:', formIds);
        }
    }, [formDataAdd]);

    const handleFormSelect = async (e) => {
        const title = e.target.value.trim();
        const selectedForm = formDataAdd.find((form) => form.title.trim() === title);

        if (selectedForm) {
            try {
                const response = await fetch(`http://localhost:4001/check-form-connected/${selectedForm.formId}`);
                const data = await response.json();

                if (data.isConnected) {
                    alert('This form is already connected to a template.');

                    const confirmUnlink = window.confirm(
                        'Do you want to unlink it?'
                    );

                    if (confirmUnlink) {
                        const unlinkResponse = await fetch(
                            `http://localhost:4001/unlink-template/${selectedForm.formId}`,
                            { method: 'PUT' }
                        );

                        if (unlinkResponse.ok) {
                            alert('Template unlinked from form.');

                            const updatedCheckResponse = await fetch(
                                `http://localhost:4001/check-form-connected/${selectedForm.formId}`
                            );
                            const updatedCheckData = await updatedCheckResponse.json();

                            if (!updatedCheckData.isConnected) {
                                console.log('Form is no longer connected to a template.');
                            }
                        } else {
                            alert('Failed to unlink template.');
                        }
                    } else {
                        return;
                    }
                }

                setSelectedFormIds((prevFormIds) => {
                    if (prevFormIds.includes(selectedForm.formId)) {
                        return prevFormIds.filter((id) => id !== selectedForm.formId);
                    } else {
                        return [...prevFormIds, selectedForm.formId];
                    }
                });

                setSelectedTitles((prevSelectedTitles) => {
                    if (prevSelectedTitles.includes(title)) {
                        return prevSelectedTitles.filter((t) => t !== title);
                    } else {
                        return [...prevSelectedTitles, title];
                    }
                });
            } catch (error) {
                console.error('Error checking or unlinking form connection:', error);
                alert('An error occurred while processing the form connection.');
            }
        }
    };

    useEffect(() => {
        console.log('Selected form IDs:', selectedFormIds);
    }, [selectedFormIds]);


    const createOrUpdateForm = async () => {
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
        const trimmedTitle = formTitle.trim();
        if (!trimmedTitle) {
            alert('Please provide a title for the template.');
            return;
        }

        if (!id) {
            try {
                const response = await axios.get(`http://localhost:4001/check-title/${trimmedTitle}`);
                if (response.data.exists) {
                    alert('A template with this title already exists. Please choose a different title.');
                    return;
                }
            } catch (error) {
                console.error('Error checking title:', error);
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
                    value = field.value || 'No Heading Provided';

                    break;
                case 'description':
                    value = field.value || 'No Description Provided';
                    break;
                case 'socalicon':
                    value = field.icons || 'No Social Icons Provided';
                    break;
                case 'divider':
                    value = field.icons || 'No Social Icons Provided';
                    break;
                case 'button':
                    value = 'Button';
                case 'split':
                    value = field.value || 'No Value Provided';
                    field.splitbg = field.splitbg || '';
                    field.width = field.width || '100%';
                    field.splitPadding = field.splitPadding || 0
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
                case 'product':
                    return {
                        ...field,
                        products: field.products || [],
                        productsPerRow,
                        viewMode,
                        price: showPrice,
                        buttonUrl: field.productUrl || `https://${shop}/admin/products?selectedView=all`,
                        showbtnn: showbtnn

                    };

                default:
                    value = 'No Value Provided';
            }

            if (field.type === 'html convert') {
                return {
                    ...field,
                    value: field.value || '',
                };
            }

            if (field.type === 'button') {
                field.buttonColor = btnbackgroundColor;
                field.label = buttonLabel;
                field.buttonFontSize = fontSize;
                field.buttonWidth = width;
                field.buttonHeight = height;
                field.buttonPadding = padding;

            }

            if (field.type === 'socalicon') {
                field.socalIconHeight = socalIconHeight;
                field.socalIconWidth = socalIconWidth;
                field.icons = {
                    facebook: {
                        url: selectedIcons.facebook?.url || field.icons.facebook.url,
                        isHidden: selectedIcons.facebook?.isHidden || false,
                        value: selectedIcons.facebook?.value || 'Facebook',
                    },
                    twitter: {
                        url: selectedIcons.twitter?.url || field.icons.twitter.url,
                        isHidden: selectedIcons.twitter?.isHidden || false,
                        value: selectedIcons.twitter?.value || 'Twitter',
                    },
                    instagram: {
                        url: selectedIcons.instagram?.url || field.icons.instagram.url,
                        isHidden: selectedIcons.instagram?.isHidden || false,
                        value: selectedIcons.instagram?.value || 'Instagram',
                    },
                    send: {
                        url: selectedIcons.send?.url || '',
                        isHidden: selectedIcons.send?.isHidden || false,
                        value: selectedIcons.send?.value || 'Send',
                    },
                };

                field.customIcons = field.customIcons || [];
            } else {
                field.icons = {};
            }

            return {
                ...field,
                label: field.label || (field.type === 'button' ? 'Button' : `Default Label for ${field.type}`),
                name: field.name || `Field_${field.id}`,
                value: field.type === 'product' ? undefined : value,
                headingLevel: field.headingLevel || null,
                headingFontWeight: field.headingFontWeight || 600,
                headingColor: field.headingColor || '#000',
                headingbg: field.headingbg || '#ffff',
                headingPadding: field.headingPadding || 10,
                headingLetterSpacing: field.headingLetterSpacing || 0,
                headingTextAlign: field.headingTextAlign || '',
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
                dividerWidth: field.dividerWidth || '100',
                dividerheight: field.dividerheight || '1',
                buttonColor: field.buttonColor || '#007BFF',
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
                socaliconTextAlign: field.socaliconTextAlign || '',
                htmlFontSize: field.htmlFontSize || 16,
                htmlPadding: field.htmlPadding || 10,
                htmlColor: field.htmlColor || '#000',
                splitbg: field.splitbg || '',
                width: field.width || '100%',
                spacerHeight: field.spacerHeight || 20,
                spacerbg: field.spacerbg || '#fff',
                videoPadding: field.videoPadding || 20,
                splitPadding: field.splitPadding || 0,
                videoBorderWidth: field.videoBorderWidth || 1,
                videoBorderStyle: field.videoBorderStyle || 'solid',
                videoBorderColor: field.videoBorderColor || '#000',
                imgWidth: field.imgWidth || '100',
                imgTextAlign: field.imgTextAlign || '',
                imgPadding: field.imgPadding || 10,
                imgbg: field.imgbg || '#ffff',
                imgBorderWidth: field.imgBorderWidth || 0,
                imgBorderStyle: field.imgBorderStyle || 'solid',
                imgBorderColor: field.imgBorderColor || '#000',
                productPadding: field.productPadding || 10,
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
                productbtnbg: field.productbtnbg || 600,
                productradious: field.productradious || 0,
                productLabel: field.productLabel || 'Shop Now',
                productfontSize: field.productfontSize || '12',
                productwidth: field.productwidth || 80,
                productheight: field.productheight || 30,
                productbackgroundColor: field.productbackgroundColor || '#007BFF',

            };
        });

        console.log('Updated fields:', updatedFields);

        const formData = {
            templateId,
            form_ids: selectedFormIds.map(id => String(id)),
            title: trimmedTitle,
            fields: updatedFields,
            createdAt: timestamp,
            styles: {
                backgroundImage,
                backgroundColor,
                borderRadious,
                templatePadding,
                textAlign,
                fontFamily,
                width: viewMode === 'desktop' ? '800px' : '400px',
                dividerColor,
            },
        };

        try {
            const response = id
                ? await axios.put(`http://localhost:4001/update/${id}`, formData)
                : await axios.post('http://localhost:4001/send/api', formData);

            const successMessage = id ? 'Form updated successfully' : 'Form created successfully';
            console.log(successMessage, response.data);
            navigate('/app/emailTemplate/list')

            if (!id) {
                resetFormState();
            }

            setExistingTitles(prevTitles => [...prevTitles, trimmedTitle]);
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

    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
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
        if (mode === 'mobile') {
            setProductsPerRow(1);
        } else {
            setProductsPerRow(3);
        }
    };

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
                            value={field.value}
                            onChange={(e) =>
                                setFields((prevFields) =>
                                    prevFields.map((f) => (f.id === field.id ? { ...f, value: e.target.value } : f))
                                )
                            }
                            rows="5"
                            cols="50"
                        />
                    </div>
                );

            default:
                return;
        }
    };


    const handleDescriptionChange = (id, newDescription) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, descriptionText: newDescription } : field
            )
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
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
        setFields((prevFields) => {
            const selectedIndex = prevFields.findIndex((f) => f.id === selectedFieldIded);

            if (selectedIndex !== -1 && selectedIndex % 2 === 0) {

                return prevFields.map((f, index) => {
                    if (index === selectedIndex) {
                        return { ...f, width: newWidth };
                    }
                    if (index === selectedIndex + 1) {
                        return { ...f, width: `${100 - parseInt(newWidth)}%` };
                    }
                    return f;
                });
            } else if (selectedIndex !== -1) {
                return prevFields.map((f, index) => {
                    if (index === selectedIndex) {
                        return { ...f, width: newWidth };
                    }
                    if (index === selectedIndex - 1) {
                        return { ...f, width: `${100 - parseInt(newWidth)}%` };
                    }
                    return f;
                });
            }
            return prevFields;
        });
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

    const handleRemoveProductFromForm = (index) => {
        const productToRemove = productTitles?.[index];

        if (!productToRemove) return;

        setProductTitles((prevTitles) =>
            Array.isArray(prevTitles) ? prevTitles.filter((title, i) => i !== index) : prevTitles
        );

        setSelectedProducts((prevSelectedProducts) =>
            Array.isArray(prevSelectedProducts)
                ? prevSelectedProducts.filter((product) => product.title !== productToRemove)
                : prevSelectedProducts
        );

        setFields((prevFields) =>
            Array.isArray(prevFields)
                ? prevFields.map((field) =>
                    field.type === 'product'
                        ? { ...field, products: field.products.filter((product) => product.title !== productToRemove) }
                        : field
                )
                : prevFields
        );
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null);
    };

    const togglePrice = () => {
        setShowPrice(!showPrice);
    };

    const togglebtnn = () => {
        setShowbtnn(!showbtnn);
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

        const productImages = products.map(product => product.images.length > 0 ? product.images[0].src : null);
        console.log("Product images:", productImages);
        setProductImage(productImages);
    };

    const handleProductsPerRowChange = (e) => {
        setProductsPerRow(parseInt(e.target.value, 6));
    };


    const totalPages = Math.ceil(products.length / formsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const currentProducts = products.slice(
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
            }

            else if (currentPage >= totalPages - 2) {
                visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }

            else {
                visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return visiblePages;
    };


    const handleRemoveBackgroundImage = () => {
        setBackgroundImage('');
    };

    return (
        <div>
            <div className='email-campaing-templates'>
                <div className="builder-container">
                    <h3>Email campaign</h3>

                    <div className='builder_form_name'>
                        <div className='email-template-heading'>
                            <input
                                type="text"
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className='template-select-forms'>
                            <select onChange={handleFormSelect}>
                                <option value="">Select a form</option>
                                {formDataAdd.map((form) => (
                                    <option
                                        key={form.id}
                                        value={form.title}
                                        style={{
                                            color: selectedFormIds.includes(form.formId) ? '#45A7F6' : 'black',
                                        }}
                                    >
                                        {form.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='builder-forms_rapp'>
                        <div className="builder-wrp">
                            <div className="controls-main-wrp email-tempalte">
                                <div className="controls-wrp">
                                    {showField && (<div className="controls">
                                        <div className='builder-form-element'>
                                            <div className='buil_form_texttt'>
                                                <div className='buil_form_texttt_p'>
                                                    <h2> Elements</h2>
                                                </div>
                                            </div>
                                        </div>
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
                                                <div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={heading} alt="" /></span> <span><h4>Heading</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('socalicon')}><span className='form_builder_field_img'><img src={socail} alt="" /></span> <span><h4>Social Icon</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('html convert')}><span className='form_builder_field_img'><img src={htmlicon} alt="" /></span> <span><h4>HTML Block</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('split')}><span className='form_builder_field_img'><img src={spliti} alt="" /></span> <span><h4>Split</h4></span></button></div>
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('spacer')}><span className='form_builder_field_img'><img src={spacer} alt="" /></span> <span><h4>Spacer</h4></span></button></div>
                                                    {/* <div className='builderr_field_wrpp'> <button onClick={() => addInputField('video')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>video</h4></span></button></div> */}
                                                    <div className='builderr_field_wrpp'> <button onClick={() => addInputField('product')}><span className='form_builder_field_img'><img src={product} alt="" /></span> <span><h4>Product</h4></span></button></div></div>
                                            ) : (
                                                <div>
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
                                                                            style={{ marginLeft: '10px', padding: '5px' }}
                                                                        >
                                                                            <option value="Arial">Arial</option>
                                                                            <option value="Verdana">Verdana</option>
                                                                            <option value="Times New Roman">Times New Roman</option>
                                                                            <option value="Georgia">Georgia</option>
                                                                            <option value="Courier New">Courier New</option>
                                                                            <option value="Roboto">Roboto</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='edit_setting_bg bgcolor'>
                                                                        <label>
                                                                            Background Color:
                                                                        </label>
                                                                        <div
                                                                            style={{
                                                                                height: "50px",
                                                                                width: "50px",
                                                                                borderRadius: "50%",
                                                                                backgroundColor: backgroundColor,
                                                                                border: "1px solid #ccc",
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() => document.getElementById('colorInput').click()}
                                                                        >
                                                                        </div>
                                                                        <input
                                                                            id="colorInput"
                                                                            type="color"
                                                                            style={{
                                                                                display: "none"
                                                                            }}
                                                                            value={backgroundColor}
                                                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className='edit_setting_bg'>
                                                                        <label>Border-Radious:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="Border-radious"
                                                                            value={borderRadious}
                                                                            onChange={(e) => setBorderRadious(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label>Padding:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="Padding"
                                                                            value={templatePadding}
                                                                            onChange={(e) => setTemplatePadding(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label htmlFor="textAlign">Text Alignment:</label>
                                                                        <select
                                                                            id="textAlign"
                                                                            value={textAlign}
                                                                            onChange={(e) => setTextAlign(e.target.value)}
                                                                        >
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className='edit_setting_bg'>
                                                                        <label htmlFor="backgroundImage">Background Image:</label>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={handleBackgroundImageUpload}
                                                                        />
                                                                        {backgroundImage && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleRemoveBackgroundImage}
                                                                                style={{
                                                                                    margin: '10px 0',
                                                                                    padding: '5px 10px',
                                                                                    cursor: 'pointer',
                                                                                    background: 'white',
                                                                                    color: 'black',
                                                                                    border: 'none',
                                                                                    borderRadius: '5px',
                                                                                    border: '1px solid rgb(221, 221, 221)'
                                                                                }}
                                                                            >

                                                                                Remove Background
                                                                            </button>
                                                                        )}
                                                                        {backgroundImage && (
                                                                            <div
                                                                                className="edit_setting_bg"
                                                                                style={{
                                                                                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                                                                                    backgroundRepeat: 'no-repeat',
                                                                                    backgroundSize: 'contain',
                                                                                    backgroundPosition: 'center',
                                                                                    height: '200px',
                                                                                    width: '100%',
                                                                                    border: '1px solid #ddd',
                                                                                }}
                                                                            >

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
                                </div>

                                <div className='form_builder_build'>
                                    <div id='bg_change' className="form-builder-wrp email-temp" >
                                        <div className='btn-email-templates'>
                                            <button className={`btn-templates ${(viewMode === 'desktop' || emailWidth === '800px') && emailWidth !== '400px' ? 'active' : ''}`} onClick={() => toggleViewMode('desktop')}>
                                                <img src={desk} alt="Desktop" /> Desktop
                                            </button>
                                            <button className={`btn-templates ${(viewMode === 'mobile' || emailWidth === '400px') && emailWidth !== '800px' ? 'active' : ''}`} onClick={() => toggleViewMode('mobile')}>
                                                <img src={phonem} alt="Mobile" /> Mobile
                                            </button>
                                        </div>

                                        <div
                                            className="form-builder email-template"
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
                                                fontFamily
                                            }}
                                        >
                                            {fields.length === 0 ? (
                                                <div>

                                                    <div className="builder-block-img-forms">
                                                        <div className='builder_block_blank'>
                                                            <img src={emailtemp} alt="Email Template" />
                                                            <div className='builder-block-img-forms-paragraph'>
                                                                <p>Let's create the Email.</p>
                                                            </div>
                                                        </div>
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
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div className='email-input-field'>
                                                                            {React.createElement(HeadingTag, {
                                                                                style: {
                                                                                    fontSize: `${field.headingFontSize}px`,
                                                                                    color: field.headingColor,
                                                                                    backgroundColor: field.headingbg,
                                                                                    padding: `${field.headingPadding}px`,
                                                                                    letterSpacing: `${field.headingLetterSpacing}px`,
                                                                                    textAlign: field.headingTextAlign || '',
                                                                                    fontWeight: field.headingFontWeight,
                                                                                    borderWidth: `${field.headingBorderWidth}px`,
                                                                                    borderStyle: field.headingBorderStyle,
                                                                                    borderColor: field.headingBorderColor

                                                                                }
                                                                            }, field.headingText || field.value)}
                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'description') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <p style={{
                                                                            fontSize: `${field.descritionFontSize}px`,
                                                                            backgroundColor: field.descriptionbg,
                                                                            padding: `${field.descriptionPadding}px`,
                                                                            letterSpacing: `${field.descriptionLetterSpacing}px`,
                                                                            textAlign: field.descriptionTextAlign || '',
                                                                            borderWidth: `${field.descriptionBorderWidth}px`,
                                                                            borderStyle: field.descriptionBorderStyle,
                                                                            borderColor: field.descriptionBorderColor,
                                                                            fontWeight: field.descritionFontWeight,
                                                                            color: field.descritionColor
                                                                        }}>{field.descriptionText || field.value || 'No Description Provided'}</p>
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'images') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div className='email_field-images'
                                                                            style={{
                                                                                width: `${field.imgWidth}%`,
                                                                                textAlign: field.imgTextAlign ? field.imgTextAlign : '',
                                                                                backgroundColor: field.imgbg,
                                                                                padding: `${field.imgPadding}px`,
                                                                                borderWidth: `${field.imgBorderWidth}px`,
                                                                                borderStyle: field.imgBorderStyle,
                                                                                borderColor: field.imgBorderColor,
                                                                            }}>
                                                                            {field.value ? (
                                                                                <img src={field.value} alt="Dynamic" style={{ maxWidth: '100%', height: 'auto' }} />
                                                                            ) : (
                                                                                <p>No Image Provided</p>
                                                                            )}
                                                                        </div>

                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'divider') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <hr style={{
                                                                            border: `1px solid ${field.dividerColor}`, width: `${field.dividerWidth}%`,
                                                                            height: `${field.dividerheight}px`
                                                                        }} />
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'split') {
                                                                const isImageUploaded = field.value && field.value.startsWith('data:image');
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field split-width ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                        style={{
                                                                            width: field.width,
                                                                            backgroundColor: field.splitbg,
                                                                            padding: `${field.splitPadding}px`
                                                                        }}
                                                                    >
                                                                        {!isImageUploaded && (
                                                                            <textarea
                                                                                value={field.value}
                                                                                onClick={() => setSelectedFieldIded(field.id)}
                                                                                onChange={(e) =>
                                                                                    setFields((prevFields) =>
                                                                                        prevFields.map((f) =>
                                                                                            f.id === field.id ? { ...f, value: e.target.value } : f
                                                                                        )
                                                                                    )
                                                                                }
                                                                            />
                                                                        )}
                                                                        {isImageUploaded && (
                                                                            <div>
                                                                                <img
                                                                                    src={field.value}
                                                                                    alt="Uploaded Preview"
                                                                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            if (field.type === 'spacer') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <div className='spacer-height-show' style={{ height: `${field.spacerHeight}px`, backgroundColor: field.spacerbg }}></div>
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );

                                                            }
                                                            if (field.type === 'video') {

                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
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
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'button') {
                                                                return (
                                                                    <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                        className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                        ref={emailFieldRef}
                                                                    >
                                                                        <a href={field.buttonUrll}>
                                                                            <button
                                                                                type="button"
                                                                                style={{
                                                                                    fontSize: `${fontSize}px`,
                                                                                    color: field.buttonTextColor,
                                                                                    backgroundColor: btnbackgroundColor,
                                                                                    width: `${width}px`,
                                                                                    height: `${height}px`,
                                                                                    padding: `${padding}px`,
                                                                                    borderWidth: `${field.buttonBorderWidth}px`,
                                                                                    borderStyle: field.buttonBorderStyle,
                                                                                    borderColor: field.buttonBorderColor,
                                                                                    letterSpacing: `${field.buttonLetterSpacing}px`,
                                                                                    borderRadius: `${field.buttonradious}px`
                                                                                }}
                                                                            >
                                                                                {buttonLabel}
                                                                            </button>
                                                                        </a>
                                                                        <div className='form-builder-radio-btn email'>
                                                                            <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                <img src={delete1} alt="delete" />
                                                                            </button>
                                                                            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                <img src={maximizesize} alt="copy" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'html convert') {
                                                                return (
                                                                    <div className="form-builder-and-preview">
                                                                        <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                            className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                            ref={emailFieldRef}
                                                                        >
                                                                            <div>
                                                                                <div style={{ color: field.htmlColor, fontSize: `${field.htmlFontSize}px`, padding: `${field.htmlPadding}px` }}
                                                                                    className="preview-content"
                                                                                    dangerouslySetInnerHTML={{ __html: field.value }}
                                                                                />
                                                                                <div className='form-builder-radio-btn email'>
                                                                                    <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                        <img src={delete1} alt="delete" />
                                                                                    </button>
                                                                                    <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                        <img src={maximizesize} alt="copy" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === 'product' && field.products) {
                                                                return (
                                                                    <div onClick={() => handleAddProductToSelected(field.id, field.title, field.image, field.products)}>
                                                                        <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                            className={`email_field ${activeFieldId === field.id ? 'active' : ''}`}
                                                                            ref={emailFieldRef}
                                                                        >
                                                                            <div className={`template-products ${productsPerRow ? `row-${productsPerRow}` : 'row-3'} ${viewMode === 'mobile' ? 'mobile' : ''}`}
                                                                                style={{
                                                                                    padding: `${field.productPadding}px`,
                                                                                    backgroundColor: field.productbg,
                                                                                    borderWidth: `${field.productBorderWidth}px`,
                                                                                    borderStyle: field.productBorderStyle,
                                                                                    borderColor: field.productBorderColor,
                                                                                    fontSize: `${field.productFontSize}px`,
                                                                                    color: field.productTextColor,

                                                                                }}
                                                                            >
                                                                                {field.products.map((product) => (
                                                                                    <div className='product-show' key={product.id}>

                                                                                        {product.images && product.images.length > 0 && (
                                                                                            <div className="images-gallery">
                                                                                                <img
                                                                                                    src={product.images[0].src}
                                                                                                    alt={product.images[0].alt || 'Product Image'}
                                                                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                                                                />
                                                                                            </div>
                                                                                        )}
                                                                                        <div>
                                                                                            <h4 style={{ letterSpacing: `${field.productLetterSpacing}px`, fontWeight: field.productWeight, }}>{product.title}</h4>
                                                                                            {showPrice && product.variants && product.variants.length > 0 && (
                                                                                                <p style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}> ${product.variants[0].price}</p>
                                                                                            )}
                                                                                        </div>

                                                                                        {showbtnn && (
                                                                                            <a href={`https://${shop}/admin/products?selectedView=all`} target="_blank" rel="noopener noreferrer">
                                                                                                <button
                                                                                                    style={{
                                                                                                        fontSize: `${field.productfontSize}px`,
                                                                                                        width: `${field.productwidth}px`,
                                                                                                        height: `${field.productheight}px`,
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
                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => addInputField(field.type)}>
                                                                                    <img src={maximizesize} alt="copy" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            if (field.type === 'socalicon') {
                                                                return (
                                                                    <div onClick={() => handleEdit(field)}>
                                                                        <div key={field.id} onClick={() => handleFieldClick(field.id)}
                                                                            className={`email_field  ${activeFieldId === field.id ? 'active' : ''}`}
                                                                            ref={emailFieldRef}

                                                                        >
                                                                            <div style={{ textAlign: field.socaliconTextAlign || '', padding: `${field.socalIconPadding}px` }} >
                                                                                <div className="social-icons" >
                                                                                    {field.icons.facebook && field.icons.facebook.url && !field.icons.facebook.isHidden && (
                                                                                        <a href={field.icons.facebook.url}>
                                                                                            <img src={facebook} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.icons.twitter && field.icons.twitter.url && !field.icons.twitter.isHidden && (
                                                                                        <a href={field.icons.twitter.url}>
                                                                                            <img src={twitter} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.icons.instagram && field.icons.instagram.url && !field.icons.instagram.isHidden && (
                                                                                        <a href={field.icons.instagram.url}>
                                                                                            <img src={instagram} alt="" style={{ width: `${socalIconWidth}px`, height: `${socalIconHeight}px` }} />
                                                                                        </a>
                                                                                    )}
                                                                                    {field.customIcons.map((icon, index) =>
                                                                                        icon.url && !icon.isHidden ? (
                                                                                            <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={icon.src} alt={`Custom Icon ${index}`} style={{ width: `${socalIconWidth}px`, }} />
                                                                                            </a>
                                                                                        ) : null
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className='form-builder-radio-btn email'>
                                                                                <button className='remove-btn' onClick={() => removeField(field.id)}>
                                                                                    <img src={delete1} alt="delete" />
                                                                                </button>
                                                                                <button className="copy-btn" onClick={() => addInputField(field.type)}>
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

                                <div className='email-template-input-setting'>
                                    {emailFieldPopup && (<div className='form-builder-change-propertites' ref={popupRef}>
                                        <div className='form-builder-change_show_all'>
                                            <div className='form_qucik'>
                                                <p>Quick setup Settings</p>
                                            </div>
                                            <div className='form_build_propertities'>

                                                {fields.length > 0 && selectedFieldId && (
                                                    <div className='quick-setup-settings'>
                                                        {fields.map((field) => {
                                                            if (field.id === selectedFieldId && field.type === 'product') {
                                                                return (
                                                                    <div>

                                                                        <div>
                                                                            <div className="show-select-product">
                                                                                <h3>Products</h3>
                                                                                {productTitles.length > 0 ? (
                                                                                    productTitles.map((title, index) => (
                                                                                        <div className='show-product-details' key={index}>
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
                                                                                                <img src={deletep} alt="" style={{ width: '70%' }} />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <p>No products selected</p>
                                                                                )}

                                                                                <button className='product-btn-addproduct' onClick={AddProduct}>Add Product</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='product-detalis-all'>
                                                                            <h3>Product details</h3>
                                                                            <label className="custom-checkbox">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={showPrice}
                                                                                    onChange={togglePrice}
                                                                                />
                                                                                Price
                                                                            </label>
                                                                            <label className="custom-checkbox">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={showbtnn}
                                                                                    onChange={togglebtnn}
                                                                                />
                                                                                Button
                                                                            </label>
                                                                        </div>
                                                                        <div className="product-detalis-all">
                                                                            <h3>Product layout</h3>
                                                                            <div className='form-builder-chaneging-wrap select'>
                                                                                <select onChange={handleProductsPerRowChange} defaultValue={3}>
                                                                                    {[...Array(6).keys()].map(i => (
                                                                                        <option key={i + 1} value={i + 1}>{i + 1} per row</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                        </div>
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
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Background Color</label>
                                                                            <input
                                                                                type="color"
                                                                                value={field.productbg || '#ffffff'}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, productbg: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Border Color</label>
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
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Color</label>
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
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Font-Weight</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.productWeight}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, productWeight: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}

                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Letter Spacing</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.productLetterSpacing}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, productLetterSpacing: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                                placeholder="Letter Spacing"
                                                                            />
                                                                        </div>
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
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label>Background Color</label>
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
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label>Border Color</label>
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
                                                                                </select>
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap color'>
                                                                                <label>Color</label>
                                                                                <input
                                                                                    type="color"
                                                                                    value={field.productbtnbg || '#ffffff'}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, productbtnbg: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Border-Radious</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={field.productradious || '#ffffff'}
                                                                                    onChange={(e) => {
                                                                                        setFields(prevFields =>
                                                                                            prevFields.map(f =>
                                                                                                f.id === field.id ? { ...f, productradious: e.target.value } : f
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            }
                                                            if (field.id === selectedFieldId && field.type === 'heading') {
                                                                return (
                                                                    <div key={field.id}>
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
                                                                        <div className='form-builder-chaneging-wrap number'>
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
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Color</label>
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
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Background Color</label>
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
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Letter Spacing</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.headingLetterSpacing}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, headingLetterSpacing: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                                placeholder="Letter Spacing"
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
                                                                                <option value="left">left</option>
                                                                                <option value="center">center</option>
                                                                                <option value="right">right</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Font-Weight</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.headingFontWeight}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, headingFontWeight: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}

                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Border Color</label>
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
                                                                            </select>
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
                                                                            value={field.descriptionText || field.value || 'No Description Provided'}
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
                                                                        <div className='form-builder-chaneging-wrap number'>
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
                                                                        </div>
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
                                                                                <option value="left">left</option>
                                                                                <option value="center">center</option>
                                                                                <option value="right">right</option>
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
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                );
                                                            }
                                                            if (field.id === selectedFieldId && field.type === "images") {
                                                                return (
                                                                    <div key={field.id} className="form-builder-chaneging-wrap file">
                                                                        <div>
                                                                            {field.value ? (
                                                                                <img src={field.value} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                                                                            ) : (
                                                                                <p>No Image Provided</p>
                                                                            )}
                                                                        </div>
                                                                        <button className='update-image' onClick={() => setImageFieldId(field.id)}>Update Image</button>
                                                                        <button className='update-image' onClick={() => removeField(field.id)}>Remove Image</button>
                                                                        {imageFieldId === field.id && (
                                                                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field.id)} />
                                                                        )}
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Width</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.imgWidth}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, imgWidth: e.target.value } : f
                                                                                        )
                                                                                    );
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
                                                                                <option value="left">left</option>
                                                                                <option value="center">center</option>
                                                                                <option value="right">right</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Background Color</label>
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
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Border Color</label>
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

                                                                        <div className='form-builder-chaneging-wrap number' >
                                                                            <label>Border Width (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.imgBorderWidth}
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
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (field.id === selectedFieldId && field.type === "divider") {
                                                                return (
                                                                    <div key={field.id} className="form-builder-chaneging-wrap">
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Divider Color</label>
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
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Width</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.dividerWidth}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, dividerWidth: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
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
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }
                                                            if (field.id === selectedFieldId && field.type === "html convert") {
                                                                return (
                                                                    <div key={field.id} className="form-builder-chaneging-wrap color">
                                                                        <label>Html Convert</label>
                                                                        <div className="form-builder-and-preview">
                                                                            {fields.map((field) => renderField(field))}

                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Color</label>
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
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }
                                                            if (field.id === selectedFieldId && field.type === "split") {
                                                                return (
                                                                    <div key={field.id} className="form-builder-chaneging-wrap color">
                                                                        <div style={{ marginTop: '20px' }}>
                                                                            <label htmlFor="widthSelect">Adjust Width: </label>
                                                                            <select
                                                                                id="widthSelect"
                                                                                onChange={(e) => handleWidthChange(e.target.value)}
                                                                                value={fields.find((f) => f.id === selectedFieldId)?.width || '50%'}
                                                                            >
                                                                                <option value="25%">25%</option>
                                                                                <option value="50%">50%</option>
                                                                                <option value="75%">75%</option>
                                                                            </select>

                                                                            <div style={{ marginTop: '10px' }}>
                                                                                <label htmlFor="contentType">Content Type: </label>
                                                                                <select
                                                                                    id="contentType"
                                                                                    onChange={(e) =>
                                                                                        setFields((prevFields) =>
                                                                                            prevFields.map((f) =>
                                                                                                f.id === selectedFieldId ? { ...f, contentType: e.target.value } : f
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                    value={fields.find((f) => f.id === selectedFieldId)?.contentType || 'text'}
                                                                                >

                                                                                    <option value="text">Text</option>
                                                                                    <option value="image">Image</option>
                                                                                </select>
                                                                            </div>

                                                                            <div style={{ marginTop: '10px' }}>
                                                                                {fields.find((f) => f.id === selectedFieldId)?.contentType === 'text' ? (
                                                                                    <textarea
                                                                                        rows="4"
                                                                                        cols="30"
                                                                                        placeholder="Enter your text here"
                                                                                        value={fields.find((f) => f.id === selectedFieldId)?.value || ''}
                                                                                        onChange={(e) =>
                                                                                            setFields((prevFields) =>
                                                                                                prevFields.map((f) =>
                                                                                                    f.id === selectedFieldId ? { ...f, value: e.target.value } : f
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                    />

                                                                                ) : (
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        onChange={(e) => {
                                                                                            const file = e.target.files[0];
                                                                                            if (file) {
                                                                                                const reader = new FileReader();
                                                                                                reader.onload = () => {
                                                                                                    setFields((prevFields) =>
                                                                                                        prevFields.map((f) =>
                                                                                                            f.id === selectedFieldIded
                                                                                                                ? { ...f, value: reader.result }
                                                                                                                : f
                                                                                                        )
                                                                                                    );
                                                                                                };
                                                                                                reader.readAsDataURL(file);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label> Background color</label>
                                                                            <input
                                                                                type="color"
                                                                                value={field.splitbg}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, splitbg: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Padding</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.splitPadding}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, splitPadding: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            />
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
                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }

                                                            if (field.id === selectedFieldId && field.type === "spacer") {
                                                                return (
                                                                    <div key={field.id} className="form-builder-chaneging-wrap number">
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
                                                                            <label> Spacer Background color</label>
                                                                            <input
                                                                                type="color"
                                                                                value={field.spacerbg}
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
                                                                );
                                                            }

                                                            if (field.id === selectedFieldId && field.type === 'button') {
                                                                return (
                                                                    <div key={field.id}>
                                                                        <div className='form-builder-chaneging-wrap'>
                                                                            <label>Button Label</label>
                                                                            <input
                                                                                type="text"
                                                                                value={buttonLabel}
                                                                                onChange={(e) => setButtonLabel(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Font Size (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={fontSize}
                                                                                onChange={(e) => setFontSize(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap'>
                                                                            <label>Button Padding (px)</label>
                                                                            <input
                                                                                type="text"
                                                                                value={padding}
                                                                                onChange={(e) => setPadding(e.target.value)}
                                                                            />
                                                                        </div>

                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Width (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={width}
                                                                                onChange={(e) => setWidth(e.target.value)}
                                                                            />
                                                                        </div>

                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Height (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={height}
                                                                                onChange={(e) => setHeight(e.target.value)}
                                                                            />
                                                                        </div>

                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Background Color</label>
                                                                            <input
                                                                                type="color"
                                                                                value={btnbackgroundColor}
                                                                                onChange={(e) => setBtnBackgroundColor(e.target.value)}
                                                                            />
                                                                        </div>

                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Color</label>
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
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Letter Spacing</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.buttonLetterSpacing}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, buttonLetterSpacing: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                                placeholder="Letter Spacing"
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label> Border-Radious</label>
                                                                            <input
                                                                                type="number"
                                                                                value={field.buttonradious}
                                                                                onChange={(e) => {
                                                                                    setFields(prevFields =>
                                                                                        prevFields.map(f =>
                                                                                            f.id === field.id ? { ...f, buttonradious: e.target.value } : f
                                                                                        )
                                                                                    );
                                                                                }}
                                                                                placeholder=" Border-Radious"
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap color'>
                                                                            <label>Border Color</label>
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
                                                                            </select>
                                                                        </div>

                                                                    </div>
                                                                );
                                                            }
                                                            if (field.type === "socalicon" && field.id === selectedFieldId) {
                                                                return (
                                                                    <div key={field.id} className="description-field">

                                                                        <div className="form-builder-chaneging-wrap">
                                                                            <h2>Edit Social Icons</h2>

                                                                            <div className='form-builder-chaneging-wrap'>
                                                                                <label>
                                                                                    <div className='custom-checkbox socalicons'>
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={!selectedIcons.facebook.isHidden}
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
                                                                                <button onClick={() => setShowFileUpload((prev) => !prev)}> + </button>
                                                                                {showFileUpload && (
                                                                                    <div className='form-builder-chaneging-wrap file'>
                                                                                        <input
                                                                                            type="file"
                                                                                            accept="image/*"
                                                                                            onChange={handleCustomIconUpload}
                                                                                            multiple
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                                {customIcons.length > 0 && (
                                                                                    <div>
                                                                                        {customIcons.map((icon, index) => (
                                                                                            <div key={index} className='form-builder-chaneging-wrap  '>
                                                                                                <div className='form-builder-chaneging-wrap socal'>
                                                                                                    <div className='custom-checkbox'>
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            checked={!icon.isHidden}
                                                                                                            onChange={() => toggleCustomIconVisibility(index)}
                                                                                                        />

                                                                                                    </div>
                                                                                                    <div className='img-socal-costom'>
                                                                                                        <img src={icon.src} alt={icon.name} style={{ width: "100%" }} />
                                                                                                    </div>
                                                                                                </div>

                                                                                                <input
                                                                                                    type="text"
                                                                                                    value={icon.url}
                                                                                                    onChange={(e) => handleCustomIconUrlChange(e, index)}
                                                                                                    placeholder="Custom URL"
                                                                                                />

                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Social Icon Height (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={socalIconHeight}
                                                                                onChange={(e) => setSocalIconHeight(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className='form-builder-chaneging-wrap number'>
                                                                            <label>Social Icon Width (px)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={socalIconWidth}
                                                                                onChange={(e) => setSocalIconWidth(e.target.value)}
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
                                                                                <option value="left">left</option>
                                                                                <option value="center">center</option>
                                                                                <option value="right">right</option>
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
                                                                            />
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
                            </div>
                        </div>
                    </div>
                    <div className='btn_form_bulider'>
                        <div className="form-submission-wrp">
                            <button className="cancle-form-btn" >Cancle</button>
                        </div>
                        <div className="form-submission-wrp">
                            <button className="create-form-btn action_btn" onClick={createOrUpdateForm} >Save</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='form-builder-wrap-popup-inputs'>
                <div className="form-builder-prodcut-all">
                    {isPopupOpen && (
                        <div className="popup">
                            <div className="popup-content">
                                <button className="heading_cancle" onClick={handleClosePopup}>
                                    Close
                                </button>
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
                                                    <div>
                                                        {product.images && product.images.length > 0 && (
                                                            <div className="images-gallery">
                                                                <img
                                                                    src={product.images[0].src}
                                                                    alt={product.images[0].alt || 'Product Image'}

                                                                />
                                                            </div>
                                                        )}
                                                        <h6>{product.title}</h6>
                                                        {product.variants && product.variants.length > 0 && (
                                                            <p>Price: ${product.variants[0].price}</p>
                                                        )}
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
                {showImagePopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Upload Image</h3>
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            <button onClick={() => setShowImagePopup(false)}>Close</button>
                        </div>
                    </div>
                )}

                {showHeadingPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h4>Select Heading Level</h4>
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
            </div>

        </div>
    );
};

export default EmailTemplateCreate;

