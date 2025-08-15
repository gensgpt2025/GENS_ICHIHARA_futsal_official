'use client'

import React, { useState, useEffect } from 'react'
import { Eye, Download, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

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

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState('')

  const handleAuth = () => {
    // 簡単な認証（実際の実装では適切な認証システムを使用）
    if (authToken === 'admin-token') {
      setIsAuthenticated(true)
    } else {
      alert('認証に失敗しました')
    }
  }

  const fetchLogs = async () => {
    if (!isAuthenticated) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/audit-log?date=${selectedDate}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      } else {
        console.error('Failed to fetch logs')
      }
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs()
    }
  }, [selectedDate, isAuthenticated])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />
      case 'error':
        return <XCircle size={16} className="text-red-500" />
      default:
        return <AlertTriangle size={16} className="text-yellow-500" />
    }
  }

  const getActionDescription = (action: string) => {
    switch (action) {
      case 'contact_form_submitted':
        return 'お問い合わせ送信成功'
      case 'contact_form_validation_failed':
        return 'フォーム検証失敗'
      case 'contact_form_rate_limited':
        return '送信頻度制限'
      case 'contact_form_submit_failed':
        return 'お問い合わせ送信失敗'
      case 'contact_form_submit_error':
        return 'お問い合わせ送信エラー'
      default:
        return action
    }
  }

  const exportLogs = () => {
    const csvContent = [
      ['timestamp', 'action', 'status', 'category', 'ipAddress', 'userAgent', 'errorMessage'],
      ...logs.map(log => [
        log.timestamp,
        log.action,
        log.status,
        log.formData.category,
        log.ipAddress,
        log.userAgent,
        log.errorMessage || ''
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs-${selectedDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg border border-yellow-400/20 max-w-md w-full">
          <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            管理者認証
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="認証トークン"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            />
            <button
              onClick={handleAuth}
              className="w-full px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              認証
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-lg border border-yellow-400/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-yellow-400">
              監査ログ
            </h1>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-yellow-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <button
                onClick={exportLogs}
                disabled={logs.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                <span>CSV出力</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg">
            <div className="p-4 border-b border-gray-700">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                <div className="col-span-2">時刻</div>
                <div className="col-span-2">アクション</div>
                <div className="col-span-1">ステータス</div>
                <div className="col-span-1">カテゴリ</div>
                <div className="col-span-2">IPアドレス</div>
                <div className="col-span-3">ユーザーエージェント</div>
                <div className="col-span-1">エラー</div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-400">
                  読み込み中...
                </div>
              ) : logs.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  {selectedDate} のログはありません
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="p-4 border-b border-gray-700 last:border-b-0">
                    <div className="grid grid-cols-12 gap-4 text-sm text-gray-300">
                      <div className="col-span-2">
                        {new Date(log.timestamp).toLocaleTimeString('ja-JP')}
                      </div>
                      <div className="col-span-2">
                        {getActionDescription(log.action)}
                      </div>
                      <div className="col-span-1 flex items-center space-x-1">
                        {getStatusIcon(log.status)}
                        <span className={log.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                          {log.status}
                        </span>
                      </div>
                      <div className="col-span-1">
                        {log.formData.category}
                      </div>
                      <div className="col-span-2 font-mono text-xs">
                        {log.ipAddress}
                      </div>
                      <div className="col-span-3 truncate text-xs">
                        {log.userAgent}
                      </div>
                      <div className="col-span-1">
                        {log.errorMessage && (
                          <span className="text-red-400 text-xs">
                            {log.errorMessage.length > 20 
                              ? `${log.errorMessage.substring(0, 20)}...`
                              : log.errorMessage
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>
              <strong>注意:</strong> このページは管理者専用です。
              ログには匿名化されたIPアドレスと基本的な送信情報のみが記録されています。
              個人を特定できる情報は記録されていません。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}