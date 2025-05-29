import { hasAnimation } from '@/common/dom'
import { createElementBounds } from '@solid-primitives/bounds'
import { makeEventListener } from '@solid-primitives/event-listener'
import { Show, onMount } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Portal } from 'solid-js/web'
import { watch } from 'solid-uses'
import context from './context'

function ContentCore(
  props: { zindex?: number } & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onAnimationEnd' | 'ref'>,
) {
  let rootContent!: HTMLDivElement
  const [state, actions] = context.useContext()
  const targetBounds = createElementBounds(() => state.triggerEl)
  const contentBounds = createElementBounds(() => state.contentEl)
  onMount(() => {
    watch(
      () => ({ ...targetBounds }),
      () => {
        actions.setOpen(false)
      },
      { defer: true },
    )

    watch(
      () => ({ ...contentBounds, stateClientX: state.clientX, stateClientY: state.clientY }),
      () => {
        actions.updatePos()
      },
    )

    watch(
      () => state.status,
      () => {
        if (state.status.endsWith('ing')) {
          if (!hasAnimation(rootContent)) {
            actions.setState('status', state.status.replace('ing', 'ed') as any)
          }
        }
      },
    )

    makeEventListener(window, 'mouseup', (event) => {
      const el = state.triggerEl
      if (!el || el === event.target || event.composedPath().includes(el)) return
      const contentEl = state.contentEl
      if (!contentEl || contentEl === event.target || event.composedPath().includes(contentEl))
        return

      actions.setOpen(false)
    })
  })

  return (
    <div
      ref={(el) => {
        actions.setState('contentEl', el)
      }}
      data-placement={state.placement}
      style={{
        transform: `translate3d(${state.x}px, ${state.y}px, 0px)`,
        top: 0,
        left: 0,
        position: 'fixed',
        'z-index': props.zindex ?? 'auto',
        'min-width': 'max-content',
        'pointer-events': 'auto',
      }}
    >
      <div
        {...props}
        data-status={state.status}
        ref={rootContent}
        onAnimationEnd={() => {
          if (state.status.startsWith('clos')) {
            actions.setState('status', 'closed')
          }
          if (state.status.startsWith('open')) {
            actions.setState('status', 'opened')
          }
        }}
      />
    </div>
  )
}

export function Content(
  props: { zindex?: number } & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onAnimationEnd' | 'ref'>,
) {
  const [state] = context.useContext()
  return (
    <Portal mount={document.body}>
      <Show when={state.status !== 'closed'}>
        <ContentCore {...props} />
      </Show>
    </Portal>
  )
}
