const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Route to save an email address
router.post("/g3women", async (req, res) => {
  const db = req.app.get("db"); // Get the database connection
  const emailsCollection = db.collection("g3women_emails");

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Save the email to the "g3women_emails" collection
    const newEmail = {
      email,
      createdAt: new Date(),
    };

    const result = await emailsCollection.insertOne(newEmail);

    // Get the inserted document's details
    const insertedEmail = await emailsCollection.findOne({ _id: result.insertedId });

    res.status(201).json({
      message: "Email saved successfully.",
      email: insertedEmail, // Return the inserted email document
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error (MongoDB unique index error code)
      return res.status(409).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Failed to save email.", error: error.message });
  }
});

// Route to fetch all emails
router.get("/g3women", async (req, res) => {
  const db = req.app.get("db"); // Get the database connection
  const emailsCollection = db.collection("g3women_emails");

  try {
    const emails = await emailsCollection.find().toArray(); // Fetch all emails
    res.status(200).json({ emails });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emails.", error: error.message });
  }
});

module.exports = router;
