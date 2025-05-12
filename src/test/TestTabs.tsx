import { RadioGroupCore } from '@/build'
import { AnimatedGroup } from '@/components/animated-group'

import { For, Show, createSignal } from 'solid-js'
import { watch } from 'solid-uses'
import './test.css'

export default function TestTabs() {
  const [x, setX] = createSignal(0)
  const [active, setActive] = createSignal('apple')
  const [dir, setDir] = createSignal<'left' | 'right'>('left')

  watch(active, (_, prev) => {
    if (!prev) return
    if (['apple', 'food', 'air'].indexOf(prev) < ['apple', 'food', 'air'].indexOf(active())) {
      setDir('right')
    } else {
      setDir('left')
    }
  })

  watch(active, () => {
    const index = ['apple', 'food', 'air'].indexOf(active())
    setX(index * 65)
  })

  return (
    <div>
      <RadioGroupCore value={active()} onChange={setActive}>
        <div class='flex gap-0 relative p-4px bg-gray-3'>
          <For each={['apple', 'food', 'air']}>
            {(item) => (
              <RadioGroupCore.Item value={item}>
                <RadioGroupCore.ItemNative />
                <RadioGroupCore.ItemControl>
                  <div class='p-2 cursor-pointer z-1 w-65px text-center'>{item}</div>
                </RadioGroupCore.ItemControl>
              </RadioGroupCore.Item>
            )}
          </For>

          <div
            class='absolute top-4px bottom-4px left-4px w-65px bg-amber transition'
            style={{
              transform: `translateX(${x()}px)`,
            }}
          />
        </div>
      </RadioGroupCore>
      <AnimatedGroup active={active()} class='tab-wrapper bg-gray-2 '>
        <For each={['apple', 'food', 'air']}>
          {(item) => (
            <AnimatedGroup.Panel key={item} class='p-5 test-tab' data-dir={dir()}>
              {item}
              <Show when={item === 'apple'}>
                <div>apple</div>
                <div>apple</div>
                <div>apple</div>
                <div>apple</div>
              </Show>
            </AnimatedGroup.Panel>
          )}
        </For>
        <div class='fixed bottom-0 h-40px'>
          state: {JSON.stringify(AnimatedGroup.useContext()[0])}
        </div>
      </AnimatedGroup>
      <div>
        active:
        {active()}
      </div>
    </div>
  )
}
