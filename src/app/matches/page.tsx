import { getSchedule } from '@/lib/content/schedule'
import MatchesClient from '@/components/matches/MatchesClient'

export const revalidate = 300

export default async function MatchesPage() {
  const items = await getSchedule()
  const matchItems = items.filter((i) => i.type === 'match')
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">Matches</h1>
        </div>
        <MatchesClient items={matchItems} />
      </div>
    </div>
  )
}

