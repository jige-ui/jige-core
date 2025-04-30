import type { createForm } from '../form'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath, FieldArrayPathValue } from '../types/path'

export function arrayReplace<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    at: number
    value: FieldArrayPathValue<TFieldValues, FieldArrayPath<TFieldValues>>[number] extends never
      ? any
      : FieldArrayPathValue<TFieldValues, FieldArrayPath<TFieldValues>>[number]
  },
) {
  const [, formActs] = form.context

  const value = formActs.getFieldValue(arrayPathName)
  const at = options.at
  if (at < 0 || at >= value.length) {
    return
  }

  const path = `${arrayPathName}.${at}`
  formActs.setFieldValue(path, options.value)
}
