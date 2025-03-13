import { Arrow } from './Arrow'
import { Content } from './Content'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { context } from './context'

export const FloatingUiCore = Object.assign(Root, {
  Trigger,
  Content,
  Arrow,
  useContext: context.useContext,
})

export * from './props'
