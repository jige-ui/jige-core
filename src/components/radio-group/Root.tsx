import type { JSX } from 'solid-js/jsx-runtime'
import { createUniqueId } from 'solid-js'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Root(props: {
  children: JSX.Element
  value?: string
  onChange?: (v: string) => void
  disabled?: boolean
}) {
  const Context = context.initial({
    value: () => props.value,
    name: `radio-group-${createUniqueId()}`,
    disabled: () => props.disabled,
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
