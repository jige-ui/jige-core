import { Content } from './Content'
import { context } from './context'
import { Handler } from './Handler'
import { Root } from './Root'

export * from './types'

export const DraggableCore = Object.assign(Root, {
  Handler,
  Content,
  useContext: context.useContext,
})
