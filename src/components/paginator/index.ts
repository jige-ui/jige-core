/**
 * supper simple paginator
 *
 * thanks for the idea from Hexo
 */

import { Pager } from './Pager'
import { Root } from './Root'
import context from './context'

export const PaginatorCore = Object.assign(Root, {
  Pager,
  useContext: context.useContext,
})
