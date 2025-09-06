export type AudioTrack = {
  id: string
  title: string
  artist?: string
  src: string // e.g. "/audio/anthem.mp3" (served from public/)
  cover?: string // e.g. "/images/covers/anthem.jpg"
  durationSeconds?: number
  lyrics?: string
}

