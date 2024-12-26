import { Bind } from './Bind'
import { Item } from './Item'

import itemContext from './item-context'
import { Root } from './Root'

const useFormContext = itemContext.useContext

const FormCore = Object.assign(Root, {
  Item,
  Bind,
})

export { FormCore, useFormContext }
export type { InitialValue } from './Root'
