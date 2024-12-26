import { dataSets } from '@/common/dataset'
import { splitProps, type ValidComponent } from 'solid-js'
import { Dynamic, type DynamicProps } from 'solid-js/web'
import context from './context'

export function Trigger<T extends ValidComponent = 'div'>(props: { as?: T } & Omit<DynamicProps<T>, 'onContextMenu' | 'component'>) {
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
      {...dataSets('cm', { status: state.status })}
    />
  )
}
