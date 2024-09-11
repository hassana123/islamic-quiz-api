import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitQuestionRequest,
  submitQuestionSuccess,
  submitQuestionFailure,
} from '../util/store';
import DashboardLayout from '../layouts/DashboardLayout';
const AddQuestionsPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.questions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch request action
    dispatch(submitQuestionRequest());

    try {
      // API call logic (replace with your backend logic)
      const response = await fetch('/api/submit-question', {
        method: 'POST',
        body: JSON.stringify({
          questionText,
          category,
          difficulty,
          answer,
          options,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      const data = await response.json();

      // Dispatch success action
      dispatch(submitQuestionSuccess(data));

      // Clear the form on success
      setQuestionText('');
      setCategory('');
      setDifficulty('');
      setAnswer('');
      setOptions(['', '', '', '']);
    } catch (error) {
      // Dispatch failure action
      dispatch(submitQuestionFailure(error.message));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <DashboardLayout>
    <section className="p-3">
      <h1 className="text-2xl font-bold mb-4">Submit a New Question</h1>
      {loading && <p>Submitting question...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Question submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg mb-2">Question</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Islamic History">Islamic History</option>
            <option value="Quranic Studies">Quranic Studies</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-primary text-[#fff] px-4 py-2 rounded"
          disabled={loading}
        >
          Submit Question
        </button>
      </form>
    </section>
    </DashboardLayout>
  );
};

export default AddQuestionsPage;