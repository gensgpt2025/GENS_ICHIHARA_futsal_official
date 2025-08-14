'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Trophy, Users, Bell, ChevronRight } from 'lucide-react'

// ニュースの型定義
type NewsCategory = 'match' | 'event' | 'team'

interface NewsItem {
  id: string
  title: string
  category: NewsCategory
  date: string
  summary: string
  content: string
  isImportant?: boolean
}

// サンプルニュースデータ
const newsData: NewsItem[] = [
  {
    id: '1',
    title: '【試合結果】市原リーグ第5節 vs FC東京 3-1で勝利！',
    category: 'match',
    date: '2025-01-10',
    summary: 'Switch Zero, Fight Hard.の精神で見事な勝利を収めました。',
    content: '市原リーグ第5節、FC東京との対戦で3-1の勝利を収めました。前半開始早々に先制点を奪い、その後も0秒切替と最強球際で相手を圧倒。チーム一丸となって戦い抜いた結果です。',
    isImportant: true
  },
  {
    id: '2',
    title: '新年会開催のお知らせ',
    category: 'event',
    date: '2025-01-05',
    summary: '1月20日に新年会を開催します。',
    content: '1月20日（月）19:00より、市原市内の会場にて新年会を開催いたします。チーム関係者、サポーターの皆様のご参加をお待ちしております。'
  },
  {
    id: '3',
    title: '新メンバー加入のお知らせ',
    category: 'team',
    date: '2025-01-03',
    summary: 'FP 中村選手が新加入しました。',
    content: '新年より、FPの中村太郎選手（背番号11）が加入いたしました。経験豊富な中村選手の加入により、チーム力の向上が期待されます。'
  },
  {
    id: '4',
    title: '【試合結果】練習試合 vs 千葉FC 2-0で勝利',
    category: 'match',
    date: '2024-12-28',
    summary: '年内最後の練習試合で好結果を収めました。',
    content: '年内最後の練習試合となった千葉FCとの対戦で2-0の勝利。来年に向けて良い調整ができました。'
  },
  {
    id: '5',
    title: 'チーム忘年会開催報告',
    category: 'event',
    date: '2024-12-25',
    summary: '12月23日にチーム忘年会を開催しました。',
    content: '12月23日、チーム忘年会を開催いたしました。今年の振り返りと来年への決意を新たにする有意義な時間となりました。'
  },
  {
    id: '6',
    title: '年末年始の練習スケジュールについて',
    category: 'team',
    date: '2024-12-20',
    summary: '年末年始の練習予定をお知らせします。',
    content: '年末年始の練習スケジュールについてお知らせいたします。12月29日～1月3日は練習休みとなります。1月4日より通常練習を再開予定です。'
  }
]

// カテゴリー情報
const categoryInfo = {
  match: { label: '試合結果', icon: Trophy, color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/20' },
  event: { label: 'イベント', icon: Bell, color: 'text-blue-400', bgColor: 'bg-blue-400/10', borderColor: 'border-blue-400/20' },
  team: { label: 'チーム', icon: Users, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/20' }
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all')
  const [expandedNews, setExpandedNews] = useState<string | null>(null)

  // カテゴリーフィルタリング
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory)

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // ニュース展開/折りたたみ
  const toggleExpanded = (newsId: string) => {
    setExpandedNews(expandedNews === newsId ? null : newsId)
  }

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
            News
          </h1>
        </div>

        {/* カテゴリーフィルター */}
        <div className="flex justify-center mb-8 px-4">
          <div className="bg-gray-900 rounded-lg p-1 flex flex-wrap gap-1 w-full max-w-2xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 flex-1 min-w-0 ${
                selectedCategory === 'all'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="text-sm sm:text-base">All</span>
            </button>
            {(Object.keys(categoryInfo) as NewsCategory[]).map((category) => {
              const info = categoryInfo[category]
              const Icon = info.icon
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-300 flex-1 min-w-0 ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon size={16} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{info.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ニュース一覧 */}
        <div className="space-y-6 mb-12">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">該当するニュースがありません</p>
            </div>
          ) : (
            filteredNews.map((news) => {
              const categoryData = categoryInfo[news.category]
              const Icon = categoryData.icon
              const isExpanded = expandedNews === news.id
              
              return (
                <article
                  key={news.id}
                  className={`bg-gray-900/50 rounded-xl border transition-all duration-300 ${categoryData.borderColor} ${
                    news.isImportant ? 'border-yellow-400/40' : ''
                  }`}
                >
                  <div className="p-6">
                    {/* ヘッダー部分 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* カテゴリーバッジ */}
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${categoryData.bgColor} ${categoryData.borderColor} border flex-shrink-0`}>
                          <Icon size={14} className={categoryData.color} />
                          <span className={`text-xs font-medium ${categoryData.color}`}>
                            {categoryData.label}
                          </span>
                        </div>
                        
                        {/* 重要マーク */}
                        {news.isImportant && (
                          <div className="bg-red-500/20 border border-red-500/30 px-2 py-1 rounded-full flex-shrink-0">
                            <span className="text-xs font-medium text-red-400">重要</span>
                          </div>
                        )}
                      </div>

                      {/* 日付 */}
                      <div className="flex items-center space-x-1 text-gray-400 text-sm flex-shrink-0 ml-4">
                        <Calendar size={14} />
                        <time dateTime={news.date}>
                          {formatDate(news.date)}
                        </time>
                      </div>
                    </div>

                    {/* タイトル */}
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
                      {news.title}
                    </h2>

                    {/* 概要 */}
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {news.summary}
                    </p>

                    {/* 展開されたコンテンツ */}
                    {isExpanded && (
                      <div className="border-t border-gray-700 pt-4 mb-4">
                        <p className="text-gray-300 leading-relaxed">
                          {news.content}
                        </p>
                      </div>
                    )}

                    {/* 展開ボタン */}
                    <button
                      onClick={() => toggleExpanded(news.id)}
                      className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                    >
                      <span>{isExpanded ? '折りたたむ' : '続きを読む'}</span>
                      <ChevronRight 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </div>

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