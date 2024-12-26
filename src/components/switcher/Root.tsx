import type { MaybeContextChild, PropsWithContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { Ref } from '@solid-primitives/refs'
import { onMount } from 'solid-js'
import { useEventListener, watch } from 'solid-uses'
import { FormCore } from '../form'
import context from './context'

export function Control(props: {
  children: MaybeContextChild<typeof context>
}) {
  const [state] = context.useContext()
  let ref!: HTMLElement

  onMount(() => {
    useEventListener(ref, 'click', (e) => {
      e.preventDefault()
      state.$nativeEl?.click()
      state.$nativeEl?.focus()
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

export function Root(props: PropsWithContextChild<typeof context, { checked?: boolean, onChange?: (value: boolean) => void }>) {
  const Context = context.initial({
    checked: () => props.checked,
  })
  const [state, actions] = Context.value

  watch(() => state.checked, (c) => {
    props.onChange?.(c)
  })

  return (
    <Context.Provider>
      <FormCore.Bind value={state.checked} setValue={actions.setChecked} setName={actions.setName}>
        {callMaybeContextChild(context, props.children)}
      </FormCore.Bind>
    </Context.Provider>
  )
}
