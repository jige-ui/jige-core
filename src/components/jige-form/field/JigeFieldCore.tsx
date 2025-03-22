import type { PropsWithContextChild } from '@/common/props'
import { callMaybeContextChild, undefinedOr } from '@/common/props'
import { Remount } from '@/components/remount'
import { mergeProps, onCleanup, onMount } from 'solid-js'
import { watch } from 'solid-uses'
import { formContext } from '../form/context'
import { getValueFromPath } from '../utils'
import type { JigeFormAsyncValidator, JigeFormValidator } from '../validator'
import { fieldContext } from './context'

export type JigeFieldCoreProps = PropsWithContextChild<
  typeof fieldContext,
  {
    name: string
    validateDebounceMs?: number
    // default is true
    keepState?: boolean
    validators?: (JigeFormValidator | JigeFormAsyncValidator)[]
    validateOn?: 'change' | 'blur'
    validateRelatedFields?: string[]
  }
>

function FieldCore(props: JigeFieldCoreProps) {
  const realProps = mergeProps(
    {
      keepState: true,
      validateRelatedFields: [] as string[],
    },
    props,
  )

  const [formState, formActions, formStaticData] = formContext.useContext()
  const Context = fieldContext.initial({
    name: realProps.name,
    validateDebounceMs: () => realProps.validateDebounceMs,
    validateOn: () => realProps.validateOn,
  })
  const [fieldState, fieldActions, staticData] = Context.value

  onMount(() => {
    console.log('fieldCore mount', fieldState.name)
  })

  onCleanup(() => {
    console.log('fieldCore cleanup', fieldState.name)
    if (!realProps.keepState) {
      // clear all field state from form context
      formActions.setFieldValue(
        fieldState.name,
        getValueFromPath(formStaticData.initialValues, fieldState.name),
      )
      formActions.setState('errorFields', fieldState.name, undefined!)
      formActions.setState('dirtyFields', fieldState.name, undefined!)
    }

    formActions.setState('validateFields', fieldState.name, undefined!)
  })

  watch(
    () => formState.formData,
    (d) => {
      staticData.formData = d
    },
  )

  watch([() => formActions.getFieldValue(fieldState.name)], ([value]) => {
    fieldActions.setValue(
      undefinedOr(value, getValueFromPath(formStaticData.initialValues, fieldState.name)),
    )
  })

  watch([() => fieldState.name, () => fieldState.value], ([name, value]) => {
    formActions.setFieldValue(name, value)

    fieldActions.setIsDirty(value !== getValueFromPath(formStaticData.initialValues, name))
  })

  watch(
    [() => realProps.validators, () => getValueFromPath(formState.validate, fieldState.name)],
    ([validators, formLevelValidator]) => {
      const realValidators = formLevelValidator ? [formLevelValidator] : []
      validators && realValidators.push(...validators)
      staticData.validators = realValidators
      formActions.setState('validateFields', fieldState.name, () => fieldActions.validate)
    },
  )

  watch([() => fieldState.isTouched, () => fieldState.isDirty], ([isTouched, isDirty]) => {
    isTouched && formActions.setIsTouched(true)
    formActions.setState('dirtyFields', realProps.name, isDirty)
  })

  watch(
    [() => formState.isDirty, () => formState.isTouched],
    ([isDirty, isTouched]) => {
      if (isDirty === false && isTouched === false) {
        fieldActions.setIsDirty(false)
        fieldActions.setIsTouched(false)
        fieldActions.setErrors([])
      }
    },
    { defer: true },
  )

  watch(
    () => realProps.validateRelatedFields.map((key) => formActions.getFieldValue(key)),
    () => {
      fieldActions.handleValidate()
    },
    { defer: true },
  )

  // errors update to form context
  watch(
    () => fieldState.errors,
    (errors) => {
      formActions.setState('errorFields', realProps.name, errors)
    },
  )

  return (
    <Context.Provider>{callMaybeContextChild(fieldContext, realProps.children)}</Context.Provider>
  )
}

export function JigeFieldCore(props: JigeFieldCoreProps) {
  return (
    <Remount remountWhenChange={props.name}>
      <FieldCore {...props} />
    </Remount>
  )
}
