"use client"
import { motion } from "framer-motion"

export default function ChallengeCard({ title, color, emoji }: { title: string, color: string, emoji: string }) {
  return (
    <motion.div
      whileHover={{ rotate: 2, scale: 1.05 }}
      className={`${color} p-4 rounded-lg text-white font-semibold`}
    >
      {emoji} {title}
    </motion.div>
  )
}
