import { hiddenStyle } from '@/common/dom'
import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { runSolidEventHandler } from '@/common/solidjs'
import { Ref, mergeRefs } from '@solid-primitives/refs'
import { createMemo, onMount, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { useEventListener } from 'solid-uses'
import context from './context'
import itemContext from './item-context'

function Item<TValue = string | number>(props: {
  children: JSX.Element
  value: TValue
  disabled?: boolean
}) {
  const Context = itemContext.initial({
    value: () => props.value as string,
    disabled: () => props.disabled,
  })

  return <Context.Provider>{props.children}</Context.Provider>
}

function ItemNative(
  props: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    'style' | 'type' | 'aria-checked' | 'value' | 'name' | 'checked' | 'disabled'
  >,
) {
  const [state, actions] = context.useContext()
  const [itemState, itemActions] = itemContext.useContext()
  const [localProps, otherProps] = splitProps(props, ['ref', 'onChange'])

  const checked = createMemo(() => state.value === itemState.value)

  return (
    <input
      {...otherProps}
      class={props.class}
      ref={mergeRefs(localProps.ref, (r) => {
        itemActions.setState('nativeEl', r)
      })}
      type='radio'
      style={hiddenStyle}
      value={itemState.value}
      checked={checked()}
      aria-checked={checked()}
      name={state.name}
      disabled={state.disabled || itemState.disabled}
      onChange={(e) => {
        e.stopPropagation()
        e.target.checked && actions.setState('value', itemState.value)
        runSolidEventHandler(e, localProps.onChange)
      }}
    />
  )
}

function ItemControl(props: {
  children: MaybeContextChild<ReturnType<typeof context.useContext>>
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

  return <Ref ref={ref}>{callMaybeContextChild(context.useContext(), props.children)}</Ref>
}

export { Item, ItemControl, ItemNative }
