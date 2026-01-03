import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Users, Target, Heart, Award } from 'lucide-react'
import { getTeam } from '@/lib/content/team'

export const revalidate = 300

export default async function TeamPage() {
  const { players, guestMembers, staff } = await getTeam()

  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GENS SPIRIT */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-garamond font-bold text-2xl lg:text-3xl gold-gradient mb-8">
              GENS SPIRIT
            </h2>
          </div>

          {/* メインスローガン */}
          <div className="text-center mb-12 p-8 bg-gray-900/50 rounded-xl border border-yellow-400/20">
            <h3 className="font-garamond text-3xl sm:text-4xl lg:text-5xl text-gray-200 leading-relaxed mb-4">
              Switch Zero, Fight Hard.
            </h3>
            <p className="font-garamond text-xl sm:text-2xl lg:text-3xl text-yellow-400 mb-6">－ 0秒切替･最強球際 －</p>
          </div>

          {/* チームポリシー */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">献身</h4>
              <p className="text-gray-300 text-sm leading-relaxed">最後の1歩まで走り切る</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">誠実</h4>
              <p className="text-gray-300 text-sm leading-relaxed">正々堂々、プレーで示す</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">尊重</h4>
              <p className="text-gray-300 text-sm leading-relaxed">相手･仲間･審判をリスペクト</p>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-garamond font-bold text-xl text-yellow-400 mb-2">感謝</h4>
              <p className="text-gray-300 text-sm leading-relaxed">支えるすべてに「ありがとう」</p>
            </div>
          </div>

          {/* チームビジョン */}
          <div className="text-center p-8 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-xl border border-yellow-400/20">
            <h4 className="font-garamond font-bold text-2xl text-yellow-400 mb-4">Our Vision</h4>
            <p className="font-garamond text-xl text-gray-200 leading-relaxed mb-4">勝利に偶然などない</p>
            <p className="font-garamond text-xl text-gray-200 leading-relaxed mb-6">本気の先へ</p>
            <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
              私たちは「情熱・挑戦・絆」を胸に、Switch Zero, Fight Hard. を体現する。<br />
              フットサルを通じて、人としても選手としても成長を重ね、<br />
              地域に信頼されるクラブとして、チーム一丸で頂点を目指し続ける。
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
              {[...players]
                .sort((a, b) => {
                  const an = a.number === 0 ? 9999 : a.number
                  const bn = b.number === 0 ? 9999 : b.number
                  return an - bn
                })
                .map((member) => (
                <div key={member.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square bg-gray-800 flex items-center justify-center relative">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-yellow-400">{member.number === 0 ? '—' : `#${member.number}`}</span>
                        </div>
                        <p className="text-gray-400 text-sm">Photo Coming Soon</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-white mb-1">{member.name}</h4>
                    <p className="text-yellow-400 text-sm">{member.position} {member.number === 0 ? '#—' : `#${member.number}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* スタッフ紹介 */}
          <div>
            {/* Guest Members */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h3 className="font-garamond font-bold text-xl text-yellow-400">Guest Members</h3>
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...guestMembers]
                .sort((a, b) => (a.number || 0) - (b.number || 0))
                .map((member) => (
                <div key={member.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">#{member.number}</div>
                    <h4 className="font-bold text-lg text-white">{member.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <h3 className="font-garamond font-bold text-xl text-yellow-400 mb-6 text-center">Staff</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {staff.map((member) => (
                <div key={member.id} className="bg-gray-900/50 rounded-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square bg-gray-800 flex items-center justify-center relative">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="w-8 h-8 text-yellow-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Photo Coming Soon</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-white mb-1">{member.name}</h4>
                    <p className="text-yellow-400 text-sm">{member.role}</p>
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
