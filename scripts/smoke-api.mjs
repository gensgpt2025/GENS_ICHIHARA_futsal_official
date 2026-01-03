// Simple smoke test for compiled Next.js API routes without starting a server
// Assumes `next build` has been run and .next/server output exists.

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function ok(label, status, body) {
  console.log(`SMOKE ${label}: status=${status} body=${body.substring(0, 200)}`)
}

async function run() {
  // Basic Request stub matching what our handlers use
  const makeReq = (url, extraHeaders = {}) => ({
    url,
    headers: new Headers(extraHeaders),
  })

  // schedule
  try {
    const schedulePath = path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'content', 'schedule', 'route.js')
    const scheduleRoute = await import(pathToFileURL(schedulePath).href)
    const scheduleGet = scheduleRoute?.default?.routeModule?.userland?.GET
    if (!scheduleGet) throw new Error('GET handler not found')
    const res = await scheduleGet(makeReq('http://local.test/api/content/schedule'))
    const text = await res.text()
    ok('schedule', res.status || 200, text)
  } catch (e) {
    console.log('SMOKE schedule: error', e?.message || String(e))
  }

  // team
  try {
    const teamPath = path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'content', 'team', 'route.js')
    const teamRoute = await import(pathToFileURL(teamPath).href)
    const teamGet = teamRoute?.default?.routeModule?.userland?.GET
    if (!teamGet) throw new Error('GET handler not found')
    const res = await teamGet(makeReq('http://local.test/api/content/team'))
    const text = await res.text()
    ok('team', res.status || 200, text)
  } catch (e) {
    console.log('SMOKE team: error', e?.message || String(e))
  }

  // revalidate unauthorized
  try {
    const revalidatePath = path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'revalidate', 'route.js')
    const revalidateRoute = await import(pathToFileURL(revalidatePath).href)
    const revalidateGet = revalidateRoute?.default?.routeModule?.userland?.GET
    if (!revalidateGet) throw new Error('GET handler not found')
    const res = await revalidateGet(makeReq('http://local.test/api/revalidate'))
    const text = await res.text()
    ok('revalidate unauthorized', res.status || 200, text)
  } catch (e) {
    console.log('SMOKE revalidate unauthorized: error', e?.message || String(e))
  }

  // revalidate authorized
  try {
    process.env.REVALIDATE_TOKEN = 'devtoken'
    const revalidatePath2 = path.join(__dirname, '..', '.next', 'server', 'app', 'api', 'revalidate', 'route.js')
    const revalidateRoute = await import(pathToFileURL(revalidatePath2).href)
    const revalidateGet = revalidateRoute?.default?.routeModule?.userland?.GET
    if (!revalidateGet) throw new Error('GET handler not found')
    const res = await revalidateGet(makeReq('http://local.test/api/revalidate?token=devtoken'))
    const text = await res.text()
    ok('revalidate authorized', res.status || 200, text)
  } catch (e) {
    console.log('SMOKE revalidate authorized: error', e?.message || String(e))
  }
}

run()
