import '../index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import search12 from '../images/search12.png';
import down from '../images/down.png';
import left from '../images/left.png';
import right from '../images/right.png';
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

export default function EmailTemplate() {
    const [formsData, setFormsData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formsPerPage] = useState(4);
    const navigate = useNavigate();
    const [previwPopup, setPreviwPopup] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deletePopup, setDeletePopup] = useState(false);
    const [formToDelete, setFormToDelete] = useState(null);
    const [showFormNames, setShowFormNames] = useState(false);
    const [selectedFormName, setSelectedFormName] = useState('');

    const generateUniqueFormId = () => {
        return 'Form' + Math.random().toString(36).substring(2, 15);
    };

    const fetchForms = async () => {
        try {
            const response = await axios.get('https://hubsyntax.online/get/data');
            setFormsData(response.data.data || []);
            console.log("data", response.data);
        } catch (error) {
            setError(`Error fetching forms: ${error.message}`);
        }
    };

    const handleDeleteForm = async () => {
        if (!formToDelete) return;
        try {
            const response = await axios.delete(`https://hubsyntax.online/delete/${formToDelete}`);
            console.log(response.data.message);

            setFormsData((prevForms) =>
                prevForms.filter((form) => form.templateId !== formToDelete)
            );
        } catch (error) {
            console.error('Error deleting form:', error);
            setError('Failed to delete form. Please try again later.');
        } finally {
            closeDeletePopup();
        }
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
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss a");

        const copiedForm = {
            ...template,
            templateId: generateUniqueFormId(),
            formId: generateUniqueFormId(),
            title: `Copy of ${template.title}`,
            createdAt: timestamp,
            fields: template.fields.map((field) => ({
                ...field,
                id: generateUniqueFormId(),
            })),
        };

        delete copiedForm._id;

        try {
            const response = await axios.post('https://hubsyntax.online/copy-email', copiedForm);
            console.log('Response from server:', response);
            if (response.status === 201) {
                setFormsData((prevForms) => [...prevForms, response.data]);
                alert('Template copied successfully!');
            }
        } catch (error) {
            console.error('Error copying template:', error.message);
            alert('Failed to copy template.');
        }
    };


    useEffect(() => {
        fetchForms();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredForms = formsData.filter((form) =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredForms.length / formsPerPage);

    const currentForms = filteredForms.slice(
        (currentPage - 1) * formsPerPage,
        currentPage * formsPerPage
    );

    // const getEmbedUrl = (url) => {
    //     const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    //     const shortUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;
    //     const match = youtubeRegex.exec(url) || shortUrlRegex.exec(url);
    //     if (match) {
    //         return `https://www.youtube.com/embed/${match[1]}`;
    //     }
    //     return url;
    // };

    const renderField = (field) => {
        const { viewMode = 'desktop' } = field;
        switch (field.type) {
            case 'heading':
                return <h1 style={{
                    fontSize: `${field.headingFontSize}px`,
                    color: field.headingColor, backgroundColor: field.headingbg, padding: `${field.headingPadding}px`,
                    letterSpacing: `${field.headingLetterSpacing}px`,
                    textAlign: field.headingTextAlign ? field.headingTextAlign : '',
                    fontWeight: field.headingFontWeight,
                    borderWidth: `${field.headingBorderWidth}px`,
                    borderStyle: field.headingBorderStyle,
                    borderColor: field.headingBorderColor
                }}>
                    {field.value}</h1>;
            case 'description':
                return <p style={{
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
                }}>{field.value}</p>;
            case 'divider':
                return <hr style={{ borderColor: field.dividerColor || '', width: `${field.dividerWidth || 100}%`, height: `${field.dividerheight || 1}px` }} />;
            case 'button':
                return (
                    <a href={field.buttonUrll} target='_blank'>
                        <button
                            style={{
                                backgroundColor: field.buttonColor || '#008CBA',
                                padding: `${field.buttonPadding}px` || '10px 20px',
                                height: `${field.buttonHeight}px` || '10px',
                                width: `${field.buttonWidth}px`,
                                fontSize: `${field.buttonFontSize}px` || 'Button',
                                color: field.buttonTextColor,
                                borderWidth: `${field.buttonBorderWidth}px`,
                                borderStyle: field.buttonBorderStyle,
                                borderColor: field.buttonBorderColor,
                                letterSpacing: `${field.buttonLetterSpacing}px`,
                                borderRadius: `${field.buttonradious}px`
                            }}
                        >
                            {field.label || 'Submit'}
                        </button>
                    </a>
                );
            case 'product':
                return (
                    <div>
                        {field.products && field.products.length > 0 ? (
                            <div
                                className={`product-grid ${viewMode === 'mobile' ? 'mobile-view' : 'desktop-view'}`}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${field.productsPerRow}, 1fr)`,
                                    gap: '20px',
                                    padding: `${field.productPadding}px`,
                                    backgroundColor: field.productbg,
                                    borderWidth: `${field.productBorderWidth}px`,
                                    borderStyle: field.productBorderStyle,
                                    borderColor: field.productBorderColor,
                                    fontSize: `${field.productFontSize}px`,
                                    color: field.productTextColor
                                }}
                            >
                                {field.products.map((product, index) => (
                                    <div key={index} className="product-item">

                                        {product.images && product.images.length > 0 && (
                                            <img
                                                src={product.images[0].src}
                                                alt={product.images[0].alt}
                                                width={150}
                                                height={150}
                                            />
                                        )}
                                        <div>
                                            <h4 style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>{product.title}</h4>
                                            {field.price && product.variants && product.variants.length > 0 && (
                                                <p style={{ fontWeight: field.productWeight, letterSpacing: `${field.productLetterSpacing}px` }}>Price: ${product.variants[0].price}</p>
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
                                                        width: `${field.productwidth}px`,
                                                        height: `${field.productheight}px`,
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
                    width: `${field.imgWidth}%`,
                    textAlign: field.imgTextAlign ? field.imgTextAlign : '',
                    backgroundColor: field.imgbg,
                    padding: `${field.imgPadding}px`,
                    borderWidth: `${field.imgBorderWidth}px`,
                    borderStyle: field.imgBorderStyle,
                    borderColor: field.imgBorderColor,
                }}>
                    <img src={field.value} alt={field.label} style={{ width: '30%' }} />
                </div>;
            case 'html convert':
                return <div style={{ padding: `${field.htmlPadding}px`, color: field.htmlColor, fontSize: `${field.htmlFontSize}px` }} dangerouslySetInnerHTML={{ __html: field.value }} />;
            // case 'video':
            //     return (
            //         <div style={{ padding: `${field.videoPadding || 0}px`, textAlign: 'center', borderWidth: `${field.videoBorderWidth}px`, borderStyle: field.videoBorderStyle, borderColor: field.videoBorderColor }} >
            //             <iframe
            //                 width="100%"
            //                 height="315"
            //                 src={getEmbedUrl(field.value)}
            //                 title={field.label || 'Video'}
            //                 frameBorder="0"
            //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //                 allowFullScreen
            //                 style={{ maxWidth: field.width || '100%' }}
            //             ></iframe>
            //         </div>
            //     );
            case 'spacer':
                return (
                    <div
                        style={{
                            height: `${field.spacerHeight || 20}px`,
                            backgroundColor: field.spacerbg || '#EDEDED',
                            padding: `${field.splitPadding || 0}px 0`,
                        }}
                    ></div>
                );
            case 'split':
                return (
                    <div
                        style={{
                            backgroundColor: field.splitbg || '#ffffff',
                            padding: `${field.splitPadding || 0}px`,
                            width: field.width,
                            float: "inline-start"
                        }}
                    >
                        <div>
                            {field.value.startsWith("data:image/") ? (
                                <img
                                    src={field.value}
                                    alt="Uploaded Preview"
                                    width={100}

                                />
                            ) : (
                                <p style={{ color: field.descritionColor, fontSize: `${field.descritionFontSize}px` }}>
                                    {field.value}
                                </p>

                            )}
                        </div>
                    </div>
                );
            case 'socalicon':
                return (
                    <div style={{ textAlign: field.socaliconTextAlign, padding: `${field.socalIconPadding}px` }} >
                        <div className="form-builder-icon" style={{ display: 'inline-flex', gap: '5px' }}>
                            {field.value && field.value.facebook && !field.value.facebook.isHidden && (
                                <a href={field.value.facebook.url} target="_blank" rel="noopener noreferrer">
                                    <img src={facebook} alt="" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.value && field.value.twitter && !field.value.twitter.isHidden && (
                                <a href={field.value.twitter.url} target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} alt="" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.value && field.value.instagram && !field.value.instagram.isHidden && (
                                <a href={field.value.instagram.url} target="_blank" rel="noopener noreferrer">
                                    <img src={instagram} alt="" style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }} />
                                </a>
                            )}
                            {field.customIcons && field.customIcons.length > 0 && (
                                <div>
                                    {field.customIcons
                                        .filter((icon) => !icon.isHidden)
                                        .map((icon, index) => (
                                            <a key={index} href={icon.url} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={icon.src}
                                                    alt={`custom-icon-${index}`}
                                                    style={{ height: `${field.socalIconHeight}px`, width: `${field.socalIconWidth}px` }}
                                                />
                                            </a>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handlePreviw = (form) => {
        setSelectedForm(form);
        setPreviwPopup(!previwPopup);
    }

    const handleEditClick = (form) => {
        navigate('/app/emailTemplate/new', { state: { formData: form } });
    };

    const handleToggleFormNames = () => {
        setShowFormNames(!showFormNames);
    };

    const handleSelectFormName = (title) => {
        setSelectedFormName(title);
        setShowFormNames(false);
    };
    const handleSelectAllForms = () => {
        setSelectedFormName(null);
        setShowFormNames(false);
    };

    const handleCreateTemplate = () => {
        navigate('/app/emailTemplate/new');
    }

    return (
        <>
            <div className="email-template-section">
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
                            <div className="form-builder-search-bar">
                                <input id="search" type="search" placeholder="Search" value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                <div className="form_build_icon_search">
                                    <img src={search12} alt="" />
                                </div>
                            </div>
                            <div className="show_forms_all">
                                <span className="name_build">
                                    Short by :
                                    <span style={{ fontWeight: 700, cursor: 'pointer' }} onClick={handleToggleFormNames}>
                                        Email name <span className="form-short">
                                            <img src={down} alt="" />
                                        </span>
                                    </span>
                                </span>
                                <div className={`form-names-list ${showFormNames ? 'show' : ''}`}>
                                    <div onClick={handleSelectAllForms}>All Forms</div>
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
                                <p>No forms available.</p>
                            ) : (
                                currentForms.filter(form => selectedFormName ? form.title === selectedFormName : true).map((form) => (
                                    <div key={form.createdAt} className="email-templates">
                                        <div className='email-tempalte-text'
                                            style={{
                                                width: form.styles?.width || '100%',
                                                borderRadius: `${form.styles?.borderRadious}px` || 5,
                                                backgroundColor: form.styles?.backgroundColor || '#fff',
                                                padding: `${form.styles?.templatePadding}px`,
                                                textAlign: form.styles?.textAlign || 'left',
                                                backgroundImage: form.styles?.backgroundImage
                                                    ? `url(${form.styles.backgroundImage})`
                                                    : '',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                fontFamily:form.styles?.fontFamily || ''
                                            }}
                                        >
                                            <div>

                                                {form.fields.map((field) => (
                                                    <div className='form-builder-template-email ' style={{ overflow: "hidden" }} key={field.name}>{renderField(field)}</div>
                                                ))}
                                            </div>
                                            <div className='email-title-t'>
                                                <h3>{form.title}</h3>
                                                <p> {form.createdAt}</p>
                                            </div>
                                            <div className='email-templete-icon-wrp'>
                                                <div className="email-template-icons-all" >
                                                    <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handleCopyTemplate(form)}>
                                                        <img src={copy12} alt="" />
                                                    </div>
                                                    <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => handleEditClick(form)}>
                                                        <img src={oplus} alt="" />
                                                    </div>
                                                    <div className='email-show-icon' style={{ cursor: "pointer" }} onClick={() => openDeletePopup(form.templateId)}>
                                                        <img src={rplus} alt="" />
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
                        <div className='email-template-reviw-popup'>
                            <div className='email-tempalte-textt'
                                style={{
                                    width: selectedForm.styles?.width || '100%',
                                    backgroundColor: selectedForm.styles?.backgroundColor || '#fff',
                                    borderRadius: `${selectedForm.styles?.borderRadious}px` || 5,
                                    padding: `${selectedForm.styles?.templatePadding}px`,
                                    textAlign: selectedForm.styles?.textAlign || 'left',
                                    backgroundImage: selectedForm.styles?.backgroundImage
                                        ? `url(${selectedForm.styles.backgroundImage})`
                                        : '',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    fontFamily:selectedForm.styles?.fontFamily || ''
                                }}
                            >
                                <div className='form-builder-icon-deleted' onClick={() => setPreviwPopup(false)}>
                                    <img src={cancle1} alt="" />
                                </div>
                                <div>
                                    {selectedForm.fields.map((field) => (
                                        <div className='form-builder-template-email' key={field.name}>{renderField(field)}</div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
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
        </>
    );
}
