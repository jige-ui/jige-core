import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'

export function Root(props: {
	children: JSX.Element
	name?: string
	value?: string
	onChange?: (v: string) => void
	disabled?: boolean
}) {
	const Context = context.initial({
		value: () => props.value,
		name: () => props.name,
		disabled: () => props.disabled,
	})
	const [state] = Context.value

	watch(
		() => state.value,
		(v) => {
			props.onChange?.(v)
		},
	)

	return <Context.Provider>{props.children}</Context.Provider>
}
