import context from './context'
import { Native } from './Native'
import { Root } from './Root'

export const InputCore = Object.assign(Root, {
  Native,
  useContext: context.useContext,
})

export * from './types'
