import { FormCore } from '@/build'
import { sleep } from 'radash'
import * as v from 'valibot'

function valiFieldValidator(schema: v.GenericSchema | v.GenericSchemaAsync) {
	return async (value: any) => {
		const result = await v.safeParseAsync(schema, value, {
			abortPipeEarly: true,
		})
		return result.issues?.[0]?.message
	}
}

export default function TestJigeForm() {
	const form = FormCore.createForm({
		defaultValues: () => ({
			name: 'John Doe',
			email: 'test@111.com',
		}),
		onSubmit: async (values) => {
			console.log('onSubmit', values)
			await sleep(2000)
		},
	})

	return (
		<div class='flex'>
			<FormCore staticFormInstance={form} class='flex-1'>
				<FormCore.Field name='name'>
					{(state, actions) => {
						return (
							<div>
								<input
									value={state.value || ''}
									onInput={(e) => {
										actions.handleChange(e.target.value)
									}}
									onBlur={actions.handleBlur}
								/>

								<div>{state.errors.map((v) => v.message).join(',')}</div>
								<div class='b b-blue p-2 m-1 break-all'>{JSON.stringify(state)}</div>
							</div>
						)
					}}
				</FormCore.Field>
				<FormCore.Field name='email'>
					{(state, actions) => {
						return (
							<div>
								<input
									value={state.value || ''}
									onInput={(e) => {
										actions.handleChange(e.target.value)
									}}
									onBlur={actions.handleBlur}
								/>

								<div>{state.errors.map((v) => v.message).join(',')}</div>
								<div class='b b-blue p-2 m-1 break-all'>{JSON.stringify(state)}</div>
							</div>
						)
					}}
				</FormCore.Field>
				<FormCore.Field
					name={form.context[0].formData.name}
					validateRelatedFields={['name']}
					validators={[
						valiFieldValidator(
							v.pipe(v.string(), v.nonEmpty('Please enter.'), v.maxLength(6, 'max length is 6')),
						),
						(value, formValues) => {
							if (value !== formValues.name) {
								return `no equal to ${formValues.name}`
							}
						},
					]}
				>
					{(state, actions) => {
						return (
							<div>
								<input
									value={state.value || ''}
									onInput={(e) => {
										actions.handleChange(e.target.value)
									}}
									onBlur={actions.handleBlur}
								/>

								<div>{state.errors.map((v) => v.message).join(',')}</div>
								<div class='b b-blue p-2 m-1 break-all'>{JSON.stringify(state)}</div>
							</div>
						)
					}}
				</FormCore.Field>
				<button type='submit'>{form.context[0].isSubmitting ? 'Submitting...' : 'Submit'}</button>
				<button type='reset'>reset</button>
			</FormCore>
			<div class='b b-amber p-2 w-200px'>
				<div>isDirty: {form.context[0].isDirty.toString()}</div>
				<div>isTouched: {form.context[0].isTouched.toString()}</div>
				<div>formData: {JSON.stringify(form.context[0].formData)}</div>
			</div>
		</div>
	)
}
