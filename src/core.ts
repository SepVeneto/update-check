import { EVENT_UPDATE } from './constant'

export function onUpdate(this: any, fn: () => void) {
  if (!window.__UPDATE_WORKER__) {
    console.warn('[@sepveneto/update-check] init failed.')
    return
  }
  window.__UPDATE_WORKER__.onmessage = (evt) => {
    window.__UPDATE_WORKER__?.postMessage('stop')
    window.__UPDATE_WORKER__?.terminate()
    window.__UPDATE_WORKER__ = undefined
    evt.data === EVENT_UPDATE && fn.apply(this)
  }
}
