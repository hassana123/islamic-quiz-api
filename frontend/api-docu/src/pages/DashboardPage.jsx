import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
  const token = localStorage.getItem('token');
  let username = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    username = decodedToken.username; // Adjust this depending on the token structure
  }
  return (
    <DashboardLayout>
      <div className="w-[80%] mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-4">Salam, {username}!</h1>
        <p className="text-[20px] mb-6">Welcome to your dashboard. Here’s a quick overview of what you can do:</p>

        <div className="space-y-4 text-[#fff]">
          <div className="p-4 bg-lightGreen  rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">📚 Submit Questions</h2>
            <p>
              Contribute to our quiz database by submitting your own questions. 
              Share your knowledge and help others learn more about Islamic topics.
            </p>
          </div>

          <div className="p-4 bg-customGreen rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">🔑 Generate API Keys</h2>
            <p>
              Access our Islamic Quiz API by generating API keys. Use these keys to integrate our questions into your own applications.
            </p>
          </div>

          <div className="p-4 bg-lightGreen rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">💬 Drop Feedback</h2>
            <p>
              We value your feedback! Let us know what you think about the platform, suggest improvements, or report any issues you encounter.
            </p>
          </div>

          <div className="p-4 bg-customGreen rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">🔍 Explore</h2>
            <p>
              Dive into the available resources, explore the quiz database, and discover new features designed to enhance your learning experience.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>

  );
};

export default Dashboard;
