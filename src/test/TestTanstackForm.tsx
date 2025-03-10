import { CheckboxGroupCore, FloatingUiCore, FormCore, InputCore, RadioGroupCore, SelectCore, SliderCore, SwitcherCore } from '@/build'
import { createForm } from '@tanstack/solid-form'
import { sleep } from 'radash'
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

function CheckboxGroup() {
  const field = FormCore.useField()

  return (
    <CheckboxGroupCore name={field().name} value={field().state.value as string[]} onChange={field().handleChange}>
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
  )
}

function RadioGroup() {
  const field = FormCore.useField()
  const form = FormCore.useForm()

  const [x, setX] = createSignal(0)

  const radio = form.useStore(state => state.values.radio)

  watch(radio, (v) => {
    const index = ['apple', 'food', 'air'].indexOf(v)
    setX(index * 100)
  })

  return (
    <RadioGroupCore
      name={field().name}
      value={field().state.value as string}
      onChange={field().handleChange}
    >
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
  )
}

function Checker() {
  const field = FormCore.useField()
  return (
    <SwitcherCore checked={field().state.value} onChange={field().handleChange}>
      <SwitcherCore.Native class="test-switch-native" />
      <SwitcherCore.Control>
        {state => (
          <div class="bg-amber relative w-40px h-20px  rounded-20px cursor-pointer test-switch-control">
            <div class="left-1px absolute bg-black w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition" data-checked={state.checked || undefined} />
          </div>
        )}
      </SwitcherCore.Control>
    </SwitcherCore>
  )
}

function Selector() {
  const field = FormCore.useField()
  return (
    <SelectCore placement="bottom" value={field().state.value} onChange={field().handleChange}>
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
  )
}

function Slider() {
  const field = FormCore.useField()
  return (
    <SliderCore value={field().state.value} onChange={field().handleChange} min={-100} max={100} step={1} reverse>
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
  )
}

export default function TestTanstackForm() {
  const form = createForm(() => ({
    defaultValues: {
      checkboxGroup: ['apple', 'food'],
      radio: 'apple',
      input: 'apple',
      checked: false,
      select: '',
      slider: 50,
    },
    onSubmit: async ({ value }) => {
      await sleep(2000)
      console.log(value)
    },
  }))

  const data = form.useStore(state => state.values)

  return (
    <div>
      <FormCore staticTanstackFormInstance={form}>
        <FormCore.Field<typeof form> name="checkboxGroup">
          <CheckboxGroup />
        </FormCore.Field>
        <FormCore.Field name="radio">
          <RadioGroup />
        </FormCore.Field>
        <FormCore.Field name="input">
          {field => (
            <div>
              <InputCore
                name={field().name}
                value={field().state.value}
                onChange={v => field().handleChange(v)}
              >
                <InputCore.Native onBlur={field().handleBlur} />
              </InputCore>
            </div>
          )}
        </FormCore.Field>
        <FormCore.Field name="checked">
          <Checker />
        </FormCore.Field>
        <FormCore.Field name="select">
          <Selector />
        </FormCore.Field>
        <FormCore.Field name="slider">
          <Slider />
        </FormCore.Field>
        <form.Subscribe selector={state => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
        >
          {state => (
            <div class="mt-4">
              <button type="submit" disabled={!state().canSubmit}>
                {state().isSubmitting ? '...' : 'Submit'}
              </button>
            </div>
          )}
        </form.Subscribe>
      </FormCore>
      <div class="mt-4">
        {JSON.stringify(data())}
      </div>
    </div>

  )
}
