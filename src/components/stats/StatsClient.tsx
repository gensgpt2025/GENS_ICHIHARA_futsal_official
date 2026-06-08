'use client'

import React, { useMemo, useState } from 'react'
import { Calendar, Target, Users } from 'lucide-react'
import type { ScheduleItem } from '@/types/schedule'
import type { StatItem } from '@/types/stats'
import type { PlayerRow } from '@/lib/mappers'

type PlayerStatRow = {
  memberId: number
  name: string
  number: number
  goals: number
  assists: number
}

type JoinedStat = StatItem & {
  event: ScheduleItem
  member: PlayerRow | undefined
}

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function formatDate(dateString: string) {
  return parseLocalDate(dateString).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}

function getSeasonYear(dateString: string): number {
  const [, month] = dateString.split('-').map(Number)
  const year = Number(dateString.slice(0, 4))
  return month >= 4 ? year : year - 1
}

function playerLabel(row: PlayerStatRow) {
  return row.name
}

function aggregateStats(rows: JoinedStat[]): PlayerStatRow[] {
  const map = new Map<number, PlayerStatRow & { eventIds: Set<string> }>()
  for (const row of rows) {
    const memberId = row.member?.id || row.memberId
    const current = map.get(memberId) || {
      memberId,
      name: row.member?.name || `member ${row.memberId}`,
      number: row.member?.number || 0,
      goals: 0,
      assists: 0,
      eventIds: new Set<string>(),
    }
    current.eventIds.add(row.eventId)
    current.goals += row.goals
    current.assists += row.assists
    map.set(memberId, current)
  }
  return Array.from(map.values())
    .map((row) => ({
      memberId: row.memberId,
      name: row.name,
      number: row.number,
      goals: row.goals,
      assists: row.assists,
    }))
    .sort((a, b) => b.goals - a.goals || b.assists - a.assists || a.number - b.number)
}

export default function StatsClient({
  schedule,
  stats,
  members,
}: {
  schedule: ScheduleItem[]
  stats: StatItem[]
  members: PlayerRow[]
}) {
  const [selectedSeason, setSelectedSeason] = useState<number | 'total'>('total')

  const { joinedStats, seasons } = useMemo(() => {
    const eventMap = new Map(schedule.map((item) => [item.id, item]))
    const memberMap = new Map(members.map((member) => [member.id, member]))
    const joined = stats
      .map((item) => {
        const event = eventMap.get(item.eventId)
        if (!event) return undefined
        return { ...item, event, member: memberMap.get(item.memberId) }
      })
      .filter((item): item is JoinedStat => Boolean(item))

    const seasonList = Array.from(new Set(joined.map((item) => getSeasonYear(item.event.date))))
      .sort((a, b) => b - a)
    return { joinedStats: joined, seasons: seasonList }
  }, [members, schedule, stats])

  const activeRows = useMemo(() => {
    if (selectedSeason === 'total') return joinedStats
    return joinedStats.filter((row) => getSeasonYear(row.event.date) === selectedSeason)
  }, [joinedStats, selectedSeason])

  const playerRows = useMemo(() => aggregateStats(activeRows), [activeRows])

  const eventRows = useMemo(() => {
    const map = new Map<string, JoinedStat[]>()
    for (const row of activeRows) {
      const list = map.get(row.eventId) || []
      list.push(row)
      map.set(row.eventId, list)
    }
    return Array.from(map.entries())
      .map(([eventId, rows]) => ({ eventId, event: rows[0].event, rows }))
      .sort((a, b) => parseLocalDate(b.event.date).getTime() - parseLocalDate(a.event.date).getTime())
  }, [activeRows])

  const renderTable = (rows: PlayerStatRow[]) => (
    <div className="overflow-x-auto rounded-lg border border-yellow-400/20">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-yellow-400 text-black">
          <tr>
            <th className="px-4 py-3 font-bold">Player</th>
            <th className="px-4 py-3 text-right font-bold">Goals</th>
            <th className="px-4 py-3 text-right font-bold">Assists</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-yellow-400/10 bg-gray-900/50">
          {rows.map((row) => (
            <tr key={row.memberId} className="text-gray-200">
              <td className="px-4 py-3 font-semibold">{playerLabel(row)}</td>
              <td className="px-4 py-3 text-right text-yellow-400">{row.goals}</td>
              <td className="px-4 py-3 text-right">{row.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedSeason('total')}
          className={`rounded-md border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            selectedSeason === 'total'
              ? 'border-yellow-400 bg-yellow-400 text-black'
              : 'border-yellow-400/30 bg-gray-900/50 text-gray-300 hover:border-yellow-400/60 hover:text-white'
          }`}
        >
          Total
        </button>
        {seasons.map((season) => (
          <button
            key={season}
            type="button"
            onClick={() => setSelectedSeason(season)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              selectedSeason === season
                ? 'border-yellow-400 bg-yellow-400 text-black'
                : 'border-yellow-400/30 bg-gray-900/50 text-gray-300 hover:border-yellow-400/60 hover:text-white'
            }`}
          >
            {season}年度
          </button>
        ))}
      </div>

      {joinedStats.length === 0 ? (
        <div className="rounded-xl border border-yellow-400/20 bg-gray-900/50 p-8 text-center">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-300">Stats data is not available.</p>
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="text-yellow-400" size={22} />
              <h2 className="font-garamond text-2xl font-bold text-white">
                {selectedSeason === 'total' ? 'Total Player Stats' : `${selectedSeason}年度 Player Stats`}
              </h2>
            </div>
            {renderTable(playerRows)}
          </section>

          {selectedSeason !== 'total' && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-yellow-400" size={22} />
                <h2 className="font-garamond text-2xl font-bold text-white">Match Goals / Assists</h2>
              </div>
              {eventRows.map(({ eventId, event, rows }) => {
                const goals = rows.filter((row) => row.goals > 0)
                const assists = rows.filter((row) => row.assists > 0)
                return (
                  <div key={eventId} className="rounded-xl border border-yellow-400/20 bg-gray-900/50 p-5">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-lg font-bold text-white">vs {event.opponent || event.title}</div>
                        <div className="text-sm text-gray-400">{formatDate(event.date)} / {event.typeLabel || event.type}</div>
                      </div>
                      <div className="text-sm font-semibold text-yellow-400">{eventId}</div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-bold text-yellow-400">Goals</div>
                        <div className="space-y-1 text-sm text-gray-300">
                          {goals.length ? goals.map((row) => (
                            <div key={`${row.memberId}-goals`}>{row.member?.name || `member ${row.memberId}`} {row.goals}</div>
                          )) : <div className="text-gray-500">-</div>}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-bold text-yellow-400">Assists</div>
                        <div className="space-y-1 text-sm text-gray-300">
                          {assists.length ? assists.map((row) => (
                            <div key={`${row.memberId}-assists`}>{row.member?.name || `member ${row.memberId}`} {row.assists}</div>
                          )) : <div className="text-gray-500">-</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>
          )}
        </>
      )}
    </div>
  )
}
