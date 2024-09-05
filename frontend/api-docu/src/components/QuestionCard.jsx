import React from 'react';

const QuestionCard = ({ question, expandedQuestion, onToggleDetails, onSelectQuestion, isSelected }) => (
  <div key={question._id} className="border space-y-3 p-2 rounded">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelectQuestion(question)}
        className="mr-2"
      />
      <h2 className="text-lg font-bold">{question.question}</h2>
      <button onClick={() => onToggleDetails(question)} className="ml-auto text-blue-500">
        {expandedQuestion === question ? "Hide Details" : "View Details"}
      </button>
    </div>
    
    {expandedQuestion === question && (
      <div className="mt-2 space-y-2">
        <p className="font-semibold">Correct Answer: {question.answer}</p>
        <b>Options:</b>
        <ul className="list-disc ml-5">
          {question.options.map((option, index) => <li key={index}>{option}</li>)}
        </ul>
        <p><b className="mr-2">Justification:</b>{question.justification}</p>
      </div>
    )}
  </div>
);

export default QuestionCard;
