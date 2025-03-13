import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'
import context from './context'

export default function Root(
	props: {
		children: JSX.Element
		height?: string
		maxHeight?: string
		onMouseEnter?: (
			e: MouseEvent & {
				currentTarget: HTMLDivElement
				target: DOMElement
			},
		) => void
	} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style' | 'onMouseEnter'>,
) {
	const Context = context.initial({
		height: () => props.height,
		maxHeight: () => props.maxHeight,
	})
	const [state, actions] = Context.value
	const [local, others] = splitProps(props, [
		'children',
		'height',
		'maxHeight',
		'onScroll',
		'onScrollEnd',
	])

	return (
		<Context.Provider>
			<div
				{...others}
				style={{
					overflow: 'hidden',
					position: 'relative',
					height: state.height,
					'max-height': state.maxHeight,
				}}
				onMouseEnter={(e) => {
					actions.setValue()
					others.onMouseEnter?.(e)
				}}
			>
				{local.children}
			</div>
		</Context.Provider>
	)
}
