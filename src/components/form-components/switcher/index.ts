import context from './context'
import Native from './Native'
import { Control, Root } from './Root'

export const SwitcherCore = Object.assign(Root, {
  Control,
  Native,
  useContext: context.useContext,
})
