import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    colsKeys: {} as Record<string, boolean>,
    colsWidth: {} as Record<string, number>,
    headerScrollRef: null as HTMLDivElement | null,
    manualWidths: {} as Record<string, number>,
    width: 0,
  }),
  getters: {
    sortedColsKeys() {
      const headerDom = this.state.headerScrollRef
      if (!headerDom) return []

      // make sure all cols is leaf
      const keys = Object.keys(this.state.colsKeys).filter((key) => {
        if (!this.state.colsKeys[key]) return false
        const th = headerDom.querySelector(`th[data-key="${key}"]`)
        if (!th) return false
        // check if the th's rowIndex+rowSpan is equal to total row count
        const rowIndex = (th.parentElement as HTMLTableRowElement)?.rowIndex
        const rowSpan = th.getAttribute('rowSpan')
        const rowSpanNum = rowSpan ? Number(rowSpan) : 1
        const rowCount = headerDom.querySelectorAll('tr').length
        if (rowIndex + rowSpanNum > rowCount) return false
        return true
      })

      if (keys.length === 0) return []
      console.log('sortedColsKeys')
      return keys.sort((a, b) => {
        const aLeft =
          headerDom?.querySelector(`th[data-key="${a}"]`)?.getBoundingClientRect().left || 0
        const bLeft =
          headerDom?.querySelector(`th[data-key="${b}"]`)?.getBoundingClientRect().left || 0
        return aLeft - bLeft
      })
    },
  },
  methods: {
    refresh(wrapperWidth: number) {
      console.log('refresh')

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
