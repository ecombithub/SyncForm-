import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Parser } from 'json2csv';

dotenv.config();

const app = express();
const port = 4001;
import fs from 'fs';
import path from 'path';
app.use(cors());

const mongoUri = 'mongodb+srv://info_db_user:wAC3qzQimoxujdTN@syncform-app.a11a55w.mongodb.net/SyncForm?retryWrites=true&w=majority&appName=SyncForm-app';

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

app.post("/api/CostomerRequest", async (req, res) => {
  console.log("✅ Received Webhook Data in Backend:", JSON.stringify(req.body, null, 2));
  console.log("🔍 Incoming Headers:", req.headers);

  const topic = req.headers["x-shopify-topic"]?.toLowerCase();
  console.log("🔔 Extracted Webhook Topic:", topic);

  const allowedTopics = ["customers/redact", "customers/data_request", "shop/redact"];
  if (!allowedTopics.includes(topic)) {
    console.log("❌ Unrecognized Webhook Topic:", topic);
    return res.status(400).json({ error: "Invalid Webhook Topic" });
  }

  const { shop_id, shop_domain, customer } = req.body;

  if (!shop_id || !shop_domain || (topic !== "shop/redact" && !customer?.email)) {
    console.log("❌ Invalid Payload Structure:", req.body);
    return res.status(400).json({ error: "Invalid Data" });
  }

  try {
    const existingShop = await ShopDetails.findOne({ shop: shop_domain });

    if (!existingShop) {
      console.log("❌ No matching shop found for the domain:", shop_domain);
      return res.status(404).json({ error: "Shop not found" });
    }

    console.log("✅ Matching Shop Found:", existingShop);
    console.log("✅ Matching Shop Found: Email -", existingShop.storeEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "syncform@hubsyntax.com",
        pass: "jaaf dnhy rndg rpic",
      },
    });

    const mailOptions = {
      from: "syncform@hubsyntax.com",
      to: existingShop.storeEmail,
      subject: `Shopify Webhook Received: ${topic}`,
      text: `
           Webhook Topic: ${topic}
           Shop ID: ${shop_id}
           Shop Domain: ${shop_domain}
           Customer Email: ${customer?.email || "N/A"}
           Customer Name: ${customer?.name || "Unknown"}
          `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email Sent Successfully!");

    return res.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/api/store", async (req, res) => {
  console.log("Received Body:", req.body);

  if (!req.body || !req.body.myshopify_domain) {
    return res.status(400).json({ success: false, message: "Invalid request body" });
  }

  try {

    let store = await ShopDetails.findOne({ shop: req.body.myshopify_domain });

    if (store) {
      console.log("Store found in DB:", req.body.myshopify_domain);

      if (!req.body.uninstalled) {
        req.body.uninstalled = true;
      }
      const HtmlText = `
        <html>
         <head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
      <style>
        body {
          font-family: 'Montserrat', sans-serif;
        }
      </style>
      </head>
     <body>
      <div style="background-color: #f3f3f3; padding: 50px; text-align: center;">
        <div style="background-color: white; max-width: 50%; margin: 0 auto; padding: 50px;font-family: 'Montserrat', sans-serif;">
          <div><img src = "https://cdn.shopify.com/s/files/1/0679/9022/5150/files/Logo-SyncForm_1.svg?v=1741247523"style = "width:170px" ></div> 
          <p style="font-weight:600; font-size:18px">As you uninstall the app, the running subscriptions of your store will be paused and will be deleted after 48 hours. You can install the app within 48 hours if you want to continue the subscriptions.</p>
          <p> ${req.body.myshopify_domain}</p>
          <p>Thank you.</p>
        </div>
      </div>
   </body>
   </html>
    `;
      if (req.body.uninstalled) {
        try {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'syncform@hubsyntax.com',
              pass: 'jaaf dnhy rndg rpic'
            }
          });
          await transporter.sendMail({
            from: '"Syncform" <syncform@hubsyntax.com>',
            to: req.body.email,
            subject: 'Shopify App Uninstall Notification',
            html: HtmlText
          });

          console.log('Uninstall email sent successfully');

          try {
            const shop = req.body.myshopify_domain;
             const chargeId = `free-plan-${shop}`;
            await Payment.updateMany(
              { shop: shop, status: "active" },
              { $set: { status: "disactive" } }
            );

            const freePlan = await Payment.findOneAndUpdate(
              { shop: shop, chargeId: chargeId },
              {
                $set: {
                  name: "lifeTime",
                  plan: "free",
                  price: 0,
                  status: "active",
                  billingOn: new Date(),
                  chargeId: chargeId 
                }
              },
              { upsert: true, new: true }
            );
            console.log("Payment updated for uninstall:", freePlan);
          } catch (paymentError) {
            console.error("Error updating payment during uninstall:", paymentError);
          }

          const latestStore = await ShopDetails.findOne({ shop: req.body.myshopify_domain });

          if (!latestStore) {
            console.error('Store not found during initial access token check.');
            return;
          }

          if (latestStore.accessToken !== store.accessToken) {
            console.log('Access token changed before timeout, skipping form status update.');
            return;
          }

          setTimeout(async () => {
            try {
              const delayedStore = await ShopDetails.findOne({ shop: req.body.myshopify_domain });

              if (!delayedStore) {
                console.error('Store not found after 2 minutes.');
                return;
              }
              if (delayedStore.accessToken !== store.accessToken) {
                console.log('Access token changed after 2 minutes, skipping form status update.');
                return;
              }

              const updateResult = await FormModel.updateMany(
                { shop: req.body.myshopify_domain },
                { $set: { status: 'app uninstall' } }
              );

              const templateUpdateResult = await Email.updateMany(
                { shop: req.body.myshopify_domain },
                { $set: { status: 'app uninstall' } }
              );
              console.log(`Email templates updated for shop ${req.body.myshopify_domain}:`, templateUpdateResult.modifiedCount);


              console.log(`Forms updated for shop ${req.body.myshopify_domain}:`, updateResult.modifiedCount);
            } catch (error) {
              console.error('Error during delayed form status update:', error);
            }
          }, 48 * 60 * 60 * 1000);

        } catch (error) {
          console.error('Error sending email:', error);
        }
      }

      return res.json({ success: true, message: "Store found", store });
    }

    store = new ShopDetails({
      shop: req.body.myshopify_domain,
      email: req.body.email,
    });

    await store.save();
    console.log("New store created:", store);
    const HtmlText = `
     <html>
     <head>
     <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
    <style>
     body {
      font-family: 'Montserrat', sans-serif;
    }
    </style>
     </head>
    <body>
     <div style="background-color: #f3f3f3; padding: 50px; text-align: center;">
    <div style="background-color: white; max-width: 50%; margin: 0 auto; padding: 50px;font-family: 'Montserrat', sans-serif;">
      <div><img src = "https://cdn.shopify.com/s/files/1/0679/9022/5150/files/Logo-SyncForm_1.svg?v=1741247523"style = "width:170px" ></div> 
      <p style="font-weight:600; font-size:18px">As you uninstall the app, the running subscriptions of your store will be paused and will be deleted after 48 hours. You can install the app within 48 hours if you want to continue the subscriptions.</p>
      <p> ${req.body.shop}</p>
      <p>Thank you.</p>
    </div>
  </div>
     </body>
</html>
`;
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syncform@hubsyntax.com',
          pass: 'jaaf dnhy rndg rpic'
        }
      });

      await transporter.sendMail({
        from: '"Syncform" <syncform@hubsyntax.com>',
        to: req.body.email,
        subject: 'Shopify App Uninstall Notification',
        html: HtmlText
      });

      console.log('New store creation email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return res.json({ success: true, message: "Store created successfully", store });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ success: false, message: "Error processing store data", error });
  }
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
      enum: ['text', 'name', 'button', 'divider', 'heading', 'radio', 'file', 'multi-file', 'number', 'date', 'datetime', 'images', 'multi-image', 'multi-file', 'link', 'checkbox', 'location', 'toggle', 'select', 'textarea', 'password', 'email', 'phone', 'time', 'description', 'url', 'slider']
    },
    label: { type: String, required: true, default: function () { return this.name || 'Unnamed Field'; } },
    name: String,
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    emailRequid: { type: Boolean, default: false },
    onValue: { type: String, default: 'On' },
    offValue: { type: String, default: 'Off' },
    width: { type: String, default: '100%' },
    text: { type: String, default: '' },
    description: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], required: false },
    fontSize: { type: String, default: '16px' },
    padding: { type: String, default: '10px' },
    color: { type: String, default: '#45a7f6' },
    dividerColor: { type: String, default: '#000' },
    btnwidth: { type: String, default: 'auto' },
    buttonHeight: { type: String, default: 'auto' },
    backgroundColor: { type: String, default: '#45a7f6' },
    inputPadding: { type: String, default: '10px' },
    buttontext: { type: String, required: false },
    buttonaline: { type: String, required: false },
    inputBorderRadious: { type: String, default: '4px' },
    buttonBorderColor: { type: String, required: false },
    buttonLable: { type: String, required: false },
    buttonBorderWidth: { type: String, required: false },
    buttonBorderStyle: { type: String, required: false },
    textSize: { type: String, required: false },
    dividerAline: { type: String, required: false },
    dividerWidth: { type: String, required: false },
    textAline: { type: String, required: false },
    textColor: { type: String, required: false },
    textlineheight: { type: String, required: false },
    linktext: { type: String, required: false },
    linkUrl: { type: String, required: false },
    linkTarget: { type: String, required: false },
    linkfontsize: { type: String, required: false },
    customClass: { type: String, required: false },
    linkaline: { type: String, required: false },
    min: { type: String, required: false },
    max: { type: String, required: false },
    step: { type: String, required: false },
    headingLineheight: { type: String, default: '' },
    textPadding: { type: String, required: false },
    btnradious: { type: String, required: false },
    passwordCharacter: { type: String, required: false },
    colorHeading: { type: String, default: '' },
    passwordStatus: { type: String, required: false },
    fileOptions: { type: Map, of: String, required: false, },
    ImagePreview: { type: String, enum: ['on', 'off'] },
    multifilePreview: { type: String, enum: ['on', 'off'] },
    signlePreview: { type: String, enum: ['on', 'off'] },
    textHeading: { type: String, default: '' },
    multiIamgePreview: { type: String, enum: ['on', 'off'] },
    multiOptions: { type: Map, of: String, required: false, },
    imageOptions: { type: Map, of: String, required: false, },
    multiimagesOptions: { type: Map, of: String, required: false, },
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
    backgroundColor: { type: String, required: false },
    backgroundImage: { type: String, default: '' },
    backgroundRepeat: { type: String, default: 'no-repeat' },
    boxShadow: { type: String, default: '' },
    width: { type: String, default: '100%' },
    padding: { type: String, default: '0' },
    marginForm: { type: String, default: '0' },
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
    subject: { type: String, default: '' },
    maxDescriptionHeight: { type: Number, default: 0 },
    shopName: { type: String, default: '' },
    shopEmail: { type: String, default: '' },
    onwerShop: { type: String, default: '' },
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

const FormModel = mongoose.model('forms', formCreateSchema);

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, required: true },
  shop: { type: String, required: false, },
  currentUrl: { type: String, required: false, },
  shopowner: { type: String, required: false, },
  shopEmail: { type: String, required: false, },
  onwerShop: { type: String, required: false, },
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

const Form = mongoose.model('customers', formSchema);

const paymentDataSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  billingOn: { type: Date, required: true },
  plan: { type: String, required: true },
  chargeId: { type: String, required: true, unique: true },
});

const Payment = mongoose.model('plans', paymentDataSchema);

const shopDetailsSchema = new mongoose.Schema({
  shop: { type: String, required: false, unique: true },
  accessToken: { type: String, required: false },
  brandLogoStatus: { type: String, required: false },
  storeEmail: { type: String, required: false },
  storeName: { type: String, required: false },
  notificationsEmail: { type: String, required: false },
  notificationsPassword: { type: String, required: false },
  numberValue: { type: Number, required: true },
  status: {
    type: String, enum: ['active', 'disactive'], required: true
  },
});

const ShopDetails = mongoose.model('Shops', shopDetailsSchema);

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
  status: { type: String, default: 'live', enum: ['live', 'draft', 'archived'], },
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
      headingfamily: { type: String, required: false },
      headingbtnweight: { type: String, required: false },
      headingbtnradious: { type: String, required: false },
      headingbtnFontSize: { type: String, required: false },
      headingbtnwidth: { type: String, required: false },
      headingbtnheight: { type: String, required: false },
      headingsubheading: { type: String, required: false },
      headerbtn: { type: String, required: false },
      columnCount: { type: Number, required: false },
      columnData: { type: [columnSchema], required: false },
      children: { type: Object, requid: false },
      value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
      bannerImageWidth: { type: String, required: false },
      bannerImageHeight: { type: String, required: false },
      bannerImageTextAlign: { type: String, required: false },
      editorContent: { type: String, required: false },
      headingUrl: { type: String, required: false },
      richTextAlign: { type: String, required: false },
      buttonweight: { type: String, required: false },
      imageUrl: { type: String, required: false },
      headingFontSize: { type: String, required: false },
      headingLevel: { type: String, required: false },
      headeropacity: { type: String, required: false },
      headingFontWeight: { type: String, required: false },
      headingColor: { type: String, required: false },
      headingbg: { type: String, required: false },
      headingmargin: { type: String, required: false },
      subheadingColor: { type: String, required: false },
      subheadingfamily: { type: String, required: false },
      subheadingline: { type: String, required: false },
      subheadingleter: { type: String, required: false },
      headingBorderColor: { type: String, required: false },
      headingBorderWidth: { type: String, required: false },
      headingbtnBorderWidth: { type: String, required: false },
      headingbtnBorderStyle: { type: String, required: false },
      headingbtnBorderColor: { type: String, required: false },
      headingBorderStyle: { type: String, required: false },
      headingLetterSpacing: { type: String, required: false },
      headingPadding: { type: String, required: false },
      headingline: { type: String, required: false },
      headingTextAlign: { type: String, required: false },
      headingText: { type: String, required: false },
      headingbtnfamily: { type: String, required: false },
      splitbtnfamily: { type: String, required: false },
      productbtnfamily: { type: String, required: false },
      Multibtnfamily: { type: String, required: false },
      buttonfamily: { type: String, required: false },
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
      dividerAline: { type: String, required: false },
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
      htmlfamily: { type: String, required: false },
      htmllineheight: { type: String, required: false },
      htmlaline: { type: String, required: false },
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
      splitletter: { type: String, required: false },
      splitlineheight: { type: String, required: false },
      splitfamily: { type: String, required: false },
      splitbtnradious: { type: String, required: false },
      add: { type: String, required: false },
      width: { type: String, required: false },
      spacerHeight: { type: String, required: false },
      spacerbg: { type: String, required: false },
      videoPadding: { type: String, required: false },
      splittextSize: { type: String, required: false },
      splitPadding: { type: String, required: false },
      splitTextAlin: { type: String, required: false },
      divHeight: { type: Object, required: false },
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
      showPrice: { type: Boolean, default: false },
      productPadding: { type: String, required: false },
      productbg: { type: String, required: false },
      productBorderWidth: { type: String, required: false },
      productBorderStyle: { type: String, required: false },
      productBorderColor: { type: String, required: false },
      productFontSize: { type: String, required: false },
      productTextColor: { type: String, required: false },
      productfamily: { type: String, required: false },
      productline: { type: String, required: false },
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
      imageWidth: { type: String, required: false },
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
      MultiWeight: { type: String, required: false },
      splitBorderWidth: { type: String, required: false },
      splitBorderColor: { type: String, required: false },
      splitbtnWeight: { type: String, required: false },
      splitBorderStyle: { type: String, required: false },
      richFontsize: { type: String, required: false },
      richlineheight: { type: String, required: false },
      richspace: { type: String, required: false },
      richFontfamily: { type: String, required: false },
      richtopPadding: { type: String, required: false },
      richleftPadding: { type: String, required: false },
      richline: { type: String, required: false },
      richbgcolor: { type: String, required: false },
      richtextcolor: { type: String, required: false },
      MulticolumnPadding: { type: String, required: false },
      Multibtnlable: { type: String, required: false },
      Multifamily: { type: String, required: false },
      Multiheight: { type: String, required: false },
      Multiletter: { type: String, required: false },
      Multiborderradious: { type: String, required: false },
      Multiimgwidth: { type: String, required: false },
      costumFont: { type: String, required: false },
      costumColor: { type: String, required: false },
      costumBg: { type: String, required: false },
      costumAline: { type: String, required: false },
      costumline: { type: String, required: false },
      costumPadding: { type: String, required: false },
      costomfamily: { type: String, required: false },
      costumfontweight: { type: String, required: false },
      costumLetter: { type: String, required: false },
      costumText: { type: String, required: false },
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
    templatePadding: { type: String, required: false },
    viewMode: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' },
  }
});
const Email = mongoose.model('email Templates', emailTemplateSchema);

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
      headingfamily: { type: String, required: false },
      headingbtnweight: { type: String, required: false },
      headingbtnradious: { type: String, required: false },
      headingbtnFontSize: { type: String, required: false },
      headingbtnwidth: { type: String, required: false },
      headingbtnheight: { type: String, required: false },
      headingsubheading: { type: String, required: false },
      headerbtn: { type: String, required: false },
      columnCount: { type: Number, required: false },
      columnData: { type: [columnSchema], required: false },
      children: { type: Object, requid: false },
      value: { type: Object, required: false, default: { typeValue: 'No Value Provided', customIcons: [] } },
      bannerImageWidth: { type: String, required: false },
      bannerImageHeight: { type: String, required: false },
      bannerImageTextAlign: { type: String, required: false },
      editorContent: { type: String, required: false },
      headingUrl: { type: String, required: false },
      richTextAlign: { type: String, required: false },
      buttonweight: { type: String, required: false },
      imageUrl: { type: String, required: false },
      headingFontSize: { type: String, required: false },
      headingLevel: { type: String, required: false },
      headeropacity: { type: String, required: false },
      headingFontWeight: { type: String, required: false },
      headingColor: { type: String, required: false },
      headingbg: { type: String, required: false },
      headingmargin: { type: String, required: false },
      subheadingColor: { type: String, required: false },
      subheadingfamily: { type: String, required: false },
      subheadingline: { type: String, required: false },
      subheadingleter: { type: String, required: false },
      headingBorderColor: { type: String, required: false },
      headingBorderWidth: { type: String, required: false },
      headingbtnBorderWidth: { type: String, required: false },
      headingbtnBorderStyle: { type: String, required: false },
      headingbtnBorderColor: { type: String, required: false },
      headingBorderStyle: { type: String, required: false },
      headingLetterSpacing: { type: String, required: false },
      headingPadding: { type: String, required: false },
      headingline: { type: String, required: false },
      headingTextAlign: { type: String, required: false },
      headingText: { type: String, required: false },
      headingbtnfamily: { type: String, required: false },
      splitbtnfamily: { type: String, required: false },
      productbtnfamily: { type: String, required: false },
      Multibtnfamily: { type: String, required: false },
      buttonfamily: { type: String, required: false },
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
      dividerAline: { type: String, required: false },
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
      htmlfamily: { type: String, required: false },
      htmllineheight: { type: String, required: false },
      htmlaline: { type: String, required: false },
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
      splitletter: { type: String, required: false },
      splitlineheight: { type: String, required: false },
      splitfamily: { type: String, required: false },
      splitbtnradious: { type: String, required: false },
      add: { type: String, required: false },
      width: { type: String, required: false },
      spacerHeight: { type: String, required: false },
      spacerbg: { type: String, required: false },
      videoPadding: { type: String, required: false },
      splittextSize: { type: String, required: false },
      splitPadding: { type: String, required: false },
      splitTextAlin: { type: String, required: false },
      divHeight: { type: Object, required: false },
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
      showPrice: { type: Boolean, default: false },
      productPadding: { type: String, required: false },
      productbg: { type: String, required: false },
      productBorderWidth: { type: String, required: false },
      productBorderStyle: { type: String, required: false },
      productBorderColor: { type: String, required: false },
      productFontSize: { type: String, required: false },
      productTextColor: { type: String, required: false },
      productfamily: { type: String, required: false },
      productline: { type: String, required: false },
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
      imageWidth: { type: String, required: false },
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
      MultiWeight: { type: String, required: false },
      splitBorderWidth: { type: String, required: false },
      splitBorderColor: { type: String, required: false },
      splitbtnWeight: { type: String, required: false },
      splitBorderStyle: { type: String, required: false },
      richFontsize: { type: String, required: false },
      richlineheight: { type: String, required: false },
      richspace: { type: String, required: false },
      richFontfamily: { type: String, required: false },
      richtopPadding: { type: String, required: false },
      richleftPadding: { type: String, required: false },
      richline: { type: String, required: false },
      richbgcolor: { type: String, required: false },
      richtextcolor: { type: String, required: false },
      MulticolumnPadding: { type: String, required: false },
      Multibtnlable: { type: String, required: false },
      Multifamily: { type: String, required: false },
      Multiheight: { type: String, required: false },
      Multiletter: { type: String, required: false },
      Multiborderradious: { type: String, required: false },
      Multiimgwidth: { type: String, required: false },
      costumFont: { type: String, required: false },
      costumColor: { type: String, required: false },
      costumBg: { type: String, required: false },
      costumAline: { type: String, required: false },
      costumline: { type: String, required: false },
      costumPadding: { type: String, required: false },
      costomfamily: { type: String, required: false },
      costumfontweight: { type: String, required: false },
      costumLetter: { type: String, required: false },
      costumText: { type: String, required: false },
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
    templatePadding: { type: String, required: false },
    viewMode: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' },
  }
});

const Templated = mongoose.model('save Templates', ShowTemplats);

const supportdata = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  theme: { type: String, required: true },
  shop: { type: String, required: true },
  describe: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Support = mongoose.model('support tickets', supportdata);

const transportered = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'syncform@hubsyntax.com',
    pass: 'jaaf dnhy rndg rpic',
  },
});

const sendEmails = async (formData) => {
  try {

    const adminMailOptions = {
      from: 'syncform@hubsyntax.com',
      to: ['syncform@hubsyntax.com', 'info@hubsyntax.com'],
      subject: `Support Request: ${formData.name}`,
      text: `Support Request Details:

      Name: ${formData.name}
      Email: ${formData.email}
      Category: ${formData.category}
      Theme: ${formData.theme}
      Shop: ${formData.shop}
      Description: ${formData.describe}
      `,
    };

    const userEmailTemplate = `
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
      <style>
        body {
          font-family: 'Montserrat', sans-serif;
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f3f3f3; padding: 50px; text-align: center;">
        <div style="background-color: white; max-width: 50%; margin: 0 auto; padding: 50px; font-family: 'Montserrat', sans-serif;">
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0679/9022/5150/files/Logo-SyncForm_1.svg?v=1741247523" style="width:170px">
          </div> 
          <p style="font-weight:600; font-size:18px">
            Hello ${formData.name},  
            <br><br>
            Thank you for reaching out to us! Your query has been successfully received, and our team is reviewing your inquiry.  
            We will get back to you within a business day.  
            <br><br>
            If you have any other queries, feel free to reply to this email.
          </p>
          <p>Best Regards,</p>
          <p>SyncForm Support Team</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const userMailOptions = {
      from: 'syncform@hubsyntax.com',
      to: formData.email,
      subject: 'Support Request Received',
      html: userEmailTemplate,
    };

    await transportered.sendMail(adminMailOptions);
    await transportered.sendMail(userMailOptions);

    console.log('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
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
    const { TemplateAll, email, subject, formFields, title, shop, shopowner, createdAt } = req.body;
    console.log('Received template data:', TemplateAll, 'Email:', email, subject, formFields, title, shop, shopowner, createdAt);

    await sendEmail(email, TemplateAll, subject, formFields, title, shop, shopowner, createdAt);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
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

const sendEmail = async (email, TemplateAll, subject, formFields, title, shop, shopowner, createdAt) => {
  try {
    console.log('Preparing to send email');
    console.log('Email:', email);
    console.log('TemplateAll:', TemplateAll);

    const settings = await ShopDetails.findOne({ shop: TemplateAll.shop });

    let emailUser = 'syncform@hubsyntax.com';
    let emailPass = 'jaaf dnhy rndg rpic';

    if (settings && settings.notificationsEmail && settings.notificationsPassword) {
      emailUser = settings.notificationsEmail;
      emailPass = settings.notificationsPassword;
      console.log('Using shop-specific email and password:', emailUser);
    } else {
      console.log('No shop-specific credentials found. Using default email.');
    }

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
              const updatedEditorContent = editorContent
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
                });


              const headingStyle = `
    background-image: url('${field.headingbgImage || ''}');
    background-color: ${field.headingbg || '#ffffff'};
    background-size: cover;
    border-width: ${field.headingBorderWidth || 1}px;
    border-style: ${field.headingBorderStyle || 'solid'};
    border-color: ${field.headingBorderColor || '#000'};
    width: ${field.bannerImageWidth || 100}%;
    height: ${field.bannerImageHeight || '400px'};
    opacity: ${field.headeropacity || 1};
    margin: ${field.headingmargin || '0'}px;
  `;

              const buttonStyle = `
     
    font-size: ${field.headingbtnFontSize || 16}px;
    min-width: ${field.headingbtnwidth || 'auto'}px;
    height: ${field.headingbtnheight || 'auto'}px;
    background-color: ${field.headerbtnbg || '#007bff'};
    border-width: ${field.headingbtnBorderWidth || 1}px;
    border-style: ${field.headingbtnBorderStyle || 'solid'};
    border-color: ${field.headingbtnBorderColor || '#007bff'};
    color: ${field.headerbtncolor || '#fff'};
    border-radius: ${field.headingbtnradious || 4}px;
    padding: ${field.headingbtnPadding || 10}px;
    font-weight: ${field.headingbtnweight || 'bold'};
    margin-top: 20px;
    cursor: pointer;
    font-family: ${field.headingbtnfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
  `;

              const HeadingTag = field.headingLevel || 'h1';

              return `
    <div style="${headingStyle}">
      <table role="presentation" width="100%" height="100%" style="height: 100%; width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" valign="middle" style="text-align: ${field.headingTextAlign || TemplateAll.styles.textAlign}; vertical-align: middle; padding: ${field.headingPadding || '20px'}px;">
            <div style="width: 100%; text-align: ${field.headingTextAlign || TemplateAll.styles.textAlign};">
              <${HeadingTag} style="
                color: ${field.headingColor || '#000'};
                font-weight: ${field.headingFontWeight || 'bold'};
                font-family: ${field.headingfamily || '"Poppins", sans-serif'};
                letter-spacing: ${field.headingLetterSpacing || 0}px;
                text-align: ${field.headingTextAlign || TemplateAll.styles.textAlign};
              ">
                ${field.headingText || ''}
              </${HeadingTag}>
              <div style="
                font-size: ${field.headingsubheading || 14}px;
                color: ${field.subheadingColor || '#000'};
                font-family: ${field.subheadingfamily || 'Arial, sans-serif'};
                letter-spacing: ${field.subheadingleter || 0}px;
              ">
                ${updatedEditorContent || ''}
              </div>

              ${field.headingUrl ? `
                <a href="${field.headingUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                  <button style="${buttonStyle}" class="show-bnt-product">
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
          <div style="text-align: ${field.richTextAlign || TemplateAll.styles.textAlign};
                  color: ${field.richtextcolor || '#000'};
                  display: flow-root;
                  text-decoration: ${field.richline || 'none'};
                  font-size: ${field.richFontsize || '16'}px;
                  font-family: ${field.richFontfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
                  letter-spacing: ${field.richspace || 0}px; 
                  background-color: ${field.richbgcolor || '#fff'};
                  padding-left: ${field.richleftPadding || '10'}px;
                  padding-right: ${field.richleftPadding || '10'}px;
                  padding-top: ${field.richtopPadding || '10'}px;
                  padding-bottom: ${field.richtopPadding || '10'}px;">
        ${updatedContent}
      </div>
    </div>
  `;

            case 'description':
              return `<p style="font-size: ${field.descritionFontSize || 16}px; color: ${field.descritionColor || '#000'}; font-weight: ${field.descritionFontWeight || 'normal'};">${field.value}</p>`;
            case 'button': {
              return `
                    <div style=" font-family: ${field.buttonfamily.replace(/"/g, '') || '"Poppins", sans-serif'}; background-color: ${field.buttonbgColor || '#008CBA'}; text-align: ${field.buttonaline || 'left'};">
                        <a href="${field.buttonUrll || '#'}" target="_blank" style="text-decoration: none;">
                            <button style="
                                background-color: ${field.buttonColor || '#008CBA'};
                                padding: ${field.buttonPadding || '10px 20px'}px;
                                height: ${field.buttonHeight || '40'}px;
                                min-width: ${field.buttonWidth || 'auto'}px;
                                font-size: ${field.buttonFontSize || '16'}px;
                                border: ${field.buttonBorderWidth || '0'}px ${field.buttonBorderStyle || 'none'} ${field.buttonBorderColor || '#000'};
                                color: ${field.buttonTextColor || '#fff'};
                                cursor: pointer;
                                border-radius: ${field.buttonradious || '4'}px;
                                font-weight: ${field.buttonweight || 'bold'};
                            ">
                                ${field.buttonLabel || 'Click Here'}
                            </button>
                        </a>
                    </div>
                `;
            }

            case 'Multicolumn': {
              const columnsPerRow = field.columnsPerRow || 1;
              let columnCount = 0;
              let result = `
                <div style="color: ${field.MultiColor || '#000'}; padding: ${field.MultiPadding || '1px'}px; text-align: center; background-color: ${field.Multibgcolor || 'transparent'};">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" 
                   style="border-spacing: ${field.Multigap || 10}px;">
              `;

              field.columnData.forEach((column, index) => {
                if (columnCount % columnsPerRow === 0) {
                  if (columnCount > 0) result += '</tr>';
                  result += '<tr>';
                }

                let processedContent = column.content.replace(
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
                    width: ${100 / columnsPerRow}%;
                    text-align: ${field.Multitext || TemplateAll.styles.textAlign};
                    font-size: ${field.fontsizeMulticolumn || 14}px;
                    border-width: ${field.MulticolumnbtnBorderWidth || 1}px;
                    border-style: ${field.MulticolumnbtnBorderStyle || 'solid'};
                    border-color: ${field.MulticolumnbtnBorderColor || '#000'};
                    padding: ${field.MulticolumnPadding || '10px'}px;
                    background-color: ${field.Multicolumnbgcolor || 'transparent'};
                    color: ${field.MultiColor || '#000'};
                    border-radius: ${field.Multiborderradious || 0}px;
                    font-family: ${field.Multifamily.replace(/"/g, '') || '"Poppins", sans-serif'};
                    letter-spacing:${field.Multiletter || 0}px;
                  ">
                  ${column.image ? `<img src="${column.image}" alt="Column ${index}" style="width: ${field.Multiimgwidth || 100}%; height: auto;" />` : ''}
                  ${processedContent}
                  ${column.isVisible
                    ? `
                    <a href="${column.Multibtnurl || '#'}" target="_blank" style="text-decoration: none;">
                      <button style="
                        margin-top: 20px;
                        background-color: ${field.Multibtnbg || '#FFFFFF'};
                        font-family: ${field.Multibtnfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
                        border-width: ${field.MultibtnBorderWidth || 1}px;
                        border-style: ${field.MultibtnBorderStyle || 'solid'};
                        border-color: ${field.MultibtnBorderColor || '#000'};
                        min-width: ${field.Multibtnweight || 100}px;
                        height: ${field.Multibtnheight || 40}px;
                        color: ${field.Multibtncolor || '#000'};
                        border-radius: ${field.Multibtnradious || 2}px;
                        font-size: ${field.Multibtnfont || 14}px;
                         font-weight: ${field.MultiWeight || '100'}; 
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
              return `
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="${field.imgTextAlign || 'center'}" style="
                      background-color: ${field.imgbg || 'transparent'};
                      border-width: ${field.imgBorderWidth || 1}px;
                      border-style: ${field.imgBorderStyle || 'solid'};
                      border-color: ${field.imgBorderColor || '#000'};
                      padding: ${field.imgPadding || 0}px;
                    ">
                      <img 
                        src="${field.value}" 
                        alt="${field.label || 'Image'}" 
                        style="width: ${field.imgWidth || 100}%; vertical-align: bottom;"
                      />
                    </td>
                  </tr>
                </table>`;
            }

            case 'costum': {
              return `
                <div style="
                  text-align: ${field.costumAline || TemplateAll.styles.textAlign};
                  font-size: ${field.costumFont || 14}px;
                  background-color: ${field.costumBg || 'transparent'};
                  color: ${field.costumColor};
                  padding: ${field.costumPadding || 0}px;
                  line-height:${field.costumline}px;
                  font-family: ${field.costomfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
                  font-weight: ${field.costumfontweight || 'bold'}; 
                  letter-spacing: ${field.costumLetter || 1}px; 
                ">
                  ${field.costumText}
                </div>`;
            }
            case 'split-group': {
              const value = field.value || '';
              const updatedValue = value.replace(/data:image\/[a-zA-Z]*;base64,[^" ]*/g, () => '');

              let childrenHtml = field.children
                .map((child) => {
                  let childVerticalAlign = ['top', 'middle', 'bottom', 'center', 'end'].includes(child.splittext)
                    ? (child.splittext === 'center' ? 'middle' : child.splittext === 'end' ? 'bottom' : child.splittext)
                    : 'top';

                  return `
                          <td style="
                              width: ${TemplateAll?.styles?.viewMode === 'mobile' ? '100%' : child.width || '50%'};
                              padding: ${child.splitPadding || 0}px;
                              text-align: ${child.splitTextAlin || 'left'};
                              letter-spacing: ${child.splitletter || 1}px;
                              vertical-align: ${childVerticalAlign};
                          ">
                              ${child.add === 'image'
                      ? `<img src= ${child.value} style="width: 100%; height: auto;vertical-align: bottom;" />`
                      : `<div style="width: 100%;">
                                          ${child.value}
                                          ${field.showbtnsplit ? `
                                              <a href="${field.splitbtnurl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                                                  <button style="
                                                      margin-top: 20px;
                                                      background-color: ${field.splitbtnbg || '#FFFFFFF'};
                                                      font-size: ${child.splitbtnfont || 14}px;
                                                      color: ${field.splitbtncolor || '#000'};
                                                      min-height: ${child.splitbtnheight || 35}px;
                                                      min-width: ${child.splitbtnwidth || 80}px;
                                                      border-radius: ${child.splitbtnradious || 2}px;
                                                      border-width: ${child.splitBorderWidth || 1}px;
                                                      border-style: ${field.splitBorderStyle || 'solid'};
                                                      border-color: ${field.splitBorderColor || '#000'};
                                                      font-weight: ${field.splitbtnWeight || 100};
                                                      font-family: ${field.splitbtnfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
                                                      cursor: pointer;
                                                  ">
                                                      ${child.splitbtn || 'Click Me'}
                                                  </button>
                                              </a>` : ''
                      }
                                      </div>`
                    }
                          </td>
                      `;
                })
                .join('');

              return `
                  <div style="
                      overflow: hidden;
                      background-color: ${field.splitbg || '#ffffff'};
                      width: 100%;
                      float: ${field.float || 'left'};
                      color: ${field.splitColor || '#000'};
                      font-size: ${field.splittextSize || 14}px;
                      line-height: ${field.splitlineheight || 30}px;
                      font-family: ${field.splitfamily || 'Poppins'};
                  ">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="
                          width: 100%;
                          height: 100%;
                          border-spacing: 0;
                          color: ${field.splitColor || '#000'};
                      ">
                          <tr ${TemplateAll?.styles?.viewMode === 'mobile' ? 'style="display: grid;"' : ''}>
                          ${childrenHtml}
                           </tr>

                      </table>
                  </div>
              `;
            }


            case 'product':
              return `
              <div>
                ${field.products && field.products.length > 0 ? `
                  <table role="presentation" cellspacing="0" cellpadding="0" 
        style="
        border-spacing: 10px;
        width: 100%; 
        border-width: ${field.productBorderWidth}px;
        border-style: ${field.productBorderStyle};
        border-color: ${field.productBorderColor};
        padding: ${field.productPadding}px;
        text-align: center;
        background-color: ${field.productbg};
        color: ${field.productTextColor};
        line-height: ${field.productline}px;
        font-family: ${field.productfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
        
    ">
  ${(() => {
                    const isMobile = TemplateAll?.styles?.viewMode === 'mobile';
                    let productsPerRow = isMobile ? 1 : field.productsPerRow;

                    let rows = [];
                    for (let i = 0; i < field.products.length; i += field.productsPerRow) {
                      rows.push(field.products.slice(i, i + field.productsPerRow));
                    }
                    return rows.map(row => `
        <tr >
          ${row.map(product => `
            <td style="
              padding: 15px; 
               text-align: center;
                ${isMobile ? 'display: block; width: 100%;' : ''}
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
                <p  margin-top: 10px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                  ${product.title.slice(0, 10)}...
                </p>

                ${field.showPrice && product.price ? `
                  <p  margin-top:20px; font-weight: ${field.productWeight}; letter-spacing: ${field.productLetterSpacing}px;">
                    ${product.price.slice(0, 10)}...
                  </p>
                ` : ''}

                ${field.showbtnn ? `
                  <a href="${field.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <button
                      style="
                        margin-top: 15px;
                        font-size: ${field.productfontSize}px;
                        min-width: ${field.productwidth}px;
                        height: ${field.productheight}px;
                        font-family: ${field.productbtnfamily.replace(/"/g, '') || '"Poppins", sans-serif'};
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
      `).join('');
                  })()}
</table>

                ` : '<p>No products available</p>'}
              </div>
            `;

            case 'divider':
              return `
                <div style="background-color: ${field.dividerbgColor || 'transparent'}; width: 100%;">
                  <hr style="
                    border-color: ${field.dividerColor || '#000'};
                    width: ${field.dividerWidth || '100%'}%;
                    border-width: ${parseInt(field.dividerHeight, 10) || 1}px; 
                    border-style: solid;
                    margin: auto;
                    margin-left: ${field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'left' ? '0' : 'auto'};
                    margin-right: ${field.dividerAline === 'center' ? 'auto' : field.dividerAline === 'right' ? '0' : 'auto'};
                  " />
                </div>`;


            case 'html convert':
              return `<div style=" font-family:${field.htmlfamily || '"Poppins", sans-serif'}  text-align: ${field.htmlaline || TemplateAll.styles.textAlign}; color: ${field.htmlColor || '#000'}; font-size: ${field.htmlFontSize || '16px'};">${field.value}</div>`;
            case 'spacer':
              return `
                      <div style="width: 100%; display: flex; height: ${field.spacerHeight || '20px'}px; background-color: ${field.spacerbg || '#EDEDED'}; padding: ${field.splitPadding || '0'}px 0;">
                      </div>
                    `;
            case 'socalicon':
              if (field.value) {
                const icons = [];

                if (field.value.facebook && !field.value.facebook.isHidden && field.value.facebook.url) {
                  icons.push(`
                    <a href="${field.value.facebook.url}" target="_blank" rel="noopener noreferrer"
                     style="padding-right: ${field.socalIcongap || 0}px;">
                      <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/facebook.png?v=1732510414" 
                           alt="Facebook" 
                           style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                    </a>
                  `);
                }

                if (field.value.twitter && !field.value.twitter.isHidden && field.value.twitter.url) {
                  icons.push(`
                    <a href="${field.value.twitter.url}" target="_blank" rel="noopener noreferrer"
                    style="padding-right: ${field.socalIcongap || 0}px;">
                      <img src="https://cdn.shopify.com/s/files/1/0875/3679/5938/files/twitter.png?v=1732510414" 
                           alt="Twitter" 
                           style="height: ${field.socalIconHeight || 24}px; width: ${field.socalIconWidth || 24}px;" />
                    </a>
                  `);
                }

                if (field.value.instagram && !field.value.instagram.isHidden && field.value.instagram.url) {
                  icons.push(`
                    <a href="${field.value.instagram.url}" target="_blank" rel="noopener noreferrer"
                    style="padding-right: ${field.socalIcongap || 0}px;">
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
                    text-align: ${field.socaliconTextAlign || TemplateAll.styles.textAlign}; 
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
      <link href="https://fonts.googleapis.com/css2?family=Arial&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Verdana&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Georgia&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Courier+New&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gotham&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Helvetica&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Neutra+Text&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baskerville&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <style>
   *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      h1{
          font-size: 40px;
          line-height: 50px;

      }
      h2{
         font-size: 30px;
           line-height: 40px;
     
       }
      h3{
         font-size: 34px;
           line-height: 30px;
      }
         
       h4{
       font-size: 22px;
      line-height: 30px;
       font-weight:500;
       }

       h5{
       font-size: 20px;
         line-height: 26px;
         font-weight:500;
       }

        h6{
       font-size: 18px;
         line-height: 23px;
       font-weight:500;
       }

       p{
        line-height: 20px;
        font-size: 15px;
       }
        
     a {
       text-decoration: none;
     }


    </style>
  </head>
      <body style="background-color: ${TemplateAll.styles.backgroundColor || 'white'};
       width: ${TemplateAll.styles.width || '100%'}; 
       border-radius: ${TemplateAll.styles.borderRadious || '0'}px;
        text-align: ${TemplateAll.styles.textAlign || 'center'};
        padding: ${TemplateAll.styles.templatePadding || '0'}px;
        font-family: ${TemplateAll.styles.fontFamily || '"Poppins", sans-serif'};
        margin:auto;
        background-image: url('${TemplateAll.styles.backgroundImage}');
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center;
         ">
        <div>
          ${fieldsHTML}
        </div>
      </body>
    </html>
  `;

    // const formattedDate = createdAt 
    // ? new Date(createdAt).toLocaleString() 
    // : "N/A";

    // const formFieldsHtml = formFields
    // .map(field => `<p><strong>${field.name}:</strong> ${field.value}</p>`)
    // .join('');
    //   const adminHtmlContent = `
    //     <html>
    //    <body>
    //   <div style="font-family: 'Poppins', sans-serif;width: 100%; max-width: 60%; margin: auto; border: 1px solid grey;border-radius:4px; background-color: white; padding: 20px; color: black;">
    //     <div>Hi <strong>${shopowner}</strong>,</div>
    //     <div>Your form "<strong>${title}</strong>" has been successfully submitted. Now, you can start collecting responses.</div>
    //     <div>
    //       <p><strong>Form Details:</strong></p>
    //       <p>Form Name: <strong>${title}</strong></p>
    //       <p>Created: ${formattedDate}</p>
    //       ${formFieldsHtml}
    //       <p>Embed the form in your store.</p>
    //       <p>Track responses in the app dashboard.</p>

    //       <p>Let us know if you need any assistance.</p>
    //       <p>Best Regards,</p>
    //       <p><strong>Sync Form Builder</strong></p>
    //     </div>
    //   </div>
    //  </body>
    //  </html>

    //   `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // const adminMailOptions = {
    //   from: emailUser,
    //   to: emailUser,
    //   subject: subject || 'New Form Submission! SyncForm',
    //   html: adminHtmlContent,
    // };

    const userMailOptions = {
      from: emailUser,
      to: email,
      subject: subject || 'New Form Submission! SyncForm',
      html: userHtmlContent,
      attachments,
    };

    console.log(`Sending admin email to ${emailUser}`);
    // await transporter.sendMail(adminMailOptions);

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

    const data = await Email.find({}).select('templateId shop TemplateImage form_ids title createdAt status');
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

    fieldsArray.forEach(field => {
      if (field.type === 'split-group' && Array.isArray(field.children)) {
        field.children.forEach(child => {
          if (child.value && typeof child.value === 'string' && child.value.startsWith('data:image')) {
            const base64Data = child.value.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const fileName = `split_child_image_${Date.now()}.png`;
            child.value = saveBase64Image2(base64Data, fileName);
          }
        });
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
      styles,
      status: 'live'
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

    updatedFormData.fields.forEach(field => {
      if (field.type === 'split-group' && Array.isArray(field.children)) {
        field.children.forEach(child => {
          if (child.value && typeof child.value === 'string' && child.value.startsWith('data:image')) {
            const base64Data = child.value.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const fileName = `split_child_image_${Date.now()}.png`;
            child.value = saveBase64Image2(base64Data, fileName);
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

app.post('/template/api', upload.single('file'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    let { templateId, shop, TemplateImage, title, fields, createdAt, form_ids, styles } = req.body;

    const formIds = Array.isArray(form_ids) ? form_ids.map(id => String(id)) : [String(form_ids)];
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
      if (field.type === 'split-group' && Array.isArray(field.children)) {
        field.children.forEach(child => {
          if (child.value && typeof child.value === 'string' && child.value.startsWith('data:image')) {
            const base64Data = child.value.replace(/^data:image\/(?:png|jpeg);base64,/, '');
            const fileName = `split_child_image_${Date.now()}.png`;
            child.value = saveBase64Image2(base64Data, fileName);
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

    const formData = new Templated({
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

app.get('/get/save-shop/:shop', async (req, res) => {
  try {
    const { shop } = req.params;

    const brandLogo = await ShopDetails.findOne({ shop });

    if (!brandLogo) {
      return res.status(404).json({ message: 'Brand logo status not found' });
    }

    res.status(200).json({ brandLogoStatus: brandLogo.brandLogoStatus });
  } catch (error) {
    console.error("Error fetching brand logo status:", error);
    res.status(500).json({ message: 'Error fetching brand logo status', error: error.message });
  }
});

let emailCheckIntervals = {};

app.post('/api/save-shop', async (req, res) => {
  try {
    const { shop, accessToken, brandLogoStatus, storeEmail, storeName, notificationsEmail, notificationsPassword, status, numberValue, shopData } = req.body;

    const updatedShopDetails = await ShopDetails.findOneAndUpdate(
      { shop },
      { accessToken, brandLogoStatus, storeEmail, storeName, notificationsEmail, notificationsPassword, status, numberValue },
      { new: true, upsert: true }
    );
    console.log('Shop details processed successfully:', updatedShopDetails);

    const numberValueParsed = Number(numberValue);
    if (isNaN(numberValueParsed)) {
      return res.status(400).json({ message: 'Invalid number value' });
    }

    const existingShop = await ShopDetails.findOne({ shop });

    if (existingShop) {
      await ShopDetails.updateOne(
        { shop },
        { $set: { status, numberValue: numberValueParsed } }
      );
      console.log(`Shop data updated for ${shop}`);
    } else {
      const newSetting = new ShopDetails({
        status,
        numberValue: numberValueParsed,
        shop,
        shopData,
      });
      await newSetting.save();
      console.log(`New shop data added for ${shop}`);
    }

    async function checkAndSendEmail() {
      const forms = await Form.find({ shop: shop });

      let totalSubmissions = 0;
      let allSubmissions = [];

      for (const form of forms) {
        totalSubmissions += form.submissions.length;

        const formattedSubmissions = form.submissions.map(submission => {
          const flatFields = submission.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
          }, {});

          return {
            _Id: form._id,
            "Form name": form.title,
            id: form.id,
            Shop: form.shop,
            CurrentUrl: form.currentUrl,
            FormTimestamp: form.timestamp,
            SubmissionId: submission._id,
            ...flatFields,
            SubmissionTimestamp: submission.timestamp,
          };
        });

        allSubmissions = allSubmissions.concat(formattedSubmissions);
      }

      console.log(`Total submissions for shop ${shop}: ${totalSubmissions}, Required: ${numberValueParsed}`);

      if (totalSubmissions >= numberValueParsed && status === "active") {
        console.log(`Total submissions reached ${numberValueParsed}. Sending email...`);

        const latestSubmissions = allSubmissions.slice(0, numberValueParsed);

        const csvParser = new Parser();
        const csvData = csvParser.parse(latestSubmissions);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'syncform@hubsyntax.com',
            pass: 'jaaf dnhy rndg rpic',
          },
        });

        const mailOptions = {
          from: 'syncform@hubsyntax.com',
          to: storeEmail,
          subject: `Congrats! Your Forms have Reached ${numberValueParsed} Submissions`,
          text: `We’re excited to inform you that your forms have successfully reached ${numberValueParsed} submissions! 
Thank you for using our SyncForm app to connect with your customers. If you have any questions or need further assistance, please feel free to reach out.`,
          attachments: [
            {
              filename: 'formData.csv',
              content: csvData,
            },
          ],
        };

        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log(`Email sent successfully for shop "${shop}":`, info);
            try {
              await ShopDetails.updateOne({ shop: shop }, { status: 'disactive' });
              console.log('Status updated to disactive for shop:', shop);

              clearInterval(emailCheckIntervals[shop]);
              delete emailCheckIntervals[shop];
            } catch (updateError) {
              console.error('Error updating status to disactive:', updateError);
            }
          }
        });
      }
    }

    if (!emailCheckIntervals[shop]) {
      emailCheckIntervals[shop] = setInterval(checkAndSendEmail, 10000); // check every 10 seconds
      console.log(`Started checking for shop: ${shop}`);
    }

    res.status(201).json({ message: 'Data processed successfully. Email will be sent when total submissions match.', data: { shop, status, numberValue: numberValueParsed } });

  } catch (error) {
    console.error('Error saving data or sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/get-shop/:shop', async (req, res) => {
  try {
    const { shop } = req.params;
    const shopDetails = await ShopDetails.findOne({ shop });

    if (!shopDetails) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    console.log('Shop details retrieved successfully:', shopDetails);

    res.status(200).json({
      message: 'Shop details retrieved successfully',
      data: shopDetails,
    });
  } catch (error) {
    console.error('Error retrieving shop details:', error);
    res.status(500).json({ message: 'Internal server error' });
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

app.get('/payment/active-plan', async (req, res) => {
  try {
    const { shop } = req.query;
    if (!shop) {
      return res.status(400).json({ error: "Shop parameter is required" });
    }

    const activePlan = await Payment.findOne({ shop, status: 'active' });
    if (!activePlan) {
      return res.status(404).json({ error: "No active plan found" });
    }

    res.json({ success: true, activePlan });
  } catch (error) {
    console.error('Error fetching active plan:', error.message);
    res.status(500).json({ error: 'Error fetching active plan' });
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

    await Payment.updateMany({ shop, status: 'active' }, { $set: { status: 'disactive' } });

    const payment = await Payment.findOneAndUpdate(
      { chargeId, shop }, 
      { name, plan, price, status, billingOn, chargeId, shop }, 
      { new: true, upsert: true } 
    );

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
    res.status(200).json(forms);
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

app.post('/api/formsData', async (req, res) => {

  try {
    const formsData = req.body;
    const { title, id, fields, timestamp, currentUrl, shopowner, shopEmail, onwerShop, shop } = formsData;

    if (!shop) {
      return res.status(400).send({ error: 'Shop field is missing from the form submission.' });
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
        shopowner,
        shopEmail,
        onwerShop,
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

    if (onwerShop === shop) {

      const fieldValues = fields.map(field => `<p><strong>${field.name}:</strong> ${field.value}</p>`).join('');


      const adminHtmlContent = `
        <html>
        <body>
          <div style="font-family: 'Poppins', sans-serif;width: 100%; max-width: 60%; margin: auto; border: 1px solid grey;border-radius:4px; background-color: white; padding: 20px; color: black;">
            <div>Hi <strong>${shopowner}</strong>,</div>
            <div>Your form "<strong>${title}</strong>" has been successfully submitted. Now, you can start collecting responses.</div>
            <div>
              <p><strong>Form Details:</strong></p>
              <p>Form Name: <strong>${title}</strong></p>
              ${fieldValues}
              <p>Embed the form in your store.</p>
              <p>Track responses in the app dashboard.</p>
              <p>Let us know if you need any assistance.</p>
              <p>Best Regards,</p>
              <p><strong>Sync Form Builder</strong></p>
            </div>
          </div>
        </body>
        </html>
      `;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syncform@hubsyntax.com',
          pass: 'jaaf dnhy rndg rpic'
        }
      });

      let mailOptions = {
        from: 'syncform@hubsyntax.com',
        to: shopEmail,
        subject: `New Form Submission - ${title}`,
        html: adminHtmlContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('❌ Error sending email:', error);
        } else {
          console.log('✅ Email sent successfully:', info.response);
        }
      });
    }

    const emailField = fields.find(field => field.name === 'Email');
    const email = emailField ? emailField.value : "";

    if (email === "") {
      console.log('Email is missing, setting to empty string');
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

    if (styles.backgroundImage && styles.backgroundImage.startsWith('url(data:image')) {
      const base64Data = styles.backgroundImage.replace(/^url\((.*)\)$/, '$1').replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `templateImage_${Date.now()}.png`;
      const imageUrl = saveBase64Image2(base64Data, fileName);
      styles.backgroundImage = imageUrl;
    }
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

app.put('/update-form/:formId', upload.single('file'), async (req, res) => {
  try {
    const { formId } = req.params;
    const { title, fields, styles, submissionOption, toggleStatus, thankYouTimer, editorValue, url, status } = req.body;

    if (styles && styles.backgroundImage && styles.backgroundImage.startsWith('url(data:image')) {
      const base64Data = styles.backgroundImage.replace(/^url\((.*)\)$/, '$1').replace(/^data:image\/(?:png|jpeg);base64,/, '');
      const fileName = `templateImage_${Date.now()}.png`;
      const imageUrl = saveBase64Image2(base64Data, fileName);
      styles.backgroundImage = imageUrl;
    }

    const updatedForm = await FormModel.findOneAndUpdate(
      { formId },
      { title, fields, styles, submissionOption, toggleStatus, thankYouTimer, editorValue, url, status },
      { new: true }
    );

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
//         user: 'syncform@hubsyntax.com',
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
//       to: 'syncform@hubsyntax.com',
//       subject: 'New Customer Query builder-form',
//       html: adminHtmlContent,

//     };

//     const userMailOptions = {
//       from: '"EcombitHub Support" <syncform@hubsyntax.com>',
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