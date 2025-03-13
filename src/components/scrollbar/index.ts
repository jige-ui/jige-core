import Bar from './Bar'
import Content from './Content'
import Root from './Root'
import { ScrollArea } from './ScrollArea'
import Thumb from './Thumb'
import context from './context'

export const ScrollbarCore = Object.assign(Root, {
	Content,
	Bar,
	Thumb,
	ScrollArea,
	useContext: context.useContext,
})
