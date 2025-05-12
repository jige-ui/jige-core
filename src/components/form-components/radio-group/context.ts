import { createUniqueId } from 'solid-js'
import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    value: '' as string | number,
    name: `radio-group-${createUniqueId()}`,
    disabled: false,
  }),
})

export default context
