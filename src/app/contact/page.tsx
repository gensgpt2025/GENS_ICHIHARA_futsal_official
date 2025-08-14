'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Users, 
  Heart, 
  Send,
  User,
  MessageSquare,
  Building,
  ExternalLink,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 実際の送信処理をここに実装
    // この例では2秒後に成功として処理
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        category: 'general',
        subject: '',
        message: ''
      })
    }, 2000)
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="山田 太郎"
                  />
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="example@email.com"
                  />
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
                    <option value="join">入団・体験に関して</option>
                    <option value="sponsor">スポンサー・協賛について</option>
                    <option value="media">取材・メディア関係</option>
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="お問い合わせの件名をご記入ください"
                  />
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-vertical"
                    placeholder="お問い合わせ内容を詳しくご記入ください"
                  />
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

            {/* SNS連携 */}
            <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 sm:p-8">
              <h2 className="font-garamond font-bold text-xl lg:text-2xl text-yellow-400 mb-6 flex items-center">
                <Users className="mr-2" size={24} />
                SNS・最新情報
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">
                  最新の活動情報やニュースは各SNSでお知らせしています
                </p>
                
                {/* SNSリンクのプレースホルダー */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <ExternalLink size={20} className="text-blue-400" />
                    </div>
                    <p className="text-white font-medium">Twitter</p>
                    <p className="text-xs text-gray-400">準備中</p>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <ExternalLink size={20} className="text-pink-400" />
                    </div>
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-xs text-gray-400">準備中</p>
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
                  スポンサー・協賛企業様を募集しています。
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
                  詳細については、下記お問い合わせフォームより
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