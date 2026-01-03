import { google } from 'googleapis'

type SheetsClient = ReturnType<typeof google.sheets>

function normalizePrivateKey(key: string) {
  // Strip accidental surrounding quotes and trim
  let k = key.trim().replace(/^"|"$/g, '')
  // Support both raw multiline and \n-escaped formats
  if (k.includes('\\n')) k = k.replace(/\\n/g, '\n')
  // Normalize CRLF to LF
  k = k.replace(/\r\n/g, '\n')
  return k
}

export function getSheetsClient(): SheetsClient {
  const email = process.env.SHEETS_SERVICE_ACCOUNT_EMAIL
  let privateKeyRaw = process.env.SHEETS_PRIVATE_KEY
  const privateKeyB64 = process.env.SHEETS_PRIVATE_KEY_BASE64

  if (!email) {
    throw new Error('Sheets service account email is missing')
  }

  if (!privateKeyRaw && privateKeyB64) {
    try {
      privateKeyRaw = Buffer.from(privateKeyB64, 'base64').toString('utf8')
    } catch (e) {
      throw new Error('Failed to decode SHEETS_PRIVATE_KEY_BASE64')
    }
  }

  if (!privateKeyRaw) {
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
