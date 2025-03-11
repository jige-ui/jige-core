import { fieldContext, formContext } from './context'
import { Field } from './Field'
import { TanstackFormCore } from './Form'

export const FormCore = Object.assign(TanstackFormCore, {
  Field,
  useForm() {
    const [,,statics] = formContext.useContext()
    return statics.tanstackForm
  },
  useField() {
    const [,,statics] = fieldContext.useContext()

    return statics.fieldInstance || (() => ({}))
  },
})
