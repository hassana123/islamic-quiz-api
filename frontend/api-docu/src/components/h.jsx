import React from 'react';

const QuestionCard = ({ question }) => {
  return (
    <div className="w-[80%] bg-[#fff] p-4 rounded-lg shadow-md snap-center m-2">
      <h3 className="text-lg font-semibold">{question.question}</h3>
      <p className="text-customGreen mt-2">Category: {question.category}</p>
      <p className="text-highlight">Difficulty: {question.difficulty}</p>
      <ul className="mt-4">
        {question.options.map((option, index) => (
          <li key={index} className="">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
