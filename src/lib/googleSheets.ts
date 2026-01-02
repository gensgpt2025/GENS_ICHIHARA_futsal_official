import { google } from 'googleapis'

type SheetsClient = ReturnType<typeof google.sheets>

function normalizePrivateKey(key: string) {
  // Support both raw multiline and \n-escaped formats
  if (key.includes('\\n')) return key.replace(/\\n/g, '\n')
  return key
}

export function getSheetsClient(): SheetsClient {
  const email = process.env.SHEETS_SERVICE_ACCOUNT_EMAIL
  const privateKeyRaw = process.env.SHEETS_PRIVATE_KEY

  if (!email || !privateKeyRaw) {
    throw new Error('Sheets service account env vars are missing')
  }

  const auth = new google.auth.JWT({
    email,
    key: normalizePrivateKey(privateKeyRaw),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  return google.sheets({ version: 'v4', auth })
}

export async function batchGetRanges(spreadsheetId: string, ranges: string[]) {
  const sheets = getSheetsClient()
  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
  })
  return res.data.valueRanges || []
}

