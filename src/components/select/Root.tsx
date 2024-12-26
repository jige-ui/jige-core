import type { JSX } from 'solid-js'
import { FloatingUiCore } from '@/components/floating-ui'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export default function Root<T extends string | number>(props: {
  children: JSX.Element
  value?: T
  onChange?: (value: T) => void
}) {
  const Context = context.initial()

  const [state, actions] = Context.value

  watch(() => state.value, (v) => {
    props.onChange?.(v)
  })

  return (
    <Context.Provider>
      <FormCore.Bind value={state.value} setValue={actions.setValue}>
        <FloatingUiCore trigger="click">
          {props.children}
        </FloatingUiCore>
      </FormCore.Bind>
    </Context.Provider>
  )
}
