import context from './context'

export function NormalTable(props: {
	children: any
}) {
	const [state] = context.useContext()
	return (
		<table
			// @ts-expect-error xxx
			cellspacing='0'
			cellpadding='0'
			border='0'
			style={{
				'border-collapse': 'separate',
				'table-layout': 'fixed',
				width: state.width ? `${state.width}px` : '100%',
			}}
		>
			{props.children}
		</table>
	)
}
