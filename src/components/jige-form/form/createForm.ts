import type { MaybeAsyncFn } from '@/common/types'
import { watch } from 'solid-uses'
import { formContext } from './context'

export function createForm<T extends {}>(params?: {
  defaultValues?: () => T
  onSubmit?: MaybeAsyncFn<T>
}) {
  const Context = formContext.initial({
    formData: params?.defaultValues,
  })

  const [, , staticData] = Context.value

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

  const form = Object.assign(
    {},
    {
      Provider: Context.Provider,
      context: Context.value,
    },
  )

  return form
}
