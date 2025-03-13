import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from '@remix-run/react';
import { Navigate, useLocation } from 'react-router-dom';
import '../index.css';
import text from '../images/text0.png';
import heading from '../images/heading0.png';
import font from '../images/font-size0.png';
import radio from '../images/radio-button0.png';
import checkbox from '../images/checked-box0.png';
import selection from '../images/select.png';
import text1 from '../images/text10.png';
import upload from '../images/upload0.png';
import remove from '../images/remove.png';
import number from '../images/number-input0.png';
import phone from '../images/phone0.png';
import email from '../images/email0.png';
import location1 from '../images/location0.png';
import password1 from '../images/password10.png';
import toggle from '../images/toggle0.png';
import url1 from '../images/url10.png';
import date from '../images/date0.png';
import slider from '../images/slider0.png';
import multifile12 from '../images/11.png';
import multifile1 from '../images/multifile1.png';
import image from '../images/image-0.png';
import link1 from '../images/link10.png';
import time from '../images/time0.png';
import detetime from '../images/time0.png';
import divider2 from '../images/divider0.png';
import btn from '../images/btn0.png';
import drop from '../images/slideicon.png';
import bgim1 from '../images/bgim1.png';
import removee from '../images/removee.png';
import delete1 from '../images/delete1.png';
import maximizesize from '../images/maximize-size1.png';
import vecter1 from '../images/vecter1.png';
import cancleimg from '../images/cancleimg.png';
import bk from '../images/bk.png';
import file from '../images/file.png';
import single from '../images/multi.png';
import multi from '../images/single.png';
import editicon from '../images/editicon.png';
import singleimage from '../images/singleimage.png';
import singlefile from '../images/singlefile.png';
import singleimage0 from '../images/singleimage0.png';
import singleimage1 from '../images/singleimage1.png';
import multiimg from '../images/multiimg.png';
import multiimg1 from '../images/mulitimages.png';
import star from '../images/star1.png';
import edit from '../images/edit.png';
import brandlogos from '../images/brandlogos.png';


import 'react-quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);

    const shop = session?.shop || null;
    const accessToken = session?.accessToken || null;

    if (!shop || !accessToken) {
        console.error("Error: Missing shop or access token in session.");
        return {
            assets: [],
            shop: null,
            apiUrl: process.env.PUBLIC_REACT_APP_API_URL,
            shopData: null,
            error: true,
            accessToken: null,
            errorMessage: "Missing shop or access token in session.",
        };
    }

    const response = {
        assets: [],
        shop,
        apiUrl: process.env.PUBLIC_REACT_APP_API_URL,
        shopData: null,
        error: false,
        accessToken,
        errorMessage: ''
    };

    console.log("Shop:", shop);

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

        const shopQuery = `
        {
          shop {
            name
            email
            myshopifyDomain
            primaryDomain {
              host
            }
          }
        }`;

        const shopResponse = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: shopQuery }),
        });

        if (!shopResponse.ok) {
            const errorText = await shopResponse.text();
            throw new Error(`Failed to fetch shop data: ${errorText}`);
        }

        const shopData = await shopResponse.json();
        response.shopData = shopData.data.shop;

        console.log("Shop Data-all pages:", response.shopData);

    } catch (err) {
        console.error("Error fetching data:", err.message);
        response.error = true;
        response.errorMessage = err.message;
    }

    return response;
};

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

const Formgenerated = () => {

    const ConfirmationPopup = ({ isVisible, onClose, onConfirm }) => {
        if (!isVisible) return null;

        return (
            <div className="confirmation-popup">
                <div className="confirmation-popup-content">
                    <h4>Choose Form Status</h4>
                    <p>Do you want to save this form as a draft or publish it live?</p>
                    <div className="confirmation-popup-actions">
                        <button className='save_form' onClick={() => onConfirm('draft')}>Save as Draft</button>
                        <button onClick={() => onConfirm('live')}>Publish</button>
                        <button className='heading_cancle' onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const CancelPopup = ({ isVisible, onClose, onConfirm }) => {
        const navigator = useNavigate();

        if (!isVisible) return null;
        const onConfirmto = () => {
            navigator('/app/forms/list');
        };

        return (
            <div className="confirmation-popup">
                <div className="confirmation-popup-content">
                    <h4>Choose Form Status</h4>
                    <p> Are you sure you want to cancel this form</p>
                    <div className="confirmation-popup-actions">
                        <button className='save_form' onClick={() => onConfirm('draft')}>Save as Draft</button>
                        <button onClick={onConfirmto}>Yes</button>
                        <button className='heading_cancle' onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        );
    };

    const navigator = useNavigate();
    const location = useLocation();
    const [fields, setFields] = useState([]);
    const [formTitle, setFormTitle] = useState('My Form');
    const [showFormBuilder, setShowFormBuilder] = useState(false);
    const [createdForms, setCreatedForms] = useState([]);
    const [view, setView] = useState('live');
    const [currentFormId, setCurrentFormId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingFormId, setEditingFormId] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [boxShadow, setBoxShadow] = useState('');
    const [formWidth, setFormWidth] = useState('1200px');
    const [padding, setPadding] = useState('20');
    const [borderRadius, setBorderRadius] = useState('0');
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderColorcode, setBorderColorcode] = useState('#ffffff');
    const formRef = useRef(null);
    const [isFieldEnabled, setIsFieldEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSelectPopup, setShowSelectPopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [confirmationPopupType, setConfirmationPopupType] = useState('');
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [radioOptions, setRadioOptions] = useState([
        { id: generateUniqueId(), label: 'Radio 1', value: 'Radio 1' },
        { id: generateUniqueId(), label: 'Radio 2', value: 'Radio 2' },
    ]);
    const [checkboxOptions, setCheckboxOptions] = useState([{ id: generateUniqueId(), name: 'Checkbox1' }, { id: generateUniqueId(), name: 'Checkbox2' }]);
    const [selectOptions, setSelectOptions] = useState([{ id: generateUniqueId(), name: 'Option1' }, { id: generateUniqueId(), name: 'Option2' }]);
    const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
    const [headingLevel, setHeadingLevel] = useState('h1');
    const [headingText, setHeadingText] = useState('');
    const [showHeadingPopup, setShowHeadingPopup] = useState(false);
    const [editingHeadingId, setEditingHeadingId] = useState(null);
    const [descriptionText, setDescriptionText] = useState('');
    const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
    const [editingDescriptionId, setEditingDescriptionId] = useState(null);
    const [showFields, setShowFields] = useState(true);
    const [hoveredFieldId, setHoveredFieldId] = useState(null);
    const [showField, setShowField] = useState(true);
    const propertiesPanelRef = useRef(null);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [headingFontSize, setHeadingFontSize] = useState('40px');
    const [isPropertiesVisible, setIsPropertiesVisible] = useState(false);
    const [editedFieldIndex, setEditedFieldIndex] = useState(null);
    const [currentEditingFieldIndex, setCurrentEditingFieldIndex] = useState(null);
    const [activeFieldIndex, setActiveFieldIndex] = useState(null);
    const [border, setBorder] = useState('none');
    const [borderWidth, setBorderWidth] = useState('0px');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [isFormBuilderVisible, setIsFormBuilderVisible] = useState(false);
    const [submissionOption, setSubmissionOption] = useState('Thank you! Your submission has been received successfully');
    const [thankYouTimer, setThankYouTimer] = useState('5');
    const [editorValue, setEditorValue] = useState('Thank you! Your submission has been received successfully.');
    const [url, setUrl] = useState('');
    const [ReactQuill, setReactQuill] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const { shop, apiUrl, shopData } = useLoaderData() || {};
    const [showFieldInput, setShowFieldInput] = useState(false);
    const [showFieldPro, setShowFieldPro] = useState(false);
    const [inputRadious, setInputRadious] = useState('4');
    const [inputwidth, setInputWidth] = useState('1');
    const [inputborderColor, setInputBorderColor] = useState('#B5B7C0');
    const [inputBgColor, setInputBgColor] = useState('Transparent');
    const [inputColorcode, setInputColorcode] = useState('#B5B7C0');
    const [inputstyle, setInputStyle] = useState('solid');
    const [labelColor, setLableColor] = useState('#000');
    const [lableCode, setLableCode] = useState('#ffffff');
    const [inputGap, setInputGap] = useState('0')
    const [colorCode, setColorCode] = useState('#ffffff');
    const [opacityForm, setOpacityForm] = useState('1');
    const [textHeading, setTextHeading] = useState('');
    const [colorHeading, setColorHeading] = useState('#000');
    const [colorHeadingcode, setColorHeadingcode] = useState('#000');
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [enabledFields, setEnabledFields] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedimage, setSelectedimage] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const [sliderValue, setSliderValue] = useState(1);
    const [subject, setSubject] = useState('');
    const [passwordStatus, setPasswordStatus] = useState("off");
    const [fileOptions, setFileOptions] = useState({});
    const [multiOptions, setMultiOptions] = useState({});
    const [imageOptions, setImageOptions] = useState({});
    const [multiimagesOptions, setMultiimagesOptions] = useState({});
    const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
    const [ImagePreview, setImagePreview] = useState({});
    const [multifilePreview, setMultifilePreview] = useState({});
    const [signlePreview, setSignlePreview] = useState('off');
    const [multiIamgePreview, setMultiIamgePreview] = useState('off');
    const [upgradePopup, setUphradePopup] = useState(false);
    const [activeBrand, setActiveBrand] = useState('');
    const [marginForm, setMarginForm] = useState('60');
    const [linkaline, setLinkaline] = useState('');
    const [linkTarget, setLinkTarget] = useState('_self');
    const [passwordpopop, setPasswordpopup] = useState(false);

    const shopName = shopData.name;

    const handleToggleImagePreview = (fieldId) => {
        setImagePreview((prevState) => ({
            ...prevState,
            [fieldId]: prevState[fieldId] === 'on' ? 'off' : 'on',
        }));
    };

    const handleToggleMiltiPreview = (fieldId) => {
        setMultifilePreview((prevState) => ({
            ...prevState,
            [fieldId]: prevState[fieldId] === 'on' ? 'off' : 'on',
        }));
    };

    const handleToggleSinglePreview = (fieldId) => {
        setSignlePreview((prevState) => ({
            ...prevState,
            [fieldId]: prevState[fieldId] === 'on' ? 'off' : 'on',
        }));
    };

    const handleToggleMultiPreview = (fieldId) => {
        setMultiIamgePreview((prevState) => ({
            ...prevState,
            [fieldId]: prevState[fieldId] === 'on' ? 'off' : 'on',
        }));
    };


    const handleMultiImagesOptionChange = (fieldId, option) => {
        setMultiimagesOptions(prevState => {
            const newState = {
                ...prevState,
                [fieldId]: option,
            };

            return newState;
        });
    };

    const handleFileOptionChange = (fieldId, option) => {
        setFileOptions(prevState => {
            const newState = {
                ...prevState,
                [fieldId]: option,
            };

            return newState;
        });
    };

    const handleMultiOptionChange = (fieldId, option) => {
        setMultiOptions(prevState => {
            const newState = {
                ...prevState,
                [fieldId]: option,
            };

            return newState;
        });
    };

    const handleImageOptionChange = (fieldId, option) => {
        setImageOptions(prevState => {
            const newState = {
                ...prevState,
                [fieldId]: option,
            };

            return newState;
        });
    };

    useEffect(() => {
        setMultiimagesOptions((prevState) => {
            const updatedState = { ...prevState };

            fields.forEach(field => {
                if (field.type === 'multi-image' && !updatedState[field.id]) {
                    updatedState[field.id] = 'option1';
                }
            });

            return updatedState;
        });
    }, [fields]);

    useEffect(() => {
        setImageOptions((prevState) => {
            const updatedState = { ...prevState };

            fields.forEach(field => {
                if (field.type === 'images' && !updatedState[field.id]) {
                    updatedState[field.id] = 'option1';
                }
            });

            return updatedState;
        });
    }, [fields]);

    useEffect(() => {
        setFileOptions((prevState) => {
            const updatedState = { ...prevState };

            fields.forEach(field => {
                if (field.type === 'file' && !updatedState[field.id]) {
                    updatedState[field.id] = 'option1';
                }
            });

            return updatedState;
        });
    }, [fields]);

    useEffect(() => {
        setMultiOptions((prevState) => {
            const updatedState = { ...prevState };

            fields.forEach(field => {
                if (field.type === 'multi-file' && !updatedState[field.id]) {
                    updatedState[field.id] = 'option1';
                }
            });

            return updatedState;
        });
    }, [fields]);

    useEffect(() => {

        const loadReactQuill = async () => {
            const { default: Quill } = await import('react-quill');
            setReactQuill(() => Quill);
        };

        loadReactQuill();
    }, []);

    useEffect(() => {
        const formBuilder = document.getElementById('bg_change');
        const backgroundDiv = document.getElementById('bg_change_background');
        const builderBlockBlank = document.querySelector('.builder_block_blank');

        if (formBuilder) {
            formBuilder.style.width = formWidth;
            formBuilder.style.padding = `${padding}px`;
            formBuilder.style.margin = ` ${marginForm}px 0`;

        }

        if (backgroundDiv) {
            const borderWidthWithUnit = /^\d+$/.test(borderWidth) ? `${borderWidth}px` : borderWidth;
            backgroundDiv.style.backgroundColor = backgroundColor;
            backgroundDiv.style.backgroundImage = imageFile ? `url(${imageFile})` : (backgroundImage ? `url(${backgroundImage})` : 'none');
            backgroundDiv.style.backgroundSize = 'cover';
            backgroundDiv.style.backgroundRepeat = 'no-repeat';
            backgroundDiv.style.backgroundPosition = 'center';
            backgroundDiv.style.opacity = opacityForm;

            backgroundDiv.style.position = 'absolute';
            backgroundDiv.style.top = 0;
            backgroundDiv.style.left = 0;
            backgroundDiv.style.right = 0;
            backgroundDiv.style.bottom = 0;
            backgroundDiv.style.backgroundColor = backgroundColor;

            backgroundDiv.style.borderRadius = `${borderRadius}px`;
            backgroundDiv.style.boxShadow = boxShadow;

            if (/^\d+px$/.test(borderWidth)) {
                backgroundDiv.style.border = `${borderWidthWithUnit} ${borderStyle} ${borderColor}`;
            } else {
                backgroundDiv.style.border = 'none';
            }

        }

        if (builderBlockBlank) {
            if (backgroundColor || imageFile || backgroundImage) {
                builderBlockBlank.style.display = 'none';
            } else {
                builderBlockBlank.style.display = 'block';
            }
        }

    }, [backgroundColor, imageFile, opacityForm, backgroundImage, borderWidth, borderStyle, borderColor, formWidth, marginForm, padding, borderRadius, boxShadow, fields.length]);

    useEffect(() => {
        const formBuilder = document.getElementById('bg_image');
        if (formBuilder) {
            formBuilder.style.backgroundImage = imageFile ? `url(${imageFile})` : backgroundImage || 'none';
        }

    }, []);


    useEffect(() => {
        if (location.state) {
            const { formTitle, fields, formId, styles, toggleStatus, url, editorValue, thankYouTimer } = location.state;
            setFormTitle(formTitle);
            setUrl(url);
            setFields(fields);
            setEditingFormId(formId);
            setIsEditing(true);
            setBackgroundColor(styles.backgroundColor);
            setBackgroundImage(styles.backgroundImage);
            setBoxShadow(styles.boxShadow || '');
            setFormWidth(styles.width || '1200px');
            setPadding(styles.padding || '20px');
            setMarginForm(styles.marginForm || '60');
            setBorderRadius(styles.borderRadius || '0');
            setBorder(styles.border || '1px');
            const borderWidthValue = styles.border ? styles.border.split(' ')[0] : '1px';
            const borderStyleValue = styles.border ? styles.border.split(' ')[1] : 'solid';
            const borderColorValue = styles.border ? styles.border.split(' ')[2] : '#ffffff';
            setBorderWidth(styles.borderWidth || '1px');
            setBorderStyle(styles.borderStyle || 'solid');
            setBorderColor(styles.borderColor || '#ffffff');
            setInputRadious(styles.inputRadious);
            setInputStyle(styles.inputstyle);
            setInputWidth(styles.inputwidth);
            setInputBorderColor(styles.inputborderColor);
            setInputBgColor(styles.inputBgColor);
            setLableColor(styles.labelColor);
            setInputGap(styles.inputGap);
            setOpacityForm(styles.opacityForm);
            if (fields && fields.length > 0) {
                const linkField = fields.find(field => field.type === 'link');
                if (linkField) {
                    setLinkaline(linkField.linkaline || 'left');
                    setLinkTarget(linkField.linkTarget || '_self');
                }
            }
            setImageFile(styles.backgroundImage === "none" ? null : styles.backgroundImage);
            setThankYouTimer(thankYouTimer);

            setIsActive(toggleStatus === "Enabled");

            setEditorValue(editorValue);
            setSubmissionOption(submissionOption)

            setSubject(styles.subject);

            if (fields && fields.length > 0) {
                const passwordField = fields.find(field => field.type === 'password');
                if (passwordField) {
                    setPasswordStatus(passwordField.passwordStatus || 'off');
                }
            }

            if (fields && fields.length > 0) {
                const fileOptions = fields.find(field => field.type === 'file');
                if (fileOptions) {
                    setFileOptions(fileOptions.fileOptions || '');
                }
                const ImageField = fields.filter(field => field.type === 'file');
                if (ImageField.length > 0) {
                    const previewState = {};
                    ImageField.forEach(field => {
                        previewState[field.id] = field.ImagePreview || 'off';
                    });
                    setImagePreview(previewState);
                }

            }

            if (fields && fields.length > 0) {
                const multiOptions = fields.find(field => field.type === 'multi-file');
                if (multiOptions) {
                    setMultiOptions(multiOptions.multiOptions || '');
                }

                const multiFile = fields.filter(field => field.type === 'multi-file');
                if (multiFile.length > 0) {
                    const previewState = {};
                    multiFile.forEach(field => {
                        previewState[field.id] = field.multifilePreview || 'off';
                    });
                    setMultifilePreview(previewState);
                }
            }

            if (fields && fields.length > 0) {
                const imageOptions = fields.find(field => field.type === 'images');
                if (imageOptions) {
                    setImageOptions(imageOptions.imageOptions || '');
                }
                const singleImage = fields.filter(field => field.type === 'images');
                if (singleImage.length > 0) {
                    const previewState = {};
                    singleImage.forEach(field => {
                        previewState[field.id] = field.signlePreview || 'off';
                    });
                    setSignlePreview(previewState);
                }
            }

            if (fields && fields.length > 0) {
                const multiimagesOptions = fields.find(field => field.type === 'multi-image');
                if (multiimagesOptions) {
                    setMultiimagesOptions(multiimagesOptions.multiimagesOptions || '');
                }
                const multiImage = fields.filter(field => field.type === 'multi-image');
                if (multiImage.length > 0) {
                    const previewState = {};
                    multiImage.forEach(field => {
                        previewState[field.id] = field.multiIamgePreview || 'off';
                    });
                    setMultiIamgePreview(previewState);
                }
            }
        }

    }, [location.state]);

    // const defaultFields = ['heading', 'name', 'text', 'email', 'button'];
    // const fieldsAdded = useRef(false);

    // useEffect(() => {
    //     if (fields.length === 0 && !fieldsAdded.current) {
    //         fieldsAdded.current = true;
    //         defaultFields.forEach((type) => {
    //             addInputField(type);
    //         });
    //     }
    // }, [fields]);

    const createInputField = (type, options = [], isFieldEnabled = true, existingField = null) => {
        const baseField = {
            id: existingField ? existingField.id : generateUniqueId(),
            type,
            name: (type && type.charAt(0).toUpperCase() + type.slice(1)) || 'Text',
            label: type === 'name' ? 'Full name' : type.charAt(0).toUpperCase() + type.slice(1),
            description: '',
            disabled: !isFieldEnabled,
            width: "100%",
            required: false,
            readonly: false,
            customClass: '',
            options,
            level: existingField ? existingField.level : 'h1',
            text: existingField ? existingField.text : '',
            description: existingField ? existingField.description : '',
            level: type === 'heading' ? headingLevel : undefined,
            fontSize: type === 'heading' ? '40px' : undefined,
            level: 'h1',
            fontSize: '',
            customClass: '',
            color: '#DF0404',
            padding: '0',
            dividerColor: '#000',
            btnbackgroundcolor: '#0561AF',
            backgroundColor: existingField ? existingField.backgroundColor : '#45A7F6',
            btnwidth: type === 'button' ? '150' : undefined,
            buttonHeight: existingField?.buttonHeight || '40px',
            inputPadding: "15px 10px",
            inputBorderRadious: "4",
            buttontext: type === 'button' ? '16' : undefined,
            buttonBorderColor: type === 'button' ? '#000000' : undefined,
            buttonBorderWidth: type === 'button' ? '1' : undefined,
            buttonBorderStyle: type === 'button' ? 'solid' : undefined,
            buttonaline: type === 'button' ? '' : undefined,
            btncolor: type === 'button' ? '#FFFFFF' : undefined,
            btnradious: type === 'button' ? '4' : undefined,
            text: type === 'description' ? 'Add description' : undefined,
            textSize: type === 'description' ? '16' : undefined,
            textAline: type === 'description' ? '' : undefined,
            textColor: type === 'description' ? '#000000' : undefined,
            textlineheight: type === 'description' ? '20' : undefined,
            headingText: type === 'heading' ? 'Add Heading' : undefined,
            textHeading: type === 'heading' ? '' : undefined,
            colorHeading: type === 'heading' ? '#00000' : undefined,
            headingLineheight: type === 'heading' ? '' : undefined,
            linktext: type === 'link' ? 'Link' : undefined,
            linkUrl: type === 'link' ? '' : undefined,
            min: type === 'slider' ? 1 : undefined,
            max: type === 'slider' ? 100 : undefined,
            step: type === 'slider' ? 10 : undefined,
            value: type === 'slider' ? (existingField ? existingField.value : 0) : undefined,
            passwordCharacter: type === 'password' ? '6' : undefined,
            linkaline: type === 'link' ? '' : undefined,
            linkfontsize: type === 'link' ? '14' : undefined,
            linkTarget: type === 'link' ? '_self' : undefined,
            textPadding: type === 'description' ? '10' : undefined,
            dividerAline: type === 'divider' ? 'left' : undefined,
            dividerWidth: type === 'divider' ? '100%' : undefined,
            emailRequid:type === 'email' ? true : undefined,
        };

        return existingField ? { ...baseField, ...existingField, id: generateUniqueId() } : baseField;
    };
    const handleToggle = () => {
        setPasswordStatus((prevStatus) => {
            const newStatus = prevStatus === "on" ? "off" : "on";

            return newStatus;
        });
    };

    useEffect(() => {

    }, [passwordStatus]);


    const handleToggleChange = () => {
        if (!['pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUphradePopup(true);
            return;
        }
        setIsActive(prevState => !prevState);
    };

    const addInputField = (type) => {
        let newField = createInputField(type);

        if (type === 'radio') {
            newField = {
                ...newField,
                options: [
                    { id: generateUniqueId(), label: 'Radio 1', value: 'Radio 1' },
                    { id: generateUniqueId(), label: 'Radio 2', value: 'Radio 2' },
                ],
            };
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'select') {
            newField = {
                ...newField,
                options: [{ id: generateUniqueId(), name: 'Option1' },
                { id: generateUniqueId(), name: 'Option2' }],
            }
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'checkbox') {
            newField = {
                ...newField,
                options: [{ id: generateUniqueId(), name: 'Checkbox1' },
                { id: generateUniqueId(), name: 'Checkbox2' }],
            };
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'heading') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'description') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'multi-file') {
            newField = createInputField(type);
            setSelectedFiles('');
            setFields((prevFields) => [...prevFields, newField]);
        }
        else if (type === 'multi-image') {
            newField = createInputField(type);
            setSelectedimage('');
            setFields((prevFields) => [...prevFields, newField]);
        }
        else {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        }

        setIsFormBuilderVisible(true);
        if (window.innerWidth > 1024) {
            handleFieldClick(newField, fields.length);
        }

        if (window.innerWidth <= 768) {
            setShowFieldInput(false);
        }
    };


    const handleAddHeading = (level, text) => {
        const headingField = {
            id: generateUniqueId(),
            type: 'heading',
            level: headingLevel,
            text: headingText,
            fontSize: headingFontSize,
            label: headingText,
        };
        setFields((prevFields) => [...prevFields, headingField]);
        setShowHeadingPopup(false);
        setHeadingText('');
        setHeadingFontSize('16px');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddHeading(headingLevel, headingText);
        setShowHeadingPopup(false);
    };

    const saveEditedHeading = () => {
        if (selectedField) {
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.id === selectedField.id ? { ...field, level: headingLevel, text: headingText } : field
                )
            );
            setSelectedField(null);
        }
    };

    const handleRadioOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const addRadioOption = () => {
        const newOption = {
            id: generateUniqueId(),
            label: `Radio ${radioOptions.length + 1}`,
            value: `Radio ${radioOptions.length + 1}`,
        };

        setRadioOptions((prevOptions) => [...prevOptions, newOption]);

        if (selectedField?.id) {
            const updatedFields = fields.map((field) =>
                field.id === selectedField.id
                    ? { ...field, options: [...(field.options || []), newOption] }
                    : field
            );
            setFields(updatedFields);

            const updatedSelectedField = updatedFields.find((field) => field.id === selectedField.id);
            setSelectedField(updatedSelectedField);
        } else {

        }
    };

    const removeRadioOption = (id) => {
        setRadioOptions((prevOptions) => prevOptions.filter(option => option.id !== id));

        setFields((prevFields) =>
            prevFields.map(field => {
                if (field.id === selectedField?.id) {
                    const updatedOptions = field.options.filter(option => option.id !== id);

                    if (updatedOptions.length === 0) {
                        removeField(field.id);
                        return null;
                    }

                    return { ...field, options: updatedOptions };
                }
                return field;
            }).filter(Boolean)
        );

        if (selectedField?.id) {
            setSelectedField(prev => ({
                ...prev,
                options: prev.options.filter(option => option.id !== id)
            }));
        }
    };


    const handleAddRadioOptions = () => {
        if (radioOptions.some(option => option.label.trim() === '')) {

            return;
        }

        const optionNames = radioOptions.map(option => {
            if (!option || !option.label || !option.value) {

                return null;
            }
            return {
                label: option.label,
                value: option.value
            };
        }).filter(option => option !== null);

        if (optionNames.length === 0) {

            return;
        }

        const newField = createInputField('radio', optionNames);

        setFields(prevFields => {
            const updatedFields = [...prevFields];
            if (currentEditingFieldIndex !== null) {
                updatedFields[currentEditingFieldIndex] = newField;
            } else {
                updatedFields.push(newField);
            }
            return updatedFields;
        });

        resetRadioOptions();
        setCurrentEditingFieldIndex(null);
        setShowPopup(false);
    };

    const handleOptionNameChange = (index, value) => {
        setRadioOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = { ...updatedOptions[index], label: value };
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields => {
                return prevFields.map(field =>
                    field.id === selectedField.id
                        ? {
                            ...field,
                            options: field.options.map((option, idx) =>
                                idx === index ? { ...option, label: value } : option
                            )
                        }
                        : field
                );
            });
        } else {

        }
    };

    const resetRadioOptions = () => {
        setRadioOptions([{ id: generateUniqueId(), label: 'Radio 1', value: 'Radio 1' }]);
    };

    const resetCheckbox = () => {
        setCheckboxOptions([{ id: generateUniqueId(), name: 'Checkbox1', value: 'Checkbox1' }]);
    }

    const resetSelectbox = () => {
        setSelectOptions([{ id: generateUniqueId(), name: 'Option1', value: 'Option1' }]);
    }

    const handleOptionNameChanges = (index, value) => {
        setCheckboxOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = { ...updatedOptions[index], name: value };
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields =>
                prevFields.map(field =>
                    field.id === selectedField.id
                        ? {
                            ...field,
                            options: field.options.map((option, idx) =>
                                idx === index ? { ...option, name: value } : option
                            )
                        }
                        : field
                )
            );
        } else {

        }
    };

    const addCheckboxOption = () => {
        const newOption = {
            id: checkboxOptions.length + 1,
            name: `Checkbox${checkboxOptions.length + 1}`,
        };

        setCheckboxOptions((prevOptions) => {
            const updatedOptions = [...prevOptions, newOption];
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields((prevFields) => {
                const updatedFields = prevFields.map((field) =>
                    field.id === selectedField.id
                        ? { ...field, options: [...(field.options || []), newOption] }
                        : field
                );

                const updatedSelectedField = updatedFields.find(
                    (field) => field.id === selectedField.id
                );

                setSelectedField(updatedSelectedField);
                return updatedFields;
            });
        } else {

        }
    };


    const removeCheckboxOption = (id) => {
        setCheckboxOptions((prevOptions) => {
            const newOptions = prevOptions.filter(option => option.id !== id);

            if (newOptions.length === 0) {
                removeField(selectedField?.id);
            }

            return newOptions;
        });

        setFields((prevFields) => {
            return prevFields
                .map(field => {
                    if (field.id === selectedField?.id) {
                        const updatedOptions = field.options.filter(option => option.id !== id);

                        if (updatedOptions.length === 0) {
                            removeField(field.id);
                            return null;
                        }

                        return { ...field, options: updatedOptions };
                    }
                    return field;
                })
                .filter(Boolean);
        });

        if (selectedField?.id) {
            setSelectedField(prev => ({
                ...prev,
                options: prev.options.filter(option => option.id !== id) || []
            }));
        }
    };

    const handleAddCheckboxOptions = () => {

        const newField = createInputField('checkbox', checkboxOptions);
        setFields(prevFields => {
            const updatedFields = [...prevFields];
            if (editedFieldIndex !== null) {
                updatedFields[editedFieldIndex] = newField;
            } else {
                updatedFields.push(newField);
            }
            return updatedFields;
        });
        resetCheckbox();
        setShowCheckboxPopup(false);
        setCheckboxOptions([{ id: 1, name: 'Checkbox1' }]);
        setEditedFieldIndex(null);

    };

    const handleOptionNameChangees = (index, value) => {
        setSelectOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = { ...updatedOptions[index], name: value };
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields =>
                prevFields.map(field =>
                    field.id === selectedField.id
                        ? {
                            ...field,
                            options: field.options.map((option, idx) =>
                                idx === index ? { ...option, name: value } : option
                            )
                        }
                        : field
                )
            );
        } else {

        }
    };

    const addSelectOption = () => {
        const newOption = {
            id: generateUniqueId(),
            name: `Option${selectOptions.length + 1}`,
        };

        setSelectOptions((prevOptions) => {
            const updatedOptions = [...prevOptions, newOption];

            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields((prevFields) => {
                const updatedFields = prevFields.map((field) =>
                    field.id === selectedField.id
                        ? { ...field, options: [...(field.options || []), newOption] }
                        : field
                );

                const updatedSelectedField = updatedFields.find(
                    (field) => field.id === selectedField.id
                );

                setSelectedField(updatedSelectedField);
                return updatedFields;
            });
        } else {

        }
    };

    const handleAddSelectOptions = () => {
        if (selectOptions.some(option => option.name.trim() === '')) {

            return;
        }

        const newField = createInputField('select', selectOptions);
        setFields(prevFields => {
            const updatedFields = [...prevFields];
            if (activeFieldIndex !== null) {
                updatedFields[activeFieldIndex] = newField;
            } else {
                updatedFields.push(newField);
            }
            return updatedFields;
        });
        resetSelectbox();
        setShowSelectPopup(false);
        setSelectOptions([{ id: 1, name: 'Option1' }]);
        setActiveFieldIndex(null);

    };

    const removeSelectOption = (id) => {
        setSelectOptions((prevOptions) => {
            const newOptions = prevOptions.filter(option => option.id !== id);

            if (newOptions.length === 0) {
                removeField(selectedField?.id);
            }

            return newOptions;
        });

        setFields((prevFields) => {
            return prevFields
                .map(field => {
                    if (field.id === selectedField?.id) {
                        const updatedOptions = field.options.filter(option => option.id !== id);

                        if (updatedOptions.length === 0) {
                            removeField(field.id);
                            return null;
                        }

                        return { ...field, options: updatedOptions };
                    }
                    return field;
                })
                .filter(Boolean);
        });

        if (selectedField?.id) {
            setSelectedField(prev => ({
                ...prev,
                options: prev.options.filter(option => option.id !== id) || []
            }));
        }
    };


    const removeField = (id) => {
        setFields((prevFields) => {
            const newFields = prevFields.filter(field => field && field.id !== id);

            // if (newFields.length === 0) {
            //     setBackgroundImage('');
            //     setBackgroundColor('#ffffff');
            //     setImageFile(null);
            //     setBoxShadow('');
            //     setFormWidth('1200px');
            //     setPadding('20px');
            //     setBorderColor('#ffffff');
            //     setBorderRadius('0');
            // }

            if (selectedField && selectedField.id === id) {
                setSelectedField(null);
            }

            return newFields;
        });
    };

    const handleCreate = () => {
        setShowConfirmationPopup(true);
    };

    const handleStatusChange = (status) => {
        if (fields.length === 0) {

            setShowConfirmationPopup(false);
            return;
        }

        setIsLoading(true);
        setConfirmationPopupType(status);
        setShowConfirmationPopup(false);

        createOrUpdateForm(status);
    };

    const createOrUpdateForm = async (status = 'draft') => {
        const formId = generateUniqueId();
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

        console.log('Form status:', status);

        console.log('Fields:', fields);


        if (status !== 'live' && status !== 'draft') {

            return;
        }

        if (!formTitle.trim()) {

            return;
        }

        const sanitizedContent = sanitizeHtml(editorValue, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                'a': ['href', 'name', 'target'],
                'img': ['src'],
            },
        });

        console.log('Sanitized Content:', sanitizedContent);

        const backgroundImageUrl = imageFile ? `url(${imageFile})` : backgroundImage || 'none';

        const newForm = {
            formId: isEditing ? editingFormId : formId,
            title: formTitle,
            shop,
            fields: fields.map(field => {

                if (field.type === 'toggle') {
                    return {
                        ...field,
                        onValue: field.onValue || 'On',
                        offValue: field.offValue || 'Off',
                    };
                }

                if (field.type === 'file') {
                    return {
                        ...field,
                        fileOptions: fileOptions,
                        ImagePreview: ImagePreview[field.id] || 'off'
                    };
                }

                if (field.type === 'multi-file') {
                    return {
                        ...field,
                        multiOptions: multiOptions,
                        multifilePreview: multifilePreview[field.id] || 'off'
                    };
                }

                if (field.type === 'images') {
                    return {
                        ...field,
                        imageOptions: imageOptions,
                        signlePreview: signlePreview[field.id] || 'off'
                    };
                }

                if (field.type === 'multi-image') {
                    return {
                        ...field,
                        multiimagesOptions: multiimagesOptions,
                        multiIamgePreview: multiIamgePreview[field.id] || 'off'
                    };
                }

                if (field.type === 'slider') {
                    return {
                        ...field,
                        min: field.min,
                        max: field.max,
                        step: field.step
                    };
                }
                if (field.type === 'link') {
                    return {
                        ...field,
                        linktext: field.linktext || '',
                        linkUrl: field.linkUrl || '',
                        linkTarget: field.linkTarget || '_self',
                        linkaline: field.linkaline || '',
                        linkfontsize: field.linkfontsize

                    };
                }
                if (field.type === 'password') {
                    return {
                        ...field,
                        passwordCharacter: field.passwordCharacter || '',
                        passwordStatus: passwordStatus

                    };
                }
                if (field.type === 'checkbox') {
                    return {
                        ...field,
                        options: field.options.map(option => ({
                            id: option.id || generateUniqueId(),
                            label: option.name || '',
                            value: option.name || option.label
                        })).filter(option => option.label && option.value)
                    };
                }
                if (field.type === 'select') {
                    return {
                        ...field,
                        options: field.options.map(option => ({
                            id: option.id || generateUniqueId(),
                            label: option.name || '',
                            value: option.name || option.label
                        })).filter(option => option.label && option.value)
                    };
                }
                if (field.type === 'radio') {
                    return {
                        ...field,
                        options: field.options.map(option => ({
                            id: option.id || generateUniqueId(),
                            label: option.label || '',
                            value: option.value || option.label
                        })).filter(option => option.label && option.value)
                    };
                }
                if (field.type === 'heading') {
                    return {
                        ...field,
                        level: field.level,
                        fontSize: field.fontSize
                    };
                }
                if (field.type === 'button') {
                    return {
                        ...field,
                        padding: field.padding,
                        color: field.color,
                        fontSize: field.fontSize,
                        width: field.btnwidth,
                        height: field.buttonHeight,
                        backgroundColor: field.backgroundColor,
                        buttonBorderWidth: field.buttonBorderWidth || 1,
                        buttonBorderStyle: field.buttonBorderStyle || 'solid',
                        buttonBorderColor: field.buttonBorderColor || '#000',
                        buttonaline: field.buttonaline || '',
                        buttontext: field.buttontext,
                        btncolor: field.btncolor || '#ffff',
                        btnradious: field.btnradious
                    };
                }
                return field;
            }),
            createdAt: timestamp,
            hidden: false,
            toggleStatus: isActive ? "Enabled" : "Disabled",
            status: status,
            styles: {
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImageUrl,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                boxShadow,
                width: formWidth,
                padding,
                marginForm,
                inputRadious,
                inputstyle,
                labelColor,
                inputGap,
                inputwidth,
                opacityForm,
                inputborderColor,
                inputBgColor,
                borderColor,
                borderRadius,
                borderColor: borderColor,
                borderRadius: borderRadius,
                borderWidth: borderWidth,
                borderStyle: borderStyle,
                subject,
                maxDescriptionHeight,
                shopName
            },
            submissionOption: submissionOption || "defaultOption",
            thankYouTimer: thankYouTimer || 0,
            editorValue: sanitizedContent,
            url: url || "",
        };


        const request = isEditing
            ? axios.put(`${apiUrl}/update-form/${editingFormId}`, newForm, {
                headers: { 'Content-Type': 'application/json' }
            })
            : axios.post(`${apiUrl}/form-data`, newForm, {
                headers: { 'Content-Type': 'application/json' }
            });

        request
            .then(response => {
                console.log(isEditing ? 'Form updated successfully:' : 'Form data saved successfully:', response.data);
                const updatedForms = isEditing
                    ? createdForms.map(form => form.formId === editingFormId ? newForm : form)
                    : [...createdForms, newForm];

                setCreatedForms(updatedForms);
                setCurrentFormId(newForm.formId);
                navigator('/app/forms/list');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data);
                } else {

                }
            });

        setFields([]);
        setShowFormBuilder(false);
        setView('live');
        setIsEditing(false);
        setEditingFormId(null);
        setFormWidth('1200px');
        setBackgroundImage(null);
        setImageFile('');
        setBorderColor('');
        setPadding('');
        setBorderRadius('');
    };

    const handleCancelStatusChange = () => {
        setShowConfirmationPopup(false);
        setShowCancelPopup(false);

    };

    const handleFieldClick = (field, index) => {
        const isCurrentlySelected = selectedField && selectedField.id === field.id;

        setSelectedField(isCurrentlySelected ? null : field);
        setHoveredFieldId(field.id);

        if (!isCurrentlySelected) {
            setIsPropertiesVisible(true);

            if (field.type === 'radio') {
                setRadioOptions(field.options || []);
                setRadioOptions(field.options.map(option => ({
                    id: option.id || generateUniqueId(),
                    label: option.label,
                    value: option.value
                })));
                setCurrentEditingFieldIndex(index);

            } else if (field.type === 'checkbox') {
                setShowCheckboxPopup(false);
                setCheckboxOptions(field.options || []);
                setEditedFieldIndex(index);

            } else if (field.type === 'heading') {
                setHeadingLevel(field.level);
                setHeadingText(field.text);
                setDescriptionText('');
                setHeadingFontSize(field.fontSize);

            } else if (field.type === 'description') {
                setDescriptionText(field.text);
                setHeadingText('');

            } else if (field.type === 'select') {
                setSelectOptions(field.options);
                setShowSelectPopup(false);
                setActiveFieldIndex(index);
            }
            handleFieldPro(field, index);
        } else {
            setIsPropertiesVisible(false);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (editedFieldIndex !== null) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [editedFieldIndex]);

    useEffect(() => {
        console.log('selectedField', selectedField);
        console.log('headingText', headingText);

        if (selectedField) {
            const updatedField = {
                ...selectedField,
                ...(selectedField.type === 'heading'
                    ? {
                        level: headingLevel,
                        headingText: headingText || selectedField.headingText,
                        text: headingText || selectedField.headingText,
                        fontSize: headingFontSize
                    }
                    : { text: descriptionText }),
            };

            if (Array.isArray(fields)) {
                setFields(prevFields =>
                    prevFields.map(field => field?.id === selectedField.id ? updatedField : field)
                );
            } else {

            }
        }
    }, [headingLevel, headingText, headingFontSize, descriptionText, selectedField]);

    const updateFieldProperty = (property, value) => {
        if (selectedField) {
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.id === selectedField.id
                        ? { ...field, [property]: value }
                        : field
                )
            );

            setSelectedField((prevSelectedField) => ({
                ...prevSelectedField,
                [property]: value,
            }));
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth > 1024 &&
                propertiesPanelRef.current &&
                !propertiesPanelRef.current.contains(event.target)) {
                setSelectedField(null);
                setIsOptionsVisible(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const formBuilder = document.getElementById('formBuilder');
        if (formBuilder) {
            const sortable = Sortable.create(formBuilder, {
                animation: 150,
                ghostClass: 'dragging',
                scroll: true,
                scrollSensitivity: 100,
                scrollSpeed: 10,
                onEnd: (event) => {
                    const updatedFields = [...fields];
                    const [movedItem] = updatedFields.splice(event.oldIndex, 1);
                    updatedFields.splice(event.newIndex, 0, movedItem);
                    setFields(updatedFields);
                },
            });

            return () => sortable.destroy();
        }
    }, [fields]);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setEditMode(false);
        }
    };

    useEffect(() => {
        if (editMode) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editMode]);

    const handleFileChange = (event) => {
        if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUphradePopup(true);
            return;
        }
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageFile(reader.result);
                localStorage.setItem('backgroundImage', reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundFileDrop = (e) => {
        e.preventDefault();
        if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
            setUphradePopup(true);
            return;
        }
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const event = { target: { files: [file] } };
            handleFileChange(event);
        }
    };

    const handleBoxShadowChange = (e) => {
        const selectedShadow = e.target.value;
        setBoxShadow(selectedShadow);

        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.boxShadow = selectedShadow;
        }
    };
    const updateFormWidth = (width) => {
        setFormWidth(width);
        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.width = width;
        }
    };

    const updateOpacity = (opacityForm) => {
        setOpacityForm(opacityForm);
        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.opacityForm = opacityForm;
        }
    }

    const updateMargin = (newMargin) => {
        const marginValue = Math.min(Math.max(Number(newMargin), 0), 150);
        setMarginForm(marginValue);

        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.padding = `${marginValue}px`;
        }
    };

    const updatePadding = (newPadding) => {
        const paddingValue = Math.min(Math.max(Number(newPadding), 0), 30);
        setPadding(paddingValue);

        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.padding = `${paddingValue}px`;
        }
    };

    const handleBorderColorChange = (e) => {
        const newColor = e.target.value;
        setBorderColor(newColor);
        setBorderColorcode(newColor)
    };
    const handleheadingColorChange = (e) => {
        const newColor = e.target.value;
        setColorHeading(newColor);
        setColorHeadingcode(newColor)
    };

    const handleBorderWidthChange = (e) => {
        let value = e.target.value;

        if (value < 0) {
            value = 0;
        } else if (value > 30) {
            value = 30;
        }

        setBorderWidth(`${value}px`);
    };


    const handleBorderStyleChange = (e) => {
        setBorderStyle(e.target.value);
    };

    const updateBorderRadius = (borderRadius) => {
        setBorderRadius(borderRadius);
        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.borderRadius = borderRadius;
        }
    }

    const toggleFieldEnabled = (fieldId) => {
        setEnabledFields((prev) => ({
            ...prev,
            [fieldId]: !prev[fieldId],
        }));
    };


    const handleSubmits = (e) => {
        e.preventDefault();
        handleAddDescription(descriptionText);
    };

    const handleAddDescription = (text) => {
        const descriptionField = {
            id: editingDescriptionId || generateUniqueId(),
            type: 'description',
            text: descriptionText,
            label: 'Description',
        };
        setFields((prevFields) => [...prevFields, descriptionField]);
        setShowDescriptionPopup(false);
        setDescriptionText('');
        setEditingDescriptionId(null)

    };

    const toggleFields = () => {
        setShowFields(true);
        setDropdownVisible(false);
    };

    const toggleSettings = () => {
        setShowFields(false);
    };

    const hanldeField = () => {
        setShowField(!showField);
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const toggleOptions = () => {
        setIsOptionsVisible(prev => !prev);
    };

    const handleCloseProperties = () => {
        setIsPropertiesVisible(false);
        setSelectedField(null);
    };

    const handlelistForm = () => {
        setShowCancelPopup(true)
    }

    const handleOptionChange = (event) => {
        setSubmissionOption(event.target.value);

    };

    const handleTimerChange = (event) => {
        const value = event.target.value;
        if (value <= 30 && value >= 0) {
            setThankYouTimer(value);
        }
    };

    const handleRemoveBackgroundImage = () => {
        setBackgroundImage('');
        setImageFile('');
    };

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setShowFieldInput(true);
        } else {
            setShowFieldInput(false);
        }

        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setShowFieldInput(true);
            } else {
                setShowFieldInput(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFieldInput = () => {
        if (window.innerWidth <= 1024) {
            setShowFieldInput(true);
        }
    };
    const hanldeCancleBtn = () => {
        setShowFieldInput(false);
    }

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setShowFieldPro(true);
        } else {
            setShowFieldPro(false);
        }

        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setShowFieldPro(true);
            } else {
                setShowFieldPro(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFieldPro = () => {
        if (window.innerWidth <= 1024) {
            setShowFieldPro(true);
        }
    };

    const hanldeCanclepro = () => {
        setShowFieldPro(false);
    }

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setBackgroundColor(newColor);
        setColorCode(newColor);
    };

    const handleLableColor = (e) => {
        const newColor = e.target.value;
        setLableColor(newColor);
        setLableCode(newColor);
    }

    const handleborderColor = (e) => {
        const newColor = e.target.value;
        setInputBorderColor(newColor);
        setInputColorcode(newColor);
    }

    const min = 360;
    const max = 1200;
    const sliderRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;
        const value = Math.min(Math.max(offsetX, 0), width) / width * (max - min) + min;

        setFormWidth(`${Math.round(value)}px`);
        sliderRef.current.style.setProperty('--thumb-position', `${(value - min) / (max - min) * 100}%`);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        handleMouseMove(e);
    };

    const handleFileChange5 = (event) => {
        const newFiles = event.target.files;
        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };


    const handleFileChange6 = (event) => {
        const newFiles = event.target.files;
        setSelectedimage(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
    };

    const handleRemoveimage = (index) => {
        setSelectedimage(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleChange = (key, value) => {
        setSelectedField(prev => ({
            ...prev,
            [key]: value || ''
        }));
    };

    const handleSetValue = (key) => {
        setSelectedField(prev => ({
            ...prev,
            [key]: prev[key] === 'active' ? '' : 'active'
        }));
    };

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        console.log("Slider changed to:", newValue);
        setSliderValue(newValue);
        updateFieldProperty('sliderValue', newValue);
    };

    useEffect(() => {
        const descriptions = document.querySelectorAll('.description');
        let maxHeight = 0;
        let hasText = false;

        descriptions.forEach(desc => {
            if (desc.textContent.trim() !== '') {
                hasText = true;
                const height = desc.scrollHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
            }
        });

        setMaxDescriptionHeight(hasText ? maxHeight : 0);
    }, [fields]);

    const handleCopyField = (fieldId) => {
        const fieldToCopy = fields.find(field => field.id === fieldId);
        const copiedField = {
            ...fieldToCopy,
            id: generateUniqueId(),
        };

        setFields(prevFields => {
            const updatedFields = [...prevFields, copiedField];

            const fileFieldsCount = updatedFields.filter(field => field.type === 'file').length;
            const multiFileFieldsCount = updatedFields.filter(field => field.type === 'multi-file').length;

            if (fieldToCopy.type === 'file') {
                const newFileOption = fileFieldsCount === 1 ? 'option1' : fileOptions[fieldId] || 'option1';
                setFileOptions(prevOptions => ({
                    ...prevOptions,
                    [copiedField.id]: newFileOption,
                }));
            } else if (fieldToCopy.type === 'multi-file') {
                const newMultiFileOption = multiFileFieldsCount === 1 ? 'option1' : multiOptions[fieldId] || 'option1';
                setMultiOptions(prevOptions => ({
                    ...prevOptions,
                    [copiedField.id]: newMultiFileOption,
                }));
            } else if (fieldToCopy.type === 'multi-image') {
                const newMultiimageOption = multiFileFieldsCount === 1 ? 'option1' : multiimagesOptions[fieldId] || 'option1';
                setMultiimagesOptions(prevOptions => ({
                    ...prevOptions,
                    [copiedField.id]: newMultiimageOption,
                }));
            } else if (fieldToCopy.type === 'images') {
                const newMultiOption = multiFileFieldsCount === 1 ? 'option1' : imageOptions[fieldId] || 'option1';
                setImageOptions(prevOptions => ({
                    ...prevOptions,
                    [copiedField.id]: newMultiOption,
                }));
            }

            return updatedFields;
        });
    };


    const fetchPaymentPlan = async () => {
        try {

            const response = await axios.get(`${apiUrl}/payment/active-plan?shop=${shop}`);

            setUserPlan(response.data);

        } catch (error) {

        }
    };

    useEffect(() => {
        fetchPaymentPlan();
    }, []);

    const handleUpgrade = () => {
        navigator('/app/pricing');
    }

    const handleCancle = () => {
        setUphradePopup(false);
    }


    useEffect(() => {
        const fetchStatusBrand = async () => {
            try {
                const response = await axios.get(`${apiUrl}/data/brandLogo/${shop}`);

                setActiveBrand(response.data.status);
            } catch (error) {

            }
        };

        if (shop) {
            fetchStatusBrand();
        }
    }, [shop, apiUrl]);

    return (
        <div>

            {passwordpopop && (
                <div className='form_builder_plan_upgrade_popup '>
                    <div className='form_builder_plan_upgrade_popup_wrapp password-popup'>
                        <p>Minimum password length should be 6 character</p>
                        <div className="form_builder_upgrade_popup_cancle" onClick={() => setPasswordpopup(false)}>
                            <img src={cancleimg} alt="" />
                        </div>
                    </div>
                </div>)}

            {upgradePopup && <div className='form_builder_plan_upgrade_popup'>
                <div className='form_builder_plan_upgrade_popup_wrapp'>
                    <p>You need to upgrade your plan to unlock this feature</p>
                    <div className='form_builder_upgrade_choose_plan' onClick={handleUpgrade}><p>Choose plans</p></div>
                    <div className="form_builder_upgrade_popup_cancle" onClick={handleCancle}>
                        <img src={cancleimg} alt="" />
                    </div>
                </div>
            </div>}
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
            <div className="builder-container forms text">
                <div className='builder-contain-h3'>
                    <h3>Forms</h3>
                </div>
                <div className='builder_form_name form-title'>
                    <div className='builder_form_name-input-title'>
                        <h1>Form Name</h1>
                        <input
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className='form-builder-btns-wraped'>
                        <div className='btn_form_bulider'>
                            <div className="form-submission-wrp">
                                <button className="cancle-form-btn" onClick={handlelistForm}>Cancel</button>
                            </div>
                            <div className="form-submission-wrp">
                                <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update' : 'Save'}</button>
                            </div>
                        </div>
                        <div className='form-Elements-btn form ' onClick={handleFieldInput}>Form Elements</div>
                    </div>
                </div>

                <div className='builder-forms_rapp'>
                    <div className="builder-wrp">
                        <div className="controls-main-wrp">

                            {showFieldInput && (<div className="controls-wrp">

                                {showField && (<div className="controls">
                                    <div className='builder-form-element'>
                                        <div className='buil_form_texttt'>
                                            <div className='buil_form_texttt_p'>
                                                <h2>Form Elements</h2>
                                            </div>
                                        </div>
                                        {/* <div className='builder_element_close' style={{ cursor: "pointer" }} onClick={hanldeField}>
                                            <img src={close} alt="" />
                                        </div> */}
                                    </div>
                                    <div className='controls-wrpping cancleimg pro' onClick={hanldeCancleBtn}><img src={cancleimg} alt="" /></div>
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
                                            <div className='build_form_btns form-scroll-bar'>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={heading} alt="" /></span> <span><h4>Heading</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('name')}><span className='form_builder_field_img'><img src={text} alt="" /></span> <span><h4>Name</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('email')}><span className='form_builder_field_img'><img src={email} alt="" /></span> <span><h4>Email address</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('password')}><span className='form_builder_field_img'><img src={password1} alt="" /></span> <span><h4>Password</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('phone')}><span className='form_builder_field_img'><img src={phone} alt="" /></span> <span><h4>Phone number</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('location')}><span className='form_builder_field_img'><img src={location1} alt="" /></span> <span><h4>Location</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('date')}><span className='form_builder_field_img'><img src={date} alt="" /></span> <span><h4>Date</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('datetime')}><span className='form_builder_field_img'><img src={detetime} alt="" /></span> <span><h4>Datetime</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('time')}><span className='form_builder_field_img'><img src={time} alt="" /></span> <span><h4>Time</h4></span></button> </div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('number')}><span className='form_builder_field_img'><img src={number} alt="" /></span> <span><h4>Number Input</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('radio')}><span className='form_builder_field_img'><img src={radio} alt="" /></span> <span><h4>Radio Button</h4></span> </button>  </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('checkbox')} ><span className='form_builder_field_img'><img src={checkbox} alt="" /></span> <span><h4>Checkbox</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('select')} ><span className='form_builder_field_img'><img src={selection} alt="" /></span> <span><h4>Select Box</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('text')}><span className='form_builder_field_img'><img src={text} alt="" /></span> <span><h4>Text Input</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('textarea')}><span className='form_builder_field_img'><img src={text1} alt="" /></span> <span><h4>Textarea</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('url')}><span className='form_builder_field_img'><img src={url1} alt="" /></span> <span><h4>Url</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('file')} ><span className='form_builder_field_img'><img src={single} alt="" /></span> <span><h4>File Upload</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => { if (!['pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) { setUphradePopup(true); return; } addInputField('multi-file'); }}><span className='form_builder_field_img'><img src={multi} alt="" /></span> <span><h4>Multi File Upload</h4></span></button> {!['pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan) && (<span className="payment-plan">Pro +</span>)}</div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={singleimage} alt="" /></span> <span><h4>Images</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => { if (!['pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) { setUphradePopup(true); return; } addInputField('multi-image'); }}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Multi Image</h4></span></button>{!['pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan) && (<span className="payment-plan">Pro +</span>)}</div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('toggle')}><span className='form_builder_field_img'><img src={toggle} alt="" /></span> <span><h4>Toggle</h4></span></button> </div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => addInputField('link')}><span className='form_builder_field_img'><img src={link1} alt="" /></span> <span><h4>Link</h4></span></button> </div>
                                                <div className='builderr_field_wrpp form-plan'> <button onClick={() => { if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) { setUphradePopup(true); return; } addInputField('slider'); }}> <span className='form_builder_field_img'><img src={slider} alt="Slider Icon" /> </span> <span><h4>Slider</h4> </span></button>{!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan) && (<span className="payment-plan">Pro </span>)}</div>
                                            </div>
                                        ) : (
                                            <div className='form-scroll-bar'>
                                                <div className='edit_form_close'>
                                                    <div className='edit-formwrap forms '>
                                                        <h3>Edit Form Properties</h3>
                                                        <div className='form_builder_submission'>
                                                            <h2> Form Submission</h2>
                                                            <div className='dropdown-content'>
                                                                <select className='submission-select' value={submissionOption} onChange={handleOptionChange}>
                                                                    <option value="">Select Submission Option</option>
                                                                    <option value="Clear the form and allow another submission">Clear the form and allow another submission</option>
                                                                    <option value="Redirect to other page">Redirect to other page</option>
                                                                    <option value="Hide form and show thank you message">Hide form and show thank you message</option>
                                                                </select>
                                                                {submissionOption === 'Clear the form and allow another submission' && (
                                                                    <div className='option-content'>
                                                                        <div className='admin-input'>
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
                                                                        <div>
                                                                            <label htmlFor="thankYouTimer">Thank You Message Timer (max 30s): </label>
                                                                            <input
                                                                                type="number"
                                                                                id="thankYouTimer"
                                                                                value={thankYouTimer}
                                                                                onChange={handleTimerChange}
                                                                                min="0"
                                                                                max="30"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {submissionOption === 'Redirect to other page' && (
                                                                    <div
                                                                        className='option-content'
                                                                        onClick={() => {
                                                                            if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                setUphradePopup(true);
                                                                                return;
                                                                            }
                                                                        }}
                                                                    >
                                                                        <label htmlFor="Redirect Page URL">Redirect Page URL</label>
                                                                        <input
                                                                            type="url"
                                                                            value={url}
                                                                            onChange={(e) => setUrl(e.target.value)}
                                                                            className='url-input'
                                                                            placeholder="https://example.com"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {submissionOption === 'Hide form and show thank you message' && (
                                                                    <div className='option-content'
                                                                        onClick={() => {
                                                                            if (!['pro', 'pro_plus', 'pro_yearly', 'pro_plus_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                setUphradePopup(true);
                                                                                return;
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className='admin-input'>
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
                                                            </div>
                                                        </div>
                                                        <div className="edit_setting_bg subject">
                                                            <label>Email Subject:</label>
                                                            <div className="toggle-container">
                                                                <input type="text" name="" id="" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div className='edit-form-options form'>
                                                            <div className="edit_setting_bg current-url inherit-class">
                                                                <label htmlFor="boxShadowSelect">Collect URL:</label>
                                                                <div className="toggle-container">
                                                                    <label htmlFor="toggleSwitch" className="switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="toggleSwitch"
                                                                            checked={isActive}
                                                                            onChange={handleToggleChange}
                                                                        />
                                                                        <span className="slider"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <div className='checkbox-option bg-colors'>
                                                                    <label>Background Color:</label>
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
                                                                            value={backgroundColor || "#ffffff"}
                                                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="edit_setting_bg form bg-img">
                                                                <label>Upload Background Image:</label>
                                                                {!imageFile && (
                                                                    <div
                                                                        className="upload-area"
                                                                        onClick={() => document.getElementById('fileInput').click()}
                                                                        onDragOver={(e) => e.preventDefault()}
                                                                        onDrop={(e) => handleBackgroundFileDrop(e)}
                                                                    >
                                                                        <img src={file} alt="" />
                                                                        <p>Drag & Drop to Upload File</p>
                                                                        <p>OR</p>
                                                                        <span className='upload-btn'>Browse File</span>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={handleFileChange}
                                                                            style={{ display: 'none' }}
                                                                            id="fileInput"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {(imageFile) && (
                                                                <div
                                                                    className="edit_setting_bg form"
                                                                    style={{
                                                                        backgroundImage: `url(${imageFile})`,
                                                                        backgroundRepeat: 'no-repeat',
                                                                        backgroundSize: 'contain',
                                                                        backgroundPosition: 'center',
                                                                        height: '150px',
                                                                        width: '100%',
                                                                        border: '1px solid #ddd',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                >

                                                                    <button
                                                                        className='rm-btn remove-btn-img'
                                                                        type="button"
                                                                        onClick={handleRemoveBackgroundImage}
                                                                    >
                                                                        <img src={remove} alt="Remove" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <div className='edit_setting_bg form'>
                                                                <label>Opacity:</label>
                                                                <input
                                                                    type='text'
                                                                    value={opacityForm}
                                                                    onChange={(e) => updateOpacity(e.target.value)}
                                                                />
                                                            </div>

                                                            <div className="edit_setting_bg form">
                                                                <label htmlFor="boxShadowSelect">Background Shadow:</label>
                                                                <select
                                                                    id="boxShadowSelect"
                                                                    className="edit_shadowselect"
                                                                    onChange={handleBoxShadowChange}
                                                                    value={boxShadow}
                                                                >
                                                                    <option value="">Select a shadow</option>
                                                                    <option value="rgba(0, 0, 0, 0.35) 0px 5px 15px">Subtle Shadow</option>
                                                                    <option value="rgba(0, 0, 0, 0.5) 0px 10px 20px">Medium Shadow</option>
                                                                    <option value=" rgba(0, 0, 0, 0.56) 0px 22px 70px 4px">Dark Shadow</option>
                                                                    <option value="none">No Shadow</option>
                                                                </select>
                                                            </div>
                                                            <div className="edit_setting_bg form">
                                                                <label>Form Width:</label>
                                                                <div>
                                                                    <div
                                                                        ref={sliderRef}
                                                                        className="custom-range-slider"
                                                                        onMouseDown={handleMouseDown}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '33px',
                                                                            background: `linear-gradient(to right, #00ac4f 0%, #00ac4f ${(parseInt(formWidth.replace('px', '')) - min) / (max - min) * 100}%, #e7f9f4 ${(parseInt(formWidth.replace('px', '')) - min) / (max - min) * 100}%, #e7f9f4 100%)`,
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className="slider-thumb"
                                                                            style={{
                                                                                position: 'absolute',
                                                                                left: `calc(${(parseInt(formWidth.replace('px', '')) - min) / (max - min) * 97}%)`,
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className={`custom-range-text ${parseInt(formWidth.replace('px', '')) > 600 ? 'high-width' : ''}`}
                                                                        >
                                                                            {formWidth}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <label>Margin:</label>
                                                                <input
                                                                    type='number'
                                                                    value={marginForm}
                                                                    onChange={(e) => updateMargin(e.target.value)}
                                                                    min={0}
                                                                    max={150}
                                                                />
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <label>Padding:</label>
                                                                <input
                                                                    type='number'
                                                                    value={padding}
                                                                    onChange={(e) => updatePadding(e.target.value)}
                                                                    min={0}
                                                                    max={30}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Gap</label>
                                                                <input
                                                                    type='number'
                                                                    value={inputGap}
                                                                    onChange={(e) => setInputGap(e.target.value)}
                                                                    min={0}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <div className='checkbox-option bg-colors'>
                                                                    <label>  Label Color:</label>
                                                                    <div className="color-picker-container">
                                                                        <input
                                                                            type="text"
                                                                            className="color-code"
                                                                            value={labelColor || '#ffffff'}
                                                                            readOnly
                                                                            onClick={(e) => {
                                                                                navigator.clipboard.writeText(e.target.value);
                                                                            }}
                                                                            onPaste={(e) => {
                                                                                const pastedText = e.clipboardData.getData('text');
                                                                                if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                    setLableColor(pastedText);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="color"
                                                                            value={labelColor}
                                                                            onChange={(e) => setLableColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <label>Input Border:</label>
                                                                <input
                                                                    type='number'
                                                                    value={inputwidth}
                                                                    onChange={(e) => setInputWidth(e.target.value)}
                                                                    min={0}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <div className='checkbox-option bg-colors'>
                                                                    <label>Input Border Color:</label>
                                                                    <div className="color-picker-container">
                                                                        <input
                                                                            type="text"
                                                                            className="color-code"
                                                                            value={inputborderColor || '#ffffff'}
                                                                            readOnly
                                                                            onClick={(e) => {
                                                                                navigator.clipboard.writeText(e.target.value);
                                                                            }}
                                                                            onPaste={(e) => {
                                                                                const pastedText = e.clipboardData.getData('text');
                                                                                if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                    setInputBorderColor(pastedText);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="color"
                                                                            value={inputborderColor}
                                                                            onChange={(e) => setInputBorderColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <div className='checkbox-option bg-colors'>
                                                                    <label>Input Background Color:</label>
                                                                    <div className="color-picker-container">
                                                                        <input
                                                                            type="text"
                                                                            className="color-code"
                                                                            value={inputBgColor || '#ffffff'}
                                                                            readOnly
                                                                            onClick={(e) => {
                                                                                navigator.clipboard.writeText(e.target.value);
                                                                            }}
                                                                            onPaste={(e) => {
                                                                                const pastedText = e.clipboardData.getData('text');
                                                                                if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                    setInputBgColor(pastedText);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="color"
                                                                            value={inputBgColor}
                                                                            onChange={(e) => setInputBgColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="edit_setting_bg form">
                                                                <label>Input Border Style:</label>
                                                                <select
                                                                    value={inputstyle}
                                                                    onChange={(e) => setInputStyle(e.target.value)}
                                                                >
                                                                    <option value="solid">Solid</option>
                                                                    <option value="dotted">Dotted</option>
                                                                    <option value="dashed">Dashed</option>
                                                                    <option value="double">Double</option>
                                                                </select>
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <label>Input Border Radius :</label>
                                                                <input
                                                                    type='number'
                                                                    value={inputRadious}
                                                                    onChange={(e) => setInputRadious(e.target.value)}
                                                                    min={0}
                                                                />
                                                            </div>


                                                            {/* <div className='edit_setting_bg form padding'>
                                                                <label>Padding:</label>
                                                                <input
                                                                    type="range"
                                                                    min="0"
                                                                    max="300"
                                                                    value={padding}
                                                                    onChange={(e) => updatePadding(e.target.value)}
                                                                    style={{ width: '250px' }}
                                                                    className="custom-range"
                                                                />
                                                               
                                                            </div> */}

                                                            <div className='edit_setting_bg form'>
                                                                <label>Border Width:</label>
                                                                <input
                                                                    type='number'
                                                                    value={parseInt(borderWidth) || 0}
                                                                    onChange={handleBorderWidthChange}
                                                                    placeholder="e.g., 1px"

                                                                />

                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Style:</label>
                                                                <select onChange={handleBorderStyleChange} value={borderStyle} style={{ marginRight: '10px' }}>
                                                                    <option value="solid">Solid</option>
                                                                    <option value="dashed">Dashed</option>
                                                                    <option value="dotted">Dotted</option>
                                                                    <option value="double">Double</option>d

                                                                </select>
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <div className='checkbox-option bg-colors'>
                                                                    <label>Border-Color:</label>
                                                                    <div className="color-picker-container">

                                                                        <input
                                                                            type="text"
                                                                            className="color-code"
                                                                            value={borderColor || '#ffffff'}
                                                                            readOnly
                                                                            onClick={(e) => {
                                                                                navigator.clipboard.writeText(e.target.value);
                                                                            }}
                                                                            onPaste={(e) => {
                                                                                const pastedText = e.clipboardData.getData('text');
                                                                                if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                    setBorderColor(pastedText);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="color"
                                                                            value={borderColor}
                                                                            onChange={(e) => setBorderColor(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Border-Radius:</label>
                                                                <input
                                                                    type='number'
                                                                    value={borderRadius}
                                                                    onChange={(e) => updateBorderRadius(e.target.value)}
                                                                    min={0}
                                                                    max={30}
                                                                />
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

                            <div className='form_builder_build some'>
                                <div id='bg_change' className="form-builder-wrp" style={{ position: 'relative' }}>
                                    <div id="bg_change_background" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                                    {activeBrand === 'active' && <div className='form_builder-brand-logos'><img src={brandlogos} alt="" /></div>}
                                    <div id="formBuilder" className="form-builder forms-wrapping" >
                                        {fields.length > 0 ? (fields.map((field, index) => {
                                            if (!field) {
                                                return null;
                                            }
                                            return (
                                                <div
                                                    key={field.id}
                                                    className={`input-field input-gap ${parseFloat(field.width || '100') <= 50 ? 'small-width' : ''}`}
                                                    style={{ width: field.width || '100%', marginBottom: `${inputGap}px`, whiteSpace: 'pre-wrap', wordBreak: 'break-word', }}
                                                    onClick={() => handleFieldClick(field, index)}
                                                >
                                                    {field.type === 'name' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}>

                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        type="text"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('name', e.target.value, field.id)}
                                                                    />
                                                                </label>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}


                                                    {field.type === 'text' && (
                                                        <div className={`input-field ${field.customClass}`} style={{
                                                            width: "100%",
                                                            border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }} >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        type="text"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('name', e.target.value, field.id)}

                                                                    />
                                                                </label>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'heading' && (
                                                        <div className={`input-field ${field.customClass || ''}`} style={{
                                                            width: "100%",
                                                            minHeight: `${field.fontSize * 1.5 || 20}px`,
                                                            display: 'flex',
                                                            border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }

                                                            }}>
                                                            <div className='form_builder_heading_hover email-templates-wredd' style={{ width: '100%' }}>
                                                                <label>
                                                                    <div style={{
                                                                        fontSize: `${field.fontSize || ''}px`, width: field.width, opacity: field.opacity || 1,
                                                                        textAlign: field.textHeading, color: field.colorHeading,

                                                                    }}>
                                                                        {React.createElement(
                                                                            field.level || 'h1',
                                                                            {
                                                                                style: {
                                                                                    display: "inline-block",
                                                                                    width: "100%",
                                                                                    fontSize: `${field.fontSize || ''}px`,
                                                                                    lineHeight: `${field.headingLineheight || ''}px`
                                                                                }
                                                                            },
                                                                            null,
                                                                            field.headingText || field.text || 'Add Heading'
                                                                        )}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            <div
                                                                id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'description' && (
                                                        <div className={`input-field ${field.customClass || ''}`} style={{
                                                            width: field.width || '100%',
                                                            minHeight: `${field.textSize * 1.5 || 20}px`,
                                                            display: 'flex',
                                                            border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}>
                                                            <div className='form_builder_heading_hover' style={{ width: '100%' }}>
                                                                <label>
                                                                    <div className="description-field" style={{ paddingLeft: `${field.textPadding}px`, paddingRight: `${field.textPadding}px`, fontSize: `${field.textSize}px`, lineHeight: `${field.textlineheight}px`, color: field.textColor, textAlign: field.textAline, width: field.width, opacity: field.opacity || 1 }}
                                                                    >
                                                                        <p>{field.text}</p>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            {((selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)) && (
                                                                <div id='form-drag' className='form-builder-drag-drop'>
                                                                    <img src={drop} alt="Drag" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className='form-build-radio-wrp-options'>
                                                        {field.type === 'radio' && (
                                                            <div
                                                                className={`input-field ${field.customClass}`}
                                                                style={{
                                                                    width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                </label>
                                                                <div className='form-build-box' style={{
                                                                    width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                    borderStyle: inputstyle,
                                                                    borderColor: inputborderColor,
                                                                    backgroundColor: inputBgColor, opacity: field.opacity || 1
                                                                }}
                                                                >
                                                                    {field.options.map((option, index) => (
                                                                        <div key={option.id || index} className='form_radio_flex'>
                                                                            <input
                                                                                style={{
                                                                                    padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                                }}
                                                                                type="radio"
                                                                                name={field.name}
                                                                                value={option.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                            />
                                                                            <label>{option.label}</label>

                                                                        </div>
                                                                    ))
                                                                    }

                                                                </div>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'checkbox' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}

                                                            >
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}</label>{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                <div className='form-build-box' style={{
                                                                    width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                    borderStyle: inputstyle,
                                                                    borderColor: inputborderColor,
                                                                    backgroundColor: inputBgColor, opacity: field.opacity || 1
                                                                }}
                                                                >
                                                                    {field.options.map(option => (
                                                                        <div key={option.id} className='form_radio_flex'>
                                                                            <input
                                                                                style={{
                                                                                    padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                                }}
                                                                                type="checkbox"
                                                                                name={field.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                            />
                                                                            <label>{option.name}</label>

                                                                        </div>
                                                                    ))
                                                                    }

                                                                </div>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options select'>
                                                        {field.type === 'select' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div>
                                                                    <label style={{ color: labelColor }}>

                                                                        {field.label}</label>{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <select
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                        }}

                                                                        name={field.name}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        required={field.required}
                                                                    >
                                                                        <option disabled>{field.options.length === 0 ? 'Add Select Button' : ''}</option>
                                                                        {field.options.length > 0 && field.options.map((option, index) => (
                                                                            <option key={option.id} value={option.name}>
                                                                                {option.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>
                                                                    <div
                                                                        id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'textarea' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%",
                                                                maxWidth: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                                overflow: "hidden",
                                                            }}>

                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <textarea
                                                                        style={{
                                                                            width: '100%',
                                                                            maxWidth: '100%', borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                            resize: 'vertical'
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                        placeholder={field.placeholder}
                                                                        name={field.name}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        required={field.required}
                                                                        name="w3review" rows="4" cols="50"
                                                                    />
                                                                </label>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'file' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}>
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        {fileOptions[field.id] === 'option1' ? (
                                                                            <input
                                                                                style={{
                                                                                    width: '100%',
                                                                                    padding: field.inputPadding,
                                                                                    borderRadius: `${inputRadious}px`,
                                                                                    borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor,
                                                                                    opacity: field.opacity || 1,
                                                                                }}
                                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                type="file"
                                                                                name={field.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                                onClick={(e) => e.preventDefault()}
                                                                            />
                                                                        ) : fileOptions[field.id] === 'option2' ? (


                                                                            <div className="drag-and-drop-text third" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
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
                                                                        ) : fileOptions[field.id] === 'option3' ? (
                                                                            <div className="drag-and-drop-text first" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
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
                                                                        ) : null}

                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>
                                                                    <div
                                                                        id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'multi-file' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}>
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        {multiOptions[field.id] === 'option1' ? (
                                                                            <input
                                                                                style={{
                                                                                    width: '100%',
                                                                                    padding: field.inputPadding,
                                                                                    borderRadius: `${inputRadious}px`,
                                                                                    borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor,
                                                                                    opacity: field.opacity || 1,
                                                                                }}
                                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                type="file"
                                                                                name={field.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                                multiple
                                                                                onChange={handleFileChange5}
                                                                                onClick={(e) => e.preventDefault()}
                                                                            />
                                                                        ) : multiOptions[field.id] === 'option2' ? (
                                                                            <div className="drag-and-drop-text third multifile-second" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
                                                                                <div className='form-builder-chaneging-wrap file'>
                                                                                    <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                                    <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined }}>
                                                                                        <img src={multifile12} alt="" />
                                                                                        <div className='email-files drop'>
                                                                                            <h3 style={{
                                                                                                color: "#404b52",
                                                                                                fontSize: field.width === '25%' ? '11px' : undefined,
                                                                                                lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                            }}>Drag & drop files or <span style={{ color: '#14b25c', textDecoration: 'underline' }}>Browse</span></h3>
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
                                                                        ) : multiOptions[field.id] === 'option3' ? (
                                                                            <div className="drag-and-drop-text third  multifile-second" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
                                                                                <div className='form-builder-chaneging-wrap file multifile1 '>
                                                                                    <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                                    <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, textAlign: field.width === '25%' ? 'center' : undefined, }}>
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

                                                                        ) : null}
                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>
                                                                    <div
                                                                        id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>

                                                                {selectedFiles.length > 0 && (
                                                                    <div className="selected-files">
                                                                        <ul>
                                                                            {Array.from(selectedFiles).map((file, index) => (
                                                                                <li key={index}>{file.name}
                                                                                    <div style={{ cursor: 'pointer' }} onClick={() => handleRemoveFile(index)}>

                                                                                        <img src="https://cdn.shopify.com/s/files/1/0780/6255/1355/files/cancle1_1.png?v=1738132508" alt="" />
                                                                                    </div>

                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {field.type === 'number' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}
                                                                    {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        type="text"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onInput={(e) => {

                                                                            const sanitizedValue = e.target.value.replace(/[^\d]/g, '');
                                                                            e.target.value = sanitizedValue;
                                                                            updateFieldProperty('Number', sanitizedValue, field.id);
                                                                        }}
                                                                    />
                                                                </label>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>

                                                                <div
                                                                    id="form-drag"
                                                                    className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                >
                                                                    <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'email' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.emailRequid && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        type="email"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.emailRequid}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag"
                                                                    className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                >
                                                                    <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'phone' && (
                                                        <div className={`input-field phone-edit ${field.customClass}`} style={{
                                                            width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <PhoneInput
                                                                        country={'us'}
                                                                        value={field.value || ''}
                                                                        onChange={(value) => updateFieldProperty('phone', value, field.id)}
                                                                        inputProps={{
                                                                            name: field.name,
                                                                            required: field.required,
                                                                            disabled: field.disabled,
                                                                            readOnly: field.readonly,
                                                                        }}
                                                                        containerStyle={{
                                                                            width: '100%',
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        inputStyle={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            height: '50px'
                                                                        }}
                                                                        buttonStyle={{
                                                                            borderRadius: `${inputRadious}px`,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'password' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        type="password"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('password', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag"
                                                                    className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                >
                                                                    <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'url' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                            onMouseLeave={() => {
                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                    setHoveredFieldId(null);
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label}
                                                                    {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        type="url"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('url', e.target.value, field.id)}
                                                                    />
                                                                </label>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>

                                                                <div
                                                                    id="form-drag"
                                                                    className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                >
                                                                    <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'location' && (
                                                        <div className={`input-field ${field.customClass}`} style={{
                                                            width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}>
                                                            <div>
                                                                <label style={{ color: labelColor }}>

                                                                    {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            backgroundColor: inputBgColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                        type="location"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('location', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'toggle' && (
                                                        <div
                                                            className={`input-field ${field.customClass}`}
                                                            style={{
                                                                width: "100%",
                                                                border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                        >
                                                            <div className='form-build-toggle'
                                                                style={{ width: '100%', opacity: field.opacity || 1 }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div style={{ marginBottom: '5px', color: labelColor }}>{field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />} </div>
                                                                <label className="toggle-switch" style={{ color: labelColor }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={enabledFields[field.id] || false}
                                                                        onChange={() => toggleFieldEnabled(field.id)}
                                                                        name={field.name}
                                                                    />
                                                                    <span className="slider"></span>
                                                                </label>

                                                                {/* <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#33cba2' }}>
                                                                    {enabledFields[field.id] ? field.onValue || "On" : field.offValue || "Off"}
                                                                </div> */}

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'date' && (
                                                            <div
                                                                className={`input-field ${field.customClass}`}
                                                                style={{
                                                                    width: "100%",
                                                                    border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}
                                                                        {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        <input
                                                                            style={{
                                                                                width: '100%',
                                                                                padding: field.inputPadding,
                                                                                borderRadius: `${inputRadious}px`,
                                                                                borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor,
                                                                                backgroundColor: inputBgColor,
                                                                                opacity: field.opacity || 1,
                                                                            }}
                                                                            type="date"
                                                                            className="name"
                                                                            name={field.name}
                                                                            placeholder={field.placeholder}
                                                                            required={field.required}
                                                                            disabled={field.disabled}
                                                                            readOnly={field.readonly}
                                                                            onChange={(e) => updateFieldProperty('date', e.target.value, field.id)}
                                                                        />
                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>

                                                                    <div
                                                                        id="form-drag"
                                                                        className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                    >
                                                                        <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'datetime' && (
                                                            <div
                                                                className={`input-field ${field.customClass}`}
                                                                style={{
                                                                    width: "100%",
                                                                    border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}
                                                                        {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        <input
                                                                            style={{
                                                                                width: '100%',
                                                                                padding: field.inputPadding,
                                                                                borderRadius: `${inputRadious}px`,
                                                                                borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor,
                                                                                backgroundColor: inputBgColor,
                                                                                opacity: field.opacity || 1,
                                                                            }}
                                                                            type="datetime-local"
                                                                            className="name"
                                                                            name={field.name}
                                                                            placeholder={field.placeholder}
                                                                            required={field.required}
                                                                            disabled={field.disabled}
                                                                            readOnly={field.readonly}
                                                                            onChange={(e) => updateFieldProperty('datetime', e.target.value, field.id)}
                                                                        />
                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>

                                                                    <div
                                                                        id="form-drag"
                                                                        className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                    >
                                                                        <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'time' && (
                                                            <div
                                                                className={`input-field ${field.customClass}`}
                                                                style={{
                                                                    width: "100%",
                                                                    border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}
                                                                        {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        <input
                                                                            style={{
                                                                                width: '100%',
                                                                                padding: field.inputPadding,
                                                                                borderRadius: `${inputRadious}px`,
                                                                                borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor,
                                                                                backgroundColor: inputBgColor,
                                                                                opacity: field.opacity || 1,
                                                                            }}
                                                                            type="time"
                                                                            className="name"
                                                                            name={field.name}
                                                                            placeholder={field.placeholder}
                                                                            required={field.required}
                                                                            disabled={field.disabled}
                                                                            readOnly={field.readonly}
                                                                            onChange={(e) => updateFieldProperty('time', e.target.value, field.id)}
                                                                        />
                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>

                                                                    <div
                                                                        id="form-drag"
                                                                        className={`form-builder-drag-drop ${hoveredFieldId === field.id || (selectedField && selectedField.id === field.id) ? 'drag-active' : ''}`}
                                                                    >
                                                                        <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'slider' && (
                                                            <div
                                                                className={`input-field ${field.customClass}`}
                                                                style={{
                                                                    width: "100%",
                                                                    border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                    position: 'relative',
                                                                    padding: "0px 0px 15px",
                                                                }}
                                                            >
                                                                <div>
                                                                    <label style={{ color: labelColor }}>
                                                                        {field.label}
                                                                        {field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}

                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                                opacity: field.opacity || 1,
                                                                                borderRadius: `${inputRadious}px`,
                                                                                borderWidth: `${inputwidth}px`,
                                                                                position: 'relative'
                                                                            }}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => setHoveredFieldId(null)}
                                                                        >


                                                                            <input
                                                                                type="range"
                                                                                className="name"
                                                                                min={field.min}
                                                                                max={field.max}
                                                                                step={field.step}
                                                                                value={sliderValue}
                                                                                name={field.name}
                                                                                placeholder={field.placeholder}
                                                                                required={field.required}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                onChange={handleSliderChange}
                                                                                aria-label={field.label || "Slider"}
                                                                            />
                                                                        </div>
                                                                    </label>
                                                                    <span className="slider-value">{sliderValue}</span>
                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>

                                                                    <div id="form-drag" className="form-builder-drag-drop">
                                                                        <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'images' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}>
                                                                <div>
                                                                    <label style={{ color: labelColor }}>

                                                                        {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        {imageOptions[field.id] === 'option1' ? (
                                                                            <input
                                                                                style={{
                                                                                    width: '100%',
                                                                                    padding: field.inputPadding,
                                                                                    borderRadius: `${inputRadious}px`,
                                                                                    borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor,
                                                                                    opacity: field.opacity || 1,
                                                                                }}
                                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                type="file"
                                                                                name={field.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                                onClick={(e) => e.preventDefault()}
                                                                            />
                                                                        ) : imageOptions[field.id] === 'option2' ? (
                                                                            <div className="drag-and-drop-text third" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
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
                                                                        ) : imageOptions[field.id] === 'option3' ? (
                                                                            <div className="drag-and-drop-text first singleimages" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
                                                                                <div className='form-builder-chaneging-wrap file'>
                                                                                    <input type="file" accept="image/*" id='file-input-' style={{ display: 'none' }} />
                                                                                    <div className='form-builder-changes-file-wraped' style={{ padding: field.width === '25%' ? '20px' : undefined, gap: field.width === '25%' ? '10px' : undefined, }}>
                                                                                        <img src={singleimage1} style={{ width: field.width === '25%' ? '50px' : undefined }} />
                                                                                        <div className='email-files drop'
                                                                                            style={{
                                                                                                width: field.width === '25%' ? '100%' :
                                                                                                    field.width === '50%' ? '100%' :
                                                                                                        field.width === '75%' ? '38%' :
                                                                                                            field.width === '100%' ? '27%' :
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
                                                                        ) : null}
                                                                    </label>
                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>
                                                                    <div
                                                                        id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'multi-image' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}>
                                                                <div>
                                                                    <label style={{ color: labelColor }}>

                                                                        {field.label}{field.required && <img className='form-builder-wred-starr-requid' src={star} alt="Required Field" />}
                                                                        {multiimagesOptions[field.id] === 'option1' ? (
                                                                            <input
                                                                                style={{
                                                                                    width: '100%',
                                                                                    padding: field.inputPadding,
                                                                                    borderRadius: `${inputRadious}px`,
                                                                                    borderWidth: `${inputwidth}px`,
                                                                                    borderStyle: inputstyle,
                                                                                    borderColor: inputborderColor,
                                                                                    backgroundColor: inputBgColor,
                                                                                    opacity: field.opacity || 1,
                                                                                }}
                                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                type="file"
                                                                                name={field.name}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                required={field.required}
                                                                                multiple
                                                                                onChange={handleFileChange6}
                                                                                onClick={(e) => e.preventDefault()}
                                                                            />
                                                                        ) : multiimagesOptions[field.id] === 'option2' ? (
                                                                            <div className="drag-and-drop-text third multifile-second multi" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
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
                                                                        ) : multiimagesOptions[field.id] === 'option3' ? (
                                                                            <div className="drag-and-drop-text third  multifile-second multi-image" onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                                onMouseLeave={() => {
                                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                                        setHoveredFieldId(null);
                                                                                    }
                                                                                }}
                                                                                onClick={(e) => e.preventDefault()}
                                                                                style={{
                                                                                    border: (hoveredFieldId === field.id) ? '1px solid #33cba2' : '1px solid transparent',
                                                                                    backgroundColor: hoveredFieldId === field.id ? '#e7f9f4' : 'transparent',
                                                                                }}>
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
                                                                                                color: "#00ac4f", fontSize: field.width === '25%' ? '16px' : undefined,
                                                                                                lineHeight: field.width === '25%' ? '16px' : undefined,
                                                                                            }}>Browse file </span>  from your computer </span>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        ) : null}
                                                                    </label>

                                                                    <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                        {field.description}
                                                                    </div>
                                                                    <div
                                                                        id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                    </div>
                                                                </div>
                                                                {selectedimage.length > 0 && (
                                                                    <div className="selected-files">
                                                                        <ul>
                                                                            {Array.from(selectedimage).map((file, index) => (
                                                                                <li key={index}>{file.name}
                                                                                    <div style={{ cursor: 'pointer' }} onClick={() => handleRemoveimage(index)}>

                                                                                        <img src="https://cdn.shopify.com/s/files/1/0780/6255/1355/files/cancle1_1.png?v=1738132508" alt="" />
                                                                                    </div>

                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'button' && (
                                                            <div
                                                                className={`input-field btn ${field.customClass}`}
                                                                style={{
                                                                    width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                        ? '1px solid #33cba2'
                                                                        : '1px solid transparent',
                                                                    backgroundColor: selectedField && selectedField.id === field.id
                                                                        ? '#e7f9f4'
                                                                        : hoveredFieldId === field.id
                                                                            ? '#e7f9f4'
                                                                            : 'transparent',
                                                                }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}
                                                            >
                                                                <div className='fom-bilder-wred-btn' style={{ textAlign: field.buttonaline }}>
                                                                    <button
                                                                        type="button"
                                                                        style={{

                                                                            minWidth: `${Math.max(100, field.btnwidth)}px`,
                                                                            maxWidth: `${Math.min(800, Math.max(800, field.btnwidth))}px`,
                                                                            minHeight: field.buttonHeight,
                                                                            backgroundColor: field.backgroundColor,
                                                                            fontSize: `${field.buttontext || '16px'}px`,
                                                                            color: field.btncolor,
                                                                            padding: `${field.padding}px`,
                                                                            borderRadius: `${field.btnradious}px`,
                                                                            borderWidth: `${field.buttonBorderWidth}px`,
                                                                            borderStyle: field.buttonBorderStyle || 'solid',
                                                                            borderColor: field.buttonBorderColor || '#000',
                                                                        }}

                                                                    >
                                                                        {field.label}
                                                                    </button>
                                                                </div>

                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                    {field.description}
                                                                </div>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'divider' && (
                                                            <div className={`input-field ${field.customClass}`} style={{
                                                                width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                    ? '1px solid #33cba2'
                                                                    : '1px solid transparent',
                                                                backgroundColor: selectedField && selectedField.id === field.id
                                                                    ? '#e7f9f4'
                                                                    : hoveredFieldId === field.id
                                                                        ? '#e7f9f4'
                                                                        : 'transparent',
                                                            }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}>
                                                                <label style={{ color: labelColor }}>

                                                                    {/* {field.label || "divider"} */}
                                                                    <div style={{ justifyContent: field.dividerAline, display: "flex" }}>
                                                                        <hr style={{ margin: '20px 0', border: `1px solid ${field.dividerColor}`, width: field.dividerWidth }} />
                                                                        <div className='description' style={{ minHeight: `${maxDescriptionHeight}px` }}>
                                                                            {field.description}
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                                <div
                                                                    id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                                </div>
                                                            </div>

                                                        )}
                                                    </div>

                                                    {field.type === 'link' && (
                                                        <div className={`input-field ${field.customClass}`} style={{
                                                            minHeight: `${field.linkfontsize * 1.8 || 24}px`,
                                                            padding: "5px",
                                                            display: "flex",
                                                            width: "100%", border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
                                                                ? '1px solid #33cba2'
                                                                : '1px solid transparent',
                                                            backgroundColor: selectedField && selectedField.id === field.id
                                                                ? '#e7f9f4'
                                                                : hoveredFieldId === field.id
                                                                    ? '#e7f9f4'
                                                                    : 'transparent',
                                                        }}>
                                                            <div style={{ display: 'block', width: '100%' }}>
                                                                <div style={{ width: "100%", textAlign: field.linkaline, fontSize: `${field.linkfontsize}px` }}>
                                                                    <a href={field.linkUrl} target={field.linkTarget} rel="noopener noreferrer">
                                                                        <div onClick={(e) => e.preventDefault()} dangerouslySetInnerHTML={{ __html: field.linktext }} />
                                                                    </a>
                                                                </div>
                                                                <div className='description' style={{ minHeight: `${maxDescriptionHeight}px`, marginTop: `${field.linkfontsize * 0.5 || 0.5}px`, }}>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                            <div
                                                                id="form-drag" className={`form-builder-drag-drop`} > <img src={drop} alt="Drag" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {(hoveredFieldId === field.id || (selectedField && selectedField.id === field.id)) && (
                                                        <div>
                                                            <div className='form-builder-radio-btn'>
                                                                <button className="copy-btn edit" onClick={() => handleFieldClick(field, index)}>
                                                                    <img src={edit} alt="copy" />
                                                                </button>
                                                                <button
                                                                    className="remove-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeField(field.id);
                                                                    }}>
                                                                    <img src={delete1} alt="delete" />
                                                                </button>
                                                                <button className="copy-btn " onClick={() => handleCopyField(field.id)}>
                                                                    <img src={maximizesize} alt="copy" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })) : (
                                            <div className="builder-block-img-forms">
                                                <div className='builder_block_blank'>
                                                    <img src={vecter1} alt="" />
                                                    <div className='builder-block-img-forms-paragraph'>
                                                        <p>Let's create the Forms.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {showFieldPro && (
                                <div className='form-builder-change-pro form'>
                                    <div className='controls-wrpping cancleimg pro' onClick={hanldeCanclepro}><img src={cancleimg} alt="" /></div>
                                    <div className="form-builder-change-propertites change-form " ref={propertiesPanelRef} style={{ display: isPropertiesVisible ? 'block' : 'none' }}>
                                        {selectedField && (
                                            <div className='form-build-wrpped propertites-forms'>
                                                <div className='form-builder-change_show_all'>

                                                    <div className='form_qucik forms-set'>
                                                        <p>Quick setup Settings</p>
                                                    </div>
                                                    <div className='form-build-wrp-settings-right'>
                                                        <div className='form_build_propertities forms '>
                                                            {selectedField.type !== 'heading' && selectedField.type !== 'divider' && selectedField.type !== 'button' && selectedField.type !== 'description' && selectedField.type !== 'link' && (
                                                                <div className="form-builder-chaneging-wrap">
                                                                    <label>Label</label>
                                                                    <input
                                                                        type="text"
                                                                        value={selectedField.label}
                                                                        onChange={(e) => updateFieldProperty('label', e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                            {selectedField.type === 'slider' && (
                                                                <div className="slider-settings">
                                                                    <div className="form-builder-chaneging-wrap sliders">
                                                                        <label>Min:</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.min}
                                                                            onChange={(e) => updateFieldProperty('min', e.target.value, selectedField.id)}
                                                                            min={0}
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap sliders">
                                                                        <label>Max:</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.max}
                                                                            onChange={(e) => updateFieldProperty('max', e.target.value, selectedField.id)}
                                                                            min={0}
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap sliders">
                                                                        <label>Step:</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.step}
                                                                            onChange={(e) => updateFieldProperty('step', e.target.value, selectedField.id)}
                                                                            min={0}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {selectedField.type === 'name' && (
                                                                <div className='form_build_name_custom'>
                                                                    <select onChange={(e) => {
                                                                        const newLabel = e.target.value;
                                                                        updateFieldProperty('label', newLabel);
                                                                    }}>
                                                                        <option value="Full name">Full name</option>
                                                                        <option value="First name">First name</option>
                                                                        <option value="Last name">Last name</option>
                                                                    </select>
                                                                </div>
                                                            )}
                                                            {selectedField.type === 'select' && (
                                                                <div className="popup-content">
                                                                    {selectOptions.map((option, index) => (
                                                                        <div key={option.id} className="select-option">
                                                                            <label style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <input
                                                                                    type="text"
                                                                                    value={option.name}
                                                                                    onChange={(e) => handleOptionNameChangees(index, e.target.value, 'select')}
                                                                                    placeholder={`Enter option name`}
                                                                                />
                                                                            </label>
                                                                            <button onClick={() => removeSelectOption(option.id)} className="remove-options"> <img src={remove} alt="" /></button>
                                                                        </div>
                                                                    ))}
                                                                    <button className='btn-design' onClick={addSelectOption}>Add Select Input</button>

                                                                </div>
                                                            )}
                                                            {selectedField.type === 'radio' && (
                                                                <div>
                                                                    {radioOptions.map((option, index) => (
                                                                        <div key={option.id} className="radio-option">
                                                                            <label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={option.label}
                                                                                    onChange={(e) => handleOptionNameChange(index, e.target.value)}
                                                                                    placeholder={`Enter option name`}
                                                                                />
                                                                            </label>
                                                                            <button onClick={() => removeRadioOption(option.id)} className="remove-options"><img src={remove} alt="" /></button>
                                                                        </div>
                                                                    ))}
                                                                    <button className='btn-design' onClick={addRadioOption}>Add Radio Button</button>

                                                                </div>
                                                            )}

                                                            {selectedField.type === 'checkbox' && (
                                                                <div>
                                                                    <div className="popup-content">
                                                                        {checkboxOptions.map((option, index) => (
                                                                            <div key={option.id} className="checkbox-option check">
                                                                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={option.name}
                                                                                        onChange={(e) => handleOptionNameChanges(index, e.target.value)}
                                                                                        placeholder={`Enter option name`}

                                                                                    />

                                                                                </label>
                                                                                <button onClick={() => removeCheckboxOption(option.id)} className="remove-options"><img src={remove} alt="" /></button>
                                                                            </div>
                                                                        ))}
                                                                        <button className='btn-design' onClick={addCheckboxOption}>Add Checkbox Button</button>

                                                                    </div>
                                                                </div>
                                                            )}
                                                            {selectedField.type === 'divider' && (
                                                                <>
                                                                    <div className="checkbox-option bg-colors">
                                                                        <label>Divider Color</label>
                                                                        <div className="color-picker-container">
                                                                            <span className="color-code">{selectedField.dividerColor}</span>
                                                                            <input
                                                                                type="color"
                                                                                value={selectedField.dividerColor}
                                                                                onChange={(e) => updateFieldProperty('dividerColor', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Divider Width</label>
                                                                        <select
                                                                            value={selectedField.dividerWidth}
                                                                            onChange={(e) => updateFieldProperty('dividerWidth', e.target.value)}
                                                                        >
                                                                            <option value="25%">25%</option>
                                                                            <option value="50%">50%</option>
                                                                            <option value="75%">75%</option>
                                                                            <option value="100%">100%</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Divider Position</label>
                                                                        <select
                                                                            value={selectedField.dividerAline}
                                                                            onChange={(e) => updateFieldProperty('dividerAline', e.target.value, selectedField.id)}
                                                                        >
                                                                            <option value="">Select text align</option>
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>
                                                                </>
                                                            )}


                                                            {selectedField.type === 'button' && (
                                                                <>
                                                                    <div className="form-builder-changing-wrap">
                                                                        <div>

                                                                            <div className='checkbox-option'>
                                                                                <label>Button Label</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={selectedField.label}
                                                                                    onChange={(e) => updateFieldProperty('label', e.target.value)}
                                                                                />
                                                                            </div>

                                                                            <div className='checkbox-option'>
                                                                                <label>Font Size (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.buttontext}
                                                                                    onChange={(e) => updateFieldProperty('buttontext', e.target.value)}
                                                                                    min={0}
                                                                                />
                                                                            </div>
                                                                            <div className='checkbox-option bg-colors'>
                                                                                <label> Text-color</label>
                                                                                <div className="color-picker-container">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="color-code"
                                                                                        value={selectedField.btncolor || '#ffffff'}
                                                                                        readOnly
                                                                                        onClick={(e) => {
                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                        }}
                                                                                        onPaste={(e) => {
                                                                                            const pastedText = e.clipboardData.getData('text');
                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                updateFieldProperty('btncolor', pastedText);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <input
                                                                                        type="color"
                                                                                        value={selectedField.btncolor}
                                                                                        onChange={(e) => updateFieldProperty('btncolor', e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-builder-chaneging-wrap">
                                                                                <label>Button Position</label>
                                                                                <select
                                                                                    value={selectedField.buttonaline}
                                                                                    onChange={(e) => updateFieldProperty('buttonaline', e.target.value, selectedField.id)}
                                                                                >
                                                                                    <option value="">Select Button alignment</option>
                                                                                    <option value="left">Left</option>
                                                                                    <option value="center">Center</option>
                                                                                    <option value="right">Right</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className='checkbox-option'>
                                                                                <label>Button Padding (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.padding}
                                                                                    onChange={(e) => updateFieldProperty('padding', e.target.value)}
                                                                                    placeholder="e.g., 10px"
                                                                                    min={0}
                                                                                />
                                                                            </div>
                                                                            <div className='checkbox-option'>
                                                                                <label>Button Radius (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.btnradious}
                                                                                    onChange={(e) => updateFieldProperty('btnradious', e.target.value)}
                                                                                    placeholder="e.g., 4px"
                                                                                    min={0}
                                                                                />
                                                                            </div>
                                                                            <div className='checkbox-option'>
                                                                                <label>Width (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.btnwidth}
                                                                                    onChange={(e) => updateFieldProperty('btnwidth', e.target.value)}
                                                                                    placeholder="e.g., 150"
                                                                                    min={0}
                                                                                    max={500}
                                                                                />
                                                                            </div>
                                                                            <div className='checkbox-option'>
                                                                                <label>Height (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.buttonHeight ? selectedField.buttonHeight.replace('px', '') : '40'}
                                                                                    onChange={(e) => updateFieldProperty('buttonHeight', `${e.target.value}px`)}
                                                                                    placeholder="e.g., 40"
                                                                                    min={0}
                                                                                />
                                                                            </div>
                                                                            <div className="checkbox-option bg-colors">
                                                                                <label>Background Color</label>
                                                                                <div className="color-picker-container">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="color-code"
                                                                                        value={selectedField.backgroundColor || '#ffffff'}
                                                                                        readOnly
                                                                                        onClick={(e) => {
                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                        }}
                                                                                        onPaste={(e) => {
                                                                                            const pastedText = e.clipboardData.getData('text');
                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                updateFieldProperty('backgroundColor', pastedText);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <input
                                                                                        type="color"
                                                                                        value={selectedField.backgroundColor}
                                                                                        onChange={(e) => updateFieldProperty('backgroundColor', e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="checkbox-option bg-colors">
                                                                                <label>Border Color</label>
                                                                                <div className="color-picker-container">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="color-code"
                                                                                        value={selectedField.buttonBorderColor || '#ffffff'}
                                                                                        readOnly
                                                                                        onClick={(e) => {
                                                                                            navigator.clipboard.writeText(e.target.value);
                                                                                        }}
                                                                                        onPaste={(e) => {
                                                                                            const pastedText = e.clipboardData.getData('text');
                                                                                            if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                                updateFieldProperty('buttonBorderColor', pastedText);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <input
                                                                                        type="color"
                                                                                        value={selectedField.buttonBorderColor}
                                                                                        onChange={(e) => updateFieldProperty('buttonBorderColor', e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='form-builder-chaneging-wrap number'>
                                                                                <label>Border Width (px)</label>
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.buttonBorderWidth}
                                                                                    onChange={(e) => {
                                                                                        updateFieldProperty('buttonBorderWidth', `${e.target.value}`);
                                                                                    }}
                                                                                    min={0}
                                                                                />
                                                                            </div>

                                                                            <div className='form-builder-chaneging-wrap'>
                                                                                <label>Border Style</label>
                                                                                <select
                                                                                    value={selectedField.buttonBorderStyle}
                                                                                    onChange={(e) => updateFieldProperty('buttonBorderStyle', e.target.value)}
                                                                                >
                                                                                    <option value="solid">Solid</option>
                                                                                    <option value="dashed">Dashed</option>
                                                                                    <option value="dotted">Dotted</option>
                                                                                    <option value="double ">Double </option>
                                                                                </select>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {selectedField.type === 'link' && (
                                                                <div className="form-builder-chaneging-wrap">
                                                                    <div className='form-builder-chaneging-wrap ' style={{ color: 'black' }}>
                                                                        <label>Link text</label>
                                                                        <ReactQuill
                                                                            value={selectedField.linktext}
                                                                            onChange={(value) => updateFieldProperty('linktext', value, selectedField.id)}
                                                                            modules={{
                                                                                toolbar: [
                                                                                    ['bold', 'italic', 'underline'],
                                                                                    ['link'],
                                                                                ],
                                                                            }}
                                                                            placeholder="Enter the URL"
                                                                        />
                                                                    </div>
                                                                    <div className='form-builder-chaneging-wrap'>
                                                                        <label>Link URL</label>
                                                                        <input
                                                                            type="text"
                                                                            value={selectedField.linkUrl || ''}
                                                                            onChange={(e) => updateFieldProperty('linkUrl', e.target.value, selectedField.id)}
                                                                            placeholder="Enter the URL"
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label>
                                                                            Font Size (px):
                                                                            <input
                                                                                type="number"
                                                                                value={selectedField.linkfontsize}
                                                                                onChange={(e) => updateFieldProperty('linkfontsize', e.target.value, selectedField.id)}
                                                                                min={0}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                    <div className='form-builder-chaneging-wrap'>
                                                                        <label>Text Align</label>
                                                                        <select
                                                                            name="textAlign"
                                                                            id="textAlign"
                                                                            value={selectedField.linkaline}
                                                                            onChange={(e) => updateFieldProperty('linkaline', e.target.value, selectedField.id)}
                                                                        >
                                                                            <option value="">Select text align</option>
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='form-builder-chaneging-wrap'>
                                                                        <label>Open in</label>
                                                                        <select
                                                                            name="linkTarget"
                                                                            id="linkTarget"
                                                                            value={selectedField.linkTarget}
                                                                            onChange={(e) => updateFieldProperty('linkTarget', e.target.value, selectedField.id)}
                                                                        >
                                                                            <option value="_self">Same Tab</option>
                                                                            <option value="_blank">New Tab</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            )}

                                                            {selectedField.type === 'heading' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Heading Level</label>
                                                                        <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
                                                                            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
                                                                                <option key={level} value={level}>{level.toUpperCase()}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Heading Text</label>
                                                                        <input
                                                                            type="text"
                                                                            value={headingText}
                                                                            onChange={(e) => setHeadingText(e.target.value)}
                                                                        />
                                                                        <div className="form-builder-chaneging-wrap number">
                                                                            <label>
                                                                                Font Size (px):
                                                                                <input
                                                                                    type="number"
                                                                                    value={headingFontSize} px
                                                                                    onChange={(e) => setHeadingFontSize(e.target.value)}
                                                                                    min={0}
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-builder-chaneging-wrap number">
                                                                            <label>
                                                                                Line Height (px):
                                                                                <input
                                                                                    type="number"
                                                                                    value={selectedField.headingLineheight}
                                                                                    onChange={(e) => updateFieldProperty('headingLineheight', e.target.value, selectedField.id)}
                                                                                    min={0}
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Text Align </label>
                                                                        <select
                                                                            value={selectedField.textHeading}
                                                                            onChange={(e) => updateFieldProperty('textHeading', e.target.value, selectedField.id)}
                                                                        >
                                                                            <option value="">Select text align</option>
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='checkbox-option bg-colors'>
                                                                        <label> Color</label>
                                                                        <div className="color-picker-container">

                                                                            <input
                                                                                type="text"
                                                                                className="color-code"
                                                                                value={selectedField.colorHeading || '#00000'}
                                                                                readOnly
                                                                                onClick={(e) => {
                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                }}
                                                                                onPaste={(e) => {
                                                                                    const pastedText = e.clipboardData.getData('text');
                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                        updateFieldProperty('colorHeading', pastedText);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <input
                                                                                type="color"
                                                                                value={selectedField.colorHeading}
                                                                                onChange={(e) => updateFieldProperty('colorHeading', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )}
                                                            {selectedField.type === 'description' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Description Text</label>
                                                                        <textarea
                                                                            style={{ resize: 'vertical' }}
                                                                            value={descriptionText}
                                                                            onChange={(e) => setDescriptionText(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label>Font-Size:</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.textSize}
                                                                            onChange={(e) => updateFieldProperty('textSize', e.target.value, selectedField.id)}
                                                                            min='0'
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label>Padding (Left & Right):</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.textPadding}
                                                                            onChange={(e) => updateFieldProperty('textPadding', e.target.value, selectedField.id)}
                                                                            min='0'
                                                                        />
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label>Line-Height:</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.textlineheight}
                                                                            onChange={(e) => updateFieldProperty('textlineheight', e.target.value, selectedField.id)}
                                                                            min='0'
                                                                        />
                                                                    </div>

                                                                    <div className='checkbox-option bg-colors'>
                                                                        <label> Color</label>
                                                                        <div className="color-picker-container">

                                                                            <input
                                                                                type="text"
                                                                                className="color-code"
                                                                                value={selectedField.textColor || '#ffffff'}
                                                                                readOnly
                                                                                onClick={(e) => {
                                                                                    navigator.clipboard.writeText(e.target.value);
                                                                                }}
                                                                                onPaste={(e) => {
                                                                                    const pastedText = e.clipboardData.getData('text');
                                                                                    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
                                                                                        updateFieldProperty('textColor', pastedText, selectedField.id);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <input
                                                                                type="color"
                                                                                value={selectedField.textColor}
                                                                                onChange={(e) => updateFieldProperty('textColor', e.target.value, selectedField.id)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Text Align </label>
                                                                        <select
                                                                            value={selectedField.textAline}
                                                                            onChange={(e) => updateFieldProperty('textAline', e.target.value, selectedField.id)}
                                                                        >
                                                                            <option value="">Select text align</option>
                                                                            <option value="left">Left</option>
                                                                            <option value="center">Center</option>
                                                                            <option value="right">Right</option>
                                                                        </select>
                                                                    </div>

                                                                </>
                                                            )}
                                                            {selectedField.type !== 'multi-image' && selectedField.type !== 'multi-file' && selectedField.type !== 'date' && selectedField.type !== 'datetime' && selectedField.type !== 'time' && selectedField.type !== 'phone' && selectedField.type !== 'images' && selectedField.type !== 'file' && selectedField.type !== 'divider' && selectedField.type !== 'slider' && selectedField.type !== 'toggle' && selectedField.type !== 'heading' && selectedField.type !== 'description' && selectedField.type !== 'button' && selectedField.type !== 'radio' && selectedField.type !== 'checkbox' && selectedField.type !== 'select' && selectedField.type !== 'link' && (<div className="form-builder-chaneging-wrap">
                                                                <label>Placeholder</label>
                                                                <input
                                                                    type="text"
                                                                    value={selectedField.placeholder}
                                                                    onChange={(e) => updateFieldProperty('placeholder', e.target.value)}
                                                                />
                                                            </div>
                                                            )}
                                                            {selectedField.type !== 'heading' && selectedField.type !== 'button' && selectedField.type !== 'description' && (
                                                                <div className="form-builder-chaneging-wrap">
                                                                    <label>Description</label>
                                                                    <textarea
                                                                        value={selectedField.description}
                                                                        onChange={(e) => updateFieldProperty('description', e.target.value)}
                                                                        style={{ wordBreak: 'break-word', width: '100%', minHeight: '50px', resize: 'vertical' }}
                                                                    />
                                                                </div>
                                                            )}
                                                            {selectedField.type !== 'divider' & selectedField.type !== 'heading' && selectedField.type !== 'button' && selectedField.type !== 'description' && (
                                                                <div className="form-builder-chaneging-wrap">
                                                                    <label>Input Width</label>
                                                                    <select
                                                                        value={selectedField.width}
                                                                        onChange={(e) => updateFieldProperty('width', e.target.value)}
                                                                    >
                                                                        <option value="25%">25%</option>
                                                                        <option value="50%">50%</option>
                                                                        <option value="75%">75%</option>
                                                                        <option value="100%">100%</option>
                                                                    </select>
                                                                </div>
                                                            )}
                                                            <div className="form-builder-chaneging-wrap">
                                                                <label>Custom Class</label>
                                                                <input
                                                                    type="text"
                                                                    value={selectedField?.customClass || ''}
                                                                    onChange={(e) => updateFieldProperty('customClass', e.target.value)}
                                                                />
                                                            </div>
                                                            {selectedField.type === 'toggle' && (
                                                                <div className="form-builder-chaneging-wrap">
                                                                    <label>Values</label>
                                                                    <div className="toggle-values">
                                                                        <div className='toggle-buttons-wrap'>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="On Value"
                                                                                value={selectedField.onValue || ''}
                                                                                onChange={(e) => handleChange('onValue', e.target.value)}
                                                                            />
                                                                            <button
                                                                                className={`toogle-btn-wraped ${selectedField.onActive === 'active' ? 'active' : ''}`}
                                                                                type="button"
                                                                                onClick={() => handleSetValue('onActive')}
                                                                            >
                                                                                On
                                                                            </button>
                                                                        </div>
                                                                        <div className='toggle-buttons-wrap'>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Off Value"
                                                                                value={selectedField.offValue || ''}
                                                                                onChange={(e) => handleChange('offValue', e.target.value)}
                                                                            />
                                                                            <button
                                                                                className={`toogle-btn-wraped ${selectedField.offActive === 'active' ? 'active' : ''}`}
                                                                                type="button"
                                                                                onClick={() => handleSetValue('offActive')}
                                                                            >
                                                                                Off
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {selectedField.type === 'password' && (
                                                                <div className='form-builder-chaneging-wrap password-wrapped'>
                                                                    <label>Password Options</label>
                                                                    <div className="form-builder-chaneging-wrap number password-creater character">
                                                                        <div className="form-builder-chaneging-wrap-lable-passwoerd">
                                                                            <label>Min Character</label>
                                                                            <p>Enter at least 6 characters</p>
                                                                        </div>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.passwordCharacter || ""}
                                                                            onChange={(e) => {
                                                                                const newValue = e.target.value;
                                                                                const numericValue = Number(newValue);

                                                                                if (newValue === "") {

                                                                                    updateFieldProperty("passwordCharacter", "");
                                                                                } else if (!isNaN(numericValue)) {
                                                                                    if (numericValue < 6) {
                                                                                        setPasswordpopup(true);
                                                                                        updateFieldProperty("passwordCharacter", 6);
                                                                                    } else if (numericValue > 100) {
                                                                                        updateFieldProperty("passwordCharacter", 100);
                                                                                    } else {
                                                                                        updateFieldProperty("passwordCharacter", numericValue);
                                                                                    }
                                                                                }
                                                                            }}
                                                                            min="6"
                                                                            max="100"
                                                                        />
                                                                    </div>

                                                                    <div className="form-builder-chaneging-wrap number password-creater">
                                                                        <div className='form-builder-chaneging-wrap-lable-passwoerd'>
                                                                            <label>Enable/Disable strong password</label>
                                                                            <p>e.g of password (AxvNEn@9)</p></div>
                                                                        <div className='form-builder-chaneging-addbtn-pass'>
                                                                            <div className='form-builder-storng-btn'>
                                                                                <label className="switch-form-builder">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={passwordStatus === 'on'}
                                                                                        onChange={handleToggle}
                                                                                    />
                                                                                    <span className="slider-switch-form-builder round"></span>
                                                                                </label>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {selectedField.type === 'file' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label htmlFor="">Choose your style</label>
                                                                        <div className='form-builder-chaneging-file-options'>
                                                                            <span
                                                                                className={`file-option basic ${fileOptions[selectedField.id] === 'option1' ? 'active' : ''}`}
                                                                                onClick={() => handleFileOptionChange(selectedField.id, 'option1')}
                                                                            >
                                                                                Basic
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro ${fileOptions[selectedField.id] === 'option2' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro', 'pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleFileOptionChange(selectedField.id, 'option2');
                                                                                }}
                                                                            >
                                                                                Pro
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro-plus ${fileOptions[selectedField.id] === 'option3' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleFileOptionChange(selectedField.id, 'option3')
                                                                                }}
                                                                            >
                                                                                Pro +
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )}

                                                            {selectedField.type === 'multi-file' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label htmlFor="">Choose your style</label>
                                                                        <div className='form-builder-chaneging-file-options'>
                                                                            <span
                                                                                className={`file-option basic ${multiOptions[selectedField.id] === 'option1' ? 'active' : ''}`}
                                                                                onClick={() => handleMultiOptionChange(selectedField.id, 'option1')}
                                                                            >
                                                                                Basic
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro ${multiOptions[selectedField.id] === 'option2' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro', 'pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleMultiOptionChange(selectedField.id, 'option2')
                                                                                }}
                                                                            >
                                                                                Pro
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro-plus ${multiOptions[selectedField.id] === 'option3' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleMultiOptionChange(selectedField.id, 'option3')
                                                                                }}
                                                                            >
                                                                                Pro +
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )}

                                                            {selectedField.type === 'images' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label htmlFor="">Choose your style</label>
                                                                        <div className='form-builder-chaneging-file-options'>
                                                                            <span
                                                                                className={`file-option basic ${imageOptions[selectedField.id] === 'option1' ? 'active' : ''}`}
                                                                                onClick={() => handleImageOptionChange(selectedField.id, 'option1')}
                                                                            >
                                                                                Basic
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro ${imageOptions[selectedField.id] === 'option2' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro', 'pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleImageOptionChange(selectedField.id, 'option2')
                                                                                }}
                                                                            >
                                                                                Pro
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro-plus ${imageOptions[selectedField.id] === 'option3' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleImageOptionChange(selectedField.id, 'option3')
                                                                                }}
                                                                            >
                                                                                Pro +
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )}

                                                            {selectedField.type === 'multi-image' && (
                                                                <>
                                                                    <div className="form-builder-chaneging-wrap number">
                                                                        <label htmlFor="">Choose your style</label>
                                                                        <div className='form-builder-chaneging-file-options'>
                                                                            <span
                                                                                className={`file-option basic ${multiimagesOptions[selectedField.id] === 'option1' ? 'active' : ''}`}
                                                                                onClick={() => handleMultiImagesOptionChange(selectedField.id, 'option1')}
                                                                            >
                                                                                Basic
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro ${multiimagesOptions[selectedField.id] === 'option2' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro', 'pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleMultiImagesOptionChange(selectedField.id, 'option2')
                                                                                }}
                                                                            >
                                                                                Pro
                                                                            </span>

                                                                            <span
                                                                                className={`file-option pro-plus ${multiimagesOptions[selectedField.id] === 'option3' ? 'active' : ''}`}
                                                                                onClick={() => {
                                                                                    if (!['pro_plus', 'pro_yearly'].includes(userPlan?.activePlan?.plan)) {
                                                                                        setUphradePopup(true);
                                                                                        return;
                                                                                    }
                                                                                    handleMultiImagesOptionChange(selectedField.id, 'option3')
                                                                                }}
                                                                            >
                                                                                Pro +
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            )}
                                                        </div>
                                                        {selectedField.type !== 'heading' && selectedField.type !== 'description' && selectedField.type !== 'button' && selectedField.type !== 'divider' && selectedField.type !== 'link' && (
                                                            <div className='form_builder_option_select'>
                                                                <h3>Options</h3>
                                                                <div className='form-builder-options-container'>
                                                                    {selectedField.type === 'file' && (
                                                                        <>
                                                                            <div className="form-builder-chaneging-wrap">
                                                                                <label>File Preview</label>
                                                                                <div className='form-builder-chaneging-addbtn-pass'>
                                                                                    <div className='form-builder-storng-btn'>
                                                                                        <label className="toggle-switch">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={ImagePreview[selectedField.id] === 'on'}
                                                                                                onChange={() => handleToggleImagePreview(selectedField.id)}
                                                                                            />
                                                                                            <span className="slider"></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}

                                                                    {selectedField.type === 'multi-file' && (
                                                                        <>
                                                                            <div className="form-builder-chaneging-wrap">
                                                                                <label>File Preview</label>
                                                                                <div className='form-builder-chaneging-addbtn-pass'>
                                                                                    <div className='form-builder-storng-btn'>
                                                                                        <label className="toggle-switch">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={multifilePreview[selectedField.id] === 'on'}
                                                                                                onChange={() => handleToggleMiltiPreview(selectedField.id)}

                                                                                            />
                                                                                            <span className="slider"></span>
                                                                                        </label>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {selectedField.type === 'images' && (
                                                                        <>
                                                                            <div className="form-builder-chaneging-wrap">
                                                                                <label>Image Preview</label>
                                                                                <div className='form-builder-chaneging-addbtn-pass'>
                                                                                    <div className='form-builder-storng-btn'>
                                                                                        <label className="toggle-switch">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={signlePreview[selectedField.id] === 'on'}
                                                                                                onChange={() => handleToggleSinglePreview(selectedField.id)}

                                                                                            />
                                                                                            <span className="slider"></span>
                                                                                        </label>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}

                                                                    {selectedField.type === 'multi-image' && (
                                                                        <>
                                                                            <div className="form-builder-chaneging-wrap">
                                                                                <label>Image Preview</label>
                                                                                <div className='form-builder-chaneging-addbtn-pass'>
                                                                                    <div className='form-builder-storng-btn'>
                                                                                        <label className="toggle-switch">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={multiIamgePreview[selectedField.id] === 'on'}
                                                                                                onChange={() => handleToggleMultiPreview(selectedField.id)}

                                                                                            />
                                                                                            <span className="slider"></span>
                                                                                        </label>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {selectedField.type !== 'email' && (
                                                                        <div className="form-builder-chaneging-wrap">
                                                                            <label>Required</label>
                                                                            <label className="toggle-switch">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={selectedField?.required || false}
                                                                                    onChange={(e) => updateFieldProperty('required', e.target.checked)}
                                                                                />
                                                                                <span className="slider"></span>
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                    {selectedField.type === 'email' && (
                                                                        <div className="form-builder-chaneging-wrap">
                                                                            <label>Required</label>
                                                                            <label className="toggle-switch">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={selectedField?.emailRequid || false}
                                                                                    onChange={(e) => updateFieldProperty('emailRequid', e.target.checked)}
                                                                                />
                                                                                <span className="slider"></span>
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Disabled</label>
                                                                        <label className="toggle-switch">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedField?.disabled || false}
                                                                                onChange={(e) => updateFieldProperty('disabled', e.target.checked)}
                                                                            />
                                                                            <span className="slider"></span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-builder-chaneging-wrap">
                                                                        <label>Readonly</label>
                                                                        <label className="toggle-switch">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedField?.readonly || false}
                                                                                onChange={(e) => updateFieldProperty('readonly', e.target.checked)}
                                                                            />
                                                                            <span className="slider"></span>
                                                                        </label>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>)}
                        </div>
                        <ConfirmationPopup
                            isVisible={showConfirmationPopup}
                            onClose={handleCancelStatusChange}
                            onConfirm={handleStatusChange}
                        />
                        <CancelPopup
                            isVisible={showCancelPopup}
                            onClose={handleCancelStatusChange}
                            onConfirm={handleStatusChange}
                        />


                    </div>
                </div>

            </div>

            <div className='form-builder-wrap-popup-inputs'>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className='radio-popup-options'>
                                <h4>Configure Radio Button </h4>
                                {radioOptions.map((option, index) => (
                                    <div key={option.id} className="radio-option">

                                        <label style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="radio"
                                                name="radioOption"
                                                value={option.label}
                                                checked={selectedOption === option.name}
                                                onChange={handleRadioOptionChange}
                                                className='selected-option'
                                            />
                                            <input
                                                type="text"
                                                value={option.label}
                                                onChange={(e) => handleOptionNameChange(index, e.target.value)}
                                                placeholder={`Enter option name`}
                                                style={{ marginLeft: '8px' }}
                                            />
                                            <button onClick={() => removeRadioOption(option.id)} className="remove-options"><img src={removee} alt="" /></button>
                                        </label>

                                    </div>
                                ))}
                                <button onClick={addRadioOption}>Add Radio Button</button>
                                <button onClick={handleAddRadioOptions}>Save</button>
                                <button className='heading_cancle' onClick={() => setShowPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {showCheckboxPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className='radio-popup-options'>
                                <h2>Checkbox Options</h2>
                                {checkboxOptions.map((option, index) => (
                                    <div key={option.id} className="checkbox-option">
                                        <label style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                name="checkboxOption"
                                                value={option.name}
                                                checked={selectedOption === option.name}
                                                onChange={handleRadioOptionChange}
                                            />
                                            <input
                                                type="text"
                                                value={option.name}
                                                onChange={(e) => handleOptionNameChanges(index, e.target.value, 'checkbox')}
                                                placeholder={`Enter option name`}
                                                style={{ marginLeft: '8px' }}
                                            />
                                            <button onClick={() => removeCheckboxOption(option.id)} className="remove-options"><img src={removee} alt="" /></button>
                                        </label>
                                    </div>
                                ))}
                                <button onClick={addCheckboxOption}>Add Checkbox Button</button>
                                <button onClick={handleAddCheckboxOptions}>Save</button>
                                <button className='heading_cancle' onClick={() => setShowCheckboxPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                {showSelectPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className='radio-popup-options'>
                                <h2>Select Options</h2>
                                {selectOptions.map((option, index) => (
                                    <div key={option.id} className="select-option">
                                        <label style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                value={option.name}
                                                onChange={(e) => handleOptionNameChangees(index, e.target.value, 'select')}
                                                placeholder={`Enter option name`}
                                                style={{ marginLeft: '8px' }}
                                            />
                                            <button onClick={() => removeSelectOption(option.id)} className="remove-options"> <img src={removee} alt="" /></button>
                                        </label>
                                    </div>
                                ))}
                                <button onClick={addSelectOption}>Add Select Input</button>
                                <button onClick={handleAddSelectOptions}>Save</button>
                                <button className='heading_cancle' onClick={() => setShowSelectPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                {showHeadingPopup && (

                    <div className="popup">
                        <div className="popup-content">
                            <h4>{editingHeadingId ? 'Edit Heading' : 'Select Heading Level'}</h4>
                            <form onSubmit={editingHeadingId ? (e) => { e.preventDefault(); saveEditedHeading(); } : handleSubmit}>
                                <div>
                                    <label>
                                        Heading Level:
                                        <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
                                            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
                                                <option key={level} value={level}>{level.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Heading Text:
                                        <input
                                            type="text"
                                            value={headingText}
                                            onChange={(e) => setHeadingText(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Font Size (px):
                                        <input
                                            type="text"
                                            value={headingFontSize}
                                            onChange={(e) => setHeadingFontSize(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <button onClick={handleAddHeading}>Add Heading</button>
                                <button className='heading_cancle' onClick={() => setShowHeadingPopup(false)}>Cancel</button>

                            </form>
                        </div>
                    </div>
                )}
                {showDescriptionPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h4>{editingDescriptionId ? 'Edit Description' : 'Add Description'}</h4>
                            <form onSubmit={handleSubmits}>
                                <div>
                                    <label>
                                        Description:
                                        <textarea
                                            value={descriptionText}
                                            onChange={(e) => setDescriptionText(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <button onClick={handleAddDescription}>Add Description</button>
                                <button className='heading_cancle' onClick={() => setShowDescriptionPopup(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>)}
            </div>
            <div className='form-builder-add-text-wraped'>The Form builder app by <a target='_blank' href="https://syncform.app/index.html"><span style={{ fontWeight: '600', color: '#686767' }}>Hubsyntax App</span></a> | <a target='_blank' href="https://syncform.app/privacy-policy.html">Privacy policy</a> | <a target='_blank' href="https://syncform.app/terms-condition.html">Terms and conditions</a></div>
        </div>
    );
};

export default Formgenerated;

