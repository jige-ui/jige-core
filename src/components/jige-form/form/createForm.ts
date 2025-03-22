import { watch } from 'solid-uses'
import { formContext } from './context'
import type { FormOptions } from '../types/form'
import type { FieldValues } from '../types/field'

export function createForm<T extends FieldValues>(params?: FormOptions<T>) {
  const Context = formContext.initial({
    formData: params?.defaultValues,
  })

  const [, actions, staticData] = Context.value

  watch(
    () => ({ ...params?.defaultValues?.() }),
    (values) => {
      staticData.initialValues = values || {}
    },
  )

  watch(
    () => params?.onSubmit,
    (onSubmit) => {
      staticData.onSubmit = onSubmit || (() => {})
    },
  )

  watch(
    () => ({ ...params?.validate }),
    (validate) => {
      actions.setState('validate', validate || {})
    },
  )

  const form = Object.assign(
    {},
    {
      Provider: Context.Provider,
      context: Context.value,
    },
  )

  return form
}
