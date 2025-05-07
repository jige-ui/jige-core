import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import { throttle } from 'radash'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import context from './context'

export function ScrollArea(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [state, action] = context.useContext()
  const [local, others] = splitProps(props, ['children', 'onScroll', 'onScrollEnd', 'ref'])

  const throttleSetValue = throttle({ interval: 15 }, action.setValue)

  return (
    <div
      {...others}
      style={{
        position: 'relative',
        overflow: 'auto',
        'scrollbar-width': 'none',
        height: state.height,
        'max-height': state.maxHeight,
        'user-select': state.isDragging ? 'none' : undefined,
      }}
      ref={mergeRefs(local.ref, (el) => {
        action.setState('refContent', el)
      })}
      onScroll={(e) => {
        throttleSetValue()
        runSolidEventHandler(e, local.onScroll)
      }}
      onScrollEnd={(e) => {
        action.setValue()
        runSolidEventHandler(e, local.onScrollEnd)
      }}
    >
      {local.children}
    </div>
  )
}
