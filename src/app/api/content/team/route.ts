import { NextResponse } from 'next/server'
import { batchGetRanges } from '@/lib/googleSheets'
import { mapRowsToPlayers, mapRowsToStaff } from '@/lib/mappers'

export const revalidate = 300

export async function GET() {
  try {
    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID
    const pr = process.env.PLAYERS_RANGE || 'players!A2:E'
    const gr = process.env.GUEST_RANGE || 'guestMembers!A2:E'
    const sr = process.env.STAFF_RANGE || 'staff!A2:D'
    if (!spreadsheetId) {
      return NextResponse.json({ players: [], guestMembers: [], staff: [] }, { status: 200 })
    }
    const vrs = await batchGetRanges(spreadsheetId, [pr, gr, sr])
    const players = mapRowsToPlayers(vrs[0]?.values || [])
    const guestMembers = mapRowsToPlayers(vrs[1]?.values || [])
    const staff = mapRowsToStaff(vrs[2]?.values || [])
    return NextResponse.json({ players, guestMembers, staff })
  } catch (e) {
    console.error('team api error', e)
    return NextResponse.json({ players: [], guestMembers: [], staff: [] }, { status: 200 })
  }
}

