import type { JSX } from 'solid-js'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Root(props: {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  children: JSX.Element
}) {
  const Context = context.initial({
    value: () => props.value,
    disabled: () => props.disabled,
  })
  const [state, actions] = Context.value

  watch(() => state.value, (v) => {
    props.onChange?.(v)
  })

  return (
    <Context.Provider>
      <FormCore.Bind
        propDisabled={props.disabled}
        setDisabled={actions.setDisabled}
        value={state.value}
        setValue={actions.setValue}
        setName={actions.setName}
      >
        {props.children}
      </FormCore.Bind>
    </Context.Provider>
  )
}
