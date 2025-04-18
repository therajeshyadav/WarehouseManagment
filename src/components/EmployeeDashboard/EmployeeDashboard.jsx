import React, { useState } from "react";
import Navbar from "../common/Navbar";
import DashboardStats from "./dashboardsStats";
import StoreProduct from "./StoreProduct";
import RetrieveProduct from "./RetriveProduct";
import WarehouseMap from "../common/WarehouseMap";
import { Button } from "../ui/button";

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "store":
        return <StoreProduct />;
      case "retrieve":
        return <RetrieveProduct />;
      case "map":
        return (
          <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">Warehouse Map</h2>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Map Display */}
              <div className="flex-1 min-h-[400px] bg-gray-100 rounded-lg p-4 flex justify-center items-center">
                <WarehouseMap />
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-80 space-y-4">
                <input
                  type="text"
                  placeholder="Search product"
                  className="w-full border px-3 py-2 rounded"
                />
                <Button className="w-full">Path</Button>
                <div className="bg-blue-100 text-blue-900 p-3 rounded">
                  <strong>Rack G6</strong>
                  <p>Least retrieved</p>
                  <p>Last accessed 10 min ago</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
                    Full
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>
                    Partial
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <Button
                className="text-lg px-6 py-4 w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("store")}
              >
                📦 Store Product
              </Button>
              <Button
                className="text-lg px-6 py-4 w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("retrieve")}
              >
                🔁 Retrieve Product
              </Button>
              <Button
                className="text-lg px-6 py-4 w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setActiveTab("map")}
              >
                📍 View Warehouse Map
              </Button>
            </div>

            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Embedded Map Preview */}
            <div className="bg-white p-6 rounded shadow mt-6">
              <h2 className="text-xl font-bold mb-4">Warehouse Map</h2>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Map Display */}
                <div className="flex-1 min-h-[400px] bg-gray-100 rounded-lg p-4 flex justify-center items-center">
                  <WarehouseMap />
                </div>

                {/* Info Panel */}
                <div className="w-full lg:w-80 space-y-4">
                  <input
                    type="text"
                    placeholder="Search product"
                    className="w-full border px-3 py-2 rounded"
                  />
                  <Button className="w-full">Path</Button>
                  <div className="bg-blue-100 text-blue-900 p-3 rounded">
                    <strong>Rack G6</strong>
                    <p>Least retrieved</p>
                    <p>Last accessed 10 min ago</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
                      Full
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>
                      Partial
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        tabs={[
          { label: "Dashboard", value: "dashboard" },
          { label: "Store Product", value: "store" },
          { label: "Retrieve Product", value: "retrieve" },
          { label: "Warehouse Map", value: "map" },
        ]}
        onTabChange={(tab) => setActiveTab(tab)}
      />
      <div className="p-6">{renderContent()}</div>
    </div>
  );
}
