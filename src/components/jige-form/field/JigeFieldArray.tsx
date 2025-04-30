import { batch, type JSX } from 'solid-js'
import { formContext } from '../form/context'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath } from '../types/path'
import { watch } from 'solid-uses'

let counter = 0

export function getUniqueId() {
  return counter++
}

export function JigeFieldArray<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
>(props: {
  name: TFieldArrayName
  children: (props: {
    items: number[]
    name: string
  }) => JSX.Element
}) {
  const [formState, formActions] = formContext.useContext()

  watch(
    () => formActions.getFieldValue(props.name),
    (value) => {
      const length = value.length
      const errors = Object.keys(formState.errorFields).filter((key) => key.startsWith(props.name))
      const dirties = Object.keys(formState.dirtyFields).filter((key) => key.startsWith(props.name))

      batch(() => {
        for (const err of errors) {
          // remove start `{props.name}.`
          const removeName = err.substring(props.name.length + 1)
          const index = Number(removeName.split('.')[0])
          if (index >= length) {
            formActions.setState('errorFields', err, undefined!)
          }
        }

        for (const dirty of dirties) {
          // remove start `{props.name}.`
          const removeName = dirty.substring(props.name.length + 1)
          const index = Number(removeName.split('.')[0])
          if (index >= length) {
            formActions.setState('dirtyFields', dirty, undefined!)
          }
        }
      })
    },
  )

  return (
    <>
      {props.children({
        get items() {
          return formActions.getFieldValue(props.name) || []
        },
        get name() {
          return props.name
        },
      })}
    </>
  )
}
