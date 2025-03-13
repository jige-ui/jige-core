import { Content } from './Content'
import { Mask } from './Mask'
import { Portal } from './Portal'
import { Root } from './Root'
import { Trigger } from './Trigger'
import { GloablModalStore, context } from './context'

export const ModalCore = Object.assign(Root, {
  Trigger,
  Portal,
  Content,
  Mask,
  useContext: context.useContext,
  closeAll: () => {
    const [, setState] = GloablModalStore
    setState('closeAll', true)
    setState('closeAll', false)
  },
})
