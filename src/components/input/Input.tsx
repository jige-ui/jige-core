import type { InputProps } from './types'
import { runSolidEventHandler } from '@/common/solidjs'
import { splitProps } from 'solid-js'
import context from './context'

export function Input(props: InputProps) {
  const [state, actions] = context.useContext()

  const [localProps, otherProps] = splitProps(props, ['aria-label', 'onInput', 'name'])

  const inputHandler = (e: Event) => {
    actions.setValue((e.target as HTMLTextAreaElement).value)
    runSolidEventHandler(e, localProps.onInput)
  }
  return (
    <input
      {...otherProps}
      value={state.value}
      onInput={inputHandler}
      name={localProps.name || state.name}
      aria-label={localProps['aria-label'] || state.name || 'input'}
    />
  )
}
