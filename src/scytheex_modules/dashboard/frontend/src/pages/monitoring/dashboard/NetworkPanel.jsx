// NetworkPanel.js
import React from "react";
import { DashTable } from "./DashboardComponents"; // Adjust the path based on your project structure
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"; // Import Recharts components

// Dummy data representing network traffic over time (Benign, Emotet, Dridex, Trickbot)
const trafficVolumeData = [
  { time: "00:00", Benign: 400, Emotet: 50, Dridex: 30, Trickbot: 20 },
  { time: "01:00", Benign: 380, Emotet: 70, Dridex: 40, Trickbot: 10 },
  { time: "02:00", Benign: 420, Emotet: 60, Dridex: 20, Trickbot: 30 },
  { time: "03:00", Benign: 390, Emotet: 80, Dridex: 25, Trickbot: 15 },
  { time: "04:00", Benign: 410, Emotet: 55, Dridex: 35, Trickbot: 25 },
  { time: "05:00", Benign: 430, Emotet: 45, Dridex: 20, Trickbot: 35 },
];

// Dummy data for pie chart representing network traffic
const trafficData = [
  { name: "Benign", value: 400 },
  { name: "Emotet", value: 300 },
  { name: "Dridex", value: 200 },
  { name: "Trickbot", value: 100 },
];

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#FF0000"]; // Custom colors for pie chart

const NetworkPanel = () => {
  return (
    <div className="rounded-lg flex flex-col gap-4 mt-2">
      {/* Network Traffic Overview */}
      <h2 className="text-2xl font-bold">Network Overview</h2>

      <div className="flex flex-row gap-4">
        {/* Line Chart for Network Traffic Over Time */}
        <div className="flex flex-col justify-start p-6 rounded-lg gap-4 bg-gray-900 w-full">
          <h3 className="font-bold text-lg text-blueGray-700">
            Network Traffic Over Time
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trafficVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Benign"
                stroke="#00C49F"
                strokeWidth={3} // Thicker line for Benign traffic
              />
              <Line
                type="monotone"
                dataKey="Emotet"
                stroke="#FF8042"
                strokeWidth={3} // Thicker line for Emotet traffic
              />
              <Line
                type="monotone"
                dataKey="Dridex"
                stroke="#FFBB28"
                strokeWidth={3} // Thicker line for Dridex traffic
              />
              <Line
                type="monotone"
                dataKey="Trickbot"
                stroke="#FF0000"
                strokeWidth={3} // Thicker line for Trickbot traffic
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Network Traffic Status */}
        <div className="rounded-lg flex flex-row gap-4 w-full">
          <div className="mb-4 p-6 rounded-lg bg-gray-900 w-full h-full">
            <h3 className="font-bold text-lg text-blueGray-700">
              Network Traffic Status
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {trafficData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPanel;
