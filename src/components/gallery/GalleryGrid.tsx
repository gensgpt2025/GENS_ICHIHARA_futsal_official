'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PhotoItem, VideoItem } from '@/types/gallery'
import { getPhotoUrl, getVideoUrl, getThumbnailUrl } from '@/lib/gallery'
import { isSupportedImageFormat, getFormatDescription } from '@/lib/imageUtils'
import { isSupportedVideoFormat, getVideoFormatDescription } from '@/lib/videoUtils'
import { Play } from 'lucide-react'

interface GalleryGridProps {
  photos?: PhotoItem[]
  videos?: VideoItem[]
  onPhotoClick?: (photo: PhotoItem, index: number) => void
  onVideoClick?: (video: VideoItem, index: number) => void
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos = [],
  videos = [],
  onPhotoClick,
  onVideoClick
}) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (id: string) => {
    setImageErrors(prev => new Set(prev).add(id))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* 写真の表示 - シンプル確実版 */}
      {photos.map((photo, index) => (
        <div 
          key={photo.id}
          className="w-full h-64 bg-transparent border-2 border-yellow-400 rounded-lg p-4"
          onClick={() => onPhotoClick?.(photo, index)}
        >
          <img 
            src={`/gallery/photos/${photo.filename}`}
            alt={photo.title}
            className="w-full h-40 object-cover rounded"
          />
          <div className="mt-2 text-center">
            <div className="text-sm font-bold text-yellow-400">{photo.title}</div>
            <div className="text-xs text-gray-300">{photo.date}</div>
          </div>
        </div>
      ))}

      {/* 動画の表示 - シンプル確実版 */}
      {videos.map((video, index) => (
        <div 
          key={video.id}
          className="w-full h-64 bg-transparent border-2 border-yellow-400 rounded-lg p-4"
          onClick={() => onVideoClick?.(video, index)}
        >
          <video 
            className="w-full h-40 object-cover rounded"
            preload="metadata"
            muted
          >
            <source src={`/gallery/videos/${video.filename}`} type="video/mp4" />
          </video>
          <div className="mt-2 text-center">
            <div className="text-sm font-bold text-yellow-400">🎬 {video.title}</div>
            <div className="text-xs text-gray-300">{video.date}</div>
          </div>
        </div>
      ))}

      {/* 何もない場合 */}
      {photos.length === 0 && videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400">
            <div className="text-4xl mb-4">📷</div>
            <p>まだコンテンツがありません</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryGrid