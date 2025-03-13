import Native from './Native'
import { Control, Root } from './Root'
import context from './context'

export const SwitcherCore = Object.assign(Root, {
  Control,
  Native,
  useContext: context.useContext,
})
