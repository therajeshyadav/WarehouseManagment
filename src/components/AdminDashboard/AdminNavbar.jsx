import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Users", path: "/admin-dashboard/users" },
    { label: "Inventory", path: "/admin-dashboard/inventory" },
    { label: "Warehouse Map", path: "/admin-dashboard/map" },
    { label: "Orders", path: "/admin-dashboard/orders" },
    { label: "Reports", path: "/admin-dashboard/reports" },
    { label: "Settings", path: "/admin-dashboard/settings" },
    { label: "Configure", path: "/admin-dashboard/configure" },
  ];

  const handleLogout = () => {
    // Example logout logic
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="text-2xl font-bold tracking-wide">Admin Panel</div>

      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="text-sm hover:text-blue-400 transition"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
