'use client'

import React, { useState, useEffect } from 'react'
import { VideoItem } from '@/types/gallery'
import { X, Calendar, ArrowLeft, ArrowUp, ExternalLink } from 'lucide-react'

interface VideoPlayerProps {
  video: VideoItem | null
  isOpen: boolean
  onClose: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isOpen,
  onClose
}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, video])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
        case 'Backspace':
          e.preventDefault()
          handleClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const minSwipeDistance = 50
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance

    if (Math.abs(distanceY) > Math.abs(distanceX)) {
      if (isUpSwipe || isDownSwipe) {
        handleClose()
      }
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  const handleScrollToTop = () => {
    handleClose()
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 350)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&origin=${encodeURIComponent(window.location.origin)}`
  }

  const openYouTubeInNewTab = () => {
    if (video?.youtubeUrl) {
      window.open(video.youtubeUrl, '_blank')
    }
  }

  if (!isOpen || !video || !video.youtubeId) return null

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      />

      <div 
        className={`relative w-full h-full max-w-6xl max-h-screen flex flex-col transition-transform duration-300 ${isClosing ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex justify-between items-start">
            <button
              onClick={handleClose}
              className="group flex items-center space-x-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-yellow-400/30 text-white hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 ease-out transform hover:scale-105 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm sm:text-base font-medium hidden sm:inline">Gallery</span>
            </button>

            <div className="text-white flex-1 min-w-0 mx-4 text-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 truncate">{video.title}</h2>
              <div className="flex items-center justify-center text-xs sm:text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <Calendar size={12} className="sm:w-4 sm:h-4" />
                  <span>{formatDate(video.date)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={openYouTubeInNewTab}
                className="text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0 rounded-full hover:bg-white/10"
                title="YouTubeで開く"
              >
                <ExternalLink size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleClose}
                className="text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0 rounded-full hover:bg-white/10"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
          <div className="relative w-full h-full max-w-full max-h-full">
            <div className="w-full h-full bg-gray-900 rounded-lg flex flex-col items-center justify-center text-center p-8">
              <div className="text-6xl mb-6">🎬</div>
              <h3 className="text-white text-xl mb-4">{video.title}</h3>
              <p className="text-gray-400 mb-6">{video.description}</p>
              <button
                onClick={openYouTubeInNewTab}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <ExternalLink size={20} />
                <span>YouTubeで視聴</span>
              </button>
            </div>
          </div>
        </div>


        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="ギャラリーのトップに戻る"
        >
          <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer