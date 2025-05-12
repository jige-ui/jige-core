import { createComponentState } from 'solid-uses'

const itemContext = createComponentState({
  state: () => ({
    value: '' as string | number,
    nativeEl: null as HTMLInputElement | null,
    disabled: false,
  }),
})

export default itemContext
