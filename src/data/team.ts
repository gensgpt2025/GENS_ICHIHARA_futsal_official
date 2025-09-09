export type Player = {
  id: number
  name: string
  position: string // e.g., "FP" | "GK"
  number: number
  photo?: string
}

export type Staff = {
  id: number
  name: string
  role: string
  photo?: string
}

// Players data
export const players: Player[] = [
  { id: 1, name: "Towa",   position: "FP", number: 10, photo: "/team/coach-hiroki.png" },
  { id: 2, name: "Inoue",  position: "FP", number: 27, photo: "/team/coach-hiroki.png" },
  { id: 3, name: "Hosaka", position: "FP", number: 20, photo: "/team/coach-hiroki.png" },
  { id: 4, name: "Yuki",   position: "FP", number: 13, photo: "/team/coach-hiroki.png" },
  { id: 5, name: "Sugaya", position: "GK", number: 22, photo: "/team/coach-hiroki.png" },
  // New
  { id: 6, name: "Yokota",    position: "FP", number: 8,  photo: "/team/coach-hiroki.png" },
  { id: 7, name: "Takagi",    position: "FP", number: 0,  photo: "/team/coach-hiroki.png" },
  { id: 8, name: "Hoshino",   position: "FP", number: 0,  photo: "/team/coach-hiroki.png" },
  { id: 9, name: "Ogi",       position: "FP", number: 0,  photo: "/team/coach-hiroki.png" },
  { id:10, name: "Masudome",  position: "FP", number: 0,  photo: "/team/coach-hiroki.png" },
]

// Staff data
export const staff: Staff[] = [
  { id: 1, name: "Sugaya", role: "ヘッドコーチ", photo: "/team/coach-hiroki.png" },
  { id: 2, name: "AI sugaya", role: "マネージャー", photo: "/team/ai-sugaya.png" },
]
