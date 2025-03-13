import { createUniqueId } from 'solid-js'
import { createComponentState } from 'solid-uses'

const context = createComponentState({
	state: () => ({
		value: '',
		name: `radio-group-${createUniqueId()}`,
		disabled: false,
	}),
})

export default context
