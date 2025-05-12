import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'

export function Root<TValue = string | number>(props: {
  children: JSX.Element
  name?: string
  value?: TValue
  onChange?: (v: TValue) => void
  disabled?: boolean
}) {
  const Context = context.initial({
    value: () => props.value as string,
    name: () => props.name,
    disabled: () => props.disabled,
  })
  const [state] = Context.value

  watch(
    () => state.value as TValue,
    (v) => {
      props.onChange?.(v)
    },
  )

  return <Context.Provider>{props.children}</Context.Provider>
}
