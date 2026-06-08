import { getSchedule } from '@/lib/content/schedule'
import { getStats } from '@/lib/content/stats'
import { getTeam } from '@/lib/content/team'
import MatchesClient from '@/components/matches/MatchesClient'

export const revalidate = 300

export default async function MatchesPage() {
  const [items, stats, team] = await Promise.all([getSchedule(), getStats(), getTeam()])
  const matchItems = items.filter((i) => i.type === 'match' || i.type === 'league')
  const members = [...team.players, ...team.guestMembers]
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">Matches</h1>
        </div>
        <MatchesClient items={matchItems} stats={stats} members={members} />
      </div>
    </div>
  )
}

