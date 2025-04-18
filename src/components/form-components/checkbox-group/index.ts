import { Item, ItemControl, ItemNative } from './Item'
import { Root } from './Root'
import context from './context'

export const CheckboxGroupCore = Object.assign(Root, {
  Item,
  ItemNative,
  ItemControl,
  useContext: context.useContext,
})
