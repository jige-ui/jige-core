import { runSolidEventHandler } from '@/common/solidjs'
import type { TextareaProps } from './types'

import { splitProps } from 'solid-js'
import context from './context'

export function Textarea(props: Omit<TextareaProps, 'disabled'>) {
  const [state, actions] = context.useContext()
  const [localProps, otherProps] = splitProps(props, ['aria-label', 'onInput', 'rows', 'name'])

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
      disabled={state.disabled}
      name={localProps.name || state.name}
      aria-label={localProps['aria-label'] || state.name || 'input'}
    />
  )
}
