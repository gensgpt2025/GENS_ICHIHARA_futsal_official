import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToSchedule, mapRowsToScheduleWithHeaders } from '@/lib/mappers'
import type { ScheduleItem } from '@/types/schedule'

function deriveHeaderRange(range: string): string | '' {
  const m = range.match(/^([^!]+)!([A-Z]+)\d+:([A-Z]+)/i)
  if (!m) return ''
  const sheet = m[1]
  const startCol = m[2]
  const endCol = m[3]
  return `${sheet}!${startCol}1:${endCol}1`
}

export async function getSchedule(): Promise<ScheduleItem[]> {
  const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
  const range = process.env.SCHEDULE_RANGE || 'Schedule!A2:N'
  if (!spreadsheetId) return []
  try {
    const headerRange = deriveHeaderRange(range)
    const vrs = await batchGetRanges(spreadsheetId, headerRange ? [range, headerRange] : [range])
    const rows = vrs[0]?.values || []
    const header = (vrs[1]?.values?.[0] as string[] | undefined) || undefined
    const items = header ? mapRowsToScheduleWithHeaders(rows, header) : mapRowsToSchedule(rows)
    return items
  } catch {
    return []
  }
}

