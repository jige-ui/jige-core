import { isUndefined } from '@/common/types'
import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { GlobalModalStore, context } from './context'

export function Root(props: {
  children: JSX.Element
  open?: boolean
  onOpenChange?: (open: boolean) => void
  preventScroll?: boolean
  closeOnClickMask?: boolean
  closeOnEsc?: boolean
}) {
  const Context = context.initial({
    preventScroll: () => props.preventScroll,
    closeOnClickMask: () => props.closeOnClickMask,
    closeOnEsc: () => props.closeOnEsc,
  })
  const [state, actions] = Context.value

  const [globalState] = GlobalModalStore

  watch(
    () => props.open,
    (open) => {
      if (isUndefined(open)) return
      actions.setOpen(open)
    },
  )

  watch(
    () => state.status,
    (status) => {
      if (status === 'closed') {
        props.onOpenChange?.(false)
      }
      if (status === 'opened') {
        props.onOpenChange?.(true)
      }
    },
  )

  watch([() => state.preventScroll, () => state.status], ([p, s]) => {
    const shouldPrevent = p && s.startsWith('open')

    actions.preventBodyScroll(shouldPrevent)
  })

  watch(
    () => globalState.closeAll,
    (closeAll) => {
      if (closeAll) {
        actions.setOpen(false)
      }
    },
  )

  return <Context.Provider>{props.children}</Context.Provider>
}
