import React from 'react'
import Link from 'next/link'
import ScheduleListClient from '@/components/schedule/ScheduleListClient'
import { getSchedule } from '@/lib/content/schedule'

export const revalidate = 300

export default async function SchedulePage() {
  const items = await getSchedule()
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold gold-gradient font-garamond">Schedule</h1>
          <p className="text-gray-300 mt-2 font-garamond">GENS ICHIHARA の今後の予定</p>
        </header>

        <ScheduleListClient items={items} />

        <div className="flex justify-center mt-12 pb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
