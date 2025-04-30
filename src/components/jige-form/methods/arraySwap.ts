import { batch } from 'solid-js'
import type { createForm } from '../form'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath } from '../types/path'

export function arraySwap<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    at: number
    and: number
  },
) {
  const [, formActs] = form.context

  batch(() => {
    const data = formActs.getFieldValue(arrayPathName)
    const { at, and } = options
    if (at < 0 || at >= data.length || and < 0 || and >= data.length || at === and) {
      return
    }

    formActs.setFieldValue(arrayPathName, (prev: any[]) => {
      const nextItems = [...prev]
      const temp = nextItems[at]
      nextItems[at] = nextItems[and]
      nextItems[and] = temp

      return nextItems
    })
  })
}
