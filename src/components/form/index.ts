import { Bind } from './Bind'
import context from './context'
import { Item } from './Item'

import itemContext from './item-context'
import { Root } from './Root'
import { useForm } from './useForm'

const useFormContext = itemContext.useContext

const FormCore = Object.assign(Root, {
  Item,
  Bind,
  useForm,
  useFormInstance: () => {
    const [,,s] = context.useContext()
    return s.formInstance
  },
  useContext: context.useContext,
})

export { FormCore, useFormContext }
export type { InitialValue } from './Root'
