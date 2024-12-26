import type { CloseableStatus } from '@/common/types'
import { preventBodyScroll } from '@/common/dom'
import { createRoot, createUniqueId } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createComponentState, watch } from 'solid-uses'

export const GloablModalStore = createRoot(() => {
  const [state, setState] = createStore({ closeAll: false, preventScrollIds: [] as string[], stack: [] as string[] })
  watch(() => state.preventScrollIds, (ids) => {
    preventBodyScroll(ids.length > 0)
  })
  return [state, setState] as [typeof state, typeof setState]
})

export const context = createComponentState({
  state: () => ({
    status: 'closed' as CloseableStatus,
    id: createUniqueId(),
    preventScroll: true,
    closeOnInteractOutside: true,
  }),

  methods: {
    setOpen(open: boolean) {
      const { state, actions } = this
      if (open && state.status.startsWith('open'))
        return
      if (!open && state.status.startsWith('clos'))
        return
      actions.setStatus(open ? 'opening' : 'closing')
    },
    preventBodyScroll(prevent: boolean) {
      const { state } = this
      const [gs, setState] = GloablModalStore

      if (prevent) {
        if (gs.preventScrollIds.includes(state.id))
          return
        setState('preventScrollIds', ids => [...ids, state.id])
      }
      else {
        const index = gs.preventScrollIds.indexOf(state.id)
        if (index !== -1) {
          setState('preventScrollIds', (ids) => {
            ids.splice(index, 1)
            return [...ids]
          })
        }
      }
    },
  },
})
