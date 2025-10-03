"use client";

import Link from "next/link";
import Topbar from "../../components/Topbar";

export default function FarmDashboard() {
  const cards = [
    {
      title: "🌦 Weather Overview",
      description: "Real-time weather and soil moisture overlays.",
      href: "/farm/weather",
      color: "bg-blue-800",
    },
    {
      title: "📈 Market Economy",
      description: "Track crop prices and supply chains.",
      href: "/farm/economy",
      color: "bg-emerald-800",
    },
    {
      title: "🌱 Sustainability",
      description: "Monitor carbon footprint and water use efficiency.",
      href: "/farm/sustainability",
      color: "bg-lime-800",
    },
    {
      title: "⚡ Challenges",
      description: "Test crisis scenarios like droughts or pests.",
      href: "/farm/challenges",
      color: "bg-amber-800",
    },
    {
      title: "🌾 Simulation",
      description: "3D interactive farm simulation with dynamic growth.",
      href: "/farm/simulation",
      color: "bg-teal-800",
    },
    {
      title: "📊 Reports",
      description: "View farm performance reports and statistics.",
      href: "/farm/reports",
      color: "bg-indigo-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Topbar title="Farm Dashboard" />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`${card.color} p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300`}
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-slate-200">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
