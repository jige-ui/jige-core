import Bar from './Bar'
import Content from './Content'
import context from './context'
import Root from './Root'
import { ScrollArea } from './ScrollArea'
import Thumb from './Thumb'

export const ScrollbarCore = Object.assign(Root, {
  Content,
  Bar,
  Thumb,
  ScrollArea,
  useContext: context.useContext,
})
