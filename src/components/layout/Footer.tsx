import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴとチーム情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-black font-garamond font-black text-xl">G</span>
              </div>
              <div>
                <h2 className="font-garamond font-bold text-xl gold-gradient">
                  GENS ICHIHARA
                </h2>
                <p className="text-yellow-400/80 text-sm font-garamond">
                  FUTSAL OFFICIAL
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-inter">
              千葉県市原市を拠点とするフットサルチーム。<br />
              情熱と技術、そしてチームワークを大切に、<br />
              地域に愛されるチームを目指しています。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="font-garamond font-bold text-yellow-400 mb-4">
              クイックリンク
            </h3>
            <ul className="space-y-2 font-inter">
              <li>
                <Link href="/team" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  チーム紹介
                </Link>
              </li>
              <li>
                <Link href="/matches" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  試合結果
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  ニュース
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  練習・活動
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  ギャラリー
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="font-garamond font-bold text-yellow-400 mb-4">
              お問い合わせ
            </h3>
            <div className="space-y-3 font-inter">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin size={16} className="text-yellow-400 flex-shrink-0" />
                <span>千葉県市原市</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                <span>お問い合わせフォームから</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail size={16} className="text-yellow-400 flex-shrink-0" />
                <span>contact@gensichihara.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 著作権 */}
        <div className="mt-8 pt-8 border-t border-yellow-400/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-inter">
              © {currentYear} GENS ICHIHARA FUTSAL OFFICIAL. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-inter">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-inter">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer