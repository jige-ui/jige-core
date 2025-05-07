import { hiddenStyle } from '@/common/dom'
import { runSolidEventHandler } from '@/common/solidjs'
import { mergeRefs } from '@solid-primitives/refs'
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import context from './context'

export default function Native(
  props: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    'style' | 'type' | 'role' | 'aria-checked' | 'value' | 'name' | 'checked' | 'disabled'
  >,
) {
  const [state, actions] = context.useContext()
  const [localProps, otherProps] = splitProps(props, ['ref', 'onChange', 'onFocus', 'onBlur'])
  return (
    <input
      {...otherProps}
      ref={mergeRefs(localProps.ref, (r) => {
        actions.setState('$nativeEl', r)
      })}
      type='checkbox'
      style={hiddenStyle}
      role='switch'
      aria-checked={state.checked}
      value='on'
      name={state.name}
      checked={state.checked}
      onChange={(e) => {
        e.stopPropagation()
        actions.setState('checked', e.target.checked)
        state.$nativeEl!.checked = state.checked
        runSolidEventHandler(e, localProps.onChange)
      }}
      onFocus={(e) => {
        e.preventDefault()
        actions.setState('focused', true)
        runSolidEventHandler(e, localProps.onFocus)
      }}
      disabled={state.disabled}
      onBlur={(e) => {
        actions.setState('focused', false)
        runSolidEventHandler(e, localProps.onBlur)
      }}
    />
  )
}
