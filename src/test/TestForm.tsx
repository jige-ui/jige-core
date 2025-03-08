import { CheckboxGroupCore, FloatingUiCore, FormCore, InputCore, RadioGroupCore, ScrollbarCore, SelectCore, SliderCore, SwitcherCore } from '@/build'
import { createElementSize } from '@solid-primitives/resize-observer'
import { throttle } from 'radash'
import { createSignal, For, onMount } from 'solid-js'
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

function ScrollInput() {
  const [state, actions] = ScrollbarCore.useContext()

  const formInstance = FormCore.useFormInstance()
  const data = formInstance.getFieldsValue()

  watch(() => state.refContent, (ref) => {
    if (!ref)
      return
    const size = createElementSize(ref)
    watch([() => size.height, () => size.width], throttle({ interval: 35 }, () => {
      actions.setValue()
    }))
  })

  watch(() => data.slider, (s) => {
    console.log(s)
  })

  const throttleSetValue = throttle({ interval: 30 }, actions.setValue)

  return (
    <InputCore>
      <InputCore.Native
        type="textarea"
        ref={actions.setRefContent}
        style={{
          'position': 'relative',
          'overflow': 'auto',
          'scrollbar-width': 'none',
          'height': state.height,
          'max-height': state.maxHeight,
          'user-select': state.isDragging ? 'none' : undefined,
          'resize': 'none',
          'width': '100%',
        }}
        onScroll={() => {
          throttleSetValue()
        }}

        onScrollEnd={() => {
          actions.setValue()
        }}
      />
    </InputCore>
  )
}

export default function TestForm() {
  const [x, setX] = createSignal(0)

  const form = FormCore.useForm({
    checkboxGroup: ['apple', 'food'],
    radio: 'apple',
    input: 'apple',
    checked: false,
    select: '',
    slider: 50,
  })

  const state = form.getFieldsValue()

  watch(() => state.radio, () => {
    const index = ['apple', 'food', 'air'].indexOf(state.radio)
    setX(index * 100)
  })

  return (
    <FormCore staticFormInstance={form} class="bg-gray-2 rounded-md shadow border p-2 flex-col flex gap-2">
      <FormCore.Item name="checkboxGroup">
        <CheckboxGroupCore>
          <div class="flex gap-2">
            <For each={['apple', 'food', 'air']}>
              {item => (
                <CheckboxGroupCore.Item value={item}>
                  <CheckboxGroupCore.ItemNative />
                  <CheckboxGroupCore.ItemControl>
                    {state => (
                      <div class="p-2 cursor-pointer z-1 w-100px text-center bg-gray-3 data-checked:bg-amber" data-checked={state.value.includes(item) || undefined}>
                        {item}
                      </div>
                    )}
                  </CheckboxGroupCore.ItemControl>
                </CheckboxGroupCore.Item>
              )}
            </For>
          </div>
        </CheckboxGroupCore>
      </FormCore.Item>

      <FormCore.Item name="radio">
        <RadioGroupCore>
          <div class="flex gap-0 relative p-4px bg-gray-3">
            <For each={['apple', 'food', 'air']}>
              {item => (
                <RadioGroupCore.Item value={item}>
                  <RadioGroupCore.ItemNative />
                  <RadioGroupCore.ItemControl>
                    <div class="p-2 cursor-pointer z-1 w-100px text-center">
                      {item}
                    </div>
                  </RadioGroupCore.ItemControl>
                </RadioGroupCore.Item>
              )}
            </For>

            <div
              class="absolute top-4px bottom-4px left-4px w-100px bg-amber transition"
              style={{
                transform: `translateX(${x()}px)`,
              }}
            />
          </div>
        </RadioGroupCore>
        <RadioGroupCore>
          <div class="flex gap-0 relative p-4px bg-gray-3">
            <For each={['apple', 'food', 'air']}>
              {item => (
                <RadioGroupCore.Item value={item}>
                  <RadioGroupCore.ItemNative />
                  <RadioGroupCore.ItemControl>
                    <div class="p-2 cursor-pointer z-1 w-100px text-center">
                      {item}
                    </div>
                  </RadioGroupCore.ItemControl>
                </RadioGroupCore.Item>
              )}
            </For>

            <div
              class="absolute top-4px bottom-4px left-4px w-100px bg-amber transition"
              style={{
                transform: `translateX(${x()}px)`,
              }}
            />
          </div>
        </RadioGroupCore>
      </FormCore.Item>
      <FormCore.Item name="input">
        <InputCore>
          <InputCore.Native />
        </InputCore>
      </FormCore.Item>
      <FormCore.Item name="input">
        <ScrollbarCore maxHeight="300px">
          <ScrollInput />
          <ScrollbarCore.Bar
            type="vertical"
            class="absolute bottom-[12px] top-[4px] right-[3px] bg-gray-2 w-8px transition"
          >
            <ScrollbarCore.Thumb type="vertical" class="bg-amber cursor-pointer" />
          </ScrollbarCore.Bar>
        </ScrollbarCore>
      </FormCore.Item>

      <FormCore.Item name="checked">
        <SwitcherCore>
          <SwitcherCore.Native class="test-switch-native" />
          <SwitcherCore.Control>
            {state => (
              <div class="bg-amber relative w-40px h-20px  rounded-20px cursor-pointer test-switch-control">
                <div class="left-1px absolute bg-black w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition" data-checked={state.checked || undefined} />
              </div>
            )}
          </SwitcherCore.Control>
        </SwitcherCore>
      </FormCore.Item>

      <FormCore.Item name="checked">
        <SwitcherCore>
          <SwitcherCore.Native class="test-switch-native" />
          <SwitcherCore.Control>
            {state => (
              <div class="bg-gray-4 relative w-20px h-20px  rounded-4px cursor-pointer test-switch-control">
                <div class="data-checked:i-ri-check-fill text-20px" data-checked={state.checked || undefined} />
              </div>
            )}
          </SwitcherCore.Control>
        </SwitcherCore>
      </FormCore.Item>

      <FormCore.Item name="select">
        <SelectCore placement="bottom">
          <SelectCore.Trigger>
            {state => (
              <button class="p-1 min-w-100px b-gray border rounded-md hover:b-black transition flex items-center" role="button" type="button">
                <span class="flex-1">{state.value || 'Select some'}</span>
                <i class="i-ri-arrow-down-s-line" />
              </button>
            )}
          </SelectCore.Trigger>
          <SelectCore.Content class="bg-main rounded-md py-1 ani-float drop-shadow">
            <SelectHeightBind />
            <For each={['apple', 'food', 'air']}>
              {item => (
                <SelectCore.Option
                  value={item}
                  class="p-2 cursor-pointer hover:bg-gray-3"
                >
                  {item}
                </SelectCore.Option>
              )}
            </For>
            <SelectCore.Arrow size={10} class="bg-main" />
          </SelectCore.Content>
        </SelectCore>
      </FormCore.Item>

      <FormCore.Item name="slider">
        <SliderCore min={-100} max={100} step={1} reverse>
          <SliderCore.Native class="test-slider-native" />
          <SliderCore.Track class="w-200px h-10px bg-gray-3 rounded-lg">
            {state => (
              <>
                <SliderCore.Fill
                  class="bg-blue rounded-lg pointer-events-none h-full absolute right-0"
                  style={{
                    width: `${state.percentage}%`,
                  }}
                />
                <SliderCore.Thumb
                  class="bg-amber h-20px w-20px rounded-50% top-[-5px] translate-x-[50%] absolute test-slider-thumb "
                  style={{
                    right: `${state.percentage}%`,
                  }}
                />
              </>
            )}
          </SliderCore.Track>
        </SliderCore>
      </FormCore.Item>

      <FormCore.Item name="slider">
        <SliderCore min={-100} max={100} step={1} vertical>
          <SliderCore.Native class="test-slider-native" />
          <SliderCore.Track class="w-10px h-200px bg-gray-3 rounded-lg">
            {state => (
              <>
                <SliderCore.Fill
                  class="bg-blue rounded-lg pointer-events-none w-full absolute bottom-0"
                  style={{
                    height: `${state.percentage}%`,
                  }}
                />
                <SliderCore.Thumb
                  class="bg-amber h-20px w-20px rounded-50% left-[-5px] translate-y-[50%] absolute test-slider-thumb "
                  style={{
                    bottom: `${state.percentage}%`,
                  }}
                />
              </>
            )}
          </SliderCore.Track>
        </SliderCore>
      </FormCore.Item>

      <select
        multiple
        name="cars"
        id="cars"
        onChange={(e) => {
          console.log(e.target.selectedOptions)
        }}
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <div>
        {JSON.stringify(state)}
      </div>
    </FormCore>
  )
}
