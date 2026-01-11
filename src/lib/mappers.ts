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

function normalizeOutcome(v: unknown): 'win' | 'draw' | 'loss' | undefined {
  const s = toString(v).toLowerCase()
  if (!s) return undefined
  if (s === 'win' || s === 'w') return 'win'
  if (s === 'draw' || s === 'd') return 'draw'
  if (s === 'loss' || s === 'lose' || s === 'l') return 'loss'
  if (s === '勝ち' || s === '勝' || s === 'かち') return 'win'
  if (s === '引き分け' || s === '分' || s === 'ひきわけ') return 'draw'
  if (s === '負け' || s === '負' || s === 'まけ') return 'loss'
  return undefined
}

function deriveOutcome(home: number, away: number): 'win' | 'draw' | 'loss' {
  if (home > away) return 'win'
  if (home < away) return 'loss'
  return 'draw'
}

function isProvided(v: unknown): boolean {
  return v != null && toString(v) !== ''
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
    const hasHome = isProvided(rh)
    const hasAway = isProvided(ra)
    if (hasHome && hasAway) {
      const home = toNumber(rh)
      const away = toNumber(ra)
      const oc = normalizeOutcome(outcome) || deriveOutcome(home, away)
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

// Flexible version: map using header names when provided
export function mapRowsToScheduleWithHeaders(rows: any[][], header?: string[]): ScheduleItem[] {
  if (!rows) return []
  const norm = (s: string) => s?.toString().trim().toLowerCase()
  const idx = (keys: string[]) => {
    if (!header) return -1
    const set = header.map(norm)
    for (const k of keys) {
      const i = set.indexOf(k)
      if (i >= 0) return i
    }
    return -1
  }
  const iId = idx(['id', '識別子'])
  const iDate = idx(['date', '日付'])
  const iStart = idx(['start', '開始'])
  const iEnd = idx(['end', '終了'])
  const iTitle = idx(['title', 'タイトル', '件名'])
  const iType = idx(['type', '種別', '種類'])
  const iLocation = idx(['location', '場所', '会場'])
  const iNotes = idx(['notes', '備考', 'メモ'])
  const iOpponent = idx(['opponent', '対戦相手', '相手'])
  const iCompetition = idx(['competition', '大会', 'リーグ'])
  const iHome = idx(['home', 'home score', 'ホーム'])
  const iAway = idx(['away', 'away score', 'アウェイ'])
  const iHomeAlt = idx(['result_home', 'home_score', 'result home'])
  const iAwayAlt = idx(['result_away', 'away_score', 'result away'])
  const iOutcome = idx(['outcome', '結果'])
  const iScorers = idx(['scorers', 'goal scorers', '得点者'])

  // If no header mapping, fallback to positional
  if (!header || iDate < 0 || iTitle < 0) {
    return mapRowsToSchedule(rows)
  }

  const out: ScheduleItem[] = []
  for (const r of rows) {
    const g = (i: number) => (i >= 0 ? r[i] : undefined)
    const item: ScheduleItem = {
      id: toString(g(iId)) || toString(g(iTitle)),
      date: normalizeDate(g(iDate)),
      start: normalizeTime(g(iStart)),
      end: normalizeTime(g(iEnd)),
      title: toString(g(iTitle)),
      type: normalizeType(g(iType)),
      location: toString(g(iLocation)) || undefined,
      notes: toString(g(iNotes)) || undefined,
      opponent: toString(g(iOpponent)) || undefined,
      competition: toString(g(iCompetition)) || undefined,
    }
    const rh = g(iHome >= 0 ? iHome : iHomeAlt)
    const ra = g(iAway >= 0 ? iAway : iAwayAlt)
    const hasHome = isProvided(rh)
    const hasAway = isProvided(ra)
    if (hasHome && hasAway) {
      const home = toNumber(rh)
      const away = toNumber(ra)
      const oc = normalizeOutcome(g(iOutcome)) || deriveOutcome(home, away)
      item.result = {
        homeScore: home,
        awayScore: away,
        outcome: oc,
        goalScorers: toString(g(iScorers))
          ? toString(g(iScorers)).split(',').map((s) => s.trim()).filter(Boolean)
          : undefined,
      }
    }
    if (item.id && item.date && item.title && item.type) out.push(item)
  }
  return out
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
