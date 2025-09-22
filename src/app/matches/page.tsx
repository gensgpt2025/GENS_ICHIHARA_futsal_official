'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Target } from 'lucide-react'

// 試合データの型定義
interface UpcomingMatch {
  id: string
  date: string
  time: string
  opponent: string
  venue: string
  competition: string
}

interface MatchResult {
  id: string
  date: string
  opponent: string
  homeScore: number
  awayScore: number
  venue: string
  competition: string
  result: 'win' | 'draw' | 'loss'
  goalScorers?: string[]
}


// データ配列（現在は空）
const upcomingMatches: UpcomingMatch[] = [
  {
    id: '2025-10-11-ec-chibanespa',
    date: '2025-10-11',
    time: '19:00〜21:00',
    opponent: 'e.c.chibanespa',
    venue: '晴れのち晴れ（浜野）タフレックスコー',
    competition: '',
  },
  {
    id: '2025-10-04-training',
    date: '2025-10-04',
    time: '18:00～20:00',
    opponent: '相手調整中',
    venue: '晴れのち晴れ（浜野）タフレックスコート',
    competition: '',
  },
  {
    id: '2025-11-01-pirata',
    date: '2025-11-01',
    time: '18:00～20:00',
    opponent: 'FC Pirata',
    venue: '晴れのち晴れ（浜野）タフレックスコート',
    competition: '',
  },
]

const recentResults: MatchResult[] = []


export default function MatchesPage() {
  const [activeSection, setActiveSection] = useState<'upcoming' | 'results'>('upcoming')

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 文字列 'YYYY-MM-DD' をローカル日付として解釈
  const parseLocalDate = (s: string) => {
    const [y, m, d] = s.split('-').map(Number)
    return new Date(y, (m || 1) - 1, d || 1)
  }
  // 今日の0時（ローカル）
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 日付順にソート
  // 予定: 近い日付が先（昇順）/ 結果: 新しい日付が先（降順）
  const sortedUpcomingMatches = [...upcomingMatches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const sortedRecentResults = [...recentResults].sort(
    (a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime()
  )

  // 今日以降の予定のみ
  const futureUpcomingMatches = sortedUpcomingMatches.filter(
    (m) => parseLocalDate(m.date).getTime() >= today.getTime()
  )

  // 試合結果の表示スタイル
  const getResultStyle = (result: 'win' | 'draw' | 'loss') => {
    switch (result) {
      case 'win': return { bg: 'bg-green-400/10', border: 'border-green-400/30', text: 'text-green-400', label: 'W' }
      case 'draw': return { bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', text: 'text-yellow-400', label: 'D' }
      case 'loss': return { bg: 'bg-red-400/10', border: 'border-red-400/30', text: 'text-red-400', label: 'L' }
    }
  }

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
            Matches
          </h1>
        </div>

        {/* セクションナビゲーション */}
        <div className="flex justify-center mb-8 px-4">
          <div className="bg-gray-900 rounded-lg p-1 flex w-full max-w-md">
            <button
              onClick={() => setActiveSection('upcoming')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 flex-1 ${
                activeSection === 'upcoming'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calendar size={18} />
              <span className="text-sm sm:text-base">予定</span>
            </button>
            <button
              onClick={() => setActiveSection('results')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 flex-1 ${
                activeSection === 'results'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Trophy size={18} />
              <span className="text-sm sm:text-base">結果</span>
            </button>
          </div>
        </div>

        {/* 今後の試合予定 */}
        {activeSection === 'upcoming' && (
          <section className="mb-12">
            <div className="space-y-4">
              {futureUpcomingMatches.length === 0 ? (
                <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-8 text-center">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">試合予定</h3>
                  <p className="text-gray-300">現在、予定されている試合はありません。</p>
                  <p className="text-gray-400 text-sm mt-2">新しい試合が決まり次第、こちらに掲載いたします。</p>
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
                        {/* HOME 表示は使用しないため削除 */}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        GENS ICHIHARA vs {match.opponent}
                      </h3>
                      
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
                      <div className="text-2xl font-bold text-yellow-400 mb-1">
                        {formatDate(match.date)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {match.time}
                      </div>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </section>
        )}

        {/* 過去の試合結果 */}
        {activeSection === 'results' && (
          <section className="mb-12">
            <div className="space-y-4">
              {recentResults.length === 0 ? (
                <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-8 text-center">
                  <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">試合結果</h3>
                  <p className="text-gray-300">まだ試合結果がありません。</p>
                  <p className="text-gray-400 text-sm mt-2">試合が終了次第、こちらに結果を掲載いたします。</p>
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
                          {/* HOME/AWAY 表示は使用しない */}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">
                          GENS ICHIHARA vs {match.opponent}
                        </h3>
                        
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
                          <div className="text-sm text-gray-400">
                            <Target size={14} className="inline mr-1" />
                            得点: {match.goalScorers.join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center sm:text-right">
                        <div className={`text-3xl font-bold mb-1 ${resultStyle.text}`}>
                          {`${match.homeScore} - ${match.awayScore}`}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatDate(match.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }))}
            </div>
          </section>
        )}


        {/* ホームに戻るボタン */}
        <div className="flex justify-center mt-12 pb-8">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
