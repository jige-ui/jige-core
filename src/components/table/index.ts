import Root from './Table'
import TableBody from './TableBody'
import TableHead from './TableHead'

export const TableCore = Object.assign(Root, {
  Body: TableBody,
  Head: TableHead,
})

export type { DataType, HeaderType, SimpleData } from './types'
