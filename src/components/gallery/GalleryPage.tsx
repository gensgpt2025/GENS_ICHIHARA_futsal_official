'use client'

import React, { useState, useEffect } from 'react'
import { PhotoItem, VideoItem } from '@/types/gallery'
import { getPhotos, getVideos } from '@/lib/gallery'
import GalleryGrid from './GalleryGrid'
import PhotoViewer from './PhotoViewer'
import VideoPlayer from './VideoPlayer'
import { Camera, Video, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type TabType = 'photos' | 'videos'

const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('photos')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  
  // Photo Viewer
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)
  
  // Video Player
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)

  useEffect(() => {
    loadGalleryData()
  }, [])

  const loadGalleryData = async () => {
    try {
      console.log('🔍 Starting gallery data load...')
      setLoading(true)
      
      console.log('📡 Fetching photos and videos...')
      const [photoData, videoData] = await Promise.all([
        getPhotos(),
        getVideos()
      ])
      
      console.log('📸 Raw photos data:', photoData)
      console.log('🎥 Raw videos data:', videoData)
      
      setPhotos(photoData)
      setVideos(videoData)
      
      console.log('✅ Photos loaded:', photoData.length, 'items')
      console.log('✅ Videos loaded:', videoData.length, 'items')
      console.log('📄 Photos state:', photoData)
      console.log('📹 Videos state:', videoData)
      
      setLoading(false)
    } catch (error) {
      console.error('❌ Failed to load gallery data:', error)
      setLoading(false)
    }
  }

  const handlePhotoClick = (photo: PhotoItem, index: number) => {
    setSelectedPhoto(photo)
    setPhotoIndex(index)
    setIsPhotoViewerOpen(true)
  }

  const handleVideoClick = (video: VideoItem, index: number) => {
    setSelectedVideo(video)
    setIsVideoPlayerOpen(true)
  }

  const handlePhotoViewerNext = () => {
    const nextIndex = (photoIndex + 1) % photos.length
    setPhotoIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex])
  }

  const handlePhotoViewerPrevious = () => {
    const prevIndex = photoIndex > 0 ? photoIndex - 1 : photos.length - 1
    setPhotoIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex])
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative z-0">
        <div className="text-yellow-400 text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 戻るボタン */}
        <div className="mb-6 relative z-50">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative z-50"
          >
            <ArrowLeft size={18} />
            <span>トップに戻る</span>
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-4">
            Gallery
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            GENS ICHIHARAの活動や試合の写真・動画をご覧ください
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-8 px-4">
          <div className="bg-gray-900 rounded-lg p-1 flex w-full max-w-md">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-md transition-all duration-300 flex-1 ${
                activeTab === 'photos'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Camera size={18} />
              <span className="hidden sm:inline">写真</span>
              <span className="sm:hidden">写真</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-md transition-all duration-300 flex-1 ${
                activeTab === 'videos'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Video size={18} />
              <span className="hidden sm:inline">動画</span>
              <span className="sm:hidden">動画</span>
            </button>
          </div>
        </div>


        {/* ギャラリーグリッド */}
        <GalleryGrid
          photos={activeTab === 'photos' ? photos : []}
          videos={activeTab === 'videos' ? videos : []}
          onPhotoClick={handlePhotoClick}
          onVideoClick={handleVideoClick}
        />

        {/* PhotoViewer */}
        <PhotoViewer
          photos={photos}
          currentIndex={photoIndex}
          isOpen={isPhotoViewerOpen}
          onClose={() => setIsPhotoViewerOpen(false)}
          onNext={handlePhotoViewerNext}
          onPrevious={handlePhotoViewerPrevious}
        />

        {/* VideoPlayer */}
        <VideoPlayer
          video={selectedVideo}
          isOpen={isVideoPlayerOpen}
          onClose={() => setIsVideoPlayerOpen(false)}
        />
      </div>
    </div>
  )
}

export default GalleryPage