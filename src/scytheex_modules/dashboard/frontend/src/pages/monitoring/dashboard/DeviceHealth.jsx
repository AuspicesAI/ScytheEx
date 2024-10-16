// DeviceHealth.js
import React from "react";
import { FaMemory, FaHdd, FaMicrochip, FaHeartbeat } from "react-icons/fa"; // Icons for device health
import { DashTable } from "./DashboardComponents"; // Adjust the path based on your project structure

// Dummy data representing OSSEC system health data
const deviceHealthData = {
  cpuUsage: 65, // CPU usage in percentage
  memoryUsage: 75, // Memory usage in percentage
  diskUsage: 55, // Disk usage in percentage
  lastHealthCheck: "2024-10-15 12:30:45", // Last health check timestamp
  status: "Healthy", // Overall device status
};

// Progress bar colors based on health status
const getProgressColor = (value) => {
  if (value < 50) return "bg-green-500";
  if (value < 75) return "bg-yellow-500";
  return "bg-red-500";
};

// DeviceHealth component
const DeviceHealth = () => {
  const { cpuUsage, memoryUsage, diskUsage, lastHealthCheck, status } =
    deviceHealthData;

  return (
    <div className="rounded-lg flex flex-col gap-2">
      {/* Title Section */}
      <h2 className="text-2xl font-bold text-white">Device Health</h2>

      {/* Health Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900 p-6 rounded-lg">
        {/* CPU Usage */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">CPU Usage</h3>
            <FaMicrochip className="text-2xl text-gray-400" />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${getProgressColor(cpuUsage)}`}
              style={{ width: `${cpuUsage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{cpuUsage}%</p>
        </div>

        {/* Memory Usage */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Memory Usage</h3>
            <FaMemory className="text-2xl text-gray-400" />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${getProgressColor(memoryUsage)}`}
              style={{ width: `${memoryUsage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{memoryUsage}%</p>
        </div>

        {/* Disk Usage */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Disk Usage</h3>
            <FaHdd className="text-2xl text-gray-400" />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${getProgressColor(diskUsage)}`}
              style={{ width: `${diskUsage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{diskUsage}%</p>
        </div>

        {/* Last Health Check */}
        <div className="bg-gray-800 p-4 rounded-lg col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Last Health Check
            </h3>
            <FaHeartbeat className="text-2xl text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">{lastHealthCheck}</p>
          <div
            className={`mt-4 py-2 rounded-md text-center ${
              status === "Healthy"
                ? "bg-green-500 text-white"
                : status === "Warning"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <p className="text-2xl font-bold">{status}</p>
          </div>
        </div>
      </div>

      {/* Optional: Recent Health Events Table */}
      <div className="mt-6">
        <DashTable
          title="Recent Health Events"
          columns={[
            { header: "Event", key: "event" },
            { header: "Timestamp", key: "timestamp" },
            { header: "Severity", key: "severity" },
          ]}
          data={[
            {
              event: "High CPU Usage",
              timestamp: "2024-10-15 12:00",
              severity: "Warning",
            },
            {
              event: "Disk Full",
              timestamp: "2024-10-15 11:50",
              severity: "Critical",
            },
            {
              event: "Normal Operation",
              timestamp: "2024-10-15 11:30",
              severity: "Informational",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DeviceHealth;
