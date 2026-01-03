/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ScheduleItem } from '@/types/schedule'

function toString(v: unknown): string {
  return (v ?? '').toString().trim()
}

function toNumber(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

// Google Sheets date serial: days since 1899-12-30
function serialDateToYMD(days: number): string {
  const base = Date.UTC(1899, 11, 30)
  const ms = base + Math.round(days * 86400000)
  const d = new Date(ms)
  const y = d.getUTCFullYear()
  const m = pad2(d.getUTCMonth() + 1)
  const dd = pad2(d.getUTCDate())
  return `${y}-${m}-${dd}`
}

function normalizeDate(v: unknown): string {
  if (typeof v === 'number' && Number.isFinite(v)) {
    return serialDateToYMD(v)
  }
  const s = toString(v)
  if (!s) return ''
  // Replace separators and split
  const t = s.replace(/[.\/]/g, '-').trim()
  const [yy, mm, dd] = t.split('-')
  if (!yy) return ''
  const y = yy.length === 2 ? `20${yy}` : yy
  const m = pad2(Number(mm || '1'))
  const d = pad2(Number(dd || '1'))
  return `${y}-${m}-${d}`
}

function normalizeTime(v: unknown): string | undefined {
  if (v == null || v === '') return undefined
  if (typeof v === 'number' && Number.isFinite(v)) {
    const total = Math.round(v * 24 * 60) // minutes
    const h = Math.floor(total / 60)
    const m = total % 60
    return `${pad2(h)}:${pad2(m)}`
  }
  const s = toString(v)
  if (!s) return undefined
  const m = s.match(/^(\d{1,2}):(\d{2})/) // HH:mm or H:mm
  if (m) return `${pad2(Number(m[1]))}:${m[2]}`
  return undefined
}

function normalizeType(v: unknown): ScheduleItem['type'] {
  const s = toString(v).toLowerCase()
  if (!s) return 'event'
  if (['match', 'game', '試合', 'マッチ'].some((w) => s.includes(w))) return 'match'
  if (['training', 'practice', '練習', 'トレーニング'].some((w) => s.includes(w))) return 'training'
  if (['event', 'イベント'].some((w) => s.includes(w))) return 'event'
  return 'event'
}

export function mapRowsToSchedule(rows: any[][]): ScheduleItem[] {
  if (!rows) return []
  const items: ScheduleItem[] = []
  for (const r of rows) {
    const [id, date, start, end, title, type, location, notes, opponent, competition, rh, ra, outcome, scorers] = r
    const item: ScheduleItem = {
      id: toString(id),
      date: normalizeDate(date),
      start: normalizeTime(start),
      end: normalizeTime(end),
      title: toString(title),
      type: normalizeType(type),
      location: toString(location) || undefined,
      notes: toString(notes) || undefined,
      opponent: toString(opponent) || undefined,
      competition: toString(competition) || undefined,
    }
    // Prefer date embedded in ID when present (e.g., 2026-01-25-...)
    const idDateMatch = toString(id).match(/^(\d{4})-(\d{2})-(\d{2})\b/)
    if (idDateMatch) {
      item.date = `${idDateMatch[1]}-${idDateMatch[2]}-${idDateMatch[3]}`
    }
    const home = toNumber(rh)
    const away = toNumber(ra)
    const oc = toString(outcome) as 'win' | 'draw' | 'loss'
    if (Number.isFinite(home) && Number.isFinite(away) && oc) {
      item.result = {
        homeScore: home,
        awayScore: away,
        outcome: oc,
        goalScorers: toString(scorers)
          ? toString(scorers).split(',').map((s) => s.trim()).filter(Boolean)
          : undefined,
      }
    }
    if (item.id && item.date && item.title && item.type) items.push(item)
  }
  return items
}

export type PlayerRow = { id: number; name: string; position: string; number: number; photo?: string }
export type StaffRow = { id: number; name: string; role: string; photo?: string }

export function mapRowsToPlayers(rows: any[][]): PlayerRow[] {
  if (!rows) return []
  const out: PlayerRow[] = []
  for (const r of rows) {
    const [id, name, position, number, photo] = r
    const p: PlayerRow = {
      id: toNumber(id),
      name: toString(name),
      position: toString(position) || 'FP',
      number: toNumber(number),
      photo: toString(photo) || undefined,
    }
    if (p.id && p.name) out.push(p)
  }
  return out
}

export function mapRowsToStaff(rows: any[][]): StaffRow[] {
  if (!rows) return []
  const out: StaffRow[] = []
  for (const r of rows) {
    const [id, name, role, photo] = r
    const s: StaffRow = {
      id: toNumber(id),
      name: toString(name),
      role: toString(role),
      photo: toString(photo) || undefined,
    }
    if (s.id && s.name) out.push(s)
  }
  return out
}
