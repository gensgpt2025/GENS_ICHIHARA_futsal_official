export type ScheduleType = 'match' | 'training' | 'event'

export interface ScheduleItem {
  id: string
  date: string // YYYY-MM-DD
  start?: string // HH:mm
  end?: string // HH:mm
  title: string
  type: ScheduleType
  location?: string
  notes?: string
  opponent?: string
  competition?: string
  result?: {
    homeScore: number
    awayScore: number
    outcome: 'win' | 'draw' | 'loss'
    goalScorers?: string[]
  }
}
