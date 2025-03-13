import {
	CheckboxGroupCore,
	FloatingUiCore,
	FormCore,
	InputCore,
	RadioGroupCore,
	SelectCore,
	SliderCore,
	SwitcherCore,
} from '@/build'
import { sleep } from 'radash'
import { For, createSignal, onMount } from 'solid-js'
import { watch } from 'solid-uses'
import './test.css'

function SelectHeightBind() {
	const state = FloatingUiCore.useContext()[0]

	onMount(() => {
		watch(
			() => state.placement,
			() => {
				state.refContent?.style.setProperty(
					'--content-transform-origin',
					state.placement === 'bottom' ? 'top center' : 'bottom center',
				)
			},
		)
	})

	return <></>
}

function CheckboxGroup() {
	const [fieldState, fieldActions] = FormCore.useField()

	return (
		<CheckboxGroupCore
			name={fieldState.name}
			value={fieldState.value as string[]}
			onChange={fieldActions.handleChange}
		>
			<div class='flex gap-2'>
				<For each={['apple', 'food', 'air']}>
					{(item) => (
						<CheckboxGroupCore.Item value={item}>
							<CheckboxGroupCore.ItemNative />
							<CheckboxGroupCore.ItemControl>
								{(state) => (
									<div
										class='p-2 cursor-pointer z-1 w-100px text-center bg-gray-3 data-checked:bg-amber'
										data-checked={state.value.includes(item) || undefined}
									>
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
	const [fieldState, fieldActions] = FormCore.useField()
	const [formState] = FormCore.useForm()

	const [x, setX] = createSignal(0)

	watch(
		() => formState.formData.radio,
		(v: string) => {
			const index = ['apple', 'food', 'air'].indexOf(v)
			setX(index * 100)
		},
	)

	return (
		<RadioGroupCore
			name={fieldState.name}
			value={fieldState.value as string}
			onChange={fieldActions.handleChange}
		>
			<div class='flex gap-0 relative p-4px bg-gray-3'>
				<For each={['apple', 'food', 'air']}>
					{(item) => (
						<RadioGroupCore.Item value={item}>
							<RadioGroupCore.ItemNative />
							<RadioGroupCore.ItemControl>
								<div class='p-2 cursor-pointer z-1 w-100px text-center'>{item}</div>
							</RadioGroupCore.ItemControl>
						</RadioGroupCore.Item>
					)}
				</For>

				<div
					class='absolute top-4px bottom-4px left-4px w-100px bg-amber transition'
					style={{
						transform: `translateX(${x()}px)`,
					}}
				/>
			</div>
		</RadioGroupCore>
	)
}

function Checker() {
	const [fieldState, fieldActions] = FormCore.useField()
	return (
		<SwitcherCore checked={fieldState.value} onChange={fieldActions.handleChange}>
			<SwitcherCore.Native class='test-switch-native' />
			<SwitcherCore.Control>
				{(state) => (
					<div class='bg-amber relative w-40px h-20px  rounded-20px cursor-pointer test-switch-control'>
						<div
							class='left-1px absolute bg-black w-20px h-20px rounded-full data-checked:translate-x-[calc(100%-1px)] transition'
							data-checked={state.checked || undefined}
						/>
					</div>
				)}
			</SwitcherCore.Control>
		</SwitcherCore>
	)
}

function Selector() {
	const [fieldState, fieldActions] = FormCore.useField()
	return (
		<SelectCore placement='bottom' value={fieldState.value} onChange={fieldActions.handleChange}>
			<SelectCore.Trigger>
				{(state) => (
					<button
						class='p-1 min-w-100px b-gray border rounded-md hover:b-black transition flex items-center'
						type='button'
					>
						<span class='flex-1'>{state.value || 'Select some'}</span>
						<i class='i-ri-arrow-down-s-line' />
					</button>
				)}
			</SelectCore.Trigger>
			<SelectCore.Content class='bg-main rounded-md py-1 ani-float drop-shadow'>
				<SelectHeightBind />
				<For each={['apple', 'food', 'air']}>
					{(item) => (
						<SelectCore.Option value={item} class='p-2 cursor-pointer hover:bg-gray-3'>
							{item}
						</SelectCore.Option>
					)}
				</For>
				<SelectCore.Arrow size={10} class='bg-main' />
			</SelectCore.Content>
		</SelectCore>
	)
}

function Slider() {
	const [fieldState, fieldActions] = FormCore.useField()
	return (
		<SliderCore
			value={fieldState.value}
			onChange={fieldActions.handleChange}
			min={-100}
			max={100}
			step={1}
			reverse
		>
			<SliderCore.Native class='test-slider-native' />
			<SliderCore.Track class='w-200px h-10px bg-gray-3 rounded-lg'>
				{(state) => (
					<>
						<SliderCore.Fill
							class='bg-blue rounded-lg pointer-events-none h-full absolute right-0'
							style={{
								width: `${state.percentage}%`,
							}}
						/>
						<SliderCore.Thumb
							class='bg-amber h-20px w-20px rounded-50% top-[-5px] translate-x-[50%] absolute test-slider-thumb '
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
	const form = FormCore.createForm({
		defaultValues: () => ({
			checkboxGroup: ['apple', 'food'],
			radio: 'apple',
			input: 'apple',
			checked: false,
			select: '',
			slider: 50,
		}),
		onSubmit: async (value) => {
			await sleep(2000)
			console.log(value)
		},
	})

	const [formState] = form.context

	return (
		<div>
			<FormCore staticFormInstance={form}>
				<FormCore.Field name='checkboxGroup'>
					<CheckboxGroup />
				</FormCore.Field>
				<FormCore.Field name='radio'>
					<RadioGroup />
				</FormCore.Field>
				<FormCore.Field name='input'>
					{(state, actions) => (
						<div>
							<InputCore name={state.name} value={state.value} onChange={actions.handleChange}>
								<InputCore.Native onBlur={actions.handleBlur} />
							</InputCore>
						</div>
					)}
				</FormCore.Field>
				<FormCore.Field name='checked'>
					<Checker />
				</FormCore.Field>
				<FormCore.Field name='select'>
					<Selector />
				</FormCore.Field>
				<FormCore.Field name='slider'>
					<Slider />
				</FormCore.Field>

				<div class='mt-4'>
					<button type='submit' disabled={!formState.canSubmit}>
						{formState.isSubmitting ? '...' : 'Submit'}
					</button>
				</div>
			</FormCore>
			<div class='mt-4'>{JSON.stringify(formState.formData)}</div>
		</div>
	)
}
