import { ContextMenuCore } from '@/build'
import { list } from 'radash'
import { For } from 'solid-js'

import './test.css'

export default function TestContextMenu() {
  return (
    <div class='flex flex-col justify-center items-center w-200px h-200px b b-dashed overflow-auto'>
      <For each={list(200)}>
        {(item) => (
          <ContextMenuCore>
            <ContextMenuCore.Trigger class='w-full m-1 bg-blue'>
              <div>trigger-{item}</div>
            </ContextMenuCore.Trigger>
            <ContextMenuCore.Content class='bg-amber p-3 ani-tips'>
              Content-{item}
            </ContextMenuCore.Content>
          </ContextMenuCore>
        )}
      </For>
    </div>
  )
}
