import React, { useState } from "react";
import WarehouseMap from "../common/WarehouseMap";

export default function StoreProduct() {
  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("ELECTRONIC");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [rackId, setRackId] = useState("");
  const [compartmentId, setCompartmentId] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    const payload = {
      prodName,
      category,
      size: parseFloat(size),
      weight: parseFloat(weight),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8087/warehouse/store/${rackId}/${compartmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Something went wrong while storing product"
        );
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRackSelect = (rack) => {
    setRackId(rack.id);
    setCompartmentId(rack.products?.[0]?.split(" ")[1] || "");
  };

  return (
    <div className="max-w-8xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Store Product</h2>

      <div className="flex gap-12">
        {/* Left side: Map */}
        <div className="flex-1 p-4 bg-gray-800 text-white  shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            🗺️ Select Rack from Map
          </h3>
          <WarehouseMap onRackSelect={handleRackSelect} />
        </div>

        {/* Right side: Form */}
        <div className="flex-1 p-6  shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ELECTRONICS">Electronic</option>
                <option value="FURNITURE">Furniture</option>
                <option value="CLOTHING">Clothing</option>
                <option value="FOOD">Food</option>
              </select>
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                placeholder="Size (in cubic meters)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                placeholder="Weight (in kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Rack ID"
                value={rackId}
                onChange={(e) => setRackId(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Compartment ID"
                value={compartmentId}
                onChange={(e) => setCompartmentId(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Storing..." : "Store Product"}
              </button>
            </div>
          </form>

          {response && (
            <div className="mt-6 bg-green-50 p-4 rounded shadow text-sm text-green-800">
              <p>
                <strong>✅ Stored Successfully!</strong>
              </p>
              <p>Product ID: {response.prodId}</p>
              <p>Time: {response.timeOfMovement}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600 font-medium">❌ {error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
