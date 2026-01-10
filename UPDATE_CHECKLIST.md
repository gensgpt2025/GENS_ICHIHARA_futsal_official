# HP 更新チェックリスト

このプロジェクトの更新時に実施するチェック項目をまとめています。

## 準備
- 環境変数（本番環境）:
  - `REVALIDATE_TOKEN`
  - `SHEETS_SPREADSHEET_ID`
  - `SHEETS_SERVICE_ACCOUNT_EMAIL`
  - どちらか一方: `SHEETS_PRIVATE_KEY` または `SHEETS_PRIVATE_KEY_BASE64`
- Google Sheets の共有設定:
  - 対象スプレッドシートをサービスアカウントに「閲覧者」で共有
  - 列順は基本変更しない（変更時はレンジ設定も見直す）

## コンテンツ（シート経由）
- スケジュール・メンバーを Google Sheets で更新
- レンジを変える場合は `.env` で調整（必要に応じて）
  - `SCHEDULE_RANGE` / `PLAYERS_RANGE` / `GUEST_RANGE` / `STAFF_RANGE`
- 反映（ISR 再生成）:
  - 例（Schedule のみ）: `POST /api/revalidate?token=REVALIDATE_TOKEN&path=/schedule`
  - 例（Team のみ）: `POST /api/revalidate?token=REVALIDATE_TOKEN&path=/team`
  - `path` を省略すると主要ページ（/schedule, /team）をまとめて再生成

## メディア（画像・動画）
- トップ動画: `public/home-videos.json` に追記（`youtubeId` または `youtubeUrl`）
- ギャラリー画像:
  - 画像を `public/gallery/photos/` へ追加
  - メタを `public/gallery/gallery-data.json` に追記（`filename` は実ファイル名）
  - 画像最適化（PowerShell）:
    - `npm run optimize:images:sharp`
    - `npm run optimize:rewrite`
  - 命名は可能なら半角英数・ハイフン（例: `my-photo.webp`）

## ローカル確認
- 開発起動: `npm run dev`（確認ページ: `/`, `/team`, `/schedule`, `/matches`, `/gallery`）
- 本番相当: `npm run build && npm run start`

## 本番反映
- 変更のコミット/プッシュ:
  - `git add -A`
  - `git commit -m "<更新内容>"`
  - `git push`
- 必要に応じて ISR 再実行（上記の revalidate）

## 保守（任意）
- 依存監査: `npm audit` → 必要に応じて `npm audit fix`
- 同一メジャー範囲の更新: `npm update`
- 画像/外部リソース: 追加のリモート画像を使う場合は `next.config.ts` の `images.remotePatterns` を確認
- キャッシュ整理（任意）: `.next` を削除して再ビルド（`Remove-Item -Recurse -Force .next`）

