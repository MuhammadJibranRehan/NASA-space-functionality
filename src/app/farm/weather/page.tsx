"use client"
import useSWR from "swr"
import Topbar from "../../../components/Topbar"

const fetcher = (u: string) => fetch(u).then(r => r.json())

export default function FarmWeather() {
  const { data } = useSWR("/api/nasa/power?lat=35&lon=-97", fetcher, { refreshInterval: 1000 })
  return (
    <>
      <Topbar title="Weather & Soil Moisture" />
      <div className="p-6">
        <pre className="bg-slate-800 p-4 rounded-lg text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </>
  )
}
