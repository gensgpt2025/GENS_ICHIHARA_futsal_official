'use client'

import React, { useMemo } from 'react'
import type { ScheduleItem } from '@/types/schedule'
import { Calendar, Clock, MapPin, Download, ExternalLink } from 'lucide-react'

const typeBadge: Record<string, { label: string; color: string; border: string; bg: string }> = {
  match: { label: 'MATCH', color: 'text-red-300', border: 'border-red-400/40', bg: 'bg-red-400/10' },
  training: { label: 'TRAINING', color: 'text-yellow-300', border: 'border-yellow-400/40', bg: 'bg-yellow-400/10' },
  event: { label: 'EVENT', color: 'text-blue-300', border: 'border-blue-400/40', bg: 'bg-blue-400/10' },
}

function yyyymmddToDate(s: string) {
  const [y, m, d] = s.split('-').map((n) => parseInt(n, 10))
  return new Date(y, (m || 1) - 1, d || 1)
}

function formatFullDate(s: string) {
  return yyyymmddToDate(s).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

function escapeICS(text: string) {
  return text.replaceAll('\\', '\\\\').replaceAll(',', '\\,').replaceAll(';', '\\;').replaceAll('\n', '\\n')
}

function buildGoogleCalendarUrl(item: ScheduleItem) {
  const start = `${item.date.replaceAll('-', '')}T${(item.start || '00:00').replace(':', '')}00`
  const end = `${item.date.replaceAll('-', '')}T${(item.end || item.start || '23:59').replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `GENS ICHIHARA ${item.title}`,
    dates: `${start}/${end}`,
    details: item.notes || '',
    location: item.location || '',
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}

function downloadICS(item: ScheduleItem) {
  const dt = (d: string, t?: string) => `${d.replaceAll('-', '')}T${(t || '0000').replace(':', '')}00`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GENS ICHIHARA//Schedule//JP',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${item.id}@gens-ichihara`,
    `DTSTAMP:${dt(item.date, item.start)}`,
    `DTSTART:${dt(item.date, item.start)}`,
    `DTEND:${dt(item.date, item.end || item.start)}`,
    `SUMMARY:${escapeICS(`GENS ICHIHARA ${item.title}`)}`,
    item.location ? `LOCATION:${escapeICS(item.location)}` : undefined,
    item.notes ? `DESCRIPTION:${escapeICS(item.notes)}` : undefined,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean) as string[]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${item.date}_${item.id}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export default function ScheduleListClient({ items }: { items: ScheduleItem[] }) {
  const today = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const upcoming = useMemo(() => {
    return [...items]
      .sort((a, b) => yyyymmddToDate(a.date).getTime() - yyyymmddToDate(b.date).getTime())
      .filter((i) => yyyymmddToDate(i.date).getTime() >= today.getTime())
  }, [items, today])

  return (
    <section className="space-y-4">
      {upcoming.length === 0 ? (
        <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-8 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-300">予定が登録されていません。</p>
        </div>
      ) : (
        upcoming.map((item) => {
          const badge = typeBadge[item.type] || typeBadge.event
          return (
            <div key={item.id} className={`bg-gray-900/50 rounded-xl border ${badge.border} p-5 hover:border-opacity-60 transition-all`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${badge.bg} ${badge.border} ${badge.color} px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>{badge.label}</div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar size={16} className="text-yellow-400" />
                      <span>{formatFullDate(item.date)}</span>
                    </div>
                    {(item.start || item.end) && (
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Clock size={16} className="text-yellow-400" />
                        <span>{item.start}{item.end ? ` - ${item.end}` : ''}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="text-gray-300 text-sm flex items-center gap-2">
                    {item.location && (
                      <>
                        <MapPin size={16} className="text-yellow-400" />
                        <span className="truncate">{item.location}</span>
                      </>
                    )}
                  </div>
                  {item.notes && <p className="text-gray-400 text-sm mt-2">{item.notes}</p>}
                </div>
                <div className="flex sm:flex-col gap-2 sm:items-end">
                  <button
                    onClick={() => downloadICS(item)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition-colors"
                    title="ICS をダウンロード"
                  >
                    <Download size={16} />
                    <span>.ics</span>
                  </button>
                  <a
                    href={buildGoogleCalendarUrl(item)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    title="Googleカレンダーに追加"
                  >
                    <ExternalLink size={16} />
                    <span>Google</span>
                  </a>
                </div>
              </div>
            </div>
          )
        })
      )}
    </section>
  )
}

