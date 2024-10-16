import React, { useEffect, useState } from "react";
// import { fetchActiveResponses, initiateResponse } from "./ossecAPI"; // Replace with your actual OSSEC API call functions
import { DashTable } from "../../monitoring/network/NetworkComponents"; // Adjust the path based on your project structure

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

// Dummy Data (Replace with data fetched from OSSEC)
const activeResponseData = [
  {
    id: 1,
    action: "IP Block",
    target: "192.168.1.2",
    status: "Success",
    timestamp: "2024-10-10 10:30:00",
  },
  {
    id: 2,
    action: "Firewall Lockdown",
    target: "192.168.1.5",
    status: "Pending",
    timestamp: "2024-10-10 09:50:00",
  },
  {
    id: 3,
    action: "Login Ban",
    target: "user01",
    status: "Failed",
    timestamp: "2024-10-10 08:30:00",
  },
];

const alertVolumeData = [
  { time: "00:00", critical: 10, warning: 5, informational: 2 },
  { time: "01:00", critical: 20, warning: 10, informational: 5 },
  { time: "02:00", critical: 15, warning: 7, informational: 3 },
  { time: "03:00", critical: 25, warning: 12, informational: 6 },
  { time: "04:00", critical: 30, warning: 15, informational: 8 },
  { time: "05:00", critical: 40, warning: 18, informational: 10 },
];

// Columns for the DashTable
const columns = [
  { header: "Action", key: "action" },
  { header: "Target", key: "target" },
  { header: "Timestamp", key: "timestamp" },
];

const ActiveResponse = () => {
  const [activeResponses, setActiveResponses] = useState([]);

  useEffect(() => {
    // Fetch data from OSSEC API
    const fetchData = async () => {
      const data = await fetchActiveResponses(); // Replace with actual API call
      setActiveResponses(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Active Response Management</h2>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-blueGray-700">
          Active Response Summary
        </h3>
        <p className="text-gray-400">
          Overview of recent active responses taken by OSSEC
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Active Response Table */}
        <div className="rounded-lg bg-gray-900 p-6">
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
        <div className="rounded-lg">
          <DashTable
            title="Recent Active Responses"
            columns={columns}
            data={activeResponses.length ? activeResponses : activeResponseData} // Use fetched data or dummy data if empty
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveResponse;
