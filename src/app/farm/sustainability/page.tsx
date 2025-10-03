"use client";

import { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";

type SustainabilityData = {
  soilMoisture: number | null;
  waterUsed: number | null;
};

export default function SustainabilityPage() {
  const [data, setData] = useState<SustainabilityData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/metrics?lat=36.5&lon=-98.0");
        const json = await res.json();
        const soilMoisture = json.precip_mm_day ?? 0;
        const waterUsed = soilMoisture * 0.8;

        setData({ soilMoisture, waterUsed });
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Farm Sustainability" />
      <div className="p-4 grid gap-4">
        {data ? (
          <div className="bg-slate-800 p-4 rounded text-white">
            <p>Soil Moisture: {data.soilMoisture?.toFixed(2)} mm/day</p>
            <p>Water Used: {data.waterUsed?.toFixed(2)} L</p>
          </div>
        ) : (
          <p className="text-white">Loading sustainability metrics...</p>
        )}
      </div>
    </div>
  );
}
