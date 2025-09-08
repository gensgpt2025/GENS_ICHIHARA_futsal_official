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
  { id: 4, name: "Yuki",   position: "FP", number: 14, photo: "/team/coach-hiroki.png" },
  { id: 5, name: "Sugaya", position: "GK", number: 22, photo: "/team/coach-hiroki.png" },
]

// Staff data
export const staff: Staff[] = [
  { id: 1, name: "Hiroki Sugaya", role: "ヘッドコーチ", photo: "/team/coach-hiroki.png" },
  { id: 2, name: "** **", role: "アシスタントコーチ", photo: "/team/coach2.jpg" },
]
