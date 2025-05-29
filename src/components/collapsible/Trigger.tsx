import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { Ref } from '@solid-primitives/refs'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'
import { makeEventListener } from '@solid-primitives/event-listener'

export function Trigger(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>
}) {
  const [state, actions] = context.useContext()
  const [ref, setRef] = createSignal<HTMLElement>()
  let unMountEv = () => {}

  watch(ref, (el) => {
    unMountEv()
    if (!el) {
      return
    }

    unMountEv = makeEventListener(el, 'click', () => {
      if (state.status === 'closed') {
        actions.open()
      } else if (state.status === 'opened') {
        actions.close()
      }
    })
  })

  return <Ref ref={setRef}>{callMaybeContextChild(context.useContext(), props.children)}</Ref>
}
