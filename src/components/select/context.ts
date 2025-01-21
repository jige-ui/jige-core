import { createComponentState } from 'solid-uses'

const context = createComponentState({ state: () => ({
  value: '' as any,
}) })

export default context
