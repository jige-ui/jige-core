import type { JSX } from 'solid-js/jsx-runtime'
import { createMemo, For } from 'solid-js'
import context from './context'

function paginationPartShow(totalPages: number, currPage: number) {
  const tags: (number | 'space-right' | 'space-left')[] = []
  const endSize = 1
  const midSize = 2

  const leftEnd = Math.min(endSize, currPage - 1)
  const rightEnd = Math.max(totalPages - endSize + 1, currPage + 1)
  const leftMid = Math.max(leftEnd + 1, currPage - midSize)
  const rightMid = Math.min(rightEnd - 1, currPage + midSize)

  // Display pages on the left edge
  for (let i = 1; i <= leftEnd; i++) {
    tags.push(i)
  }

  // Display spaces between edges and middle pages
  if (leftMid - leftEnd > 1) {
    tags.push('space-left')
  }

  // Display left middle pages
  for (let i = leftMid; i < currPage; i++) {
    tags.push(i)
  }

  // Display the current page
  tags.push(currPage)

  // Display right middle pages
  for (let i = currPage + 1; i <= rightMid; i++) {
    tags.push(i)
  }

  // Display spaces between edges and middle pages
  if (rightEnd - rightMid > 1) {
    tags.push('space-right')
  }

  // Display pages on the right edge
  for (let i = rightEnd; i <= totalPages; i++) {
    tags.push(i)
  }

  return tags
}

/**
 * renders a list of page numbers
 * NaN for ... (ellipsis page)
 */
export function Pager(props: {
  children: (pages: number | 'space-right' | 'space-left') => JSX.Element
}) {
  const [state] = context.useContext()

  const pages = createMemo(() => {
    return paginationPartShow(state.totalPages, state.currPage)
  })

  return (
    <For each={pages()}>
      {page => (
        <>{props.children(page)}</>
      )}
    </For>
  )
}
