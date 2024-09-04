import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold text-primary mb-4">IslamicQuizAPI</h2>
            <p className="text-gray-600">
              Your go-to platform for authentic Islamic quizzes and knowledge.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10">
            <NavLink to="/" className="text-gray-600 hover:text-primary">
              Home
            </NavLink>
            <NavLink to="/dashboard" className="text-gray-600 hover:text-primary">
              Api
            </NavLink>
            <NavLink to="/feat" className="text-gray-600 hover:text-primary">
              Features
            </NavLink>
            <NavLink to="/docs" className="text-gray-600 hover:text-primary">
              Docs
            </NavLink>
            <NavLink to="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </NavLink>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} IslamicQuizAPI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
