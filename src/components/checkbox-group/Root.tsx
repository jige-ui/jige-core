import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Root(props: {
  children: JSX.Element
  value?: string[]
  onChange?: (v: string[]) => void
}) {
  const Context = context.initial()
  const [state, actions] = Context.value

  watch(() => props.value, (v) => {
    actions.setValue(v || [])
  })

  watch(() => state.value, (v) => {
    props.onChange?.(v)
  })

  return (
    <Context.Provider>
      <FormCore.Bind value={state.value} setValue={actions.setValue} setName={actions.setName}>
        {props.children}
      </FormCore.Bind>
    </Context.Provider>
  )
}
