import context from './context'
import { Panel } from './Panel'
import { Root } from './Root'

export const AnimatedGroup = Object.assign(Root, {
  Panel,
  useContext: context.useContext,
})
