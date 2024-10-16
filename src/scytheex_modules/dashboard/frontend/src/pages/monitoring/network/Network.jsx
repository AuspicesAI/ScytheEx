import React, { useState, useEffect } from "react";
import { useRedisSubscriber } from "../../../RedisSubscriber";
import { DashTable, NetworkCard } from "./NetworkComponents";
import {
  NetworkCardData,
  initialRows,
  trafficColumns,
  subColumns,
} from "./NetworkAssets";

function Network() {
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
    <div className="relative py-8 px-6">
      <div className="flex flex-row gap-4">
        {NetworkCardData.map((data, index) => (
          <NetworkCard key={index} {...data} />
        ))}
      </div>
      <div className="my-4 md:my-6 mx-auto w-full">
        <div className="flex flex-wrap">
          <DashTable
            title="Latest Traffic"
            columns={trafficColumns}
            data={rows}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <DashTable
            title="Malicious Traffic"
            columns={subColumns}
            data={rows.filter(
              (row) =>
                row.status !== "Background" && row.status !== "LEGITIMATE"
            )}
          />
          <DashTable
            title="Benign Traffic"
            columns={subColumns}
            data={rows.filter(
              (row) =>
                row.status === "Background" || row.status === "LEGITIMATE"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Network;
