import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';
import QuestionCard from '../components/QuestionCard'; // A card component to display each question

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://islamic-quiz-api.vercel.app/questions", {
          params: { page, category, difficulty },
          headers: {
            'x-api-key': 'Bearer 5beac9f6633217756bc4c311bcf98aa3d63e493fd41bf95cd3544f4c522d0a88'
          }
        });
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [page, category, difficulty]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <DashboardLayout>
      <div className="filter-section p-4 bg-white rounded-lg shadow-md flex justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more categories as needed */}
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="question-slider mt-6">
        <div className="flex overflow-x-scroll snap-x">
          {questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))}
        </div>
        <div className="pagination-controls mt-4 flex justify-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="ml-4 px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
