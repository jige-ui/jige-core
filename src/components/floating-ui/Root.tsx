import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import { context } from './context'
import type { FloatingUiCoreProps } from './props'

export function Root(props: { children: JSX.Element } & FloatingUiCoreProps) {
	const Context = context.initial({
		trigger: () => props.trigger,
		placement: () => props.placement,
		openDelay: () => props.openDelay,
		closeDelay: () => props.closeDelay,
		canHoverContent: () => props.canHoverContent,
		disabled: () => props.disabled,
		plugin: () => ({ ...context.defaultValue().plugin, ...props.floatingOption }),
	})
	const [state, actions] = Context.value

	watch([() => state.placement, () => ({ ...state.plugin }), () => state.arrow], () => {
		actions.updatePos()
		console.log('update by ROOT')
	})

	return <Context.Provider>{props.children}</Context.Provider>
}
