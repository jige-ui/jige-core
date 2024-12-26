import { createComponentState } from 'solid-uses'

const context = createComponentState({ state: () => ({
  checked: false,
  disabled: false,
  name: '',
  focused: false,
  active: false,
  $nativeEl: null as HTMLInputElement | null,
}) })

export default context
