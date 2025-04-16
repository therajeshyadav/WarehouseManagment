import React from "react";
import WarehouseMap from "../Map/WarehouseMap";
import AdminNavbar from "./AdminNavbar";
import { Routes, Route } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="map" element={<WarehouseMap />} />
        {/* Add other admin routes here later, like <Route path="users" element={<Users />} /> */}
      </Routes>
    </div>
  );
}

export default AdminDashboard;
