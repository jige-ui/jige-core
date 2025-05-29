import { hasAnimation } from '@/common/dom'
import { runSolidEventHandler } from '@/common/solidjs'
import { createElementBounds } from '@solid-primitives/bounds'
import { mergeRefs } from '@solid-primitives/refs'
import type { JSX } from 'solid-js'
import { Show, onMount, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, watch } from 'solid-uses'
import { context } from './context'
import { makeEventListener } from '@solid-primitives/event-listener'
import { throttle } from '@solid-primitives/scheduled'

function FloatingContentCore(
  props: {
    zindex?: number
  } & JSX.HTMLAttributes<HTMLDivElement>,
) {
  const [state, actions] = context.useContext()
  const [localProps, otherProps] = splitProps(props, [
    'children',
    'zindex',
    'ref',
    'onMouseEnter',
    'onMouseLeave',
    'onAnimationEnd',
  ])

  let rootContent!: HTMLDivElement

  const targetBounds = createElementBounds(() => state.refTrigger)
  const contentBounds = createElementBounds(() => state.refContent)

  const throttleUpdate = throttle(actions.updatePos, 16)

  onMount(() => {
    makeEventListener(window, 'resize', throttleUpdate)

    watch(
      () => [{ ...targetBounds }, { ...contentBounds }],
      () => {
        throttleUpdate()
      },
    )

    onClickOutside(
      state.refContent!,
      () => {
        state.trigger !== 'manual' && actions.setOpen(false)
      },
      { ignore: [state.refTrigger!] },
    )

    watch(
      () => state.status,
      () => {
        if (state.status.endsWith('ing')) {
          if (!hasAnimation(rootContent)) {
            actions.setStatus(state.status.replace('ing', 'ed') as any)
          }
        }
      },
    )

    watch(
      () => state.disabled,
      (d) => {
        if (d) {
          actions.setOpen(false)
        }
      },
    )
  })

  return (
    <div
      style={{
        transform: `translate3d(${state.x}px, ${state.y}px, 0px)`,
        top: 0,
        left: 0,
        position: 'fixed',
        'z-index': localProps.zindex ?? 'auto',
        'min-width': 'max-content',
        'pointer-events': 'auto',
      }}
      ref={(el) => {
        actions.setState('refContent', el)
      }}
    >
      <div
        {...otherProps}
        data-floating-status={state.status}
        data-floating-placement={state.placement}
        ref={mergeRefs(localProps.ref, (el) => {
          rootContent = el
        })}
        onAnimationEnd={(e) => {
          if (state.status.startsWith('clos')) {
            actions.setStatus('closed')
          }
          if (state.status.startsWith('open')) {
            actions.setStatus('opened')
          }
          runSolidEventHandler(e, localProps.onAnimationEnd)
        }}
        onMouseEnter={(e) => {
          if (state.canHoverContent && state.trigger === 'hover') {
            actions.setTimerOpen(true)
          }
          runSolidEventHandler(e, localProps.onMouseEnter)
        }}
        onMouseLeave={(e) => {
          if (state.canHoverContent && state.trigger === 'hover') {
            actions.setTimerOpen(false)
          }
          runSolidEventHandler(e, localProps.onMouseLeave)
        }}
      >
        {localProps.children}
      </div>
    </div>
  )
}

export function Content(
  props: {
    zindex?: number
  } & JSX.HTMLAttributes<HTMLDivElement>,
) {
  const [state] = context.useContext()

  return (
    <Portal mount={document.body}>
      <Show when={state.status !== 'closed'}>
        <FloatingContentCore {...props} />
      </Show>
    </Portal>
  )
}
