import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token') || req.headers.get('x-revalidate-token') || ''
    const expected = process.env.REVALIDATE_TOKEN || ''
    if (!expected || token !== expected) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }

    const path = searchParams.get('path')
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ ok: true, revalidated: [path] })
    }
    // default: refresh key pages
    const targets = ['/schedule', '/team', '/matches']
    targets.forEach((p) => revalidatePath(p))
    return NextResponse.json({ ok: true, revalidated: targets })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}

export const GET = POST
