import type { JSX } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { watch } from 'solid-uses'

export function Remount(props: {
  remountWhenChange: any
  children: JSX.Element
}) {
  const [show, setShow] = createSignal(true)
  watch(
    () => props.remountWhenChange,
    () => {
      setShow(false)
      requestAnimationFrame(() => setShow(true))
    },
    { defer: true },
  )

  return <Show when={show()}>{props.children}</Show>
}
