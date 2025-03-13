import type { JSX } from 'solid-js/jsx-runtime'
import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		progress: 0,
		railWidth: 0,
		fillWidth: 0,
		gapDegree: 0,
	}),
	getters: {
		viewBoxSize() {
			return 100 + Math.max(this.state.railWidth, this.state.fillWidth)
		},
	},
	methods: {
		getPathString(r: number): string {
			const vw = this.state.viewBoxSize
			return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`
		},
		getPathStyles(params: {
			radius: number
			percent: number
			viewBoxWidth: number
			offsetDegree?: number
			strokeColor: string
		}) {
			const { radius, percent, viewBoxWidth, offsetDegree = 0, strokeColor } = params
			const gapDegree = this.state.gapDegree
			const len = Math.PI * 2 * radius
			const pathStyle: JSX.CSSProperties = {
				stroke: percent ? strokeColor : 'transparent',
				'stroke-dasharray': `${(percent / 100) * (len - gapDegree)}px ${viewBoxWidth * 8}px`,
				'stroke-dashoffset': `-${gapDegree / 2}px`,
				'transform-origin': 'center',
				transform: `rotate(${offsetDegree + 180}deg)`,
			}

			return pathStyle
		},
	},
})

export default context
