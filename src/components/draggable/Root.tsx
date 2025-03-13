import type { JSX } from 'solid-js/jsx-runtime'
import { context } from './context'

export function Root(props: {
	children: JSX.Element
	disabled?: boolean
	bounds?: { top?: number; left?: number; right?: number; bottom?: number }
}) {
	const Context = context.initial({
		disabled: () => props.disabled,
		bounds: () => ({ ...props.bounds }),
	})

	return <Context.Provider>{props.children}</Context.Provider>
}
