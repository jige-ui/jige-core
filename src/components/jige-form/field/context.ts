import { createComponentState } from 'solid-uses'
import type {
	JigeFormAsyncValidator,
	JigeFormValidator,
	JigeFormValidatorCorrectReturn,
} from '../validator'
import { normalizeValidator } from '../validator'

export const fieldContext = createComponentState({
	state: () => ({
		name: '',
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		value: undefined as any,
		isValidating: false,
		isTouched: false,
		isDirty: false,
		errors: [] as JigeFormValidatorCorrectReturn[],
		timeoutId: 0,
		validateDebounceMs: 250,
		validateOn: 'change' as 'change' | 'blur',
		validateFirst: true,
	}),
	getters: {
		isPristine() {
			return !this.state.isDirty
		},
	},
	methods: {
		handleBlur() {
			console.log('handleBlur')
			this.actions.setState('isTouched', true)
			if (this.state.validateOn === 'blur') this.actions.handleValidate()
		},
		handleChange<T>(value: T) {
			console.log('handleChange', value)
			if (this.state.value === value) return
			if (!this.state.isTouched) {
				this.actions.setIsTouched(true)
			}
			this.actions.setState('value', value)
			if (this.state.validateOn === 'change') this.actions.handleValidate()
		},
		handleValidate() {
			console.log('handleValidate')
			if (this.state.isValidating || !this.state.isTouched) return
			clearTimeout(this.state.timeoutId)
			const timeoutId = setTimeout(async () => {
				this.actions.setState('isValidating', true)
				const errors = [] as JigeFormValidatorCorrectReturn[]
				for (const validator of this.nowrapData.validators) {
					const error = normalizeValidator(
						await validator(this.state.value, this.nowrapData.formData),
					)
					if (error) {
						errors.push(error)
						if (this.state.validateFirst && error.type === 'error') break
					}
				}
				this.actions.setState('errors', errors)
				this.actions.setState('isValidating', false)
			}, this.state.validateDebounceMs)
			this.actions.setState('timeoutId', timeoutId as any)
		},
	},
	nowrapData: () => ({
		validators: [] as (JigeFormValidator | JigeFormAsyncValidator)[],
		formData: {} as Record<string, any>,
	}),
})
