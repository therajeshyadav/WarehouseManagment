// App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Pages/HomePage1";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import Signup from "./components/Auth/SignUp";
import "./App.css";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (email, password, role, navigate) => {
    if (role === "admin" && email === "a@e.com" && password === "123") {
      setUserRole("admin");
      setIsAuthenticated(true);
      navigate("/admin-dashboard");
    } else if (
      role === "employee" &&
      email === "employee@example.com" &&
      password === "employee123"
    ) {
      setUserRole("employee");
      setIsAuthenticated(true);
      navigate("/employee-dashboard");
    } else {
      alert("Invalid credentials or role");
    }
  };
  const handleSignup = (email, password, role, navigate) => {
    // In real life, you'd save this in a database
    alert(`Account created for ${role}: ${email}`);
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />

      <Route
        path="/admin-dashboard/*"
        element={
          isAuthenticated && userRole === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/employee-dashboard"
        element={
          isAuthenticated && userRole === "employee" ? (
            <EmployeeDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
