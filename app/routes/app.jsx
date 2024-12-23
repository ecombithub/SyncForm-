import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import spinner from '../images/spinner.gif';

const Loader = () => (
  <div className="modal-costomer">
    <div className="loaddr">
       <img src={spinner}/>
    </div>
  </div>
);

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();
  const [loading, setLoading] = useState(false);

  const handleLinkClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/customer" onClick={handleLinkClick}>Customers</Link>
        <Link to="/app/formGenerator/list">Forms</Link>
        <Link to="/app/setting">Settings</Link>
        <Link to="/app/pricing">Pricing</Link>
        <Link to="/app/support">Support</Link>
        <Link to="/app/emailTemplate/list">EmailTemplate</Link>
        <ul>
          <li><Link to="/app/formGenerator/new">Create</Link></li>
          <li><Link to="/app/emailTemplate/new">EmailTemplate</Link></li>
        </ul>
      </NavMenu>

      {loading ? <Loader /> : <Outlet />}
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};



// import React, { useState, useEffect, useRef } from 'react';
// import Sortable from 'sortablejs';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { useNavigate } from '@remix-run/react';
// import { useLocation } from 'react-router-dom';
// import '../index.css';
// import interfacee from '../images/interface.png'
// import close from '../images/close.png';
// import text from '../images/text.png';
// import heading from '../images/heading.png'
// import font from '../images/font-size.png'
// import radio from '../images/radio-button.png';
// import checkbox from '../images/checked-box.png';
// import selection from '../images/selection.png';
// import text1 from '../images/text1.png';
// import upload from '../images/upload.png';
// import number from '../images/number-input.png';
// import phone from '../images/phone.png';
// import email from '../images/email.png';
// import location1 from '../images/location.png';
// import password1 from '../images/password1.png';
// import toggle from '../images/toggle.png';
// import url from '../images/url.png';
// import date from '../images/date.png';
// import slider from '../images/slider.png';
// import image from '../images/image-.png';
// import link1 from '../images/link1.png';
// import time from '../images/time.png';
// import detetime from '../images/detetime.png';
// import divider2 from '../images/divider.png';
// import btn from '../images/btn.png';
// import downarrow from '../images/down-arrow.png';
// import downarrow1 from '../images/downarrow.png';
// import plus from '../images/plus.png';
// import delete1 from '../images/delete.png';
// import maximizesize from '../images/maximize-size.png'
// import vecter1 from '../images/vecter1.png';

// const generateUniqueId = (length = 22) => {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let uniqueId = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         uniqueId += charset[randomIndex];
//     }
//     return uniqueId;
// };

// const Formgenerated = () => {

//     const ConfirmationPopup = ({ isVisible, onClose, onConfirm }) => {
//         if (!isVisible) return null;

//         return (
//             <div className="confirmation-popup">
//                 <div className="confirmation-popup-content">
//                     <h4>Choose Form Status</h4>
//                     <p>Do you want to save this form as a draft or publish it live?</p>
//                     <div className="confirmation-popup-actions">
//                         <button className='save_form' onClick={() => onConfirm('draft')}>Save as Draft</button>
//                         <button onClick={() => onConfirm('live')}>Publish</button>
//                         <button className='heading_cancle' onClick={onClose}>Cancel</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const navigator = useNavigate();
//     const location = useLocation();
//     const [fields, setFields] = useState([]);
//     const [formTitle, setFormTitle] = useState('My Form');
//     const [showFormBuilder, setShowFormBuilder] = useState(false);
//     const [createdForms, setCreatedForms] = useState([]);
//     const [view, setView] = useState('live');
//     const [currentFormId, setCurrentFormId] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingFormId, setEditingFormId] = useState(null);
//     const [selectedField, setSelectedField] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState('#ffffff');
//     const [backgroundImage, setBackgroundImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [boxShadow, setBoxShadow] = useState('');
//     const [formWidth, setFormWidth] = useState('100%');
//     const [padding, setPadding] = useState('0');
//     const [borderRadius, setBorderRadius] = useState('0');
//     const [borderColor, setBorderColor] = useState('#ffffff');
//     const formRef = useRef(null);
//     const [isFieldEnabled, setIsFieldEnabled] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [showSelectPopup, setShowSelectPopup] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [confirmationPopupType, setConfirmationPopupType] = useState('');
//     const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//     const [radioOptions, setRadioOptions] = useState([{ id: generateUniqueId(), label: 'radio 1', value: 'radio 1' }]);
//     const [checkboxOptions, setCheckboxOptions] = useState([{ id: 1, name: 'checkbox1' }]);
//     const [selectOptions, setSelectOptions] = useState([{ id: 1, name: 'option1' }]);
//     const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
//     const [headingLevel, setHeadingLevel] = useState('h1');
//     const [headingText, setHeadingText] = useState('');
//     const [showHeadingPopup, setShowHeadingPopup] = useState(false);
//     const [editingHeadingId, setEditingHeadingId] = useState(null);
//     const [descriptionText, setDescriptionText] = useState('');
//     const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
//     const [editingDescriptionId, setEditingDescriptionId] = useState(null);
//     const [showFields, setShowFields] = useState(true);
//     const [hoveredFieldId, setHoveredFieldId] = useState(null);
//     const [showField, setShowField] = useState(true);
//     const propertiesPanelRef = useRef(null);
//     const [isOptionsVisible, setIsOptionsVisible] = useState(false);
//     const [headingFontSize, setHeadingFontSize] = useState('16px');
//     const [isPropertiesVisible, setIsPropertiesVisible] = useState(false);
//     const [editedFieldIndex, setEditedFieldIndex] = useState(null);
//     const [currentEditingFieldIndex, setCurrentEditingFieldIndex] = useState(null);
//     const [activeFieldIndex, setActiveFieldIndex] = useState(null);
//     const [border, setBorder] = useState('none');
//     const [borderWidth, setBorderWidth] = useState('');
//     const [borderStyle, setBorderStyle] = useState('solid');

//     useEffect(() => {
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.backgroundColor = backgroundColor;
//             formBuilder.style.backgroundImage = imageFile ? `url(${imageFile})` : backgroundImage || 'none';
//             formBuilder.style.backgroundSize = 'cover';
//             formBuilder.style.backgroundRepeat = 'no-repeat';
//             formBuilder.style.boxShadow = boxShadow;
//             formBuilder.style.width = formWidth;
//             formBuilder.style.padding = padding;
//             formBuilder.style.borderRadius = borderRadius;

//             if (/^\d+px$/.test(borderWidth)) {
//                 formBuilder.style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
//             } else {
//                 formBuilder.style.border = 'none';
//             }

//         }
//     }, [backgroundColor, imageFile, backgroundImage, borderWidth, borderStyle, borderColor, formWidth, padding, borderRadius, boxShadow, fields.length]);

//     useEffect(() => {
//         if (location.state) {
//             const { formTitle, fields, formId, styles } = location.state;
//             setFormTitle(formTitle);
//             setFields(fields);
//             setEditingFormId(formId);
//             setIsEditing(true);

//             setBackgroundColor(styles.backgroundColor);
//             setBackgroundImage(styles.backgroundImage);
//             setBoxShadow(styles.boxShadow || '');
//             setFormWidth(styles.width || '100%');
//             setPadding(styles.padding || '0');
//             setBorderRadius(styles.borderRadius || '0');
//             setBorder(styles.border || '1px');
//             const borderWidthValue = styles.border ? styles.border.split(' ')[0] : '1px';
//             const borderStyleValue = styles.border ? styles.border.split(' ')[1] : 'solid';
//             const borderColorValue = styles.border ? styles.border.split(' ')[2] : '#ffffff';
//             setBorderWidth(styles.borderWidth || '1px');
//             setBorderStyle(styles.borderStyle || 'solid');
//             setBorderColor(styles.borderColor || '#ffffff');

//         }
//     }, [location.state]);

//     const createInputField = (type, options = [], isFieldEnabled = true, existingField = null) => {
//         const width = existingField?.width || '100%';
//         const baseField = {
//             id: existingField ? existingField.id : generateUniqueId(),
//             type,
//             name: type.charAt(0).toUpperCase() + type.slice(1),
//             label: type === 'name' ? 'Full name' : type.charAt(0).toUpperCase() + type.slice(1),
//             description: '',
//             disabled: !isFieldEnabled,
//             width,
//             required: false,
//             readonly: false,
//             customClass: '',
//             options,
//             level: existingField ? existingField.level : 'h1',
//             text: existingField ? existingField.text : '',
//             description: existingField ? existingField.description : '',
//             level: type === 'heading' ? headingLevel : undefined,
//             text: type === 'heading' ? headingText : '',
//             fontSize: type === 'heading' ? '16px' : undefined,
//             level: 'h1',
//             fontSize: '16px',
//             customClass: '',
//             color: '#DF0404',
//             padding: '10px',
//             dividerColor: '#000',
//             btnbackgroundcolor: '#0561AF',
//             backgroundColor: existingField ? existingField.backgroundColor : '#4CAF50',
//             buttonWidth: existingField?.buttonWidth || '150px',
//             buttonheight: existingField?.buttonheight || '40px',
//             styles: type === 'name' ? { display: 'flex', gap: '10px' } : {},

//         };
//         return existingField ? { ...baseField, ...existingField, id: generateUniqueId() } : baseField;
//     };

//     const addInputField = (type) => {
//         let newField;

//         if (type === 'radio') {
//             setShowPopup(true);
//             resetRadioOptions('');
//             return;
//         } else if (type === 'select') {
//             setShowSelectPopup(true);
//             return;
//         } else if (type === 'checkbox') {
//             setShowCheckboxPopup(true);
//             resetCheckbox('');
//             return;
//         } else if (type === 'heading') {
//             setShowHeadingPopup(true);
//             setHeadingText('');
//             setHeadingLevel('h1');
//             setHeadingFontSize('16px');
//             return;
//         } else if (type === 'description') {
//             setShowDescriptionPopup(true);
//             setDescriptionText('');
//             return;
//         } else {
//             newField = createInputField(type);
//             setFields((prevFields) => [...prevFields, newField]);
//         }

//         handleFieldClick(newField, fields.length);
//     };

//     const handleAddHeading = (level, text) => {
//         const headingField = {
//             id: generateUniqueId(),
//             type: 'heading',
//             level: headingLevel,
//             text: headingText,
//             fontSize: headingFontSize,
//             label: headingText,
//         };
//         setFields((prevFields) => [...prevFields, headingField]);
//         setShowHeadingPopup(false);
//         setHeadingText('');
//         setHeadingFontSize('16px');
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleAddHeading(headingLevel, headingText);
//         setShowHeadingPopup(false);
//     };

//     const saveEditedHeading = () => {
//         if (selectedField) {
//             setFields((prevFields) =>
//                 prevFields.map((field) =>
//                     field.id === selectedField.id ? { ...field, level: headingLevel, text: headingText } : field
//                 )
//             );
//             setSelectedField(null);
//         }
//     };

//     const handleRadioOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     const handleOptionNameChange = (index, newName) => {
//         const updatedOptions = radioOptions.map((option, idx) =>
//             idx === index ? { ...option, label: newName, value: newName } : option
//         );
//         setRadioOptions(updatedOptions);
//     };

//     const addRadioOption = () => {
//         const newOption = {
//             id: generateUniqueId(),
//             label: `radio ${radioOptions.length + 1}`,
//             value: `radio ${radioOptions.length + 1}`,
//         };
//         setRadioOptions([...radioOptions, newOption]);
//     };

//     const handleAddRadioOptions = () => {
//         if (radioOptions.some(option => option.label.trim() === '')) {
//             alert('Option names cannot be empty!');
//             return;
//         }

//         const optionNames = radioOptions.map(option => ({ label: option.label, value: option.value }));
//         const newField = createInputField('radio', optionNames);

//         setFields(prevFields => {
//             const updatedFields = [...prevFields];
//             if (currentEditingFieldIndex !== null) {
//                 updatedFields[currentEditingFieldIndex] = newField;
//             } else {
//                 updatedFields.push(newField);
//             }
//             return updatedFields;
//         });

//         resetRadioOptions();
//         setCurrentEditingFieldIndex(null);
//         setShowPopup(false);
//     };

//     const resetRadioOptions = () => {
//         setRadioOptions([{ id: generateUniqueId(), label: 'radio 1', value: 'radio 1' }]);
//     };

//     const resetCheckbox = () => {
//         setCheckboxOptions([{ id: generateUniqueId(), name: 'checkbox1', value: 'checkbox1' }]);
//     }

//     const handleOptionNameChanges = (index, newName) => {
//         const updatedOptions = checkboxOptions.map((option, idx) =>
//             idx === index ? { ...option, name: newName } : option
//         );
//         setCheckboxOptions(updatedOptions);

//         if (editedFieldIndex !== null) {
//             setFields(prevFields => {
//                 const newFields = [...prevFields];
//                 newFields[editedFieldIndex] = createInputField('checkbox', updatedOptions);
//                 return newFields;
//             });
//         }
//     };

//     const addCheckboxOption = () => {
//         const newOption = {
//             id: checkboxOptions.length + 1,
//             name: `checkbox${checkboxOptions.length + 1}`,
//         };
//         setCheckboxOptions([...checkboxOptions, newOption]);
//     };

//     const handleAddCheckboxOptions = () => {

//         const newField = createInputField('checkbox', checkboxOptions);
//         setFields(prevFields => {
//             const updatedFields = [...prevFields];
//             if (editedFieldIndex !== null) {
//                 updatedFields[editedFieldIndex] = newField;
//             } else {
//                 updatedFields.push(newField);
//             }
//             return updatedFields;
//         });
//         resetCheckbox();
//         setShowCheckboxPopup(false);
//         setCheckboxOptions([{ id: 1, name: 'checkbox1' }]);
//         setEditedFieldIndex(null);

//     };

//     const handleOptionNameChangees = (index, newName, type) => {
//         setSelectOptions(prevOptions =>
//             prevOptions.map((option, idx) => (idx === index ? { ...option, name: newName } : option))
//         );
//     };

//     const addSelectOption = () => {
//         setSelectOptions(prevOptions => [
//             ...prevOptions,
//             { id: prevOptions.length + 1, name: `option${prevOptions.length + 1}` },
//         ]);
//     };

//     const handleAddSelectOptions = () => {
//         if (selectOptions.some(option => option.name.trim() === '')) {
//             alert('Option names cannot be empty!');
//             return;
//         }

//         const newField = createInputField('select', selectOptions);
//         setFields(prevFields => {
//             const updatedFields = [...prevFields];
//             if (activeFieldIndex !== null) {
//                 updatedFields[activeFieldIndex] = newField;
//             } else {
//                 updatedFields.push(newField);
//             }
//             return updatedFields;
//         });

//         setShowSelectPopup(false);
//         setSelectOptions([{ id: 1, name: 'option1' }]);
//         setActiveFieldIndex(null);

//     };

//     const removeField = (id) => {
//         setFields((prevFields) => {
//             const newFields = prevFields.filter(field => field.id !== id);

//             if (newFields.length === 0) {
//                 setBackgroundImage('');
//                 setBackgroundColor('#ffffff');
//                 setImageFile(null);
//                 setBoxShadow('');
//                 setFormWidth('100%');
//                 setPadding('0');
//                 setBorderColor('#ffffff');
//                 setBorderRadius('0');

//             }

//             if (selectedField && selectedField.id === id) {
//                 setSelectedField(null);

//             }
//             return newFields;
//         });
//     };

//     const handleCreate = () => {
//         setShowConfirmationPopup(true);
//     };

//     const handleStatusChange = (status) => {
//         setConfirmationPopupType(status);
//         setShowConfirmationPopup(false);
//         createOrUpdateForm(status);
//     };

//     const createOrUpdateForm = (status = 'draft') => {
//         const formId = generateUniqueId();
//         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

//         console.log('Form status:', status);

//         if (status !== 'live' && status !== 'draft') {
//             alert('Invalid status. Please choose either "live" or "draft".');
//             return;
//         }

//         if (!formTitle.trim()) {
//             alert('Please enter a title for the form.');
//             return;
//         }

//         const existingForm = createdForms.find(form => form.title === formTitle);

//         if (existingForm && !isEditing) {
//             alert('A form with this title already exists. Please choose a different title.');
//             return;
//         }


//         const backgroundImageUrl = imageFile ? `url(${imageFile})` : backgroundImage || 'none';

//         const newForm = {
//             formId: isEditing ? editingFormId : formId,
//             title: formTitle,
//             fields: fields.map(field => {
//                 console.log('Processing field:', field); 

//                 if (field.type === 'name') {
//                     return {
//                         ...field,
//                         customClass: field.customClass || 'default-name-class', 
//                         styles: {
//                             display: 'flex',
//                             gap: '10px',
//                             ...field.styles,
//                         },
//                     };
//                 }

//                 if (field.type === 'checkbox') {
//                     return {
//                         ...field,
//                         options: field.options.map(option => ({
//                             id: option.id || generateUniqueId(),
//                             label: option.name || '',
//                             value: option.name || option.label
//                         })).filter(option => option.label && option.value),
//                     };
//                 }

//                 if (field.type === 'select') {
//                     return {
//                         ...field,
//                         options: field.options.map(option => ({
//                             id: option.id || generateUniqueId(),
//                             label: option.name || '',
//                             value: option.name || option.label
//                         })).filter(option => option.label && option.value),
//                     };
//                 }

//                 if (field.type === 'radio') {
//                     return {
//                         ...field,
//                         options: field.options.map(option => ({
//                             id: option.id || generateUniqueId(),
//                             label: option.label || '',
//                             value: option.value || option.label,
//                         })).filter(option => option.label && option.value),
//                     };
//                 }

//                 if (field.type === 'heading') {
//                     return {
//                         ...field,
//                         level: field.level,
//                         fontSize: field.fontSize,
//                     };
//                 }

//                 if (field.type === 'button') {
//                     return {
//                         ...field,
//                         padding: field.padding,
//                         color: field.color,
//                         fontSize: field.fontSize,
//                         width: field.buttonWidth,
//                         height: field.buttonHeight,
//                         backgroundColor: field.backgroundColor,
//                     };
//                 }
//                 return field;
//             }),
//             createdAt: timestamp,
//             hidden: false,
//             status: status,
//             styles: {
//                 backgroundColor: backgroundColor,
//                 backgroundImage: backgroundImageUrl,
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 boxShadow,
//                 width: formWidth,
//                 padding,
//                 borderColor,
//                 borderRadius,
//                 borderColor: borderColor,
//                 borderRadius: borderRadius,
//                 borderWidth: borderWidth,
//                 borderStyle: borderStyle
//             }
//         };

//         console.log('New form object:', JSON.stringify(newForm, null, 2));

//         const request = isEditing
//             ? axios.put(`http://localhost:4001/update-form/${editingFormId}`, newForm, {
//                 headers: { 'Content-Type': 'application/json' }
//             })
//             : axios.post('http://localhost:4001/form-data', newForm, {
//                 headers: { 'Content-Type': 'application/json' }
//             });

//         request
//             .then(response => {
//                 console.log(isEditing ? 'Form updated successfully:' : 'Form data saved successfully:', response.data);
//                 const updatedForms = isEditing
//                     ? createdForms.map(form => form.formId === editingFormId ? newForm : form)
//                     : [...createdForms, newForm];

//                 setCreatedForms(updatedForms);
//                 setCurrentFormId(newForm.formId);
//                 navigator('/app/formGenerator/list');
//             })
//             .catch(error => {
//                 if (error.response && error.response.status === 400) {
//                     alert(error.response.data);
//                 } else {
//                     console.error('Error saving/updating form data:', error);
//                 }
//             });

//         setFields([]);
//         setShowFormBuilder(false);
//         setView('live');
//         setIsEditing(false);
//         setEditingFormId(null);
//         setFormWidth('100%');
//         setBackgroundImage(null);
//         setImageFile('');
//         setBorderColor('');
//         setPadding('');
//         setBorderRadius('');
//     };

//     const handleCancelStatusChange = () => {
//         setShowConfirmationPopup(false);
//     };

//     const handleFieldClick = (field, index) => {
//         const isCurrentlySelected = selectedField && selectedField.id === field.id;

//         setSelectedField(isCurrentlySelected ? null : field);
//         setHoveredFieldId(field.id);

//         if (!isCurrentlySelected) {
//             setIsPropertiesVisible(true);

//             if (field.type === 'radio') {
//                 setRadioOptions(field.options || []);
//                 setRadioOptions(field.options.map(option => ({
//                     id: option.id || generateUniqueId(),
//                     label: option.label,
//                     value: option.value
//                 })));
//                 setCurrentEditingFieldIndex(index);

//             } else if (field.type === 'checkbox') {
//                 setShowCheckboxPopup(false);
//                 setCheckboxOptions(field.options || []);
//                 setEditedFieldIndex(index);

//             } else if (field.type === 'heading') {
//                 setHeadingLevel(field.level);
//                 setHeadingText(field.text);
//                 setDescriptionText('');
//                 setHeadingFontSize(field.fontSize);

//             } else if (field.type === 'description') {
//                 setDescriptionText(field.text);
//                 setHeadingText('');

//             } else if (field.type === 'select') {
//                 setSelectOptions(field.options);
//                 setShowSelectPopup(false);
//                 setActiveFieldIndex(index);
//             }

//         } else {
//             setIsPropertiesVisible(false);
//         }

//     };

//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             if (editedFieldIndex !== null) {
//                 event.preventDefault();
//                 event.returnValue = '';
//             }
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, [editedFieldIndex]);

//     useEffect(() => {
//         if (selectedField) {
//             const updatedField = {
//                 ...selectedField,
//                 ...(selectedField.type === 'heading'
//                     ? { level: headingLevel, text: headingText, fontSize: headingFontSize }
//                     : { text: descriptionText }),
//             };
//             setFields(prevFields => prevFields.map(field => field.id === selectedField.id ? updatedField : field));
//         }
//     }, [headingLevel, headingText, headingFontSize, descriptionText, selectedField]);

//     const updateFieldProperty = (property, value) => {
//         if (selectedField) {
//             setFields((prevFields) =>
//                 prevFields.map((field) =>
//                     field.id === selectedField.id ? { ...field, [property]: value } : field
//                 )
//             );
//             setSelectedField((prevField) => ({ ...prevField, [property]: value }));
//         }
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (propertiesPanelRef.current && !propertiesPanelRef.current.contains(event.target)) {
//                 setSelectedField(null);
//                 setIsOptionsVisible(null)
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         const formBuilder = document.getElementById('formBuilder');
//         if (formBuilder) {
//             const sortable = Sortable.create(formBuilder, {
//                 animation: 150,
//                 ghostClass: 'dragging',
//                 onEnd: (event) => {
//                     const updatedFields = [...fields];
//                     const [movedItem] = updatedFields.splice(event.oldIndex, 1);
//                     updatedFields.splice(event.newIndex, 0, movedItem);
//                     setFields(updatedFields);
//                 },
//             });

//             return () => sortable.destroy();
//         }
//     }, [fields]);

//     const handleClickOutside = (event) => {
//         if (formRef.current && !formRef.current.contains(event.target)) {
//             setEditMode(false);
//         }
//     };

//     useEffect(() => {
//         if (editMode) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [editMode]);

//     const handleFileChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setImageFile(reader.result);
//                 localStorage.setItem('backgroundImage', reader.result);
//             };

//             reader.readAsDataURL(file);
//         }
//     };

//     const handleAddShadow = () => {
//         setBoxShadow('rgba(0, 0, 0, 0.35) 0px 5px 15px');
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.boxShadow = boxShadow;
//         }
//     };

//     const updateFormWidth = (width) => {
//         setFormWidth(width);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.width = width;
//         }
//     };

//     const updatePadding = (padding) => {
//         setPadding(padding);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.padding = padding;
//         }
//     }
//     const handleBorderColorChange = (e) => {
//         setBorderColor(e.target.value);
//     };

//     const handleBorderWidthChange = (e) => {
//         const value = e.target.value;
//         setBorderWidth(value);
//     };

//     const handleBorderStyleChange = (e) => {
//         setBorderStyle(e.target.value);
//     };

//     const updateBorderRadius = (borderRadius) => {
//         setBorderRadius(borderRadius);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.borderRadius = borderRadius;
//         }
//     }

//     const toggleFieldEnabled = () => {
//         setIsFieldEnabled(!isFieldEnabled);
//     };

//     const handleSubmits = (e) => {
//         e.preventDefault();
//         handleAddDescription(descriptionText);
//     };

//     const handleAddDescription = (text) => {
//         const descriptionField = {
//             id: editingDescriptionId || generateUniqueId(),
//             type: 'description',
//             text: descriptionText,
//             label: 'Description',
//         };
//         setFields((prevFields) => [...prevFields, descriptionField]);
//         setShowDescriptionPopup(false);
//         setDescriptionText('');
//         setEditingDescriptionId(null)

//     };

//     const toggleFields = () => {
//         setShowFields(true);
//     };

//     const toggleSettings = () => {
//         setShowFields(false);
//     };

//     const hanldeField = () => {
//         setShowField(!showField);
//     }

//     const capitalizeFirstLetter = (string) => {
//         if (!string) return "";
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     };

//     const toggleOptions = () => {
//         setIsOptionsVisible(prev => !prev);
//     };

//     const handleCloseProperties = () => {
//         setIsPropertiesVisible(false);
//         setSelectedField(null);
//     };

//     return (
//         <div>
//             <div className="builder-container">
//                 <h3>Forms</h3>
//                 <div className='builder_form_name'>
//                     <h1>Form Name</h1>
//                     <input
//                         type="text"
//                         value={formTitle}
//                         onChange={(e) => setFormTitle(e.target.value)}
//                         placeholder="Enter Name"
//                     />
//                 </div>
//                 <div className='builder-forms_rapp'>
//                     <div className="builder-wrp">
//                         <div className="controls-main-wrp">
//                             <div className="controls-wrp">
//                                 {showField && (<div className="controls">
//                                     <div className='builder-form-element'>
//                                         <div className='buil_form_texttt'>
//                                             <div className='buil_form_texttt_p'>
//                                                 <h2>Form Elements</h2>
//                                             </div>
//                                         </div>
//                                         {/* <div className='builder_element_close' style={{ cursor: "pointer" }} onClick={hanldeField}>
//                                             <img src={close} alt="" />
//                                         </div> */}
//                                     </div>
//                                     <div className='builder_fieldes'>
//                                         <div className='builder_form_select_control'>
//                                             <div
//                                                 className={`builder_form_fields ${showFields ? 'active' : ''}`}
//                                                 onClick={toggleFields}
//                                             >
//                                                 <h2>Fields</h2>
//                                             </div>
//                                             <div
//                                                 className={`builder_form_setting ${!showFields ? 'active' : ''}`}
//                                                 onClick={toggleSettings}
//                                             >
//                                                 <h2>Settings</h2>
//                                             </div>

//                                         </div>
//                                         {showFields ? (
//                                             <div className='build_form_btns'>
//                                                 <div className='builderr_field_wrpp'>
//                                                     <button onClick={() => addInputField('name')}>
//                                                         <span className='form_builder_field_img'>
//                                                             <img src={text} alt="Name" />
//                                                         </span>
//                                                         <span><h4>Name</h4></span>
//                                                     </button>
//                                                 </div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('text')}><span className='form_builder_field_img'><img src={text} alt="" /></span> <span><h4>Text Input</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('heading')}><span className='form_builder_field_img'><img src={heading} alt="" /></span> <span><h4>Heading</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('description')}><span className='form_builder_field_img'><img src={font} alt="" /></span> <span><h4>Description</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('radio')}><span className='form_builder_field_img'><img src={radio} alt="" /></span> <span><h4>Radio Button</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('checkbox')}><span className='form_builder_field_img'><img src={checkbox} alt="" /></span> <span><h4>Checkbox</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('select')}><span className='form_builder_field_img'><img src={selection} alt="" /></span> <span><h4>Select Box</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('textarea')}><span className='form_builder_field_img'><img src={text1} alt="" /></span> <span><h4>Textarea</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('file')}><span className='form_builder_field_img'><img src={upload} alt="" /></span> <span><h4>File Upload</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('number')}><span className='form_builder_field_img'><img src={number} alt="" /></span> <span><h4>Number Input</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('email')}><span className='form_builder_field_img'><img src={email} alt="" /></span> <span><h4>Email address</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('phone')}><span className='form_builder_field_img'><img src={phone} alt="" /></span> <span><h4>Phone number</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('password')}><span className='form_builder_field_img'><img src={password1} alt="" /></span> <span><h4>Password</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('url')}><span className='form_builder_field_img'><img src={url} alt="" /></span> <span><h4>Url</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('location')}><span className='form_builder_field_img'><img src={location1} alt="" /></span> <span><h4>Location</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('toggle')}><span className='form_builder_field_img'><img src={toggle} alt="" /></span> <span><h4>Toggle</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('date')}><span className='form_builder_field_img'><img src={date} alt="" /></span> <span><h4>Date</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('datetime')}><span className='form_builder_field_img'><img src={detetime} alt="" /></span> <span><h4>Datetime</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('time')}><span className='form_builder_field_img'><img src={time} alt="" /></span> <span><h4>Time</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('slider')}><span className='form_builder_field_img'><img src={slider} alt="" /></span> <span><h4>Slider</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('images')}><span className='form_builder_field_img'><img src={image} alt="" /></span> <span><h4>Images</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('button')}><span className='form_builder_field_img'><img src={btn} alt="" /></span> <span><h4>Button</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('divider')}><span className='form_builder_field_img'><img src={divider2} alt="" /></span> <span><h4>Divider</h4></span></button></div>
//                                                 <div className='builderr_field_wrpp'> <button onClick={() => addInputField('link')}><span className='form_builder_field_img'><img src={link1} alt="" /></span> <span><h4>Link</h4></span></button></div>
//                                             </div>
//                                         ) : (
//                                             <div>

//                                                 <div className='edit_form_close'>

//                                                     <div className='edit-formwrap'>
//                                                         <h3>Edit Form Properties</h3>
//                                                         <div className='edit-form-options'>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>
//                                                                     Background Color:

//                                                                 </label>
//                                                                 <input
//                                                                     type="color"
//                                                                     value={backgroundColor}
//                                                                     onChange={(e) => setBackgroundColor(e.target.value)}
//                                                                 />
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Upload Background Image:</label>
//                                                                 <input
//                                                                     type="file"
//                                                                     accept="image/*"
//                                                                     onChange={handleFileChange}
//                                                                 />
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Background Shadow:</label>
//                                                                 <button className='edit_shadowadd' onClick={handleAddShadow}>Add Shadow</button>

//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Input Width:</label>
//                                                                 <select
//                                                                     value={formWidth}
//                                                                     onChange={(e) => updateFormWidth(e.target.value)}
//                                                                 >
//                                                                     <option value="30%">30%</option>
//                                                                     <option value="50%">50%</option>
//                                                                     <option value="80%">80%</option>
//                                                                     <option value="100%">100%</option>
//                                                                 </select>
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Padding:</label>
//                                                                 <input
//                                                                     type='text'
//                                                                     value={padding}
//                                                                     onChange={(e) => updatePadding(e.target.value)}
//                                                                 />
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Border Width:</label>
//                                                                 <input
//                                                                     type='text'
//                                                                     value={borderWidth}
//                                                                     onChange={handleBorderWidthChange}
//                                                                     placeholder="e.g., 1px"
//                                                                 />
//                                                                 <div>
//                                                                     <label>Style:</label>
//                                                                     <select onChange={handleBorderStyleChange} value={borderStyle} style={{ marginRight: '10px' }}>
//                                                                         <option value="solid">Solid</option>
//                                                                         <option value="dashed">Dashed</option>
//                                                                         <option value="dotted">Dotted</option>

//                                                                     </select>
//                                                                 </div>
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Border-Color:</label>
//                                                                 <input
//                                                                     type='color'
//                                                                     value={borderColor}
//                                                                     onChange={handleBorderColorChange}

//                                                                 />
//                                                             </div>
//                                                             <div className='edit_setting_bg'>
//                                                                 <label>Border-Radius:</label>
//                                                                 <input
//                                                                     type='text'
//                                                                     value={borderRadius}
//                                                                     onChange={(e) => updateBorderRadius(e.target.value)}
//                                                                 />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}

//                                     </div>
//                                 </div>
//                                 )}
//                             </div>
//                             <div className='form_builder_build'>
//                                 <div id='bg_change' className="form-builder-wrp" >
//                                     <div id="formBuilder" className="form-builder" >
//                                         {fields.length > 0 ? (fields.map((field, index) => (
//                                             <div
//                                                 key={field.id}
//                                                 className="input-field"
//                                                 style={{ width: field.width || '100%', opacity: field.opacity || 1 }}
//                                                 onClick={() => handleFieldClick(field, index)}
//                                             >
//                                                 {field.type === 'name' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%", ...field.styles }}>
//                                                         <label style={{ color: (selectedField && selectedField.id === field.id) ? '#DF0404' : '#404B52' }}>
//                                                             {field.label}
//                                                             <div className="input-width-container">
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('name', e.target.value)}
//                                                                 />
//                                                             </div>
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>

//                                                 )}
//                                                 {field.type === 'text' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }} >
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                 {field.label || "Text Input"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('text', e.target.value, field.id)}

//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}

//                                                 {field.type === 'heading' && (
//                                                     <div className={`input-field ${field.customClass || ''}`} style={{ width: "100%" }}>
//                                                         <div className='form_builder_heading_hover'>
//                                                             <label>
//                                                                 <div style={{ fontSize: field.fontSize || '16px', width: field.width, opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}>
//                                                                     {React.createElement(
//                                                                         field.level || 'h1',
//                                                                         null,
//                                                                         field.text || "Default Heading"
//                                                                     )}
//                                                                 </div>
//                                                             </label>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'description' && (
//                                                     <div className={`input-field ${field.customClass || ''}`} style={{ width: field.width || '100%' }}>
//                                                         <div className='form_builder_heading_hover'>
//                                                             <label>

//                                                                 <div className="description-field" style={{ fontSize: field.fontSize || '16px', width: field.width, opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}>
//                                                                     <p>{field.text || "Default Description"}</p>
//                                                                 </div>
//                                                             </label>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 <div className='form-build-radio-wrp-options'>
//                                                     {field.type === 'radio' && (
//                                                         <div
//                                                             className={`input-field ${field.customClass}`}
//                                                             style={{ width: "100%" }}
//                                                         >
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                 {field.label || "Radio Button"}
//                                                             </label>
//                                                             <div className='form-build-box' style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                                 onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                 onMouseLeave={() => {
//                                                                     if (!(selectedField && selectedField.id === field.id)) {
//                                                                         setHoveredFieldId(null);
//                                                                     }
//                                                                 }}>

//                                                                 {field.options.map((option, index) => (
//                                                                     <div key={option.id || index} className='form_radio_flex' >
//                                                                         <input
//                                                                             type="radio"
//                                                                             name={field.name}
//                                                                             value={option.value}
//                                                                             disabled={field.disabled}
//                                                                             readOnly={field.readonly}
//                                                                         />
//                                                                         <label>{option.label}</label>
//                                                                     </div>
//                                                                 ))}
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}

//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'checkbox' && (

//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                 {field.label || "Checkbox Group"}</label>
//                                                             <div className='form-build-box' style={{ opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                                 onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                 onMouseLeave={() => {
//                                                                     if (!(selectedField && selectedField.id === field.id)) {
//                                                                         setHoveredFieldId(null);
//                                                                     }
//                                                                 }}>

//                                                                 {field.options.map(option => (
//                                                                     <div key={option.id} >
//                                                                         <input type="checkbox"
//                                                                             name={field.name}
//                                                                             disabled={field.disabled}
//                                                                             readOnly={field.readonly}
//                                                                         />

//                                                                         <span>{option.name}</span>
//                                                                     </div>
//                                                                 ))}
//                                                                 {field.description && <div className='description'>{field.description}</div>}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {field.type === 'select' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Select Option"}</label>
//                                                             <select
//                                                                 style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                 onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                 onMouseLeave={() => {
//                                                                     if (!(selectedField && selectedField.id === field.id)) {
//                                                                         setHoveredFieldId(null);
//                                                                     }
//                                                                 }}
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             >

//                                                                 {field.options.map((option, index) => (
//                                                                     <option key={option.id} value={option.name}>
//                                                                         {option.name}
//                                                                     </option>
//                                                                 ))}
//                                                             </select>

//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'textarea' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                     {field.label || "Enter text:"}
//                                                                     <textarea
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         placeholder={field.placeholder}
//                                                                         name={field.name}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'file' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                     {field.label || "Upload file:"}
//                                                                     <input
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         type="file"
//                                                                         name={field.name}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 {field.type === 'number' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                 {field.label || "Number"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="number"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('Number', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'email' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Email"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="email"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'phone' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Phone Number"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="tel"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('phone', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}

//                                                 {field.type === 'password' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Password"}
//                                                                 <input
//                                                                     style={{ opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="password"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('password', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'url' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Url"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="url"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('url', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'location' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div>
//                                                             <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                 {field.label || "Location"}
//                                                                 <input
//                                                                     style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                     onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                     onMouseLeave={() => {
//                                                                         if (!(selectedField && selectedField.id === field.id)) {
//                                                                             setHoveredFieldId(null);
//                                                                         }
//                                                                     }}
//                                                                     type="location"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     required={field.required}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                     onChange={(e) => updateFieldProperty('location', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 {field.type === 'toggle' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <div style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                             onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                             onMouseLeave={() => {
//                                                                 if (!(selectedField && selectedField.id === field.id)) {
//                                                                     setHoveredFieldId(null);
//                                                                 }
//                                                             }}>
//                                                             <label className="toggle-switch" style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                 {field.label || "Toggle"}
//                                                                 <input

//                                                                     type="checkbox"
//                                                                     checked={isFieldEnabled}
//                                                                     onChange={toggleFieldEnabled}
//                                                                     name={field.name}
//                                                                 />
//                                                                 <span className="slider"></span>
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'date' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                     {field.label || "Date"}
//                                                                     <input
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         type="date"
//                                                                         className="name"
//                                                                         name={field.name}
//                                                                         placeholder={field.placeholder}
//                                                                         required={field.required}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                         onChange={(e) => updateFieldProperty('date', e.target.value, field.id)}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'datetime' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                     {field.label || "Datetime"}
//                                                                     <input
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         type="datetime-local"
//                                                                         className="name"
//                                                                         name={field.name}
//                                                                         placeholder={field.placeholder}
//                                                                         required={field.required}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                         onChange={(e) => updateFieldProperty('datetime', e.target.value, field.id)}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'time' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                     {field.label || "Time"}
//                                                                     <input
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         type="time"
//                                                                         className="name"
//                                                                         name={field.name}
//                                                                         placeholder={field.placeholder}
//                                                                         required={field.required}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                         onChange={(e) => updateFieldProperty('time', e.target.value, field.id)}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'slider' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                                     {field.label || "Slider"}
//                                                                     <div style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}>

//                                                                         <input
//                                                                             type="range"
//                                                                             className="name"
//                                                                             min="1" max="100"
//                                                                             name={field.name}
//                                                                             placeholder={field.placeholder}
//                                                                             required={field.required}
//                                                                             disabled={field.disabled}
//                                                                             readOnly={field.readonly}
//                                                                             onChange={(e) => updateFieldProperty('slider', e.target.value, field.id)}
//                                                                         />
//                                                                     </div>
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'images' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                             <div>
//                                                                 <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>

//                                                                     {field.label || "Images"}
//                                                                     <input
//                                                                         style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                         onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                         onMouseLeave={() => {
//                                                                             if (!(selectedField && selectedField.id === field.id)) {
//                                                                                 setHoveredFieldId(null);
//                                                                             }
//                                                                         }}
//                                                                         type="file"
//                                                                         name={field.name}
//                                                                         disabled={field.disabled}
//                                                                         readOnly={field.readonly}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'button' && (
//                                                         <div
//                                                             className={`input-field ${field.customClass}`}
//                                                             style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                             onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                             onMouseLeave={() => {
//                                                                 if (!(selectedField && selectedField.id === field.id)) {
//                                                                     setHoveredFieldId(null);
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 type="button"
//                                                                 style={{
//                                                                     width: field.buttonWidth,
//                                                                     height: field.buttonheight,
//                                                                     backgroundColor: field.backgroundColor,
//                                                                     fontSize: `${field.fontSize}px`,
//                                                                     color: '#ffff',
//                                                                     padding: field.padding,

//                                                                 }}

//                                                             >
//                                                                 {field.label}
//                                                             </button>

//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='form-build-checkbox-wrp-options'>
//                                                     {field.type === 'divider' && (
//                                                         <div className={`input-field ${field.customClass}`} style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '', }}
//                                                             onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                             onMouseLeave={() => {
//                                                                 if (!(selectedField && selectedField.id === field.id)) {
//                                                                     setHoveredFieldId(null);
//                                                                 }
//                                                             }}>

//                                                             <hr style={{ margin: '20px 0', border: `1px solid ${field.dividerColor}`, width: '100%' }} />
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {field.type === 'link' && (
//                                                     <div className={`input-field ${field.customClass}`} style={{ width: "100%" }}>
//                                                         <label style={{ color: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? ' #DF0404' : ' #404B52', }}>
//                                                             {field.label}
//                                                             <input
//                                                                 style={{ width: '100%', opacity: field.opacity || 1, border: (selectedField && selectedField.id === field.id) || (hoveredFieldId === field.id) ? '1px solid #DF0404' : '1px solid #B5B7C0', }}
//                                                                 onMouseEnter={() => setHoveredFieldId(field.id)}
//                                                                 onMouseLeave={() => {
//                                                                     if (!(selectedField && selectedField.id === field.id)) {
//                                                                         setHoveredFieldId(null);
//                                                                     }
//                                                                 }}
//                                                                 type="link"
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 placeholder="Enter link text"
//                                                                 onChange={(e) => updateFieldProperty('link', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                     </div>
//                                                 )}
//                                                 {(hoveredFieldId === field.id || (selectedField && selectedField.id === field.id)) && (
//                                                     <div className='form-builder-radio-btn'>
//                                                         <button
//                                                             className="remove-btn"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 removeField(field.id);
//                                                             }}>
//                                                             <img src={delete1} alt="delete" />
//                                                         </button>
//                                                         <button className="copy-btn" onClick={() => addInputField(field.type)}>
//                                                             <img src={maximizesize} alt="copy" />
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))
//                                         ) : (
//                                             <div className="builder-block-img-forms">
//                                                 <img src={vecter1} alt="" />
//                                                 <div className='builder-block-img-forms-paragraph'>
//                                                     <p>Let's create the forms.</p>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>

//                         <ConfirmationPopup
//                             isVisible={showConfirmationPopup}
//                             onClose={handleCancelStatusChange}
//                             onConfirm={handleStatusChange}
//                         />

//                         <div className="form-builder-change-propertites" ref={propertiesPanelRef} style={{ display: isPropertiesVisible ? 'block' : 'none' }}>
//                             {selectedField && (
//                                 <div className='efef'>

//                                     <div className='form_qucik'>
//                                         <p>Qucick setup Settings</p>
//                                     </div>
//                                     <div className='form_build_propertities'>
//                                         <div className="form-builder-chaneging-wrap">
//                                             <label>Label</label>
//                                             <input
//                                                 type="text"
//                                                 value={selectedField.label}
//                                                 onChange={(e) => updateFieldProperty('label', e.target.value)}
//                                             />
//                                         </div>
//                                         {selectedField.type === 'name' && (
//                                             <div className='form_build_name_custom'>
//                                                 <select onChange={(e) => {
//                                                     const newLabel = e.target.value;
//                                                     updateFieldProperty('label', newLabel);
//                                                 }}>
//                                                     <option value="Full name">Full name</option>
//                                                     <option value="First name">First name</option>
//                                                     <option value="Last name">Last name</option>
//                                                 </select>
//                                             </div>
//                                         )}
//                                         {selectedField.type === 'select' && (
//                                             <div className="popup-content">
//                                                 <h2>Select Options</h2>
//                                                 {selectOptions.map((option, index) => (
//                                                     <div key={option.id} className="select-option">
//                                                         <label style={{ display: 'flex', alignItems: 'center' }}>
//                                                             <input
//                                                                 type="text"
//                                                                 value={option.name}
//                                                                 onChange={(e) => handleOptionNameChangees(index, e.target.value, 'select')}
//                                                                 placeholder={`Enter option name`}
//                                                             />
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                                 <button className='plus_option' onClick={addSelectOption}>+</button>
//                                                 <button className='plus_option' onClick={handleAddSelectOptions}>Add Select Input</button>

//                                             </div>
//                                         )}
//                                         {selectedField.type === 'radio' && (
//                                             <div>
//                                                 {radioOptions.map((option, index) => (
//                                                     <div key={option.id} className="radio-option">
//                                                         <label>
//                                                             <input
//                                                                 type="text"
//                                                                 value={option.label}
//                                                                 onChange={(e) => handleOptionNameChange(index, e.target.value)}
//                                                                 placeholder={`Enter option name`}

//                                                             />
//                                                         </label>
//                                                     </div>
//                                                 ))}
//                                                 <button className='plus_option' onClick={addRadioOption}>+</button>
//                                                 <button className='plus_option' onClick={handleAddRadioOptions}>Save Options</button>

//                                             </div>
//                                         )}


//                                         {selectedField.type === 'checkbox' && (
//                                             <div>
//                                                 <div className="popup-content">
//                                                     <h2>Checkbox Options</h2>
//                                                     {checkboxOptions.map((option, index) => (
//                                                         <div key={option.id} className="checkbox-option">
//                                                             <label style={{ display: 'flex', alignItems: 'center' }}>
//                                                                 <input
//                                                                     type="text"
//                                                                     value={option.name}
//                                                                     onChange={(e) => handleOptionNameChanges(index, e.target.value)}
//                                                                     placeholder={`Enter option name`}

//                                                                 />

//                                                             </label>
//                                                         </div>
//                                                     ))}

//                                                     <button className='plus_option' onClick={addCheckboxOption}>+</button>
//                                                     <button className='plus_option' onClick={handleAddCheckboxOptions}>Save Changes</button>

//                                                 </div>
//                                             </div>
//                                         )}
//                                         {selectedField.type === 'divider' && (
//                                             <div>
//                                                 <label>Divider Color</label>
//                                                 <input
//                                                     type="color"
//                                                     value={selectedField.dividerColor}
//                                                     onChange={(e) => updateFieldProperty('dividerColor', e.target.value)}
//                                                 />
//                                             </div>
//                                         )}

//                                         {selectedField.type === 'button' && (
//                                             <>
//                                                 <div className="form-builder-changing-wrap">
//                                                     <div>

//                                                         <div className='checkbox-option'>
//                                                             <label>Button Label</label>
//                                                             <input
//                                                                 type="text"
//                                                                 value={selectedField.label}
//                                                                 onChange={(e) => updateFieldProperty('label', e.target.value)}
//                                                             />
//                                                         </div>

//                                                         <div className='checkbox-option'>
//                                                             <label>Font Size (px)</label>
//                                                             <input
//                                                                 type="number"
//                                                                 value={selectedField.fontSize}
//                                                                 onChange={(e) => updateFieldProperty('fontSize', e.target.value)}
//                                                             />
//                                                         </div>
//                                                         <div className='checkbox-option'>
//                                                             <label>Button Padding (px)</label>
//                                                             <input
//                                                                 type="text"
//                                                                 value={selectedField.padding}
//                                                                 onChange={(e) => updateFieldProperty('padding', e.target.value)}
//                                                                 placeholder="e.g., 10px"
//                                                             />
//                                                         </div>
//                                                         <div className='checkbox-option'>
//                                                             <label>Width (px)</label>
//                                                             <input
//                                                                 type="number"
//                                                                 value={selectedField.buttonWidth ? selectedField.buttonWidth.replace('px', '') : '150'}
//                                                                 onChange={(e) => updateFieldProperty('buttonWidth', `${e.target.value}px`)}
//                                                                 placeholder="e.g., 150"
//                                                             />
//                                                         </div>
//                                                         <div className='checkbox-option'>
//                                                             <label>Height (px)</label>
//                                                             <input
//                                                                 type="number"
//                                                                 value={selectedField.buttonheight ? selectedField.buttonheight.replace('px', '') : '40'}
//                                                                 onChange={(e) => updateFieldProperty('buttonheight', `${e.target.value}px`)}
//                                                                 placeholder="e.g., 40"
//                                                             />
//                                                         </div>
//                                                         <div className='checkbox-option'>
//                                                             <label>Background Color</label>
//                                                             <input
//                                                                 type="color"
//                                                                 value={selectedField.backgroundColor}
//                                                                 onChange={(e) => updateFieldProperty('backgroundColor', e.target.value)}
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </>
//                                         )}

//                                         {selectedField.type === 'heading' && (
//                                             <>
//                                                 <div className="form-builder-chaneging-wrap">
//                                                     <label>Heading Level</label>
//                                                     <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
//                                                         {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
//                                                             <option key={level} value={level}>{level.toUpperCase()}</option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                                 <div className="form-builder-chaneging-wrap">
//                                                     <label>Heading Text</label>
//                                                     <input
//                                                         type="text"
//                                                         value={headingText}
//                                                         onChange={(e) => setHeadingText(e.target.value)}
//                                                     />
//                                                     <label>
//                                                         Font Size (px):
//                                                         <input
//                                                             type="text"
//                                                             value={headingFontSize}
//                                                             onChange={(e) => setHeadingFontSize(e.target.value)}
//                                                         />
//                                                     </label>
//                                                 </div>

//                                             </>
//                                         )}
//                                         {selectedField.type === 'description' && (
//                                             <>
//                                                 <div className="form-builder-chaneging-wrap">
//                                                     <label>Description Text</label>
//                                                     <textarea
//                                                         value={descriptionText}
//                                                         onChange={(e) => setDescriptionText(e.target.value)}
//                                                     />
//                                                 </div>

//                                             </>
//                                         )}
//                                         <div className="form-builder-chaneging-wrap">
//                                             <label>Placeholder</label>
//                                             <input
//                                                 type="text"
//                                                 value={selectedField.placeholder}
//                                                 onChange={(e) => updateFieldProperty('placeholder', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="form-builder-chaneging-wrap">
//                                             <label>Description</label>
//                                             <input
//                                                 type="text"
//                                                 value={selectedField.description}
//                                                 onChange={(e) => updateFieldProperty('description', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="form-builder-chaneging-wrap">
//                                             <label>Input Width</label>
//                                             <select
//                                                 value={selectedField.width}
//                                                 onChange={(e) => {
//                                                     const newWidth = e.target.value;
//                                                     updateFieldProperty('width', newWidth);
//                                                 }}
//                                             >
//                                                 <option value="50%">50%</option>
//                                                 <option value="80%">80%</option>
//                                                 <option value="100%">100%</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-builder-chaneging-wrap">
//                                             <label>Custom Class</label>
//                                             <input
//                                                 type="text"
//                                                 value={selectedField?.customClass || ''}
//                                                 onChange={(e) => updateFieldProperty('customClass', e.target.value)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='form_builder_option_select'>
//                                         <div className='build_otpion_flex' style={{ cursor: 'pointer' }} onClick={toggleOptions}>

//                                             <div className='form_builder_option_p'>
//                                                 <p>Options</p>
//                                             </div>
//                                             <div className='option_icon'>
//                                                 <div className={`arrow ${isOptionsVisible ? 'show-arrow' : 'hide-arrow'}`}>
//                                                     <img src={downarrow} alt="Collapse options" />
//                                                 </div>
//                                                 <div className={`arrow ${!isOptionsVisible ? 'show-arrow' : 'hide-arrow'}`}>
//                                                     <img src={downarrow1} alt="Expand options" />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className={`form-builder-options-container ${isOptionsVisible ? 'show' : 'hide'}`}>
//                                             <div className="form-builder-chaneging-wrap">
//                                                 <label>Required</label>
//                                                 <label className="toggle-switch">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedField?.required || false}
//                                                         onChange={(e) => updateFieldProperty('required', e.target.checked)}
//                                                     />
//                                                     <span className="slider"></span>
//                                                 </label>
//                                             </div>
//                                             <div className="form-builder-chaneging-wrap">
//                                                 <label>Disabled</label>
//                                                 <label className="toggle-switch">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedField?.disabled || false}
//                                                         onChange={(e) => updateFieldProperty('disabled', e.target.checked)}
//                                                     />
//                                                     <span className="slider"></span>
//                                                 </label>
//                                             </div>
//                                             <div className="form-builder-chaneging-wrap">
//                                                 <label>Readonly</label>
//                                                 <label className="toggle-switch">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedField?.readonly || false}
//                                                         onChange={(e) => updateFieldProperty('readonly', e.target.checked)}
//                                                     />
//                                                     <span className="slider"></span>
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="form-builder-chaneging-wrap_dis">
//                                         <div className='form-builder_disable'>
//                                             <label>Disable</label>
//                                         </div>
//                                         <div className='form-builder_plus'>
//                                             <img src={plus} alt="" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                     </div>
//                 </div>
//                 <div className='btn_form_bulider'>
//                     <div className="form-submission-wrp">
//                         <button className="cancle-form-btn">Cancle</button>
//                     </div>
//                     <div className="form-submission-wrp">
//                         <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update Form' : 'Save'}</button>
//                     </div>
//                 </div>
//             </div>

//             <div className='form-builder-wrap-popup-inputs'>
//                 {showPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>Configure Radio Button Option</h4>
//                             {radioOptions.map((option, index) => (
//                                 <div key={option.id} className="radio-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="radio"
//                                             name="radioOption"
//                                             value={option.label}
//                                             checked={selectedOption === option.name}
//                                             onChange={handleRadioOptionChange}
//                                         />
//                                         <input
//                                             type="text"
//                                             value={option.label}
//                                             onChange={(e) => handleOptionNameChange(index, e.target.value)}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addRadioOption}>+</button>
//                             <button onClick={handleAddRadioOptions}>Add Radio Button</button>
//                             <button className='heading_cancle' onClick={() => setShowPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {showCheckboxPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h2>Checkbox Options</h2>
//                             {checkboxOptions.map((option, index) => (
//                                 <div key={option.id} className="checkbox-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="checkbox"
//                                             name="checkboxOption"
//                                             value={option.name}
//                                             checked={selectedOption === option.name}
//                                             onChange={handleRadioOptionChange}
//                                         />
//                                         <input
//                                             type="text"
//                                             value={option.name}
//                                             onChange={(e) => handleOptionNameChanges(index, e.target.value, 'checkbox')}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addCheckboxOption}>+</button>
//                             <button onClick={handleAddCheckboxOptions}>Add Checkbox Group</button>
//                             <button className='heading_cancle' onClick={() => setShowCheckboxPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//                 {showSelectPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h2>Select Options</h2>
//                             {selectOptions.map((option, index) => (
//                                 <div key={option.id} className="select-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="text"
//                                             value={option.name}
//                                             onChange={(e) => handleOptionNameChangees(index, e.target.value, 'select')}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addSelectOption}>+</button>
//                             <button onClick={handleAddSelectOptions}>Add Select Input</button>
//                             <button className='heading_cancle' onClick={() => setShowSelectPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//                 {showHeadingPopup && (

//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>{editingHeadingId ? 'Edit Heading' : 'Select Heading Level'}</h4>
//                             <form onSubmit={editingHeadingId ? (e) => { e.preventDefault(); saveEditedHeading(); } : handleSubmit}>
//                                 <div>
//                                     <label>
//                                         Heading Level:
//                                         <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
//                                             {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(level => (
//                                                 <option key={level} value={level}>{level.toUpperCase()}</option>
//                                             ))}
//                                         </select>
//                                     </label>
//                                 </div>
//                                 <div>
//                                     <label>
//                                         Heading Text:
//                                         <input
//                                             type="text"
//                                             value={headingText}
//                                             onChange={(e) => setHeadingText(e.target.value)}
//                                             required
//                                         />
//                                     </label>
//                                     <label>
//                                         Font Size (px):
//                                         <input
//                                             type="text"
//                                             value={headingFontSize}
//                                             onChange={(e) => setHeadingFontSize(e.target.value)}
//                                         />
//                                     </label>
//                                 </div>
//                                 <button onClick={handleAddHeading}>Add Heading</button>
//                                 <button className='heading_cancle' onClick={() => setShowHeadingPopup(false)}>Cancel</button>

//                             </form>
//                         </div>
//                     </div>
//                 )}
//                 {showDescriptionPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>{editingDescriptionId ? 'Edit Description' : 'Add Description'}</h4>
//                             <form onSubmit={handleSubmits}>
//                                 <div>
//                                     <label>
//                                         Description:
//                                         <textarea
//                                             value={descriptionText}
//                                             onChange={(e) => setDescriptionText(e.target.value)}
//                                             required
//                                         />
//                                     </label>
//                                 </div>
//                                 <button onClick={handleAddDescription}>Add Description</button>
//                                 <button className='heading_cancle' onClick={() => setShowDescriptionPopup(false)}>Cancel</button>
//                             </form>
//                         </div>
//                     </div>)}
//             </div>

//         </div>
//     );
// };

// export default Formgenerated;




// import React, { useState, useEffect } from 'react';
// import Sortable from 'sortablejs';
// import { format } from 'date-fns';
// import axios from 'axios';

// const generateUniqueId = (length = 22) => {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let uniqueId = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         uniqueId += charset[randomIndex];
//     }
//     return uniqueId;
// };

// const App = () => {
//     const [fields, setFields] = useState([]);
//     const [formTitle, setFormTitle] = useState('');
//     const [showFormBuilder, setShowFormBuilder] = useState(false);
//     const [createdForms, setCreatedForms] = useState([]);
//     const [view, setView] = useState('live');
//     const [searchbar, setSearchbar] = useState('')
//     const [currentFormId, setCurrentFormId] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingFormId, setEditingFormId] = useState(null);
//     const [isPopupVisible, setIsPopupVisible] = React.useState(false);
//     const [showId, setShowId] = useState(false);

//     useEffect(() => {
//         const storedForms = JSON.parse(localStorage.getItem('createdForms')) || [];
//         setCreatedForms(storedForms);
//     }, []);

//     const createInputField = (type) => ({
//         id: generateUniqueId(),
//         type,
//     });

//     const addInputField = (type) => {
//         setFields((prevFields) => [...prevFields, createInputField(type)]);
//     };

//     const removeField = (id) => {
//         setFields((prevFields) => prevFields.filter(field => field.id !== id));
//     };

//     const handleCreate = () => {
//         const formId = generateUniqueId();
//         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");
//         if (!formTitle.trim()) {
//             alert('Please enter a title for the form.');
//             return;
//         }
//         const existingForm = createdForms.find(form => form.title === formTitle);

//         if (existingForm && !isEditing) {
//             alert('A form with this title already exists. Please choose a different title.');
//             return;
//         }

//         const newForm = { id: isEditing ? editingFormId : formId, title: formTitle, fields: fields, createdAt: timestamp, hidden: false };
//         const updatedForms = isEditing ? createdForms.map(form => form.id === editingFormId ? newForm : form) : [...createdForms, newForm];
//         setCreatedForms(updatedForms);
//         localStorage.setItem('createdForms', JSON.stringify(updatedForms));
//         setFields([]);
//         setFormTitle('');
//         setShowFormBuilder(false);
//         setView('live');
//         setIsEditing(false);
//         setEditingFormId(null);
//         axios.post('http://localhost:4001/form-data', {
//             formId: newForm.id,
//             title: newForm.title,
//             fields: newForm.fields,
//             createdAt: newForm.createdAt
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => {
//                 console.log('Form data saved successfully:', response.data);
//             })
//             .catch(error => {
//                 console.error('Error saving form data:', error);
//             });
//     }

//     const handleEdit = (formId) => {
//         const formToEdit = createdForms.find(form => form.id === formId);
//         if (formToEdit) {
//             setFields(formToEdit.fields);
//             setFormTitle(formToEdit.title);
//             setEditingFormId(formToEdit.id);
//             setShowFormBuilder(true);
//             setIsEditing(true);
//         }
//     };

//     const handleShowFormDetails = (formId) => {
//         setCurrentFormId(formId);
//         setIsPopupVisible(true);
//     };

//     const handleDeleteForm = (formId) => {
//         const updatedForms = createdForms.filter(form => form.id !== formId);
//         setCreatedForms(updatedForms);
//         localStorage.setItem('createdForms', JSON.stringify(updatedForms));

//         if (updatedForms.length === 0 && view === 'live') {
//             setView('draft');
//         }

//         if (currentFormId === formId) {
//             setCurrentFormId(null);
//         }
//     };

//     const handleCopyFormId = (formId) => {
//         navigator.clipboard.writeText(formId).then(() => {
//             console.log(`Form ID: ${formId} copied to clipboard!`);
//         }).catch(err => {
//             console.error('Failed to copy form ID: ', err);
//         });
//         setShowId(!showId);
//     };

//     const handleCopyPopId = (formId) => {
//         navigator.clipboard.writeText(formId).then(() => {
//             alert(`Form ID: ${formId} copied to clipboard!`);
//         }).catch(err => {
//             console.error('Failed to copy form ID: ', err);
//         });
//     }

//     const handleHideform = (formId) => {
//         setCurrentFormId(currentFormId === formId ? null : formId);
//     };

//     const handleSearch = () => {
//         if (!searchbar) {
//             alert('Please enter a search term!');
//             return;
//         }
//         const filteredForms = createdForms.filter(form =>
//             form.title.toLowerCase().includes(searchbar.toLowerCase())
//         );
//         if (filteredForms.length > 0) {
//             alert('Forms are available!');
//             setCreatedForms(filteredForms);
//             setSearchbar('');
//         } else {
//             alert('No forms available!');
//         }
//     };

//     useEffect(() => {
//         const formBuilder = document.getElementById('formBuilder');
//         if (formBuilder) {
//             Sortable.create(formBuilder, {
//                 animation: 150,
//                 ghostClass: 'dragging',
//             });
//         }
//     }, [fields]);

//     return (
//         <>
//             {!showFormBuilder ? (
//                 <div>
//                     <div className='builder-forms'>
//                         <h3>Forms</h3>
//                         <div className="builder-sections">
//                             <div className="builder-sections-forms">
//                                 <div
//                                     className={`builder-sections-liveform ${view === 'live' ? 'active' : ''}`}
//                                     onClick={() => setView('live')}
//                                     style={{ backgroundColor: view === 'live' ? '#E4E6E7' : '', cursor: 'pointer' }}
//                                 >
//                                     <p>Live Forms</p>
//                                 </div>
//                                 <div
//                                     className={`builder-sections-draftform ${view === 'draft' ? 'active' : ''}`}
//                                     onClick={() => setView('draft')}
//                                     style={{ backgroundColor: view === 'draft' ? '#E4E6E7' : '', cursor: 'pointer' }}
//                                 >
//                                     <p>Draft Forms</p>
//                                 </div>
//                             </div>
//                             <div className="builder-sections-newforms">
//                                 <button
//                                     className="builder-sections-btn action_btn"
//                                     onClick={() => setShowFormBuilder(true)}
//                                 >
//                                     <div className="btn-icon">
//                                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                             <path d="M10.75 5.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.5h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5Z"></path>
//                                         </svg>
//                                     </div>
//                                     <div className="btn-text">
//                                         New Form
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//                         {view === 'draft' && fields.length === 0 ? (
//                             <div className="builder-block">
//                                 <div className='builder-block-wrp'>
//                                     <div className='builder-block-image'>
//                                         <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="" />
//                                     </div>
//                                 </div>
//                                 <div className="builder-block-test">
//                                     <p>No Draft forms created!</p>
//                                 </div>
//                             </div>
//                         ) : view === 'live' && createdForms.length === 0 ? (
//                             <div className="builder-block">
//                                 <div className='builder-block-wrp'>
//                                     <div className='builder-block-image'>
//                                         <img src="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="" />
//                                     </div>
//                                 </div>
//                                 <div className="builder-block-test">
//                                     <p>No forms created!</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="form-builder-show">
//                                 <div className="form-builder-wrrp">
//                                     <div className='form-builder-search'>
//                                         <div className='form-builder-search-bar'>
//                                             <input
//                                                 type="search"
//                                                 placeholder='search'
//                                                 value={searchbar}
//                                                 onChange={(e) => setSearchbar(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="btn-search" onClick={handleSearch}>
//                                             <p>Search</p>
//                                         </div>
//                                     </div>
//                                     {createdForms.length > 0 ? (
//                                         <div className="form-main-wrp">
//                                             <div className='form-builder-table'>
//                                                 <table>
//                                                     <thead className="custom-thead">
//                                                         <tr>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">Form title</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">
//                                                                 Form ID <i className="fa fa-question-circle" aria-hidden="true" data-placement="bottom" data-toggle="tooltip" data-original-title="For OS 2.0 themes to display the form in the block"></i>
//                                                             </th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Copy</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Responses</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">Created on</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Actions</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {createdForms.map(form => (
//                                                             <tr key={form.id}>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" >
//                                                                     <div className="form-builder-wrpp-show-Polaris" onClick={() => handleEdit(form.id)} >{form.title}
//                                                                         <div class="noUi-tooltip">Edit</div>
//                                                                     </div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">
//                                                                     <div className="form-builder-wrpp-show-Polaris">{form.id}</div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>
//                                                                     <div className="formId-copy" onClick={() => handleCopyFormId(form.id)}>
//                                                                         <svg viewBox="0 0 20 20">
//                                                                             <path fillRule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path>
//                                                                         </svg>
//                                                                         <div className="noUi-tooltip-id">Grab your embed code</div>
//                                                                     </div>
//                                                                     <div className='form-builder-form id-copy'>
//                                                                         {showId && (
//                                                                             <div className="modal">
//                                                                                 <div className="modal-content">
//                                                                                     <div className='form-builder-icon-id' onClick={() => handleCopyFormId(form.id)}>
//                                                                                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                                                                             <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
//                                                                                         </svg>
//                                                                                     </div>
//                                                                                     <div className="formId-copy-popup-Id" onClick={() => handleCopyPopId(form.id)}>
//                                                                                         <svg viewBox="0 0 20 20">
//                                                                                             <path fillRule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path>
//                                                                                         </svg>
//                                                                                     </div>

//                                                                                     ID:   {form.id}
//                                                                                 </div>
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>0</th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">{form.createdAt}</th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>
//                                                                     <div className='form-builder-table-flex-btn'>
//                                                                         <div className='form-builder-edit' onClick={() => handleEdit(form.id)}>
//                                                                             <svg viewBox="0 0 20 20" class="import-export-icon" >
//                                                                                 <path fill-rule="evenodd" d="M15.655 4.344a2.695 2.695 0 0 0-3.81 0l-.599.599-.009-.009-1.06 1.06.008.01-5.88 5.88a2.75 2.75 0 0 0-.805 1.944v1.922a.75.75 0 0 0 .75.75h1.922a2.75 2.75 0 0 0 1.944-.806l7.54-7.539a2.695 2.695 0 0 0 0-3.81Zm-4.409 2.72-5.88 5.88a1.25 1.25 0 0 0-.366.884v1.172h1.172c.331 0 .65-.132.883-.366l5.88-5.88-1.689-1.69Zm2.75.629.599-.599a1.195 1.195 0 1 0-1.69-1.689l-.598.599 1.69 1.689Z"></path>
//                                                                             </svg>
//                                                                             <div className="noUi-tooltip-id">Edit</div>
//                                                                         </div>
//                                                                         <div className='form-delete-icon' onClick={() => handleDeleteForm(form.id)} style={{ cursor: 'pointer', color: 'red' }}>
//                                                                             <svg className="import-export-icon" aria-hidden="true" focusable="false">
//                                                                                 <path d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z"></path>
//                                                                                 <path d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z"></path>
//                                                                                 <path fill-rule="evenodd" d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z"></path>
//                                                                             </svg>
//                                                                             <div className="noUi-tooltip-id">Delete</div>
//                                                                         </div>

//                                                                         <div className='form-show-icon' onClick={() => handleShowFormDetails(form.id)}>
//                                                                             <p >
//                                                                                 <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg import-export-icon" focusable="false" aria-hidden="true">
//                                                                                     <path d="M17.3536 6.71439L11.8123 1.17306C11.7481 1.10859 11.6719 1.05746 11.5878 1.02259C11.5038 0.987718 11.4138 0.969803 11.3228 0.969874H5.78148C5.31355 0.915639 4.83941 0.967913 4.39454 1.12279C3.94966 1.27766 3.54557 1.53112 3.21248 1.86421C2.87939 2.1973 2.62592 2.6014 2.47105 3.04627C2.31618 3.49115 2.26391 3.96528 2.31814 4.43321V15.5159C2.26391 15.9838 2.31618 16.458 2.47105 16.9028C2.62592 17.3477 2.87939 17.7518 3.21248 18.0849C3.54557 18.418 3.94966 18.6714 4.39454 18.8263C4.83941 18.9812 5.31355 19.0335 5.78148 18.9792H14.0935C14.5614 19.0335 15.0355 18.9812 15.4804 18.8263C15.9253 18.6714 16.3294 18.418 16.6625 18.0849C16.9956 17.7518 17.249 17.3477 17.4039 16.9028C17.5588 16.458 17.6111 15.9838 17.5568 15.5159V7.20388C17.5569 7.11292 17.539 7.02285 17.5041 6.93885C17.4692 6.85484 17.4181 6.77856 17.3536 6.71439ZM12.0155 3.3351L15.1916 6.51121H14.0935C12.637 6.51121 12.0155 5.88966 12.0155 4.43321V3.3351ZM14.0935 17.5939H5.78148C4.32503 17.5939 3.70348 16.9723 3.70348 15.5159V4.43321C3.70348 2.97676 4.32503 2.35521 5.78148 2.35521H10.6301V4.43321C10.5759 4.90114 10.6282 5.37527 10.7831 5.82015C10.9379 6.26502 11.1914 6.66912 11.5245 7.00221C11.8576 7.3353 12.2617 7.58876 12.7065 7.74364C13.1514 7.89851 13.6256 7.95078 14.0935 7.89655H16.1715V15.5159C16.1715 16.9723 15.5499 17.5939 14.0935 17.5939ZM12.2279 13.5949C12.5894 13.0467 12.7821 12.4044 12.782 11.7478C12.7849 10.9908 12.535 10.2546 12.072 9.6558C11.609 9.057 10.9593 8.62991 10.226 8.44225C9.49268 8.25458 8.71771 8.31709 8.02395 8.61985C7.3302 8.92262 6.75737 9.44831 6.39629 10.1136C6.03522 10.7788 5.90656 11.5456 6.03072 12.2923C6.15487 13.039 6.52474 13.7229 7.08168 14.2355C7.63862 14.7481 8.35074 15.0601 9.10514 15.1221C9.85954 15.1841 10.613 14.9924 11.2462 14.5776L12.6777 16.0081C12.809 16.1305 12.9826 16.1971 13.1621 16.1939C13.3415 16.1908 13.5128 16.1181 13.6397 15.9912C13.7666 15.8643 13.8393 15.693 13.8424 15.5136C13.8456 15.3341 13.779 15.1605 13.6566 15.0292L12.2279 13.5949ZM7.3977 11.7478C7.39752 11.3519 7.51474 10.9649 7.73454 10.6356C7.95434 10.3064 8.26684 10.0497 8.63252 9.89811C8.99821 9.7465 9.40064 9.70673 9.78892 9.78385C10.1772 9.86097 10.5339 10.0515 10.8139 10.3314C11.0939 10.6112 11.2846 10.9678 11.3619 11.3561C11.4392 11.7443 11.3996 12.1468 11.2481 12.5125C11.0967 12.8783 10.8402 13.1909 10.511 13.4108C10.1819 13.6308 9.79491 13.7482 9.39905 13.7482C8.86809 13.7477 8.35904 13.5364 7.98377 13.1608C7.6085 12.7852 7.3977 12.276 7.3977 11.745V11.7478Z" fill="#5C5F62"></path>
//                                                                                 </svg>
//                                                                             </p>
//                                                                             <div className="noUi-tooltip-id">Form Preview</div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </th>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                                 <div className='form-builder-show-totle-form'>
//                                                     Showing all {createdForms.length} records !
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="form-builder-no-forms">
//                                             <p>No forms created yet</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                         {isPopupVisible && currentFormId && (
//                             <div className='form-builder-create section-wrp'>
//                                 {view === 'live' && createdForms.length > 0 && createdForms.map(form => (
//                                     form.id === currentFormId && (
//                                         <div key={form.id} className="form-details">
//                                             {form.fields.map(field => (
//                                                 <div key={field.id} className="input-field">
//                                                     {field.type === 'text' && <input type="text" placeholder="Text Input" />}
//                                                     {field.type === 'radio' && (
//                                                         <div>
//                                                             <input type="radio" name={`radioGroup_${field.id}`} /> Radio Button
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'checkbox' && (
//                                                         <div>
//                                                             <input type="checkbox" /> Checkbox
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'select' && (
//                                                         <select>
//                                                             <option value="">Select an option</option>
//                                                             <option value="option1">Option 1</option>
//                                                             <option value="option2">Option 2</option>
//                                                             <option value="option3">Option 3</option>
//                                                         </select>
//                                                     )}
//                                                     {field.type === 'textarea' && <textarea placeholder="Enter text"></textarea>}
//                                                     {field.type === 'file' && <input type="file" />}
//                                                 </div>
//                                             ))}
//                                             <div className='form-builder-icon-delete' onClick={() => handleHideform(form.id)}>
//                                                 <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                                     <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     )
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div >
//             ) : (
//                 <div className="builder-container">
//                     <h3>Form Builder</h3>
//                     <div>
//                         <label>Form Title:</label>
//                         <input
//                             type="text"
//                             value={formTitle}
//                             onChange={(e) => setFormTitle(e.target.value)}
//                             placeholder="Enter form title"
//                         />
//                     </div>
//                     <div className="builder-wrp">
//                         <div className="controls-main-wrp">
//                             <div className="controls-wrp">
//                                 <div className="controls">
//                                     <button onClick={() => addInputField('text')}><span><i className="fa fa-text-width" aria-hidden="true"></i></span> <span>Text Input</span></button>
//                                     <button onClick={() => addInputField('radio')}> <span><i className="fa fa-check-circle" aria-hidden="true"></i></span> <span>Radio Button </span></button>
//                                     <button onClick={() => addInputField('checkbox')}> <span><i className="fa fa-check-square" aria-hidden="true"></i></span> <span>Checkbox</span> </button>
//                                     <button onClick={() => addInputField('select')}> <span><i className="fa fa-list-ul" aria-hidden="true"></i></span> <span>Select Box</span></button>
//                                     <button onClick={() => addInputField('textarea')}> <span><i className="fa fa-file-text-o" aria-hidden="true"></i></span> <span>Textarea</span></button>
//                                     <button onClick={() => addInputField('file')}> <span><i className="fa fa-file" aria-hidden="true"></i></span> <span>File Upload</span></button>
//                                 </div>
//                             </div>
//                             <div className="form-builder-wrp">
//                                 <div id="formBuilder" className="form-builder">
//                                     {fields.map(field => (
//                                         <div key={field.id} className="input-field">
//                                             {field.type === 'text' && (
//                                                 <label>
//                                                     Text Input:
//                                                     <input type="text" placeholder="Text Input" />
//                                                 </label>
//                                             )}
//                                             {field.type === 'radio' && (
//                                                 <label>
//                                                     <input type="radio" name={`radioGroup_${field.id}`} /> Radio Button
//                                                 </label>
//                                             )}
//                                             {field.type === 'checkbox' && (
//                                                 <label>
//                                                     <input type="checkbox" /> Checkbox
//                                                 </label>
//                                             )}
//                                             {field.type === 'select' && (
//                                                 <label>
//                                                     Select an option:
//                                                     <select>
//                                                         <option value="">Select an option</option>
//                                                         <option value="option1">Option 1</option>
//                                                         <option value="option2">Option 2</option>
//                                                         <option value="option3">Option 3</option>
//                                                     </select>
//                                                 </label>
//                                             )}
//                                             {field.type === 'textarea' && (
//                                                 <label>
//                                                     Enter text:
//                                                     <textarea placeholder="Enter text"></textarea>
//                                                 </label>
//                                             )}
//                                             {field.type === 'file' && (
//                                                 <label>
//                                                     Upload file:
//                                                     <input type="file" />
//                                                 </label>
//                                             )}
//                                             <button className="remove-btn" onClick={() => removeField(field.id)}>
//                                                 <i className="fa fa-trash-o" aria-hidden="true"></i>
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>
//                         <div className="form-submission-wrp">
//                             <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update Form' : 'Create Form'}</button>
//                         </div>
//                     </div>
//                     <div className="form-builder-change-propertites">
//                         <div className="form-builder-chaneging-wrap">
//                             Name : <input type="text" />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             Label:<input type="text" />
//                         </div>

//                     </div>
//                 </div>

//             )}

//         </>
//     );
// };

// export default App;
















// import React, { useState, useEffect, useRef } from 'react';
// import Sortable from 'sortablejs';
// import { format } from 'date-fns';
// import axios from 'axios';
// import ReCAPTCHA from 'react-google-recaptcha';

// const generateUniqueId = (length = 22) => {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let uniqueId = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         uniqueId += charset[randomIndex];
//     }
//     return uniqueId;
// };
// const App = () => {
//     const [fields, setFields] = useState([]);
//     const [formTitle, setFormTitle] = useState('');
//     const [showFormBuilder, setShowFormBuilder] = useState(false);
//     const [createdForms, setCreatedForms] = useState([]);
//     const [view, setView] = useState('live');
//     const [searchbar, setSearchbar] = useState('');
//     const [currentFormId, setCurrentFormId] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingFormId, setEditingFormId] = useState(null);
//     const [isPopupVisible, setIsPopupVisible] = React.useState(false);
//     const [showId, setShowId] = useState(false);
//     const [selectedField, setSelectedField] = useState(null);
//     const formPropertyEditorRef = useRef(null);
//     const [editMode, setEditMode] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState('#ffffff');
//     const [backgroundImage, setBackgroundImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [boxShadow, setBoxShadow] = useState('');
//     const [formWidth, setFormWidth] = useState('100%');
//     const [padding, setPadding] = useState('0');
//     const [borderRadius, setBorderRadius] = useState('0');
//     const [borderColor, setBorderColor] = useState('#ffffff');
//     const formRef = useRef(null);
//     const [isFieldEnabled, setIsFieldEnabled] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [showSelectPopup, setShowSelectPopup] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');

//     useEffect(() => {
//         const storedForms = JSON.parse(localStorage.getItem('createdForms')) || [];
//         setCreatedForms(storedForms);

//     }, []);

//     useEffect(() => {
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.backgroundColor = backgroundColor;
//             formBuilder.style.backgroundImage = imageFile ? `url(${URL.createObjectURL(imageFile)})` : backgroundImage || 'none';
//             formBuilder.style.backgroundSize = 'cover';
//             formBuilder.style.backgroundRepeat = 'no-repeat';
//             formBuilder.style.boxShadow = boxShadow;
//             formBuilder.style.width = formWidth;
//             formBuilder.style.padding = padding;
//             formBuilder.style.borderColor = borderColor;
//             formBuilder.style.borderRadius = borderRadius;
//         }
//     }, [backgroundColor, imageFile, backgroundImage, formWidth, padding, borderColor, borderRadius, fields.length]);

//     const createInputField = (type, options = [], isFieldEnabled = true) => {
//         return {
//             id: generateUniqueId(),
//             type,
//             name: type === 'text' ? 'text' : '',
//             label: type === 'select' ? 'Select' :
//                 type === 'radio' ? 'Radio Button' :
//                     type === 'textarea' ? 'Textarea' :
//                         type === 'file' ? 'File Upload' :
//                             '',
//             placeholder: type === 'textarea' ? 'Enter text' : '',
//             description: '',
//             disabled: !isFieldEnabled,
//             width: '100%',
//             required: false,
//             readonly: false,
//             customClass: '',
//             options
//         };
//     };

//     const addInputField = (type) => {
//         if (type === 'radio') {
//             setShowPopup(true);
//         } else if (type === 'select') {
//             setShowSelectPopup(true);
//         } else {
//             setFields((prevFields) => [...prevFields, createInputField(type)]);
//         }
//     };

//     const handleRadioOptionChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     const handleAddRadioOptions = () => {
//         if (selectedOption) {
//             setFields((prevFields) => [...prevFields, createInputField('radio', [selectedOption])]);
//             setShowPopup(false);
//             setSelectedOption('');
//         } else {
//             alert('Please select an option.');
//         }
//     };

//     const handleAddSelectOption = () => {
//         if (selectedOption) {
//             setFields((prevFields) => [...prevFields, createInputField('select', [selectedOption])]);
//             setShowSelectPopup(false);
//             setSelectedOption('');
//         } else {
//             alert('Please select an option.');
//         }
//     };

//     const removeField = (id) => {
//         setFields((prevFields) => {
//             const newFields = prevFields.filter(field => field.id !== id);

//             if (newFields.length === 0) {
//                 setBackgroundImage('');
//                 setBackgroundColor('#ffffff');
//                 setImageFile(null);
//                 setBoxShadow('');
//                 setFormWidth('100%');
//                 setPadding('0');
//                 setBorderColor('#ffffff');
//                 setBorderRadius('0');

//             }

//             if (selectedField && selectedField.id === id) {
//                 setSelectedField(null);
//             }
//             return newFields;
//         });
//     };

//     const handleCreate = () => {
//         const formId = generateUniqueId();
//         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

//         if (!formTitle.trim()) {
//             alert('Please enter a title for the form.');
//             return;
//         }

//         const existingForm = createdForms.find(form => form.title === formTitle);

//         if (existingForm && !isEditing) {
//             alert('A form with this title already exists. Please choose a different title.');
//             return;
//         }

//         const backgroundImageUrl = imageFile ? `url(${URL.createObjectURL(imageFile)})` : backgroundImage;

//         const newForm = {
//             id: isEditing ? editingFormId : formId,
//             title: formTitle,
//             fields: fields,
//             createdAt: timestamp,
//             hidden: false,
//             styles: {
//                 backgroundColor,
//                 backgroundImage: backgroundImageUrl,
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 boxShadow,
//                 width: formWidth,
//                 padding,
//                 borderColor,
//                 borderRadius,

//             }
//         };

//         const updatedForms = isEditing
//             ? createdForms.map(form => form.id === editingFormId ? newForm : form)
//             : [...createdForms, newForm];

//         setCreatedForms(updatedForms);
//         setCurrentFormId(newForm.id);
//         localStorage.setItem('createdForms', JSON.stringify(updatedForms));
//         setFields([]);
//         setFormTitle('');
//         setShowFormBuilder(false);
//         setView('live');
//         setIsEditing(false);
//         setEditingFormId(null);
//         setFormWidth('100%');
//         setBackgroundImage(null);
//         setImageFile('');

//         axios.post('http://localhost:4001/form-data', {
//             formId: newForm.id,
//             title: newForm.title,
//             fields: newForm.fields,
//             createdAt: newForm.createdAt
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => {
//                 console.log('Form data saved successfully:', response.data);
//             })
//             .catch(error => {
//                 console.error('Error saving form data:', error);
//             });
//     };

//     const handleFieldClick = (field) => {
//         if (selectedField && selectedField.id === field.id) {
//             setSelectedField(null);
//         } else {
//             setSelectedField(field);
//         }
//     };

//     const handleEditForm = () => {
//         setEditMode(!editMode);
//     };

//     const updateFieldProperty = (property, value) => {
//         if (selectedField) {
//             setFields((prevFields) =>
//                 prevFields.map((field) =>
//                     field.id === selectedField.id ? { ...field, [property]: value } : field
//                 )
//             );
//             setSelectedField((prevField) => ({ ...prevField, [property]: value }));
//         }
//     };

//     useEffect(() => {
//         const formBuilder = document.getElementById('formBuilder');
//         if (formBuilder) {
//             const sortable = Sortable.create(formBuilder, {
//                 animation: 150,
//                 ghostClass: 'dragging',
//                 onEnd: (event) => {
//                     const updatedFields = [...fields];
//                     const [movedItem] = updatedFields.splice(event.oldIndex, 1);
//                     updatedFields.splice(event.newIndex, 0, movedItem);
//                     setFields(updatedFields);
//                 },
//             });

//             return () => sortable.destroy();
//         }
//     }, [fields]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (formPropertyEditorRef.current && !formPropertyEditorRef.current.contains(event.target)) {
//                 setSelectedField(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleClickOutside = (event) => {
//         if (formRef.current && !formRef.current.contains(event.target)) {
//             setEditMode(false);
//         }
//     };

//     useEffect(() => {
//         if (editMode) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [editMode]);

//     const handleFileChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             setImageFile(event.target.files[0]);
//         }
//     };
//     const handleAddShadow = () => {
//         setBoxShadow('rgba(0, 0, 0, 0.35) 0px 5px 15px');
//     };

//     const updateFormWidth = (width) => {
//         setFormWidth(width);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.width = width;
//         }
//     };

//     const updatePadding = (padding) => {
//         setPadding(padding);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.padding = padding;
//         }
//     }

//     const updateBorderRadius = (borderRadius) => {
//         setBorderRadius(borderRadius);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.borderRadius = borderRadius;
//         }
//     }

//     const handleSearch = () => {
//         if (!searchbar) {
//             alert('Please enter a search term!');
//             return;
//         }
//         const filteredForms = createdForms.filter(form =>
//             form.title.toLowerCase().includes(searchbar.toLowerCase())
//         );
//         if (filteredForms.length > 0) {
//             alert('Forms are available!');
//             setCreatedForms(filteredForms);
//             setSearchbar('');
//         } else {
//             alert('No forms available!');
//         }
//     };

//     const handleEdit = (formId) => {
//         const form = createdForms.find(form => form.id === formId);
//         if (form) {
//             setFields(form.fields);
//             setFormTitle(form.title);
//             setBackgroundColor(form.styles.backgroundColor);
//             setBackgroundImage(form.styles.backgroundImage);
//             setImageFile(null);
//             setBoxShadow(form.styles.boxShadow || '');
//             setFormWidth(form.styles.width || '100%');
//             setPadding(form.styles.padding || '0');
//             setBorderColor(form.styles.borderColor || '#ffffff');
//             setBorderRadius(form.styles.borderRadius || '0');
//             setIsEditing(true);
//             setEditingFormId(formId);
//             setShowFormBuilder(true);
//         }
//     };

//     const handleShowFormDetails = (formId) => {
//         setCurrentFormId(formId);
//         setIsPopupVisible(true);
//     };

//     const handleDeleteForm = (formId) => {
//         const updatedForms = createdForms.filter(form => form.id !== formId);
//         setCreatedForms(updatedForms);
//         localStorage.setItem('createdForms', JSON.stringify(updatedForms));

//         if (updatedForms.length === 0 && view === 'live') {
//             setView('draft');
//         }

//         if (currentFormId === formId) {
//             setCurrentFormId(null);
//         }
//     };

//     const handleCopyFormId = (formId) => {
//         navigator.clipboard.writeText(formId).then(() => {
//             console.log(`Form ID: ${formId} copied to clipboard!`);
//         }).catch(err => {
//             console.error('Failed to copy form ID: ', err);
//         });
//         setShowId(!showId);
//     };
//     const handleCopyPopId = (formId) => {
//         navigator.clipboard.writeText(formId).then(() => {
//             alert(`Form ID: ${formId} copied to clipboard!`);
//         }).catch(err => {
//             console.error('Failed to copy form ID: ', err);
//         });
//     }

//     const handleHideform = (formId) => {
//         setCurrentFormId(currentFormId === formId ? null : formId);
//     };

//     const handlenewForm = () => {
//         setShowFormBuilder(true);
//         setBackgroundColor('');
//     }

//     const toggleFieldEnabled = () => {
//         setIsFieldEnabled(!isFieldEnabled);
//     };
//     const handleCaptchaChange = (value) => {
//         console.log("Captcha value:", value);

//     };

//     return (
//         <>
//             {!showFormBuilder ? (
//                 <div>
//                     <div className='builder-forms'>
//                         <h3>Forms</h3>
//                         <div className="builder-sections">
//                             <div className="builder-sections-forms">
//                                 <div
//                                     className={`builder-sections-liveform ${view === 'live' ? 'active' : ''}`}
//                                     onClick={() => setView('live')}
//                                     style={{ backgroundColor: view === 'live' ? '#E4E6E7' : '', cursor: 'pointer' }}
//                                 >
//                                     <p>Live Forms</p>
//                                 </div>
//                                 <div
//                                     className={`builder-sections-draftform ${view === 'draft' ? 'active' : ''}`}
//                                     onClick={() => setView('draft')}
//                                     style={{ backgroundColor: view === 'draft' ? '#E4E6E7' : '', cursor: 'pointer' }}
//                                 >
//                                     <p>Draft Forms</p>
//                                 </div>
//                             </div>
//                             <div className="builder-sections-newforms">
//                                 <button
//                                     className="builder-sections-btn action_btn"
//                                     onClick={(e) => handlenewForm(e.target.value)}
//                                 >
//                                     <div className="btn-icon">
//                                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                             <path d="M10.75 5.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.5h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5Z"></path>
//                                         </svg>
//                                     </div>
//                                     <div className="btn-text">
//                                         New Form
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//                         {view === 'draft' && fields.length === 0 ? (
//                             <div className="builder-block">
//                                 <div className='builder-block-wrp'>
//                                     <div className='builder-block-image'>
//                                         <img src="https:cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="" />
//                                     </div>
//                                 </div>
//                                 <div className="builder-block-test">
//                                     <p>No Draft forms created!</p>
//                                 </div>
//                             </div>
//                         ) : view === 'live' && createdForms.length === 0 ? (
//                             <div className="builder-block">
//                                 <div className='builder-block-wrp'>
//                                     <div className='builder-block-image'>
//                                         <img src="https:cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png" alt="" />
//                                     </div>
//                                 </div>
//                                 <div className="builder-block-test">
//                                     <p>No forms created!</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="form-builder-show">
//                                 <div className="form-builder-wrrp">
//                                     <div className='form-builder-search'>
//                                         <div className='form-builder-search-bar'>
//                                             <input
//                                                 type="search"
//                                                 placeholder='search'
//                                                 value={searchbar}
//                                                 onChange={(e) => setSearchbar(e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="btn-search" onClick={handleSearch}>
//                                             <p>Search</p>
//                                         </div>
//                                     </div>
//                                     {createdForms.length > 0 ? (
//                                         <div className="form-main-wrp">
//                                             <div className='form-builder-table'>
//                                                 <table>
//                                                     <thead className="custom-thead">
//                                                         <tr>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">Form title</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">
//                                                                 Form ID <i className="fa fa-question-circle" aria-hidden="true" data-placement="bottom" data-toggle="tooltip" data-original-title="For OS 2.0 themes to display the form in the block"></i>
//                                                             </th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Copy</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Responses</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header">Created on</th>
//                                                             <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" style={{ textAlign: "center" }}>Actions</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {createdForms.map(form => (
//                                                             <tr key={form.id}>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" >
//                                                                     <div className="form-builder-wrpp-show-Polaris" onClick={() => handleEdit(form.id)} >{form.title}
//                                                                         <div class="noUi-tooltip">Edit</div>
//                                                                     </div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">
//                                                                     <div className="form-builder-wrpp-show-Polaris">{form.id}</div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>
//                                                                     <div className="formId-copy" onClick={() => handleCopyFormId(form.id)}>
//                                                                         <svg viewBox="0 0 20 20">
//                                                                             <path fillRule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path>
//                                                                         </svg>
//                                                                         <div className="noUi-tooltip-id">Grab your embed code</div>
//                                                                     </div>
//                                                                     <div className='form-builder-form id-copy'>
//                                                                         {showId && (
//                                                                             <div className="modal">
//                                                                                 <div className="modal-content">
//                                                                                     <div className='form-builder-icon-id' onClick={() => handleCopyFormId(form.id)}>
//                                                                                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                                                                             <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
//                                                                                         </svg>
//                                                                                     </div>
//                                                                                     <div className="formId-copy-popup-Id" onClick={() => handleCopyPopId(form.id)}>
//                                                                                         <svg viewBox="0 0 20 20">
//                                                                                             <path fillRule="evenodd" d="M6.515 4.75a2 2 0 0 1 1.985-1.75h3a2 2 0 0 1 1.985 1.75h.265a2.25 2.25 0 0 1 2.25 2.25v7.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-7.75a2.25 2.25 0 0 1 2.25-2.25h.265Zm1.985-.25h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-1.987 1.73.002.02h-.265a.75.75 0 0 0-.75.75v7.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-7.75a.75.75 0 0 0-.75-.75h-.265a2 2 0 0 1-1.985 1.75h-3a2 2 0 0 1-1.987-1.77Z"></path>
//                                                                                         </svg>
//                                                                                     </div>

//                                                                                     ID:{form.id}
//                                                                                 </div>
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 </th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>0</th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">{form.createdAt}</th>
//                                                                 <th data-polaris-header-cell="true" class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ textAlign: "center" }}>
//                                                                     <div className='form-builder-table-flex-btn'>
//                                                                         <div className='form-builder-edit' onClick={() => handleEdit(form.id)}>
//                                                                             <svg viewBox="0 0 20 20" class="import-export-icon" >
//                                                                                 <path fill-rule="evenodd" d="M15.655 4.344a2.695 2.695 0 0 0-3.81 0l-.599.599-.009-.009-1.06 1.06.008.01-5.88 5.88a2.75 2.75 0 0 0-.805 1.944v1.922a.75.75 0 0 0 .75.75h1.922a2.75 2.75 0 0 0 1.944-.806l7.54-7.539a2.695 2.695 0 0 0 0-3.81Zm-4.409 2.72-5.88 5.88a1.25 1.25 0 0 0-.366.884v1.172h1.172c.331 0 .65-.132.883-.366l5.88-5.88-1.689-1.69Zm2.75.629.599-.599a1.195 1.195 0 1 0-1.69-1.689l-.598.599 1.69 1.689Z"></path>
//                                                                             </svg>
//                                                                             <div className="noUi-tooltip-id">Edit</div>
//                                                                         </div>
//                                                                         <div className='form-delete-icon' onClick={() => handleDeleteForm(form.id)} style={{ cursor: 'pointer', color: 'red' }}>
//                                                                             <svg className="import-export-icon" aria-hidden="true" focusable="false">
//                                                                                 <path d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z"></path>
//                                                                                 <path d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z"></path>
//                                                                                 <path fill-rule="evenodd" d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z"></path>
//                                                                             </svg>
//                                                                             <div className="noUi-tooltip-id">Delete</div>
//                                                                         </div>

//                                                                         <div className='form-show-icon' onClick={() => handleShowFormDetails(form.id)}>
//                                                                             <p>
//                                                                                 <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg import-export-icon" focusable="false" aria-hidden="true">
//                                                                                     <path d="M17.3536 6.71439L11.8123 1.17306C11.7481 1.10859 11.6719 1.05746 11.5878 1.02259C11.5038 0.987718 11.4138 0.969803 11.3228 0.969874H5.78148C5.31355 0.915639 4.83941 0.967913 4.39454 1.12279C3.94966 1.27766 3.54557 1.53112 3.21248 1.86421C2.87939 2.1973 2.62592 2.6014 2.47105 3.04627C2.31618 3.49115 2.26391 3.96528 2.31814 4.43321V15.5159C2.26391 15.9838 2.31618 16.458 2.47105 16.9028C2.62592 17.3477 2.87939 17.7518 3.21248 18.0849C3.54557 18.418 3.94966 18.6714 4.39454 18.8263C4.83941 18.9812 5.31355 19.0335 5.78148 18.9792H14.0935C14.5614 19.0335 15.0355 18.9812 15.4804 18.8263C15.9253 18.6714 16.3294 18.418 16.6625 18.0849C16.9956 17.7518 17.249 17.3477 17.4039 16.9028C17.5588 16.458 17.6111 15.9838 17.5568 15.5159V7.20388C17.5569 7.11292 17.539 7.02285 17.5041 6.93885C17.4692 6.85484 17.4181 6.77856 17.3536 6.71439ZM12.0155 3.3351L15.1916 6.51121H14.0935C12.637 6.51121 12.0155 5.88966 12.0155 4.43321V3.3351ZM14.0935 17.5939H5.78148C4.32503 17.5939 3.70348 16.9723 3.70348 15.5159V4.43321C3.70348 2.97676 4.32503 2.35521 5.78148 2.35521H10.6301V4.43321C10.5759 4.90114 10.6282 5.37527 10.7831 5.82015C10.9379 6.26502 11.1914 6.66912 11.5245 7.00221C11.8576 7.3353 12.2617 7.58876 12.7065 7.74364C13.1514 7.89851 13.6256 7.95078 14.0935 7.89655H16.1715V15.5159C16.1715 16.9723 15.5499 17.5939 14.0935 17.5939ZM12.2279 13.5949C12.5894 13.0467 12.7821 12.4044 12.782 11.7478C12.7849 10.9908 12.535 10.2546 12.072 9.6558C11.609 9.057 10.9593 8.62991 10.226 8.44225C9.49268 8.25458 8.71771 8.31709 8.02395 8.61985C7.3302 8.92262 6.75737 9.44831 6.39629 10.1136C6.03522 10.7788 5.90656 11.5456 6.03072 12.2923C6.15487 13.039 6.52474 13.7229 7.08168 14.2355C7.63862 14.7481 8.35074 15.0601 9.10514 15.1221C9.85954 15.1841 10.613 14.9924 11.2462 14.5776L12.6777 16.0081C12.809 16.1305 12.9826 16.1971 13.1621 16.1939C13.3415 16.1908 13.5128 16.1181 13.6397 15.9912C13.7666 15.8643 13.8393 15.693 13.8424 15.5136C13.8456 15.3341 13.779 15.1605 13.6566 15.0292L12.2279 13.5949ZM7.3977 11.7478C7.39752 11.3519 7.51474 10.9649 7.73454 10.6356C7.95434 10.3064 8.26684 10.0497 8.63252 9.89811C8.99821 9.7465 9.40064 9.70673 9.78892 9.78385C10.1772 9.86097 10.5339 10.0515 10.8139 10.3314C11.0939 10.6112 11.2846 10.9678 11.3619 11.3561C11.4392 11.7443 11.3996 12.1468 11.2481 12.5125C11.0967 12.8783 10.8402 13.1909 10.511 13.4108C10.1819 13.6308 9.79491 13.7482 9.39905 13.7482C8.86809 13.7477 8.35904 13.5364 7.98377 13.1608C7.6085 12.7852 7.3977 12.276 7.3977 11.745V11.7478Z" fill="#5C5F62"></path>
//                                                                                 </svg>
//                                                                             </p>
//                                                                             <div className="noUi-tooltip-id">Form Preview</div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </th>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                                 <div className='form-builder-show-totle-form'>
//                                                     Showing all {createdForms.length} records !
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="form-builder-no-forms">
//                                             <p>No forms created yet</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {isPopupVisible && currentFormId && (
//                             <div className='form-builder-create section-wrp' >
//                                 {view === 'live' && createdForms.length > 0 && createdForms.map(form => (
//                                     form.id === currentFormId && (
//                                         <div key={form.id} style={form.styles} className="form-details">
//                                             {form.fields.map(field => (
//                                                 <div key={field.id} style={{ width: field.width }} className="input-field">
//                                                     {field.type === 'text' && (
//                                                         <div>
//                                                             <div>
//                                                                 <label>
//                                                                     {selectedField && selectedField.id === field.id}
//                                                                     {field.label || "Text Input"}
//                                                                     <input
//                                                                         type="text"
//                                                                         className="name"
//                                                                         name={field.name}
//                                                                         placeholder={field.placeholder}

//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'radio' && (
//                                                         <div>
//                                                             <div>
//                                                                 <label>
//                                                                     {field.label || "Radio Button"}
//                                                                 </label>
//                                                                 {field.options.map((option, index) => (
//                                                                     <div key={index}>
//                                                                         <input
//                                                                             type="radio"
//                                                                             name={field.name}

//                                                                         />
//                                                                         <label>{option}</label>
//                                                                     </div>
//                                                                 ))}
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'checkbox' && (
//                                                         <div>
//                                                             <div>
//                                                                 <label>
//                                                                     <input
//                                                                         type="checkbox"
//                                                                         name={field.name}

//                                                                     />
//                                                                     {field.label || "Checkbox"}
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'select' && (
//                                                         <div >
//                                                             <div>
//                                                                 <label>
//                                                                     {field.label || "Select an option:"}
//                                                                     <select
//                                                                         name={field.name}

//                                                                     >

//                                                                         {field.options.map((option, index) => (
//                                                                             <option key={index} value={option}>{option}</option>
//                                                                         ))}
//                                                                     </select>
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'textarea' && (
//                                                         <div >
//                                                             <div>
//                                                                 <label>
//                                                                     {field.label || "Enter text:"}
//                                                                     <textarea
//                                                                         placeholder={field.placeholder}
//                                                                         name={field.name}

//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'file' && (
//                                                         <div >
//                                                             <div>
//                                                                 <label>
//                                                                     {field.label || "Upload file:"}
//                                                                     <input
//                                                                         type="file"
//                                                                         name={field.name}
//                                                                     />
//                                                                 </label>
//                                                                 <div className='description'>
//                                                                     {field.description}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'number' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Number"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'email' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Email"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'phone' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Phone"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('phone', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'password' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Password"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('password', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'url' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Url"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('url', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'location' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Location"}
//                                                                 <input
//                                                                     type="text"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('location', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>

//                                                     )}
//                                                     {field.type === 'toggle' && (
//                                                         <div className='form-builder-wrp'>
//                                                             <label className="toggle-switch">
//                                                                 {field.label || "Toggle"}
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     checked={isFieldEnabled}
//                                                                     onChange={toggleFieldEnabled}
//                                                                     name={field.name}
//                                                                 />
//                                                                 <span className="slider"></span>
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'date' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Date"}
//                                                                 <input
//                                                                     type="date"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('date', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'datetime' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Datetime"}
//                                                                 <input
//                                                                     type="datetime-local"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('datetime', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'time' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Time"}
//                                                                 <input
//                                                                     type="time"
//                                                                     className="name"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('time', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'slider' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Slider"}
//                                                                 <input
//                                                                     type="range"
//                                                                     className="name"
//                                                                     min="1" max="100"
//                                                                     name={field.name}
//                                                                     placeholder={field.placeholder}
//                                                                     onChange={(e) => updateFieldProperty('slider', e.target.value, field.id)}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>

//                                                     )}
//                                                     {field.type === 'gallery' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "Gallery"}
//                                                                 <input
//                                                                     type="file"
//                                                                     name={field.name}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                     {field.type === 'captcha' && (
//                                                         <div>
//                                                             <label>
//                                                                 {field.label || "CAPTCHA"}
//                                                                 <ReCAPTCHA
//                                                                     sitekey="YOUR_SITE_KEY"
//                                                                     onChange={handleCaptchaChange}
//                                                                 />
//                                                             </label>
//                                                             <div className='description'>
//                                                                 {field.description}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                             <div className='form-builder-icon-delete' onClick={() => handleHideform(form.id)}>
//                                                 <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
//                                                     <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     )
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div >
//             ) : (
//                 <div className="builder-container">
//                     <h3>Form Builder</h3>
//                     <div>
//                         <label>Form Title:</label>
//                         <input
//                             type="text"
//                             value={formTitle}
//                             onChange={(e) => setFormTitle(e.target.value)}
//                             placeholder="Enter form title"
//                         />
//                     </div>
//                     <div className="builder-wrp">
//                         <div className="controls-main-wrp">
//                             <div className="controls-wrp">
//                                 <div className="controls">
//                                     <button onClick={() => addInputField('text')}><span><i className="fa fa-text-width" aria-hidden="true"></i></span> <span>Text Input</span></button>
//                                     <button onClick={() => addInputField('radio')}> <span><i className="fa fa-check-circle" aria-hidden="true"></i></span> <span>Radio Button </span></button>
//                                     <button onClick={() => addInputField('checkbox')}> <span><i className="fa fa-check-square" aria-hidden="true"></i></span> <span>Checkbox</span> </button>
//                                     <button onClick={() => addInputField('select')}> <span><i className="fa fa-list-ul" aria-hidden="true"></i></span> <span>Select Box</span></button>
//                                     <button onClick={() => addInputField('textarea')}> <span><i className="fa fa-file-text-o" aria-hidden="true"></i></span> <span>Textarea</span></button>
//                                     <button onClick={() => addInputField('file')}> <span><i className="fa fa-file" aria-hidden="true"></i></span> <span>File Upload</span></button>
//                                     <button onClick={() => addInputField('number')}> <span><i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></span> <span>Number Input</span></button>
//                                     <button onClick={() => addInputField('email')}> <span><i class="fa fa-envelope-o" aria-hidden="true"></i></span> <span>Email address</span></button>
//                                     <button onClick={() => addInputField('phone')}> <span><i class="fa fa-phone-square" aria-hidden="true"></i></span> <span>Phone number</span></button>
//                                     <button onClick={() => addInputField('password')}> <span><i class="fa fa-unlock-alt" aria-hidden="true"></i></span> <span>Password</span></button>
//                                     <button onClick={() => addInputField('url')}> <span><i class="fa fa-link" aria-hidden="true"></i></span> <span>Url</span></button>
//                                     <button onClick={() => addInputField('location')}> <span><i class="fa fa-map-marker" aria-hidden="true"></i></span> <span>Location</span></button>
//                                     <button onClick={() => addInputField('toggle')}> <span><i class="fa fa-toggle-on" aria-hidden="true"></i></span> <span>Toggle</span></button>
//                                     <button onClick={() => addInputField('date')}> <span><i class="fa fa-calendar" aria-hidden="true"></i></span> <span>Date</span></button>
//                                     <button onClick={() => addInputField('datetime')}> <span><i class="fa fa-calendar-o" aria-hidden="true"></i></span> <span>Datetime</span></button>
//                                     <button onClick={() => addInputField('time')}> <span><i class="fa fa-clock-o" aria-hidden="true"></i></span> <span>Time</span></button>
//                                     <button onClick={() => addInputField('slider')}> <span><i class="fa fa-sliders" aria-hidden="true"></i></span> <span>Slider</span></button>
//                                     <button onClick={() => addInputField('gallery')}> <span><i class="fa fa-picture-o" aria-hidden="true"></i></span> <span>Gallery</span></button>
//                                     <button onClick={() => addInputField('captcha')}> <span><i class="fa fa-podcast" aria-hidden="true"></i></span> <span>Captcha</span></button>
//                                 </div>
//                             </div>
//                             <div id='bg_change' className="form-builder-wrp" >
//                                 <div id="formBuilder" className="form-builder" >
//                                     {fields.length > 0 && fields.map(field => (
//                                         <div
//                                             key={field.id}
//                                             className="input-field"
//                                             style={{ width: field.width, opacity: field.opacity || 1 }}
//                                         >
//                                             {field.type === 'text' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {selectedField && selectedField.id === field.id}
//                                                             {field.label || "Text Input"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('name', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'radio' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Radio Button"}
//                                                         </label>
//                                                         {field.options.map((option, index) => (
//                                                             <div key={index}>
//                                                                 <input
//                                                                     type="radio"
//                                                                     name={field.name}
//                                                                     value={option}
//                                                                     disabled={field.disabled}
//                                                                     readOnly={field.readonly}
//                                                                 />
//                                                                 <label>{option}</label>
//                                                             </div>
//                                                         ))}
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'checkbox' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             <input
//                                                                 type="checkbox"
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                             {field.label || "Checkbox"}
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'select' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Select an option:"}
//                                                             <select
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             >

//                                                                 {field.options.map((option, index) => (
//                                                                     <option key={index} value={option}>{option}</option>
//                                                                 ))}
//                                                             </select>
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'textarea' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Enter text:"}
//                                                             <textarea
//                                                                 placeholder={field.placeholder}
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'file' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Upload file:"}
//                                                             <input
//                                                                 type="file"
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'number' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Number"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('Number', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'email' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Email"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'phone' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Phone"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('phone', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'password' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Password"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('password', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'url' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Url"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('url', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'location' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Location"}
//                                                             <input
//                                                                 type="text"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('location', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'toggle' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label className="toggle-switch">
//                                                             {field.label || "Toggle"}
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={isFieldEnabled}
//                                                                 onChange={toggleFieldEnabled}
//                                                                 name={field.name}
//                                                             />
//                                                             <span className="slider"></span>
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'date' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Date"}
//                                                             <input
//                                                                 type="date"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('date', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'datetime' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Datetime"}
//                                                             <input
//                                                                 type="datetime-local"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('datetime', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'time' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Time"}
//                                                             <input
//                                                                 type="time"
//                                                                 className="name"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('time', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'slider' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Slider"}
//                                                             <input
//                                                                 type="range"
//                                                                 className="name"
//                                                                 min="1" max="100"
//                                                                 name={field.name}
//                                                                 placeholder={field.placeholder}
//                                                                 required={field.required}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                                 onChange={(e) => updateFieldProperty('slider', e.target.value, field.id)}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'gallery' && (
//                                                 <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <div>
//                                                         <label>
//                                                             {field.label || "Gallery"}
//                                                             <input
//                                                                 type="file"
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                         </label>
//                                                         <div className='description'>
//                                                             {field.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {field.type === 'captcha' && (
//                                                 <div className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                     <label>
//                                                         {field.label || "CAPTCHA"}
//                                                         <ReCAPTCHA
//                                                             sitekey="YOUR_SITE_KEY"
//                                                             onChange={handleCaptchaChange}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             <button className="remove-btn" onClick={() => removeField(field.id)}>
//                                                 <i className="fa fa-trash-o" aria-hidden="true"></i>
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>
//                         </div>
//                         <div className="form-submission-wrp">
//                             <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update Form' : 'Create Form'}</button>
//                         </div>
//                         <div className='button_edit'>
//                             <button className="edit-form-btn action_btn" onClick={handleEditForm}>Edit Form</button>
//                         </div>
//                     </div>
//                     <div className='edit_form_close' ref={formRef}>
//                         {editMode && (
//                             <div className='edit-formwrap'>
//                                 <h3>Edit Form Properties</h3>
//                                 <div className='edit-form-options'>
//                                     <label>
//                                         Background Color:
//                                         <input
//                                             type="color"
//                                             value={backgroundColor}
//                                             onChange={(e) => setBackgroundColor(e.target.value)}
//                                         />
//                                     </label>
//                                     <div>
//                                         <label>Upload Background Image:</label>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleFileChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label>Background Shadow:</label>
//                                         <button onClick={handleAddShadow}>Add Shadow</button>

//                                     </div>
//                                     <div >
//                                         <label>Input Width:</label>
//                                         <select
//                                             value={formWidth}
//                                             onChange={(e) => updateFormWidth(e.target.value)}
//                                         >
//                                             <option value="50%">50%</option>
//                                             <option value="100%">100%</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label>Padding:</label>
//                                         <input
//                                             type='text'
//                                             value={padding}
//                                             onChange={(e) => updatePadding(e.target.value)}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label>Border-Color:</label>
//                                         <input
//                                             type='color'
//                                             value={borderColor}
//                                             onChange={(e) => setBorderColor(e.target.value)}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label>BorderRadius:</label>
//                                         <input
//                                             type='text'
//                                             value={borderRadius}
//                                             onChange={(e) => updateBorderRadius(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//             )}
//             <div className="form-builder-change-propertites" ref={formPropertyEditorRef}>
//                 {selectedField && (
//                     <>
//                         <h3>Fields Properties </h3>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Name:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.name}
//                                 onChange={(e) => updateFieldProperty('name', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Label:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.label}
//                                 onChange={(e) => updateFieldProperty('label', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Placeholder:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.placeholder}
//                                 onChange={(e) => updateFieldProperty('placeholder', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Description:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.description}
//                                 onChange={(e) => updateFieldProperty('description', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Input Width:</label>
//                             <select
//                                 value={selectedField.width}
//                                 onChange={(e) => updateFieldProperty('width', e.target.value)}
//                             >
//                                 <option value="50%">50%</option>
//                                 <option value="100%">100%</option>
//                             </select>
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Required:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.required || false}
//                                 onChange={(e) => updateFieldProperty('required', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Disabled:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.disabled || false}
//                                 onChange={(e) => updateFieldProperty('disabled', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Readonly:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.readonly || false}
//                                 onChange={(e) => updateFieldProperty('readonly', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Custom Class:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField?.customClass || ''}
//                                 onChange={(e) => updateFieldProperty('customClass', e.target.value)}
//                             />
//                         </div>

//                     </>
//                 )}
//             </div>
//             <div className='form-builder-wrap-popup-inputs'>
//                 {showPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>Configure Radio Button Option</h4>
//                             <div>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="radioOption"
//                                         value="Male"
//                                         checked={selectedOption === 'Male'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Male
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="radioOption"
//                                         value="Female"
//                                         checked={selectedOption === 'Female'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Female
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="radioOption"
//                                         value="Other"
//                                         checked={selectedOption === 'Other'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Other
//                                 </label>
//                             </div>
//                             <button onClick={handleAddRadioOptions}>Add Radio Button</button>
//                             <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//                 {showSelectPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>Configure Select Field Option</h4>
//                             <div>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="selectOption"
//                                         value="Option 1"
//                                         checked={selectedOption === 'Option 1'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Option 1
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="selectOption"
//                                         value="Option 2"
//                                         checked={selectedOption === 'Option 2'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Option 2
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="selectOption"
//                                         value="Option 3"
//                                         checked={selectedOption === 'Option 3'}
//                                         onChange={handleRadioOptionChange}
//                                     /> Option 3
//                                 </label>
//                             </div>
//                             <button onClick={handleAddSelectOption}>Add Select Option</button>
//                             <button className="cancel" onClick={() => setShowSelectPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default App;



































// import React, { useState, useEffect, useRef } from 'react';
// import Sortable from 'sortablejs';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { useNavigate } from '@remix-run/react';
// import { useLocation } from '@remix-run/react';
// import '../index.css';

// const generateUniqueId = (length = 22) => {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let uniqueId = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         uniqueId += charset[randomIndex];
//     }
//     return uniqueId;
// };

// const Createform = () => {

//     const ConfirmationPopup = ({ isVisible, onClose, onConfirm }) => {
//         if (!isVisible) return null;

//         return (
//             <div className="confirmation-popup">
//                 <div className="confirmation-popup-content">
//                     <h4>Choose Form Status</h4>
//                     <p>Do you want to save this form as a draft or publish it live?</p>
//                     <div className="confirmation-popup-actions">
//                         <button onClick={() => onConfirm('draft')}>Save as Draft</button>
//                         <button onClick={() => onConfirm('live')}>Publish</button>
//                         <button onClick={onClose}>Cancel</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const navigator = useNavigate();
//     const location = useLocation();
//     const [fields, setFields] = useState([]);
//     const [formTitle, setFormTitle] = useState('My Form');
//     const [showFormBuilder, setShowFormBuilder] = useState(false);
//     const [createdForms, setCreatedForms] = useState([]);
//     const [view, setView] = useState('live');
//     const [currentFormId, setCurrentFormId] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingFormId, setEditingFormId] = useState(null);
//     const [selectedField, setSelectedField] = useState(null);
//     const formPropertyEditorRef = useRef(null);
//     const [editMode, setEditMode] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState('#ffffff');
//     const [backgroundImage, setBackgroundImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [boxShadow, setBoxShadow] = useState('');
//     const [formWidth, setFormWidth] = useState('100%');
//     const [padding, setPadding] = useState('0');
//     const [borderRadius, setBorderRadius] = useState('0');
//     const [borderColor, setBorderColor] = useState('#ffffff');
//     const formRef = useRef(null);
//     const [isFieldEnabled, setIsFieldEnabled] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [showSelectPopup, setShowSelectPopup] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [confirmationPopupType, setConfirmationPopupType] = useState('');
//     const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//     const [radioOptions, setRadioOptions] = useState([{ id: 1, name: 'radio1' }]);
//     const [checkboxOptions, setCheckboxOptions] = useState([{ id: 1, name: 'checkbox1' }]);
//     const [selectOptions, setSelectOptions] = useState([{ id: 1, name: 'option1' }]);
//     const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
//     const [headingLevel, setHeadingLevel] = useState('h1');
//     const [headingText, setHeadingText] = useState('');
//     const [showHeadingPopup, setShowHeadingPopup] = useState(false);
//     const [editingHeadingId, setEditingHeadingId] = useState(null);
//     const [descriptionText, setDescriptionText] = useState('');
//     const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
//     const [editingDescriptionId, setEditingDescriptionId] = useState(null);

//     useEffect(() => {
//         const storedForms = JSON.parse(localStorage.getItem('createdForms')) || [];
//         setCreatedForms(storedForms);

//     }, []);

//     useEffect(() => {
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.backgroundColor = backgroundColor;
//             formBuilder.style.backgroundImage = imageFile ? `url(${imageFile})` : backgroundImage || 'none';
//             formBuilder.style.backgroundSize = 'cover';
//             formBuilder.style.backgroundRepeat = 'no-repeat';
//             formBuilder.style.boxShadow = boxShadow;
//             formBuilder.style.width = formWidth;
//             formBuilder.style.padding = padding;
//             formBuilder.style.borderColor = borderColor;
//             formBuilder.style.borderRadius = borderRadius;
//         }
//     }, [backgroundColor, imageFile, backgroundImage, formWidth, padding, borderColor, borderRadius, fields.length]);

//     useEffect(() => {
//         if (location.state) {
//             const { formTitle, fields, formId, styles } = location.state;
//             setFormTitle(formTitle);
//             setFields(fields);
//             setEditingFormId(formId);
//             setIsEditing(true);

//             setBackgroundColor(styles.backgroundColor);
//             setBackgroundImage(styles.backgroundImage);
//             setBoxShadow(styles.boxShadow || '');
//             setFormWidth(styles.width || '100%');
//             setPadding(styles.padding || '0');
//             setBorderColor(styles.borderColor || '#ffffff');
//             setBorderRadius(styles.borderRadius || '0');
//         }
//     }, [location.state]);

//     const createInputField = (type, options = [], isFieldEnabled = true, existingField = null) => {
//         const baseField = {
//             id: generateUniqueId(),
//             type,
//             label: type === 'heading' ? '' : type.charAt(0).toUpperCase() + type.slice(1),
//             name: type === 'text' ? 'text' : '',
//             label: type === 'select' ? 'Select' :
//                 type === 'radio' ? 'Radio Button' :
//                     type === 'textarea' ? 'Textarea' :
//                         type === 'file' ? 'File Upload' :
//                             '',
//             placeholder: type === 'textarea' ? 'Enter text' : '',
//             description: '',
//             disabled: !isFieldEnabled,
//             width: '100%',
//             required: false,
//             readonly: false,
//             customClass: '',
//             options
//         };

//         return existingField ? { ...baseField, ...existingField, id: generateUniqueId() } : baseField;
//     };

//     const handleCopyField = (id) => {
//         const fieldToCopy = fields.find(field => field.id === id);
//         if (fieldToCopy) {
//             const copiedField = createInputField(fieldToCopy.type, fieldToCopy.options, true, fieldToCopy);
//             setFields(prevFields => [...prevFields, copiedField]);
//         }
//     };


//     const addInputField = (type) => {
//         if (type === 'radio') {
//             setShowPopup(true);
//         } else if (type === 'select') {
//             setShowSelectPopup(true);
//         } else if (type === 'checkbox') {
//             setShowCheckboxPopup(true);
//         } else if (type === 'heading') {
//             setShowHeadingPopup(true);
//             setHeadingText('');
//         } else if (type === 'description') {
//             setShowDescriptionPopup(true);
//         }

//         else {
//             setFields((prevFields) => [...prevFields, createInputField(type)]);
//         }
//     };

//     const handleAddHeading = (level, text) => {
//         const headingField = {
//             id: generateUniqueId(),
//             type: 'heading',
//             level,
//             text,
//         };
//         setFields((prevFields) => [...prevFields, headingField]);
//         setShowHeadingPopup(false);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleAddHeading(headingLevel, headingText);
//         setShowHeadingPopup(false);
//     };

//     const handleEditHeading = (id) => {
//         const headingField = fields.find(field => field.id === id);
//         if (headingField) {
//             setHeadingLevel(headingField.level);
//             setHeadingText(headingField.text);
//             setEditingHeadingId(id);
//             setShowHeadingPopup(true);
//         }
//     };
//     const saveEditedHeading = () => {
//         setFields((prevFields) =>
//             prevFields.map(field =>
//                 field.id === editingHeadingId ? { ...field, level: headingLevel, text: headingText } : field
//             )
//         );
//         setEditingHeadingId(null);
//         setShowHeadingPopup(false);
//     };
//     const handleRadioOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     const handleOptionNameChange = (index, newName) => {
//         const updatedOptions = radioOptions.map((option, idx) =>
//             idx === index ? { ...option, name: newName } : option
//         );
//         setRadioOptions(updatedOptions);
//     };

//     const addRadioOption = () => {
//         const newOption = {
//             id: radioOptions.length + 1,
//             name: `radio${radioOptions.length + 1}`,
//         };
//         setRadioOptions([...radioOptions, newOption]);
//     };

//     const handleAddRadioOptions = () => {
//         if (radioOptions.length > 0) {
//             const optionNames = radioOptions.map((option) => option.name);

//             setFields((prevFields) => [...prevFields, createInputField('radio', optionNames)]);
//             setShowPopup(false);
//             setRadioOptions([{ id: 1, name: 'radio1' }]);
//             setSelectedOption('');
//         } else {
//             alert('Please add at least one radio option.');
//         }
//     };

//     const handleOptionNameChanges = (index, newName, type) => {
//         if (type === 'checkbox') {
//             const updatedOptions = checkboxOptions.map((option, idx) =>
//                 idx === index ? { ...option, name: newName } : option
//             );
//             setCheckboxOptions(updatedOptions);
//         } else if (type === 'select') {
//             const updatedOptions = selectOptions.map((option, idx) =>
//                 idx === index ? { ...option, name: newName } : option
//             );
//             setSelectOptions(updatedOptions);
//         }
//     };

//     const addCheckboxOption = () => {
//         const newOption = {
//             id: checkboxOptions.length + 1,
//             name: `checkbox${checkboxOptions.length + 1}`,
//         };
//         setCheckboxOptions([...checkboxOptions, newOption]);
//     };

//     const handleAddCheckboxOptions = () => {
//         if (checkboxOptions.length > 0) {
//             const optionNames = checkboxOptions.map((option) => option.name);
//             setFields((prevFields) => [
//                 ...prevFields,
//                 createInputField('checkbox', optionNames)
//             ]);
//             setShowCheckboxPopup(false);
//             setCheckboxOptions([{ id: 1, name: 'checkbox1' }]);
//         } else {
//             alert('Please add at least one checkbox option.');
//         }
//     };

//     const addSelectOption = () => {
//         const newOption = {
//             id: selectOptions.length + 1,
//             name: `option${selectOptions.length + 1}`,
//         };
//         setSelectOptions([...selectOptions, newOption]);
//     };

//     const handleAddSelectOptions = () => {
//         if (selectOptions.length > 0) {
//             const optionNames = selectOptions.map((option) => option.name);
//             setFields((prevFields) => [
//                 ...prevFields,
//                 createInputField('select', optionNames)
//             ]);
//             setShowSelectPopup(false);
//             setSelectOptions([{ id: 1, name: 'option1' }]);
//         } else {
//             alert('Please add at least one select option.');
//         }
//     };

//     const removeField = (id) => {
//         setFields((prevFields) => {
//             const newFields = prevFields.filter(field => field.id !== id);

//             if (newFields.length === 0) {
//                 setBackgroundImage('');
//                 setBackgroundColor('#ffffff');
//                 setImageFile(null);
//                 setBoxShadow('');
//                 setFormWidth('100%');
//                 setPadding('0');
//                 setBorderColor('#ffffff');
//                 setBorderRadius('0');

//             }

//             if (selectedField && selectedField.id === id) {
//                 setSelectedField(null);
//             }
//             return newFields;
//         });
//     };

//     const handleCreate = () => {
//         setShowConfirmationPopup(true);
//     };

//     const handleStatusChange = (status) => {
//         setConfirmationPopupType(status);
//         setShowConfirmationPopup(false);
//         createOrUpdateForm(status);
//     };

//     const createOrUpdateForm = (status) => {
//         const formId = generateUniqueId();
//         const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

//         if (!formTitle.trim()) {
//             alert('Please enter a title for the form.');
//             return;
//         }

//         const existingForm = createdForms.find(form => form.title === formTitle);

//         if (existingForm && !isEditing) {
//             alert('A form with this title already exists. Please choose a different title.');
//             return;
//         }

//         const backgroundImageUrl = imageFile ? `url(${imageFile})` : backgroundImage || 'none';

//         const newForm = {
//             id: isEditing ? editingFormId : formId,
//             title: formTitle,
//             fields: fields,
//             createdAt: timestamp,
//             hidden: false,
//             status: status,
//             styles: {
//                 backgroundColor: backgroundColor,
//                 backgroundImage: backgroundImageUrl,
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 boxShadow,
//                 width: formWidth,
//                 padding,
//                 borderColor,
//                 borderRadius,
//             }
//         };

//         const updatedForms = isEditing
//             ? createdForms.map(form => form.id === editingFormId ? newForm : form)
//             : [...createdForms, newForm];

//         setCreatedForms(updatedForms);
//         setCurrentFormId(newForm.id);
//         localStorage.setItem('createdForms', JSON.stringify(updatedForms));
//         navigator('/app/formGenerator/list')
//         setFields([]);
//         setShowFormBuilder(false);
//         setView('live');
//         setIsEditing(false);
//         setEditingFormId(null);
//         setFormWidth('100%');
//         setBackgroundImage(null);
//         setImageFile('');
//         setBorderColor('');
//         setPadding('');
//         setBorderRadius('');

//         axios.post('http://localhost:4001/form-data', {
//             formId: newForm.id,
//             title: newForm.title,
//             fields: newForm.fields,
//             createdAt: newForm.createdAt
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => {
//                 console.log('Form data saved successfully:', response.data);
//             })
//             .catch(error => {
//                 console.error('Error saving form data:', error);
//             });
//     };


//     const handleCancelStatusChange = () => {
//         setShowConfirmationPopup(false);
//     };

//     const handleFieldClick = (field) => {
//         if (selectedField && selectedField.id === field.id) {
//             setSelectedField(null);
//         } else {
//             setSelectedField(field);
//         }
//     };

//     const handleEditForm = () => {
//         setEditMode(!editMode);
//     };

//     const updateFieldProperty = (property, value) => {
//         if (selectedField) {
//             setFields((prevFields) =>
//                 prevFields.map((field) =>
//                     field.id === selectedField.id ? { ...field, [property]: value } : field
//                 )
//             );
//             setSelectedField((prevField) => ({ ...prevField, [property]: value }));
//         }
//     };

//     useEffect(() => {
//         const formBuilder = document.getElementById('formBuilder');
//         if (formBuilder) {
//             const sortable = Sortable.create(formBuilder, {
//                 animation: 150,
//                 ghostClass: 'dragging',
//                 onEnd: (event) => {
//                     const updatedFields = [...fields];
//                     const [movedItem] = updatedFields.splice(event.oldIndex, 1);
//                     updatedFields.splice(event.newIndex, 0, movedItem);
//                     setFields(updatedFields);
//                 },
//             });

//             return () => sortable.destroy();
//         }
//     }, [fields]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (formPropertyEditorRef.current && !formPropertyEditorRef.current.contains(event.target)) {
//                 setSelectedField(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleClickOutside = (event) => {
//         if (formRef.current && !formRef.current.contains(event.target)) {
//             setEditMode(false);
//         }
//     };

//     useEffect(() => {
//         if (editMode) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [editMode]);

//     const handleFileChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setImageFile(reader.result);
//                 localStorage.setItem('backgroundImage', reader.result);
//             };

//             reader.readAsDataURL(file);
//         }
//     };

//     const handleAddShadow = () => {
//         setBoxShadow('rgba(0, 0, 0, 0.35) 0px 5px 15px');
//     };

//     const updateFormWidth = (width) => {
//         setFormWidth(width);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.width = width;
//         }
//     };

//     const updatePadding = (padding) => {
//         setPadding(padding);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.padding = padding;
//         }
//     }

//     const updateBorderRadius = (borderRadius) => {
//         setBorderRadius(borderRadius);
//         const formBuilder = document.getElementById('bg_change');
//         if (formBuilder) {
//             formBuilder.style.borderRadius = borderRadius;
//         }
//     }

//     const toggleFieldEnabled = () => {
//         setIsFieldEnabled(!isFieldEnabled);
//     };

//     const handleSubmits = (e) => {
//         e.preventDefault();
//         handleAddDescription(descriptionText);
//     };

//     const handleAddDescription = (text) => {
//         const descriptionField = {
//             id: editingDescriptionId || generateUniqueId(),
//             type: 'description',
//             text,
//         };
//         setFields((prevFields) => {
//             if (editingDescriptionId) {
//                 return prevFields.map(field =>
//                     field.id === editingDescriptionId ? descriptionField : field
//                 );
//             } else {
//                 return [...prevFields, descriptionField];
//             }
//         });
//         setShowDescriptionPopup(false);
//         setDescriptionText('');
//         setEditingDescriptionId(null);
//     };

//     const handleEditDescription = (id) => {
//         const fieldToEdit = fields.find(field => field.id === id);
//         if (fieldToEdit) {
//             setDescriptionText(fieldToEdit.text);
//             setEditingDescriptionId(id);
//             setShowDescriptionPopup(true);
//         }
//     };

//     return (
//         <div>
//             <div className="builder-container">
//                 <h3>Form Builder</h3>
//                 <div>
//                     <label>Form Title:</label>
//                     <input
//                         type="text"
//                         value={formTitle}
//                         onChange={(e) => setFormTitle(e.target.value)}
//                         placeholder="Enter form title"
//                     />
//                 </div>
//                 <div className="builder-wrp">
//                     <div className="controls-main-wrp">
//                         <div className="controls-wrp">
//                             <div className="controls">
//                                 <button onClick={() => addInputField('text')}><span><i className="fa fa-text-width" aria-hidden="true"></i></span> <span>Text Input</span></button>
//                                 <button onClick={() => addInputField('heading')}><span><i className="fa fa-text-width" aria-hidden="true"></i></span> <span>Heading</span></button>
//                                 <button onClick={() => addInputField('description')}><span><i className="fa fa-text-width" aria-hidden="true"></i></span> <span>Description</span></button>
//                                 <button onClick={() => addInputField('radio')}> <span><i className="fa fa-check-circle" aria-hidden="true"></i></span> <span>Radio Button </span></button>
//                                 <button onClick={() => addInputField('checkbox')}> <span><i className="fa fa-check-square" aria-hidden="true"></i></span> <span>Checkbox</span> </button>
//                                 <button onClick={() => addInputField('select')}> <span><i className="fa fa-list-ul" aria-hidden="true"></i></span> <span>Select Box</span></button>
//                                 <button onClick={() => addInputField('textarea')}> <span><i className="fa fa-file-text-o" aria-hidden="true"></i></span> <span>Textarea</span></button>
//                                 <button onClick={() => addInputField('file')}> <span><i className="fa fa-file" aria-hidden="true"></i></span> <span>File Upload</span></button>
//                                 <button onClick={() => addInputField('number')}> <span><i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></span> <span>Number Input</span></button>
//                                 <button onClick={() => addInputField('email')}> <span><i class="fa fa-envelope-o" aria-hidden="true"></i></span> <span>Email address</span></button>
//                                 <button onClick={() => addInputField('phone')}> <span><i class="fa fa-phone-square" aria-hidden="true"></i></span> <span>Phone number</span></button>
//                                 <button onClick={() => addInputField('password')}> <span><i class="fa fa-unlock-alt" aria-hidden="true"></i></span> <span>Password</span></button>
//                                 <button onClick={() => addInputField('url')}> <span><i class="fa fa-link" aria-hidden="true"></i></span> <span>Url</span></button>
//                                 <button onClick={() => addInputField('location')}> <span><i class="fa fa-map-marker" aria-hidden="true"></i></span> <span>Location</span></button>
//                                 <button onClick={() => addInputField('toggle')}> <span><i class="fa fa-toggle-on" aria-hidden="true"></i></span> <span>Toggle</span></button>
//                                 <button onClick={() => addInputField('date')}> <span><i class="fa fa-calendar" aria-hidden="true"></i></span> <span>Date</span></button>
//                                 <button onClick={() => addInputField('datetime')}> <span><i class="fa fa-calendar-o" aria-hidden="true"></i></span> <span>Datetime</span></button>
//                                 <button onClick={() => addInputField('time')}> <span><i class="fa fa-clock-o" aria-hidden="true"></i></span> <span>Time</span></button>
//                                 <button onClick={() => addInputField('slider')}> <span><i class="fa fa-sliders" aria-hidden="true"></i></span> <span>Slider</span></button>
//                                 <button onClick={() => addInputField('images')}> <span><i class="fa fa-picture-o" aria-hidden="true"></i></span> <span>Images</span></button>
//                                 <button onClick={() => addInputField('button')}> <span><i class="fa fa-podcast" aria-hidden="true"></i></span> <span>Button</span></button>
//                                 <button onClick={() => addInputField('divider')}> <span><i class="fa fa-podcast" aria-hidden="true"></i></span> <span>Divider</span></button>
//                                 <button onClick={() => addInputField('link')}><span><i className="fa fa-link" aria-hidden="true"></i></span> <span>Link</span> </button>
//                             </div>
//                         </div>
//                         <div id='bg_change' className="form-builder-wrp" >
//                             <div id="formBuilder" className="form-builder" >
//                                 {fields.length > 0 && fields.map(field => (
//                                     <div
//                                         key={field.id}
//                                         className="input-field"
//                                         style={{ width: field.width, opacity: field.opacity || 1 }}
//                                     >
//                                         {field.type === 'text' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {selectedField && selectedField.id === field.id}
//                                                         {field.label || "Text Input"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('name', e.target.value, field.id)}

//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'heading' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     {React.createElement(field.level, null, field.text)}
//                                                     <button className="edit-btn" onClick={() => handleEditHeading(field.id)}>
//                                                         Edit
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {field.type === 'description' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div className="description-field">
//                                                     <p>{field.text}</p>
//                                                     <button className="edit-btn" onClick={() => handleEditDescription(field.id)}>
//                                                         Edit
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {field.type === 'radio' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Radio Button"}
//                                                     </label>
//                                                     {field.options.map((option, index) => (
//                                                         <div key={index}>
//                                                             <input
//                                                                 type="radio"
//                                                                 name={field.name}
//                                                                 value={option}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                             <label>{option}</label>
//                                                         </div>
//                                                     ))}
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'checkbox' && (
//                                             <div className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>{field.label || "Checkbox Group"}</label>
//                                                     {field.options.map((option, index) => (
//                                                         <div key={index}>
//                                                             <input
//                                                                 type="checkbox"
//                                                                 name={field.name}
//                                                                 disabled={field.disabled}
//                                                                 readOnly={field.readonly}
//                                                             />
//                                                             <label>{option}</label>
//                                                         </div>
//                                                     ))}
//                                                     {field.description && <div className='description'>{field.description}</div>}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {field.type === 'select' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>{field.label || "Select Option"}</label>
//                                                     {field.label || "Select an option:"}
//                                                     <select
//                                                         name={field.name}
//                                                         disabled={field.disabled}
//                                                         readOnly={field.readonly}
//                                                     >

//                                                         {field.options.map((option, index) => (
//                                                             <option key={index} value={option}>{option}</option>
//                                                         ))}
//                                                     </select>

//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'textarea' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Enter text:"}
//                                                         <textarea
//                                                             placeholder={field.placeholder}
//                                                             name={field.name}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'file' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Upload file:"}
//                                                         <input
//                                                             type="file"
//                                                             name={field.name}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'number' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Number"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('Number', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'email' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Email"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('email', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'phone' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Phone"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('phone', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'password' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Password"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('password', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'url' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Url"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('url', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'location' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Location"}
//                                                         <input
//                                                             type="text"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('location', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'toggle' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label className="toggle-switch">
//                                                         {field.label || "Toggle"}
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={isFieldEnabled}
//                                                             onChange={toggleFieldEnabled}
//                                                             name={field.name}
//                                                         />
//                                                         <span className="slider"></span>
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'date' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Date"}
//                                                         <input
//                                                             type="date"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('date', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'datetime' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Datetime"}
//                                                         <input
//                                                             type="datetime-local"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('datetime', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'time' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Time"}
//                                                         <input
//                                                             type="time"
//                                                             className="name"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('time', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'slider' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Slider"}
//                                                         <input
//                                                             type="range"
//                                                             className="name"
//                                                             min="1" max="100"
//                                                             name={field.name}
//                                                             placeholder={field.placeholder}
//                                                             required={field.required}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                             onChange={(e) => updateFieldProperty('slider', e.target.value, field.id)}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'images' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <div>
//                                                     <label>
//                                                         {field.label || "Images"}
//                                                         <input
//                                                             type="file"
//                                                             name={field.name}
//                                                             disabled={field.disabled}
//                                                             readOnly={field.readonly}
//                                                         />
//                                                     </label>
//                                                     <div className='description'>
//                                                         {field.description}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                         {field.type === 'button' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <button
//                                                     type="button"
//                                                     className="create-button"
//                                                     disabled={field.disabled}

//                                                 >
//                                                     {field.label || "Submit"}
//                                                 </button>
//                                                 <div className='description'>
//                                                     {field.description}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {field.type === 'divider' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <hr style={{ margin: '20px 0', border: '1px solid black', width: '100%' }} />
//                                             </div>
//                                         )}

//                                         {field.type === 'link' && (
//                                             <div onClick={() => handleFieldClick(field)} className={`input-field ${field.customClass}`} style={{ width: field.width }}>
//                                                 <label>
//                                                     {field.label}
//                                                     <input
//                                                         type="link"
//                                                         name={field.name}
//                                                         disabled={field.disabled}
//                                                         readOnly={field.readonly}
//                                                         placeholder="Enter link text"
//                                                         onChange={(e) => updateFieldProperty('link', e.target.value, field.id)}
//                                                     />
//                                                 </label>
//                                             </div>
//                                         )}

//                                         {field.type !== 'heading' && field.type !== 'description' && (
//                                             <>
//                                                 <button className="remove-btn" onClick={() => removeField(field.id)}>
//                                                     <i className="fa fa-trash-o" aria-hidden="true"></i>
//                                                 </button>
//                                                 <button className="copy-btn" onClick={() => handleCopyField(field.id)}>
//                                                     Copy
//                                                 </button>
//                                             </>
//                                         )}
{/* {field.type !== 'radio' && (
                                             (hoveredFieldId === field.id || (selectedField && selectedField.id === field.id)) && (
                                                  <>
                                                    <button
                                              className="remove-btn"
                                              onClick={(e) => {
                    e.stopPropagation();
                    removeField(field.id);
                }}>
                <img src={delete1} alt="Delete" />
            </button>

            <button className="copy-btn" onClick={() => addInputField(field.type)}>
                <img src={maximizesize} alt="Copy" />
            </button>
        </>
    )
)} */}
//                                     </div>
//                                 ))}
//                             </div>

//                         </div>
//                     </div>
//                     <div className="form-submission-wrp">
//                         <button className="create-form-btn action_btn" onClick={handleCreate}>{isEditing ? 'Update Form' : 'Create Form'}</button>
//                     </div>
//                     <div className='button_edit'>
//                         <button className="edit-form-btn action_btn" onClick={handleEditForm}>Edit Form</button>
//                     </div>
//                     <ConfirmationPopup
//                         isVisible={showConfirmationPopup}
//                         onClose={handleCancelStatusChange}
//                         onConfirm={handleStatusChange}
//                     />
//                 </div>
//                 <div className='edit_form_close' ref={formRef}>
//                     {editMode && (
//                         <div className='edit-formwrap'>
//                             <h3>Edit Form Properties</h3>
//                             <div className='edit-form-options'>
//                                 <label>
//                                     Background Color:
//                                     <input
//                                         type="color"
//                                         value={backgroundColor}
//                                         onChange={(e) => setBackgroundColor(e.target.value)}
//                                     />
//                                 </label>
//                                 <div>
//                                     <label>Upload Background Image:</label>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleFileChange}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label>Background Shadow:</label>
//                                     <button onClick={handleAddShadow}>Add Shadow</button>

//                                 </div>
//                                 <div >
//                                     <label>Input Width:</label>
//                                     <select
//                                         value={formWidth}
//                                         onChange={(e) => updateFormWidth(e.target.value)}
//                                     >
//                                         <option value="50%">50%</option>
//                                         <option value="100%">100%</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label>Padding:</label>
//                                     <input
//                                         type='text'
//                                         value={padding}
//                                         onChange={(e) => updatePadding(e.target.value)}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label>Border-Color:</label>
//                                     <input
//                                         type='color'
//                                         value={borderColor}
//                                         onChange={(e) => setBorderColor(e.target.value)}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label>BorderRadius:</label>
//                                     <input
//                                         type='text'
//                                         value={borderRadius}
//                                         onChange={(e) => updateBorderRadius(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="form-builder-change-propertites" ref={formPropertyEditorRef}>
//                 {selectedField && (
//                     <>
//                         <h3>Fields Properties </h3>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Name:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.name}
//                                 onChange={(e) => updateFieldProperty('name', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Label:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.label}
//                                 onChange={(e) => updateFieldProperty('label', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Placeholder:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.placeholder}
//                                 onChange={(e) => updateFieldProperty('placeholder', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Description:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField.description}
//                                 onChange={(e) => updateFieldProperty('description', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Input Width:</label>
//                             <select
//                                 value={selectedField.width}
//                                 onChange={(e) => updateFieldProperty('width', e.target.value)}
//                             >
//                                 <option value="50%">50%</option>
//                                 <option value="100%">100%</option>
//                             </select>
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Required:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.required || false}
//                                 onChange={(e) => updateFieldProperty('required', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Disabled:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.disabled || false}
//                                 onChange={(e) => updateFieldProperty('disabled', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Readonly:</label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedField?.readonly || false}
//                                 onChange={(e) => updateFieldProperty('readonly', e.target.checked)}
//                             />
//                         </div>
//                         <div className="form-builder-chaneging-wrap">
//                             <label>Custom Class:</label>
//                             <input
//                                 type="text"
//                                 value={selectedField?.customClass || ''}
//                                 onChange={(e) => updateFieldProperty('customClass', e.target.value)}
//                             />
//                         </div>

//                     </>
//                 )}
//             </div>
//             <div className='form-builder-wrap-popup-inputs'>
//                 {showPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>Configure Radio Button Option</h4>
//                             {radioOptions.map((option, index) => (
//                                 <div key={option.id} className="radio-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="radio"
//                                             name="radioOption"
//                                             value={option.name}
//                                             checked={selectedOption === option.name}
//                                             onChange={handleRadioOptionChange}
//                                         />
//                                         <input
//                                             type="text"
//                                             value={option.name}
//                                             onChange={(e) => handleOptionNameChange(index, e.target.value)}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addRadioOption}>+</button>
//                             <button onClick={handleAddRadioOptions}>Add Radio Button</button>
//                             <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {showCheckboxPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h2>Checkbox Options</h2>
//                             {checkboxOptions.map((option, index) => (
//                                 <div key={option.id} className="checkbox-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="checkbox"
//                                             name="checkboxOption"
//                                             value={option.name}
//                                             checked={selectedOption === option.name}
//                                             onChange={handleRadioOptionChange}
//                                         />
//                                         <input
//                                             type="text"
//                                             value={option.name}
//                                             onChange={(e) => handleOptionNameChanges(index, e.target.value, 'checkbox')}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addCheckboxOption}>Add Checkbox Option</button>
//                             <button onClick={handleAddCheckboxOptions}>Add Checkbox Group</button>
//                             <button className="cancel" onClick={() => setShowCheckboxPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//                 {showSelectPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h2>Select Options</h2>
//                             {selectOptions.map((option, index) => (
//                                 <div key={option.id} className="select-option">
//                                     <label style={{ display: 'flex', alignItems: 'center' }}>
//                                         <input
//                                             type="text"
//                                             value={option.name}
//                                             onChange={(e) => handleOptionNameChanges(index, e.target.value, 'select')}
//                                             placeholder={`Enter option name`}
//                                             style={{ marginLeft: '8px' }}
//                                         />
//                                     </label>
//                                 </div>
//                             ))}
//                             <button onClick={addSelectOption}>Add Select Option</button>
//                             <button onClick={handleAddSelectOptions}>Add Select Input</button>
//                             <button className="cancel" onClick={() => setShowSelectPopup(false)}>Cancel</button>
//                         </div>
//                     </div>
//                 )}
//                 {showHeadingPopup && (

//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>{editingHeadingId ? 'Edit Heading' : 'Select Heading Level'}</h4>
//                             <form onSubmit={editingHeadingId ? (e) => { e.preventDefault(); saveEditedHeading(); } : handleSubmit}>
//                                 <div>
//                                     <label>
//                                         Heading Level:
//                                         <select value={headingLevel} onChange={(e) => setHeadingLevel(e.target.value)}>
//                                             <option value="h1">H1</option>
//                                             <option value="h2">H2</option>
//                                             <option value="h3">H3</option>
//                                             <option value="h4">H4</option>
//                                             <option value="h5">H5</option>
//                                             <option value="h6">H6</option>
//                                         </select>
//                                     </label>
//                                 </div>
//                                 <div>
//                                     <label>
//                                         Heading Text:
//                                         <input
//                                             type="text"
//                                             value={headingText}
//                                             onChange={(e) => setHeadingText(e.target.value)}
//                                             required
//                                         />
//                                     </label>
//                                 </div>
//                                 <button type="submit">{editingHeadingId ? 'Save Changes' : 'Add Heading'}</button>
//                                 <button className="cancel" onClick={() => setShowHeadingPopup(false)}>Cancel</button>

//                             </form>
//                         </div>
//                     </div>
//                 )}
//                 {showDescriptionPopup && (
//                     <div className="popup">
//                         <div className="popup-content">
//                             <h4>{editingDescriptionId ? 'Edit Description' : 'Add Description'}</h4>
//                             <form onSubmit={handleSubmits}>
//                                 <div>
//                                     <label>
//                                         Description:
//                                         <textarea
//                                             value={descriptionText}
//                                             onChange={(e) => setDescriptionText(e.target.value)}
//                                             required
//                                         />
//                                     </label>
//                                 </div>
//                                 <button type="submit">{editingDescriptionId ? 'Update Description' : 'Add Description'}</button>
//                                 <button type="button" onClick={() => setShowDescriptionPopup(false)}>Cancel</button>
//                             </form>
//                         </div>
//                     </div>)}

//             </div>

//         </div>
//     );
// };

// export default Createform;










