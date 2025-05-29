import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { Ref, mergeRefs } from '@solid-primitives/refs'
import { onMount } from 'solid-js'
import { context } from './context'
import { makeEventListener } from '@solid-primitives/event-listener'

export function Trigger(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>
  ref?: HTMLElement | ((el: HTMLElement) => void)
}) {
  let ref!: HTMLElement
  const [, actions] = context.useContext()

  onMount(() => {
    makeEventListener(ref, 'click', () => {
      actions.setOpen(true)
    })
  })
  return (
    <Ref
      ref={
        mergeRefs(props.ref, (r) => {
          ref = r
        }) as any
      }
    >
      {callMaybeContextChild(context.useContext(), props.children)}
    </Ref>
  )
}
