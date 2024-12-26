import type { JSX } from 'solid-js/jsx-runtime'
import { createEffect } from 'solid-js'
import context from './context'

export function Root(props: {
  children: JSX.Element
  total?: number
  pageSize?: number
  totalPage?: number
  currPage: number
}) {
  const Context = context.initial()
  const [state, actions] = Context.value

  createEffect(() => {
    actions.setTotalPages(props.totalPage || Math.ceil((props.total || 0) / (props.pageSize || 10)))
    actions.setCurrPage(Math.min(Math.max(1, props.currPage), state.totalPages))
  })

  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>
  )
}
