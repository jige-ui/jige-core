import type { MaybeCallableChild } from '@/common/props'
import type { JSX } from 'solid-js/jsx-runtime'
import type { ExtendsForTanstackFormInstance } from './context'
import { callMaybeCallableChild } from '@/common/props'
import { runSolidEventHandler } from '@/common/solidjs'
import { splitProps } from 'solid-js'
import { formContext } from './context'

export function TanstackFormCore<T extends ExtendsForTanstackFormInstance>(props: {
  staticTanstackFormInstance: T
  children: MaybeCallableChild<[T]>
} & Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'children'>) {
  const [localProps, otherProps] = splitProps(props, ['staticTanstackFormInstance', 'onSubmit'])
  const Context = formContext.initial()
  const [,,staticData] = Context.value
  staticData.tanstackForm = localProps.staticTanstackFormInstance as any

  return (
    <Context.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const form = staticData.tanstackForm
          form.handleSubmit()
          runSolidEventHandler(e, props.onSubmit)
        }}
        {...otherProps}
      >
        {callMaybeCallableChild(props.children, staticData.tanstackForm)}
      </form>
    </Context.Provider>
  )
}
