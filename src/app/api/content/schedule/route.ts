import { NextRequest, NextResponse } from 'next/server'
import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToSchedule } from '@/lib/mappers'

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
    const [vr] = await batchGetRanges(spreadsheetId, [range])
    const rows = vr?.values || []
    const items = mapRowsToSchedule(rows)
    const base = { items }
    if (debug && expected && token === expected) {
      return NextResponse.json({ ...base, diag: { spreadsheetId, ranges: [range], counts: [rows.length] } })
    }
    return NextResponse.json(base)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('schedule api error', msg)
    return NextResponse.json({ items: [], diag: { error: 'exception', message: msg } }, { status: 200 })
  }
}
