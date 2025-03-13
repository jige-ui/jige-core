import type { MaybeAsyncFn } from '@/common/types'
import { isUndefined } from '@/common/types'
import { createComponentState } from 'solid-uses'
import { getValueFromPath } from '../utils'
import type { JigeFormValidatorCorrectReturn } from '../validator'

export const formContext = createComponentState({
	state: () => ({
		isTouched: false,
		isSubmitting: false,
		formData: {} as Record<string, any>,
		dirtyFields: {} as Record<string, boolean>,
		errorFields: {} as Record<string, JigeFormValidatorCorrectReturn[]>,
	}),
	getters: {
		isDirty() {
			return Object.values(this.state.dirtyFields).some(Boolean)
		},
		isPristine() {
			return !this.state.isDirty
		},
		canSubmit() {
			return (
				!this.state.isSubmitting &&
				Object.values(this.state.errorFields).every(
					(v) => !v.filter((e) => e.type === 'error').length,
				)
			)
		},
	},
	methods: {
		getFieldValue(key: string) {
			return getValueFromPath(this.state.formData, key)
		},
		setFieldValue(key: string, value: any | ((prev: any) => any)) {
			// key probably has a dot-separated path
			const keys = key.split('.') as [string]

			// make sure every key in the path exists
			let current = this.state.formData
			const tempKeys = [] as unknown as [string]
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i]
				tempKeys.push(key)
				if (isUndefined(current[key])) {
					if (Number.isNaN(Number(keys[i + 1]))) {
						this.actions.setState('formData', ...tempKeys, {})
					} else {
						this.actions.setState('formData', ...tempKeys, [])
					}
				}
				current = current[keys[i]]
			}

			this.actions.setState('formData', ...keys, value)
		},
		removeField(key: string) {
			const keys = key.split('.') as [string]
			this.actions.setState('formData', ...keys, undefined)
		},
		async handleSubmit() {
			this.actions.setIsSubmitting(true)
			await this.nowrapData.onSubmit(this.state.formData)
			this.actions.setIsSubmitting(false)
		},
		handleReset() {
			for (const key in this.state.formData) {
				this.actions.setFieldValue(key, this.nowrapData.initialValues[key])
			}
			this.actions.setIsTouched(false)
		},
	},
	nowrapData: () => ({
		onSubmit: (() => {}) as MaybeAsyncFn<any>,
		initialValues: {} as Record<string, any>,
	}),
})
