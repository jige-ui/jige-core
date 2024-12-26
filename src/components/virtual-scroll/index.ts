import Bar from '../scrollbar/Bar'
import Thumb from '../scrollbar/Thumb'
import { Content } from './Content'
import { context } from './context'
import { Root } from './Root'

export const VirtualScrollCore = Object.assign(Root, {
  Content,
  Bar,
  Thumb,
  useContext: context.useContext,
})
