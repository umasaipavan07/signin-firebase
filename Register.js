import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const navigate = useNavigate();

  const { fullname, email, password, confirmpassword } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post('https://signinpage-702c8-default-rtdb.firebaseio.com/register.json', data);
      alert('Registration successful');
      navigate('/login'); // Navigate to Login Page
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-background">
      <form className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm transform transition-transform hover:scale-105" autoComplete="off" onSubmit={submitHandler}>
        <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Registration Form</h1>
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
          type="text"
          name="fullname"
          value={fullname}
          onChange={changeHandler}
          placeholder="Enter your name"
          required
        />
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="Enter your email"
          required
        />
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          placeholder="Enter your password"
          required
        />
        <input
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
          type="password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={changeHandler}
          placeholder="Confirm your password"
          required
        />
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 w-full rounded-lg hover:from-indigo-600 hover:to-purple-500 transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          type="submit"
        >
          Submit
        </button>
        <p className="mt-6 text-center text-white">
          Already have an account? <Link to="/login" className="text-yellow-300 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
    