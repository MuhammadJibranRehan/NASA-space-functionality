"use client"
import { motion } from "framer-motion"

export default function Topbar({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-slate-900 border-b border-slate-700 p-4 flex justify-between items-center shadow"
    >
      {/* Page title */}
      <h2 className="font-semibold text-xl flex items-center gap-2">
        🚀 {title}
      </h2>

      {/* Search + Button */}
      <div className="flex items-center gap-3">
        <input
          placeholder="Search location..."
          className="px-3 py-1 rounded bg-slate-800 text-slate-200 focus:outline-none focus:ring focus:ring-emerald-600"
        />
        <button className="bg-emerald-600 px-4 py-1.5 rounded-lg hover:bg-emerald-500 transition">
          🔗 Connect NASA
        </button>
      </div>
    </motion.div>
  )
}
