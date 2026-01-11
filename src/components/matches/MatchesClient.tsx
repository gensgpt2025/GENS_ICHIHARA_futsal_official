'use client'

import React, { useMemo, useState } from 'react'
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react'
import type { ScheduleItem } from '@/types/schedule'

type UpcomingMatch = {
  id: string
  date: string
  time: string
  opponent: string
  venue: string
  competition: string
  title: string
}

type MatchResultRow = {
  id: string
  date: string
  opponent: string
  homeScore: number
  awayScore: number
  venue: string
  competition: string
  result: 'win' | 'draw' | 'loss'
  goalScorers?: string[]
  title: string
}

function toUpcoming(items: ScheduleItem[]): UpcomingMatch[] {
  return items
    .filter((i) => i.type === 'match')
    .map((i) => ({
      id: i.id,
      date: i.date,
      time: i.start && i.end ? `${i.start}-${i.end}` : i.start || '',
      opponent: i.opponent || '相手調整中',
      venue: i.location || '',
      competition: i.competition || i.title || '',
      title: i.title || '',
    }))
}

function toResults(items: ScheduleItem[]): MatchResultRow[] {
  return items
    .filter((i) => i.type === 'match' && i.result)
    .map((i) => ({
      id: i.id,
      date: i.date,
      opponent: i.opponent || '相手未定',
      homeScore: i.result!.homeScore,
      awayScore: i.result!.awayScore,
      venue: i.location || '',
      competition: i.competition || i.title || '',
      result: i.result!.outcome,
      goalScorers: i.result!.goalScorers,
      title: i.title || '',
    }))
}

export default function MatchesClient({ items }: { items: ScheduleItem[] }) {
  const [activeSection, setActiveSection] = useState<'upcoming' | 'results'>('upcoming')

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
  const formatFullDate = (dateString: string) => new Date(dateString).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
  const parseLocalDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1) }

  const { futureUpcomingMatches, sortedRecentResults } = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const upcoming = toUpcoming(items).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const results = toResults(items).sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
    return {
      futureUpcomingMatches: upcoming.filter((m) => parseLocalDate(m.date).getTime() >= today.getTime()),
      sortedRecentResults: results,
    }
  }, [items])

  const getResultStyle = (result: 'win' | 'draw' | 'loss') => {
    switch (result) {
      case 'win': return { bg: 'bg-green-400/10', border: 'border-green-400/30', text: 'text-green-400', label: 'W' }
      case 'draw': return { bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', text: 'text-yellow-400', label: 'D' }
      case 'loss': return { bg: 'bg-red-400/10', border: 'border-red-400/30', text: 'text-red-400', label: 'L' }
    }
  }

  return (
    <>
      <div className="flex justify-center mb-8 px-4">
        <div className="bg-gray-900 rounded-lg p-1 flex w-full max-w-md">
          <button onClick={() => setActiveSection('upcoming')} className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 flex-1 ${activeSection === 'upcoming' ? 'bg-yellow-400 text-black font-semibold' : 'text-gray-300 hover:text-white'}`}>
            <Calendar size={18} />
            <span className="text-sm sm:text-base">予定</span>
          </button>
          <button onClick={() => setActiveSection('results')} className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 flex-1 ${activeSection === 'results' ? 'bg-yellow-400 text-black font-semibold' : 'text-gray-300 hover:text-white'}`}>
            <Trophy size={18} />
            <span className="text-sm sm:text-base">結果</span>
          </button>
        </div>
      </div>

      {activeSection === 'upcoming' && (
        <section className="mb-12">
          <div className="space-y-4">
            {futureUpcomingMatches.length === 0 ? (
              <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-8 text-center">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">試合予定</h3>
                <p className="text-gray-300">現在、予定されている試合はありません。</p>
                <p className="text-gray-400 text-sm mt-2">スケジュールは随時更新されます。</p>
              </div>
            ) : (
              futureUpcomingMatches.map((match) => (
                <div key={match.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 hover:border-yellow-400/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {match.competition && (
                          <div className="bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-blue-400">{match.competition}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">vs {match.opponent}</h3>
                      <p className="text-gray-300 text-sm mb-2">{match.title || '対戦相手調整中'}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Calendar size={16} className="text-yellow-400" />
                          <span>{formatFullDate(match.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Clock size={16} className="text-yellow-400" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <MapPin size={16} className="text-yellow-400" />
                          <span className="truncate">{match.venue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">{formatDate(match.date)}</div>
                      <div className="text-sm text-gray-400">{match.time}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {activeSection === 'results' && (
        <section className="mb-12">
          <div className="space-y-4">
            {sortedRecentResults.length === 0 ? (
              <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-8 text-center">
                <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">試合結果</h3>
                <p className="text-gray-300">まだ試合結果がありません。</p>
                <p className="text-gray-400 text-sm mt-2">試合が終わり次第、こちらに掲載します。</p>
              </div>
            ) : (
              sortedRecentResults.map((match) => {
                const resultStyle = getResultStyle(match.result)
                return (
                  <div key={match.id} className={`bg-gray-900/50 rounded-xl border ${resultStyle.border} p-6 hover:border-opacity-60 transition-all duration-300`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {match.competition && (
                            <div className="bg-gray-400/10 border border-gray-400/30 px-3 py-1 rounded-full">
                              <span className="text-xs font-medium text-gray-400">{match.competition}</span>
                            </div>
                          )}
                          <div className={`${resultStyle.bg} border ${resultStyle.border} px-3 py-1 rounded-full`}>
                            <span className={`text-xs font-bold ${resultStyle.text}`}>{resultStyle.label}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">vs {match.opponent}</h3>
                        <p className="text-gray-300 text-sm mb-2">{match.title || '対戦相手調整中'}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-yellow-400" />
                            <span>{formatFullDate(match.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} className="text-yellow-400" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
                        {match.goalScorers && match.goalScorers.length > 0 && (
                          <div className="text-sm text-gray-300">
                            <span className="text-gray-400">得点者: </span>
                            <span>{match.goalScorers.join(', ')}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-3xl font-bold text-white mb-1">
                          <span className="text-yellow-400">{match.homeScore}</span>
                          <span className="text-gray-500 mx-2">-</span>
                          <span className="text-yellow-400">{match.awayScore}</span>
                        </div>
                        {/* venue duplicate removed (left block already shows venue) */}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>
      )}
    </>
  )
}
