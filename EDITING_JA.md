# GENS ICHIHARA サイト編集ガイド（簡易版）

このリポジトリは Next.js 15 + React 19 + Tailwind CSS 4 を使用しています。以下は、よく触る編集ポイントとルールのまとめです。

## 開発の始め方
- 必要: Node.js 18 以上 / npm
- 初回セットアップ: 依存が未導入の場合は `npm install`
- 開発起動: `npm run dev`（http://localhost:3000）
- 本番ビルド: `npm run build` → `npm start`

## 主な編集箇所
- レイアウト/共通
  - `src/app/layout.tsx` / `src/app/globals.css`
  - ヘッダー/フッター: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- トップページ
  - `src/app/page.tsx`
- ニュース（仮実装: 配列直書き）
  - `src/app/news/page.tsx` の `newsData` を編集（将来的に JSON 化可）
- チーム（選手/スタッフ）
  - データ: `src/data/team.ts`（`players`, `staff`）
  - 画面: `src/app/team/page.tsx`
- ギャラリー（写真/動画）
  - データ: `public/gallery/gallery-data.json`
  - 画像: `public/gallery/photos/`
  - YouTube 動画: `youtubeId` または `youtubeUrl` を追加
- 音源（BGM など）
  - データ: `src/data/audio-tracks.ts`
  - ファイル: `public/audio/` 配下（`src`, `covers`）
- SNS/問い合わせ など
  - `src/app/sns/page.tsx`, `src/app/contact/page.tsx`
  - 規約類: `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`

## 画像/音源のルール
- ファイル名: 半角英数字、`-`（ハイフン）`_`（アンダースコア）のみを推奨
- 画像サイズ: 可能なら長辺 1920px 程度、容量は 1MB 未満目安
- パス:
  - ギャラリー写真: `public/gallery/photos/` に配置し、JSON の `filename` に実ファイル名を指定
  - 音源: `public/audio/` に配置し、`src/data/audio-tracks.ts` の `src`/`cover` を更新

## JSON/TS の編集注意（よくあるエラー）
- JSON はダブルクォート必須、末尾カンマ禁止。
- TSX はタグの閉じ忘れ/テンプレート文字列のバッククォートに注意。
- 文字コードは UTF-8 を使用（エディタ設定を UTF-8 に統一）。

## 既知の修正候補（文字化け/構文エラー）
- `src/data/team.ts`（スタッフ `role` の文字列閉じ、文字化け）
- `src/app/team/page.tsx`（日本語テキストの文字化け、未閉じタグ/三項演算子の壊れ）
- `public/gallery/gallery-data.json`（日本語の文字化け、クォート抜けにより JSON 無効）
- `src/lib/gallery.ts`（サーバーサイド回避時のデフォルト値で文字化け/クォート抜け）
- `src/app/news/page.tsx`（モックニュースの文字化け/クォート抜け）

上記はビルドを阻害する可能性があります。正しい日本語文言を頂ければ、文言を保ったまま構文を安全に修正します。暫定対応としては、文言をプレースホルダ（例: "TODO: 文言調整"）に置換してビルド可能状態にすることも可能です。

## 変更フローのおすすめ
1) まず `npm run build` でエラーを洗い出し
2) データ（`team.ts`, `gallery-data.json`, `audio-tracks.ts`）から順に修正
3) ページ（`team/page.tsx`, `news/page.tsx` など）を修正
4) ローカルで確認 → 問題なければデプロイ手順へ

必要に応じて、校正・コピーチェック、画像最適化、アクセシビリティ（`alt` テキスト）確認も対応します。

