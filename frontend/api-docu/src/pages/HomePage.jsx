import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/questions', {
          params: {
            category,
            difficulty,
            searchTerm,
          },
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [searchTerm, category, difficulty]);

  useEffect(() => {
    const filterQuestions = () => {
      let filtered = questions;
      if (searchTerm) {
        filtered = filtered.filter(q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (category) {
        filtered = filtered.filter(q => q.category === category);
      }
      if (difficulty) {
        filtered = filtered.filter(q => q.difficulty === difficulty);
      }
      setFilteredQuestions(filtered);
    };

    filterQuestions();
  }, [questions, searchTerm, category, difficulty]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, filteredQuestions.length - 1));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          {/* Add more category options here */}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="relative">
        {filteredQuestions.length > 0 ? (
          <div className="question-slide py-5">
            <div className="question-container">
              <h2 className="text-xl font-semibold">{filteredQuestions[currentIndex].question}</h2>
              <p>Category: {filteredQuestions[currentIndex].category || 'N/A'}</p>
              <p>Difficulty: {filteredQuestions[currentIndex].difficulty || 'N/A'}</p>
              <ul>
                {filteredQuestions[currentIndex].options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-5 btransform -translate-y-1/2 p-2 bg-gray-300 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="absolute right-0 top-5 transform -translate-y-1/2 p-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
