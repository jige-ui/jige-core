import type { FloatingUiCoreProps } from '@/components/floating-ui'
import { FloatingUiCore } from '@/components/floating-ui'
import { type JSX, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export default function Root<T extends string | number>(props: {
  children: JSX.Element
  value?: T
  onChange?: (value: T) => void
} & FloatingUiCoreProps) {
  const Context = context.initial({
    value: () => props.value,
  })
  const [state, actions] = Context.value

  const [localProps, floatingProps] = splitProps(props, ['children', 'value', 'onChange'])

  watch(() => state.value, (v) => {
    localProps.onChange?.(v)
  })

  return (
    <Context.Provider>
      <FormCore.Bind value={state.value} setValue={actions.setValue}>
        <FloatingUiCore trigger="click" placement="bottom" {...floatingProps}>
          {props.children}
        </FloatingUiCore>
      </FormCore.Bind>
    </Context.Provider>
  )
}
