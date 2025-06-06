import { combineStyle } from '@/common/dom'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import { onMount, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { context } from './context'

export function Mask(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['style', 'onClick', 'ref'])
  const [state, actions] = context.useContext()
  let ref!: HTMLDivElement

  onMount(() => {
    ref.focus()
  })

  return (
    <div
      {...others}
      ref={mergeRefs(local.ref, (el) => {
        ref = el
      })}
      aria-hidden='true'
      data-modal-status={state.status}
      style={combineStyle(
        {
          position: 'fixed',
          inset: 0,
          'pointer-events': 'auto',
        },
        local.style,
      )}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (state.closeOnClickMask) {
          actions.setOpen(false)
        }
        runSolidEventHandler(e, local.onClick)
      }}
    />
  )
}
