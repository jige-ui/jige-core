import type { SetStoreFunction } from 'solid-js/store'
import { type JSX, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'

export interface InitialValue {
  [key: string]: string | number | boolean | string[]
}

export function Root<T extends InitialValue>(props: {
  children: JSX.Element
  value: T
  onChange: SetStoreFunction<T>
} & JSX.FormHTMLAttributes<HTMLFormElement>) {
  const [local, others] = splitProps(props, ['children', 'value', 'onChange'])
  const Context = context.initial()

  const [, actions] = Context.value

  watch(
    () => local.onChange,
    () => { actions.setFormData = local.onChange },
  )

  watch(
    () => local.value,
    // eslint-disable-next-line solid/reactivity
    () => { actions.getFormData = (key: string) => (local.value[key]) },
  )

  return (
    <Context.Provider>
      <form {...others}>{local.children}</form>
    </Context.Provider>
  )
}
