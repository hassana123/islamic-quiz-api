// routes/adminRoutes.js
const express = require("express");
const {
  getAdminQuestions,
  updateAdminQuestion,
  deleteAdminQuestion,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/questions", getAdminQuestions);
router.put("/question/:id", updateAdminQuestion);
router.delete("/question/:id", deleteAdminQuestion);

module.exports = router;
