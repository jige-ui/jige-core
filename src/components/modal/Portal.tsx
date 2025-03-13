import { Show } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { Portal as P } from 'solid-js/web'
import { context } from './context'

export function Portal(props: {
	mount?: Node
	ref?: HTMLDivElement | ((el: HTMLDivElement) => void)
	children: JSX.Element
}) {
	const [state] = context.useContext()
	return (
		<Show when={state.status !== 'closed'}>
			<P mount={props.mount} ref={props.ref}>
				{props.children}
			</P>
		</Show>
	)
}
