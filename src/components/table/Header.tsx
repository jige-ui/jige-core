import { type ComponentProps, createMemo, createUniqueId, onCleanup, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import Colgroup from './Colgroup'
import { NormalTable } from './common'
import context from './context'
import { setData } from '@/common/dataset'

export function TableHeader(props: ComponentProps<'thead'>) {
  const [, actions] = context.useContext()
  return (
    <NormalTable ref={actions.setHeaderScrollRef}>
      <Colgroup />
      <thead {...props} />
    </NormalTable>
  )
}

export function Column(
  props: Omit<ComponentProps<'th'>, 'rowspan' | 'colspan' | 'rowSpan' | 'colSpan'> & {
    width?: number
    rowSpan?: number
    colSpan?: number
  },
) {
  const [, actions] = context.useContext()
  const [local, others] = splitProps(props, ['width', 'rowSpan', 'colSpan'])

  const id = `col-${createUniqueId()}`

  const isDirectColumn = createMemo(() => {
    const colSpan = Number(local.colSpan || 0)
    return colSpan <= 1
  })

  onCleanup(() => {
    actions.setState('colsWidth', id, undefined!)
    actions.setState('colsKeys', id, undefined!)
  })

  watch([() => local.width, isDirectColumn], ([w, isDirectColumn]) => {
    actions.setState('colsWidth', id, (isDirectColumn ? w || 80 : undefined)!)
    actions.setState('colsKeys', id, isDirectColumn)
    actions.setState('manualWidths', id, (isDirectColumn ? w || undefined : undefined)!)
  })

  return (
    <th
      {...others}
      rowSpan={local.rowSpan}
      colSpan={local.colSpan}
      {...setData({
        leaf: isDirectColumn(),
        key: id,
      })}
    />
  )
}
