import Topbar from "../../../components/Topbar"
import ChallengeCard from "../../../components/ChallengeCard"

export default function FarmChallenges() {
  return (
    <>
      <Topbar title="Challenges" />
      <div className="p-6 grid grid-cols-2 gap-4">
        <ChallengeCard title="Water Crisis" color="bg-red-700" emoji="💧" />
        <ChallengeCard title="Market Collapse" color="bg-yellow-700" emoji="📉" />
        <ChallengeCard title="Pest Outbreak" color="bg-green-700" emoji="🐛" />
        <ChallengeCard title="Climate Event" color="bg-blue-700" emoji="🌪" />
      </div>
    </>
  )
}
