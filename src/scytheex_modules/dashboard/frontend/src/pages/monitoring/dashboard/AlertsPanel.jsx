// AlertsPanel.js
import React from "react";
import { DashTable } from "./DashboardComponents"; // Adjust the path based on your project structure
import GaugeChart from "react-gauge-chart"; // Import the GaugeChart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components

// Dummy data representing OSSEC alerts
const alertsData = [
  { id: 1, severity: "Critical", count: "120" },
  { id: 2, severity: "Warning", count: "100" },
  { id: 3, severity: "Informational", count: "80" },
  { id: 4, severity: "Warning", count: "50" },
];

// Dummy data for alert volume over time
const alertVolumeData = [
  { time: "00:00", critical: 10, warning: 5, informational: 2 },
  { time: "01:00", critical: 20, warning: 10, informational: 5 },
  { time: "02:00", critical: 15, warning: 7, informational: 3 },
  { time: "03:00", critical: 25, warning: 12, informational: 6 },
  { time: "04:00", critical: 30, warning: 15, informational: 8 },
  { time: "05:00", critical: 40, warning: 18, informational: 10 },
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
const columns = [{ header: "Count", key: "count" }];

const AlertsPanel = () => {
  const threatLevel = getThreatLevel(alertsData);
  const gaugeValue = calculateGaugeValue(alertsData); // Get the gauge value

  return (
    <div className="rounded-lg flex flex-col gap-4 mt-2">
      {/* Gauge Chart for Threat Level */}
      <h2 className="text-2xl font-bold">Alerts Overview</h2>

      <div className="p-6 rounded-lg bg-gray-900 w-full">
        <h3 className="font-bold text-lg text-blueGray-700">
          Alert Volume Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={alertVolumeData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="#ff0000"
              activeDot={{ r: 8 }}
              strokeWidth={3} // Thicker line for Critical alerts
            />
            <Line
              type="monotone"
              dataKey="warning"
              stroke="#ffcc00"
              strokeWidth={3} // Thicker line for Warning alerts
            />
            <Line
              type="monotone"
              dataKey="informational"
              stroke="#00ff00"
              strokeWidth={3} // Thicker line for Informational alerts
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg flex flex-row gap-4">
        <div className="mb-4 p-6 rounded-lg bg-gray-900 w-full">
          <h3 className="font-bold text-lg text-blueGray-700">
            Threat Level Gauge
          </h3>
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={3} // Number of levels in the gauge
            percent={gaugeValue} // Normalized value between 0 and 1
            colors={["#ff0000", "#ffcc00", "#00ff00"]} // Red, Yellow, Green
            arcWidth={0.3} // Width of the arc
            textColor="#FFF" // Text color
          />
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

        {/* Alerts Summary Table */}
        <div className="h-full w-full">
          <DashTable
            title="Alerts Summary"
            columns={columns}
            data={alertsData}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
