import React, { useState } from "react";
import axios from "axios";
import WarehouseMap from "../common/WarehouseMap"; // assumes you already have this

function RetrieveProduct() {
  const [productCode, setProductCode] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrieved, setRetrieved] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    setLoading(true);
    setError("");
    setProductData(null);
    setRetrieved(false);

    try {
      const response = await axios.get(`/api/products/${productCode}`);
      setProductData(response.data);
    } catch (err) {
      setError("Product not found!");
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieve = async () => {
    try {
      await axios.put(`/api/products/${productCode}/retrieve`);
      setRetrieved(true);
    } catch (err) {
      setError("Failed to mark as retrieved");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Retrieve Product</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Enter or scan product code"
          className="border px-4 py-2 rounded w-1/3"
        />
        <button
          onClick={handleScan}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Scan
        </button>
      </div>

      {loading && <p>Loading product info...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {productData && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="text-lg font-semibold">Product Info:</h3>
          <p>
            <strong>Name:</strong> {productData.name}
          </p>
          <p>
            <strong>Location:</strong> Rack {productData.rack}, Row{" "}
            {productData.row}
          </p>

          <WarehouseMap
            highlightPathTo={{ rack: productData.rack, row: productData.row }}
          />

          {!retrieved ? (
            <button
              onClick={handleRetrieve}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Mark as Retrieved
            </button>
          ) : (
            <p className="text-green-600 mt-4">
              ✅ Product Retrieved Successfully!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RetrieveProduct;
