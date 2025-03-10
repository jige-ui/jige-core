import { hiddenStyle } from '@/common/dom'
import context from './context'

export default function Native(props: { class?: string }) {
  const [state, actions] = context.useContext()
  return (
    <input
      class={props.class}
      type="range"
      min={state.min}
      max={state.max}
      step={state.step}
      style={hiddenStyle}
      disabled={state.disabled}
      value={state.value}
      ref={actions.set$nativeEl}
      onInput={(e) => {
        e.stopPropagation()
        actions.setValue(Number.parseInt(e.target.value))
      }}
      onKeyDown={(e) => {
        if (!state.reverse)
          return
        e.preventDefault()

        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
          actions.setValue(state.value - state.step)
        }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
          actions.setValue(state.value + state.step)
        }
      }}
    />
  )
}
