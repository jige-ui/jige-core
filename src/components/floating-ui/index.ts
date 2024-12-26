import { Arrow } from './Arrow'
import { Content } from './Content'
import { context } from './context'
import { Root } from './Root'
import { Trigger } from './Trigger'

export const FloatingUiCore = Object.assign(Root, {
  Trigger,
  Content,
  Arrow,
  useContext: context.useContext,
})

export * from './props'
