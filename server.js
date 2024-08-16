const express = require("express");
const Question = require("./models/questionModel");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("heylo bitch");
});
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id,req.body);
    if (!question) {
        return res.status(404).json({message:`cannot find any question with ID ${id}`})
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/questions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Question.findById(id);
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
app.post("/question", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.listen(8080, () => {
  console.log("server running on port 8080");
});
mongoose
  .connect(
    "mongodb+srv://hassanaabdll1:Hassana2001@quizapi.omnto.mongodb.net/Quiz-API?retryWrites=true&w=majority&appName=QuizApi"
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
