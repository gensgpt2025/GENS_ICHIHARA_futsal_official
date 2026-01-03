// Replace photo filenames in public/gallery/gallery-data.json to .webp
// only when the corresponding .webp file actually exists.
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const jsonPath = path.join(root, 'public', 'gallery', 'gallery-data.json')
const photosDir = path.join(root, 'public', 'gallery', 'photos')

function toWebpName(name) {
  const ext = path.extname(name)
  const base = name.slice(0, -ext.length)
  return `${base}.webp`
}

function run() {
  const raw = fs.readFileSync(jsonPath, 'utf8')
  const data = JSON.parse(raw)
  let changed = 0
  if (Array.isArray(data.photos)) {
    data.photos = data.photos.map((p) => {
      const filename = p.filename || ''
      const webp = toWebpName(filename)
      const webpPath = path.join(photosDir, webp)
      if (fs.existsSync(webpPath)) {
        changed++
        return { ...p, filename: webp }
      }
      return p
    })
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`Rewrote gallery-data.json. Updated ${changed} photo filename(s) to .webp when available.`)
}

run()

