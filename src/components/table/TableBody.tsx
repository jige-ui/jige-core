import { For } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import Colgroup from './Colgroup'
import { NormalTable } from './common'
import context from './context'

export default function TableBody(props: {
	children: (row: Record<string, any>) => JSX.Element
}) {
	const [state] = context.useContext()
	return (
		<div>
			<NormalTable>
				<Colgroup type='body' />
				<tbody>
					<For each={state.data}>{(row) => props.children(row)}</For>
				</tbody>
			</NormalTable>
		</div>
	)
}
