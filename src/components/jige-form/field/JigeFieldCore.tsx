import { callMaybeCallableChild } from '@/common/props'
import { createMemo, type JSX, mergeProps, onCleanup, onMount } from 'solid-js'
import type { JigeFormAsyncValidator, JigeFormValidator } from '../validator'

import { getFieldContext } from './fieldContext'
import { formContext } from '../form/context'
import { getValueFromPath } from '../utils'
import { watch } from 'solid-uses'

export type JigeFieldCoreProps = {
  name: string
  validateDebounceMs?: number
  // default is true
  keepState?: boolean
  validators?: (JigeFormValidator | JigeFormAsyncValidator)[]
  validateOn?: 'change' | 'blur'
  validateRelatedFields?: string[]
  children:
    | JSX.Element
    | ((
        state: ReturnType<typeof getFieldContext>[0],
        actions: ReturnType<typeof getFieldContext>[1],
      ) => JSX.Element)
}

function FieldCore(props: JigeFieldCoreProps) {
  const realProps = mergeProps(
    {
      keepState: true,
      validateRelatedFields: [] as string[],
    },
    props,
  )

  const [formState, formActs, formStatic] = formContext.useContext()

  const context = createMemo(() => {
    const realValidators = realProps.validators || []
    const formLeverValidators = getValueFromPath(formState.validate, realProps.name)
    formLeverValidators && realValidators.push(formLeverValidators)

    const [state, actions] = getFieldContext(realProps.name, {
      validateDebounceMs: realProps.validateDebounceMs || 50,
      validateOn: realProps.validateOn || 'change',
      validators: realProps.validators || [],
      validateFirst: true,
    })

    return [state, actions, {}] as const
  })

  onMount(() => {
    console.log('fieldCore mount', realProps.name)
  })

  onCleanup(() => {
    console.log('fieldCore cleanup', realProps.name)
    formActs.clearState(realProps.name)
  })

  watch(
    () => context()[0].value,
    (v) => {
      if (v !== getValueFromPath(formStatic.initialValues, realProps.name)) {
        formActs.setState('dirtyFields', realProps.name, true)
      } else {
        formActs.setState('dirtyFields', realProps.name, false)
      }
    },
  )

  watch(
    () => context()[0].isTouched,
    (v) => {
      v && formActs.setIsTouched(v)
    },
  )

  watch(
    () => realProps.validateRelatedFields.map((v) => formActs.getFieldValue(v)),
    () => {
      context()[1].handleValidate()
    },
    { defer: true },
  )

  return <>{callMaybeCallableChild(realProps.children, ...context())}</>
}

export function JigeFieldCore(props: JigeFieldCoreProps) {
  return <FieldCore {...props} />
}
