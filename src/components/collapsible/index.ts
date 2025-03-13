import { Content } from './Content'
import { Root } from './Root'
import { Trigger } from './Trigger'
import context from './context'

export const CollapsibleCore = Object.assign(Root, {
	Content,
	Trigger,
	useContext: context.useContext,
})
