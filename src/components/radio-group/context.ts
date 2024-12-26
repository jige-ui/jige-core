import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    value: '',
    name: '',
  }),
})

export default context
