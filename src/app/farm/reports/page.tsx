"use client";

import { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchMetrics() {
      const res = await fetch("/api/metrics?lat=36.5&lon=-98.0");
      const json = await res.json();
      setData(json);
    }
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Farm Reports" />
      <div className="p-4">
        {data ? (
          <pre className="bg-slate-800 p-4 rounded text-white">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-white">Loading reports...</p>
        )}
      </div>
    </div>
  );
}
