import { FloatingUiCore, SelectCore } from '@/build'
import { VirtualScrollCore } from '@/components/virtual-scroll'
import { list } from 'radash'

import { onMount } from 'solid-js'
import { watch } from 'solid-uses'
import './test.css'

function SelectHeightBind() {
  const state = FloatingUiCore.useContext()[0]

  onMount(() => {
    watch(() => state.placement, () => {
      state.refContent
      && state.refContent.style.setProperty('--content-transform-origin', state.placement === 'bottom' ? 'top center' : 'bottom center')
    })
  })

  return <></>
}

export default function TestVirtualSelect() {
  const opts = list(9999)

  return (
    <SelectCore>
      <SelectCore.Trigger>
        {state => (
          <button class="p-1 min-w-100px b-gray border rounded-md hover:b-black transition flex items-center" role="button" type="button">
            <span class="flex-1">{state.value || 'Select some'}</span>
            <i class="i-ri-arrow-down-s-line" />
          </button>
        )}
      </SelectCore.Trigger>
      <SelectCore.Content class="bg-main rounded-md py-1 ani-float drop-shadow">
        {
          state => (
            <VirtualScrollCore count={opts.length} maxHeight="245px">
              <SelectHeightBind />
              <VirtualScrollCore.Content class="w-100px" scrollToIndex={Number(state.value)}>
                {item => (
                  <SelectCore.Option
                    value={item.index}
                    class="p-2 min-w-85px flex items-center justify-center hover:bg-gray-2 transition w-full cursor-pointer"
                  >
                    {opts[item.index]}
                  </SelectCore.Option>
                )}
              </VirtualScrollCore.Content>
              <VirtualScrollCore.Bar
                type="vertical"
                class="absolute bottom-[2px] top-[2px] right-[2px] bg-gray-2 w-8px transition"
              >
                <VirtualScrollCore.Thumb type="vertical" class="bg-amber cursor-pointer" />
              </VirtualScrollCore.Bar>
            </VirtualScrollCore>
          )
        }
      </SelectCore.Content>
    </SelectCore>
  )
}
