"use client";

import { useEffect, useState } from "react";
import { testConnection } from "@/lib/firestore";

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    "Testing..." | "Connected!" | "Connection failed" | "Connection error"
  >("Testing...");

  useEffect(() => {
    let isMounted = true;

    const checkConnection = async () => {
      try {
        const isConnected = await testConnection();
        if (isMounted) {
          setConnectionStatus(isConnected ? "Connected!" : "Connection failed");
        }
      } catch (error) {
        if (isMounted) {
          setConnectionStatus("Connection error");
          console.error("Connection test error:", error);
        }
      }
    };

    checkConnection();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg">
      <p className="text-sm">
        Database Status:{" "}
        <span
          className={`font-bold ${
            connectionStatus === "Connected!"
              ? "text-green-600" 
              : "text-red-600"
          }`}
        >
          {connectionStatus}
        </span>
      </p>
    </div>
  );
}
