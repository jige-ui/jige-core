import { For } from 'solid-js'
import context from './context'

function Col(props: { key: string }) {
  const [state] = context.useContext()

  return <col data-key={props.key} width={state.colsWidth[props.key]} />
}

export default function Colgroup() {
  const [state] = context.useContext()

  return (
    <>
      <colgroup>
        <For each={Object.keys(state.colsWidth)}>{(k) => <Col key={k} />}</For>
      </colgroup>
    </>
  )
}
