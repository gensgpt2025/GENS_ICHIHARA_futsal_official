import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const revalidate = 0

function normalizePrivateKey(input: string) {
  let k = (input || '').trim().replace(/^"|"$/g, '')
  if (k.includes('\\n')) k = k.replace(/\\n/g, '\n')
  k = k.replace(/\r\n/g, '\n')
  return k
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token') || req.headers.get('x-revalidate-token') || ''
    const expected = process.env.REVALIDATE_TOKEN || ''
    if (!expected || token !== expected) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }

    const email = process.env.SHEETS_SERVICE_ACCOUNT_EMAIL || ''
    const pkRaw = process.env.SHEETS_PRIVATE_KEY || ''
    const pkB64 = process.env.SHEETS_PRIVATE_KEY_BASE64 || ''

    let used = 'none' as 'none' | 'raw' | 'base64'
    let decoded = ''
    let base64Decoded = false
    if (pkRaw) {
      used = 'raw'
      decoded = pkRaw
    } else if (pkB64) {
      try {
        decoded = Buffer.from(pkB64, 'base64').toString('utf8')
        used = 'base64'
        base64Decoded = true
      } catch {
        // keep decoded empty; report below
      }
    }

    const normalized = normalizePrivateKey(decoded)
    const lines = normalized ? normalized.split('\n').length : 0
    const hasBegin = normalized.includes('-----BEGIN')
    const hasEnd = normalized.includes('-----END')
    const hasPrivateKeyWord = normalized.toUpperCase().includes('PRIVATE KEY')

    // Try constructing JWT (no network call)
    let jwtConstructed = false
    let constructError: string | undefined
    try {
      if (email && normalized) {
        // eslint-disable-next-line no-new
        new google.auth.JWT({ email, key: normalized, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
        jwtConstructed = true
      }
    } catch (e: unknown) {
      constructError = e instanceof Error ? e.message : String(e)
    }

    const ok = !!email && !!normalized && hasBegin && hasEnd && hasPrivateKeyWord && jwtConstructed

    return NextResponse.json({
      ok,
      details: {
        emailPresent: !!email,
        keySource: used,
        base64Decoded,
        normalizedLength: normalized.length,
        normalizedLineCount: lines,
        hasBeginEnd: hasBegin && hasEnd,
        hasPrivateKeyWord,
        jwtConstructed,
      },
      error: ok ? undefined : constructError || undefined,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ ok: false, error: 'server_error', message: msg }, { status: 500 })
  }
}

