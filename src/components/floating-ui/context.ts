import type { CloseableStatus } from '@/common/types'
import type { Derivable, OffsetOptions, Placement, SizeOptions } from '@floating-ui/dom'
import { computePosition, flip, offset, shift, size } from '@floating-ui/dom'
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
    offset: 4 as OffsetOptions,
    size: undefined as undefined | SizeOptions | Derivable<SizeOptions>,
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

    const middleware = [offset(state.plugin.offset)]

    if (state.plugin.shift) {
      middleware.push(shift())
    }

    if (state.plugin.flip) {
      middleware.push(flip())
    }

    if (state.plugin.size) {
      middleware.push(size(state.plugin.size))
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
