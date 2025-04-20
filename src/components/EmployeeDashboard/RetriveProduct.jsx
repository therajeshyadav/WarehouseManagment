import React, { useState } from "react";
import axios from "axios";
import WarehouseMap from "../common/WarehouseMap";

function RetrieveProduct() {
  const [rackId, setRackId] = useState("");
  const [compartmentId, setCompartmentId] = useState("");
  const [prodId, setProdId] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrieved, setRetrieved] = useState(false);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    if (!rackId || !compartmentId || !prodId) {
      setError("❌ Please provide Rack ID, Compartment ID, and Product ID");
      return;
    }

    setLoading(true);
    setError("");
    setProductData(null);
    setRetrieved(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in again");

      const url = `http://localhost:8087/warehouse/retrieve/${rackId}/${compartmentId}/${prodId}`;
      console.log("Request URL:", url);
      console.log("Token (partial):", token.substring(0, 10) + "...");

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      setProductData(response.data);
      setRetrieved(true);
    } catch (err) {
      setError(
        "❌ Failed to retrieve product: " +
          (err.response?.data?.message || err.message)
      );
      console.error("Full error:", err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📦 Retrieve Product</h2>
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="number"
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          placeholder="Enter Rack ID"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          value={compartmentId}
          onChange={(e) => setCompartmentId(e.target.value)}
          placeholder="Enter Compartment ID"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          value={prodId}
          onChange={(e) => setProdId(e.target.value)}
          placeholder="Enter Product ID"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          onClick={handleRetrieve}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading || !rackId || !compartmentId || !prodId}
        >
          {loading ? "Retrieving..." : "Mark as Retrieved"}
        </button>
      </div>

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {productData && (
        <div className="mt-6 bg-green-50 p-4 rounded shadow text-sm text-green-800">
          <p>
            <strong>✅ Retrieved Successfully!</strong>
          </p>
          <p>Product ID: {productData.prodId}</p>
          <p>Name: {productData.prodName}</p>
          <p>
            Location: Rack {productData.rackId}, Compartment{" "}
            {productData.compartmentId}
          </p>
          <p>Action: {productData.action}</p>
          <p>Employee ID: {productData.empId}</p>
          <p>
            Time of Movement:{" "}
            {new Date(productData.timeOfMovement).toLocaleString()}
          </p>
          <p>Movement ID: {productData.movementId}</p>
          <WarehouseMap
            highlightPathTo={{
              rack: productData.rackId,
              row: productData.compartmentId,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default RetrieveProduct;
