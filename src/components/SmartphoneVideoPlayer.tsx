'use client'

import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Episode {
  id: number
  title: string
  videoSrc: string
}

const episodes: Episode[] = [
  { id: 0, title: 'Episode 0', videoSrc: '/videos/episode-0.mp4' },
  { id: 1, title: 'Episode 1', videoSrc: '/videos/episode-1.mp4' },
  { id: 2, title: 'Episode 2', videoSrc: '/videos/episode-2.mp4' },
]

const SmartphoneVideoPlayer = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(0)
  const goToPrevious = () => {
    setSelectedEpisode(prev => prev > 0 ? prev - 1 : episodes.length - 1)
  }

  const goToNext = () => {
    setSelectedEpisode(prev => prev < episodes.length - 1 ? prev + 1 : 0)
  }

  return (
    <div className="flex justify-center items-center w-full py-8">
      {/* メインスマートフォンフレーム */}
      <div className="relative w-80 h-[600px] bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
        {/* スマートフォンの画面エリア */}
        <div className="absolute inset-4 bg-black rounded-[2rem] overflow-hidden">
          
          {/* エピソード選択バー（スマホ画面上部） */}
          <div className="relative h-16 bg-gray-800/50 backdrop-blur-sm border-b border-yellow-400/20 flex items-center justify-between px-4">
            {/* 左矢印 */}
            <button 
              onClick={goToPrevious}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-2 hover:bg-yellow-400/10 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>

            {/* ファイル名表示 */}
            <div className="text-yellow-400 font-medium text-sm">
              {episodes[selectedEpisode].title}
            </div>

            {/* 右矢印 */}
            <button 
              onClick={goToNext}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-2 hover:bg-yellow-400/10 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* メイン動画エリア */}
          <div className="flex-1 bg-black relative">
            <video 
              key={selectedEpisode}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              style={{ aspectRatio: '9/16' }}
            >
              <source src={episodes[selectedEpisode].videoSrc} type="video/mp4" />
              お使いのブラウザは動画再生をサポートしていません。
            </video>
          </div>

        </div>

        {/* スマートフォンの物理的な装飾 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-700 rounded-full"></div>
        <div className="absolute top-6 right-6 w-3 h-3 bg-gray-700 rounded-full"></div>
      </div>

    </div>
  )
}

export default SmartphoneVideoPlayer