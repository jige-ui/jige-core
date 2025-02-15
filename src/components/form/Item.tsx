import type { JSX } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'
import itemContext from './item-context'

export function Item(props: { children: JSX.Element, name: string }) {
  const [, actions] = context.useContext()
  const Context = itemContext.initial()
  const [itemState, itemActions] = Context.value

  watch(
    () => props.name,
    () => { itemActions.setName(props.name) },
  )

  watch(() => actions.getFormData(props.name), (data) => {
    itemActions.setValue(data)
  })

  watch(() => itemState.value, () => {
    actions.setFormData(props.name, itemState.value)
  })

  return <Context.Provider>{props.children}</Context.Provider>
}
