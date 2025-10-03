"use client";

import { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";

type EconomyData = {
  revenue: number;
  cost: number;
  profit: number;
};

export default function EconomyPage() {
  const [data, setData] = useState<EconomyData | null>(null);

  useEffect(() => {
    async function fetchEconomy() {
      try {
        const res = await fetch("/api/metrics?lat=36.5&lon=-98.0");
        const json = await res.json();

        // Simple simulated economy based on precipitation
        const revenue = (json.precip_mm_day ?? 0) * 10;
        const cost = 50;
        const profit = revenue - cost;

        setData({ revenue, cost, profit });
      } catch (err) {
        console.error(err);
      }
    }

    fetchEconomy();
    const interval = setInterval(fetchEconomy, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Farm Economy" />
      <div className="p-4 grid gap-4">
        {data ? (
          <>
            <div className="bg-slate-800 p-4 rounded text-white">
              <p>Revenue: ${data.revenue.toFixed(2)}</p>
              <p>Cost: ${data.cost.toFixed(2)}</p>
              <p>Profit: ${data.profit.toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p className="text-white">Calculating economy...</p>
        )}
      </div>
    </div>
  );
}
