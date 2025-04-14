import { combineStyle } from '@/common/dom'
import { type ComponentProps, splitProps } from 'solid-js'
import context from './context'

export function NormalTable(props: ComponentProps<'table'>) {
  const [state] = context.useContext()
  const [local, others] = splitProps(props, ['style'])
  return (
    <table
      // @ts-expect-error xxx
      cellspacing='0'
      cellpadding='0'
      border='0'
      style={combineStyle(
        {
          'border-collapse': 'separate',
          'table-layout': 'fixed',
          width: state.width ? `${state.width}px` : '100%',
        },
        local.style,
      )}
      {...others}
    />
  )
}
