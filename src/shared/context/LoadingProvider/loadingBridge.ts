interface LoadingHandlers {
  start: () => void
  stop: () => void
}

let handlers: LoadingHandlers | null = null

export function registerLoadingHandlers(next: LoadingHandlers | null) {
  handlers = next
}

export function notifyRequestStart() {
  handlers?.start()
}

export function notifyRequestEnd() {
  handlers?.stop()
}
