import { NextResponse } from 'next/server'
import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToSchedule } from '@/lib/mappers'

export const revalidate = 300

export async function GET() {
  try {
    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
    const range = process.env.SCHEDULE_RANGE || 'Schedule!A2:N'
    if (!spreadsheetId) {
      return NextResponse.json({ items: [] }, { status: 200 })
    }
    const [vr] = await batchGetRanges(spreadsheetId, [range])
    const rows = vr?.values || []
    const items = mapRowsToSchedule(rows)
    return NextResponse.json({ items })
  } catch (e) {
    console.error('schedule api error', e)
    return NextResponse.json({ items: [] }, { status: 200 })
  }
}

