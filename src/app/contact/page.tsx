'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Heart, 
  Send,
  User,
  MessageSquare,
  Building,
  UserCheck
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)

  // バリデーション関数
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    // 名前の検証
    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須項目です'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'お名前は2文字以上で入力してください'
    } else if (formData.name.length > 50) {
      newErrors.name = 'お名前は50文字以内で入力してください'
    }

    // メールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須項目です'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    } else if (formData.email.length > 100) {
      newErrors.email = 'メールアドレスは100文字以内で入力してください'
    }

    // 件名の検証
    if (!formData.subject.trim()) {
      newErrors.subject = '件名は必須項目です'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = '件名は5文字以上で入力してください'
    } else if (formData.subject.length > 100) {
      newErrors.subject = '件名は100文字以内で入力してください'
    }

    // メッセージの検証
    if (!formData.message.trim()) {
      newErrors.message = 'メッセージは必須項目です'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'メッセージは1000文字以内で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // エラーがある場合はクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // 監査ログ記録関数
  const logAuditEvent = async (action: string, status: 'success' | 'error', errorMessage?: string) => {
    try {
      await fetch('/api/audit-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          formData: {
            category: formData.category,
          },
          status,
          errorMessage
        })
      })
    } catch (error) {
      // 監査ログの失敗は元の処理を妨げない
      console.warn('Audit log failed:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // バリデーションチェック
    if (!validateForm()) {
      await logAuditEvent('contact_form_validation_failed', 'error', 'Form validation failed')
      return
    }
    
    // 送信頻度制限チェック（1分間に1回まで）
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    const minInterval = 60 * 1000 // 1分

    if (timeSinceLastSubmit < minInterval) {
      const remainingTime = Math.ceil((minInterval - timeSinceLastSubmit) / 1000)
      setErrors({
        form: `送信間隔が短すぎます。${remainingTime}秒後に再度お試しください。`
      })
      await logAuditEvent('contact_form_rate_limited', 'error', `Rate limited: ${remainingTime}s remaining`)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    
    try {
      // FormSubmitサービスを使用してメール送信
      const formSubmitData = new FormData()
      formSubmitData.append('name', formData.name)
      formSubmitData.append('email', formData.email)
      formSubmitData.append('category', formData.category)
      formSubmitData.append('subject', formData.subject)
      formSubmitData.append('message', formData.message)
      formSubmitData.append('_subject', `GENS ICHIHARA お問い合わせ: ${formData.subject}`)
      formSubmitData.append('_template', 'table')
      
      const response = await fetch('https://formsubmit.co/gensichihara@gmail.com', {
        method: 'POST',
        body: formSubmitData
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setLastSubmitTime(now)
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          category: 'general',
          subject: '',
          message: ''
        })
        setErrors({})
        
        // 成功の監査ログ
        await logAuditEvent('contact_form_submitted', 'success')
      } else {
        setSubmitStatus('error')
        // 送信失敗の監査ログ
        await logAuditEvent('contact_form_submit_failed', 'error', `HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('送信エラー:', error)
      setSubmitStatus('error')
      // エラーの監査ログ
      await logAuditEvent('contact_form_submit_error', 'error', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
            Contact
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* お問い合わせフォーム */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 sm:p-8">
              <h2 className="font-garamond font-bold text-xl lg:text-2xl text-yellow-400 mb-6 flex items-center">
                <Mail className="mr-2" size={24} />
                お問い合わせ
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                  <p className="text-green-400 text-center">
                    お問い合わせありがとうございます。<br />
                    内容を確認の上、後日ご返信いたします。
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
                  <p className="text-red-400 text-center">
                    送信に失敗しました。<br />
                    時間をおいて再度お試しください。
                  </p>
                </div>
              )}

              {errors.form && (
                <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
                  <p className="text-red-400 text-center">
                    {errors.form}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={50}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:ring-1 transition-colors ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                        : 'border-gray-600 focus:border-yellow-400 focus:ring-yellow-400'
                    }`}
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    メールアドレス <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:ring-1 transition-colors ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                        : 'border-gray-600 focus:border-yellow-400 focus:ring-yellow-400'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* お問い合わせ種別 */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    お問い合わせ種別
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  >
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="practice">練習参加のお問い合わせ</option>
                    <option value="match">練習試合のお問い合わせ</option>
                    <option value="sponsor">スポンサー・協賛について</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                {/* 件名 */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    件名 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:ring-1 transition-colors ${
                      errors.subject 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                        : 'border-gray-600 focus:border-yellow-400 focus:ring-yellow-400'
                    }`}
                    placeholder="お問い合わせの件名をご記入ください"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* メッセージ */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    メッセージ <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={1000}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:ring-1 transition-colors resize-vertical ${
                      errors.message 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                        : 'border-gray-600 focus:border-yellow-400 focus:ring-yellow-400'
                    }`}
                    placeholder="お問い合わせ内容を詳しくご記入ください"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <p className="text-sm text-red-400">{errors.message}</p>
                    )}
                    <p className="text-xs text-gray-400 ml-auto">{formData.message.length}/1000</p>
                  </div>
                </div>

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>送信する</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* チーム情報・SNS・スポンサー募集 */}
          <div className="order-1 lg:order-2 space-y-8">
            
            {/* チーム情報 */}
            <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 sm:p-8">
              <h2 className="font-garamond font-bold text-xl lg:text-2xl text-yellow-400 mb-6 flex items-center">
                <MapPin className="mr-2" size={24} />
                チーム情報
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <Building size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">チーム名</p>
                    <p>GENS ICHIHARA</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">活動拠点</p>
                    <p>千葉県市原市</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <UserCheck size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">運営</p>
                    <p>CWG</p>
                    <p className="text-sm text-gray-400">代表：菅谷 裕樹</p>
                  </div>
                </div>
              </div>
            </div>

            {/* スポンサー・協賛募集 */}
            <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 sm:p-8">
              <h2 className="font-garamond font-bold text-xl lg:text-2xl text-yellow-400 mb-6 flex items-center">
                <Heart className="mr-2" size={24} />
                スポンサー・協賛募集
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  GENS ICHIHARAでは、チーム活動を支援していただける
                  スポンサー・協賛企業様・個人様を募集しています。
                </p>
                
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">支援内容例</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>ユニフォーム・用具への企業名掲載</li>
                    <li>公式サイト・SNSでの企業紹介</li>
                    <li>イベント・試合での企業PR機会</li>
                    <li>地域貢献活動での連携</li>
                  </ul>
                </div>
                
                <p className="text-sm">
                  詳細については、お問い合わせフォームより
                  「スポンサー・協賛について」を選択してご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ホームに戻るボタン */}
        <div className="flex justify-center mt-12 pb-8">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}