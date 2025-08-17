export interface PhotoItem {
  id: string
  title: string
  filename: string
  date: string
  category: PhotoCategory
  thumbnail: string
  description: string
  year: string
}

export interface VideoItem {
  id: string
  title: string
  filename?: string
  youtubeId?: string
  youtubeUrl?: string
  date: string
  category: VideoCategory
  thumbnail?: string
  description: string
  showInMovieGallery: boolean
  year: string
}

export interface GalleryData {
  photos: PhotoItem[]
  videos: VideoItem[]
  categories: {
    photos: Record<PhotoCategory, string>
    videos: Record<VideoCategory, string>
  }
}

export type PhotoCategory = 'practice' | 'match' | 'event' | 'team'
export type VideoCategory = 'episode' | 'match' | 'training' | 'highlight' | 'anthem' | 'motto'

export interface GalleryFilter {
  category?: PhotoCategory | VideoCategory
  year?: string
}