import React from 'react'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import XIcon from '@/components/icons/XIcon'

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
            <p className="text-gray-300 text-sm leading-relaxed mb-4 font-inter">
              千葉県市原市を拠点とするフットサルチームです。<br />
              練習試合・練習参加　大歓迎です。<br />
              ☞{' '}
              <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors underline">
                お問い合わせフォーム
              </Link>
            </p>
            <div className="mb-6">
              <p className="text-gray-300 text-sm mb-2 font-inter">
                公式SNSはこちら
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/gens_ichihara_futsal?igsh=MXBlb3d1N2J6YzN5bg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://x.com/gens_ichihara?s=21&t=u0eICswe6_8pqSUQU224UA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon size={20} />
                </a>
              </div>
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
                  試合予定・結果
                </Link>
              </li>
              <li>
                <a href="https://www.instagram.com/gens_ichihara_futsal?igsh=MXBlb3d1N2J6YzN5bg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  SNS
                </a>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  ギャラリー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  お問合せ
                </Link>
              </li>
            </ul>
          </div>

          {/* スポンサー */}
          <div>
            <h3 className="font-garamond font-bold text-yellow-400 mb-4">
              Sponsor
            </h3>
            <div className="space-y-4 font-inter">
              <div className="text-sm text-gray-300">
                CWG
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">ちゃとらAtelier GENS</span>
                <a 
                  href="https://www.instagram.com/gens_ichihara_futsal?igsh=MXBlb3d1N2J6YzN5bg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  aria-label="ちゃとらAtelier GENS Instagram"
                >
                  <Instagram size={18} />
                </a>
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