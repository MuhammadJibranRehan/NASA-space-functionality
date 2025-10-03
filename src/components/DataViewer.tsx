"use client"
import useSWR from "swr"

const fetcher = (u: string) => fetch(u).then(r => r.json())

export default function DataViewer({ endpoint }: { endpoint: string }) {
  const { data } = useSWR(endpoint, fetcher, { refreshInterval: 1000 })
  return (
    <div className="bg-slate-800 p-4 rounded-lg mt-4 overflow-auto text-sm">
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading NASA data..."}
    </div>
  )
}
