// src/services/quizService.js
import axiosInstance from "./axios";

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
