import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    colsWidth: {} as Record<string, number>,
    headerScrollRef: null as HTMLDivElement | null,
    manualWidths: {} as Record<string, number>,
    width: 0,
  }),
  methods: {
    refresh(wrapperWidth: number) {
      console.log(1)

      const { state, actions } = this

      const needSetWidth: string[] = []
      const widths: Record<string, number> = {}
      let constWidthCount = 0

      // check if the width is set manually
      for (const key in state.colsWidth) {
        if (Object.keys(state.manualWidths).includes(key)) {
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

      // calculate the width of each column which is not set manually
      for (const key of needSetWidth) {
        widths[key] = Math.max(
          Math.floor((wrapperWidth - constWidthCount) / needSetWidth.length),
          80,
        )
      }

      actions.setColsWidth(Object.assign({}, state.colsWidth, widths))
    },
  },
})

export default context
