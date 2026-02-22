'use client'

import React, { useState, useEffect } from 'react'
import { PhotoItem } from '@/types/gallery'
import { getPhotos } from '@/lib/gallery'
import GalleryGrid from './GalleryGrid'
import PhotoViewer from './PhotoViewer'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [loading, setLoading] = useState(true)
  
  // Photo Viewer
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)

  useEffect(() => {
    loadGalleryData()
  }, [])

  const loadGalleryData = async () => {
    try {
      console.log('🔍 Starting gallery data load...')
      setLoading(true)
      
      console.log('📡 Fetching photos...')
      const photoData = await getPhotos()
      
      console.log('📸 Raw photos data:', photoData)
      
      setPhotos(photoData)
      
      console.log('✅ Photos loaded:', photoData.length, 'items')
      console.log('📄 Photos state:', photoData)
      
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
    <div className="min-h-screen bg-black cyber-grid relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-4">
            Photo Gallery
          </h1>
        </div>

        {/* YouTube動画リンク */}
        <div className="text-center mb-8">
          <a
            href="https://www.youtube.com/@GENSICHIHARA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="text-lg">動画は 公式youtubeで公開中</span>
            <ExternalLink size={20} />
          </a>
        </div>


        {/* ギャラリーグリッド */}
        <GalleryGrid
          photos={photos}
          videos={[]}
          onPhotoClick={handlePhotoClick}
          onVideoClick={() => {}}
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

        {/* ホームに戻るボタン */}
        <div className="flex justify-center mt-12 pb-8">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GalleryPage