import React, { useState, useEffect } from "react";
import { useRedisSubscriber } from "../../../RedisSubscriber";
import { DashTable, DashboardCard } from "./DashboardComponents";
import {
  DashboardCardData,
  initialRows,
  trafficColumns,
  subColumns,
} from "./DashboardAssets";
import OverviewPanel from "./OverviewPanel"; // Adjust the path as necessary

function Dashboard() {
  const [rows, setRows] = useState(initialRows);

  const redisRows = useRedisSubscriber();

  useEffect(() => {
    // Format and merge the new rows with the existing ones
    const formattedRows = redisRows.map((row, index) => ({
      id: index + 1,
      duration: row.duration || "N/A",
      protocol: row.protocol || "N/A",
      sourceIP: row.sourceIP || "N/A",
      sourcePort: row.sourcePort || "N/A",
      destinationIP: row.destinationIP || "N/A",
      destinationPort: row.destinationPort || "N/A",
      flags: row.flags || "N/A",
      status: row.status || "N/A",
    }));

    // Merge formatted rows with existing rows and ensure the maximum length is 8
    const newRows = [...rows, ...formattedRows].slice(-8);

    setRows(newRows);
  }, [redisRows]);

  return (
    <div className="relative py-8">
      <div className="flex flex-wrap">
        {DashboardCardData.map((data, index) => (
          <DashboardCard key={index} {...data} />
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-bold">XDR Dashboard Overview</h1>
        <OverviewPanel />
      </div>
    </div>
  );
}

export default Dashboard;
