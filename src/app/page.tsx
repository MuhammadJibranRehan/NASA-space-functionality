"use client";
import Link from "next/link";
import DataWidget from "../components/DataWidget";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🚀 Farm Navigator</h1>
        <div className="flex gap-3">
          <Link href="/farm" className="px-4 py-2 bg-emerald-600 rounded">Farm</Link>
          <Link href="/data" className="px-4 py-2 bg-sky-600 rounded">Data Hub</Link>
        </div>
      </header>

      <main className="grid lg:grid-cols-3 gap-6">
        <section className="col-span-2 space-y-4">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="bg-slate-800 p-4 rounded">
            <h2 className="text-xl font-semibold">Live Farm Snapshot</h2>
            <p className="text-sm text-slate-300">Real-time values updated every second.</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <DataWidget title="Primary Location" lat={36.5} lon={-98.0} />
              <DataWidget title="Nearby" lat={36.6} lon={-97.8} />
              <DataWidget title="Alternate" lat={36.4} lon={-98.2} />
            </div>
          </motion.div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="bg-slate-800 p-4 rounded">
            <h3 className="font-semibold">Farm Dashboard</h3>
            <p className="text-sm text-slate-300 mb-3">Open the full farm dashboard for all modules.</p>
            <Link href="/farm" className="px-4 py-2 bg-emerald-600 rounded">Open Dashboard</Link>
          </motion.div>
        </section>

        <aside className="space-y-4">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="bg-slate-800 p-4 rounded">
            <h4 className="font-semibold">Status</h4>
            <p className="text-slate-300 text-sm">API proxy: /api/nasa/power and /api/metrics. Polled every second; server caches 5s.</p>
          </motion.div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25}} className="bg-slate-800 p-4 rounded">
            <h4 className="font-semibold">Tips</h4>
            <ul className="text-slate-300 text-sm list-disc pl-5">
              <li>NASA POWER updates with a small delay; we pick latest valid value from the last 7 days.</li>
              <li>Latency: client polls every 1s; server caches for 5s to avoid rate limits.</li>
            </ul>
          </motion.div>
        </aside>
      </main>
    </div>
  );
}
