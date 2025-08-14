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
    date: '2025-01-20',
    time: '19:00',
    opponent: '浦安FC',
    venue: '市原フットサルアリーナ',
    competition: '市原リーグ',
    isHome: true
  },
  {
    id: '2',
    date: '2025-01-27',
    time: '20:30',
    opponent: 'FC千葉',
    venue: '千葉県総合スポーツセンター',
    competition: '市原リーグ',
    isHome: false
  },
  {
    id: '3',
    date: '2025-02-03',
    time: '18:00',
    opponent: '市原ユナイテッド',
    venue: '市原フットサルアリーナ',
    competition: '市原リーグ',
    isHome: true
  }
]

const recentResults: MatchResult[] = [
  {
    id: '1',
    date: '2025-01-10',
    opponent: 'FC東京',
    homeScore: 3,
    awayScore: 1,
    venue: '市原フットサルアリーナ',
    competition: '市原リーグ',
    isHome: true,
    result: 'win',
    goalScorers: ['田中 10\'', '佐藤 25\'', '鈴木 38\'']
  },
  {
    id: '2',
    date: '2024-12-28',
    opponent: '千葉FC',
    homeScore: 2,
    awayScore: 0,
    venue: '市原フットサルアリーナ',
    competition: '練習試合',
    isHome: true,
    result: 'win',
    goalScorers: ['高橋 15\'', '田中 33\'']
  },
  {
    id: '3',
    date: '2024-12-21',
    opponent: '船橋フットサル',
    homeScore: 1,
    awayScore: 1,
    venue: '船橋アリーナ',
    competition: '市原リーグ',
    isHome: false,
    result: 'draw',
    goalScorers: ['佐藤 42\'']
  },
  {
    id: '4',
    date: '2024-12-14',
    opponent: '柏レイソル',
    homeScore: 0,
    awayScore: 2,
    venue: '柏の葉フットサルコート',
    competition: '市原リーグ',
    isHome: false,
    result: 'loss'
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