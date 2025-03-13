import { setData } from '@/common/dataset'
import type { ValidComponent } from 'solid-js'
import { splitProps } from 'solid-js'
import type { DynamicProps } from 'solid-js/web'
import { Dynamic } from 'solid-js/web'
import context from './context'

export function Trigger<T extends ValidComponent = 'div'>(
  props: { as?: T } & Omit<DynamicProps<T>, 'onContextMenu' | 'component'>,
) {
  const [state, actions] = context.useContext()
  const [local, others] = splitProps(props, ['as'])
  return (
    <Dynamic
      component={local.as || 'div'}
      {...others}
      onContextMenu={(e: any) => {
        e.preventDefault()
        actions.setX(e.clientX)
        actions.setY(e.clientY)
        actions.setOpen(state.status === 'closed')
      }}
      {...setData({ 'cm-status': state.status })}
    />
  )
}
