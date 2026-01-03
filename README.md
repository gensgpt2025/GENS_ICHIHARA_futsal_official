GENS ICHIHARA website

This project is a Next.js app that renders content from Google Sheets via API routes. It supports on-demand revalidation and debug views for easier operations.

## Environment Variables

- REVALIDATE_TOKEN: Token for protected debug/revalidation endpoints.
- SHEETS_SPREADSHEET_ID: Target spreadsheet ID.
- SHEETS_SERVICE_ACCOUNT_EMAIL: Service account email with read access to the sheet.
- SHEETS_PRIVATE_KEY: Raw multi-line private key (BEGIN/END with line breaks).
- SHEETS_PRIVATE_KEY_BASE64: Base64-encoded private key (single line). Set this instead of SHEETS_PRIVATE_KEY when preferred.
- Optional ranges:
  - SCHEDULE_RANGE (default: `Schedule!A2:N`)
  - PLAYERS_RANGE (default: `players!A2:E`)
  - GUEST_RANGE (default: `guestMembers!A2:E`)
  - STAFF_RANGE (default: `staff!A2:D`)

See `.env.example` for a template. Use one of SHEETS_PRIVATE_KEY or SHEETS_PRIVATE_KEY_BASE64, not both.

## Google Sheets Setup

- Share the spreadsheet with the service account email as a viewer.
- Include a header row for the schedule sheet (recommended). The API maps by header names if present:
  - date/日付, start/開始, end/終了, title/タイトル/件名, type/種別/種類, location/場所/会場, notes/備考/メモ, opponent/対戦相手/相手, competition/大会/リーグ, scorers/得点者, etc.
- Dates/times can be either proper date/time cells or strings; the API normalizes common formats.

## Development

- Install dependencies: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## API Endpoints

- `GET /api/content/schedule` — Returns schedule items from the sheet.
- `GET /api/content/team` — Returns players/guests/staff from the sheet.
- `POST /api/revalidate?token=REVALIDATE_TOKEN[&path=/team]` — On-demand ISR revalidation.

### Debug

- Append `?debug=1&token=REVALIDATE_TOKEN` to content endpoints to include diagnostics (e.g., counts, header).
  - Example: `/api/content/schedule?debug=1&token=...`

## Notes

- Keep REVALIDATE_TOKEN long and secret. Do not expose it publicly.
- If ranges/sheet names differ, override via environment variables as needed.
