// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../util/store';
// apikey= 5beac9f6633217756bc4c311bcf98aa3d63e493fd41bf95cd3544f4c522d0a88
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="bg-gray-50 h-screen p-4 shadow-lg">
      <nav className="space-y-4">
        <NavLink to="/dashboard" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Dashboard
        </NavLink>
        <NavLink to="/submit-questions" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Submit Questions
        </NavLink>
        <NavLink to="/feedback" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Feedback
        </NavLink>
        <NavLink to="/api-key" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Get API Key
        </NavLink>
      </nav>
      <div className="pt-4 mt-[40px] border-t border-primary">
        <button onClick={handleLogout} className="block text-red-500 hover:bg-red-100 p-2 rounded-lg">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
