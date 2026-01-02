/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ScheduleItem } from '@/types/schedule'

function toString(v: unknown): string {
  return (v ?? '').toString().trim()
}

function toNumber(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

export function mapRowsToSchedule(rows: any[][]): ScheduleItem[] {
  if (!rows) return []
  const items: ScheduleItem[] = []
  for (const r of rows) {
    const [id, date, start, end, title, type, location, notes, opponent, competition, rh, ra, outcome, scorers] = r
    const item: ScheduleItem = {
      id: toString(id),
      date: toString(date),
      start: toString(start) || undefined,
      end: toString(end) || undefined,
      title: toString(title),
      type: toString(type) as ScheduleItem['type'],
      location: toString(location) || undefined,
      notes: toString(notes) || undefined,
      opponent: toString(opponent) || undefined,
      competition: toString(competition) || undefined,
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
