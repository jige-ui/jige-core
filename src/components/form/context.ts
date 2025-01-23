import { createComponentState } from 'solid-uses'

const context = createComponentState({ state: () => ({
  disabled: false,
}), methods: {
  setFormData(key: string, value: any) {
    console.log(key, value)
  },
  getFormData(key: string): any {
    console.log(key)
  },
} })

export default context
