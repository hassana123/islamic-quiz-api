// src/services/quizService.js
import axios from 'axios';

const API_KEY = '5beac9f6633217756bc4c311bcf98aa3d63e493fd41bf95cd3544f4c522d0a88';
const BASE_URL = 'https://islamic-quiz-api.vercel.app/questions';

export const fetchQuestions = async (category, difficulty) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { category, difficulty },
      headers: { 'x-api-key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};
