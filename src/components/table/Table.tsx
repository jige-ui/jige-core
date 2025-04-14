import { createElementBounds } from '@solid-primitives/bounds'
import { createSignal } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'
import type { DataType } from './types'
import { normalizeData } from './types'

export default function Table(props: {
  data: DataType[]
  class?: string
  children: JSX.Element
}) {
  const Context = context.initial()
  const [state, actions] = Context.value
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null)
  const bounds = createElementBounds(ref)

  watch(
    () => props.data,
    () => {
      const normalize = normalizeData(props.data)
      actions.setData(normalize[0])
      actions.setColsWidth(normalize[1])
      actions.setSafeList(normalize[2])
      if (state.data.length && bounds.width) {
        actions.refresh(bounds.width)
      }
    },
  )

  watch([() => bounds.width, () => state.signalRefresh], ([w]) => {
    if (w) {
      actions.refresh(w)
    }
  })

  return (
    <Context.Provider>
      <div ref={setRef} class={props.class} style={{ position: 'relative' }}>
        {props.children}
      </div>
    </Context.Provider>
  )
}
