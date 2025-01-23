import type { MaybeContextChild } from '@/common/props'
import type { JSX } from 'solid-js/jsx-runtime'
import { hiddenStyle } from '@/common/dom'
import { callMaybeContextChild } from '@/common/props'
import { Ref } from '@solid-primitives/refs'
import { onMount } from 'solid-js'
import { useEventListener, watch } from 'solid-uses'
import context from './context'
import itemContext from './item-context'

function Item(props: {
  children: JSX.Element
  value: string
  disabled?: boolean
}) {
  const Context = itemContext.initial({
    value: () => props.value,
    disabled: () => props.disabled,
  })

  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>
  )
}

function ItemNative(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  const [itemState, itemActions] = itemContext.useContext()

  onMount(() => {
    watch(() => state.value, () => {
      if (state.value === itemState.value) {
        itemState.nativeEl!.checked = true
      }
    })
  })

  return (
    <input
      class={props.class}
      ref={itemActions.setNativeEl}
      type="radio"
      style={hiddenStyle}
      value={itemState.value}
      name={state.name}
      disabled={state.disabled || itemState.disabled}
      onChange={(e) => {
        e.stopPropagation()
        e.target.checked && actions.setValue(itemState.value)
      }}
    />
  )
}

function ItemControl(props: {
  children: MaybeContextChild<typeof context>
}) {
  const [itemState] = itemContext.useContext()

  let ref!: HTMLElement

  onMount(() => {
    useEventListener(ref, 'click', (e) => {
      e.preventDefault()
      itemState.nativeEl?.click()
      itemState.nativeEl?.focus()
    })

    useEventListener(ref, 'mousedown', (e) => {
      e.preventDefault()
    })
  })

  return (
    <Ref ref={ref}>
      {callMaybeContextChild(context, props.children)}
    </Ref>
  )
}

export { Item, ItemControl, ItemNative }
