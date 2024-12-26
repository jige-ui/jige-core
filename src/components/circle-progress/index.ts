import context from './context'
import { Fill } from './Fill'
import { Rail } from './Rail'
import { Root } from './Root'

export const CircleProgressCore = Object.assign(Root, {
  Rail,
  Fill,
  useContext: context.useContext,
})
