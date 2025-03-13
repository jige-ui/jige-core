import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    value: [] as string[],
    name: '',
    disabled: false,
  }),
  methods: {
    removeValue(value: string) {
      this.actions.setValue([...this.state.value.filter((v) => v !== value)])
    },
    pushValue(value: string) {
      this.actions.setValue([...this.state.value, value])
    },
  },
})

export default context
