import { createElementBounds } from '@solid-primitives/bounds'
import { mergeRefs } from '@solid-primitives/refs'
import { type ComponentProps, createSignal, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'

export default function Table(props: ComponentProps<'div'>) {
  const Context = context.initial()
  const [local, others] = splitProps(props, ['ref'])
  const [state, actions] = Context.value
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null)
  const bounds = createElementBounds(ref)

  watch([() => bounds.width, () => ({ ...state.manualWidths })], ([w]) => {
    if (w) {
      actions.refresh(w)
    }
  })

  return (
    <Context.Provider>
      <div ref={mergeRefs(local.ref, setRef)} {...others} />
    </Context.Provider>
  )
}
