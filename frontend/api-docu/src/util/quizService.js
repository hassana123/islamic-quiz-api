// src/services/quizService.js
import axiosInstance from './axios';

export const fetchQuestions = async (category, difficulty) => {
  try {
    const response = await axiosInstance.get('/questions', {
      params: { category, difficulty },
      headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

export const AddQuestions = async (questionText, category, difficulty, options, answer, justification) => {
  try {
    const response = await axiosInstance.post('/questions', 
      {
        question: questionText,
        options,
        answer,
        justification,
        category,
        difficulty
      },

      {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json' // Ensure JSON format
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add question:', error);
    throw error;
  }
};
