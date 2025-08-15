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
  isHome: boolean
}

interface MatchResult {
  id: string
  date: string
  opponent: string
  homeScore: number
  awayScore: number
  venue: string
  competition: string
  isHome: boolean
  result: 'win' | 'draw' | 'loss'
  goalScorers?: string[]
}


// サンプルデータ
const upcomingMatches: UpcomingMatch[] = [
  {
    id: '1',
    date: '2025-01-25',
    time: '19:30',
    opponent: 'イーグルスSC',
    venue: 'モラージュ柏',
    competition: '千葉県チャレンジリーグ',
    isHome: false
  },
  {
    id: '2',
    date: '2025-02-02',
    time: '14:00',
    opponent: 'ライオンズSC',
    venue: 'フッティパーク印西',
    competition: '千葉県フットサル選手権',
    isHome: false
  },
  {
    id: '3',
    date: '2025-02-09',
    time: '10:30',
    opponent: 'タイガーズSC',
    venue: '館山体育館',
    competition: '東金市リーグ',
    isHome: false
  },
  {
    id: '4',
    date: '2025-02-16',
    time: '16:00',
    opponent: 'ファルコンズSC',
    venue: '晴れのち晴れ',
    competition: '練習試合',
    isHome: true
  }
]

const recentResults: MatchResult[] = [
  {
    id: '1',
    date: '2025-01-12',
    opponent: 'ホークスSC',
    homeScore: 4,
    awayScore: 2,
    venue: 'モラージュ柏',
    competition: '千葉県チャレンジリーグ',
    isHome: false,
    result: 'win',
    goalScorers: ['#10 12\'', '#7 28\'', '#9 35\'', '#22 43\'']
  },
  {
    id: '2',
    date: '2024-12-22',
    opponent: 'シャークスSC',
    homeScore: 3,
    awayScore: 0,
    venue: '晴れのち晴れ',
    competition: '練習試合',
    isHome: true,
    result: 'win',
    goalScorers: ['#8 18\'', '#6 31\'', '#4 44\'']
  },
  {
    id: '3',
    date: '2024-12-15',
    opponent: 'ウルブズSC',
    homeScore: 2,
    awayScore: 2,
    venue: 'フッティパーク印西',
    competition: '千葉県フットサル選手権',
    isHome: false,
    result: 'draw',
    goalScorers: ['#10 25\'', '#3 38\'']
  },
  {
    id: '4',
    date: '2024-12-08',
    opponent: 'ドラゴンズSC',
    homeScore: 1,
    awayScore: 3,
    venue: '館山体育館',
    competition: '東金市リーグ',
    isHome: false,
    result: 'loss',
    goalScorers: ['#5 22\'']
  },
  {
    id: '5',
    date: '2024-11-30',
    opponent: 'レパーズSC',
    homeScore: 5,
    awayScore: 1,
    venue: '晴れのち晴れ',
    competition: '練習試合',
    isHome: true,
    result: 'win',
    goalScorers: ['#10 8\'', '#10 15\'', '#7 23\'', '#9 39\'', '#2 45\'']
  }
]


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
              {upcomingMatches.map((match) => (
                <div key={match.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 hover:border-yellow-400/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded-full">
                          <span className="text-xs font-medium text-blue-400">{match.competition}</span>
                        </div>
                        {match.isHome && (
                          <div className="bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-green-400">HOME</span>
                          </div>
                        )}
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
              ))}
            </div>
          </section>
        )}

        {/* 過去の試合結果 */}
        {activeSection === 'results' && (
          <section className="mb-12">
            <div className="space-y-4">
              {recentResults.map((match) => {
                const resultStyle = getResultStyle(match.result)
                return (
                  <div key={match.id} className={`bg-gray-900/50 rounded-xl border ${resultStyle.border} p-6 hover:border-opacity-60 transition-all duration-300`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-gray-400/10 border border-gray-400/30 px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-gray-400">{match.competition}</span>
                          </div>
                          <div className={`${resultStyle.bg} border ${resultStyle.border} px-3 py-1 rounded-full`}>
                            <span className={`text-xs font-bold ${resultStyle.text}`}>{resultStyle.label}</span>
                          </div>
                          {match.isHome && (
                            <div className="bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full">
                              <span className="text-xs font-medium text-green-400">HOME</span>
                            </div>
                          )}
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
                          {match.isHome ? `${match.homeScore} - ${match.awayScore}` : `${match.homeScore} - ${match.awayScore}`}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatDate(match.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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