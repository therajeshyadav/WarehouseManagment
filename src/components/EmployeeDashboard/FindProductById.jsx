import React, { useState } from "react";
import { Button } from "../ui/button";

export default function FindProductById() {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch product data based on the entered product ID
  const fetchProductData = async () => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(null);
    setProductData(null);

    try {
      // Make a request to your API to fetch product data by ID
      const response = await fetch(`/api/products/${productId}`); // Update with your actual API URL
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Find Product by ID</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter product ID"
          className="w-full border px-3 py-2 rounded"
        />
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={fetchProductData}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Search Product"}
        </Button>

        {/* Display product data or error message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {productData && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold">Product Details</h3>
            <p>
              <strong>Product ID:</strong> {productData.id}
            </p>
            <p>
              <strong>Name:</strong> {productData.name}
            </p>
            <p>
              <strong>Location:</strong> {productData.location}
            </p>
            <p>
              <strong>Status:</strong> {productData.status}
            </p>
            <p>
              <strong>Last Accessed:</strong> {productData.lastAccessed}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
