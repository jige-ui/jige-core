import { Show } from 'solid-js'
import { Input } from './Input'
import { Textarea } from './Textarea'
import type { InputNativeProps } from './types'

export function Native(props: InputNativeProps) {
  return (
    <Show when={props.type === 'textarea'} fallback={<Input {...(props as any)} />}>
      <Textarea {...props} />
    </Show>
  )
}
