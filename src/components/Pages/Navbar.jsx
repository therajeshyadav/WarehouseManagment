import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-semibold flex items-center space-x-2">
        <img
          src="/assets/images/Logo.png"
          alt="Logo"
          className="w-10 h-10 object-contain rounded-full"
        />
      </div>

      {/* Links */}
      <ul className="hidden md:flex space-x-6 list-none text-gray-800 ">
        <li className="cursor-pointer hover:text-blue-600">Home Page</li>
        <li className="cursor-pointer hover:text-blue-600">About Us</li>
      </ul>

      {/* Join Button */}
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
