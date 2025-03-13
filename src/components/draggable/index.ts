import { Content } from './Content'
import { Handler } from './Handler'
import { Root } from './Root'
import { context } from './context'

export * from './types'

export const DraggableCore = Object.assign(Root, {
	Handler,
	Content,
	useContext: context.useContext,
})
