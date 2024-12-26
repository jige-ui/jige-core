import type { JSX } from 'solid-js/jsx-runtime'
import { hasAnimation } from '@/common/dom'
import { onMount, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, watch } from 'solid-uses'
import context from './context'

function ContentCore(props: { zindex?: number } & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onAnimationEnd' | 'ref'>) {
  let rootContent!: HTMLDivElement
  const [state, actions] = context.useContext()
  onMount(() => {
    watch(() => state.status, () => {
      if (state.status.endsWith('ing')) {
        if (!hasAnimation(rootContent)) {
          actions.setStatus(state.status.replace('ing', 'ed') as any)
        }
      }
    })

    onClickOutside(rootContent, () => {
      actions.setOpen(false)
    })
  })

  return (
    <div
      style={{
        'transform': `translate3d(${state.x}px, ${state.y}px, 0px)`,
        'top': 0,
        'left': 0,
        'position': 'fixed',
        'z-index': props.zindex ?? 'auto',
        'min-width': 'max-content',
        'pointer-events': 'auto',
      }}
    >
      <div
        {...props}
        data-cm-status={state.status}
        ref={rootContent}
        onAnimationEnd={() => {
          if (state.status.startsWith('clos')) {
            actions.setStatus('closed')
          }
          if (state.status.startsWith('open')) {
            actions.setStatus('opened')
          }
        }}
      />
    </div>
  )
}

export function Content(props: { zindex?: number } & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onAnimationEnd' | 'ref'>) {
  const [state] = context.useContext()
  return (
    <Portal mount={document.body}>
      <Show when={state.status !== 'closed'}>
        <ContentCore {...props} />
      </Show>
    </Portal>
  )
}
