import type { JSX } from 'solid-js/jsx-runtime'
import { isUndefined } from '@/common/types'
import { watch } from 'solid-uses'
import { context, GloablModalStore } from './context'

export function Root(props: {
  children: JSX.Element
  open?: boolean
  preventScroll?: boolean
  closeOnInteractOutside?: boolean
}) {
  const Context = context.initial({
    preventScroll: () => props.preventScroll,
    closeOnInteractOutside: () => props.closeOnInteractOutside,
  })
  const [state, actions] = Context.value

  const [globalState] = GloablModalStore

  watch(() => props.open, (open) => {
    if (isUndefined(open))
      return
    actions.setOpen(open)
  })

  watch([() => state.preventScroll, () => state.status], ([p, s]) => {
    const shouldPrevent = p && s.startsWith('open')

    actions.preventBodyScroll(shouldPrevent)
  })

  watch(() => globalState.closeAll, (closeAll) => {
    if (closeAll) {
      actions.setOpen(false)
    }
  })

  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>
  )
}
