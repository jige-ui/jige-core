import { setData } from '@/common/dataset'
import { hasAnimation } from '@/common/dom'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import type { JSX } from 'solid-js'
import { Show, onMount, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, watch } from 'solid-uses'
import { context } from './context'
import { createElementBounds } from '@solid-primitives/bounds'

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

  const bounds = createElementBounds(() => state.refTrigger)

  onMount(() => {
    actions.updatePos()

    watch(
      () => ({ ...bounds }),
      (b) => {
        actions.updatePos()
        console.log('update by target changed')
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
      ref={actions.setRefContent}
    >
      <div
        {...otherProps}
        {...setData({
          'floating-status': state.status,
          'floating-placement': state.placement,
        })}
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
