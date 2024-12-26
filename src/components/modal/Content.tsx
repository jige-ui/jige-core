import type { JSX } from 'solid-js/jsx-runtime'
import { combineStyle, hasAnimation } from '@/common/dom'
import { callMaybeContextChild, type PropsWithContextChild } from '@/common/props'
import { Ref } from '@solid-primitives/refs'
import { createMemo, onCleanup, onMount, splitProps } from 'solid-js'
import { onClickOutside, useEventListener, watch } from 'solid-uses'
import { context, GloablModalStore } from './context'

export function Content(
  props: PropsWithContextChild<typeof context, JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [localProps, otherProps] = splitProps(props, ['children', 'style'])
  let ref!: HTMLElement
  const [state, actions] = context.useContext()
  const [gs, setGs] = GloablModalStore

  const isActived = createMemo(() => gs.stack[gs.stack.length - 1] === state.id)

  onMount(() => {
    setGs('stack', (stack) => {
      stack.push(state.id)
      return [...stack]
    })

    ref.style.pointerEvents = 'auto'

    useEventListener(ref, 'animationend', () => {
      if (state.status.startsWith('clos')) {
        actions.setStatus('closed')
      }
      if (state.status.startsWith('open')) {
        actions.setStatus('opened')
      }
    })

    onClickOutside(ref, () => {
      if (state.closeOnInteractOutside && isActived()) {
        actions.setOpen(false)
      }
    })

    useEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isActived()) {
        actions.setOpen(false)
      }
    })

    watch(() => state.status, () => {
      if (state.status.endsWith('ing')) {
        if (!hasAnimation(ref)) {
          actions.setStatus(state.status.replace('ing', 'ed') as any)
        }
      }
    })
  })

  onCleanup(() => {
    actions.preventBodyScroll(false)
    setGs('stack', (stack) => {
      const index = stack.indexOf(state.id)
      if (index !== -1) {
        stack.splice(index, 1)
      }
      return [...stack]
    })
  })
  return (
    <div
      tabIndex={-1}
      style={combineStyle({
        position: 'fixed',
        inset: 0,
      }, localProps.style)}
      {...otherProps}
    >
      <Ref ref={ref}>
        {callMaybeContextChild(context, localProps.children)}
      </Ref>
    </div>
  )
}
