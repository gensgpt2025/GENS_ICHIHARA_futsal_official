import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Coming Soon SVG */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/coming_soon.svg" 
            alt="Coming Soon" 
            width={800}
            height={400}
            className="w-full max-w-2xl h-auto"
            priority
          />
        </div>
        
        {/* Back to Home Button */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-inter font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/50"
          >
            <ArrowLeft size={18} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon