import { Content } from './Content'
import context from './context'
import { Root } from './Root'
import { Trigger } from './Trigger'

export const CollapsibleCore = Object.assign(Root, {
  Content,
  Trigger,
  useContext: context.useContext,
})
