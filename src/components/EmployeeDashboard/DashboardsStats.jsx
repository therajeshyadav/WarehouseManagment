import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

function DashboardStats() {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // WebSocket setup
    const socket = new SockJS("http://localhost:8087/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        stompClient.subscribe("/topic/daily-counts", (message) => {
          console.log("Received WebSocket message:", message.body);
          const data = JSON.parse(message.body);
          setCounts(data);
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
        });

        fetchCounts(); // Initial fetch
      },
      onStompError: (frame) => {
        console.error("❌ WebSocket error:", frame);
        setError("❌ WebSocket error: " + frame.headers["message"]);
        setLoading(false);
      },
      onClose: (frame) => {
        console.log("WebSocket connection closed", frame);
        setError("❌ WebSocket disconnected");
        setLoading(false);
      },
    });

    stompClient.activate();

    // Cleanup WebSocket connection on component unmount
    return () => {
      stompClient.deactivate();
      console.log("🔌 Disconnected from WebSocket");
    };
  }, []);

  const fetchCounts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8087/warehouse/daily-counts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCounts(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("❌ Failed to fetch daily counts:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "❌ Failed to fetch daily counts"
      );
    } finally {
      setLoading(false);
    }
  };

  // Debugging: Log counts and loading state changes
  useEffect(() => {
    console.log("Counts state updated:", counts);
  }, [counts]);

  useEffect(() => {
    console.log("Loading state updated:", loading);
  }, [loading]);

  return (
    <div className="p-4 bg-white rounded shadow sticky top-0">
      <h2 className="text-xl font-bold mb-2">📊 Daily Warehouse Activity</h2>
      {loading && <p>🔄 Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {counts && (
        <div className="bg-gray-100 p-3 rounded space-y-2">
          <p>
            <strong>Stored Today:</strong> {counts.storedCount}
          </p>
          <p>
            <strong>Retrieved Today:</strong> {counts.retrievedCount}
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-600">
              ⏱️ Last updated at: {lastUpdated}
            </p>
          )}
        </div>
      )}
      {!loading && !error && !counts && <p>No activity recorded today.</p>}
    </div>
  );
}

export default DashboardStats;
