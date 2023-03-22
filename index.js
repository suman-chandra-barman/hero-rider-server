const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};
dbConnect();

// database collection;
const userCollection = client.db("HeroRider").collection("users");
const learnerCollection = client.db("HeroRider").collection("learners");

// user api
app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await userCollection.insertOne(user);
  res.send(result);
});
// learners api
app.post("/learners", async (req, res) => {
  const learner = req.body;
  const result = await learnerCollection.insertOne(learner);
  res.send(result);
});

// root api
app.get("/", (req, res) => {
  res.send("Hero Rider Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
