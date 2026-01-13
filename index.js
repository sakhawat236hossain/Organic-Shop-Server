const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect(); 
    
    const productCollection = client.db("organicDB").collection("products");

   



app.post('/products', async (req, res) => {
  try {
    const newProduct = req.body;

    if (!newProduct || Object.keys(newProduct).length === 0) {
      return res.status(400).send({ message: "No data received" });
    }

    const result = await productCollection.insertOne(newProduct);
    
    console.log("✅ Product Inserted:", result);
    res.status(201).send(result);

  } catch (error) {
    console.error("❌ Post Error:", error); 
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Organic Shop Server is running...');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});