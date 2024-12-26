import type { JSX } from 'solid-js/jsx-runtime'
import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'
import { type DataType, normalizeData } from './types'

export default function Table(props: {
  data: DataType[]
  class?: string
  children: JSX.Element
}) {
  const Context = context.initial()
  const [state, actions] = Context.value
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null)
  const size = createElementSize(ref)

  watch(() => props.data, () => {
    const normalize = normalizeData(props.data)
    actions.setData(normalize[0])
    actions.setColsWidth(normalize[1])
    actions.setSafeList(normalize[2])
    if (state.data.length && size.width) {
      actions.refresh(size.width)
    }
  })

  watch([() => size.width, () => state.signalRefresh], () => {
    if (size.width) {
      actions.refresh(size.width)
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
