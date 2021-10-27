export enum Events {
  ADD_MONITORING = 'addMonitoring',
}

type Callback = (data?: any) => any

type Listeners = {
  [key in Events]?: Callback[]
}

class EventEmitter {
  private readonly listeners: Listeners = {}

  emit(event: Events, data?: any): void {
    this.listeners[event].forEach((callback: Callback) => callback(data))
  }

  subscribe(event: Events, fn: Callback): () => void {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== fn)
    }
  }
}

export const eventEmitter = new EventEmitter()
