import type { JSX } from 'solid-js/jsx-runtime'
import type { ExtendsForTanstackFormInstance } from './context'
import { callMaybeCallableChild } from '@/common/props'
import { createSignal, splitProps } from 'solid-js'
import { fieldContext, formContext } from './context'

export function Field<T extends ExtendsForTanstackFormInstance>(props: Omit<Parameters<T['Field']>[0], 'children'> & {
  children: Pick<Parameters<T['Field']>[0], 'children'>['children'] | JSX.Element
}) {
  const [,,staticData] = formContext.useContext()
  const Context = fieldContext.initial({
    name: () => props.name,
  })
  const [,,fieldStatics] = Context.value
  const [filedInst, setFieldInst] = createSignal({} as any)
  fieldStatics.fieldInstance = filedInst

  const [localProps, otherProps] = splitProps(props, ['children'])

  return (
    <Context.Provider>
      <staticData.tanstackForm.Field {...otherProps}>
        {(field) => {
          setFieldInst(field)
          return callMaybeCallableChild(localProps.children, field)
        }}
      </staticData.tanstackForm.Field>
    </Context.Provider>
  )
}
