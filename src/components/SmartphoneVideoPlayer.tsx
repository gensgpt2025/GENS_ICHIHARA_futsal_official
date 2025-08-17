'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VideoItem } from '@/types/gallery'
import { getMovieGalleryVideos } from '@/lib/gallery'

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

  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  const openYouTube = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank')
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

  const currentVideo = videos[selectedEpisode]

  return (
    <div className="flex justify-center items-center w-full py-6 sm:py-8 px-4">
      <div className="relative w-72 sm:w-80 h-[540px] sm:h-[600px] bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
        <div className="absolute inset-3 sm:inset-4 bg-black rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden">
          
          <div className="relative h-14 sm:h-16 bg-gray-800/50 backdrop-blur-sm border-b border-yellow-400/20 flex items-center justify-between px-2 sm:px-4">
            <button 
              onClick={goToPrevious}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-1.5 sm:p-2 hover:bg-yellow-400/10 rounded-full flex-shrink-0"
            >
              <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
            </button>

            <div className="text-yellow-400 font-medium text-xs sm:text-sm text-center flex-1 min-w-0 truncate px-2">
              {currentVideo?.title}
            </div>

            <button 
              onClick={goToNext}
              className="text-yellow-400 hover:text-yellow-300 transition-colors p-1.5 sm:p-2 hover:bg-yellow-400/10 rounded-full flex-shrink-0"
            >
              <ChevronRight size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex-1 bg-black relative overflow-hidden">
            {currentVideo?.youtubeId ? (
              <div 
                className="w-full h-full relative cursor-pointer group"
                onClick={() => currentVideo.youtubeUrl && openYouTube(currentVideo.youtubeUrl)}
              >
                <img
                  src={getYouTubeThumbnail(currentVideo.youtubeId)}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '9/16' }}
                />
                {/* 再生ボタンオーバーレイ */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                {/* 動画タイトル */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-white text-xs font-medium truncate">{currentVideo.title}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎬</div>
                  <p>動画が利用できません</p>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-700 rounded-full"></div>
        <div className="absolute top-6 right-6 w-3 h-3 bg-gray-700 rounded-full"></div>
      </div>

    </div>
  )
}

export default SmartphoneVideoPlayer