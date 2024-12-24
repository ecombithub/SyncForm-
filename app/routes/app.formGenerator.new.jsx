
import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from '@remix-run/react';
import { Navigate, useLocation } from 'react-router-dom';
import '../index.css';
import text from '../images/text.png';
import heading from '../images/heading.png';
import font from '../images/font-size.png';
import radio from '../images/radio-button.png';
import checkbox from '../images/checked-box.png';
import selection from '../images/selection.png';
import text1 from '../images/text1.png';
import upload from '../images/upload.png';
import number from '../images/number-input.png';
import phone from '../images/phone.png';
import email from '../images/email.png';
import location1 from '../images/location.png';
import password1 from '../images/password1.png';
import toggle from '../images/toggle.png';
import url1 from '../images/url1.png';
import date from '../images/date.png';
import slider from '../images/slider.png';
import image from '../images/image-.png';
import link1 from '../images/link1.png';
import time from '../images/time.png';
import detetime from '../images/detetime.png';
import divider2 from '../images/divider.png';
import btn from '../images/btn.png';
import drop from '../images/drop.png';
import bgim1 from '../images/bgim1.png';
import removee from '../images/removee.png';
import delete1 from '../images/delete.png';
import maximizesize from '../images/maximize-size.png';
import vecter1 from '../images/vecter1.png';
import cancleimg from '../images/cancleimg.png';
import editicon from '../images/editicon.png';
import 'react-quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import { authenticate, apiVersion } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    const response = {
        assets: [],
        shop,
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

const toolbarOptions = [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { header: '4' }, { header: '5' }, { header: '6' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', 'medium', 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ header: [] }],
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
            navigator('/app/formGenerator/list');
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
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [boxShadow, setBoxShadow] = useState('');
    const [formWidth, setFormWidth] = useState('100%');
    const [padding, setPadding] = useState('20');
    const [borderRadius, setBorderRadius] = useState('0');
    const [borderColor, setBorderColor] = useState('#ffffff');
    const [borderColorcode, setBorderColorcode] = useState('#ffffff');
    const formRef = useRef(null);
    const [isFieldEnabled, setIsFieldEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSelectPopup, setShowSelectPopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [confirmationPopupType, setConfirmationPopupType] = useState('');
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [radioOptions, setRadioOptions] = useState([{ id: generateUniqueId(), label: 'Radio 1', value: 'Radio 1' }]);
    const [checkboxOptions, setCheckboxOptions] = useState([{ id: 1, name: 'Checkbox1' }]);
    const [selectOptions, setSelectOptions] = useState([{ id: 1, name: 'Option1' }]);
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
    const [borderWidth, setBorderWidth] = useState('');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [isFormBuilderVisible, setIsFormBuilderVisible] = useState(false);
    const [submissionOption, setSubmissionOption] = useState('');
    const [thankYouTimer, setThankYouTimer] = useState('');
    const [editorValue, setEditorValue] = useState('');
    const [url, setUrl] = useState('');
    const [ReactQuill, setReactQuill] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const { shop } = useLoaderData() || {};
    const [showFieldInput, setShowFieldInput] = useState(false);
    const [showFieldPro, setShowFieldPro] = useState(false);
    const [inputRadious, setInputRadious] = useState('4');
    const [inputwidth, setInputWidth] = useState('1');
    const [inputborderColor, setInputBorderColor] = useState('#B5B7C0');
    const [inputColorcode, setInputColorcode] = useState('#B5B7C0');
    const [inputstyle, setInputStyle] = useState('solid');
    const [labelColor, setLableColor] = useState('#000');
    const [lableCode, setLableCode] = useState('#ffffff');
    const [inputGap, setInputGap] = useState('10')
    const [colorCode, setColorCode] = useState('#ffffff');

    useEffect(() => {

        const loadReactQuill = async () => {
            const { default: Quill } = await import('react-quill');
            setReactQuill(() => Quill);
        };

        loadReactQuill();
    }, []);

    useEffect(() => {
        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.backgroundColor = backgroundColor;
            formBuilder.style.backgroundImage = imageFile ? `url(${imageFile})` : backgroundImage || 'none';
            formBuilder.style.backgroundSize = 'cover';
            formBuilder.style.backgroundRepeat = 'no-repeat';
            formBuilder.style.boxShadow = boxShadow;
            formBuilder.style.width = formWidth;
            formBuilder.style.padding = `${padding}px`;
            formBuilder.style.borderRadius = `${borderRadius}px`;

            if (/^\d+px$/.test(borderWidth)) {
                formBuilder.style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
            } else {
                formBuilder.style.border = 'none';
            }

        }

    }, [backgroundColor, imageFile, backgroundImage, borderWidth, borderStyle, borderColor, formWidth, padding, borderRadius, boxShadow, fields.length]);


    useEffect(() => {
        const formBuilder = document.getElementById('bg_image');
        if (formBuilder) {
            formBuilder.style.backgroundImage = imageFile ? `url(${imageFile})` : backgroundImage || 'none';
        }

    }, []);


    useEffect(() => {
        if (location.state) {
            const { formTitle, fields, formId, styles } = location.state;
            setFormTitle(formTitle);
            setFields(fields);
            setEditingFormId(formId);
            setIsEditing(true);
            setBackgroundColor(styles.backgroundColor);
            setBackgroundImage(styles.backgroundImage);
            setBoxShadow(styles.boxShadow || '');
            setFormWidth(styles.width || '100%');
            setPadding(styles.padding || '20px');
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
            setLableColor(styles.labelColor);
            setInputGap(styles.inputGap);
            console.log(styles.backgroundImage);
        }
    }, [location.state]);


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
            fontSize: '16px',
            customClass: '',
            color: '#DF0404',
            padding: '10px',
            dividerColor: '#000',
            btnbackgroundcolor: '#0561AF',
            backgroundColor: existingField ? existingField.backgroundColor : '#45A7F6',
            buttonWidth: existingField?.buttonWidth || '130px',
            buttonheight: existingField?.buttonheight || '40px',
            inputPadding: "10px",
            inputBorderRadious: "4",
            buttonBorderColor: type === 'button' ? '#000000' : undefined,
            buttonBorderWidth: type === 'button' ? '1' : undefined,
            buttonBorderStyle: type === 'button' ? 'solid' : undefined,
            btncolor: type === 'button' ? '#fff' : undefined,
            text: type === 'description' ? 'Add description' : undefined,
            headingText: type === 'heading' ? 'Add Heading' : undefined,

        };

        return existingField ? { ...baseField, ...existingField, id: generateUniqueId() } : baseField;
    };

    const addInputField = (type) => {
        let newField = createInputField(type);
        if (type === 'radio') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'select') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'checkbox') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'heading') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else if (type === 'description') {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        } else {
            newField = createInputField(type);
            setFields((prevFields) => [...prevFields, newField]);
        }
        setIsFormBuilderVisible(true);
        if (window.innerWidth > 1024) {
            handleFieldClick(newField, fields.length);
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

        console.log('Adding new radio option:', newOption);

        setRadioOptions(prevOptions => {
            const updatedOptions = [...prevOptions, newOption];
            console.log('Updated radio options:', updatedOptions);
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields =>
                prevFields.map(field =>
                    field.id === selectedField.id
                        ? { ...field, options: [...field.options, newOption] }
                        : field
                )
            );
        } else {
            console.warn('No selectedField found, skipping field update');
        }
    };


    const removeRadioOption = (id) => {
        setRadioOptions((prevOptions) => {
            return prevOptions.filter(option => option.id !== id);
        });

        setFields((prevFields) => prevFields.map(field => {
            if (field.id === selectedField?.id) {
                const updatedOptions = field.options.filter(option => option.id !== id);
                return { ...field, options: updatedOptions };
            }
            return field;
        }));
    };


    const handleAddRadioOptions = () => {
        if (radioOptions.some(option => option.label.trim() === '')) {
            alert('Option names cannot be empty!');
            return;
        }

        const optionNames = radioOptions.map(option => {
            if (!option || !option.label || !option.value) {
                console.error('Invalid option detected:', option);
                return null;
            }
            return {
                label: option.label,
                value: option.value
            };
        }).filter(option => option !== null);

        if (optionNames.length === 0) {
            alert('There are no valid options to add.');
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
            console.warn('No selectedField found, skipping field update');
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
            console.warn('No selectedField found, skipping field update');
        }
    };

    const addCheckboxOption = () => {
        const newOption = {
            id: checkboxOptions.length + 1,
            name: `Checkbox${checkboxOptions.length + 1}`,
        };

        setCheckboxOptions(prevOptions => {
            const updatedOptions = [...prevOptions, newOption];
            console.log('Updated checkbox options:', updatedOptions);
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields =>
                prevFields.map(field =>
                    field.id === selectedField.id
                        ? { ...field, options: [...field.options, newOption] }
                        : field
                )
            );
        } else {
            console.warn('No selectedField found, skipping field update');
        }
    };

    const removeCheckboxOption = (id) => {
        setCheckboxOptions((prevOptions) => {
            return prevOptions.filter(option => option.id !== id);
        });

        setFields((prevFields) => prevFields.map(field => {
            if (field.id === selectedField?.id) {
                const updatedOptions = field.options.filter(option => option.id !== id);
                return { ...field, options: updatedOptions };
            }
            return field;
        }));
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
            console.warn('No selectedField found, skipping field update');
        }
    };

    const addSelectOption = () => {
        const newOption = {
            id: generateUniqueId(),
            id: selectOptions.length + 1,
            name: `Option${selectOptions.length + 1}`,
        };

        setSelectOptions(prevOptions => {
            const updatedOptions = [...prevOptions, newOption];
            console.log('Updated select options:', updatedOptions);
            return updatedOptions;
        });

        if (selectedField?.id) {
            setFields(prevFields =>
                prevFields.map(field =>
                    field.id === selectedField.id
                        ? { ...field, options: [...field.options, newOption] }
                        : field
                )
            );
        } else {
            console.warn('No selectedField found, skipping field update');
        }
    };

    const handleAddSelectOptions = () => {
        if (selectOptions.some(option => option.name.trim() === '')) {
            alert('Option names cannot be empty!');
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
            return prevOptions.filter(option => option.id !== id);
        });

        setFields((prevFields) => prevFields.map(field => {
            if (field.id === selectedField?.id) {
                const updatedOptions = field.options.filter(option => option.id !== id);
                return { ...field, options: updatedOptions };
            }
            return field;
        }));
    };

    const removeField = (id) => {
        setFields((prevFields) => {
            const newFields = prevFields.filter(field => field && field.id !== id);

            if (newFields.length === 0) {
                setBackgroundImage('');
                setBackgroundColor('#ffffff');
                setImageFile(null);
                setBoxShadow('');
                setFormWidth('100%');
                setPadding('20px');
                setBorderColor('#ffffff');
                setBorderRadius('0');
            }

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
        setConfirmationPopupType(status);
        setShowConfirmationPopup(false);
        createOrUpdateForm(status);
    };

    const createOrUpdateForm = async (status = 'draft') => {
        const formId = generateUniqueId();
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

        console.log('Form status:', status);

        if (status !== 'live' && status !== 'draft') {
            alert('Invalid status. Please choose either "live" or "draft".');
            return;
        }

        if (!formTitle.trim()) {
            alert('Please enter a title for the form.');
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
                        width: field.buttonWidth,
                        height: field.buttonHeight,
                        backgroundColor: field.backgroundColor,
                        buttonBorderWidth: field.buttonBorderWidth || 1,
                        buttonBorderStyle: field.buttonBorderStyle || 'solid',
                        buttonBorderColor: field.buttonBorderColor || '#000',
                        btncolor: field.btncolor || '#ffff',
                    };
                }
                return field;
            }),
            createdAt: timestamp,
            hidden: false,
            status: status,
            styles: {
                backgroundColor: backgroundColor,
                backgroundImage: backgroundImageUrl,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                boxShadow,
                width: formWidth,
                padding,
                inputRadious,
                inputstyle,
                labelColor,
                inputGap,
                inputwidth,
                inputborderColor,
                borderColor,
                borderRadius,
                borderColor: borderColor,
                borderRadius: borderRadius,
                borderWidth: borderWidth,
                borderStyle: borderStyle
            },
            submissionOption: submissionOption || "defaultOption",
            thankYouTimer: thankYouTimer || 0,
            editorValue: sanitizedContent,
            url: url || "",
        };

        console.log('New form object:', JSON.stringify(newForm, null, 2));

        const request = isEditing
            ? axios.put(`https://hubsyntax.online/update-form/${editingFormId}`, newForm, {
                headers: { 'Content-Type': 'application/json' }
            })
            : axios.post('https://hubsyntax.online/form-data', newForm, {
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
                navigator('/app/formGenerator/list');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data);
                } else {
                    console.error('Error saving/updating form data:', error);
                }
            });

        setFields([]);
        setShowFormBuilder(false);
        setView('live');
        setIsEditing(false);
        setEditingFormId(null);
        setFormWidth('100%');
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
                console.error('Fields is not an array or is undefined', fields);
            }
        }
    }, [headingLevel, headingText, headingFontSize, descriptionText, selectedField]);

    const updateFieldProperty = (property, value) => {
        if (selectedField) {
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.id === selectedField.id ? { ...field, [property]: value } : field
                )
            );
            setSelectedField((prevField) => ({ ...prevField, [property]: value }));
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


    const updatePadding = (padding) => {
        setPadding(padding);
        const formBuilder = document.getElementById('bg_change');
        if (formBuilder) {
            formBuilder.style.padding = `${padding}px`;
        }
    }

    const handleBorderColorChange = (e) => {
        const newColor = e.target.value;
        setBorderColor(newColor);
        setBorderColorcode(newColor)
    };

    const handleBorderWidthChange = (e) => {
        const value = e.target.value;
        setBorderWidth(value);
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

    const toggleFieldEnabled = () => {
        setIsFieldEnabled(!isFieldEnabled);
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
        if (event.target.value !== 'Allow only one entry at a time') {
            setThankYouTimer('');
        }
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

    const handleLableColor = (e)=>{
        const newColor = e.target.value;
        setLableColor(newColor);
        setLableCode(newColor);
    }

    const handleborderColor = (e)=>{
        const newColor = e.target.value;
        setInputBorderColor(newColor);
        setInputColorcode(newColor);
    }

    return (
        <div>
            <div className="builder-container">
                <h3>Forms</h3>
                <div className='builder_form_name'>
                    <h1>Form Name</h1>
                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>
                <div className='form-Elements-btn email' onClick={handleFieldInput}>Form Elements</div>
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
                                            <div className='build_form_btns'>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('name')}><span className='form_builder_field_img'><img src={text} alt="" /></span> <span><h4>Name</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('text')}><span className='form_builder_field_img'><img src={text} alt="" /></span> <span><h4>Text Input</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={heading} alt="" /></span> <span><h4>Heading</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('radio')}><span className='form_builder_field_img'><img src={radio} alt="" /></span> <span><h4>Radio Button</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('checkbox')}><span className='form_builder_field_img'><img src={checkbox} alt="" /></span> <span><h4>Checkbox</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('select')}><span className='form_builder_field_img'><img src={selection} alt="" /></span> <span><h4>Select Box</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('textarea')}><span className='form_builder_field_img'><img src={text1} alt="" /></span> <span><h4>Textarea</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('file')}><span className='form_builder_field_img'><img src={upload} alt="" /></span> <span><h4>File Upload</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('number')}><span className='form_builder_field_img'><img src={number} alt="" /></span> <span><h4>Number Input</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('email')}><span className='form_builder_field_img'><img src={email} alt="" /></span> <span><h4>Email address</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('phone')}><span className='form_builder_field_img'><img src={phone} alt="" /></span> <span><h4>Phone number</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('password')}><span className='form_builder_field_img'><img src={password1} alt="" /></span> <span><h4>Password</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('url')}><span className='form_builder_field_img'><img src={url1} alt="" /></span> <span><h4>Url</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('location')}><span className='form_builder_field_img'><img src={location1} alt="" /></span> <span><h4>Location</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('toggle')}><span className='form_builder_field_img'><img src={toggle} alt="" /></span> <span><h4>Toggle</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('date')}><span className='form_builder_field_img'><img src={date} alt="" /></span> <span><h4>Date</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('datetime')}><span className='form_builder_field_img'><img src={detetime} alt="" /></span> <span><h4>Datetime</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('time')}><span className='form_builder_field_img'><img src={time} alt="" /></span> <span><h4>Time</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('slider')}><span className='form_builder_field_img'><img src={slider} alt="" /></span> <span><h4>Slider</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button></div>
                                                <div className='builderr_field_wrpp'> <button onClick={() => addInputField('link')}><span className='form_builder_field_img'><img src={link1} alt="" /></span> <span><h4>Link</h4></span></button></div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className='edit_form_close'>
                                                    <div className='edit-formwrap'>
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
                                                                    <div className='option-content'>
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
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className='edit-form-options form'>
                                                            <div className='edit_setting_bg form bgcolor'>
                                                                <label>
                                                                    Background Color:
                                                                </label>
                                                                <div className='edit_setting_bg_cls'>
                                                                    <p>{colorCode}</p>
                                                                    <div className='edit_setting_bg--form bgcolor'
                                                                        style={{
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            borderRadius: "4px",
                                                                            backgroundColor: backgroundColor,
                                                                            border: "1px solid #ccc",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() => document.getElementById('colorInput').click()}
                                                                    >
                                                                    </div>
                                                                </div>
                                                                <input
                                                                    id="colorInput"
                                                                    type="color"
                                                                    style={{
                                                                        display: "none"
                                                                    }}
                                                                    value={backgroundColor}
                                                                    onChange={handleColorChange}
                                                                />

                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Upload Background Image:</label>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleFileChange}
                                                                />

                                                            </div>
                                                            {imageFile && (
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
                                                            <div
                                                                className="edit_setting_bg form"
                                                                style={{
                                                                    backgroundImage: backgroundImage && !imageFile ? backgroundImage : 'none',
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
                                                                {!backgroundImage && !imageFile && (
                                                                    <img src={bgim1} alt="Placeholder" style={{ padding: '10px', maxWidth: '100%', height: '150px' }} />
                                                                )}
                                                                {imageFile && (
                                                                    <img
                                                                        src={imageFile}
                                                                        alt="Uploaded Background Preview"
                                                                        style={{ padding: '10px', maxWidth: '100%', height: '150px' }}
                                                                    />
                                                                )}
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
                                                                    <option value="rgba(0, 0, 0, 0.75) 0px 15px 30px">Dark Shadow</option>
                                                                    <option value="none">No Shadow</option>
                                                                </select>
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Form Width:</label>
                                                                <select
                                                                    value={formWidth}
                                                                    onChange={(e) => updateFormWidth(e.target.value)}
                                                                >
                                                                    <option value="25%">25%</option>
                                                                    <option value="50%">50%</option>
                                                                    <option value="75%">75%</option>
                                                                    <option value="100%">100%</option>
                                                                </select>
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Padding:</label>
                                                                <input
                                                                    type='text'
                                                                    value={padding}
                                                                    onChange={(e) => updatePadding(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Gap</label>
                                                                <input
                                                                    type='text'
                                                                    value={inputGap}
                                                                    onChange={(e) => setInputGap(e.target.value)}
                                                                />
                                                            </div>
                                                            
                                                            <div className='edit_setting_bg form bgcolor'>
                                                                <label>Lable Color:</label>
                                                                <div className='edit_setting_bg_cls'>
                                                                <p>{lableCode}</p>
                                                                <div className='edit_setting_bg--form bgcolor'
                                                                    style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: labelColor,
                                                                        border: "1px solid #ccc",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => document.getElementById('labelColorInput').click()}
                                                                >
                                                                </div>
                                                                </div>
                                                                <input
                                                                    id="labelColorInput"
                                                                    type="color"
                                                                    style={{
                                                                        display: "none"
                                                                    }}
                                                                    value={labelColor}
                                                                    onChange={handleLableColor}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Input Border:</label>
                                                                <input
                                                                    type='text'
                                                                    value={inputwidth}
                                                                    onChange={(e) => setInputWidth(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form bgcolor'>
                                                                <label>Input Border Color:</label>
                                                                <div className='edit_setting_bg_cls'>
                                                                <p>{inputColorcode}</p>
                                                                <div className='edit_setting_bg--form bgcolor'
                                                                    style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: inputborderColor,
                                                                        border: "1px solid #ccc",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => document.getElementById('inputborderColorInput').click()}
                                                                >
                                                                </div>
                                                                </div>
                                                                <input
                                                                    id="inputborderColorInput"
                                                                    type="color"
                                                                    style={{
                                                                        display: "none"
                                                                    }}
                                                                    value={inputborderColor}
                                                                    onChange={handleborderColor}
                                                                />
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
                                                                </select>
                                                            </div>

                                                            <div className='edit_setting_bg form'>
                                                                <label>Input Border Radious:</label>
                                                                <input
                                                                    type='text'
                                                                    value={inputRadious}
                                                                    onChange={(e) => setInputRadious(e.target.value)}
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
                                                                    type='text'
                                                                    value={borderWidth}
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

                                                                </select>
                                                            </div>
                                                            <div className='edit_setting_bg form bgcolor'>
                                                                <label>Border-Color:</label>
                                                                <div className='edit_setting_bg_cls'>
                                                                <p>{borderColorcode}</p>
                                                                <div className='edit_setting_bg--form bgcolor'
                                                                    style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: borderColor,
                                                                        border: "1px solid #ccc",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => document.getElementById('borderColorInput').click()}
                                                                >
                                                                </div>
                                                                </div>
                                                                <input
                                                                    id="borderColorInput"
                                                                    type="color"
                                                                    style={{
                                                                        display: "none"
                                                                    }}
                                                                    value={borderColor}
                                                                    onChange={handleBorderColorChange}
                                                                />
                                                            </div>
                                                            <div className='edit_setting_bg form'>
                                                                <label>Border-Radius:</label>
                                                                <input
                                                                    type='text'
                                                                    value={borderRadius}
                                                                    onChange={(e) => updateBorderRadius(e.target.value)}
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

                            <div className='form_builder_build'>
                                <div id='bg_change' className="form-builder-wrp" >
                                    <div id="formBuilder" className="form-builder" >
                                        {fields.length > 0 ? (fields.map((field, index) => {
                                            if (!field) {
                                                console.error(`Field at index ${index} is undefined`);
                                                return null;
                                            }
                                            return (
                                                <div
                                                    key={field.id}
                                                    className={`input-field input-gap ${parseFloat(field.width || '100') <= 50 ? 'small-width' : ''}`}
                                                    style={{ width: field.width || '100%', opacity: field.opacity || 1, marginBottom: `${inputGap}px` }}
                                                    onClick={() => handleFieldClick(field, index)}
                                                >
                                                    {field.type === 'name' && (
                                                        <div className={`input-field`} style={{
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
                                                                    {field.label || "Name"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: field.inputPadding,
                                                                            borderRadius: `${inputRadious}px`,
                                                                            borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                            opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
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
                                                                <div className='description'>
                                                                    {field.description}
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
                                                                    {field.label || "Text Input"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
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
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'heading' && (
                                                        <div className={`input-field ${field.customClass || ''}`} style={{
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
                                                            <div className='form_builder_heading_hover'>
                                                                <label>
                                                                    <div style={{
                                                                        fontSize: field.fontSize || '16px', width: field.width, opacity: field.opacity || 1,
                                                                    }}>
                                                                        {React.createElement(
                                                                            field.level || 'h1',
                                                                            null,
                                                                            field.headingText || field.text
                                                                        )}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'description' && (
                                                        <div className={`input-field ${field.customClass || ''}`} style={{
                                                            width: field.width || '100%', border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id)
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
                                                            <div className='form_builder_heading_hover'>
                                                                <label>
                                                                    <div className="description-field" style={{ fontSize: field.fontSize || '16px', width: field.width, opacity: field.opacity || 1 }}
                                                                    >
                                                                        <p>{field.text}</p>
                                                                    </div>
                                                                </label>
                                                            </div>
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

                                                            >
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label || "Radio Button"}
                                                                </label>
                                                                <div className='form-build-box' style={{
                                                                    width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                    borderStyle: inputstyle,
                                                                    borderColor: inputborderColor, opacity: field.opacity || 1
                                                                }}
                                                                >
                                                                    {field.options.length > 0 ? (
                                                                        field.options.map((option, index) => (
                                                                            <div key={option.id || index} className='form_radio_flex'>
                                                                                <input
                                                                                    type="radio"
                                                                                    name={field.name}
                                                                                    value={option.value}
                                                                                    disabled={field.disabled}
                                                                                    readOnly={field.readonly}
                                                                                />
                                                                                <label>{option.label}</label>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="form_radio_flex">
                                                                            <label>Add Radio Button</label>
                                                                        </div>
                                                                    )}
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
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
                                                            }}>
                                                                <label style={{ color: labelColor }}>
                                                                    {field.label || "Checkbox Group"}</label>
                                                                <div className='form-build-box' style={{ opacity: field.opacity || 1, }}
                                                                >
                                                                    {field.options.length > 0 ? (
                                                                        field.options.map(option => (
                                                                            <div key={option.id}>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    name={field.name}
                                                                                    disabled={field.disabled}
                                                                                    readOnly={field.readonly}
                                                                                />
                                                                                <span>{option.name}</span>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="form_radio_flex">
                                                                            <label>Add Checkbox Button</label>
                                                                        </div>
                                                                    )}

                                                                    {field.description && <div className='description'>{field.description}</div>}
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
                                                            }}>
                                                                <div>
                                                                    <label style={{ color: labelColor }}>

                                                                        {field.label || "Select Option"}</label>
                                                                    <select
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}

                                                                        name={field.name}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                    >
                                                                        <option disabled>{field.options.length === 0 ? 'Add Select Button' : ''}</option>
                                                                        {field.options.length > 0 && field.options.map((option, index) => (
                                                                            <option key={option.id} value={option.name}>
                                                                                {option.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'textarea' && (
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

                                                                <label style={{ color: labelColor }}>
                                                                    {field.label || "Enter text:"}
                                                                    <textarea
                                                                        style={{
                                                                            width: '100%', borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
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
                                                                    />
                                                                </label>
                                                                <div className='description'>
                                                                    {field.description}
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

                                                                        {field.label || "Upload file:"}
                                                                        <input
                                                                            style={{
                                                                                width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor, opacity: field.opacity || 1
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
                                                                        />
                                                                    </label>
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {field.type === 'number' && (
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
                                                                    {field.label || "Number"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                        type="number"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('Number', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'email' && (
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

                                                                    {field.label || "Email"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                        type="email"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'phone' && (
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

                                                                    {field.label || "Phone Number"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
                                                                        }}
                                                                        type="tel"
                                                                        className="name"
                                                                        name={field.name}
                                                                        placeholder={field.placeholder}
                                                                        required={field.required}
                                                                        disabled={field.disabled}
                                                                        readOnly={field.readonly}
                                                                        onChange={(e) => updateFieldProperty('phone', e.target.value, field.id)}
                                                                    />
                                                                </label>
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {field.type === 'password' && (
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

                                                                    {field.label || "Password"}
                                                                    <input
                                                                        style={{
                                                                            padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
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
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'url' && (
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
                                                                    {field.label || "Url"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                        }}
                                                                        onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                        onMouseLeave={() => {
                                                                            if (!(selectedField && selectedField.id === field.id)) {
                                                                                setHoveredFieldId(null);
                                                                            }
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
                                                                <div className='description'>
                                                                    {field.description}
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

                                                                    {field.label || "Location"}
                                                                    <input
                                                                        style={{
                                                                            width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor, opacity: field.opacity || 1,
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
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {field.type === 'toggle' && (
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
                                                            <div style={{ width: '100%', opacity: field.opacity || 1, }}
                                                                onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                onMouseLeave={() => {
                                                                    if (!(selectedField && selectedField.id === field.id)) {
                                                                        setHoveredFieldId(null);
                                                                    }
                                                                }}>
                                                                <label className="toggle-switch" style={{ color: labelColor }}>
                                                                    {field.label || "Toggle"}
                                                                    <input

                                                                        type="checkbox"
                                                                        checked={isFieldEnabled}
                                                                        onChange={toggleFieldEnabled}
                                                                        name={field.name}
                                                                    />
                                                                    <span className="slider"></span>
                                                                </label>
                                                                <div className='description'>
                                                                    {field.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'date' && (
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

                                                                        {field.label || "Date"}
                                                                        <input
                                                                            style={{
                                                                                width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                            }}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => {
                                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                                    setHoveredFieldId(null);
                                                                                }
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
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'datetime' && (
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

                                                                        {field.label || "Datetime"}
                                                                        <input
                                                                            style={{
                                                                                width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                            }}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => {
                                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                                    setHoveredFieldId(null);
                                                                                }
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
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'time' && (
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

                                                                        {field.label || "Time"}
                                                                        <input
                                                                            style={{
                                                                                width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                            }}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => {
                                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                                    setHoveredFieldId(null);
                                                                                }
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
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='form-build-checkbox-wrp-options'>
                                                        {field.type === 'slider' && (
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
                                                                        {field.label || "Slider"}
                                                                        <div style={{
                                                                            width: '100%', opacity: field.opacity || 1, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                            borderStyle: inputstyle,
                                                                            borderColor: inputborderColor,
                                                                        }}
                                                                            onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                            onMouseLeave={() => {
                                                                                if (!(selectedField && selectedField.id === field.id)) {
                                                                                    setHoveredFieldId(null);
                                                                                }
                                                                            }}>

                                                                            <input
                                                                                type="range"
                                                                                className="name"
                                                                                min="1" max="100"
                                                                                name={field.name}
                                                                                placeholder={field.placeholder}
                                                                                required={field.required}
                                                                                disabled={field.disabled}
                                                                                readOnly={field.readonly}
                                                                                onChange={(e) => updateFieldProperty('slider', e.target.value, field.id)}
                                                                            />
                                                                        </div>
                                                                    </label>
                                                                    <div className='description'>
                                                                        {field.description}
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

                                                                        {field.label || "Images"}
                                                                        <input
                                                                            style={{
                                                                                width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                                borderStyle: inputstyle,
                                                                                borderColor: inputborderColor, opacity: field.opacity || 1,
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
                                                                        />
                                                                    </label>
                                                                    <div className='description'>
                                                                        {field.description}
                                                                    </div>
                                                                </div>
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
                                                                <button
                                                                    type="button"
                                                                    style={{
                                                                        width: field.buttonWidth,
                                                                        height: field.buttonheight,
                                                                        backgroundColor: field.backgroundColor,
                                                                        fontSize: `${field.fontSize}px`,
                                                                        color: field.btncolor,
                                                                        padding: field.padding,
                                                                        borderWidth: `${field.buttonBorderWidth}px`,
                                                                        borderStyle: field.buttonBorderStyle || 'solid',
                                                                        borderColor: field.buttonBorderColor || '#000',
                                                                    }}

                                                                >
                                                                    {field.label}
                                                                </button>

                                                                <div className='description'>
                                                                    {field.description}
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

                                                                <hr style={{ margin: '20px 0', border: `1px solid ${field.dividerColor}`, width: '100%' }} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {field.type === 'link' && (
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
                                                            <label style={{ color: labelColor }}>
                                                                {field.label}
                                                                <input
                                                                    style={{
                                                                        width: '100%', padding: field.inputPadding, borderRadius: `${inputRadious}px`, borderWidth: `${inputwidth}px`,
                                                                        borderStyle: inputstyle,
                                                                        borderColor: inputborderColor, opacity: field.opacity || 1,
                                                                    }}
                                                                    onMouseEnter={() => setHoveredFieldId(field.id)}
                                                                    onMouseLeave={() => {
                                                                        if (!(selectedField && selectedField.id === field.id)) {
                                                                            setHoveredFieldId(null);
                                                                        }
                                                                    }}
                                                                    type="link"
                                                                    name={field.name}
                                                                    disabled={field.disabled}
                                                                    readOnly={field.readonly}
                                                                    placeholder="Enter link text"
                                                                    onChange={(e) => updateFieldProperty('link', e.target.value, field.id)}
                                                                />
                                                            </label>
                                                        </div>
                                                    )}
                                                    {(hoveredFieldId === field.id || (selectedField && selectedField.id === field.id)) && (
                                                        <div>
                                                            <div className='form-builder-radio-btn'>
                                                                <button className="copy-btn edit" onClick={() => handleFieldClick(field, index)}>
                                                                    <img src={editicon} alt="copy" />
                                                                </button>
                                                                <button
                                                                    className="remove-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeField(field.id);
                                                                    }}>
                                                                    <img src={delete1} alt="delete" />
                                                                </button>
                                                                <button className="copy-btn " onClick={() => addInputField(field.type)}>
                                                                    <img src={maximizesize} alt="copy" />
                                                                </button>
                                                            </div>
                                                            <div className='form-builder-drag-drop'>
                                                                <img src={drop} alt="" />
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
                                                        <p>Let's create the forms.</p>
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
                                    <div className="form-builder-change-propertites" ref={propertiesPanelRef} style={{ display: isPropertiesVisible ? 'block' : 'none' }}>
                                        {selectedField && (
                                            <div className='form-builder-change_show_all'>

                                                <div className='form_qucik'>
                                                    <p>Qucick setup Settings</p>
                                                </div>
                                                <div className='form_build_propertities'>
                                                    <div className="form-builder-chaneging-wrap">
                                                        <label>Label</label>
                                                        <input
                                                            type="text"
                                                            value={selectedField.label}
                                                            onChange={(e) => updateFieldProperty('label', e.target.value)}
                                                        />
                                                    </div>
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
                                                                    <button onClick={() => removeSelectOption(option.id)} className="remove-options"> <img src={removee} alt="" /></button>
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
                                                                    <button onClick={() => removeRadioOption(option.id)} className="remove-options"><img src={removee} alt="" /></button>
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
                                                                        <button onClick={() => removeCheckboxOption(option.id)} className="remove-options"><img src={removee} alt="" /></button>
                                                                    </div>
                                                                ))}
                                                                <button className='btn-design' onClick={addCheckboxOption}>Add Checkbox Button</button>

                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedField.type === 'divider' && (
                                                        <div className='form_builder_divider_lable'>
                                                            <label>Divider Color</label>
                                                            <input
                                                                type="color"
                                                                value={selectedField.dividerColor}
                                                                onChange={(e) => updateFieldProperty('dividerColor', e.target.value)}
                                                            />
                                                        </div>
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
                                                                            value={selectedField.fontSize}
                                                                            onChange={(e) => updateFieldProperty('fontSize', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                        <label> Color</label>
                                                                        <input
                                                                            type="color"
                                                                            value={selectedField.btncolor}
                                                                            onChange={(e) => updateFieldProperty('btncolor', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className='checkbox-option'>
                                                                        <label>Button Padding (px)</label>
                                                                        <input
                                                                            type="text"
                                                                            value={selectedField.padding}
                                                                            onChange={(e) => updateFieldProperty('padding', e.target.value)}
                                                                            placeholder="e.g., 10px"
                                                                        />
                                                                    </div>
                                                                    <div className='checkbox-option'>
                                                                        <label>Width (px)</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.buttonWidth ? selectedField.buttonWidth.replace('px', '') : '130'}
                                                                            onChange={(e) => updateFieldProperty('buttonWidth', `${e.target.value}px`)}
                                                                            placeholder="e.g., 150"
                                                                        />
                                                                    </div>
                                                                    <div className='checkbox-option'>
                                                                        <label>Height (px)</label>
                                                                        <input
                                                                            type="number"
                                                                            value={selectedField.buttonheight ? selectedField.buttonheight.replace('px', '') : '40'}
                                                                            onChange={(e) => updateFieldProperty('buttonheight', `${e.target.value}px`)}
                                                                            placeholder="e.g., 40"
                                                                        />
                                                                    </div>
                                                                    <div className='checkbox-option'>
                                                                        <label>Background Color</label>
                                                                        <input
                                                                            type="color"
                                                                            value={selectedField.backgroundColor}
                                                                            onChange={(e) => updateFieldProperty('backgroundColor', e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className='form-builder-chaneging-wrap color'>
                                                                        <label>Border Color</label>
                                                                        <input
                                                                            type="color"
                                                                            value={selectedField.buttonBorderColor}
                                                                            onChange={(e) => updateFieldProperty('buttonBorderColor', e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className='form-builder-chaneging-wrap number'>
                                                                        <label>Border Width (px)</label>
                                                                        <input
                                                                            type="text"
                                                                            value={selectedField.buttonBorderWidth}
                                                                            onChange={(e) => {
                                                                                updateFieldProperty('buttonBorderWidth', `${e.target.value}`);
                                                                            }}
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
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </>
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
                                                                <label>
                                                                    Font Size (px):
                                                                    <input
                                                                        type="text"
                                                                        value={headingFontSize}
                                                                        onChange={(e) => setHeadingFontSize(e.target.value)}
                                                                    />
                                                                </label>
                                                            </div>

                                                        </>
                                                    )}
                                                    {selectedField.type === 'description' && (
                                                        <>
                                                            <div className="form-builder-chaneging-wrap">
                                                                <label>Description Text</label>
                                                                <textarea
                                                                    value={descriptionText}
                                                                    onChange={(e) => setDescriptionText(e.target.value)}
                                                                />
                                                            </div>

                                                        </>
                                                    )}
                                                    <div className="form-builder-chaneging-wrap">
                                                        <label>Placeholder</label>
                                                        <input
                                                            type="text"
                                                            value={selectedField.placeholder}
                                                            onChange={(e) => updateFieldProperty('placeholder', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-builder-chaneging-wrap">
                                                        <label>Description</label>
                                                        <input
                                                            type="text"
                                                            value={selectedField.description}
                                                            onChange={(e) => updateFieldProperty('description', e.target.value)}
                                                        />
                                                    </div>
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
                                                    <div className="form-builder-chaneging-wrap">
                                                        <label>Custom Class</label>
                                                        <input
                                                            type="text"
                                                            value={selectedField?.customClass || ''}
                                                            onChange={(e) => updateFieldProperty('customClass', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='form_builder_option_select'>
                                                    <h3>Options</h3>
                                                    <div className='form-builder-options-container'>
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
                <div className='btn_form_bulider'>
                    <div className="form-submission-wrp">
                        <button className="cancle-form-btn" onClick={handlelistForm}>Cancel</button>
                    </div>
                    <div className="form-submission-wrp">
                        <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update Form' : 'Save'}</button>
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

        </div>
    );
};

export default Formgenerated;
