import { ModalCore } from '../modal'
import { Content } from './Content'
import { Root } from './Root'

export const DrawerCore = Object.assign(Root, {
  Trigger: ModalCore.Trigger,
  Portal: ModalCore.Portal,
  Mask: ModalCore.Mask,
  Content,
})
