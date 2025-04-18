import React from "react";
import { Button } from "../ui/button";

const QuickActions = () => (
  <div className="flex justify-center gap-4 my-6">
    <Button className="bg-blue-500 text-white px-6 py-4 text-lg">
      📦 Store Product
    </Button>
    <Button className="bg-blue-500 text-white px-6 py-4 text-lg">
      🔍 Retrieve Product
    </Button>
    <Button className="bg-blue-500 text-white px-6 py-4 text-lg">
      📍 View Warehouse Map
    </Button>
  </div>
);

export default QuickActions;
