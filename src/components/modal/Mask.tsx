import { combineStyle } from '@/common/dom'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { context } from './context'
import { runSolidEventHandler } from '@/common/solidjs'

export function Mask(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['style', 'onClick'])
  const [state, actions] = context.useContext()
  return (
    <div
      {...others}
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
