import type { TextareaProps } from './types'
import { runSolidEventHandler } from '@/common/solidjs'

import { splitProps } from 'solid-js'
import context from './context'

export function Textarea(props: TextareaProps) {
  const [state, actions] = context.useContext()
  const [localProps, otherProps] = splitProps(props, ['aria-label', 'onInput', 'disabled', 'rows', 'name'])

  const inputHandler = (e: Event) => {
    actions.setValue((e.target as HTMLTextAreaElement).value)
    runSolidEventHandler(e, localProps.onInput)
  }
  return (
    <textarea
      {...otherProps}
      rows={localProps.rows || 3}
      value={state.value}
      onInput={inputHandler}
      disabled={localProps.disabled}
      name={localProps.name || state.name}
      aria-label={localProps['aria-label'] || state.name || 'input'}
    />
  )
}
