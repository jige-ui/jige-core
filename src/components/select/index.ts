import { FloatingUiCore } from '@/components/floating-ui'
import Content from './Content'
import context from './context'
import { Option } from './Option'
import Root from './Root'
import Trigger from './Trigger'

export const SelectCore = Object.assign(Root, {
  Trigger,
  Option,
  Content,
  Arrow: FloatingUiCore.Arrow,
  useContext: context.useContext,
})
