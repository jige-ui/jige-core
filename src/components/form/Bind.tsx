import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import itemContext from './item-context'

export function Bind(props: {
  children: JSX.Element
  value: any
  setValue: (value: any) => void
  setName?: (name: string) => void
}) {
  const [stat, acts] = itemContext.useContext()

  watch([() => stat.value, () => stat.name], ([v, n]) => {
    if (n) {
      props.setValue(v)
      props.setName?.(n)
    }
  })

  watch(() => props.value, (v) => {
    stat.name && acts.setValue(v)
  })

  return (
    <>
      {props.children}
    </>
  )
}
