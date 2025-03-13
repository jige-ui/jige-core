import { Native } from './Native'
import { Root } from './Root'
import context from './context'

export const InputCore = Object.assign(Root, {
	Native,
	useContext: context.useContext,
})

export * from './types'
