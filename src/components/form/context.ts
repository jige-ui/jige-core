import type { FormDataType, FormInstance } from './useForm'
import { createComponentState } from 'solid-uses'
import { useForm } from './useForm'

const context = createComponentState({ state: () => ({
  disabled: false,
}), nowrapData: {
  formInstance: useForm() as FormInstance<FormDataType>,
}, methods: {
  setFormData(key: string, value: any) {
    this.nowrapData.formInstance.setFieldsValue(key, value)
  },
  getFormData(key: string): any {
    return this.nowrapData.formInstance.getFieldsValue()[key]
  },
} })

export default context
