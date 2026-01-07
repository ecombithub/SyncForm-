// import express from 'express';
// import cors from 'cors';
// import { MongoClient } from 'mongodb';

// const mongoUri = 'mongodb+srv://info:HeTtLubQ6ViUMts3@cluster0.4mbsgst.mongodb.net/diamond?retryWrites=true&w=majority&appName=Cluster0';
// const dbName = 'diamond';
// const collectionName = 'shop_details';

// const app = express();
// const port = 5000;

// let mongoClient;

// async function getMongoClient() {
//     if (!mongoClient) {
//         try {
//             console.log('Creating a new MongoClient instance...');
//             mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//             await mongoClient.connect();
//             console.log('MongoClient connected successfully');
//         } catch (error) {
//             console.error('Error connecting to MongoDB:', error.message);
//             throw error;  // Re-throw the error after logging it
//         }
//     } else {
//         console.log('Reusing existing MongoClient instance...');
//     }
//     return mongoClient;
// }

// app.use(cors());
// app.use(express.json());

// // Endpoint to save shop details
// app.post('/api/save-shop', async (req, res) => {
//     try {
//         const { shop, accessToken } = req.body;

//         if (!shop || !accessToken) {
//             return res.status(400).json({ error: "Shop domain and access token are required" });
//         }

//         const client = await getMongoClient();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         const result = await collection.insertOne({ shop, accessToken });
//         console.log('Data inserted into MongoDB:', result);

//         return res.json({ success: true });
//     } catch (e) {
//         console.error('Error occurred:', e);
//         return res.status(500).json({ error: e.message });
//     }
// });

// // Endpoint to retrieve shop details
// app.get('/api/get-shop', async (req, res) => {
//     try {
//         const client = await getMongoClient();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         const shops = await collection.find({}).toArray();
//         console.log('Retrieved shop details:', shops);

//         return res.json(shops);
//     } catch (e) {
//         console.error('Error occurred:', e);
//         return res.status(500).json({ error: e.message });
//     }
// });

// // Test MongoDB connection
// async function testMongoConnection() {
//     try {
//         console.log('Testing MongoDB connection...');
//         const client = await getMongoClient();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Fetch a sample document to ensure connection is working
//         const sampleDoc = await collection.findOne({});
//         console.log('Sample document:', sampleDoc);

//     } catch (e) {
//         console.error('Error connecting to MongoDB:', e.message);
//     }
// }

// testMongoConnection();

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


// import express from 'express';
// import cors from 'cors';
// import { MongoClient } from 'mongodb';

// const mongoUri = 'mongodb+srv://info:HeTtLubQ6ViUMts3@cluster0.4mbsgst.mongodb.net/diamond?retryWrites=true&w=majority&appName=Cluster0';
// const dbName = 'diamond';
// const collectionName = 'shop_details';

// const app = express();
// const port = 5000;

// let mongoClient;

// async function getMongoClient() {
//     if (!mongoClient) {
//         mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await mongoClient.connect();
//     }
//     return mongoClient;
// }

// app.use(cors());
// app.use(express.json());

// app.post('/api/save-shop', async (req, res) => {
//     try {
//         const { shop, accessToken } = req.body;

//         if (!shop || !accessToken) {
//             return res.status(400).json({ error: "Shop domain and access token are required" });
//         }

//         const client = await getMongoClient();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         const result = await collection.insertOne({ shop, accessToken });
//         console.log('Data inserted into MongoDB:', result);

//         return res.json({ success: true });
//     } catch (e) {
//         console.error('Error occurred:', e);
//         return res.status(500).json({ error: e.message });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
























import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const mongoUri = 'mongodb+srv://info:HeTtLubQ6ViUMts3@cluster0.4mbsgst.mongodb.net/diamond?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'diamond';
const collectionName = 'shop_details';

const app = express();
const port = 5000;

let mongoClient;

async function getMongoClient() {
    if (!mongoClient) {
        try {
            console.log('Creating a new MongoClient instance...');
            mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
            await mongoClient.connect();
            console.log('MongoClient connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            throw error;
        }
    } else {
        console.log('Reusing existing MongoClient instance...');
    }
    return mongoClient;
}

app.use(cors());
app.use(express.json());


app.post('/api/save-shop', async (req, res) => {
    try {
        const { shop, accessToken } = req.body;

        if (!shop || !accessToken) {
            return res.status(400).json({ error: "Shop domain and access token are required" });
        }

        const client = await getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);


        const existingShop = await collection.findOne({ shop });

        if (existingShop) {
            console.log('Shop already exists:', existingShop);
            return res.status(400).json({ error: "Shop already exists" });
        }


        const result = await collection.insertOne({ shop, accessToken });
        console.log('Data inserted into MongoDB:', result);

        return res.json({ success: true });
    } catch (e) {
        console.error('Error occurred:', e);
        return res.status(500).json({ error: e.message });
    }
});



async function testMongoConnection() {
    try {
        console.log('Testing MongoDB connection...');
        const client = await getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);


        const sampleDoc = await collection.findOne({});
        console.log('Sample document:', sampleDoc);

    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message);
    }
}

testMongoConnection();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
