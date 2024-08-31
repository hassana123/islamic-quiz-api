const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/?retryWrites=true&w=majority&appName=QuizApi";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    const db = client.db("Quiz-API");
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

module.exports = connectDB;
