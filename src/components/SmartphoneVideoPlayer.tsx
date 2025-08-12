'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VideoItem } from '@/types/gallery'
import { getMovieGalleryVideos, getVideoUrl } from '@/lib/gallery'
import { generateVideoSources, getVideoMimeType } from '@/lib/videoUtils'

const SmartphoneVideoPlayer = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [selectedEpisode, setSelectedEpisode] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const movieVideos = await getMovieGalleryVideos()
        setVideos(movieVideos)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load videos:', error)
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  const goToPrevious = () => {
    setSelectedEpisode(prev => prev > 0 ? prev - 1 : videos.length - 1)
  }

  const goToNext = () => {
    setSelectedEpisode(prev => prev < videos.length - 1 ? prev + 1 : 0)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <div className="text-yellow-400">読み込み中...</div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <div className="text-gray-400">動画がありません</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center w-full py-6 sm:py-8 px-4">
      {/* メインスマートフォンフレーム */}
      <div className="relative w-72 sm:w-80 h-[540px] sm:h-[600px] bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
        {/* スマートフォンの画面エリア */}
        <div className="absolute inset-3 sm:inset-4 bg-black rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden">
          
          {/* エピソード選択バー（スマホ画面上部） */}
          <div className="relative h-14 sm:h-16 bg-gray-800/50 backdrop-blur-sm border-b border-yellow-400/20 flex items-center justify-between px-2 sm:px-4">
            {/* 左矢印 */}
            <button 
              onClick={goToPrevious}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-1.5 sm:p-2 hover:bg-yellow-400/10 rounded-full flex-shrink-0"
            >
              <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
            </button>

            {/* ファイル名表示 */}
            <div className="text-yellow-400 font-medium text-xs sm:text-sm text-center flex-1 min-w-0 truncate px-2">
              {videos[selectedEpisode]?.title}
            </div>

            {/* 右矢印 */}
            <button 
              onClick={goToNext}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-1.5 sm:p-2 hover:bg-yellow-400/10 rounded-full flex-shrink-0"
            >
              <ChevronRight size={18} className="sm:w-6 sm:h-6" />
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
              {/* 複数フォーマット対応 */}
              {videos[selectedEpisode] && generateVideoSources(getVideoUrl(videos[selectedEpisode].filename)).map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
              ))}
              {/* フォールバック: 元のファイル */}
              {videos[selectedEpisode] && (
                <source 
                  src={getVideoUrl(videos[selectedEpisode].filename)} 
                  type={getVideoMimeType(videos[selectedEpisode].filename)} 
                />
              )}
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