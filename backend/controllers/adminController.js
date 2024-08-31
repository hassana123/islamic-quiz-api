// controllers/adminController.js
const { ObjectId } = require("mongodb");

async function getAdminQuestions(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const questions = await questionsCollection.find({}).skip(skip).limit(limit).toArray();

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAdminQuestion(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

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

async function deleteAdminQuestion(req, res) {
  const db = req.app.get("db");
  const questionsCollection = db.collection("questions");

  try {
    const { id } = req.params;
    const result = await questionsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: `Cannot find any question with ID ${id}` });
    }

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAdminQuestions,
  updateAdminQuestion,
  deleteAdminQuestion,
};
