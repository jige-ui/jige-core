import { watch } from 'solid-uses'
import context from './context'

export function Fill(props: {
	radius: number
	strokeWidth: number
	percent: number
	color: string
	offsetDegree?: number
	class?: string
}) {
	const [state, actions] = context.useContext()

	watch(
		() => props.strokeWidth,
		() => {
			actions.setFillWidth(props.strokeWidth)
		},
	)
	return (
		<g>
			<path
				d={actions.getPathString(props.radius)}
				stroke-width={props.strokeWidth}
				stroke-linecap='round'
				fill='none'
				class={props.class}
				style={actions.getPathStyles({
					radius: props.radius,
					percent: props.percent || 0,
					viewBoxWidth: state.viewBoxSize,
					offsetDegree: props.offsetDegree || 0,
					strokeColor: props.color,
				})}
			/>
		</g>
	)
}
