// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../util/store';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="fixed w-[20%] h-screen p-4 pt-10 shadow-lg">
      <nav className="space-y-4">
        <NavLink  style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })} to="/dashboard" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Dashboard
        </NavLink>
        <NavLink  style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })} to="/submit-question" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Submit Question
        </NavLink>
        <NavLink
         style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })} to="/feedback" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
          Feedback
        </NavLink>
        <NavLink  style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })} to="/api-key" className="block text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
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
