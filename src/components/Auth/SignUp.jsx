import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // You can store this user or send it to backend here
    alert("Account created successfully!");
    navigate("/login");
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
          <h2 className="text-lg font-semibold text-gray-800">Sign Up</h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">User Name</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition text-sm"
          >
            SIGN UP
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
