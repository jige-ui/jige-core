import { hiddenStyle } from '@/common/dom'
import context from './context'
import type { JSX } from 'solid-js/jsx-runtime'
import { splitProps } from 'solid-js'
import { runSolidEventHandler } from '@/common/solidjs'

export default function Native(
	props: Omit<
		JSX.InputHTMLAttributes<HTMLInputElement>,
		'style' | 'type' | 'max' | 'aria-checked' | 'value' | 'name' | 'min' | 'disabled'
	>,
) {
	const [state, actions] = context.useContext()
	const [localProps, otherProps] = splitProps(props, ['ref', 'onInput', 'onKeyDown'])
	return (
		<input
			{...otherProps}
			type='range'
			min={state.min}
			max={state.max}
			step={state.step}
			style={hiddenStyle}
			disabled={state.disabled}
			value={state.value}
			ref={actions.set$nativeEl}
			onInput={(e) => {
				e.stopPropagation()
				actions.setValue(Number.parseInt(e.target.value))
				runSolidEventHandler(e, localProps.onInput)
			}}
			onKeyDown={(e) => {
				if (state.reverse) {
					e.preventDefault()
					if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
						actions.setValue(state.value - state.step)
					} else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
						actions.setValue(state.value + state.step)
					}
				}

				runSolidEventHandler(e, localProps.onInput)
			}}
		/>
	)
}
