import { combineStyle } from '@/common/dom'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { context } from './context'

export function Mask(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['style'])
  const [state] = context.useContext()
  return (
    <div
      {...others}
      data-modal-status={state.status}
      style={combineStyle(
        {
          position: 'fixed',
          inset: 0,
          'pointer-events': 'auto',
        },
        local.style,
      )}
    />
  )
}
