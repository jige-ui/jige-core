import type { CloseableStatus } from '@/common/types'
import { computePosition, flip, offset, type Placement, shift } from '@floating-ui/dom'
import { createComponentState } from 'solid-uses'

export const context = createComponentState({ state: () => ({
  x: 0,
  y: 0,
  placement: 'top' as Placement,
  status: 'closed' as CloseableStatus,
  trigger: 'hover' as 'hover' | 'click' | 'manual',
  refContent: null as HTMLDivElement | null,
  refTrigger: null as HTMLElement | null,
  canHoverContent: true,
  timer: null as null | NodeJS.Timeout,
  disabled: false,
  arrow: 0,
  closeDelay: 0,
  openDelay: 0,
  middlewareData: {
    shift: {
      x: 0,
      y: 0,
    },
  },
  plugin: {
    shift: true,
    flip: true,
    offset: 4,
  },
}), methods: {
  /* only for hover */
  setTimerOpen(open: boolean) {
    const { state, actions } = this
    let duration = open ? state.openDelay : state.closeDelay

    if (state.canHoverContent && !open) {
      duration = Math.max(duration, 300)
    }

    if (state.timer) {
      clearTimeout(state.timer)
    }

    actions.setTimer(setTimeout(() => {
      actions.setOpen(open)
    }, duration))
  },
  setOpen(open: boolean) {
    const { state, actions } = this
    if (open && state.disabled) {
      return
    }
    if (open && state.status.startsWith('open'))
      return
    if (!open && state.status.startsWith('clos'))
      return
    actions.setStatus(open ? 'opening' : 'closing')
  },
  async updatePos() {
    const { state, actions } = this

    const $content = state.refContent
    const $reference = state.refTrigger

    if (!$content?.isConnected || !$reference?.isConnected || state.disabled) {
      return
    }

    const middleware = [offset(state.plugin.offset + (state.arrow / 2))]

    if (state.plugin.shift) {
      middleware.push(shift())
    }

    if (state.plugin.flip) {
      middleware.push(flip())
    }

    const { x, y, placement, middlewareData } = await computePosition($reference, $content, {
      placement: state.placement,
      middleware,
      strategy: 'fixed',
    })

    actions.setX(x)
    actions.setY(y)
    actions.setState('middlewareData', middlewareData)
    actions.setPlacement(placement)
  },
} })
