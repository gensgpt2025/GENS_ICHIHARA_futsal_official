export const metadata = {
  title: 'Music | GENS ICHIHARA',
  description: 'GENS ICHIHARA の音源をYouTubeで配信しています。',
}

export default function MusicPage() {
  const videoId = process.env.NEXT_PUBLIC_MUSIC_YOUTUBE_ID
  return (
    <div className="min-h-screen bg-black cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-garamond font-bold text-3xl lg:text-4xl gold-gradient mb-4">
            Music
          </h1>
          <p className="text-gray-300">YouTubeで音源を配信しています。</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {videoId ? (
            <div className="mb-6">
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-yellow-400/20">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="YouTube player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <p className="text-gray-400 text-xs mt-2">
                再生時にYouTube（Google）へ接続します。
              </p>
            </div>
          ) : (
            <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 text-center text-gray-300">
              YouTube動画IDが未設定です。環境変数 <code className="px-1 bg-gray-800 rounded">NEXT_PUBLIC_MUSIC_YOUTUBE_ID</code> を設定してください。
            </div>
          )}

          <div className="mt-6 text-gray-400 text-sm">
            <p>注意: データ通信量にご注意ください。</p>
          </div>
        </div>
      </div>
    </div>
  )
}

