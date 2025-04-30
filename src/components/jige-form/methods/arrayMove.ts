import { batch } from 'solid-js'
import type { createForm } from '../form'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath } from '../types/path'

export function arrayMove<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    from: number
    to: number
  },
) {
  const [, formActs] = form.context

  batch(() => {
    const data = formActs.getFieldValue(arrayPathName)
    if (
      options.from < 0 ||
      options.from >= data.length ||
      options.to < 0 ||
      options.to >= data.length
    ) {
      return
    }

    formActs.setFieldValue(arrayPathName, (prev: any[]) => {
      // check from and to are within bounds
      const { from, to } = options
      const nextItems = [...prev]
      const [movedItem] = nextItems.splice(from, 1)
      nextItems.splice(to, 0, movedItem)

      return nextItems
    })
  })
}
