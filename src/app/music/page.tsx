import AudioPlayer from '@/components/audio/AudioPlayer'
import { audioTracks } from '@/data/audio-tracks'

export const metadata = {
  title: 'Music | GENS ICHIHARA',
  description: 'GENS ICHIHARA の音源を再生できます。',
}

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-4">
            Music
          </h1>
          <p className="text-gray-300">チーム関連の音源を再生できます。</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AudioPlayer tracks={audioTracks} />

          <div className="mt-6 text-gray-400 text-sm">
            <p>
              注意: 音源ファイルは本サイトのサーバから配信します。データ通信量にご注意ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

