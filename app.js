import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
const app = express();
const port = 4001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const mongoUri = 'mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connectingcd  to MongoDB:', err);
  });

const formCreateSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  title: { type: String, required: true },
  shop: { type: String, required: true },
  fields: [{
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['text', 'name', 'button', 'divider', 'heading', 'radio', 'file', 'number', 'date', 'datetime', 'images', 'link', 'checkbox', 'location', 'toggle', 'select', 'textarea', 'password', 'email', 'phone', 'time', 'description', 'url', 'slider']
    },
    label: { type: String, required: true, default: function () { return this.name || 'Unnamed Field'; } },
    name: String,
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    width: { type: String, default: '100%' },
    text: { type: String, default: '' },
    description: { type: String, default: '' },
    level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], required: false },
    fontSize: { type: String, default: '16px' },
    padding: { type: String, default: '10px' },
    color: { type: String, default: '#45a7f6' },
    dividerColor: { type: String, default: '#000' },
    buttonWidth: { type: String, default: 'auto' },
    buttonHeight: { type: String, default: 'auto' },
    backgroundColor: { type: String, default: '#45a7f6' },
    inputPadding: { type: String, default: '10px' },
    inputBorderRadious: { type: String, default: '4px' },
    buttonBorderColor: { type: String, required: false },
    buttonBorderWidth: { type: String, required: false },
    buttonBorderStyle: { type: String, required: false },
    btncolor: { type: String, required: false },
    styles: {
      display: { type: String, default: 'block' },
      gap: { type: String, default: '0' }
    },
    options: [{
      id: { type: String, required: true },
      label: { type: String, required: true },
      value: { type: String, required: true },
      name: { type: String, required: true, default: function () { return this.label || this.value; } }
    }]
  }],
  createdAt: { type: String, required: true },
  styles: {
    backgroundColor: { type: String, required: true },
    backgroundImage: { type: String, default: '' },
    backgroundRepeat: { type: String, default: 'no-repeat' },
    boxShadow: { type: String, default: '' },
    width: { type: String, default: '100%' },
    padding: { type: String, default: '0' },
    borderColor: { type: String, default: '' },
    borderRadius: { type: String, default: '0' },
    borderWidth: { type: String, default: '1px' },
    borderStyle: { type: String, default: 'solid' }

  },
  submissionOption: { type: String, required: true },
  thankYouTimer: { type: Number },
  editorValue: { type: String },
  url: { type: String },
  status: {
    type: String,
    enum: ['live', 'draft'],
    required: true
  },
});

const FormModel = mongoose.model('forms_data', formCreateSchema);

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, required: true },
  shop: { type: String, required: false, },
  fields: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  templateId: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
  submissions: [{
    fields: Array,
    timestamp: { type: String, default: Date.now }
  }]
});

const Form = mongoose.model('Form_costumers', formSchema);

const paymentDataSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  billingOn: { type: Date, required: true },
  plan: { type: String, required: true },
  chargeId: { type: String, required: true, unique: true },
});

const Payment = mongoose.model('Payments', paymentDataSchema);

const shopDetailsSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
});

const ShopDetails = mongoose.model('ShopDetails', shopDetailsSchema);

const EmailTemplats = new mongoose.Schema({
  templateId: { type: String, required: true },
  shop: { type: String, required: true },
  form_ids: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.every(item => typeof item === 'string');
      },
      message: 'Each form_id must be a string',
    },
  },
  title: { type: String, required: true },
  headingText: {
    text: { type: String, required: false },
    fontSize: { type: String, required: false }
  },
  fields: [
    {
      name: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
      value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
      headingFontSize: { type: String, required: false },
      headingLevel: { type: String, required: false },
      headingFontWeight: { type: String, required: false },
      headingColor: { type: String, required: false },
      headingbg: { type: String, required: false },
      headingBorderColor: { type: String, required: false },
      headingBorderWidth: { type: String, required: false },
      headingBorderStyle: { type: String, required: false },
      headingLetterSpacing: { type: String, required: false },
      headingPadding: { type: String, required: false },
      headingTextAlign: { type: String, required: false },
      descriptionText: { type: String, required: false },
      descritionFontSize: { type: String, required: false },
      descritionFontWeight: { type: String, required: false },
      descritionColor: { type: String, required: false },
      descriptionbg: { type: String, required: false },
      descriptionPadding: { type: String, required: false },
      descriptionTextAlign: { type: String, required: false },
      descriptionLetterSpacing: { type: String, required: false },
      descriptionBorderColor: { type: String, required: false },
      descriptionBorderWidth: { type: String, required: false },
      descriptionBorderStyle: { type: String, required: false },
      platform: { type: String, required: false },
      image: { type: String, required: false },
      url: { type: String, required: false },
      dividerColor: { type: String, required: false },
      dividerWidth: { type: String, required: false },
      dividerheight: { type: String, required: false },
      buttonLabel: { type: String, required: false },
      buttonWidth: { type: String, required: false },
      buttonHeight: { type: String, required: false },
      buttonFontSize: { type: String, required: false },
      buttonLetterSpacing: { type: String, required: false },
      buttonBorderColor: { type: String, required: false },
      buttonBorderWidth: { type: String, required: false },
      buttonBorderStyle: { type: String, required: false },
      buttonBackgroundColor: { type: String, required: false },
      buttonradious: { type: String, required: false },
      buttonColor: { type: String, required: false },
      buttonUrll: { type: String, default: '' },
      buttonTextColor:{ type: String, default: false },
      buttonPadding: { type: String, required: false },
      htmlContent: { type: String, required: false, default: "" },
      socalIconWidth: { type: String, required: false },
      socalIconHeight: { type: String, required: false },
      socalIconPadding: { type: String, required: false },
      socaliconTextAlign: { type: String, required: false },
      htmlFontSize: { type: String, required: false },
      htmlPadding: { type: String, required: false },
      htmlColor: { type: String, required: false },
      splitbg: { type: String, required: false },
      width: { type: String, required: false },
      spacerHeight: { type: String, required: false },
      spacerbg: { type: String, required: false },
      videoPadding: { type: String, required: false },
      splitPadding: { type: String, required: false },
      videoBorderWidth: { type: String, required: false },
      videoBorderStyle: { type: String, required: false },
      videoBorderColor: { type: String, required: false },
      imgWidth: { type: String, required: false },
      imgTextAlign: { type: String, required: false },
      imgPadding: { type: String, required: false },
      imgbg: { type: String, required: false },
      imgBorderColor: { type: String, required: false },
      imgBorderWidth: { type: String, required: false },
      imgBorderStyle: { type: String, required: false },
      products: { type: [Object], required: false },
      productsPerRow: { type: Number, default: 3 },
      viewMode: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' },
      price: { type: Boolean, default: false },
      productPadding: { type: String, required: false },
      productbg: { type: String, required: false },
      productBorderWidth: { type: String, required: false },
      productBorderStyle: { type: String, required: false },
      productBorderColor: { type: String, required: false },
      productFontSize: { type: String, required: false },
      productTextColor: { type: String, required: false },
      productWeight: { type: String, required: false },
      productLetterSpacing: { type: String, required: false },
      productbtnBorderColor: { type: String, required: false },
      productbtnBorderWidth: { type: String, required: false },
      productbtnBorderStyle: { type: String, required: false },
      productbtnbg: { type: String, required: false },
      productradious: { type: String, required: false },
      productLabel: { type: String, required: false },
      productfontSize: { type: String, required: false },
      productwidth: { type: String, required: false },
      productbackgroundColor: { type: String, required: false },
      productheight: { type: String, required: false },
      buttonUrl: { type: String, required: false },
      showbtnn: { type: Boolean, default: false },
      icons: {
        facebook: {
          url: { type: String, required: false },
          isHidden: { type: Boolean, default: false },
          value: { type: String, required: false, default: 'Facebook' },
        },
        twitter: {
          url: { type: String, required: false },
          isHidden: { type: Boolean, default: false },
          value: { type: String, required: false, default: 'Twitter' },
        },
        instagram: {
          url: { type: String, required: false },
          isHidden: { type: Boolean, default: false },
          value: { type: String, required: false, default: 'Instagram' },
        },
        url: { type: String, required: false }
      },
      customIcons: [
        {
          url: { type: String, required: true },
          src: { type: String, required: true },
          isHidden: { type: Boolean, default: false }
        }
      ],
    }
  ],
  createdAt: { type: String, required: true },
  styles: {
    width: { type: String, required: false },
    backgroundImage: { type: String, required: false },
    backgroundColor: { type: String, required: false },
    borderRadious: { type: String, required: false },
    textAlign: { type: String, required: false },
    fontFamily: { type: String, required: false },
    headingFontSize: { type: String, required: false },
    dividerColor: { type: String, required: false },
    templatePadding: { type: String, required: false }
  }
});

const Email = mongoose.model('EmailTemplats', EmailTemplats);


const templateSchema = new mongoose.Schema({
  TemplateAll: { type: Object, required: false },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Template = mongoose.model('sendTemplates', templateSchema);


app.post('/api/template', async (req, res) => {
  try {
    const { TemplateAll, email } = req.body;
    console.log('Received template data:', TemplateAll, 'Email:', email);
    const newTemplate = new Template({ TemplateAll, email });
    await newTemplate.save();
    await sendEmail(email, TemplateAll);
    res.status(200).json({ message: 'Template data received and stored successfully!' });
  } catch (error) {
    console.error('Error receiving template data:', error);
    res.status(500).json({ message: 'Error processing the request', error });
  }
});

import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const saveBase64Image = (base64Str, fileName) => {
  const base64Data = base64Str.replace(/^data:image\/png;base64,/, '');
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
  return filePath;
};

const sendEmail = async (email, TemplateAll) => {
  try {
    console.log('Preparing to send email');
    console.log('Email:', email);
    console.log('TemplateAll:', TemplateAll);

    const fields = TemplateAll.fields || [];
    if (fields.length > 0) {
      const fieldNames = fields.map(field => field.type);
      console.log('Field types in TemplateAll:', fieldNames);
    }

    const attachments = [];


    const getEmbedUrl = (url) => {
      console.log("Input URL:", url);
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      console.log("Video ID extracted:", videoId);

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        console.log("Embed URL:", embedUrl);
        return embedUrl;
      }

      return url;
    };


    const renderFieldsHTML = () => {
      return fields
        .map((field) => {
          switch (field.type) {
            case 'heading':
              return `<h1 style="font-size: ${field.headingFontSize || 30}px; color: ${field.headingColor || '#000'}; font-weight: ${field.headingFontWeight || 'bold'}; line-height: 1;">${field.value}</h1>`;
            case 'description':
              return `<p style="font-size: ${field.descritionFontSize || 16}px; color: ${field.descritionColor || '#000'}; font-weight: ${field.descritionFontWeight || 'normal'};">${field.value}</p>`;
            case 'button':
              return `
                <a href="${field.buttonUrll || '#'}" target="_blank">
                  <button style="background-color: ${field.buttonColor || '#008CBA'}; padding: ${field.buttonPadding || '10px 20px'}; height: ${field.buttonHeight || '40px'}px; width: ${field.buttonWidth || 'auto'}px; font-size: ${field.buttonFontSize || '16px'}px; border: ${field.buttonBorderWidth || '0'}px ${field.buttonBorderStyle || 'none'} ${field.buttonBorderColor || '#000'};
                   color:${field.buttonTextColor}; cursor: pointer;">
                    ${field.label || 'Click Here'}
                  </button>
                </a>`;
            case 'images':
              if (field.value.startsWith('data:image/png;base64,')) {
                const uniqueId = `image-${Date.now()}`;
                const imagePath = saveBase64Image(field.value, `${uniqueId}.png`);
                attachments.push({
                  filename: `${uniqueId}.png`,
                  path: imagePath,
                  cid: uniqueId,
                });
                return `<img src="cid:${uniqueId}" alt="${field.label || 'Image'}" style="width: 100%;" />`;
              }
              return `<img src="${field.value}" alt="${field.label || 'Image'}" style="width: 100%;" />`;
            case 'split':
              return (
                `<div style="background-color: ${field.splitbg || '#ffffff'}; width: ${field.width}; float: inline-start;">
                <div>
                   ${field.value.startsWith("data:image/")
                  ? (() => {
                    const uniqueId = `image-${Date.now()}`;
                    const imagePath = saveBase64Image(field.value, `${uniqueId}.png`);
                    attachments.push({
                      filename: `${uniqueId}.png`,
                      path: imagePath,
                      cid: uniqueId,
                    });

                    return `<img src="cid:${uniqueId}" style="padding: ${field.splitPadding || 0}px;" alt="Uploaded Preview" width="100%" />`;
                  })()
                  : `<p style="color: ${field.descritionColor || '#000'}; padding: ${field.splitPadding || 0}px; font-size: ${field.descritionFontSize || '16px'};">${field.value}</p>`
                }
                </div>
              </div>
                `
              );
            case 'product':
              return `
               <div class="product-grid" style="
                  display: flex;
                  grid-template-columns: repeat(${field.productsPerRow}, 1fr);
                  gap: 20px;
                  padding: ${field.productPadding}px;
                  background-color: ${field.productbg};
                  border-width: ${field.productBorderWidth}px;
                  border-style: ${field.productBorderStyle};
                  border-color: ${field.productBorderColor};
                  font-size: ${field.productFontSize}px;
                  color: ${field.productTextColor};
                   ">
                 ${field.products && field.products.length > 0
                  ? field.products.map(product => `
                  <div key="${product.id}" class="product-item">
                  ${product.images && product.images.length > 0 ? `
                 <img
                src="${product.images[0].src}"
                alt="${product.images[0].alt}"
                width="150"
                height="150"
              />
              ` : ''}
              <div>
              <h4 style="font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                ${product.title}
              </h4>
              ${field.price && product.variants && product.variants.length > 0 ? `
                <p style="font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                  Price: $${product.variants[0].price}
                </p>
                     
              ` : ''}
              ${field.showbtnn ? `
            <a href="${field.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
             <button
                 style="
                 font-size: ${field.productfontSize}px;
                 width: ${field.productwidth}px;
                 height: ${field.productheight}px;
                 background-color: ${field.productbackgroundColor};
                 border-width: ${field.productbtnBorderWidth}px;
                 border-style: ${field.productbtnBorderStyle};
                 border-color: ${field.productbtnBorderColor};
                 color: ${field.productbtnbg};
                 border-radius: ${field.productradious}px;
                 cursor: pointer;
                 "
                 class="show-bnt-product"
                 >
                   ${field.productLabel || 'Buy Now'}
                 </button>
                </a>
                ` : ''}

             </div>
               </div>
              `).join('')
                  : '<p>No products available</p>'
                }
              </div>
             `;
            case 'divider':
              return `<hr style="border-color: ${field.dividerColor || '#000'}; width: ${field.dividerWidth || '100%'}; height: ${field.dividerHeight || '1px'}; margin: ${field.dividerMargin || '20px 0'};" />`;
            case 'html convert':
              return `<div style="color: ${field.htmlColor || '#000'}; font-size: ${field.htmlFontSize || '16px'};">${field.value}</div>`;
            case 'spacer':
              return `
                      <div style="height: ${field.spacerHeight || '20px'}px; background-color: ${field.spacerbg || '#EDEDED'}; padding: ${field.splitPadding || '0'}px 0;">
                      </div>
                    `;
            case 'socalicon':
              const icons = [];
              if (field.value) {
                if (field.value.facebook && !field.value.facebook.isHidden) {
                  icons.push(`<a href="${field.value.facebook.url}" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/facebook.png?v=1732510414" alt="Facebook" style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" /></a>`);
                }
                if (field.value.twitter && !field.value.twitter.isHidden) {
                  icons.push(`<a href="${field.value.twitter.url}" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/twitter.png?v=1732510414" alt="Twitter" style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" /></a>`);
                }
                if (field.value.instagram && !field.value.instagram.isHidden) {
                  icons.push(`<a href="${field.value.instagram.url}" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/instagram.png?v=1732510414" alt="Instagram" style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" /></a>`);
                }
                if (field.customIcons && field.customIcons.length > 0) {
                  field.customIcons
                    .filter(icon => !icon.isHidden)
                    .forEach((icon, index) => {
                      const uniqueId = `custom-icon-${Date.now()}-${index}`;
                      if (icon.src.startsWith('data:image/png;base64,')) {
                        const imagePath = saveBase64Image(icon.src, `${uniqueId}.png`);
                        attachments.push({
                          filename: `${uniqueId}.png`,
                          path: imagePath,
                          cid: uniqueId,
                        });
                        icons.push(
                          `<a href="${icon.url}" target="_blank" rel="noopener noreferrer">
                             <img src="cid:${uniqueId}" alt="${uniqueId}" style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px" />
                           </a>`
                        );
                      }
                    });
                }
                return `<div>${icons.join('')}</div>`;
              }
              return '';
            default:
              return '';
          }
        })
        .join('');
    };

    const fieldsHTML = renderFieldsHTML();

    const userHtmlContent = `
    <html>
      <body style="background-color: ${TemplateAll.styles.backgroundColor || 'white'}; width: ${TemplateAll.styles.width || '100%'}; border-radius: ${TemplateAll.styles.borderRadious || '0'}px; text-align: ${TemplateAll.styles.textAlign || 'left'}; padding: ${TemplateAll.styles.templatePadding || '0'}; font-family: ${TemplateAll.styles.fontFamily || 'Arial'}; margin:auto">
        <div>
          ${fieldsHTML}
        </div>
      </body>
    </html>
  `;
    const adminHtmlContent = `
      <html>
        <body>
          <h1>New form submission from ${email}</h1>
          <div>
           
          </div>
        </body>
      </html>
    `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sahil@hubsyntax.com',
        pass: 'wqnr gaom dgzq asyu',
      },
    });

    const adminMailOptions = {
      from: 'sahil@hubsyntax.com',
      to: 'sahil@hubsyntax.com',
      subject: 'New Customer Query EcombitHub',
      html: adminHtmlContent,
    };

    const userMailOptions = {
      from: 'sahil@hubsyntax.com',
      to: email,
      subject: 'Thank You for Your Query!',
      html: userHtmlContent,
      attachments,
    };

    console.log('Sending admin email to sahil@hubsyntax.com');
    await transporter.sendMail(adminMailOptions);

    console.log('Sending user email to:', email);
    await transporter.sendMail(userMailOptions);

    console.log('Emails sent successfully!');
  } catch (error) {
    console.error('');
  }
};

app.get('/check-title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const existingForm = await Email.findOne({ title });
    if (existingForm) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (error) {
    console.error('Error checking title:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/copy-email', async (req, res) => {
  const copiedForm = req.body;

  try {
    delete copiedForm._id;

    if (!copiedForm || !copiedForm.formId) {
      throw new Error('Invalid form data');
    }
    const savedForm = await Email.create(copiedForm);

    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error copying form:', error.message);
    res.status(500).json({ error: 'Failed to copy form', details: error.message });
  }
});

app.get('/get/data', async (req, res) => {
  try {
    const data = await Email.find({});
    res.status(200).json({ message: 'Form data retrieved', data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

app.get('/check-form-connected/:formId', async (req, res) => {
  const { formId } = req.params;

  try {

    const form = await Email.findOne({ form_ids: formId });

    if (form) {
      return res.status(200).json({ isConnected: true });
    } else {
      return res.status(200).json({ isConnected: false });
    }
  } catch (error) {
    console.error('Error checking form connection:', error);
    res.status(500).json({ message: 'Error checking form connection', error: error.message });
  }
});

app.put('/unlink-template/:formId', async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Email.findOne({ form_ids: formId });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    form.form_ids = form.form_ids.filter((id) => id !== formId);
    await form.save();

    res.status(200).json({ message: 'Template successfully unlinked from the form', data: form });
  } catch (error) {
    console.error('Error unlinking template:', error);
    res.status(500).json({ message: 'Error unlinking template', error: error.message });
  }
});

app.post('/send/api', upload.single('image'), async (req, res) => {
  console.log('respose-data', req.body);
  try {
    const { templateId,shop, title, fields, createdAt, styles, form_ids } = req.body;
    console.log('Form IDs:', form_ids);
    const formIds = Array.isArray(form_ids) ? form_ids : [form_ids];
    const formIdsStr = formIds.map(id => String(id));
    const formData = new Email({
      templateId,
      shop,
      title,
      form_ids: formIdsStr,
      fields,
      createdAt,
      styles,
    });

    if (req.file) {
      formData.styles.backgroundImage = req.file.path;
    }

    const savedForm = await formData.save();
    res.status(201).json({ message: 'Form saved successfully', data: savedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving form', error: error.message });
  }
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedForm = await Email.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form updated successfully', data: updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {

    const result = await Email.findOneAndDelete({ templateId: id });
    if (!result) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/save-shop', async (req, res) => {
  try {
    const { shop, accessToken } = req.body;

    if (!shop || !accessToken) {
      return res.status(400).json({ error: "Shop domain and access token are required" });
    }

    const updatedShopDetails = await ShopDetails.findOneAndUpdate(
      { shop }, 
      { accessToken }, 
      { new: true, upsert: true } 
    );
    return res.json({ success: true, message: 'Shop details processed successfully.' });
  } catch (e) {
    console.error('Error occurred:', e);
    return res.status(500).json({ error: 'Internal server error: ' + e.message });
  }
});


app.get('/payment/plan', async (req, res) => {

  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).json({ error: 'Shop parameter is required' });
  }

  try {
    const paymentPlan = await Payment.findOne({ shop });


    if (!paymentPlan) {
      return res.status(404).json({ error: 'Payment plan not found' });
    }

    const forms = await Form.countDocuments({ shop });
    const maxFormsAllowed = paymentPlan.plan === 'free' ? 1 : Infinity;
    const status = paymentPlan.status;

    res.status(200).json({
      plan: paymentPlan.plan,
      formCount: forms,
      maxForms: maxFormsAllowed,
      status: status,
    });
  } catch (error) {
    console.error('Error retrieving payment plan:', error);
    res.status(500).json({ error: 'Failed to retrieve payment plan' });
  }
});

app.post('/payment/confirm', async (req, res) => {
  try {
    const { chargeId, shop, name, plan, price, status, billingOn } = req.body;

    if (!chargeId) {
      return res.status(400).json({ error: "Charge ID is required" });
    }
    if (!shop || !name || !plan || status === undefined || billingOn === undefined || price === undefined) {
      return res.status(400).json({ error: "All payment details are required" });
    }

    const existingActivePlan = await Payment.findOne({ shop, status: 'active' });
    if (existingActivePlan) {
      existingActivePlan.status = 'disactive';
      await existingActivePlan.save();
    }

    let payment = await Payment.findOne({ chargeId, shop });
    if (payment) {

      payment.name = name;
      payment.plan = plan;
      payment.price = price;
      payment.status = status;
      payment.billingOn = billingOn;
      await payment.save();
    } else {

      payment = new Payment({
        shop,
        name,
        plan,
        price,
        status,
        billingOn,
        chargeId,
      });
      await payment.save();
    }

    res.json({ success: true, payment });
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({ error: 'Error confirming payment' });
  }
});


// app.get('/api/customer', async (req, res) => {
//   try {
//     const forms = await Form.find({});

//     const uniqueForms = forms.reduce((acc, current) => {
//       const currentFieldValues = current.fields.map(field => field.value).sort().join('|');

//       const duplicate = acc.find(form => {
//         const existingFieldValues = form.fields.map(field => field.value).sort().join('|');
//         return existingFieldValues === currentFieldValues;
//       });

//       if (!duplicate) {
//         acc.push(current);
//       }

//       return acc;
//     }, []);

//     res.status(200).json(uniqueForms);
//   } catch (error) {
//     console.error('Error retrieving forms:', error);
//     res.status(500).send({ error: 'Failed to retrieve forms' });
//   }
// });

app.get('/api/customer', async (req, res) => {
  try {
    const forms = await Form.find({}); 
    const emailMap = new Map();

    forms.forEach(form => {
      const shop = form.shop; 
      form.fields.forEach(field => {
        if (field.name === 'Email') {
          const email = field.value;
          if (!emailMap.has(email)) {
            emailMap.set(email, []);
          }

          emailMap.get(email).push(shop);
        }
      });
    });
    const emailArray = [...emailMap].map(([email, shops]) => ({ email, shops }));

    res.status(200).json(emailArray);
  } catch (error) {
    console.error('Error retrieving emails:', error);
    res.status(500).send({ error: 'Failed to retrieve emails' });
  }
});

app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find({});
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).send({ error: 'Failed to retrieve forms' });
  }
});

app.post('/api/forms', async (req, res) => {
  try {
    const formsData = req.body;
    const { title, id, fields, timestamp, shop } = formsData;
    console.log("data", req.body);
    if (!shop) {
      return res.status(400).send({ error: 'Shop field is missing from the form submission.' });
    }
    if (!title || !id || !fields || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).send({ error: 'Missing required fields: title, id, and fields are required.' });
    }

    for (const field of fields) {
      if (!field.id || !field.value) {
        return res.status(400).send({ error: 'Each field must have an id and a value.' });
      }
    }

    let form = await Form.findOne({ id });

    if (!form) {
      form = new Form({
        title,
        id,
        shop,
        fields,
        timestamp: timestamp || new Date().toISOString(),
        submissionCount: 0,
        submissions: []
      });
      await form.save();
    }

    form.submissionCount += 1;
    form.submissions.push({
      fields,
      timestamp: new Date().toISOString(),
    });

    await form.save();

    const emailField = fields.find(field => field.name === 'Email');
    const email = emailField ? emailField.value : null;

    if (!email) {
      return res.status(400).send({ error: 'Email field is missing from the form submission.' });
    }


    res.status(201).send({
      message: 'Form submitted successfully!',
      submissionCount: form.submissionCount,
      submissions: form.submissions
    });
  } catch (error) {
    console.error('Error saving form submission:', error);
    res.status(500).send({ error: 'Failed to save form submission' });
  }
});


app.get('/get-forms', async (req, res) => {
  try {
    const forms = await FormModel.find();
    res.json(forms);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error('Error:', error.message);
  }
});

app.post('/copy-form', async (req, res) => {
  const copiedForm = req.body;

  try {
    if (!copiedForm || !copiedForm.formId) {
      throw new Error('Invalid form data');
    }
    const savedForm = await FormModel.create(copiedForm);

    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error copying form:', error.message);
    res.status(500).json({ error: 'Failed to copy form', details: error.message });
  }
});

app.get('/get-form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await FormModel.findOne({ formId });

    if (!form) {
      return res.status(404).send('Form not found');
    }

    res.json(form);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error('Error:', error.message);
  }
});

app.post('/form-data', async (req, res) => {
  try {
    const { title } = req.body;

    let existingForm = await FormModel.findOne({ title: title.trim() });
    let newTitle = title.trim();

    let counter = 1;
    while (existingForm) {
      newTitle = `${title.trim()} ${counter}`;
      existingForm = await FormModel.findOne({ title: newTitle });
      counter++;
    }

    const { formId,shop, fields, createdAt, styles, submissionOption, thankYouTimer, editorValue, url, status } = req.body;
    const newFormEntry = new FormModel({
      formId,
      shop,
      title: newTitle,
      fields,
      createdAt,
      styles,
      submissionOption,
      thankYouTimer,
      editorValue,
      url,
      status
    });

    await newFormEntry.save();

    res.status(201).send({ message: 'Form created successfully', title: newTitle });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error('Error:', error.message);
  }
});


app.put('/update-form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const updatedForm = await FormModel.findOneAndUpdate({ formId }, req.body, { new: true });

    if (!updatedForm) {
      return res.status(404).send('Form not found');
    }

    res.status(200).send('Form updated successfully');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error('Error:', error.message);
  }
});

app.delete('/delete-form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const result = await FormModel.deleteOne({ formId });

    if (result.deletedCount === 0) {
      return res.status(404).send('Form not found');
    }

    res.status(200).send('Form deleted successfully');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error('Error:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// const port = 4001;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));

// const mongoUri = 'mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(mongoUri)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('Error connectingcd  to MongoDB:', err);
//   });

//   const formCreateSchema = new mongoose.Schema({
//     formId: { type: String, required: true },
//     title: { type: String, required: true },
//     fields: [{
//         id: { type: String, required: true },
//         type: { 
//             type: String, 
//             required: true, 
//             enum: ['text', 'name', 'button', 'divider', 'heading', 'radio','file','number','date','datetime','images','link', 'checkbox','location','toggle', 'select','textarea','password', 'email', 'phone','time','description','url','slider']
//         },
//         label: { type: String, required: true },
//         name: String,
//         required: { type: Boolean, default: false },
//         readonly: { type: Boolean, default: false },
//         width: { type: String, default: '100%' },
//         text: { type: String, default: '' }, 
//         description: { type: String, default: '' },
//         level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], required: false },
//         fontSize: { type: String, default: '16px' },
//         padding: { type: String, default: '10px' }, 
//         color: { type: String, default: '#45a7f6' },
//         dividerColor: { type: String, default: '#000' },
//         buttonWidth: { type: String, default: 'auto' },   
//         buttonHeight: { type: String, default: 'auto' }, 
//         backgroundColor: { type: String, default: '#45a7f6' }, 
//         options: [{
//             id: { type: String, required: true },
//             label: { type: String, required: true }, 
//             value: { type: String, required: true },
//             name: { type: String, required: true, default: function() { return this.label || this.value; } } 
//         }]
//     }],
//     createdAt: { type: String, required: true },
//     styles: {
//         backgroundColor: { type: String, required: true },
//         backgroundImage: { type: String, default: '' },
//         backgroundRepeat: { type: String, default: 'no-repeat' },
//         boxShadow: { type: String, default: '' },
//         width: { type: String, default: '100%' },
//         padding: { type: String, default: '0' },
//         borderColor: { type: String, default: '' },
//         borderRadius: { type: String, default: '0' },
//         borderWidth: { type: String, default: '1px' }, 
//         borderStyle: { type: String, default: 'solid' } 

//     },
//     status: { 
//         type: String, 
//         enum: ['live', 'draft'], 
//         required: true 
//     },
// });

// const FormModel = mongoose.model('forms_data', formCreateSchema);

// const formSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     id: { type: String, required: true },
//     fields: [
//         {
//             id: { type: String, required: true },
//             name: { type: String, required: true },
//             value: { type: String, required: true },
//         },
//     ],
// });

// const Form = mongoose.model('Form_costumers', formSchema);

// app.get('/api/forms', async (req, res) => {
//   try {
//       const forms = await Form.find({});
//       res.status(200).json(forms);
//   } catch (error) {
//       console.error('Error retrieving forms:', error);
//       res.status(500).send({ error: 'Failed to retrieve forms' });
//   }
// });

// app.post('/api/forms', async (req, res) => {
//   try {
//       const formsData = req.body;
//       const { title, id, fields } = formsData;

//       if (!title || !id || !fields || !Array.isArray(fields) || fields.length === 0) {
//           return res.status(400).send({ error: 'Missing required fields: title, id, and fields are required.' });
//       }
//       for (const field of fields) {
//           if (!field.id || !field.value) {
//               return res.status(400).send({ error: 'Each field must have an id and a value.' });
//           }
//       }

//       const newForm = new Form({
//           title,
//           id,
//           fields,
//       });
//       await newForm.save();
//       res.status(201).send({ message: 'Form saved successfully!' });
//   } catch (error) {
//       console.error('Error saving forms:', error);
//       res.status(500).send({ error: 'Failed to save forms' });
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

// app.get('/get-form/:formId', async (req, res) => {
//   try {
//       const { formId } = req.params;
//       const form = await FormModel.findOne({ formId });

//       if (!form) {
//           return res.status(404).send('Form not found');
//       }

//       res.json(form);
//   } catch (error) {
//       res.status(500).send('Error: ' + error.message);
//       console.error('Error:', error.message);
//   }
// });

// app.post('/form-data', async (req, res) => {
//   try {
//     const { title } = req.body;

//     const existingForm = await FormModel.findOne({ title: title.trim() });
//     if (existingForm) {
//       return res.status(400).send('A form with this title already exists. Please choose a different title.');
//     }

//     const { formId, fields, createdAt, styles, status } = req.body; 
//     const newFormEntry = new FormModel({ formId, title, fields, createdAt, styles, status });
//     await newFormEntry.save();

//     res.status(201).send('Form created successfully');
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.put('/update-form/:formId', async (req, res) => {
//   try {
//       const { formId } = req.params;
//       const updatedForm = await FormModel.findOneAndUpdate({ formId }, req.body, { new: true });

//       if (!updatedForm) {
//           return res.status(404).send('Form not found');
//       }

//       res.status(200).send('Form updated successfully');
//   } catch (error) {
//       res.status(500).send('Error: ' + error.message);
//       console.error('Error:', error.message);
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
















// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// const port = 4001;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());

// const mongoUri = 'mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(mongoUri)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('Error connecting to MongoDB:', err);
//   });

//   const formCreate = new mongoose.Schema({
//   formId: { type: String, required: true },
//   title: { type: String, required: true },
//   fields: [{
//     id: { type: String, required: true },
//     type: { type: String, required: true }
//   }],
//   createdAt: { type: String, required: true },
// });

// const FormModel = mongoose.model('forms_data', formCreate);

// const formSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     id: { type: String, required: true },
//     fields: [
//         {
//             id: { type: String, required: true },
//             name: { type: String, required: true },
//             value: { type: String, required: true },
//         },
//     ],
// });

// const Form = mongoose.model('Form_costumers', formSchema);

// app.get('/api/forms', async (req, res) => {
//   try {
//       const forms = await Form.find({});
//       res.status(200).json(forms);
//   } catch (error) {
//       console.error('Error retrieving forms:', error);
//       res.status(500).send({ error: 'Failed to retrieve forms' });
//   }
// });

// app.post('/api/forms', async (req, res) => {
//     try {
//         const formsData = req.body;
//         await Form.insertMany(formsData);
//         res.status(201).send({ message: 'Forms saved successfully!' });
//     } catch (error) {
//         console.error('Error saving forms:', error);
//         res.status(500).send({ error: 'Failed to save forms' });
//     }
// });

// app.get('/get-forms', async (req, res) => {
//   try {
//     const forms = await FormModel.find(); 
//     res.json(forms);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.post('/form-data', async (req, res) => {
//   try {
//     const { formId, title, fields, createdAt } = req.body;
//     const newFormEntry = new FormModel({ formId, title, fields, createdAt });
//     await newFormEntry.save();

//     res.send('Success');
//     // console.log('Data saved:', newFormEntry);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });









// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

// const app = express();
// const port = process.env.PORT || 4001;

// app.use(express.json());
// app.use(cors());

// const sendEmail = async (name, lastName, email, message,emailSubject, emailMessage) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'sahil@hubsyntax.com',
//         pass: 'tdry xexo fqgj alzq',
//       },
//     });

//     const adminHtmlContent = `
//   <html>
//   <head>
//     <style>
//         @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');


//       .container {
//         font-family: "Roboto", sans-serif!important;
//         border: 1px solid #e3e3e3;
//         height: 600px;
//         width: 100%;
//         max-width: 600px;
//         margin: 50px auto; 
//         padding: 20px;
//         background-color: #f6f8fc;
//         border-radius: 10px;
//         font-weight: 600;
//       }

//       p {
//         font-size: 18px;
//         text-align: left;

//       }

//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <p> Name: ${name}</p>
//        <p>last Name: ${lastName}</p>
//        <p>email: ${email}</p>
//        <p>message: ${message}</p>

//     </div>
//   </body>
//   </html>
//   `;

//     const userHtmlContent = `
//   <html>
//   <head>

//     <style>
//       @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//         line-height: 28px;
//         color: black!important;
//         text-decoration: none !important;
//         background-color: white;
//         font-family: "Roboto", sans-serif!important;
//       }
//       .container {
//       text-align: center;
//       border: 1px solid #e3e3e3;
//       height: auto;
//       width: 100%;
//       max-width: 800px;
//       margin: 50px auto;
//       box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//       }

//       h1 {
//         margin: 0;
//       }
//       p {
//        font-size: 18px;
//       text-align: left;
//       font-weight: 600;
//       }

//       .need {
//         margin-top: 30px;
//         margin-bottom: 30px;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <img src="cid:user-image" style="width: 100%;" alt="Service Image" />
//       <div class="elements">
//         <div class="need">
//         <p>Hello ${name}</p>
//         <p>${emailMessage}</p>
//           <p>At <span class="text-color">EcombitHub,</span> we’re passionate about empowering e-commerce entrepreneurs like you to achieve success. Whether
//             you’re just starting out or looking to scale your online store, we’ve got you covered with a range of services
//             designed to meet your unique needs.</p>
//         </div>
//       </div>
//     </div>
//   </body>
//   </html>
//   `;

//     const adminMailOptions = {
//       from: email,
//       to: 'sahil@hubsyntax.com',
//       subject: 'New Customer Query builder-form',
//       html: adminHtmlContent,

//     };

//     const userMailOptions = {
//       from: '"EcombitHub Support" <sahil@hubsyntax.com>',
//       to: email,
//       subject: emailSubject || 'Welcome to builder-form',
//       html: userHtmlContent,
//     };

//     await transporter.sendMail(adminMailOptions);
//     await transporter.sendMail(userMailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };


// app.post('/register', async (req, res) => {
//   const { name, lastName, email, message, emailSubject, emailMessage } = req.body;
//   await sendEmail(name, lastName, email, message, emailSubject, emailMessage);  
//   res.status(200).json({ message: 'Email sent successfully' });
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

































// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// const port = 4001;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const mongoUri = 'mongodb+srv://info:HeTtLubQ6ViUMts3@cluster0.4mbsgst.mongodb.net/diamond?retryWrites=true&w=majority';
// mongodb+srv://info:8HhuZSfsVy7clyTN@cluster0.a86kc.mongodb.net/form?retryWrites=true&w=majority&appName=Cluster0
// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

// const formSchema = new mongoose.Schema({
//   name: String,
//   number: Number,
// });

// const settingSchema = new mongoose.Schema({
//   data: String
// });

// const FormModel = mongoose.model('forms', formSchema);
// const Model = mongoose.model('settingdatas', settingSchema);

// app.get('/data', async (req, res) => {
//   try {
//     const formEntries = await FormModel.find();
//     res.json(formEntries);
//     // console.log('Data retrieved:', formEntries);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.post('/submit', async (req, res) => {
//   try {
//     const { name, number } = req.body;
//     const newFormEntry = new FormModel({ name, number });
//     await newFormEntry.save();
//     res.send('Success');
//     // console.log('Data saved:', newFormEntry);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.get('/settingdata', async (req, res) => {
//   try {
//     const formEntries = await Model.find();
//     res.json(formEntries);
//     console.log('Data retrieved:', formEntries);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.post('/setting', async (req, res) => {
//   try {
//     const { data } = req.body;
//     const newFormEntry = new Model({ data });
//     await newFormEntry.save();
//     res.send('Success');
//     // console.log('Data saved:', newFormEntry);
//   } catch (error) {
//     res.status(500).send('Error: ' + error.message);
//     console.log('Error:', error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });





































{/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<div class="form_builder_app {{ block.id }}">
  <div style="background-size: cover;" id="formData-{{ block.id }}"></div>
</div>

<script>
  $(document).ready(function () {
    const formId = '{{ block.settings.formId }}';

    console.log('Form ID:', formId);

    if (formId && formId !== 'default-id') {
      fetchFormData(formId);
    }

    function fetchFormData(id) {
      $('#formData-{{ block.id }}').empty();

      $.ajax({
        url: `http://localhost:4001/get-form/${id}`,
        method: 'GET',
        success: function (data) {
          console.log('Fetched form data:', data);
          displayFormData(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('Error: ' + errorThrown);
          $('#formData-{{ block.id }}').append('<p>Error fetching form data. Please try again.</p>');
        },
      });
    }

    function displayFormData(formData) {
      const container = $('#formData-{{ block.id }}');

      const formTitle = formData.title || 'Form Data';

      if (formData.styles) {
        for (const [key, value] of Object.entries(formData.styles)) {
          container.css(key, value);
        }
      }

      container.append(`<h2>${formTitle}</h2>`);

      if (formData.fields && formData.fields.length > 0) {
        formData.fields.forEach((field) => {
          const floatStyle = (field.type === 'text') ? 'float: inline-start;' : ''; 
          
          const fieldHtml = `
          <div key="${field.id}" style="width: ${field.width}; ${floatStyle}" class="input-field">
              <label>${field.label}</label>
              ${getFieldInput(field)}  
          </div>
      `;
          container.append(fieldHtml);
        });
      } else {
        container.append('<p>No fields available.</p>');
      }
      container.append('<div class="clear-float"></div>');
    }

    function getFieldInput(field) {
      if (field.type === 'text') {
        return `<input type="text" class="custom-text-input" placeholder="${field.placeholder || ''}" 
                style="width: ${field.width || 'auto'};" 
                aria-label="${field.label || 'Text Input'}" />`;
      } else if (field.type === 'textarea') {
        return `<textarea placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" aria-label="${field.label || 'Textarea'}"></textarea>`;
      } else if (field.type === 'select') {
        const options = field.options
          .map((option) => `<option value="${option.value}">${option.label}</option>`)
          .join('');
        return `<select style="width: ${field.width || 'auto'};" aria-label="${
          field.label || 'Select Input'
        }">${options}</select>`;
      } else if (field.type === 'checkbox') {
        return `
          <div>
            ${field.options
              .map(
                (option) => `
                <div key="${option.id}" class="form_checkbox_flex">
                  <input type="checkbox" 
                    name="${field.name}" 
                    value="${option.value}"
                    ${field.required ? 'required' : ''} 
                    ${field.readonly ? 'readonly' : ''} />
                  <label>${option.label}</label>
                </div>
              `
              )
              .join('')}
          </div>
        `;
      } else if (field.type === 'radio') {
        return field.options
          .map(
            (option) => `
            <label>
              <input type="radio" name="${field.name}" value="${option.value}" 
                ${option.checked ? 'checked' : ''} 
                aria-label="${field.label || 'Radio Input'}" />
              ${option.label}
            </label>
          `
          )
          .join('');
      } else if (field.type === 'divider') {
        return `<hr style="border: 1px solid ${field.dividerColor}; width: 100%;" />`;
      } else if (field.type === 'description') {
        return `<p>${field.text}</p>`;
      } else if (field.type === 'heading') {
        return `<h1 style="font-size: ${field.fontSize || '16px'};">${field.text}</h1>`;
      } else if (field.type === 'number') {
        return `<input type="number" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'file') {
        return `<input type="file" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'email') {
        return `<input type="email" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'phone') {
        return `<input type="tel" placeholder="${field.placeholder || ''}" style="width: ${field.width || 'auto'};" />`;
      } else if (field.type === 'password') {
        return `<input type="password" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'url') {
        return `<input type="url" placeholder="${field.placeholder || ''}" style="width: ${field.width || 'auto'};" />`;
      } else if (field.type === 'location') {
        return `<input type="text" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'date') {
        return `<input type="date" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'datetime') {
        return `<input type="datetime-local" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'time') {
        return `<input type="time" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'link') {
        return `<input type="url" placeholder="${field.placeholder || ''}" style="width: ${field.width || 'auto'};" />`;
      } else if (field.type === 'images') {
        return `<input type="file" multiple placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'slider') {
        return `<input type="range" placeholder="${field.placeholder || ''}" style="width: ${
          field.width || 'auto'
        };" />`;
      } else if (field.type === 'button') {
        return `
          <div>
            <button style="background-color: ${field.color}; font-size: ${field.fontSize || '16px'}; padding: ${
          field.padding || '10px'
        }; color: #fff;" onclick="submitFormData()">
              ${field.label}
            </button>
          </div>
        `;
      }

      return '';
    }
  });

  function generateUniqueId() {
    return 'field_' + Math.random().toString(36).substr(2, 9);
  }

  function submitFormData() {
    const formData = {
      id: '{{ block.settings.formId }}',
      title: $('#formData-{{ block.id }} h2').text(),
      fields: [],
    };

    $('#formData-{{ block.id }} .input-field').each(function () {
      const input = $(this).find('input, textarea');
      const fieldName = $(this).find('label').text().trim();
      const fieldValue = input.is(':radio') ? input.filter(':checked').val() : input.val() || '';

      const fieldObject = {
        id: generateUniqueId(),
        name: fieldName,
        value: fieldValue,
      };

      if (fieldValue) {
        formData.fields.push(fieldObject);
      }
    });

    console.log('Form Data to send:', formData);

    $.ajax({
      url: 'http://localhost:4001/api/forms',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function (response) {
        console.log('Form submitted successfully:', response);
        alert('Form submitted successfully!');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error submitting form:', errorThrown);
        alert('Error submitting form. Please try again.');
      },
    });
  }
</script>

{% schema %}
{
  "name": "Form Submission",
  "target": "section",
  "settings": [
    { "type": "color", "id": "colour", "label": "Button Text Colour", "default": "#ff0000" },
    { "type": "color", "id": "bgcolour", "label": "Button Background Colour", "default": "#ff0000" },
    { "type": "text", "id": "formId", "label": "Form ID" }
  ]
}
{% endschema %} */}