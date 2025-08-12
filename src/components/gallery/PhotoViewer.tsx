'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PhotoItem } from '@/types/gallery'
import { getPhotoUrl } from '@/lib/gallery'
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

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
          onClose()
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

  if (!isOpen || !currentPhoto) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* オーバーレイ（クリックで閉じる） */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />

      {/* メインコンテンツ */}
      <div className="relative w-full h-full max-w-6xl max-h-screen flex flex-col">
        {/* ヘッダー */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex justify-between items-start">
            <div className="text-white flex-1 min-w-0 mr-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 truncate">{currentPhoto.title}</h2>
              <div className="flex items-center text-xs sm:text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <Calendar size={12} className="sm:w-4 sm:h-4" />
                  <span>{formatDate(currentPhoto.date)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* 画像エリア */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-16 sm:pb-20">
          <div className="relative max-w-full max-h-full">
            <Image
              src={getPhotoUrl(currentPhoto.filename)}
              alt={currentPhoto.title}
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-full"
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