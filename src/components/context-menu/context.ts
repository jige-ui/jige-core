import type { CloseableStatus } from '@/common/types'
import {
  computePosition,
  type Placement,
  type Derivable,
  type FlipOptions,
  type OffsetOptions,
  type ShiftOptions,
  type SizeOptions,
  offset,
  shift,
  flip,
  size,
} from '@floating-ui/dom'
import { batch } from 'solid-js'
import { createComponentState } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    placement: 'bottom-start' as Placement,
    triggerEl: null as HTMLElement | null,
    contentEl: null as HTMLDivElement | null,
    status: 'closed' as CloseableStatus,
    middlewareData: {
      shift: {
        x: 0,
        y: 0,
      },
    },
    plugin: {
      shift: true as ShiftOptions | Derivable<ShiftOptions> | boolean,
      flip: true as FlipOptions | Derivable<FlipOptions> | boolean,
      offset: 4 as OffsetOptions,
      size: undefined as undefined | SizeOptions | Derivable<SizeOptions>,
    },
  }),
  methods: {
    setOpen(open: boolean) {
      const { state, actions } = this
      if (open && state.status.startsWith('open')) return
      if (!open && state.status.startsWith('clos')) return
      actions.setState('status', open ? 'opening' : 'closing')
    },
    async updatePos() {
      const { clientX, clientY, contentEl, plugin } = this.state
      const virtualEl = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            top: clientY,
            left: clientX,
            right: clientX,
            bottom: clientY,
          }
        },
      }

      if (!contentEl) return

      const middleware = [offset(plugin.offset)]

      if (plugin.shift) {
        const conf = plugin.shift === true ? {} : plugin.shift
        middleware.push(shift(conf))
      }

      if (plugin.flip) {
        const conf = plugin.flip === true ? {} : plugin.flip
        middleware.push(flip(conf))
      }

      if (plugin.size) {
        middleware.push(size(plugin.size))
      }

      const { x, y, placement, middlewareData } = await computePosition(virtualEl, contentEl, {
        placement: this.state.placement,
        middleware,
        strategy: 'fixed',
      })

      batch(() => {
        this.actions.setState({
          x,
          y,
          placement,
        })
        this.actions.setState('middlewareData', middlewareData)
      })
    },
  },
})

export default context
