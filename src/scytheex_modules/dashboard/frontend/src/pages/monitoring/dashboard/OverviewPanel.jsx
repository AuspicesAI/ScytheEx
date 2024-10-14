// OverviewPanel.js
import React from "react";
import { DashTable } from "./DashboardComponents"; // Adjust the path based on your project structure
import GaugeChart from "react-gauge-chart"; // Import the GaugeChart

// Dummy data representing OSSEC alerts
const alertsData = [
  {
    id: 1,
    severity: "Critical",
    timestamp: "2024-10-01T12:00:00Z",
    alertType: "SSH Brute Force",
    status: "New",
  },
  {
    id: 2,
    severity: "Warning",
    timestamp: "2024-10-01T12:05:00Z",
    alertType: "Unauthorized Access Attempt",
    status: "Acknowledged",
  },
  {
    id: 3,
    severity: "Informational",
    timestamp: "2024-10-01T12:10:00Z",
    alertType: "File Integrity Check",
    status: "Resolved",
  },
  {
    id: 4,
    severity: "Critical",
    timestamp: "2024-10-01T12:15:00Z",
    alertType: "Malware Detected",
    status: "New",
  },
  {
    id: 5,
    severity: "Warning",
    timestamp: "2024-10-01T12:20:00Z",
    alertType: "Port Scan Detected",
    status: "New",
  },
];

// Sample function to get the threat level based on alert severity
const getThreatLevel = (alerts) => {
  const severityCount = {
    Critical: 0,
    Warning: 0,
    Informational: 0,
  };

  alerts.forEach((alert) => {
    severityCount[alert.severity]++;
  });

  if (severityCount.Critical > 0) return "Critical";
  if (severityCount.Warning > 0) return "Warning";
  return "Low";
};

// Calculate the gauge value based on the number of critical and warning alerts
const calculateGaugeValue = (alerts) => {
  const criticalCount = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;
  const warningCount = alerts.filter(
    (alert) => alert.severity === "Warning"
  ).length;

  // Simple logic: Critical = 1, Warning = 0.5, Informational = 0
  const value = (criticalCount * 1 + warningCount * 0.5) / alerts.length; // Normalize to a value between 0 and 1
  return value;
};

// Define the columns for the DashTable
const columns = [
  { header: "Severity", key: "severity" },
  { header: "Timestamp", key: "timestamp" },
  { header: "Alert Type", key: "alertType" },
];

const OverviewPanel = () => {
  const threatLevel = getThreatLevel(alertsData);
  const gaugeValue = calculateGaugeValue(alertsData); // Get the gauge value

  return (
    <div className="rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Overview Panel</h2>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Total Alerts</h3>
        <p className="text-2xl font-bold">{alertsData.length}</p>
      </div>

      {/* Threat Level Indicator */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Threat Level</h3>
        <div
          className={`text-center py-2 rounded-md ${
            threatLevel === "Critical"
              ? "bg-red-500 text-white"
              : threatLevel === "Warning"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <p className="text-2xl font-bold">{threatLevel}</p>
        </div>
      </div>

      {/* Gauge Chart for Threat Level */}
      <div className="mb-4 bg-grey-900">
        <h3 className="text-lg font-medium">Threat Level Gauge</h3>
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={3} // Number of levels in the gauge
          percent={gaugeValue} // Normalized value between 0 and 1
          colors={["#ff0000", "#ffcc00", "#00ff00"]} // Red, Yellow, Green
          arcWidth={0.3} // Width of the arc
          textColor="#000" // Text color
        />
      </div>

      <DashTable title="Alerts Summary" columns={columns} data={alertsData} />
    </div>
  );
};

export default OverviewPanel;
