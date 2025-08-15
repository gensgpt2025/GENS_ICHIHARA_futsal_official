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
    const body = await request.json()
    
    // 必要なフィールドの検証
    if (!body.action || !body.formData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // IPアドレスの取得と匿名化
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const rawIP = forwarded?.split(',')[0] || realIP || request.ip || 'unknown'
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
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    
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