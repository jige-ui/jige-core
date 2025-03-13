import type { CloseableStatus } from '@/common/types'
import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		x: 0,
		y: 0,
		status: 'closed' as CloseableStatus,
	}),
	methods: {
		setOpen(open: boolean) {
			const { state, actions } = this
			if (open && state.status.startsWith('open')) return
			if (!open && state.status.startsWith('clos')) return
			actions.setStatus(open ? 'opening' : 'closing')
			if (open) {
				document.body.style.overflow = 'hidden'
				document.body.style.pointerEvents = 'none'
			} else {
				document.body.style.overflow = ''
				document.body.style.pointerEvents = ''
			}
		},
	},
})

export default context
