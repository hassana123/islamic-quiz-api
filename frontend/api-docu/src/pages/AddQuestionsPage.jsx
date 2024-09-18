import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitQuestionRequest,
  submitQuestionSuccess,
  submitQuestionFailure,
} from '../util/store';
import DashboardLayout from '../layouts/DashboardLayout';
import { AddQuestions } from '../util/quizService';
import categories  from '../util/categories';

const AddQuestionsPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [answer, setAnswer] = useState('');
  const [justification, setJustification] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.questions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch request action
    dispatch(submitQuestionRequest());

    try {
      // Call AddQuestions API
      const data = await AddQuestions(
        questionText,
        category,
        difficulty,
        options,
        answer,
        justification
      );

      // Dispatch success action
      dispatch(submitQuestionSuccess(data));

      // Mark the form as submitted
      setIsSubmitted(true);
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

  const handleReset = () => {
    // Reset form fields after success
    setQuestionText('');
    setCategory('');
    setDifficulty('');
    setAnswer('');
    setOptions(['', '', '', '']);
    setJustification('');
    setIsSubmitted(false); // Hide the success card and show the form again
  };

  console.log(questionText, answer, justification, category, difficulty, options);

  return (
    <DashboardLayout>
      <section className="p-3">
        <h1 className="text-2xl font-bold mb-4">Submit a New Question</h1>

       

        {/* Show error message if submission fails */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Show success card if question is submitted */}
        {isSubmitted && success && (
          <div className="bg-green-200 p-4 rounded shadow-lg mb-4">
            <h2 className="text-xl font-bold text-green-700 mb-2">Question submitted successfully!</h2>
            <p>Your question has been added to the quiz.</p>
            <button
              onClick={handleReset}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              OK, Continue
            </button>
          </div>
        )}

        {/* Form to add new question, hidden if submission is successful */}
        {!isSubmitted && (
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
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
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
              <label className="block text-lg mb-2">Justification</label>
              <input
                type="text"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-[#fff] px-4 py-2 rounded"
              disabled={loading}
            >
             {loading? "submitting question.....":" Submit Question"}
            </button>
          </form>
        )}
      </section>
    </DashboardLayout>
  );
};

export default AddQuestionsPage;
