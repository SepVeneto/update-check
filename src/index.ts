import { Buffer } from 'node:buffer'
import path from 'node:path'
import fs from 'node:fs'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import { EVENT_UPDATE } from './constant'

const str = `
let timer = setInterval(async () => {
  try {
    const res = await fetch(location.origin + BASE + "/version.txt?t=" + Date.now())
    if (res.status !== 200) {
      self.postMessage('terminate')
      return 
    }
    const version = await res.text()
    if (version && version !== VERSION) {
      self.postMessage("${EVENT_UPDATE}")
    }
  } catch(err) {
    console.error(err)
    clearInterval(timer)
    timer = null
  }
}, TIMER)
`

const defaultOptions = {
  base: '',
  timer: 60 * 1000,
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const timestamp = Date.now().toString()
  const _options = mergeOptions(options)
  const entryFile = getEntryFile()
  return ({
    name: 'unplugin-update-check',
    buildEnd() {
      this.emitFile({ fileName: 'version.txt', source: timestamp, type: 'asset' })
    },
    transformInclude(id) {
      return isEntryFile(id, entryFile)
    },
    transform(code) {
      const res = str
        .replace('BASE', `"${_options.base}"`)
        .replace('TIMER', String(_options.timer))
        .replace('VERSION', `"${timestamp}"`)
      const base64 = Buffer.from(res).toString('base64')
      code = `{
  const res = window.atob("${base64}");
  const blob = new Blob([res], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  window.__UPDATE_WORKER__ = new Worker(url);
}
${code}`
      return code
    },
  })
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

function mergeOptions(options: Options = {}) {
  return {
    ...defaultOptions,
    ...options,
  }
}

function isEntryFile(id: string, entry: string) {
  return path.resolve(id) === entry
}

function getEntryFile() {
  // eslint-disable-next-line node/prefer-global/process
  return fs.existsSync('src/main.ts') ? path.resolve(process.cwd(), 'src/main.ts') : path.resolve(process.cwd(), 'src/main.js')
}
