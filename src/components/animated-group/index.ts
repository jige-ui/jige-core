import { Panel } from './Panel'
import { Root } from './Root'
import context from './context'

export const AnimatedGroup = Object.assign(Root, {
	Panel,
	useContext: context.useContext,
})
