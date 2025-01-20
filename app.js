import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4001;
import fs from 'fs';
import path from 'path';
app.use(cors());

const mongoUri = 'mongodb://info:8HhuZSfsVy7clyTN@cluster0-shard-00-00.a86kc.mongodb.net:27017,cluster0-shard-00-01.a86kc.mongodb.net:27017,cluster0-shard-00-02.a86kc.mongodb.net:27017/form?ssl=true&replicaSet=atlas-gb66eq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connectingcd  to MongoDB:', err);
  });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', 'images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

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
    placeholder: { type: String, default: '' },
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
    textSize: { type: String, required: false },
    textAline: { type: String, required: false },
    textColor: { type: String, required: false },
    linktext: { type: String, required: false },
    linkUrl: { type: String, required: false },
    linkTarget: { type: String, required: false },
    customClass: { type: String, required: false },
    linkaline: { type: String, required: false },
    min: { type: String, required: false },
    max: { type: String, required: false },
    step: { type: String, required: false },
    btnradious: { type: String, required: false },
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
  toggleStatus: { type: String, required: false },
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
    borderStyle: { type: String, default: 'solid' },
    inputRadious: { type: String, default: '4' },
    inputstyle: { type: String, default: 'solid' },
    inputwidth: { type: String, default: '1' },
    inputborderColor: { type: String, default: 'blue' },
    inputBgColor: { type: String, default: '' },
    labelColor: { type: String, default: 'blue' },
    inputGap: { type: String, default: '10' },
    opacityForm: { type: String, default: '1' },
    textHeading: { type: String, default: '' },
    colorHeading: { type: String, default: '' },

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
  currentUrl: { type: String, required: false, },
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

const columnSchema = new mongoose.Schema({
  columnIndex: { type: Number, required: false },
  image: { type: String, required: false },
  content: { type: String, required: false },
  isVisible: { type: Boolean, default: false },
  Multibtnlable: { type: String, default: 'Shop Now' },
  Multibtnurl: { type: String, default: false },
});

const emailTemplateSchema = new mongoose.Schema({
  templateId: { type: String, required: true },
  shop: { type: String, required: true },
  TemplateImage: { type: String, required: true },
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
      headingbgImage: { type: String, required: false },
      headerbtnbg: { type: String, required: false },
      headerbtncolor: { type: String, required: false },
      headingbtnPadding: { type: String, required: false },
      headingbtntopPadding: { type: String, required: false },
      headingbtnradious: { type: String, required: false },
      headingbtnFontSize: { type: String, required: false },
      headingbtnwidth: { type: String, required: false },
      headingbtnheight: { type: String, required: false },
      headingsubheading: { type: String, required: false },
      headerbtn: { type: String, required: false },
      columnCount: { type: Number, required: false },
      columnData: { type: [columnSchema], required: false },
      value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
      bannerImageWidth: { type: String, required: false },
      bannerImageHeight: { type: String, required: false },
      bannerImageTextAlign: { type: String, required: false },
      editorContent: { type: String, required: false },
      headingUrl: { type: String, required: false },
      richTextAlign: { type: String, required: false },
      imageUrl: { type: String, required: false },
      headingFontSize: { type: String, required: false },
      headingLevel: { type: String, required: false },
      headeropacity: { type: String, required: false },
      headingFontWeight: { type: String, required: false },
      headingColor: { type: String, required: false },
      headingbg: { type: String, required: false },
      subheadingColor: { type: String, required: false },
      headingBorderColor: { type: String, required: false },
      headingBorderWidth: { type: String, required: false },
      headingbtnBorderWidth: { type: String, required: false },
      headingbtnBorderStyle: { type: String, required: false },
      headingbtnBorderColor: { type: String, required: false },
      headingBorderStyle: { type: String, required: false },
      headingLetterSpacing: { type: String, required: false },
      headingPadding: { type: String, required: false },
      headingTextAlign: { type: String, required: false },
      headingText: { type: String, required: false },

      descriptionText: { type: String, required: false },
      texteditorValue: { type: String, required: false },
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
      content: { type: String, required: false },
      platform: { type: String, required: false },
      image: { type: String, required: false },
      url: { type: String, required: false },
      dividerColor: { type: String, required: false },
      dividerbgColor: { type: String, required: false },
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
      buttonbgColor: { type: String, required: false },
      buttonaline: { type: String, required: false },
      buttonUrll: { type: String, default: '' },
      buttonTextColor: { type: String, default: false },
      buttonPadding: { type: String, required: false },
      htmlContent: { type: String, required: false, default: "" },
      socalIconWidth: { type: String, required: false },
      socalIconHeight: { type: String, required: false },
      socalIconPadding: { type: String, required: false },
      socalIconbg: { type: String, required: false },
      socalIcongap: { type: String, required: false },
      socaliconTextAlign: { type: String, required: false },
      htmlFontSize: { type: String, required: false },
      htmlPadding: { type: String, required: false },
      htmlColor: { type: String, required: false },
      splitbg: { type: String, required: false },
      splitbtn: { type: String, required: false },
      splitbtnbg: { type: String, required: false },
      splittext: { type: String, required: false },
      splitColor: { type: String, required: false },
      splitbtnfont: { type: String, required: false },
      splitbtncolor: { type: String, required: false },
      splitbtnurl: { type: String, required: false },
      splitbtnheight: { type: String, required: false },
      splitbtnwidth: { type: String, required: false },
      splitbtnradious: { type: String, required: false },
      splitheight: { type: String, required: false },
      add: { type: String, required: false },
      width: { type: String, required: false },
      spacerHeight: { type: String, required: false },
      spacerbg: { type: String, required: false },
      videoPadding: { type: String, required: false },
      splittextSize: { type: String, required: false },
      splitPadding: { type: String, required: false },
      splitTextAlin: { type: String, required: false },
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
      columnsPerRow: { type: Number, default: 3 },
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
      showbtnsplit: { type: Boolean, default: false },
      showbtnmulti: { type: Boolean, default: false },
      fontsizeMulticolumn: { type: String, required: false },
      Multicolumnbgcolor: { type: String, required: false },
      Multibgcolor: { type: String, required: false },
      MultiPadding: { type: String, required: false },
      Multitext: { type: String, required: false },
      Multigap: { type: String, required: false },
      MulticolumnbtnBorderWidth: { type: String, required: false },
      MulticolumnbtnBorderColor: { type: String, required: false },
      MulticolumnbtnBorderStyle: { type: String, required: false },
      MultibtnBorderWidth: { type: String, required: false },
      MultiColor: { type: String, required: false },
      MultibtnBorderColor: { type: String, required: false },
      MultibtnBorderStyle: { type: String, required: false },
      Multibtnheight: { type: String, required: false },
      Multibtnweight: { type: String, required: false },
      Multibtncolor: { type: String, required: false },
      Multibtnradious: { type: String, required: false },
      Multibtnfont: { type: String, required: false },
      splitBorderWidth: { type: String, required: false },
      splitBorderColor: { type: String, required: false },
      splitBorderStyle: { type: String, required: false },
      richFontsize: { type: String, required: false },
      richtopPadding: { type: String, required: false },
      richleftPadding: { type: String, required: false },
      richbgcolor: { type: String, required: false },
      richtextcolor: { type: String, required: false },
      MulticolumnPadding: { type: String, required: false },
      Multibtnlable: { type: String, required: false },
      Multiborderradious: { type: String, required: false },
      Multibtnbg: { type: String, required: false },
      Multibtnurl: { type: String, required: false },
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
const Email = mongoose.model('EmailTemplats', emailTemplateSchema);

const coloumtemplate = new mongoose.Schema({
  columnIndex: { type: Number, required: false },
  image: { type: String, required: false },
  content: { type: String, required: false },
  isVisible: { type: Boolean, default: false },
  Multibtnlable: { type: String, default: 'Shop Now' },
  Multibtnurl: { type: String, default: false },
});

const ShowTemplats = new mongoose.Schema({
  templateId: { type: String, required: true },
  title: { type: String, required: true },
  TemplateImage: { type: String, required: true },
  headingText: {
    text: { type: String, required: false },
    fontSize: { type: String, required: false }
  },
  fields: [
    {

      name: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
      headerbtnbg: { type: String, required: false },
      headerbtncolor: { type: String, required: false },
      headingbtnPadding: { type: String, required: false },
      headingbtntopPadding: { type: String, required: false },
      headingbtnradious: { type: String, required: false },
      headingbtnFontSize: { type: String, required: false },
      headingbtnwidth: { type: String, required: false },
      headingbtnheight: { type: String, required: false },
      headingsubheading: { type: String, required: false },
      headerbtn: { type: String, required: false },
      columnCount: { type: Number, required: false },
      columnData: { type: [coloumtemplate], required: false },
      value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
      bannerImageWidth: { type: String, required: false },
      bannerImageHeight: { type: String, required: false },
      bannerImageTextAlign: { type: String, required: false },
      editorContent: { type: String, required: false },
      headingUrl: { type: String, required: false },
      richTextAlign: { type: String, required: false },
      imageUrl: { type: String, required: false },
      headingFontSize: { type: String, required: false },
      headingLevel: { type: String, required: false },
      headeropacity: { type: String, required: false },
      headingFontWeight: { type: String, required: false },
      headingColor: { type: String, required: false },
      headingbg: { type: String, required: false },
      subheadingColor: { type: String, required: false },
      headingBorderColor: { type: String, required: false },
      headingBorderWidth: { type: String, required: false },
      headingbtnBorderWidth: { type: String, required: false },
      headingbtnBorderStyle: { type: String, required: false },
      headingbtnBorderColor: { type: String, required: false },
      headingBorderStyle: { type: String, required: false },
      headingLetterSpacing: { type: String, required: false },
      headingPadding: { type: String, required: false },
      headingTextAlign: { type: String, required: false },
      headingText: { type: String, required: false },
      headingbgImage: { type: Object, required: false },
      descriptionText: { type: String, required: false },
      texteditorValue: { type: String, required: false },
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
      content: { type: String, required: false },
      platform: { type: String, required: false },
      image: { type: String, required: false },
      url: { type: String, required: false },
      dividerColor: { type: String, required: false },
      dividerWidth: { type: String, required: false },
      dividerbgColor: { type: String, required: false },
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
      buttonbgColor: { type: String, required: false },
      buttonaline: { type: String, required: false },
      buttonUrll: { type: String, default: '' },
      buttonTextColor: { type: String, default: false },
      buttonPadding: { type: String, required: false },
      htmlContent: { type: String, required: false, default: "" },
      socalIconWidth: { type: String, required: false },
      socalIconHeight: { type: String, required: false },
      socalIconPadding: { type: String, required: false },
      socalIconbg: { type: String, required: false },
      socalIcongap: { type: String, required: false },
      socaliconTextAlign: { type: String, required: false },
      htmlFontSize: { type: String, required: false },
      htmlPadding: { type: String, required: false },
      htmlColor: { type: String, required: false },
      splitbg: { type: String, required: false },
      splitbtn: { type: String, required: false },
      splitbtnbg: { type: String, required: false },
      splittext: { type: String, required: false },
      splitColor: { type: String, required: false },
      splitbtnfont: { type: String, required: false },
      splitbtncolor: { type: String, required: false },
      splitbtnurl: { type: String, required: false },
      splitbtnheight: { type: String, required: false },
      splitbtnwidth: { type: String, required: false },
      splitbtnradious: { type: String, required: false },
      splitheight: { type: String, required: false },
      add: { type: String, required: false },
      width: { type: String, required: false },
      spacerHeight: { type: String, required: false },
      spacerbg: { type: String, required: false },
      videoPadding: { type: String, required: false },
      splitPadding: { type: String, required: false },
      splittextSize: { type: String, required: false },
      splitTextAlin: { type: String, required: false },
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
      columnsPerRow: { type: Number, default: 3 },
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
      showbtnsplit: { type: Boolean, default: false },
      showbtnmulti: { type: Boolean, default: false },
      fontsizeMulticolumn: { type: String, required: false },
      Multicolumnbgcolor: { type: String, required: false },
      Multibgcolor: { type: String, required: false },
      Multigap: { type: String, required: false },
      Multitext: { type: String, required: false },
      MultiPadding: { type: String, required: false },
      MulticolumnbtnBorderWidth: { type: String, required: false },
      MulticolumnbtnBorderColor: { type: String, required: false },
      MulticolumnbtnBorderStyle: { type: String, required: false },
      MultibtnBorderWidth: { type: String, required: false },
      MultibtnBorderColor: { type: String, required: false },
      MultiColor: { type: String, required: false },
      MultibtnBorderStyle: { type: String, required: false },
      Multibtnheight: { type: String, required: false },
      Multibtnweight: { type: String, required: false },
      Multibtncolor: { type: String, required: false },
      Multibtnradious: { type: String, required: false },
      Multibtnfont: { type: String, required: false },
      splitBorderWidth: { type: String, required: false },
      splitBorderColor: { type: String, required: false },
      splitBorderStyle: { type: String, required: false },
      richFontsize: { type: String, required: false },
      richbgcolor: { type: String, required: false },
      richtopPadding: { type: String, required: false },
      richleftPadding: { type: String, required: false },
      richtextcolor: { type: String, required: false },
      MulticolumnPadding: { type: String, required: false },
      Multibtnlable: { type: String, required: false },
      Multibtnurl: { type: String, required: false },
      Multiborderradious: { type: String, required: false },
      Multibtnbg: { type: String, required: false },
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

const Templated = mongoose.model('saveTempaltes', ShowTemplats);

const templateSchema = new mongoose.Schema({
  TemplateAll: { type: Object, required: false },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Template = mongoose.model('sendTemplates', templateSchema);

const supportdata = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  theme: { type: String, required: true },
  shop: { type: String, required: true },
  describe: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Support = mongoose.model('supportEmails', supportdata);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahil@hubsyntax.com',
    pass: 'wqnr gaom dgzq asyu',
  },
});

const sendEmails = (formData) => {
  const mailOptions = {
    from: 'sahil@hubsyntax.com',
    to: `${formData.email}`,
    subject: `Support Request: ${formData.name}`,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Category: ${formData.category}
      Theme: ${formData.theme}
      Shop: ${formData.shop}
      Description: ${formData.describe}
    `,
  };

  return transporter.sendMail(mailOptions);
};

app.post('/email-submit', async (req, res) => {
  const { name, email, category, theme, shop, describe } = req.body;

  try {
    const newSupportEmail = new Support({
      name,
      email,
      category,
      theme,
      shop,
      describe,
    });

    await newSupportEmail.save();

    await sendEmails(req.body);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data or sending email:', error);
    res.status(500).json({ message: 'Failed to submit the form' });
  }
});

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

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname1 = dirname(__filename);

const uploadDir = path.join(__dirname1, 'upload');
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

    const renderFieldsHTML = () => {
      return fields
        .map((field) => {
          switch (field.type) {
            case 'heading':
              const editorContent = field.editorContent || '';
              const updateeditorContent = editorContent.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
                if (match.startsWith('data:image/png;base64,')) {
                  const uniqueId = `image-${Date.now()}`;
                  const imagePath = saveBase64Image(match, `${uniqueId}.png`);
                  attachments.push({
                    filename: `${uniqueId}.png`,
                    path: imagePath,
                    cid: uniqueId,
                  });

                  return `cid:${uniqueId}`;
                }
                return match;
              });

              return `
             <div style="background-image:url('${field.headingbgImage || ''}'); 
                background-size: cover; background-position: center;
                border-width: ${field.headingBorderWidth || 1}px;
                border-style: ${field.headingBorderStyle || 'solid'};
                border-color: ${field.headingBorderColor || '#000'};
                width: ${field.bannerImageWidth || 100}%;
                height: ${field.bannerImageHeight || '400px'};
                opacity:${field.headeropacity};
               ">
             <table role="presentation" width="100%" height="100%" style="height: 100%; width: 100%; border-collapse: collapse;">
                <tr>
          <td align="center" valign="middle" style="text-align: ${field.headingTextAlign || 'center'}; vertical-align: middle; padding: ${field.headingPadding || '20px'}px;">
            <div style="width: 100%; text-align: ${field.headingTextAlign || 'center'};">
            <h1 style="font-size: ${field.headingFontSize || 30}px; 
              color: ${field.headingColor || '#000'}; 
              font-weight: ${field.headingFontWeight || 'bold'}; 
              line-height: 48px; 
              letter-spacing: ${field.headingLetterSpacing || 0}px; 
              text-align: ${field.headingTextAlign || 'center'};">
              ${field.headingText || ''}
            </h1>
            <div style="font-size: ${field.headingsubheading}px; color:${field.subheadingColor}; margin: 20px 0;">
              ${updateeditorContent || ''}
            </div>
            
            ${field.headingUrl ? `
              <a href="${field.headingUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                <button style="
                  font-size: ${field.headingbtnFontSize || 16}px;
                  width: ${field.headingbtnwidth || 'auto'}px;
                  height: ${field.headingbtnheight || 'auto'}px;
                  background-color: ${field.headerbtnbg || '#007bff'};
                  border-width: ${field.headingbtnBorderWidth || 1}px;
                  border-style: ${field.headingbtnBorderStyle || 'solid'};
                  border-color: ${field.headingbtnBorderColor || '#007bff'};
                  color: ${field.headerbtncolor || '#fff'};
                  border-radius: ${field.headingbtnradious || 4}px;
                  padding-left: ${field.headingbtnPadding || '10px'}px;
                  padding-right: ${field.headingbtnPadding || '10px'}px;
                  padding-top: ${field.headingbtntopPadding || '10px'}px;
                  padding-bottom: ${field.headingbtntopPadding || '10px'}px;
                  cursor: pointer;
                " class="show-bnt-product">
                  ${field.headerbtn || 'Buy Now'}
                </button>
              </a>
            ` : ''}
          </div>
           </td>
         </tr>
        </table>
              </div>
            `;
            case 'richtext':
              const content = field.content || '';
              const updatedContent = content
                .replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
                  if (match.startsWith('data:image/png;base64,')) {
                    const uniqueId = `image-${Date.now()}`;
                    const imagePath = saveBase64Image(match, `${uniqueId}.png`);
                    attachments.push({
                      filename: `${uniqueId}.png`,
                      path: imagePath,
                      cid: uniqueId,
                    });

                    return `cid:${uniqueId}`;
                  }
                  return match;
                })
                .replace(/<p><br><\/p>/g, '');

              return `
                <div>
                  <div style="text-align: ${field.richTextAlign || 'left'};
                      color:${field.richtextcolor};
                      display: flow-root;
                      font-size: ${field.richFontsize || 16}px;
                      background-color: ${field.richbgcolor || '#007bff'};
                      padding-left: ${field.richleftPadding || '10px'}px;
                      padding-right: ${field.richleftPadding || '10px'}px;
                      padding-top: ${field.richtopPadding || '10px'}px;
                      padding-bottom: ${field.richtopPadding || '10px'}px;">
                    ${updatedContent}
                  </div>
                </div>
              `;

            case 'description':
              return `<p style="font-size: ${field.descritionFontSize || 16}px; color: ${field.descritionColor || '#000'}; font-weight: ${field.descritionFontWeight || 'normal'};">${field.value}</p>`;
            case 'button': {
              return `
                  <div style="background-color: ${field.buttonbgColor || '#008CBA'}; text-align: ${field.buttonaline || 'left'};">
                    <a href="${field.buttonUrll || '#'}" target="_blank" style="text-decoration: none;">
                      <button style="
                        background-color: ${field.buttonColor || '#008CBA'};
                        padding: ${field.buttonPadding || '10px 20px'}px;
                        height: ${field.buttonHeight || '40'}px;
                        width: ${field.buttonWidth || 'auto'}px;
                        font-size: ${field.buttonFontSize || '16'}px;
                        border: ${field.buttonBorderWidth || '0'}px 
                                ${field.buttonBorderStyle || 'none'} 
                                ${field.buttonBorderColor || '#000'};
                        color: ${field.buttonTextColor || '#fff'};
                        cursor: pointer;
                        border-radius: ${field.buttonradious}px;
                      ">
                        ${field.buttonLabel || 'Click Here'}
                      </button>
                    </a>
                  </div>`;
            }
            case 'Multicolumn': {
              const columnsPerRow = field.columnsPerRow || 1;
              let columnCount = 0;
              let result = `
                <div style="color: ${field.MultiColor || '#000'}; padding: ${field.MultiPadding || '1px'}px; text-align: center; background-color: ${field.Multibgcolor || 'transparent'};">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" >
              `;

              field.columnData.forEach((column, index) => {
                if (columnCount % columnsPerRow === 0) {
                  if (columnCount > 0) result += '</tr>';
                  result += '<tr>';
                }

                let processedContent = column.content.replace(
                  /<p><br><\/p>/g,
                  ''
                ).replace(
                  /<img src="data:image\/[a-zA-Z]*;base64,[^"]*"/g,
                  (match) => {
                    const uniqueId = `content-image-${Date.now()}-${index}`;
                    const base64Data = match.match(/data:image\/[a-zA-Z]*;base64,[^"]*/)[0];
                    const imagePath = saveBase64Image(base64Data, `${uniqueId}.png`);
                    attachments.push({
                      filename: `${uniqueId}.png`,
                      path: imagePath,
                      cid: uniqueId,
                    });
                    return `<img src="cid:${uniqueId}"`;
                  }
                );

                result += `
                  <td style="
                    width: calc(${100 / columnsPerRow}% - ${field.Multigap || 0}px); 
                    text-align: ${field.Multitext || 'center'};
                    font-size: ${field.fontsizeMulticolumn || 14}px;
                    border-width: ${field.MulticolumnbtnBorderWidth || 1}px;
                    border-style: ${field.MulticolumnbtnBorderStyle || 'solid'};
                    border-color: ${field.MulticolumnbtnBorderColor || '#000'};
                    padding: ${field.MulticolumnPadding || '10'}px;
                    background-color: ${field.Multicolumnbgcolor || 'transparent'};
                    color: ${field.MultiColor || '#000'};
                     border-radius: ${field.Multiborderradious || 0}px;
                  ">
                    <img src="${column.image}" alt="Column ${index}" style="width: 100%; height: auto;" />
                    ${processedContent}
                    ${column.isVisible
                    ? `
                      <a href="${column.Multibtnurl || '#'}" target="_blank" style="text-decoration: none;">
                        <button style="
                          margin-top: 20px;
                          background-color: ${field.Multibtnbg || '#007BFF'};
                          border-width: ${field.MultibtnBorderWidth || 2}px;
                          border-style: ${field.MultibtnBorderStyle || 'solid'};
                          border-color: ${field.MultibtnBorderColor || '#000'};
                          width: ${field.Multibtnweight || 100}px;
                          height: ${field.Multibtnheight || 40}px;
                          color: ${field.Multibtncolor || '#000'};
                          border-radius: ${field.Multibtnradious || 0}px;
                          font-size: ${field.Multibtnfont || 14}px;
                          cursor: pointer;
                        ">
                          ${column.Multibtnlable || 'Click'}
                        </button>
                      </a>
                    `
                    : ''
                  }
                  </td>
                `;

                columnCount++;
              });

              if (columnCount % columnsPerRow !== 0) result += '</tr>';
              result += '</table></div>';

              return result;
            }
            case 'images': {
              if (field.value.startsWith('data:image/png;base64,')) {
                const uniqueId = `image-${Date.now()}`;
                const imagePath = saveBase64Image(field.value, `${uniqueId}.png`);
                attachments.push({
                  filename: `${uniqueId}.png`,
                  path: imagePath,
                  cid: uniqueId,
                });

                return `
                      <div style="
                        text-align: ${field.imgTextAlign || 'center'};
                        background-color: ${field.imgbg || 'transparent'};
                        border-width: ${field.imgBorderWidth || 1}px;
                        border-style: ${field.imgBorderStyle || 'solid'};
                        border-color: ${field.imgBorderColor || '#000'};
                        padding: ${field.imgPadding || 0}px;
                      ">
                        <img 
                          src="${field.value}" 
                          alt="${field.label || 'Image'}" 
                          style="width: ${field.imgWidth || 100}%;"
                        />
                      </div>`;
              }
              return '';
            }

            case 'split': {
              const value = field.value || '';
              const updatedValue = value.replace(/data:image\/[a-zA-Z]*;base64,[^" ]*/g, () => '');

              return `
      <div style="
        overflow: hidden;
        background-color: ${field.splitbg || '#ffffff'};
        width: ${field.width || '100%'};
        height: ${field.splitheight || 'auto'}px;
        padding: ${field.splitPadding || 0}px;
        float: inline-start;
        color: ${field.splitColor};
        font-size: ${field.splittextSize || 14}px;
      ">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="
          width: 100%;
          height: 100%;
          text-align: ${field.splitTextAlin || 'left'};
          border-spacing: 0;
          color: ${field.splitColor};
        ">
          <tr>
            <td style="
              vertical-align: ${field.splittext === 'end' ? 'bottom' : field.splittext === 'left' || !field.splittext ? 'top' : field.splittext};
              text-align: ${field.splitTextAlin || 'left'};
            ">
              ${field.add === 'image' ?
                  `<img src="${field.value}" alt="Uploaded Preview" style="width: 100%; height: auto; display: block;" />` :
                  `<div>${updatedValue}</div>`
                }
              ${field.showbtnsplit ?
                  `<a href="${field.splitbtnurl || '#'}" target="_blank" style="text-decoration: none;">
                  <button style="
                    margin-top: 20px;
                    background-color: ${field.splitbtnbg || '#007BFF'};
                    font-size: ${field.splitbtnfont || 14}px;
                    color: ${field.splitbtncolor || '#FFF'};
                    height: ${field.splitbtnheight || 40}px;
                    width: ${field.splitbtnwidth || 100}px;
                    border-radius: ${field.splitbtnradious || 0}px;
                    border-width: ${field.splitBorderWidth || 2}px;
                    border-style: ${field.splitBorderStyle || 'solid'};
                    border-color: ${field.splitBorderColor || '#000'};
                    cursor: pointer;
                  ">
                    ${field.splitbtn || 'Click Me'}
                  </button>
                </a>` : ''
                }
            </td>
          </tr>
        </table>
      </div>
    `;
            }
            case 'product':
              return `
                <div>
                  ${field.products && field.products.length > 0 ? `
                    <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-spacing: 0;">
                      <tr>
                        ${field.products.map((product, index) => `
                          <td style="
                            width: ${100 / field.productsPerRow}%;
                            padding: ${field.productPadding}px;
                            text-align: center;
                            background-color: ${field.productbg};
                            border-width: ${field.productBorderWidth}px;
                            border-style: ${field.productBorderStyle};
                            border-color: ${field.productBorderColor};
                            font-size: ${field.productFontSize}px;
                            color: ${field.productTextColor};
                          ">
                            ${product.image ? `
                              <div class="images-gallery">
                                <img
                                  src="${product.image}"
                                  alt="${product.title || 'Product Image'}"
                                  style="width: 150px; height: 150px; object-fit: cover; margin-bottom: 10px;"
                                />
                              </div>
                            ` : '<p>No image available</p>'}
            
                            <div>
                              <h4 style=" margin-top: 10px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                                ${product.title}
                              </h4>
            
                              ${field.price && product.price ? `
                                <p style=" margin-top:10px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                                  Price: $${product.price}
                                </p>
                              ` : ''}
            
                              ${field.showbtnn ? `
                                <a href="${field.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                                  <button
                                    style="
                                      margin-top: 10px;
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
                                    class="show-btn-product"
                                  >
                                    ${field.productLabel || 'Buy Now'}
                                  </button>
                                </a>
                              ` : ''}
                            </div>
                          </td>
                        `).join('')}
                      </tr>
                    </table>
                  ` : '<p>No products available</p>'}
                </div>
              `;

            case 'divider':
              return ` <div style = "background-color: ${field.dividerbgColor || 'transparent'}; width:100%;"> <hr style="border-color: ${field.dividerColor || '#000'}; width: ${field.dividerWidth || '100%'}%; height: ${field.dividerHeight || '1px'}; margin: auto " /> </div>`;
            case 'html convert':
              return `<div style="color: ${field.htmlColor || '#000'}; font-size: ${field.htmlFontSize || '16px'};">${field.value}</div>`;
            case 'spacer':
              return `
                      <div style="height: ${field.spacerHeight || '20px'}px; background-color: ${field.spacerbg || '#EDEDED'}; padding: ${field.splitPadding || '0'}px 0;">
                      </div>
                    `;
            case 'socalicon':
              if (field.value) {
                const icons = [];

                if (field.value.facebook && !field.value.facebook.isHidden && field.value.facebook.url) {
                  icons.push(`
                    <a href="${field.value.facebook.url}" target="_blank" rel="noopener noreferrer">
                      <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/facebook.png?v=1732510414" 
                           alt="Facebook" 
                           style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                    </a>
                  `);
                }

                if (field.value.twitter && !field.value.twitter.isHidden && field.value.twitter.url) {
                  icons.push(`
                    <a href="${field.value.twitter.url}" target="_blank" rel="noopener noreferrer">
                      <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/twitter.png?v=1732510414" 
                           alt="Twitter" 
                           style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                    </a>
                  `);
                }

                if (field.value.instagram && !field.value.instagram.isHidden && field.value.instagram.url) {
                  icons.push(`
                    <a href="${field.value.instagram.url}" target="_blank" rel="noopener noreferrer">
                      <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/instagram.png?v=1732510414" 
                           alt="Instagram" 
                           style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                    </a>
                  `);
                }

                if (field.customIcons && Array.isArray(field.customIcons)) {
                  field.customIcons
                    .filter(icon => !icon.isHidden && icon.url)
                    .forEach((icon, index) => {
                      const uniqueId = `custom-icon-${Date.now()}-${index}`;
                
                      if (icon.src) {
                        icons.push(`
                          <a href="${icon.url}" 
                             style="padding-right: ${field.socalIcongap}px;" 
                             target="_blank" 
                             rel="noopener noreferrer">
                            <img src="${icon.src}" 
                                 alt="icon-${index}" 
                                 style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                          </a>
                        `);
                      }
                    });
                }
                return `
                  <div style="
                    text-align: ${field.socaliconTextAlign || 'left'}; 
                    background-color: ${field.socalIconbg || 'transparent'}; 
                    padding: ${field.socalIconPadding || 0}px;
                  ">
                    ${icons.join('')}
                  </div>
                `;
              }
          
            default:
              return '';
          }
        })
        .join('');
    };

    const fieldsHTML = renderFieldsHTML();

    // const backgroundImage = TemplateAll.styles.backgroundImage || '';
    // const updatedimageUrl = backgroundImage.replace(/data:image\/[a-zA-Z]*;base64,[^"]*/g, (match) => {
    //   if (match.startsWith('data:image/png;base64,')) {
    //     const uniqueId = `image-${Date.now()}`;
    //     const imagePath = saveBase64Image(match, `${uniqueId}.png`);
    //     attachments.push({
    //       filename: `${uniqueId}.png`,
    //       path: imagePath,
    //       cid: uniqueId,
    //     });

    //     return `cid:${uniqueId}`;
    //   }
    //   return match;
    // });
    const userHtmlContent = `

    <html>
     <head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      h1{
          font-size: 40px !important;
          line-height: 50px;
      }
          h2 {
         font-size: 30px !important;
         line-height: 40px;
       }
      h3 {
         font-size: 20px !important;
      }
        
     a {
    text-decoration: none;
     }
    </style>
  </head>
      <body style="background-color: ${TemplateAll.styles.backgroundColor || 'white'};
       width: ${TemplateAll.styles.width || '100%'}; 
       border-radius: ${TemplateAll.styles.borderRadious || '0'}px;
        text-align: ${TemplateAll.styles.textAlign || 'left'};
        padding: ${TemplateAll.styles.templatePadding || '0'}px;
        font-family: ${TemplateAll.styles.fontFamily || 'Arial'};
        margin:auto;
        background-image: url('${TemplateAll.styles.backgroundImage}');
        background-repeat: no-repeat;
        background-size: cover;
         ">
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

app.get('/get/base64', async (req, res) => {
  try {

    const data = await Email.find({}).select('templateId shop TemplateImage form_ids title createdAt');
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
    const form = await Email.findOne({ form_ids: formId, });

    if (!form) {
      return res.status(404).json({ message: 'Form and template combination not found' });
    }

    form.form_ids = form.form_ids.filter((id) => id !== formId);
    await form.save();

    res.status(200).json({ message: 'Template successfully unlinked from the form', data: form });
  } catch (error) {
    console.error('Error unlinking template:', error);
    res.status(500).json({ message: 'Error unlinking template', error: error.message });
  }
});

const saveBase64Image2 = (base64Data, fileName) => {
  const uploadDir = path.join(__dirname, 'uploads', 'images');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
  const apiUrl = process.env.PUBLIC_REACT_APP_API_URL;
  return `${apiUrl}/uploads/images/${fileName}`;
};


app.post('/send/api', upload.single('file'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    let { templateId, shop, TemplateImage, title, fields, createdAt, form_ids, styles } = req.body; 

    const formIds = Array.isArray(form_ids) ? form_ids : [form_ids];
    const fieldsArray = Array.isArray(fields) ? fields : [fields];

    if (TemplateImage && TemplateImage.startsWith('data:image')) {
      const base64Data = TemplateImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `templateImage_${Date.now()}.png`;
      const savedFilePath = saveBase64Image2(base64Data, fileName);
      TemplateImage = savedFilePath; 
    }
    
    if (styles && styles.backgroundImage && styles.backgroundImage.startsWith('data:image')) {
      const base64Data = styles.backgroundImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `backgroundImage_${Date.now()}.png`;
      styles.backgroundImage = saveBase64Image2(base64Data, fileName);
    }

    fieldsArray.forEach(field => {
      let headingbgImage = field.headingbgImage;

      if (headingbgImage && headingbgImage.startsWith('data:image')) {
        const base64Data = headingbgImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
        const fileName = `headingbgImage_${Date.now()}.png`;
        field.headingbgImage = saveBase64Image2(base64Data, fileName);
      }

      if (field.customIcons && Array.isArray(field.customIcons)) {
        field.customIcons.forEach(icon => {
          if (icon.src && typeof icon.src === 'string' && icon.src.startsWith('data:image')) {
            const base64Data = icon.src.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const uniqueSuffix = Math.random().toString(36).substring(2, 15);
            const fileName = `customIcon_${uniqueSuffix}.png`;
            icon.src = saveBase64Image2(base64Data, fileName);
          }
        });
      }

      if (field.columnData && Array.isArray(field.columnData)) {
        field.columnData.forEach(column => {
          if (column.image && typeof column.image === 'string' && column.image.startsWith('data:image')) {
            const base64Data = column.image.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const uniqueSuffix = Math.random().toString(36).substring(2, 15);
            const fileName = `columnImage_${uniqueSuffix}.png`;
            column.image = saveBase64Image2(base64Data, fileName);
          }
        });
      }
    });

    fieldsArray.forEach(field => {
      if (field.value && typeof field.value === 'string' && field.value.startsWith('data:image')) {
        const base64Data = field.value.replace(/^data:image\/(?:png|jpeg);base64,/, '');
        const fileName = `field_image_${Date.now()}.png`;
        field.value = saveBase64Image2(base64Data, fileName);
      }
    });

    const formData = new Email({
      templateId,
      shop,
      TemplateImage,
      title,
      form_ids: formIds,
      fields: fieldsArray,
      createdAt,
      styles
    });

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
    let updatedFormData = req.body;

    if (updatedFormData.TemplateImage && updatedFormData.TemplateImage.startsWith('data:image')) {
      const base64Data = updatedFormData.TemplateImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `templateImage_${Date.now()}.png`;
      updatedFormData.TemplateImage = saveBase64Image2(base64Data, fileName); 
    }

    if (updatedFormData.styles && updatedFormData.styles.backgroundImage && updatedFormData.styles.backgroundImage.startsWith('data:image')) {
      const base64Data = updatedFormData.styles.backgroundImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `backgroundImage_${Date.now()}.png`;
      updatedFormData.styles.backgroundImage = saveBase64Image2(base64Data, fileName);
    }
    updatedFormData.fields.forEach(field => {
      let headingbgImage = field.headingbgImage;

      if (headingbgImage && headingbgImage.startsWith('data:image')) {
        const base64Data = headingbgImage.replace(/^data:image\/(?:png|jpeg);base64,/, '');
        const fileName = `headingbgImage_${Date.now()}.png`;
        field.headingbgImage = saveBase64Image2(base64Data, fileName);
      }

      if (field.columnData && Array.isArray(field.columnData)) {
        field.columnData.forEach((column, index) => {
          if (column && column.image && column.image.startsWith('data:image')) {
            const base64Data = column.image.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const uniqueSuffix = Math.random().toString(36).substring(2, 15);
            const fileName = `columnImage_${uniqueSuffix}.png`;
            column.image = saveBase64Image2(base64Data, fileName);
          }
        });
      }
    });

    updatedFormData.fields.forEach(field => {

      if (field.value && typeof field.value === 'string' && field.value.startsWith('data:image')) {
        const base64Data = field.value.replace(/^data:image\/(?:png|jpeg);base64,/, '');
        const fileName = `field_image_${Date.now()}.png`;
        field.value = saveBase64Image2(base64Data, fileName);
      }

      if (field.customIcons && Array.isArray(field.customIcons)) {
        field.customIcons.forEach(icon => {
          if (icon.src && typeof icon.src === 'string' && icon.src.startsWith('data:image')) {
            const base64Data = icon.src.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const uniqueSuffix = Math.random().toString(36).substring(2, 15);
            const fileName = `customIcon_${uniqueSuffix}.png`;
            icon.src = saveBase64Image2(base64Data, fileName);
          }
        });
      }
    });

    const updatedForm = await Email.findByIdAndUpdate(id, updatedFormData, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({
      message: 'Form updated successfully',
      data: updatedForm,
    });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});

app.get('/template/data', async (req, res) => {
  try {
    const data = await Templated.find({});
    res.status(200).json({ message: 'Form data retrieved', data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

app.get('/template/image', async (req, res) => {
  try {
    const data = await Templated.find({}).select('templateId title  createdAt TemplateImage');
    res.status(200).json({ message: 'Form data retrieved', data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

app.post('/template/api', upload.single('image'), async (req, res) => {
  console.log('respose-data', req.body);
  try {
    const { templateId, TemplateImage, title, fields, createdAt, styles } = req.body;
    const formData = new Templated({
      templateId,
      title,
      TemplateImage,
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
    const { title, id, fields, timestamp, currentUrl, shop } = formsData;
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
        currentUrl,
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

app.post('/form-data', upload.single('file'), async (req, res) => {
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

    const { formId, shop, fields, createdAt, styles, submissionOption, toggleStatus, thankYouTimer, editorValue, url, status } = req.body;
  
    const newFormEntry = new FormModel({
      formId,
      shop,
      title: newTitle,
      fields,
      createdAt,
      styles,
      toggleStatus,
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