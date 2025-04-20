import React, { useRef, useEffect, useState } from "react";
import PF from "pathfinding";

const WarehouseMap = () => {
  const canvasRef = useRef(null);
  const [racks, setRacks] = useState([]);
  const [points, setPoints] = useState([]);
  const [selectedRack, setSelectedRack] = useState(null);
  const [pathLength, setPathLength] = useState(null);
  const gridSize = 10;

  const obstacles = [
    { x: 0, y: 0, width: 600, height: 10 },
    { x: 0, y: 0, width: 10, height: 400 },
    { x: 590, y: 0, width: 10, height: 400 },
    { x: 0, y: 390, width: 600, height: 10 },
    { x: 10, y: 300, width: 100, height: 90 },
    { x: 110, y: 350, width: 100, height: 40 },
    { x: 500, y: 10, width: 90, height: 90 },
    { x: 500, y: 110, width: 90, height: 90 },
    { x: 500, y: 300, width: 90, height: 90 },
    { x: 10, y: 200, width: 200, height: 20 },
  ];

  // 🛠️ Configure warehouse and fetch racks
  const configureWarehouse = async () => {
    const data = {
      totalArea: 1000,
      racks: [
        { capacity: 100, numberOfCompartments: 4 },
        { capacity: 120, numberOfCompartments: 3 },
        { capacity: 80, numberOfCompartments: 2 },
      ],
    };

    try {
      const response = await fetch(
        "http://localhost:8080/warehouse/configure",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      const configuredRacks = result.racks || [];

      const mapped = configuredRacks.map((rack, index) => ({
        id: rack.rackId,
        x: 50 + (index % 3) * 80,
        y: 50 + Math.floor(index / 3) * 130,
        width: 50,
        height: 100,
        products: rack.compartmentIds.map((id) => `Compartment ${id}`),
      }));

      setRacks(mapped);
    } catch (err) {
      console.error("Error configuring warehouse:", err);
    }
  };

  // 🎨 Draw canvas on change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);

    obstacles.forEach((obs) => {
      ctx.fillStyle = "#e0e0e0";
      ctx.strokeStyle = "#ccc";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    });

    racks.forEach((rack) => {
      ctx.fillStyle = rack.id === selectedRack?.id ? "#90ee90" : "#adb5bd";
      ctx.fillRect(rack.x, rack.y, rack.width, rack.height);
      ctx.fillStyle = "#000";
      ctx.font = "10px Arial";
      ctx.fillText(`Rack ${rack.id}`, rack.x + 5, rack.y + 15);
    });

    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    if (points.length === 2) {
      const grid = new PF.Grid(width / gridSize, height / gridSize);

      [...racks, ...obstacles].forEach((block) => {
        for (
          let x = block.x / gridSize;
          x < (block.x + block.width) / gridSize;
          x++
        ) {
          for (
            let y = block.y / gridSize;
            y < (block.y + block.height) / gridSize;
            y++
          ) {
            grid.setWalkableAt(x, y, false);
          }
        }
      });

      const finder = new PF.AStarFinder({ heuristic: PF.Heuristic.manhattan });
      const start = [
        Math.floor(points[0].x / gridSize),
        Math.floor(points[0].y / gridSize),
      ];
      const end = [
        Math.floor(points[1].x / gridSize),
        Math.floor(points[1].y / gridSize),
      ];
      const path = finder.findPath(start[0], start[1], end[0], end[1], grid);
      setPathLength(path.length - 1);

      ctx.beginPath();
      ctx.strokeStyle = "#007bff";
      ctx.lineWidth = 3;
      path.forEach(([x, y], index) => {
        const canvasX = x * gridSize + gridSize / 2;
        const canvasY = y * gridSize + gridSize / 2;
        index === 0
          ? ctx.moveTo(canvasX, canvasY)
          : ctx.lineTo(canvasX, canvasY);
      });
      ctx.stroke();
    } else {
      setPathLength(null);
    }
  }, [points, selectedRack, racks]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedRack = racks.find(
      (r) => x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height
    );

    if (clickedRack) {
      setSelectedRack(clickedRack);
      setPoints([]);
    } else if (points.length < 2) {
      const snappedX = Math.round(x / gridSize) * gridSize;
      const snappedY = Math.round(y / gridSize) * gridSize;
      setPoints([...points, { x: snappedX, y: snappedY }]);
      setSelectedRack(null);
    }
  };

  return (
    <div style={{ background: "#fff", padding: "16px", borderRadius: "10px" }}>
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search product"
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => {
            setPoints([]);
            setSelectedRack(null);
            setPathLength(null);
          }}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
          }}
        >
          Reset
        </button>
        <button
          onClick={configureWarehouse}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
          }}
        >
          Configure Warehouse
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={handleClick}
          style={{
            border: "1px solid #ced4da",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        />
        <div style={{ width: "250px" }}>
          {pathLength !== null && (
            <p>
              <strong>Shortest Path:</strong> {pathLength} units
            </p>
          )}

          {selectedRack ? (
            <div
              style={{
                background: "#e3f2fd",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <h4>Rack {selectedRack.id}</h4>
              <p>
                <strong>Compartments:</strong>
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                {selectedRack.products.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ color: "#666" }}>Click a rack to view products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseMap;
