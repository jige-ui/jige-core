import { mergeRefs } from '@solid-primitives/refs'
import { createElementSize } from '@solid-primitives/resize-observer'
import { throttle } from 'radash'
import type { JSX } from 'solid-js'
import { createSignal, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import context from './context'

export default function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
	const [, action] = context.useContext()
	const [local, others] = splitProps(props, ['ref'])
	const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null)

	const size = createElementSize(scrollRef)
	watch(
		[() => size.height, () => size.width],
		throttle({ interval: 35 }, () => {
			action.setValue()
		}),
	)

	return <div {...others} ref={mergeRefs(local.ref, setScrollRef)} />
}
