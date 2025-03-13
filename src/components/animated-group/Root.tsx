import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'

export function Root(props: {
  active: string
  onChange: (value: string) => void
  children: JSX.Element
  class?: string
}) {
  const Context = context.initial()
  const [state, actions] = Context.value

  watch(
    () => props.active,
    () => {
      actions.setTryClose(state.active)
      actions.setTryOpen(props.active)
      actions.setActive('')
    },
  )

  watch(
    () => state.active,
    () => {
      state.active && props.onChange(state.active)
    },
  )

  return (
    <div
      class={props.class}
      style={{
        height: state.height,
        'max-height': state.maxHeight,
        position: 'relative',
      }}
    >
      <Context.Provider>{props.children}</Context.Provider>
    </div>
  )
}
