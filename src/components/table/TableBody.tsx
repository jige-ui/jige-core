import type { ComponentProps } from 'solid-js'
import Colgroup from './Colgroup'
import { NormalTable } from './common'

export function TableBody(props: ComponentProps<'tbody'>) {
  return (
    <NormalTable>
      <Colgroup />
      <tbody {...props} />
    </NormalTable>
  )
}
