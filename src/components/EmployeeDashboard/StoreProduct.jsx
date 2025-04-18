import React, { useState } from "react";

export default function StoreProduct() {
  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [rackId, setRackId] = useState(""); // ✅ new
  const [compartmentId, setCompartmentId] = useState(""); // ✅ new

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
      const res = await fetch(
        `http://localhost:8087/warehouse/store/${rackId}/${compartmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok)
        throw new Error("Something went wrong while storing product");

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">📦 Store Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={prodName}
          onChange={(e) => setProdName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="ELECTRONICS">Electronics</option>
          <option value="FURNITURE">Furniture</option>
          <option value="CLOTHING">Clothing</option>
          <option value="FOOD">Food</option>
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Size (in cubic meters)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Weight (in kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* ✅ New rackId & compartmentId */}
        <input
          type="number"
          placeholder="Rack ID"
          value={rackId}
          onChange={(e) => setRackId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Compartment ID"
          value={compartmentId}
          onChange={(e) => setCompartmentId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Storing..." : "Store Product"}
        </button>
      </form>

      {/* Response Section */}
      {response && (
        <div className="mt-6 bg-green-50 p-4 rounded shadow text-sm text-green-800">
          <p>
            <strong>✅ Stored Successfully!</strong>
          </p>
          <p>Product ID: {response.prodId}</p>
          <p>Time: {response.timeOfMovement}</p>
        </div>
      )}

      {error && <div className="mt-4 text-red-600 font-medium">❌ {error}</div>}
    </div>
  );
}
