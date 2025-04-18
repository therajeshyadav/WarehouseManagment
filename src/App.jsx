import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Pages/HomePage1";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import "./App.css";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // 🆕 loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false); // ✅ Once done checking
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/admin-dashboard/*"
        element={
          isAuthenticated && userRole === "ADMIN" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/employee-dashboard/*"
        element={
          isAuthenticated && userRole === "EMPLOYEE" ? (
            <EmployeeDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
