const Joi = require('joi');

// Schema for question creation
const createQuestionSchema = Joi.object({
  question: Joi.string().required().messages({
    'string.empty': 'Question text is required.',
  }),
  options: Joi.array().items(Joi.string()).min(2).required().messages({
    'array.min': 'At least two options are required.',
  }),
  answer: Joi.string().required().messages({
    'string.empty': 'Answer is required.',
  }),
  category: Joi.string().optional(),
  difficulty: Joi.string().optional(),
  justification: Joi.string().optional(),
});

// Schema for question update
const updateQuestionSchema = Joi.object({
  question: Joi.string().optional(),
  options: Joi.array().items(Joi.string()).min(2).optional(),
  answer: Joi.string().optional(),
  category: Joi.string().optional(),
  difficulty: Joi.string().optional(),
  justification: Joi.string().optional(),
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema
  };