// src/components/DashNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DashNav = () => {
  const token = localStorage.getItem('token');
  let username = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    username = decodedToken.username; // Adjust this depending on the token structure
  }

  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-6">
      <NavLink to="/" className="text-xl font-bold">IslamicQuestionsAPI</NavLink>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search something..."
          className="border rounded-lg py-1 px-4"
        />
        <div>{username}</div>
      </div>
    </div>
  );
};

export default DashNav;
