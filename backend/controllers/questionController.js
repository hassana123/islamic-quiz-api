const {isValidObjectId } = require('mongoose')
const { validationResult } = require('express-validator');

async function getQuestions(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const questions = await questionsCollection.find(filter).toArray();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createQuestion(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { question, options, answer, justification, category, difficulty } = req.body;

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
    const insertedQuestion = await questionsCollection.findOne({ _id: result.insertedId });

    res.status(201).json(insertedQuestion);
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred." });
  }
}

async function updateQuestion(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    //const objectId = isValidObjectId(id);
    const updateDoc = {
      $set: {
        ...req.body,
        updatedAt: new Date(),
      },
    };

    // Only allow updating questions that are not approved yet
    const question = await questionsCollection.findOneAndUpdate(
      { _id: id, approved: false },
      updateDoc,
      { returnOriginal: false }
    );

    if (!question.value) {
      return res.status(404).json({ message: `Cannot find any unapproved question with ID ${id}` });
    }

    res.status(200).json(question.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
};
