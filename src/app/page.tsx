import React from 'react'
import { Button } from '@/components/ui/Button'
import { Play, Users, Trophy, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black cyber-grid">
      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl mb-4">
              <span className="gold-gradient neon-glow animate-neon-flicker">
                GENS ICHIHARA
              </span>
            </h1>
            <p className="font-rajdhani font-bold text-xl sm:text-2xl lg:text-3xl text-yellow-400 mb-6">
              FUTSAL OFFICIAL
            </p>
            <p className="font-rajdhani text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              千葉県市原市を拠点とするフットサルチーム<br />
              情熱と技術、そしてチームワークで頂点を目指す
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" isGlowing className="min-w-[200px]">
              <Play className="mr-2 h-5 w-5" />
              チームを見る
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              入団申込
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="glass-effect rounded-lg p-4 text-center">
              <Users className="mx-auto mb-2 text-yellow-400" size={32} />
              <div className="font-orbitron font-bold text-2xl gold-gradient">25+</div>
              <div className="font-rajdhani text-sm text-gray-300">メンバー</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Trophy className="mx-auto mb-2 text-yellow-400" size={32} />
              <div className="font-orbitron font-bold text-2xl gold-gradient">12</div>
              <div className="font-rajdhani text-sm text-gray-300">勝利</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Calendar className="mx-auto mb-2 text-yellow-400" size={32} />
              <div className="font-orbitron font-bold text-2xl gold-gradient">2019</div>
              <div className="font-rajdhani text-sm text-gray-300">設立</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <div className="mx-auto mb-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-orbitron font-bold text-sm">G</span>
              </div>
              <div className="font-orbitron font-bold text-2xl gold-gradient">∞</div>
              <div className="font-rajdhani text-sm text-gray-300">情熱</div>
            </div>
          </div>
        </div>

        {/* 背景エフェクト */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-gold"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-gold" style={{animationDelay: '1s'}}></div>
      </section>

      {/* 最新ニュースセクション */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl gold-gradient mb-4">
              LATEST NEWS
            </h2>
            <p className="font-rajdhani text-lg text-gray-300">
              最新の試合結果・チーム情報をお届け
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="glass-effect rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-orbitron font-bold text-xl">G</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="font-rajdhani text-sm text-yellow-400 mb-2">
                    2024.12.{15 - item}
                  </div>
                  <h3 className="font-rajdhani font-bold text-lg text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    第{item}回市原リーグ 勝利！
                  </h3>
                  <p className="font-rajdhani text-gray-300 text-sm leading-relaxed">
                    素晴らしいチームワークで見事勝利を収めました。次の試合も全力で戦います。
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline">
              ニュース一覧を見る
            </Button>
          </div>
        </div>
      </section>

      {/* チーム紹介セクション */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-orbitron font-bold text-3xl lg:text-4xl gold-gradient mb-6">
                ABOUT TEAM
              </h2>
              <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-6">
                GENS ICHIHARAは2019年に設立された千葉県市原市を拠点とするフットサルチームです。
                技術向上はもちろん、チームワークと地域貢献を大切にしています。
              </p>
              <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-8">
                初心者から経験者まで、フットサルを愛する全ての人が成長できる環境を提供し、
                共に頂点を目指します。
              </p>
              <Button size="lg" isGlowing>
                チーム詳細を見る
              </Button>
            </div>
            <div className="relative">
              <div className="glass-effect rounded-2xl p-8 neon-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="font-orbitron font-bold text-3xl gold-gradient mb-2">25+</div>
                    <div className="font-rajdhani text-gray-300">アクティブメンバー</div>
                  </div>
                  <div className="text-center">
                    <div className="font-orbitron font-bold text-3xl gold-gradient mb-2">5</div>
                    <div className="font-rajdhani text-gray-300">年間の経験</div>
                  </div>
                  <div className="text-center">
                    <div className="font-orbitron font-bold text-3xl gold-gradient mb-2">週2</div>
                    <div className="font-rajdhani text-gray-300">定期練習</div>
                  </div>
                  <div className="text-center">
                    <div className="font-orbitron font-bold text-3xl gold-gradient mb-2">100%</div>
                    <div className="font-rajdhani text-gray-300">情熱</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
