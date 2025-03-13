import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		value: 0,
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		isDragging: false,
		vertical: false,
		reverse: false,
		name: '',
		focused: false,
		$nativeEl: null as HTMLInputElement | null,
	}),
	getters: {
		percentage() {
			return ((this.state.value - this.state.min) / (this.state.max - this.state.min)) * 100
		},
	},
	methods: {
		setValue(value: number) {
			const fixedValue =
				Math.round(Math.max(this.state.min, Math.min(this.state.max, value)) / this.state.step) *
				this.state.step

			!this.state.disabled && this.actions.setState('value', fixedValue)
		},

		setRatio(ratio: number) {
			this.actions.setValue(this.state.min + (this.state.max - this.state.min) * ratio)
		},
	},
})

export default context
