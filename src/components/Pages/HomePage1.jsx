import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      {/* Background Image with opacity */}
      <img
        src="assets/images/home.jpg" // Your background image
        alt="Warehouse Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* Overlay for slight dark layer (optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Optimize Your Warehouse Like Never Before
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Our smart warehouse system reduces retrieval time and improves space
          utilization with intelligent dashboards and real-time inventory
          tracking.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
        >
          signup
        </button>
      </div>

      {/* Extra Styling: Bottom white slant (optional) */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-white rounded-t-[100px] -z-10" />
    </div>
  );
};

export default HomePage1;
