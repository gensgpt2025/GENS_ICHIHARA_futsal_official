'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PhotoItem } from '@/types/gallery'
import { getPhotoUrl } from '@/lib/gallery'
import { X, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react'

interface PhotoViewerProps {
  photos: PhotoItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}) => {
  const currentPhoto = photos[currentIndex]
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
  }, [isOpen, currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
        case 'Backspace':
          e.preventDefault()
          handleClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

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
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance

    // 水平方向のスワイプが垂直方向より大きい場合のみ処理
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe) {
        onNext()
      } else if (isRightSwipe) {
        onPrevious()
      }
    }
    // 垂直方向の上スワイプで閉じる
    else if (isUpSwipe) {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  if (!isOpen || !currentPhoto) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* オーバーレイ（クリックで閉じる） */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      />

      {/* メインコンテンツ */}
      <div 
        className={`relative w-full h-full max-w-6xl max-h-screen flex flex-col transition-transform duration-300 ${isClosing ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* ヘッダー */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent">
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
              <h2 className="text-lg sm:text-xl font-semibold mb-1 truncate">{currentPhoto.title}</h2>
              <div className="flex items-center justify-center text-xs sm:text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <Calendar size={12} className="sm:w-4 sm:h-4" />
                  <span>{formatDate(currentPhoto.date)}</span>
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

        {/* 画像エリア */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
          <div className="relative w-full h-full max-w-full max-h-full">
            <Image
              src={getPhotoUrl(currentPhoto.filename)}
              alt={currentPhoto.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 説明文 */}
        {currentPhoto.description && (
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-center opacity-90 text-sm sm:text-base">
              {currentPhoto.description}
            </p>
          </div>
        )}

        {/* ナビゲーション */}
        {photos.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors p-2 sm:p-3 bg-black/30 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors p-2 sm:p-3 bg-black/30 rounded-full backdrop-blur-sm"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* インジケーター */}
        {photos.length > 1 && (
          <div className={`absolute left-1/2 transform -translate-x-1/2 ${currentPhoto.description ? 'bottom-16 sm:bottom-20' : 'bottom-4 sm:bottom-6'}`}>
            <div className="flex space-x-1 sm:space-x-2 justify-center">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="text-center text-white text-xs sm:text-sm mt-1 sm:mt-2 opacity-70">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoViewer