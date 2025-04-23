import { FormCore } from '@/build'
import { getUniqueId } from '@/components/jige-form/field'
import type { FieldArrayPath } from '@/components/jige-form/types/path'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { sleep } from 'radash'
import { For } from 'solid-js'
import * as v from 'valibot'

function valiFieldValidator(schema: v.GenericSchema | v.GenericSchemaAsync) {
  return async (value: any) => {
    const result = await v.safeParseAsync(schema, value, {
      abortPipeEarly: true,
    })
    return result.issues?.[0]?.message
  }
}

function valiForm(schemas: Record<string, v.GenericSchema | v.GenericSchemaAsync>) {
  const finalValidate = {} as Record<string, any>
  for (const key in schemas) {
    finalValidate[key] = valiFieldValidator(schemas[key])
  }
  return finalValidate
}

export default function TestJigeForm() {
  const form = FormCore.createForm({
    defaultValues: () => ({
      name: 'John Doe',
      email: 'test@111.com',
      array: [] as { name: string; value: string }[],
      nestArray: [] as { name: string }[],
    }),
    onSubmit: async (values) => {
      console.log('onSubmit', values)
      await sleep(2000)
    },
    validate: valiForm({
      name: v.pipe(v.string(), v.nonEmpty('Please enter.'), v.maxLength(6, 'max length is 6')),
      email: v.pipe(v.string(), v.email('Please enter a valid email.')),
    }),
  })

  const [state, , staticD] = form.context
  type FormValues = typeof state.formData

  const [parent] = createAutoAnimate()

  return (
    <div class='flex gap-2'>
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
        <FormCore.Field
          name='email'
          validators={[valiFieldValidator(v.pipe(v.string(), v.maxLength(13, 'max length is 13')))]}
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
        <FormCore.Field
          name={form.context[0].formData.name}
          keepState={false}
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
        <div ref={parent}>
          <FormCore.FieldArray<FormValues, FieldArrayPath<FormValues>> name='array'>
            {(fieldArray) => (
              <For each={fieldArray.items}>
                {(_, index) => (
                  <div>
                    <FormCore.Field keepState={false} name={`array.${index()}.name`}>
                      {(state, actions) => {
                        return (
                          <div>
                            <div class='flex gap-2'>
                              <input
                                value={state.value || ''}
                                onInput={(e) => {
                                  actions.handleChange(e.target.value)
                                }}
                                onBlur={actions.handleBlur}
                              />
                              <button
                                type='button'
                                onClick={() => {
                                  FormCore.methods.arrayInsert<FormValues>(form, 'array', {
                                    at: index() + 1,
                                    value: { name: `${getUniqueId()}`, value: 'new value' },
                                  })
                                }}
                              >
                                add
                              </button>
                              <button
                                type='button'
                                onClick={() => {
                                  FormCore.methods.arrayRemove<FormValues>(form, 'array', {
                                    at: index(),
                                  })
                                }}
                              >
                                remove
                              </button>
                            </div>
                            <div>{state.errors.map((v) => v.message).join(',')}</div>
                          </div>
                        )
                      }}
                    </FormCore.Field>
                  </div>
                )}
              </For>
            )}
          </FormCore.FieldArray>
        </div>

        <div class='flex gap-2'>
          <button
            type='button'
            onClick={() => {
              FormCore.methods.arrayInsert<FormValues>(form, 'array', {
                value: { name: '', value: 'v' },
              })
            }}
          >
            Add
          </button>
          <button
            type='button'
            onClick={() => {
              FormCore.methods.arrayRemove<FormValues>(form, 'array', {
                at: form.context[0].formData.array.length - 1,
              })
            }}
          >
            delete
          </button>
          <button type='submit'>{form.context[0].isSubmitting ? 'Submitting...' : 'Submit'}</button>
          <button type='reset'>reset</button>
        </div>
      </FormCore>
      <div class='w-350px overflow-auto'>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  )
}
