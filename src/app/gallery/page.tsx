import GalleryPage from '@/components/gallery/GalleryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ギャラリー | GENS ICHIHARA',
  description: 'GENS ICHIHARAの活動や試合の写真・動画をご覧ください。フットサルチームの魅力をお伝えします。',
  keywords: ['GENS ICHIHARA', 'ギャラリー', '写真', '動画', 'フットサル', '市原市'],
}

export default function Gallery() {
  return <GalleryPage />
}