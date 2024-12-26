import { Content } from './Content'
import context from './context'
import { Root } from './Root'
import { Trigger } from './Trigger'

export const ContextMenuCore = Object.assign(Root, {
  Trigger,
  Content,
  useContext: context.useContext,
})
