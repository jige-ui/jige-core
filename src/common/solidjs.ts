import type { JSX } from 'solid-js/jsx-runtime'

export function runSolidEventHandler<
  T,
  E extends Event,
  EHandler extends JSX.EventHandler<T, any> = JSX.EventHandler<T, E>,
>(event: E, handler?: EHandler | JSX.BoundEventHandler<T, E, EHandler>) {
  if (typeof handler === 'function') {
    handler(event)
  }

  if (Array.isArray(handler)) {
    handler[0](handler[1], event)
  }
}
