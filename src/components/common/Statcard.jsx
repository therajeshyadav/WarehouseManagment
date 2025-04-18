import React from "react";
import { Card, CardContent } from "../ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="text-gray-600">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
