import type { VirtualItem } from '@tanstack/solid-virtual'
import type { JSX } from 'solid-js'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { For } from 'solid-js'
import { watch } from 'solid-uses'
import { ScrollbarCore } from '../scrollbar'
import { context } from './context'

export function Content(props: {
  children: (item: VirtualItem) => JSX.Element
  scrollToIndex?: number
  class?: string
  estimateSize?: (index: number) => number
}) {
  let realRef!: HTMLDivElement
  const [state] = context.useContext()
  const virtualizer = createVirtualizer({
    count: state.count,
    getScrollElement: () => realRef,
    estimateSize: props.estimateSize || (() => 32),
  })

  watch(() => props.scrollToIndex, (index) => {
    index && virtualizer.scrollToIndex(index, { align: 'center' })
  })

  return (
    <ScrollbarCore.ScrollArea
      ref={realRef}
    >
      <ScrollbarCore.Content
        class={props.class}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        <For each={virtualizer.getVirtualItems()}>
          {item => (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              {props.children(item)}
            </div>
          )}
        </For>
      </ScrollbarCore.Content>
    </ScrollbarCore.ScrollArea>
  )
}
