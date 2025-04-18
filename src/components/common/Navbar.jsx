// src/components/common/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ tabs, onTabChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-blue-900 text-white p-4">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className="hover:underline"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
