import type { JSX } from 'solid-js'
import { dataSets } from '@/common/dataset'
import { hasAnimation } from '@/common/dom'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import { onMount, Show, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, useEventListener, watch } from 'solid-uses'
import { context } from './context'

function FloatingContentCore(props: {
  zindex?: number
} & JSX.HTMLAttributes<HTMLDivElement>) {
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

  onMount(() => {
    actions.updatePos()
    console.log('update by CONTENT Mounted')

    useEventListener(['resize', 'scroll'], actions.updatePos)

    onClickOutside(state.refContent!, () => {
      state.trigger !== 'manual' && actions.setOpen(false)
    }, { ignore: [state.refTrigger!] })

    watch(() => state.status, () => {
      if (state.status.endsWith('ing')) {
        if (!hasAnimation(rootContent)) {
          actions.setStatus(state.status.replace('ing', 'ed') as any)
        }
      }
    })
  })

  return (
    <div
      style={{
        'transform': `translate3d(${state.x}px, ${state.y}px, 0px)`,
        'top': 0,
        'left': 0,
        'position': 'fixed',
        'z-index': localProps.zindex ?? 'auto',
        'min-width': 'max-content',
      }}
      ref={actions.setRefContent}
    >
      <div
        {...otherProps}
        {...dataSets('floating', {
          status: state.status,
          placement: state.placement,
        })}
        ref={mergeRefs(localProps.ref, el => rootContent = el)}
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

export function Content(props: {
  zindex?: number
} & JSX.HTMLAttributes<HTMLDivElement>) {
  const [state] = context.useContext()

  return (
    <Portal mount={document.body}>
      <Show when={state.status !== 'closed'}>
        <FloatingContentCore {...props} />
      </Show>
    </Portal>
  )
}
