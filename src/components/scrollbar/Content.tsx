import { mergeRefs } from '@solid-primitives/refs'
import { throttle } from 'radash'
import type { JSX } from 'solid-js'
import { createSignal, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'
import { createElementBounds } from '@solid-primitives/bounds'

export default function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [, action] = context.useContext()
  const [local, others] = splitProps(props, ['ref'])
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null)

  const bounds = createElementBounds(scrollRef)
  watch(
    [() => bounds.height, () => bounds.width],
    throttle({ interval: 35 }, () => {
      action.setValue()
    }),
  )

  return <div {...others} ref={mergeRefs(local.ref, setScrollRef)} />
}
