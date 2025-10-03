  "use client";

  import dynamic from "next/dynamic";
  import { useState } from "react";
  import Topbar from "../../../components/Topbar";

  // Dynamically import FarmScene to fully disable SSR
  const FarmScene = dynamic(() => import("../../../components/FarmScene"), {
    ssr: false,
  });

  export default function SimulationPage() {
    const [lat, setLat] = useState(36.5);
    const [lon, setLon] = useState(-98.0);

    return (
      <div className="min-h-screen flex flex-col">
        <Topbar title="3D Farm Simulation" />
        <div className="p-4 flex-1 grid lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-slate-900 rounded overflow-hidden">
            <div className="h-[72vh]">
              <FarmScene lat={lat} lon={lon} />
            </div>
          </div>

          <aside className="bg-slate-800 p-4 rounded text-slate-200">
            <div className="mb-3">
              <label className="block text-sm">Latitude</label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full mt-1 p-2 rounded bg-slate-700"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Longitude</label>
              <input
                type="number"
                value={lon}
                onChange={(e) => setLon(Number(e.target.value))}
                className="w-full mt-1 p-2 rounded bg-slate-700"
              />
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("spawnSeed"))}
              className="w-full py-2 bg-emerald-600 rounded"
            >
              Plant seed
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("waterField"))}
              className="w-full py-2 bg-amber-500 rounded mt-2"
            >
              Irrigate
            </button>
          </aside>
        </div>
      </div>
    );
  }
