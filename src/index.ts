import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

const str = `
setInterval(async () => {
  const res = await fetch(location.origin + BASE + "/version.txt")
  const version = await res.text()
  if (version !== VERSION) {
    console.log('updated!', typeof version, version, typeof VERSION, VERSION)
  }
}, 1000)
`

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => {
  const timestamp = Date.now().toString()
  return ({
    name: 'unplugin-starter',
    buildEnd() {
      this.emitFile({ fileName: 'version.txt', source: timestamp, type: 'asset' })
    },
    transformInclude(id) {
      return id.endsWith('main.ts') || id.includes('worker')
    },
    transform(code, id) {
      // new Blob([Worker])
      // codez
      // code += 'import check from '''
      if (id.endsWith('main.ts')) {
        const res = str.replace('BASE', '""').replaceAll('VERSION', `"${timestamp}"`)
        console.log(res)
        code += `
        const url = URL.createObjectURL(new Blob([${res}], { type: 'application/javascript' }))
        ;new Worker(url)
        `
        return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
      } else {
        console.log(code)
        return code
      }
    },
  })
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
