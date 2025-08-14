'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Target, Heart, Award } from 'lucide-react'

// サンプルメンバーデータ（実際のデータに置き換える）
const teamMembers = [
  {
    id: 1,
    name: "田中 太郎",
    position: "FP",
    number: 10,
    photo: "/team/player1.jpg",
    motto: "全力プレーで仲間を信じる"
  },
  {
    id: 2,
    name: "佐藤 次郎",
    position: "GK",
    number: 1,
    photo: "/team/player2.jpg",
    motto: "最後の砦として守り抜く"
  },
  {
    id: 3,
    name: "鈴木 三郎",
    position: "FP",
    number: 7,
    photo: "/team/player3.jpg",
    motto: "スピードで相手を翻弄する"
  },
  {
    id: 4,
    name: "高橋 四郎",
    position: "FP",
    number: 9,
    photo: "/team/player4.jpg",
    motto: "得点で勝利に貢献"
  }
]

const staff = [
  {
    id: 1,
    name: "山田 監督",
    role: "監督",
    photo: "/team/coach1.jpg",
    message: "チーム一丸となって戦い抜きます"
  },
  {
    id: 2,
    name: "伊藤 コーチ",
    role: "アシスタントコーチ",
    photo: "/team/coach2.jpg",
    message: "選手の成長をサポートします"
  }
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-6">
            Team
          </h1>
        </div>

        {/* チームアイデンティティセクション */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-garamond font-bold text-2xl lg:text-3xl gold-gradient mb-8">
              Team Identity
            </h2>
          </div>

          {/* メインスローガン */}
          <div className="text-center mb-12 p-8 bg-gray-900/50 rounded-xl border border-yellow-400/20">
            <h3 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-gray-200 leading-relaxed mb-4">
              Switch Zero, Fight Hard.
            </h3>
            <p className="font-garamond text-xl sm:text-2xl lg:text-3xl text-yellow-400 mb-6">
              - 0秒切替 ・ 最強球際 -
            </p>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              瞬時の判断と切り替え、そして決して諦めない球際への執念。
              これが私たちGENS ICHIHARAの戦い方です。
            </p>
          </div>

          {/* チームポリシー */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">献身</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                チームのために全力を尽くす
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">誠実</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                常に正直で真摯な姿勢
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">尊重</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                相手と仲間への深い敬意
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">感謝</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                すべてに対する謙虚な心
              </p>
            </div>
          </div>

          {/* チームビジョン */}
          <div className="text-center p-8 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-xl border border-yellow-400/20">
            <h4 className="font-garamond font-bold text-2xl text-yellow-400 mb-4">Our Vision</h4>
            <p className="font-garamond text-xl text-gray-200 leading-relaxed mb-4">
              勝利に偶然などない
            </p>
            <p className="font-garamond text-xl text-gray-200 leading-relaxed mb-6">
              本気の先へ
            </p>
            <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
              市原市を拠点とし、地域に愛されるチームとして成長し続けます。
              一人一人の個性を活かしながら、チーム一丸となって頂点を目指します。
              フットサルを通じて、人として、選手として、常に成長し続けることが私たちの使命です。
            </p>
          </div>
        </section>

        {/* メンバー紹介セクション */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="font-garamond font-bold text-2xl lg:text-3xl gold-gradient mb-4">
              Team Members
            </h2>
          </div>

          {/* 選手紹介 */}
          <div className="mb-12">
            <h3 className="font-garamond font-bold text-xl text-yellow-400 mb-6 text-center">Players</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-yellow-400">#{member.number}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Photo Coming Soon</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-white mb-1">{member.name}</h4>
                    <p className="text-yellow-400 text-sm mb-2">{member.position} #{member.number}</p>
                    <p className="text-gray-300 text-xs leading-relaxed">{member.motto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* スタッフ紹介 */}
          <div>
            <h3 className="font-garamond font-bold text-xl text-yellow-400 mb-6 text-center">Coaching Staff</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {staff.map((member) => (
                <div key={member.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-8 h-8 text-yellow-400" />
                      </div>
                      <p className="text-gray-400 text-sm">Photo Coming Soon</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-white mb-1">{member.name}</h4>
                    <p className="text-yellow-400 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-300 text-xs leading-relaxed">{member.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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