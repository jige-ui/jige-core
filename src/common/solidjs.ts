import type { JSX } from 'solid-js/jsx-runtime'
import { isArray } from 'radash'

export function runSolidEventHandler<
  T,
  E extends Event,
  EHandler extends JSX.EventHandler<T, any> = JSX.EventHandler<T, E>,
>(event: E, handler?: EHandler | JSX.BoundEventHandler<T, E, EHandler>) {
  if (typeof handler === 'function') {
    handler(event)
  }

  if (isArray(handler)) {
    handler[0](handler[1], event)
  }
}
