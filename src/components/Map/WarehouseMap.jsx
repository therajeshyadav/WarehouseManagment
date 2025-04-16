import React, { useRef, useEffect, useState } from "react";
import PF from "pathfinding";

const WarehouseMap = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [selectedRack, setSelectedRack] = useState(null);
  const [pathLength, setPathLength] = useState(null);
  const gridSize = 10;

  // Define racks with coordinates and product data
  const racks = [
    // Track Storage (left side, 3 rows of racks)
    {
      id: 1,
      x: 50,
      y: 50,
      width: 50,
      height: 100,
      products: ["Engine Parts", "Tires", "Brakes"],
    },
    {
      id: 2,
      x: 110,
      y: 50,
      width: 50,
      height: 100,
      products: ["Wheels", "Suspension", "Filters"],
    },
    {
      id: 3,
      x: 170,
      y: 50,
      width: 50,
      height: 100,
      products: ["Oil", "Batteries", "Spark Plugs"],
    },
    // Order Picking (right side, 3 rows of racks)
    {
      id: 4,
      x: 350,
      y: 50,
      width: 50,
      height: 100,
      products: ["Packages A", "Packages B", "Packages C"],
    },
    {
      id: 5,
      x: 410,
      y: 50,
      width: 50,
      height: 100,
      products: ["Boxes X", "Boxes Y", "Boxes Z"],
    },
    {
      id: 6,
      x: 470,
      y: 50,
      width: 50,
      height: 100,
      products: ["Items 1", "Items 2", "Items 3"],
    },
  ];

  // Define non-walkable areas (walls, offices, lounge, etc.)
  const obstacles = [
    // Top wall
    { x: 0, y: 0, width: 600, height: 10 },
    // Left wall
    { x: 0, y: 0, width: 10, height: 400 },
    // Right wall
    { x: 590, y: 0, width: 10, height: 400 },
    // Bottom wall
    { x: 0, y: 390, width: 600, height: 10 },
    // Office (bottom left)
    { x: 10, y: 300, width: 100, height: 90 },
    // Office (bottom center)
    { x: 110, y: 350, width: 100, height: 40 },
    // Lounge (top right)
    { x: 500, y: 10, width: 90, height: 90 },
    // Quality Assurance (right of lounge)
    { x: 500, y: 110, width: 90, height: 90 },
    // Loading area (bottom right)
    { x: 500, y: 300, width: 90, height: 90 },
    // Conveyor belt (simplified as a non-walkable area)
    { x: 10, y: 200, width: 200, height: 20 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    // Draw obstacles (walls, offices, etc.)
    obstacles.forEach((obstacle) => {
      ctx.fillStyle = "#d3e5f5";
      ctx.strokeStyle = "#007bff";
      ctx.lineWidth = 1;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw racks
    racks.forEach((rack) => {
      ctx.fillStyle = rack.id === selectedRack?.id ? "#aaffaa" : "#ccc";
      ctx.fillRect(rack.x, rack.y, rack.width, rack.height);
      ctx.fillStyle = "black";
      ctx.font = "10px Arial";
      ctx.fillText(`Rack ${rack.id}`, rack.x + 5, rack.y + 15);
    });

    // Draw labels for sections
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Track Storage", 50, 40);
    ctx.fillText("Order Picking", 350, 40);
    ctx.fillText("Office", 20, 320);
    ctx.fillText("Office", 120, 370);
    ctx.fillText("Lounge", 510, 30);
    ctx.fillText("Quality Assurance", 510, 130);
    ctx.fillText("Loading", 510, 320);
    ctx.fillText("Inbound Goods", 50, 20);
    ctx.fillText("Outbound Goods", 550, 250);

    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });

    // Calculate and draw shortest path
    if (points.length === 2) {
      const grid = new PF.Grid(width / gridSize, height / gridSize);

      // Mark racks as non-walkable
      racks.forEach((rack) => {
        for (
          let x = rack.x / gridSize;
          x < (rack.x + rack.width) / gridSize;
          x++
        ) {
          for (
            let y = rack.y / gridSize;
            y < (rack.y + rack.height) / gridSize;
            y++
          ) {
            grid.setWalkableAt(x, y, false);
          }
        }
      });

      // Mark obstacles as non-walkable
      obstacles.forEach((obstacle) => {
        for (
          let x = obstacle.x / gridSize;
          x < (obstacle.x + obstacle.width) / gridSize;
          x++
        ) {
          for (
            let y = obstacle.y / gridSize;
            y < (obstacle.y + obstacle.height) / gridSize;
            y++
          ) {
            grid.setWalkableAt(x, y, false);
          }
        }
      });

      const finder = new PF.AStarFinder({
        heuristic: PF.Heuristic.manhattan,
        weight: 1,
      });
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
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      path.forEach(([x, y], index) => {
        const canvasX = x * gridSize + gridSize / 2;
        const canvasY = y * gridSize + gridSize / 2;
        if (index === 0) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
      });
      ctx.stroke();
    } else {
      setPathLength(null);
    }
  }, [points, selectedRack]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedRack = racks.find(
      (rack) =>
        x >= rack.x &&
        x <= rack.x + rack.width &&
        y >= rack.y &&
        y <= rack.y + rack.height
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

  const reset = () => {
    setPoints([]);
    setSelectedRack(null);
    setPathLength(null);
  };

  return (
    <div className="warehouse-map">
      <h2>Warehouse Tracking Map</h2>
      <p>Click two points for the shortest path or a rack for product info.</p>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleClick}
        style={{ border: "1px solid #000", cursor: "pointer" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={reset} style={{ padding: "5px 10px" }}>
          Reset
        </button>
        {pathLength !== null && (
          <span style={{ marginLeft: "10px" }}>
            Shortest Path Length: {pathLength} units
          </span>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {selectedRack ? (
          <div>
            <h3>Rack {selectedRack.id} Information</h3>
            <p>
              <strong>Products Stored:</strong>
            </p>
            <ul>
              {selectedRack.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Select a rack to see product details.</p>
        )}
      </div>
    </div>
  );
};

export default WarehouseMap;
