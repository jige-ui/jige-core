import { type JSX, onCleanup } from 'solid-js'
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
  const [formState, formActions, formStatic] = formContext.useContext()

  watch(
    () => props.name,
    (name, prevName) => {
      formActions.setState(
        'arrayFields',
        name,
        formActions.getFieldValue(name)?.map(() => getUniqueId()) || [],
      )
    },
  )

  watch([() => Object.keys(formState.dirtyFields)], ([stateKeys]) => {
    const arrayFields = formState.arrayFields[props.name] || []
    const relatedFields = stateKeys.filter((key) => key.startsWith(`${props.name}.`))
    const lengthDiff = relatedFields.length - arrayFields.length

    console.log(relatedFields, arrayFields.filter(Boolean))

    if (lengthDiff > 0) {
      const needBeCleared = relatedFields.filter((key) => {
        const index = Number(key.split('.')[1])
        return index >= relatedFields.length - lengthDiff
      })
      for (const key of needBeCleared) {
        formActions.clearState(key)
      }
    }
  })

  onCleanup(() => {
    formActions.setState('arrayFields', props.name, undefined!)
  })

  return (
    <>
      {props.children({
        get items() {
          return formState.arrayFields[props.name] || []
        },
        get name() {
          return props.name
        },
      })}
    </>
  )
}
