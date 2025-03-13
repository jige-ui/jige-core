import { createRoot } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createComponentState } from 'solid-uses'
import type { CloseableStatus } from '../../common/types'

export const CollapsibleParents = createRoot(() => {
  // eslint-disable-next-line solid/reactivity
  return createStore({} as Record<string, string>)
})

const context = createComponentState({
  state: () => ({
    status: 'closed' as CloseableStatus,
    id: '',
    parentId: '',
  }),
  methods: {
    open() {
      if (this.state.status.startsWith('open')) return
      this.actions.setState('status', 'opening')
    },
    close() {
      if (this.state.status.startsWith('clos')) return
      this.actions.setState('status', 'closing')
    },
  },
})

export default context
