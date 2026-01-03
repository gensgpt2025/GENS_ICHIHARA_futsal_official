// Minimal HTTP server to exercise compiled Next.js API route handlers over HTTP.
// Starts, performs requests, prints results, shuts down.
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function toNode(res, nodeRes) {
  const status = res.status || 200
  const headers = {}
  res.headers?.forEach((v, k) => {
    headers[k] = v
  })
  nodeRes.writeHead(status, headers)
}

async function main() {
  process.env.REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'devtoken'

  const scheduleMod = await import(pathToFileURL(path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'content', 'schedule', 'route.js')).href)
  const teamMod = await import(pathToFileURL(path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'content', 'team', 'route.js')).href)
  const revalidateMod = await import(pathToFileURL(path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'revalidate', 'route.js')).href)

  const scheduleGET = scheduleMod.default.routeModule.userland.GET
  const teamGET = teamMod.default.routeModule.userland.GET
  const revalidateGET = revalidateMod.default.routeModule.userland.GET
  const revalidatePOST = revalidateMod.default.routeModule.userland.POST || revalidateGET

  const server = http.createServer(async (req, res) => {
    try {
      const fullUrl = `http://localhost${req.url}`
      const headers = new Headers()
      for (const [k, v] of Object.entries(req.headers)) {
        if (Array.isArray(v)) headers.set(k, v.join(', '))
        else if (v) headers.set(k, v)
      }
      const reqStub = { url: fullUrl, headers }
      if (req.method === 'GET' && req.url.startsWith('/api/content/schedule')) {
        const r = await scheduleGET(reqStub)
        toNode(r, res)
        res.end(await r.text())
        return
      }
      if (req.method === 'GET' && req.url.startsWith('/api/content/team')) {
        const r = await teamGET(reqStub)
        toNode(r, res)
        res.end(await r.text())
        return
      }
      if (req.url.startsWith('/api/revalidate')) {
        const handler = req.method === 'POST' ? revalidatePOST : revalidateGET
        const r = await handler(reqStub)
        toNode(r, res)
        res.end(await r.text())
        return
      }
      res.statusCode = 404
      res.end('not found')
    } catch (e) {
      res.statusCode = 500
      res.end('error')
    }
  })

  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()

  const results = []
  const doReq = async (label, init) => {
    try {
      const r = await fetch(`http://localhost:${port}${init.path}`, { method: init.method || 'GET' })
      const t = await r.text()
      results.push(`HTTP ${label}: ${r.status} ${t.substring(0, 200)}`)
    } catch (e) {
      results.push(`HTTP ${label}: error ${e.message}`)
    }
  }

  await doReq('schedule', { path: '/api/content/schedule' })
  await doReq('team', { path: '/api/content/team' })
  await doReq('revalidate unauthorized', { path: '/api/revalidate' })
  await doReq('revalidate authorized', { path: '/api/revalidate?token=' + process.env.REVALIDATE_TOKEN })

  server.close()
  for (const line of results) console.log(line)
}

main()

