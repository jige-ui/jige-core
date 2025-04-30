import type { AsyncFn, MaybeAsyncFn } from '@/common/types'
import { isUndefined } from '@/common/types'
import { batch } from 'solid-js'
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
    validateFields: {} as Record<string, AsyncFn>,
    // form-level validate
    validate: {} as Record<string, any>,
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
      if (isUndefined(value)) return
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
      await this.actions.validateFields()
      this.actions.setIsTouched(true)
      if (!this.state.canSubmit) return
      this.actions.setIsSubmitting(true)
      await this.nowrapData.onSubmit(this.state.formData)
      this.actions.setIsSubmitting(false)
    },
    handleReset() {
      batch(() => {
        const cloneInitialValues = JSON.parse(JSON.stringify(this.nowrapData.initialValues))
        // value reset
        for (const key in this.state.formData) {
          this.actions.setFieldValue(key, cloneInitialValues[key])
        }

        // dirty fields reset
        for (const key in this.state.dirtyFields) {
          this.actions.setState('dirtyFields', key, undefined!)
        }

        // error fields reset
        for (const key in this.state.errorFields) {
          this.actions.setState('errorFields', key, undefined!)
        }

        this.actions.setIsTouched(false)
      })
    },
    async validateFields(
      key?: string,
    ): Promise<
      typeof key extends string
        ? JigeFormValidatorCorrectReturn[]
        : Record<string, JigeFormValidatorCorrectReturn[]>
    > {
      if (key) {
        const validator = this.state.validateFields[key]
        if (validator) {
          await validator(undefined)
        }
      } else {
        for (const key in this.state.validateFields) {
          await this.actions.validateFields(key)
        }
      }
      return (key ? this.state.errorFields[key] : this.state.errorFields) as any
    },

    clearState(path: string) {
      batch(() => {
        this.actions.setState('dirtyFields', path, undefined!)
        this.actions.setState('errorFields', path, undefined!)
        this.actions.setState('validateFields', path, undefined!)
      })
    },
  },
  nowrapData: () => ({
    onSubmit: (() => {}) as MaybeAsyncFn<any>,
    initialValues: {} as Record<string, any>,
  }),
})
