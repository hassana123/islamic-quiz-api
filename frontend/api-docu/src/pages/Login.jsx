// src/components/Login.js
import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../util/axios";
import { loginRequest, loginSuccess, loginFailure } from "../util/store";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        navigate("/dashboard");
        dispatch(loginSuccess(null));
      }, 2000); // Redirect after 3 seconds
    }

    return () => clearTimeout(timeout);
  }, [success, navigate]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(loginFailure(null)); // Clear error after 3 seconds
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

    dispatch(loginRequest());

    try {
      const response = await axiosInstance.post(
        "/login",
        {
          "email": formData.email,
          "password": formData.password,
        }
      );

      dispatch(loginSuccess("Login Succesful"));
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      console.log(error);
    }
  };
  console.log(localStorage.getItem("token"));

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-[#fff] shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {error && <p className="text-redish font-bold text-center text-xl">{error}</p>}
      {success && <p className="text-highlight font-bold text-center text-xl">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-primary text-[#fff] text-lg font-semibold py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-primary hover:underline">
            Create New Account
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default Login;
