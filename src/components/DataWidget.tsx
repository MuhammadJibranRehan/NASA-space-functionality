// src/components/DataWidget.tsx
"use client";
import { useEffect, useState } from "react";

export default function DataWidget({ lat = 36.5, lon = -98.0, title = "Weather" }: { lat?: number; lon?: number; title?: string }) {
  const [metrics, setMetrics] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    async function fetchOne() {
      try {
        const res = await fetch(`/api/metrics?lat=${lat}&lon=${lon}`);
        const js = await res.json();
        if (mounted) setMetrics(js);
      } catch (e) {
        // ignore
      }
    }
    fetchOne();
    const id = setInterval(fetchOne, 1000); // 1s realtime update
    return () => { mounted = false; clearInterval(id); };
  }, [lat, lon]);

  const temp = metrics?.tempC ?? null;
  const precip = metrics?.precip_mm_day ?? null;
  const solar = metrics?.solar ?? null;

  function fmt(v: any, unit = "") {
    if (v === null || v === undefined) return <>N/A</>;
    return <>{String(v)}{unit}</>;
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow text-slate-100">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm text-slate-400">{title}</div>
          <div className="text-xs text-slate-500">Lat {lat} • Lon {lon}</div>
        </div>
        <div className="text-xs text-slate-400">{metrics ? new Date(metrics.timestamp).toLocaleTimeString() : "—"}</div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2">
        <div className="flex justify-between">
          <div className="text-sm text-slate-300">Temp</div>
          <div className="font-semibold">{fmt(temp, " °C")}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-slate-300">Precip</div>
          <div className="font-semibold">{fmt(precip, " mm/day")}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-slate-300">Solar</div>
          <div className="font-semibold">{fmt(solar, " W/m²")}</div>
        </div>
      </div>
    </div>
  );
}
