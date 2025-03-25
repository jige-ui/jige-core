import { batch } from 'solid-js'
import { getUniqueId } from '../field'
import type { createForm } from '../form'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath, FieldArrayPathValue } from '../types/path'

export function arrayInsert<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    at?: number
    value: FieldArrayPathValue<TFieldValues, FieldArrayPath<TFieldValues>>[number] extends never
      ? any
      : FieldArrayPathValue<TFieldValues, FieldArrayPath<TFieldValues>>[number]
  },
) {
  const [, formActs, formStatic] = form.context

  batch(() => {
    formActs.setState('arrayFields', arrayPathName, (prev: number[]) => {
      const nextItems = [...prev]
      nextItems.splice(options.at ?? prev.length, 0, getUniqueId())
      return nextItems
    })

    formActs.setFieldValue(arrayPathName, (prev: any[]) => {
      const { at = prev.length, value } = options
      const nextItems = [...prev]
      nextItems.splice(at, 0, value)

      return nextItems
    })
  })
}
