import { createComponentState } from 'solid-uses'

const context = createComponentState({ state: () => ({
  value: '' as any,
  disabled: false,
  name: '',
}) })

export default context
