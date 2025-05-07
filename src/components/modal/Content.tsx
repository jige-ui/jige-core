import { combineStyle, hasAnimation } from '@/common/dom'
import type { PropsWithContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import type { CloseableStatus } from '@/common/types'
import { Ref } from '@solid-primitives/refs'
import createFocusTrap from 'solid-focus-trap'
import { createMemo, onCleanup, onMount, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { useEventListener, watch } from 'solid-uses'
import { GlobalModalStore, context } from './context'

export function Content(
  props: PropsWithContextChild<
    ReturnType<typeof context.useContext>,
    JSX.HTMLAttributes<HTMLDivElement>
  >,
) {
  const [localProps, otherProps] = splitProps(props, ['children', 'style'])
  let ref!: HTMLElement
  const [state, actions] = context.useContext()
  const [gs, setGs] = GlobalModalStore

  const isActive = createMemo(() => gs.stack[gs.stack.length - 1] === state.id)

  onMount(() => {
    setGs('stack', (stack) => {
      stack.push(state.id)
      return [...stack]
    })

    ref.style.pointerEvents = 'auto'
    ref.click()

    createFocusTrap({
      element: () => ref,
      enabled: () => state.status === 'opened',
    })

    useEventListener(ref, 'animationend', () => {
      actions.setStatus(state.status.replace('ing', 'ed') as CloseableStatus)
    })

    useEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isActive() && state.closeOnEsc) {
        actions.setOpen(false)
      }
    })

    watch(
      () => state.status,
      (status) => {
        if (status.endsWith('ing')) {
          if (!hasAnimation(ref)) {
            actions.setStatus(status.replace('ing', 'ed') as CloseableStatus)
          }
        }
      },
    )
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
      style={combineStyle(
        {
          position: 'fixed',
          inset: 0,
        },
        localProps.style,
      )}
      {...otherProps}
    >
      <Ref ref={ref}>{callMaybeContextChild(context.useContext(), localProps.children)}</Ref>
    </div>
  )
}
