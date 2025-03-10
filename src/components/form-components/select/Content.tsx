import type { PropsWithContextChild } from '@/common/props'
import type { JSX } from 'solid-js/jsx-runtime'
import { callMaybeContextChild } from '@/common/props'
import { FloatingUiCore } from '@/components/floating-ui'
import { splitProps } from 'solid-js'
import context from './context'

export default function Content(props: PropsWithContextChild<typeof context, {
  zindex?: number
} & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, others] = splitProps(props, ['children'])
  return (
    <FloatingUiCore.Content {...others}>
      {callMaybeContextChild(context, local.children)}
    </FloatingUiCore.Content>
  )
}
