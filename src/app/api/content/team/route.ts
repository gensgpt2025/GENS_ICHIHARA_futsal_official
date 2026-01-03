import { NextRequest, NextResponse } from 'next/server'
import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToPlayers, mapRowsToStaff } from '@/lib/mappers'

export const revalidate = 300

export async function GET(req: NextRequest) {
  try {
    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
    const pr = process.env.PLAYERS_RANGE || 'players!A2:E'
    const gr = process.env.GUEST_RANGE || 'guestMembers!A2:E'
    const sr = process.env.STAFF_RANGE || 'staff!A2:D'
    const { searchParams } = new URL(req.url)
    const debug = searchParams.get('debug') === '1'
    const token = searchParams.get('token') || req.headers.get('x-revalidate-token') || ''
    const expected = process.env.REVALIDATE_TOKEN || ''
    if (!spreadsheetId) {
      return NextResponse.json({ players: [], guestMembers: [], staff: [], diag: { error: 'missing_spreadsheet_id', ranges: [pr, gr, sr] } }, { status: 200 })
    }
    const vrs = await batchGetRanges(spreadsheetId, [pr, gr, sr])
    const players = mapRowsToPlayers(vrs[0]?.values || [])
    const guestMembers = mapRowsToPlayers(vrs[1]?.values || [])
    const staff = mapRowsToStaff(vrs[2]?.values || [])
    const base = { players, guestMembers, staff }
    if (debug && expected && token === expected) {
      return NextResponse.json({
        ...base,
        diag: {
          spreadsheetId,
          ranges: [pr, gr, sr],
          counts: [vrs[0]?.values?.length || 0, vrs[1]?.values?.length || 0, vrs[2]?.values?.length || 0],
        },
      })
    }
    return NextResponse.json(base)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('team api error', msg)
    return NextResponse.json({ players: [], guestMembers: [], staff: [], diag: { error: 'exception', message: msg } }, { status: 200 })
  }
}
