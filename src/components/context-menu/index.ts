import { Content } from './Content'
import { Root } from './Root'
import { Trigger } from './Trigger'
import context from './context'

export const ContextMenuCore = Object.assign(Root, {
	Trigger,
	Content,
	useContext: context.useContext,
})
