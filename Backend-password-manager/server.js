const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

app.use(bodyparser.json())

app.use(cors(
  {
    origin:["https://priyansh-password-manager.vercel.app"],
    methods:["GET","POST"],
    credentials:true
  }
))


client.connect();


//Get all passwords
app.get('/',async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();

  res.json(findResult)
})

//save password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);

  res.send({success:true , result : findResult})
})
//delete password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);

  res.send({success:true , result : findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
