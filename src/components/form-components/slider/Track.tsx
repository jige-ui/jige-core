import { combineStyle } from '@/common/dom'
import type { PropsWithContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import context from './context'

export default function Track(
  props: PropsWithContextChild<typeof context, JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [localProps, otherProps] = splitProps(props, ['ref', 'onClick', 'style', 'children'])
  const [state, actions] = context.useContext()
  let ref!: HTMLDivElement
  return (
    <div
      {...otherProps}
      ref={mergeRefs(localProps.ref, (r) => {
        ref = r
      })}
      style={combineStyle({ position: 'relative' }, localProps.style)}
      onClick={(e) => {
        e.preventDefault()
        state.$nativeEl?.focus()
        if (e.target === ref) {
          let diff = 0
          const parent = state.vertical ? ref.clientHeight : ref.clientWidth
          if (state.vertical) {
            diff = state.reverse ? e.offsetY : parent - e.offsetY
          } else {
            diff = state.reverse ? parent - e.offsetX : e.offsetX
          }

          actions.setRatio(diff / parent)
        }

        runSolidEventHandler(e, localProps.onClick)
      }}
    >
      {callMaybeContextChild(context.useContext(), localProps.children)}
    </div>
  )
}
