import Topbar from "../../components/Topbar"

export default function FarmDashboard() {
  return (
    <>
      <Topbar title="Farm Dashboard" />
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">🌦 Weather Overview</h3>
          <p className="text-slate-300">Real-time weather and soil moisture overlays.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">📈 Market Economy</h3>
          <p className="text-slate-300">Track crop prices and supply chains.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">🌱 Sustainability</h3>
          <p className="text-slate-300">Monitor carbon footprint and water use efficiency.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">⚡ Challenges</h3>
          <p className="text-slate-300">Test crisis scenarios like droughts or pests.</p>
        </div>
      </div>
    </>
  )
}
