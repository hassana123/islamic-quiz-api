// const express = require("express");
// const Question = require("../models/questionModel");
// const mongoose = require("mongoose");
// const app = express();

// app.use(express.json());

// //routes

// app.get("/", (req, res) => {
//   res.send("heylo bitch");
// });
// app.get("/questions", async (req, res) => {
//   try {
//     const questions = await Question.find({});
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.put("/questions/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const question = await Question.findByIdAndUpdate(id,req.body);
//     if (!question) {
//         return res.status(404).json({message:`cannot find any question with ID ${id}`})
//     }
//     res.status(200).json(question);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.put("/questions/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const question = await Question.findById(id);
//       res.status(200).json(question);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
// app.post("/question", async (req, res) => {
//   try {
//     const question = await Question.create(req.body);
//     res.status(200).json(question);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// });
// app.listen(8080, () => {
//   console.log("server running on port 8080");
// });
// mongoose
//   .connect(
//     "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/Quiz-API?retryWrites=true&w=majority&appName=QuizApi"
//   )
//   .then(() => {
//     console.log("connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// Assuming this is within your main server file (e.g., index.js)

const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/?retryWrites=true&w=majority&appName=QuizApi";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Use the database
    const db = client.db("Quiz-API");
    const questionsCollection = db.collection("questions");

    // Routes
    app.get("/", (req, res) => {
      res.send("Hello!");
    });

    app.get("/questions", async (req, res) => {
      try {
        const questions = await questionsCollection.find({}).toArray();
        res.status(200).json(questions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post("/question", async (req, res) => {
      try {
        const newQuestion = {
          question: req.body.question,
          options: req.body.options,
          answer: req.body.answer,
          justification: req.body.justification,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await questionsCollection.insertOne(newQuestion);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });

    app.put("/question/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updateDoc = {
          $set: {
            ...req.body,
            updatedAt: new Date(),
          },
        };
        
        const question = await questionsCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          updateDoc,
          { returnOriginal: false }
        );

        if (!question.value) {
          return res.status(404).json({ message: `Cannot find any question with ID ${id}` });
        }
        
        res.status(200).json(question.value);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Start the server
    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  } catch (error) {
    console.error(error);
  } finally {
    // Close the client connection when the application stops
    // await client.close();
  }
}

run().catch(console.dir);

