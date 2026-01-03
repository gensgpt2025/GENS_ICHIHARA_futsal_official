// Convert PNGs under public/gallery/photos to WebP using sharp
// Usage: node scripts/convert-to-webp.mjs [quality]
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const photosDir = path.join(root, 'public', 'gallery', 'photos')
const quality = Number(process.argv[2] || 80)

if (!fs.existsSync(photosDir)) {
  console.error('Photos directory not found:', photosDir)
  process.exit(1)
}

const files = fs.readdirSync(photosDir).filter((f) => f.toLowerCase().endsWith('.png'))
if (files.length === 0) {
  console.log('No PNG files found in', photosDir)
  process.exit(0)
}

async function run() {
  let ok = 0
  for (const file of files) {
    const src = path.join(photosDir, file)
    const out = path.join(photosDir, path.basename(file, path.extname(file)) + '.webp')
    try {
      await sharp(src).webp({ quality }).toFile(out)
      ok++
      console.log('Converted:', path.basename(src), '->', path.basename(out))
    } catch (e) {
      console.error('Failed:', file, e?.message || e)
    }
  }
  console.log(`Done. Converted ${ok}/${files.length} file(s).`)
}

run()

