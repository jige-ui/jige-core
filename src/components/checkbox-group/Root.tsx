import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Root(props: {
  children: JSX.Element
  value?: string[]
  onChange?: (v: string[]) => void
  disabled?: boolean
}) {
  const Context = context.initial({
    disabled: () => props.disabled,
    value: () => props.value || [],
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
