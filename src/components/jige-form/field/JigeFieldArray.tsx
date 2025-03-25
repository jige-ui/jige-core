import { onCleanup, type JSX } from 'solid-js'
import { formContext } from '../form/context'
import type { FieldValues } from '../types/field'
import type { FieldArrayPath } from '../types/path'

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

  formActions.setState(
    'arrayFields',
    props.name,
    formActions.getFieldValue(props.name)?.map(() => getUniqueId()) || [],
  )

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
