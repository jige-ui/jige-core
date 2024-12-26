/**
 * supper simple paginator
 *
 * thanks for the idea from Hexo
 */

import context from './context'
import { Pager } from './Pager'
import { Root } from './Root'

export const PaginatorCore = Object.assign(Root, {
  Pager,
  useContext: context.useContext,
})
