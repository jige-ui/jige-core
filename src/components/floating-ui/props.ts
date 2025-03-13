// fix TS2742 on pnpm
import type {} from '@floating-ui/core'
import type {
  Derivable,
  FlipOptions,
  OffsetOptions,
  ShiftOptions,
  SizeOptions,
} from '@floating-ui/dom'

export type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'

export interface FloatingUiCoreProps {
  placement?: Placement
  trigger?: 'hover' | 'click' | 'manual'
  openDelay?: number
  closeDelay?: number
  canHoverContent?: boolean
  disabled?: boolean
  floatingOption?: {
    offset?: OffsetOptions
    shift?: ShiftOptions | Derivable<ShiftOptions> | boolean
    flip?: FlipOptions | Derivable<FlipOptions> | boolean
    size?: SizeOptions | Derivable<SizeOptions>
  }
}
