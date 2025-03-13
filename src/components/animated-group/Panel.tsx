import { getElementHeight, hasAnimation, uiRefreshDo } from '@/common/dom'
import type { CloseableStatus } from '@/common/types'
import { mergeRefs } from '@solid-primitives/refs'
import { Show, createSignal, onCleanup, onMount, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import { useEventListener, watch } from 'solid-uses'
import context from './context'

type ContentProps = { key: string } & JSX.HTMLAttributes<HTMLDivElement>

function ContentCore(props: ContentProps) {
	const [state, actions] = context.useContext()
	const [status, setStatus] = createSignal<CloseableStatus>('closed')
	const [localProps, otherProps] = splitProps(props, ['ref', 'key'])
	let ref!: HTMLDivElement

	onMount(() => {
		useEventListener(ref, 'animationend', () => {
			setStatus(status().replace('ing', 'ed') as CloseableStatus)
		})

		watch(
			() => localProps.key,
			(_, prev) => {
				const h = getElementHeight(ref)
				actions.setState('refHeights', localProps.key, h)
				if (prev) {
					const newRefHeights = { ...state.refHeights }
					delete newRefHeights[prev]
					actions.setState('refHeights', newRefHeights)
				}
			},
		)

		watch(
			() => state.tryClose,
			(v) => {
				if (v === localProps.key) {
					setStatus('closing')
					uiRefreshDo(() => {
						if (!hasAnimation) {
							setStatus('closed')
						}
					})
				}
			},
		)

		watch(
			() => state.tryOpen,
			(v) => {
				if (v === localProps.key) {
					setStatus('opening')
					uiRefreshDo(() => {
						if (!hasAnimation) {
							setStatus('opened')
						}
					})
				}
			},
		)

		watch(status, (s) => {
			if (s === 'opened') {
				actions.setHeight('')
				actions.setMaxHeight('')
				actions.setActive(localProps.key)
				actions.setTryOpen('')
			}

			if (s === 'closed') {
				actions.setTryClose('')
			}

			const h = state.refHeights[localProps.key]
			if (s === 'closing') {
				actions.setMaxHeight(`${h}px`)
				actions.setHeight(`${state.contentHeight}px`)
			}

			if (s === 'opening') {
				requestAnimationFrame(() => {
					actions.setMaxHeight(`${h}px`)
					actions.setHeight(`${state.contentHeight}px`)
				})
			}
		})
	})

	onCleanup(() => {
		// @ts-expect-error xxx
		actions.setState('refHeights', localProps.key, undefined)
	})

	return (
		<div
			{...otherProps}
			data-ag-status={status()}
			ref={mergeRefs(localProps.ref, (r) => {
				ref = r
			})}
			style={{
				position: status().endsWith('ing') ? 'absolute' : 'relative',
				top: 0,
				left: 0,
				right: 0,
			}}
		/>
	)
}

export function Panel(props: ContentProps) {
	const [state] = context.useContext()
	return (
		<Show
			when={
				state.active === props.key || state.tryOpen === props.key || state.tryClose === props.key
			}
		>
			<ContentCore {...props} />
		</Show>
	)
}
