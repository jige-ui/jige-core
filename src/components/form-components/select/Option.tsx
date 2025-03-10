import type { JSX } from 'solid-js'
import { runSolidEventHandler } from '@/common/solidjs'
import { FloatingUiCore } from '@/components/floating-ui'
import { splitProps } from 'solid-js'
import context from './context'

export function Option(props: { value: any } & JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['onClick', 'value'])
  const [, actions] = context.useContext()
  const act = FloatingUiCore.useContext()[1]
  return (
    <div
      {...others}
      onClick={(e) => {
        actions.setValue(local.value)
        act.setOpen(false)
        runSolidEventHandler(e, local.onClick)
      }}
    />
  )
}
