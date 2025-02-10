import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'
import itemContext from './item-context'

export function Bind(props: {
  children: JSX.Element
  value: any
  setValue: (value: any) => void
  setName: (name: string) => void
  setDisabled: (disabled: boolean) => void
  propDisabled?: boolean
}) {
  const [stat, acts] = itemContext.useContext()
  const [formStat] = context.useContext()

  watch([() => stat.value, () => stat.name], ([v, n]) => {
    if (n) {
      props.setValue(v)
      props.setName?.(n)
    }
  })

  watch(() => props.value, (v) => {
    stat.name && acts.setValue(v)
  })

  watch([() => formStat.disabled, () => stat.name, () => props.propDisabled], ([d, n, p]) => {
    const propDisabled = p || false
    if (n) {
      props.setDisabled(d || propDisabled)
    }
    else {
      props.setDisabled(propDisabled)
    }
  })

  return (
    <>
      {props.children}
    </>
  )
}
