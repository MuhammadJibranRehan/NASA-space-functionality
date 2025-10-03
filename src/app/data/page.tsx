import Topbar from "../../components/Topbar"
import DataCard from "../../components/DataCard"

export default function DataHub() {
  return (
    <>
      <Topbar title="NASA Data Hub" />
      <div className="p-6 grid grid-cols-2 gap-4">
        <DataCard title="Soil Moisture" description="Track soil health in real-time" icon="🌍" />
        <DataCard title="Vegetation" description="Monitor crop growth and land use" icon="🌱" />
        <DataCard title="Precipitation" description="Rainfall and storm data" icon="🌧" />
        <DataCard title="Temperature" description="Daily max/min from NASA satellites" icon="🌡" />
        <DataCard title="Evapotranspiration" description="Water cycle impacts" icon="💧" />
        <DataCard title="Crop Type" description="Identify global crop coverage" icon="🌾" />
        <DataCard title="NASA Tools" description="Worldview, Giovanni, AppEEARS" icon="🛰" />
      </div>
    </>
  )
}
