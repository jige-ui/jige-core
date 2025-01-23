import { hiddenStyle } from '@/common/dom'
import context from './context'

export default function Native(props: {
  class?: string
}) {
  const [state, actions] = context.useContext()
  return (
    <input
      class={props.class}
      ref={actions.set$nativeEl}
      type="checkbox"
      style={hiddenStyle}
      role="switch"
      value="on"
      name={state.name}
      checked={state.checked}
      onChange={(e) => {
        e.stopPropagation()
        actions.setChecked(e.target.checked)
        state.$nativeEl!.checked = state.checked
      }}
      onFocus={(e) => {
        e.preventDefault()
        actions.setFocused(true)
      }}
      disabled={state.disabled}

      onBlur={() => actions.setFocused(false)}
    />
  )
}
