import type { JSX } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'

export default function Root(props: {
  children: JSX.Element
  min?: number
  max?: number
  step?: number
  value?: number
  vertical?: boolean
  reverse?: boolean
  onChange?: (value: number) => void
  disabled?: boolean
}) {
  const Context = context.initial({
    min: () => props.min,
    max: () => props.max,
    step: () => props.step,
    value: () => props.value,
    vertical: () => props.vertical,
    reverse: () => props.reverse,
    disabled: () => props.disabled,
  })
  const [state] = Context.value

  watch(
    () => state.value,
    () => {
      state.value !== props.value && props.onChange?.(state.value)
    },
  )

  return <Context.Provider>{props.children}</Context.Provider>
}
