"use client";

import { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";

type Metrics = {
  tempC: number | null;
  precip_mm_day: number | null;
  solar: number | null;
};

export default function WeatherPage() {
  const [lat, setLat] = useState(36.5);
  const [lon, setLon] = useState(-98.0);
  const [data, setData] = useState<Metrics | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchMetrics() {
      try {
        const res = await fetch(`/api/metrics?lat=${lat}&lon=${lon}`);
        const json = await res.json();
        if (mounted && json.ok) setData(json);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [lat, lon]);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Weather Dashboard" />
      <div className="p-4 flex flex-col gap-4">
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
            className="ml-2 p-1 rounded bg-slate-700 text-white"
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(Number(e.target.value))}
            className="ml-2 p-1 rounded bg-slate-700 text-white"
          />
        </div>

        {data ? (
          <div className="bg-slate-800 p-4 rounded text-white">
            <p>Temperature: {data.tempC ?? "N/A"}°C</p>
            <p>Precipitation: {data.precip_mm_day ?? "N/A"} mm/day</p>
            <p>Solar: {data.solar ?? "N/A"} W/m²</p>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}
