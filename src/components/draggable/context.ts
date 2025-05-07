import { isUndefined } from '@/common/types'
import { createComponentState } from 'solid-uses'
import type { DraggableStatus } from './types'

export const context = createComponentState({
  state: () => ({
    status: 'ready' as DraggableStatus | 'ready',
    /**
     * the threshold of the distance before the drag starts. 'px'
     */
    startThreshold: 2,
    x: 0,
    y: 0,
    initialX: 0,
    initialY: 0,
    bounds: {
      left: undefined,
      top: undefined,
      right: undefined,
      bottom: undefined,
    } as { left?: number; top?: number; right?: number; bottom?: number },
    targetElement: null as HTMLElement | null,
    disabled: false,
  }),
  getters: {
    deltaX() {
      return this.state.x - this.state.initialX
    },
    deltaY() {
      return this.state.y - this.state.initialY
    },
  },
  methods: {
    setStatus(status: DraggableStatus) {
      this.actions.setState('status', status)
    },
    setX(x: number) {
      let realX = x
      const { left, right } = this.state.bounds
      if (!isUndefined(left)) {
        realX = Math.max(realX, left)
      }
      if (!isUndefined(right)) {
        const maxX = window.innerWidth - right
        realX = Math.min(realX, maxX)
      }

      this.actions.setState('x', realX)
    },
    setY(y: number) {
      let realY = y
      const { top, bottom } = this.state.bounds
      if (!isUndefined(top)) {
        realY = Math.max(realY, top)
      }
      if (!isUndefined(bottom)) {
        const maxY = window.innerHeight - bottom
        realY = Math.min(realY, maxY)
      }

      this.actions.setState('y', realY)
    },
    calcInitial() {
      const ref = this.state.targetElement
      if (!ref) return
      const transform = ref.style.transform
      ref.style.transform = 'none'
      const rect = ref.getBoundingClientRect()
      this.actions.setState({
        initialX: rect.x,
        initialY: rect.y,
      })
      ref.style.transform = transform
    },

    approxPosInBounds(x: number, y: number): { safeX: number; safeY: number } {
      let safeX = x
      let safeY = y
      const { left, top, right, bottom } = this.state.bounds
      if (!isUndefined(left)) {
        safeX = Math.max(safeX, left)
      }
      if (!isUndefined(right)) {
        const maxX = window.innerWidth - right
        safeX = Math.min(safeX, maxX)
      }
      if (!isUndefined(top)) {
        safeY = Math.max(safeY, top)
      }
      if (!isUndefined(bottom)) {
        const maxY = window.innerHeight - bottom
        safeY = Math.min(safeY, maxY)
      }

      return { safeX, safeY }
    },
  },
})
