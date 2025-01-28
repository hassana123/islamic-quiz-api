// //config/db.js
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/?retryWrites=true&w=majority&appName=QuizApi";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB successfully");
//     const db = client.db("Quiz-API");
//     return db;
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     throw error;
//   }
// }

// module.exports = connectDB;

// config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/?retryWrites=true&w=majority&appName=QuizApi";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // Enforce stricter behavior for deprecated features
    deprecationErrors: true, // Warn about deprecated usage
  },
});

async function connectDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB successfully");

    // Select the database
    const db = client.db("Quiz-API");

    // Ensure the connection is verified
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection verified");

    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Rethrow the error for proper handling
  }
}

module.exports = connectDB;
