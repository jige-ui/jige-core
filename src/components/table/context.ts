import { createComponentState } from 'solid-uses'
import type { SimpleData } from './types'

const context = createComponentState({
	state: () => ({
		data: [] as Record<string, SimpleData>[],
		colsWidth: {} as Record<string, number>,
		safeList: [] as string[],
		headerCols: {} as Record<string, HTMLTableColElement>,
		bodyCols: {} as Record<string, HTMLTableColElement>,
		signalRefresh: 0,
		headerScrollRef: null as HTMLDivElement | null,
		width: 0,
	}),
	methods: {
		refresh(wrapperWidth: number) {
			const { state, actions } = this

			const needSetWidth: string[] = []
			const widths: Record<string, number> = {}
			let constWidthCount = 0
			for (const key in state.bodyCols) {
				if (state.safeList.includes(key)) {
					constWidthCount = constWidthCount + state.colsWidth[key]
					continue
				}

				needSetWidth.push(key)
			}

			const minWidth = needSetWidth.length * 80 + constWidthCount

			if (wrapperWidth < minWidth) {
				actions.setWidth(minWidth)
			} else {
				actions.setWidth(0)
			}

			for (const key of needSetWidth) {
				widths[key] = Math.max(
					Math.floor((wrapperWidth - constWidthCount) / needSetWidth.length),
					80,
				)
			}

			actions.setColsWidth(Object.assign({}, state.colsWidth, widths))
			for (const key in state.colsWidth) {
				if (state.bodyCols[key] && state.headerCols[key]) {
					state.bodyCols[key].width = `${state.colsWidth[key]}`
					state.headerCols[key].width = `${state.colsWidth[key]}`
				}
			}
		},
	},
})

export default context
