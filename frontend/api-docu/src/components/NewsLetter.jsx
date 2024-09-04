import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the subscription logic here, e.g., sending the email to your server or API
    console.log('Subscribed with:', email);
    setEmail(''); // Clear the input after submission
  };

  return (
    <div className="w-full mt-[100px] p-5 bg-primary shadow-md rounded-md text-[#fff]">
      <h2 className="text-2xl font-bold text-center mb-4">Subscribe To Our Newsletter</h2>
      <form onSubmit={handleSubmit} className="md:flex items-center md:space-y-0 space-y-5 md:w-[50%] mx-auto md:space-x-5">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className=" bg-[#fff] text-primary w-[40%] text-lg font-semibold py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
