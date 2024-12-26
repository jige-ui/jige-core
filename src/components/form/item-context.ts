import { createComponentState } from 'solid-uses'

const itemContext = createComponentState({
  state: () => ({
    name: '',
    value: null as any,
  }),
})

export default itemContext
