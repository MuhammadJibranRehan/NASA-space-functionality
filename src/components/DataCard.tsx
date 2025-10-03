"use client"
import { motion } from "framer-motion"

export default function DataCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800 p-4 rounded-lg shadow cursor-pointer"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </motion.div>
  )
}
