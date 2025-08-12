import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import SmartphoneVideoPlayer from '@/components/SmartphoneVideoPlayer'

export default function Home() {
  return (
    <div className="bg-black cyber-grid">
      {/* ヒーローセクション */}
      <section className="relative flex items-start justify-center overflow-hidden pt-0 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        
        <div className="relative z-40 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            {/* ロゴとタイトルを重ねる */}
            <div className="relative mb-4 flex justify-center">
              <div className="w-[36rem] h-[36rem] sm:w-[48rem] sm:h-[48rem] lg:w-[60rem] lg:h-[60rem] flex items-start justify-center">
                <Image
                  src="/logo-gens-final.svg"
                  alt="GENS ICHIHARA Logo"
                  width={960}
                  height={960}
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                  priority
                />
                {/* ロゴの上限から48px下にタイトル配置 */}
                <div className="absolute top-12 inset-x-0 z-50">
                  <h1 className="font-garamond font-black text-4xl sm:text-6xl lg:text-7xl mb-2">
                    <span className="text-gold-glow">
                      GENS ICHIHARA
                    </span>
                  </h1>
                  <p className="font-garamond font-bold text-2xl sm:text-3xl lg:text-4xl text-yellow-400">
                    Futsal Official Website
                  </p>
                </div>
                {/* ロゴの最下部にテキスト配置 */}
                <div className="absolute bottom-20 inset-x-0 z-50">
                  <p className="font-garamond text-2xl sm:text-3xl lg:text-5xl text-gray-300 leading-relaxed text-center">
                    Switch Zero, Fight Hard.<br />
                    - 0秒切替 ・ 最強球際 -
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 背景エフェクト */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse-gold"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse-gold" style={{animationDelay: '1s'}}></div>
      </section>

      {/* チーム紹介セクション */}
      <section className="pt-0 pb-10 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
              Team Policy
            </h2>
            <p className="font-garamond text-2xl text-gray-300 leading-relaxed">
              献身・誠実・尊重・感謝<br />
              勝利に偶然などない<br />
              本気の先へ
            </p>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-4">
              Gallery
            </h2>
          </div>

          <SmartphoneVideoPlayer />
        </div>
      </section>
    </div>
  )
}
