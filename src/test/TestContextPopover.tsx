import { ContextMenuCore } from '@/build'
import { list } from 'radash'
import { For } from 'solid-js'

export default function TestContextPopover() {
  return (
    <ContextMenuCore>
      <ContextMenuCore.Trigger class='flex justify-center items-center w-200px h-200px b b-dashed overflow-auto'>
        <div>
          <For each={list(200)}>{() => <div>trigger</div>}</For>
        </div>
      </ContextMenuCore.Trigger>
      <ContextMenuCore.Content>Content</ContextMenuCore.Content>
      <div>
        <For each={list(200)}>{() => <div>item</div>}</For>
      </div>
    </ContextMenuCore>
  )
}
