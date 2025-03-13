import { For, createMemo, onMount } from 'solid-js'
import context from './context'

function Col(props: { key: string; type: 'header' | 'body' }) {
  const [state, actions] = context.useContext()

  onMount(() => {
    actions.setSignalRefresh(state.signalRefresh + 1)
  })

  return (
    <col
      ref={(el) => {
        actions.setState(props.type === 'header' ? 'headerCols' : 'bodyCols', props.key, el)
      }}
      data-key={props.key}
    />
  )
}

export default function Colgroup(props: {
  type: 'header' | 'body'
}) {
  const [state] = context.useContext()
  const cols = createMemo(() => {
    if (state.data.length === 0) {
      return []
    }
    return Object.keys(state.data[0])
  })

  return (
    <>
      <colgroup>
        <For each={cols()}>{(k) => <Col key={k} type={props.type} />}</For>
      </colgroup>
    </>
  )
}
