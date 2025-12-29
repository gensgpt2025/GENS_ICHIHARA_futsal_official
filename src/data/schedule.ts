import type { ScheduleItem } from '@/types/schedule'

// このファイルを編集すればスケジュールを更新できます。
// 例をいくつか入れてあります。必要に応じて追加/編集してください。

export const schedule: ScheduleItem[] = [
  {
    id: '2025-11-30-training',
    date: '2025-11-30',
    start: '19:00',
    end: '21:00',
    title: 'トレーニング',
    type: 'training',
    location: '晴れのち晴れ（浜野）タフレックスコート',
    notes: '集合 18:40／準備・片付け含む',
  },
  {
    id: '2025-12-13-training',
    date: '2025-12-13',
    start: '19:00',
    end: '21:00',
    title: 'トレーニング（相手調整中）',
    type: 'training',
    location: '晴れのち晴れ（浜野）タフレックスコート',
  },
  {
    id: '2026-01-17-match',
    date: '2026-01-17',
    start: '19:00',
    end: '21:00',
    title: '練習試合（相手調整中）',
    type: 'match',
    location: '晴れのち晴れ（浜野）タフレックスコート',
  },

  {
    id: '2026-01-31-match',
    date: '2026-01-31',
    start: '19:00',
    end: '21:00',
    title: '練習試合（相手調整中）',
    type: 'match',
    location: '晴れのち晴れ（浜野）タフレックスコート',
  },
  {
    id: '2026-01-04-training',
    date: '2026-01-04',
    start: '09:00',
    end: '11:00',
    title: 'トレーニング',
    type: 'training',
    location: '姉崎多目的',
  },
  {
    id: '2026-01-11-training',
    date: '2026-01-11',
    start: '11:00',
    end: '13:00',
    title: 'トレーニング',
    type: 'training',
    location: '姉崎多目的',
  },
  {
    id: '2026-01-25-training',
    date: '2026-01-25',
    start: '17:00',
    end: '19:00',
    title: 'トレーニング',
    type: 'training',
    location: '姉崎多目的',
  },
]

// 試合結果の登録例（追加する場合の参考）
// {
//   id: '2025-09-20-league',
//   date: '2025-09-20',
//   title: 'リーグ戦 第3節',
//   type: 'match',
//   opponent: '○○FC',
//   location: '△△アリーナ',
//   start: '18:00',
//   end: '20:00',
//   competition: '市原リーグ',
//   result: { homeScore: 3, awayScore: 2, outcome: 'win', goalScorers: ['#7 山田', '#10 佐藤', '#14 田中'] },
// }
