import type { JSX } from 'solid-js'
import { createUniqueId } from 'solid-js'
import { watch } from 'solid-uses'
import context, { CollapsibleParents } from './context'

export function Root(props: { children: JSX.Element; parentID?: string }) {
	const Context = context.initial({
		parentId: () => props.parentID,
		id: () => (props.parentID ? createUniqueId() : undefined),
	})
	const [state, actions] = Context.value
	const [pstate, psetState] = CollapsibleParents

	watch([() => state.status, () => state.parentId], ([status, pid]) => {
		if (pid) {
			if (status.startsWith('open')) {
				psetState(pid, state.id)
			}
		}
	})

	watch(
		() => pstate[state.parentId],
		(id) => {
			if (!state.parentId || !state.id) return
			if (id !== state.id) {
				actions.close()
			}
		},
	)

	return <Context.Provider>{props.children}</Context.Provider>
}
