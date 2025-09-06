import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// 監査ログのエントリー型定義
interface AuditLogEntry {
  timestamp: string
  action: string
  userAgent: string
  ipAddress: string
  formData: {
    category: string
    hasPersonalInfo: boolean
  }
  status: 'success' | 'error'
  errorMessage?: string
}

// IPアドレスを匿名化する関数（GDPR対応）
function anonymizeIP(ip: string): string {
  if (ip.includes(':')) {
    // IPv6の場合、最後の64ビットをマスク
    const parts = ip.split(':')
    if (parts.length >= 4) {
      return parts.slice(0, 4).join(':') + ':****:****:****:****'
    }
  } else {
    // IPv4の場合、最後のオクテットをマスク
    const parts = ip.split('.')
    if (parts.length === 4) {
      return parts.slice(0, 3).join('.') + '.***'
    }
  }
  return '***.***.***'
}

// ログファイルのパスを取得
function getLogFilePath(): string {
  const logDir = path.join(process.cwd(), 'logs')
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  return path.join(logDir, `audit-${today}.log`)
}

// ログディレクトリを作成
async function ensureLogDirectory(): Promise<void> {
  const logDir = path.join(process.cwd(), 'logs')
  try {
    await fs.access(logDir)
  } catch {
    await fs.mkdir(logDir, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 同一オリジンからのPOSTのみ許可
    const origin = request.headers.get('origin') || ''
    const host = request.headers.get('host') || ''
    let originAllowed = false
    if (origin) {
      try {
        const originHost = new URL(origin).host
        originAllowed = originHost === host
      } catch {
        originAllowed = false
      }
    }
    if (!originAllowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // ボディサイズ簡易チェック（10KB超は拒否）しつつJSONを解析
    const raw = await request.text()
    if (raw.length > 10 * 1024) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }
    type IncomingBody = {
      action: string
      formData: { category?: string }
      status?: 'success' | 'error'
      errorMessage?: string
    }
    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    // 必要なフィールドの検証
    const isValid = (value: unknown): value is IncomingBody => {
      if (typeof value !== 'object' || value === null) return false
      const v = value as Record<string, unknown>
      return typeof v.action === 'string' && typeof v.formData === 'object' && v.formData !== null
    }
    if (!isValid(body)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // IPアドレスの取得と匿名化
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const rawIP = forwarded?.split(',')[0] || realIP || 'unknown'
    const anonymizedIP = anonymizeIP(rawIP)

    // 監査ログエントリーの作成
    const logEntry: AuditLogEntry = {
      timestamp: new Date().toISOString(),
      action: body.action,
      userAgent: request.headers.get('user-agent') || 'unknown',
      ipAddress: anonymizedIP,
      formData: {
        category: body.formData.category || 'unknown',
        hasPersonalInfo: true // お問い合わせフォームには常に個人情報が含まれる
      },
      status: body.status || 'success',
      errorMessage: body.errorMessage
    }

    // ログファイルに書き込み
    await ensureLogDirectory()
    const logFilePath = getLogFilePath()
    const logLine = JSON.stringify(logEntry) + '\n'
    
    await fs.appendFile(logFilePath, logLine, 'utf8')

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Audit log error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ログの読み取り（管理用）
export async function GET(request: NextRequest) {
  try {
    // 管理者のみアクセス可能（実際の実装では認証が必要）
    const expected = process.env.AUDIT_ADMIN_TOKEN
    const authHeader = request.headers.get('authorization') || ''
    const provided = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : ''
    if (!expected || provided !== expected) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }
    
    const logDir = path.join(process.cwd(), 'logs')
    const logFilePath = path.join(logDir, `audit-${date}.log`)

    try {
      const logContent = await fs.readFile(logFilePath, 'utf8')
      const logs = logContent
        .trim()
        .split('\n')
        .filter(line => line)
        .map(line => JSON.parse(line))

      return NextResponse.json({ logs }, { status: 200 })
    } catch (fileError) {
      return NextResponse.json({ logs: [] }, { status: 200 })
    }
  } catch (error) {
    console.error('Audit log read error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
