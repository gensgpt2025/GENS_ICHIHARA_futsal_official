'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Users, 
  ExternalLink,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'

export default function SNSPage() {
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
            SNS・最新情報
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            GENS ICHIHARAの最新の活動情報やニュースは各SNSでお知らせしています
          </p>
        </div>

        {/* SNS連携 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 sm:p-8">
            <h2 className="font-garamond font-bold text-xl lg:text-2xl text-yellow-400 mb-8 flex items-center justify-center">
              <Users className="mr-2" size={24} />
              公式SNSアカウント
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-center mb-8">
                チームの最新情報、練習風景、試合結果などを随時更新しています
              </p>
              
              {/* SNSリンク */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a 
                  href="https://www.instagram.com/gens_ichihara_futsal?igsh=MXBlb3d1N2J6YzN5bg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/30 rounded-lg p-6 text-center hover:bg-gray-800/50 transition-all duration-300 group block"
                >
                  <div className="w-16 h-16 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/30 transition-all duration-300">
                    <Instagram size={32} className="text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Instagram</h3>
                  <div className="inline-flex items-center text-pink-400 text-sm">
                    <span>フォローする</span>
                    <ExternalLink size={16} className="ml-1" />
                  </div>
                </a>
                
                <a 
                  href="https://x.com/gens_ichihara?s=21&t=u0eICswe6_8pqSUQU224UA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/30 rounded-lg p-6 text-center hover:bg-gray-800/50 transition-all duration-300 group block"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-all duration-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">X（Twitter）</h3>
                  <div className="inline-flex items-center text-blue-400 text-sm">
                    <span>フォローする</span>
                    <ExternalLink size={16} className="ml-1" />
                  </div>
                </a>

                <a 
                  href="https://youtube.com/@gensichihara?si=eA0fFEElnYFR8GIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/30 rounded-lg p-6 text-center hover:bg-gray-800/50 transition-all duration-300 group block"
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/30 transition-all duration-300">
                    <Youtube size={32} className="text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">YouTube</h3>
                  <div className="inline-flex items-center text-red-400 text-sm">
                    <span>チャンネル登録</span>
                    <ExternalLink size={16} className="ml-1" />
                  </div>
                </a>
              </div>

              {/* お知らせ */}
              <div className="mt-8 p-6 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                <h3 className="text-yellow-400 font-semibold text-lg mb-3 text-center">
                  🎉 公式SNSアカウント運用中
                </h3>
                <p className="text-gray-300 text-center text-sm">
                  GENS ICHIHARAの公式SNSアカウントで最新情報を配信中！<br />
                  ぜひフォロー・チャンネル登録をお願いします。
                </p>
              </div>

              {/* フォロー呼びかけ */}
              <div className="mt-6 text-center">
                <p className="text-gray-300 text-sm">
                  フォロー・いいね・シェア・チャンネル登録で<br />
                  GENS ICHIHARAを応援してください！
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