import { AudioTrack } from '@/types/audio'

export const audioTracks: AudioTrack[] = [
  {
    id: 'anthem-001',
    title: 'GENS ICHIHARA Anthem',
    artist: 'GENS ICHIHARA',
    src: '/audio/anthem.mp3',
    cover: '/gallery/photos/CWG_512x256_fill.png',
  },
]

// 運用メモ:
// - 音源ファイルはリポジトリの `public/audio/` に配置してください（例: public/audio/anthem.mp3）
// - 追加する場合は上記の配列に { id, title, artist?, src, cover? } を追記します
// - ファイル名は半角英数字・ハイフン・アンダースコアのみを推奨します

