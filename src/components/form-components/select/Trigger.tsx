import type { MaybeContextChild } from '@/common/props'
import { callMaybeContextChild } from '@/common/props'
import { FloatingUiCore } from '@/components/floating-ui'
import context from './context'

export default function Trigger(props: {
  children: MaybeContextChild<typeof context>
}) {
  return (
    <FloatingUiCore.Trigger>
      {callMaybeContextChild(context, props.children)}
    </FloatingUiCore.Trigger>
  )
}
