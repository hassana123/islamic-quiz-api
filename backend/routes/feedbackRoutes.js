// routes/feedbackRoutes.js
const express = require("express");
const { getFeedback, postFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.get("/feedback", getFeedback);
router.post("/feedback", postFeedback); 

module.exports = router;
