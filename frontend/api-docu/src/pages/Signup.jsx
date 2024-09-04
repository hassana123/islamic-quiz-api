// src/components/Signup.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from '../util/store';
import { useNavigate, NavLink } from 'react-router-dom';

const Signup = () => {
  // const [errMsg, setErrMsg] = useState("");
  // const [succesMsg, setSuccesMsg] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error,  success } = useSelector((state) => state.auth);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    }

    return () => clearTimeout(timeout);
  }, [success, navigate]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(registerFailure(null)); // Clear error after 3 seconds
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure("Passwords do not match \n Registration failed"));
      return;
    }

    dispatch(registerRequest());
    try {
      const response = await axios.post('https://islamic-quiz-api.vercel.app/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      dispatch(registerSuccess("Account Created Successfully! \n Proceed to Login."));
    } catch (error) {
      dispatch(registerFailure(error.response?.data?.message || 'Registration failed \n Could not Create Account \n Please try again later'));
    }
  };
  console.log(formData);
  

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-[#fff] shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create New Account</h2>
      {error && <p className="text-redish text-1xl text-center font-bold">{error}</p>}
      {success && <p className="text-highlight text-1xl text-center font-bold">{succes}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700">Retype Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-[#fff] text-lg font-semibold py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already a member?{' '}
          <NavLink to="/login" className="text-primary hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
