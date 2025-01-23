import type { JSX } from 'solid-js'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Root(props: {
  value?: string
  onChange?: (value: string) => void
  children: JSX.Element
}) {
  const Context = context.initial({
    value: () => props.value,
  })
  const [state, actions] = Context.value

  watch(() => state.value, (v) => {
    props.onChange?.(v)
  })

  return (
    <Context.Provider>
      <FormCore.Bind setDisabled={actions.setDisabled} value={state.value} setValue={actions.setValue} setName={actions.setName}>
        {props.children}
      </FormCore.Bind>
    </Context.Provider>
  )
}
