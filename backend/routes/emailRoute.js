const express = require("express");
const Email = require("../schemas/emailSchema")
const router = express.Router();

// Route to save an email address
router.post("/g3women/email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Save email to database
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "Email saved successfully." });
  } catch (error) {
    // Handle duplicate email or other errors
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Failed to save email.", error: error.message });
  }
});

module.exports = router;
