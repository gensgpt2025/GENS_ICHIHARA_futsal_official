import { NextRequest, NextResponse } from 'next/server'
import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToSchedule, mapRowsToScheduleWithHeaders } from '@/lib/mappers'

export const revalidate = 300

export async function GET(req: NextRequest) {
  try {
    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
    const range = process.env.SCHEDULE_RANGE || 'Schedule!A2:N'
    const { searchParams } = new URL(req.url)
    const debug = searchParams.get('debug') === '1'
    const token = searchParams.get('token') || req.headers.get('x-revalidate-token') || ''
    const expected = process.env.REVALIDATE_TOKEN || ''
    if (!spreadsheetId) {
      return NextResponse.json({ items: [], diag: { error: 'missing_spreadsheet_id', range } }, { status: 200 })
    }
    // Derive header range like Sheet!A1:N1 when possible
    let headerRange = ''
    const m = range.match(/^([^!]+)!([A-Z]+)\d+:([A-Z]+)/i)
    if (m) {
      const sheet = m[1]
      const startCol = m[2]
      const endCol = m[3]
      headerRange = `${sheet}!${startCol}1:${endCol}1`
    }
    const vrs = await batchGetRanges(spreadsheetId, headerRange ? [range, headerRange] : [range])
    const rows = vrs[0]?.values || []
    const header = (vrs[1]?.values?.[0] as string[] | undefined) || undefined
    const items = header ? mapRowsToScheduleWithHeaders(rows, header) : mapRowsToSchedule(rows)
    const base = { items }
    if (debug && expected && token === expected) {
      return NextResponse.json({ ...base, diag: { spreadsheetId, ranges: header ? [range, headerRange] : [range], counts: [rows.length], header } })
    }
    return NextResponse.json(base)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('schedule api error', msg)
    return NextResponse.json({ items: [], diag: { error: 'exception', message: msg } }, { status: 200 })
  }
}
