import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    value: '',
    name: '',
    disabled: false,
  }),
})

export default context
