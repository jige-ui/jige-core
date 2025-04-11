import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    side: 'bottom' as 'left' | 'right' | 'top' | 'bottom',
    openPercentage: 0,
    translateValue: '100%',
  }),
  getters: {
    transformStr() {
      const side = this.state.side
      let result = 'translate3d('
      switch (side) {
        case 'left':
          result += `${this.state.translateValue},0,0`
          break
        case 'right':
          result += `-${this.state.translateValue},0,0`
          break
        case 'top':
          result += `0,-${this.state.translateValue},0`
          break
        case 'bottom':
          result += `0,${this.state.translateValue},0`
          break
      }

      result += ')'
      return result
    },
  },
})
