import type { JSX } from 'solid-js'
import { Show, createMemo } from 'solid-js'
import context from './context'

export default function Bar(
  props: { children: JSX.Element; type: 'vertical' | 'horizontal' } & Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    'ref' | 'onClick'
  >,
) {
  const [state, action] = context.useContext()
  let ref!: HTMLDivElement
  const canShow = createMemo(() => {
    if (props.type === 'vertical') {
      return state.verticalPer !== null
    }
    return state.horizontalPer !== null
  })
  return (
    <Show when={canShow()}>
      <div
        {...props}
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
          if (e.target !== ref) return
          if (props.type === 'vertical') {
            action.setScrollTop((e.offsetY / ref.clientHeight) * 100)
          } else {
            action.setScrollLeft((e.offsetX / ref.clientWidth) * 100)
          }
        }}
      />
    </Show>
  )
}
