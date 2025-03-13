import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { Ref } from '@solid-primitives/refs'
import { createSignal } from 'solid-js'
import { useEventListener, watch } from 'solid-uses'
import context from './context'

export function Trigger(props: {
	children: MaybeContextChild<typeof context>
}) {
	const [state, actions] = context.useContext()
	const [ref, setRef] = createSignal<HTMLElement>()
	let unMountEv = () => {}

	watch(ref, (el) => {
		unMountEv()
		if (!el) {
			return
		}

		unMountEv = useEventListener(el, 'click', () => {
			if (state.status === 'closed') {
				actions.open()
			} else if (state.status === 'opened') {
				actions.close()
			}
		})
	})

	return <Ref ref={setRef}>{callMaybeContextChild(context, props.children)}</Ref>
}
