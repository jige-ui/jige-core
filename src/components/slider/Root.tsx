import type { JSX } from 'solid-js'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
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
}) {
  const Context = context.initial({
    min: () => props.min,
    max: () => props.max,
    step: () => props.step,
    value: () => props.value,
    vertical: () => props.vertical,
    reverse: () => props.reverse,
  })
  const [state, actions] = Context.value

  watch(() => state.value, () => {
    state.value !== props.value && props.onChange?.(state.value)
  })

  return (
    <Context.Provider>
      <FormCore.Bind value={state.value} setValue={actions.setValue} setName={actions.setName}>
        {props.children}
      </FormCore.Bind>
    </Context.Provider>
  )
}
