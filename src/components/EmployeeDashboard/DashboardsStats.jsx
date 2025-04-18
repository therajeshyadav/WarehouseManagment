import React from "react";
import StatCard from "../common/Statcard";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-4 text-center mb-6">
      <StatCard title="Products Stored Today" value="125" />
      <StatCard title="Average Retrieval Time" value="2.5 min" />
      <StatCard title="Most Retrieved Item" value="Item A" />
      <StatCard title="High Traffic Racks" value="Rack I" />
    </div>
  );
}
