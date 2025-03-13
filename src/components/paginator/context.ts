import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		currPage: 1,
		totalPages: 1,
	}),
})

export default context
