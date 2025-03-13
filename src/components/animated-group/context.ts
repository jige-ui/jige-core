import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		active: '',
		tryClose: '',
		tryOpen: '',
		height: '',
		maxHeight: '',
		refHeights: {} as Record<string, number>,
	}),
	getters: {
		contentHeight() {
			let max = 0
			for (const key in this.state.refHeights) {
				const h = this.state.refHeights[key]
				if (h > max) {
					max = h
				}
			}
			return max
		},
	},
})

export default context
