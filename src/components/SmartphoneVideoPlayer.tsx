'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
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
        // Prefer home-videos.json for Top page videos (keeps Gallery independent)
        const res = await fetch('/home-videos.json', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data?.videos)) {
            setVideos(data.videos as VideoItem[])
            setLoading(false)
            return
          }
        }

        // Fallback to gallery videos flagged for movie gallery
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

  const extractYouTubeId = (url?: string) => {
    if (!url) return undefined
    const m = url.match(/(?:v=|\.be\/|shorts\/)([A-Za-z0-9_-]{6,})/)
    return m?.[1]
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
  const effectiveId = currentVideo?.youtubeId || extractYouTubeId(currentVideo?.youtubeUrl)

  return (
    <div className="flex justify-center items-center w-full py-6 sm:py-8 px-4">
      {/* Phone frame */}
      <div className="relative w-72 sm:w-80 h-[540px] sm:h-[600px] bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
        {/* Screen area */}
        <div className="absolute inset-3 sm:inset-4 bg-black rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden flex flex-col">
          
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

          <div className="flex-1 bg-black relative overflow-hidden p-0">
            {/* Keep 9:16 aspect for the video screen */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-[92%] aspect-[9/16] bg-black rounded-xl overflow-hidden">
                {effectiveId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${effectiveId}?rel=0&modestbranding=1&playsinline=1`}
                    title={currentVideo?.title || 'YouTube player'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎬</div>
                      <p>動画が利用できません</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-700 rounded-full"></div>
        <div className="absolute top-6 right-6 w-3 h-3 bg-gray-700 rounded-full"></div>
      </div>

    </div>
  )
}

export default SmartphoneVideoPlayer
