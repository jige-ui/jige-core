import type { JSX } from 'solid-js'
import type { FormDataType, FormInstance } from './useForm'
import { splitProps } from 'solid-js'
import context from './context'

export interface InitialValue {
  [key: string]: string | number | boolean | string[]
}

export function Root<T extends FormDataType>(props: {
  children: JSX.Element
  staticFormInstance?: FormInstance<T>
  disabled?: boolean
  onFinish?: (values: T) => void
  onFinishFailed?: (errors: Record<keyof T, string[]>) => void
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void
} & Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'value' | 'onSubmit'>) {
  const [local, others] = splitProps(props, ['children', 'staticFormInstance', 'disabled'])
  const Context = context.initial({
    disabled: () => local.disabled,
  })

  const [, , nowrapData] = Context.value

  if (local.staticFormInstance) {
    nowrapData.formInstance = local.staticFormInstance as any
  }

  return (
    <Context.Provider>
      <form
        {...others}
        aria-disabled={local.disabled}
        onSubmit={(e) => {
          e.preventDefault()
          props.onFinish?.(nowrapData.formInstance.getFieldsValue() as T)
        }}
      >
        {local.children}
      </form>
    </Context.Provider>
  )
}
