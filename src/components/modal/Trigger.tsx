import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { Ref, mergeRefs } from '@solid-primitives/refs'
import { onMount } from 'solid-js'
import { useEventListener } from 'solid-uses'
import { context } from './context'

export function Trigger(props: {
	children: MaybeContextChild<typeof context>
	ref?: HTMLElement | ((el: HTMLElement) => void)
}) {
	let ref!: HTMLElement
	const [, actions] = context.useContext()

	onMount(() => {
		useEventListener(ref, 'click', () => {
			actions.setOpen(true)
		})
	})
	return (
		<Ref
			ref={
				mergeRefs(props.ref, (r) => {
					ref = r
				}) as any
			}
		>
			{callMaybeContextChild(context, props.children)}
		</Ref>
	)
}
