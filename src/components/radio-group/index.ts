import context from './context'
import { Item, ItemControl, ItemNative } from './Item'
import { Root } from './Root'

export const RadioGroupCore = Object.assign(Root, {
  Item,
  ItemNative,
  ItemControl,
  useContext: context.useContext,
})
