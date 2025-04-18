import React, { useState } from "react";

export default function ConfigureWarehouse() {
  const [totalArea, setTotalArea] = useState("");
  const [racks, setRacks] = useState([
    { capacity: "", numberOfCompartments: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleRackChange = (index, field, value) => {
    const newRacks = [...racks];
    newRacks[index][field] = value;
    setRacks(newRacks);
  };

  const addRack = () => {
    setRacks([...racks, { capacity: "", numberOfCompartments: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      totalArea: parseFloat(totalArea),
      racks: racks.map((r) => ({
        capacity: parseFloat(r.capacity),
        numberOfCompartments: parseInt(r.numberOfCompartments),
      })),
    };

    try {
      const res = await fetch("http://localhost:8087/warehouse/configure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to configure warehouse");

      setMessage("✅ Warehouse configured successfully!");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Configure Warehouse</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Total Area"
          value={totalArea}
          onChange={(e) => setTotalArea(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {racks.map((rack, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="number"
              placeholder="Rack Capacity"
              value={rack.capacity}
              onChange={(e) =>
                handleRackChange(index, "capacity", e.target.value)
              }
              required
              className="border px-2 py-1 rounded w-1/2"
            />
            <input
              type="number"
              placeholder="Compartments"
              value={rack.numberOfCompartments}
              onChange={(e) =>
                handleRackChange(index, "numberOfCompartments", e.target.value)
              }
              required
              className="border px-2 py-1 rounded w-1/2"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addRack}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          ➕ Add Rack
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Configure
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
