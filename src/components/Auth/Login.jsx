// src/components/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8087/auth/login", {
        email,
        password,
      });

      if (response.data.accessToken) {
        const role = response.data.role?.toUpperCase();

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", role);

        setSuccess("Login successful! Redirecting...");
        onLogin(); // ✅ Update App.jsx auth state

        // Navigate to dashboard
        if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "EMPLOYEE") {
          navigate("/employee-dashboard");
        } else {
          setError("Unknown role. Contact admin.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please check your email or password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-200 relative p-4 overflow-auto">
      <img
        src="/assets/images/bg.webp"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <img
            src="/assets/images/Chakravyuh.png"
            alt="Logo"
            className="mx-auto w-24 mb-2"
          />
          <h2 className="text-lg font-semibold text-gray-800">Login</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition text-sm"
          >
            LOGIN
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-4 text-center">
          Terms & Conditions • Privacy Policy
        </div>
        <div className="text-xs text-center mt-2">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
