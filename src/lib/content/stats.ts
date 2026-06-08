import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToStats, mapRowsToStatsWithHeaders } from '@/lib/mappers'
import type { StatItem } from '@/types/stats'

function deriveHeaderRange(range: string): string | '' {
  const m = range.match(/^([^!]+)!([A-Z]+)\d+:([A-Z]+)/i)
  if (!m) return ''
  const sheet = m[1]
  const startCol = m[2]
  const endCol = m[3]
  return `${sheet}!${startCol}1:${endCol}1`
}

export async function getStats(): Promise<StatItem[]> {
  const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
  const range = process.env.STATS_RANGE || 'Stats!A2:E'
  if (!spreadsheetId) return []
  try {
    const headerRange = deriveHeaderRange(range)
    const vrs = await batchGetRanges(spreadsheetId, headerRange ? [range, headerRange] : [range])
    const rows = vrs[0]?.values || []
    const header = (vrs[1]?.values?.[0] as string[] | undefined) || undefined
    return header ? mapRowsToStatsWithHeaders(rows, header) : mapRowsToStats(rows)
  } catch {
    return []
  }
}

