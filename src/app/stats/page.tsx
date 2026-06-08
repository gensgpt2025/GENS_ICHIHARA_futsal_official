import React from 'react'
import Link from 'next/link'
import StatsClient from '@/components/stats/StatsClient'
import { getSchedule } from '@/lib/content/schedule'
import { getStats } from '@/lib/content/stats'
import { getTeam } from '@/lib/content/team'

export const revalidate = 300

export default async function StatsPage() {
  const [schedule, stats, team] = await Promise.all([getSchedule(), getStats(), getTeam()])
  const members = [...team.players, ...team.guestMembers]

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-garamond text-3xl font-bold gold-gradient lg:text-4xl">Stats</h1>
        </div>

        <StatsClient schedule={schedule} stats={stats} members={members} />

        <div className="mt-12 flex justify-center pb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-xl"
          >
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
