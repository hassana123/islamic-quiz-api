const express = require("express");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { body, param, validationResult } = require("express-validator");
const cors = require('cors');

// Configure CORS options
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};




const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const uri =
  "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/?retryWrites=true&w=majority&appName=QuizApi";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Apply the middleware to all admin routes
app.use("/admin", authenticateAdmin);

app.get("/", (req, res) => {
  res.send("Hello!");
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Use the database
    const db = client.db("Quiz-API");
    const questionsCollection = db.collection("questions");
    const feedbackCollection = db.collection("feedback"); 

    app.get("/questions", async (req, res) => {
      try {
        if (!questionsCollection) {
          return res.status(500).json({ message: "Questions collection not found." });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const filter = {};
        if (req.query.category) {
          filter.category = req.query.category;
        }
        if (req.query.difficulty) {
          filter.difficulty = req.query.difficulty;
        }
    
        const questions = await questionsCollection
          .find(filter)
          .skip(skip)
          .limit(limit)
          .toArray();
    
        const totalQuestions = await questionsCollection.countDocuments(filter);
        const totalPages = Math.ceil(totalQuestions / limit);
    
        res.status(200).json({
          questions,
          page,
          totalPages,
          totalQuestions,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.post(
      "/question",
      [
        body("question").notEmpty().withMessage("Question text is required."),
        body("options")
          .isArray({ min: 2 })
          .withMessage("At least two options are required."),
        body("answer")
          .notEmpty()
          .withMessage("Answer is required.")
          .custom((value, { req }) => {
            if (!req.body.options.includes(value)) {
              throw new Error("Answer must be one of the provided options.");
            }
            return true;
          }),
        body("category").optional().isString(),
        body("difficulty").optional().isString(),
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          const { question, options, answer, justification, category, difficulty } = req.body;
    
          // Additional checks for missing required fields
          if (!question || !options || !answer) {
            return res.status(400).json({ message: "Missing required fields." });
          }
    
          const newQuestion = {
            question,
            options,
            answer,
            justification,
            category,
            difficulty,
            createdAt: new Date(),
            updatedAt: new Date(),
            approved: false,
          };
    
          const result = await questionsCollection.insertOne(newQuestion);
          const insertedQuestion = await questionsCollection.findOne({
            _id: result.insertedId,
          });
    
          res.status(201).json(insertedQuestion);
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: "An internal server error occurred." });
        }
      }
    );
    
    // PUT /question/:id route with validation
    app.put(
      "/question/:id",
      [
        param("id").isMongoId().withMessage("Invalid question ID format."),
        body("question").optional().notEmpty().withMessage("Question text is required."),
        body("options").optional().isArray({ min: 2 }).withMessage("At least two options are required."),
        body("answer").optional().notEmpty().withMessage("Answer is required."),
        body("category").optional().isString(),
        body("difficulty").optional().isString(),
      ],
      async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
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
      }
    );
    
    app.put("/question/:id/approve", async (req, res) => {
      try {
        const { id } = req.params;
    
        // Update the question's approval status
        const result = await questionsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { approved: true, updatedAt: new Date() } }
        );
    
        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: `Cannot find any question with ID ${id}` });
        }
    
        res.status(200).json({ message: "Question approved successfully." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    
    // Admin Routes
    app.get("/admin/questions", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const questions = await questionsCollection
          .find({})
          .skip(skip)
          .limit(limit)
          .toArray();
    
        res.status(200).json(questions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.put("/admin/question/:id", async (req, res) => {
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
          return res
            .status(404)
            .json({ message: `Cannot find any question with ID ${id}` });
        }
    
        res.status(200).json(question.value);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.delete("/admin/question/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await questionsCollection.deleteOne({
          _id: new ObjectId(id),
        });
    
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ message: `Cannot find any question with ID ${id}` });
        }
    
        res.status(200).json({ message: "Question deleted successfully." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    app.get("/admin/feedback", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const feedback = await feedbackCollection
          .find({})
          .skip(skip)
          .limit(limit)
          .toArray();
    
        const totalFeedback = await feedbackCollection.countDocuments();
        const totalPages = Math.ceil(totalFeedback / limit);
    
        res.status(200).json({
          feedback,
          page,
          totalPages,
          totalFeedback,
        });
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
