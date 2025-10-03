import Topbar from "../../../components/Topbar"
import DataViewer from "../../../components/DataViewer"

export default function SoilMoisture() {
  return (
    <>
      <Topbar title="Soil Moisture Data" />
      <div className="p-6">
        <p className="text-slate-300 mb-2">Live data from NASA POWER API (updates every second)</p>
        <DataViewer endpoint="/api/nasa/power?lat=35&lon=-97" />
      </div>
    </>
  )
}
