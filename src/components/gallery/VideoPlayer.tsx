'use client'

import React, { useState, useEffect, useRef } from 'react'
import { VideoItem } from '@/types/gallery'
import { getVideoUrl } from '@/lib/gallery'
import { generateVideoSources, getVideoMimeType, isSupportedVideoFormat } from '@/lib/videoUtils'
import { X, Calendar, Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react'

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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setVideoError(false)
      setCurrentTime(0)
      setIsPlaying(false)
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
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'm':
        case 'M':
          toggleMute()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isPlaying])

  // スワイプ機能
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

    // 垂直方向のスワイプで閉じる
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleMouseMove = () => {
    showControlsTemporarily()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  if (!isOpen || !video) return null

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      />

      {/* メインコンテンツ */}
      <div 
        className={`relative w-full h-full max-w-6xl max-h-screen flex flex-col transition-transform duration-300 ${isClosing ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'}`}
        onMouseMove={handleMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* ヘッダー */}
        <div className={`absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-start">
            {/* おしゃれな戻るボタン */}
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

            <button
              onClick={handleClose}
              className="text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0 rounded-full hover:bg-white/10"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* 動画エリア */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
          <div className="relative w-full h-full max-w-full max-h-full">
            {!videoError ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={() => setVideoError(true)}
                onClick={togglePlay}
              >
              {/* 複数フォーマット対応 */}
              {generateVideoSources(getVideoUrl(video.filename)).map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
              ))}
              {/* フォールバック: 元のファイル */}
              <source src={getVideoUrl(video.filename)} type={getVideoMimeType(video.filename)} />
                お使いのブラウザは動画再生に対応していません。
              </video>
            ) : (
              <div className="w-96 h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4">🎬</div>
                  <p>動画を読み込めませんでした</p>
                  <p className="text-sm mt-2">{video.filename}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 説明文 */}
        {video.description && (
          <div className={`absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white text-center opacity-90">
              {video.description}
            </p>
          </div>
        )}

        {/* コントロール */}
        {!videoError && (
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* プログレスバー */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={() => videoRef.current?.requestFullscreen()}
                className="hover:text-yellow-400 transition-colors"
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer