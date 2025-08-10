'use client'

import React, { useState } from 'react'
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

const VideoPlayer = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1))
  }

  const scrollRight = () => {
    setScrollPosition(Math.min(episodes.length - 1, scrollPosition + 1))
  }

  return (
    <div className="w-full">
      {/* エピソード選択バー */}
      <div className="relative mb-8">
        {/* 左矢印 */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-yellow-400 p-2 rounded-full transition-colors"
          disabled={scrollPosition === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* 右矢印 */}
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-yellow-400 p-2 rounded-full transition-colors"
          disabled={scrollPosition >= episodes.length - 1}
        >
          <ChevronRight size={24} />
        </button>

        {/* エピソードリスト */}
        <div className="overflow-hidden mx-12">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{ transform: `translateX(-${scrollPosition * 100}%)` }}
          >
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className={`flex-shrink-0 w-full md:w-1/3 cursor-pointer transition-all duration-300 ${
                  selectedEpisode === episode.id 
                    ? 'ring-2 ring-yellow-400' 
                    : 'hover:ring-1 hover:ring-yellow-400/50'
                }`}
                onClick={() => setSelectedEpisode(episode.id)}
              >
                <div className="glass-effect rounded-lg p-4 text-center">
                  <h3 className="font-garamond font-bold text-lg text-yellow-400">
                    {episode.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* メイン動画プレイヤー */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden glass-effect">
        <video 
          key={selectedEpisode}
          className="w-full h-full object-cover"
          controls
          preload="metadata"
        >
          <source src={episodes[selectedEpisode].videoSrc} type="video/mp4" />
          お使いのブラウザは動画再生をサポートしていません。
        </video>
      </div>
    </div>
  )
}

export default VideoPlayer