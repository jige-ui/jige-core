import { Cell } from './Cell'
import { Column, TableHeader } from './Header'
import { Row } from './Row'
import Root from './Table'
import { TableBody } from './TableBody'

export const TableCore = Object.assign(Root, {
  Body: TableBody,
  Header: TableHeader,
  Row,
  Cell,
  Column,
})
