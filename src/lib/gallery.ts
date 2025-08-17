import { GalleryData, PhotoItem, VideoItem, GalleryFilter } from '@/types/gallery'

export async function getGalleryData(): Promise<GalleryData> {
  try {
    // Skip server-side rendering - only fetch data on client
    if (typeof window === 'undefined') {
      return {
        photos: [],
        videos: [],
        categories: { 
          photos: {
            practice: '練習',
            match: '試合',
            event: 'イベント',
            team: 'チーム'
          }, 
          videos: {
            episode: 'エピソード',
            match: '試合',
            training: '練習',
            highlight: 'ハイライト',
            anthem: 'アンセム',
            motto: 'モットー'
          }
        }
      }
    }

    const response = await fetch('/gallery/gallery-data.json')
    if (!response.ok) {
      throw new Error('Failed to fetch gallery data')
    }
    return response.json()
  } catch (error) {
    console.error('Error loading gallery data:', error)
    return {
      photos: [],
      videos: [],
      categories: {
        photos: {
          practice: '練習',
          match: '試合',
          event: 'イベント',
          team: 'チーム'
        },
        videos: {
          episode: 'エピソード',
          match: '試合',
          training: '練習',
          highlight: 'ハイライト',
          anthem: 'アンセム',
          motto: 'モットー'
        }
      }
    }
  }
}

export async function getPhotos(filter?: GalleryFilter): Promise<PhotoItem[]> {
  const data = await getGalleryData()
  let photos = data.photos

  if (filter?.category) {
    photos = photos.filter(photo => photo.category === filter.category)
  }

  if (filter?.year) {
    photos = photos.filter(photo => photo.year === filter.year)
  }

  return photos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getVideos(filter?: GalleryFilter): Promise<VideoItem[]> {
  const data = await getGalleryData()
  let videos = data.videos

  if (filter?.category) {
    videos = videos.filter(video => video.category === filter.category)
  }

  if (filter?.year) {
    videos = videos.filter(video => video.year === filter.year)
  }

  return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getMovieGalleryVideos(): Promise<VideoItem[]> {
  const data = await getGalleryData()
  return data.videos
    .filter(video => video.showInMovieGallery)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPhotoUrl(filename: string): string {
  return `/gallery/photos/${filename}`
}

export function getVideoUrl(filename: string): string {
  return `/gallery/videos/${filename}`
}

export function getThumbnailUrl(filename: string, type: 'photo' | 'video'): string {
  if (type === 'photo') {
    return `/gallery/photos/thumbnails/${filename}`
  }
  return `/gallery/videos/thumbnails/${filename}`
}