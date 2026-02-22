import { GalleryData, PhotoItem, VideoItem, GalleryFilter } from '@/types/gallery'

const defaultCategories: GalleryData['categories'] = {
  photos: {
    practice: '練習',
    match: '試合',
    event: 'イベント',
    team: 'チーム',
  },
  videos: {
    episode: 'エピソード',
    match: '試合',
    training: '練習',
    highlight: 'ハイライト',
    anthem: 'アンセム',
    motto: 'モットー',
  },
}

export async function getGalleryData(): Promise<GalleryData> {
  try {
    // Only fetch on client; on server return empty with categories
    if (typeof window === 'undefined') {
      return { photos: [], videos: [], categories: defaultCategories }
    }

    const response = await fetch('/gallery/gallery-data.json', { cache: 'no-store' })
    if (!response.ok) throw new Error('Failed to fetch gallery data')
    return (await response.json()) as GalleryData
  } catch (error) {
    console.error('Error loading gallery data:', error)
    return { photos: [], videos: [], categories: defaultCategories }
  }
}

export async function getPhotos(filter?: GalleryFilter): Promise<PhotoItem[]> {
  const data = await getGalleryData()
  let photos = data.photos

  if (filter?.category) {
    photos = photos.filter((photo) => photo.category === filter.category)
  }
  if (filter?.year) {
    photos = photos.filter((photo) => photo.year === filter.year)
  }
  return photos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getVideos(filter?: GalleryFilter): Promise<VideoItem[]> {
  const data = await getGalleryData()
  let videos = data.videos

  if (filter?.category) {
    videos = videos.filter((video) => video.category === filter.category)
  }
  if (filter?.year) {
    videos = videos.filter((video) => video.year === filter.year)
  }
  return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getMovieGalleryVideos(): Promise<VideoItem[]> {
  const data = await getGalleryData()
  return data.videos
    .filter((video) => video.showInMovieGallery)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPhotoUrl(filename: string): string {
  return `/gallery/photos/${filename}`
}

