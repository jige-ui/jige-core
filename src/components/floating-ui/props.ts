import type { Derivable, OffsetOptions, SizeOptions } from '@floating-ui/dom'

export type Placement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'

export interface FloatingUiCoreProps {
  placement?: Placement
  trigger?: 'hover' | 'click' | 'manual'
  openDelay?: number
  closeDelay?: number
  canHoverContent?: boolean
  disabled?: boolean
  floatingOption?: {
    offset?: OffsetOptions
    shift?: boolean
    flip?: boolean
    size?: SizeOptions | Derivable<SizeOptions>
  }
}
