import React from "react";
import WarehouseMap from "../common/WarehouseMap";
import AdminNavbar from "./AdminNavbar";
import { Routes, Route } from "react-router-dom";
import ConfigureWarehouse from "./ConfigureWarehouse";

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="map" element={<WarehouseMap />} />
        {/* Add other admin routes here later, like <Route path="users" element={<Users />} /> */}

        <Route path="map" element={<WarehouseMap />} />
        <Route path="configure" element={<ConfigureWarehouse />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
