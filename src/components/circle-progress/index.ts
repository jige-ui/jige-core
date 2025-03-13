import { Fill } from './Fill'
import { Rail } from './Rail'
import { Root } from './Root'
import context from './context'

export const CircleProgressCore = Object.assign(Root, {
  Rail,
  Fill,
  useContext: context.useContext,
})
