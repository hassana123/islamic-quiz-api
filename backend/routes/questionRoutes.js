// const express = require('express');
// const { body, param } = require('express-validator');
// const { getQuestions, createQuestion, updateQuestion } = require('../controllers/questionController');
// const validateApiKey = require('../middleware/ValidateApiKeys');

// const router = express.Router();

// router.get('/questions', validateApiKey, getQuestions);

// router.post(
//   '/questions',
//   [
//     body("question").notEmpty().withMessage("Question text is required."),
//     body("options").isArray({ min: 2 }).withMessage("At least two options are required."),
//     body("answer")
//       .notEmpty()
//       .withMessage("Answer is required.")
//       .custom((value, { req }) => {
//         if (!req.body.options.includes(value)) {
//           throw new Error("Answer must be one of the provided options.");
//         }
//         return true;
//       }),
//     body("category").optional().isString(),
//     body("difficulty").optional().isString(),
//   ],
//   validateApiKey,
//   createQuestion
// );

// router.patch(
//   '/questions/:id',
//   [
//     param("id").isMongoId().withMessage("Invalid question ID format."),
//     body("question").optional().notEmpty().withMessage("Question text is required."),
//     body("options").optional().isArray({ min: 2 }).withMessage("At least two options are required."),
//     body("answer").optional().notEmpty().withMessage("Answer is required."),
//     body("category").optional().isString(),
//     body("difficulty").optional().isString(),
//   ],
//   validateApiKey,
//   updateQuestion
// );

// module.exports = router;

const express = require('express');
const {createQuestionSchema, updateQuestionSchema} = require("../schemas/questionsSchema")
const { getQuestions, createQuestion, updateQuestion } = require('../controllers/questionController');
const validateApiKey = require('../middleware/ValidateApiKeys');
const validate  = require('../middleware/validate'); // assuming you place the validate function in middleware

const router = express.Router();

// GET: Get all questions
router.get('/questions', validateApiKey, getQuestions);

// POST: Create a new question
router.post('/questions', validate(createQuestionSchema), validateApiKey, createQuestion);

// PATCH: Update an existing question
router.patch('/questions/:id', validate(updateQuestionSchema), validateApiKey, updateQuestion);

module.exports = router;
