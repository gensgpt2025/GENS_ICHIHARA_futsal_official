import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const paths = [
    '',
    'team',
    'schedule',
    'matches',
    'sns',
    'gallery',
    'music',
    'contact',
    'privacy',
    'terms',
    'activities',
  ]

  const now = new Date()

  return paths.map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))
}
