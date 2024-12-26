import type { JSX } from 'solid-js/jsx-runtime'
import type { VirtualScrollConfig } from './types'
import { ScrollbarCore } from '../scrollbar'
import { context } from './context'

export function Root(props: { children: JSX.Element } & Partial<VirtualScrollConfig> & { height?: string, maxHeight?: string }) {
  const Context = context.initial({
    count: () => props.count,
    overscan: () => props.overscan,
    horizontal: () => props.horizontal,
    paddingStart: () => props.paddingStart,
    paddingEnd: () => props.paddingEnd,
    scrollPaddingStart: () => props.scrollPaddingStart,
    scrollPaddingEnd: () => props.scrollPaddingEnd,
  })
  return (
    <Context.Provider>
      <ScrollbarCore height={props.height} maxHeight={props.maxHeight}>
        {props.children}
      </ScrollbarCore>
    </Context.Provider>
  )
}
