import { createContext } from 'solid-js'
import { createComponentState } from 'solid-uses'

export const fieldNameContext = createComponentState({
  state: () => ({
    name: '',
  }),
  methods: {
    setName(name: string) {
      this.actions.setState('name', name)
    },
  },
})

export const FieldContext = createContext<
  readonly [
    {
      name: string
      isTouched: boolean
      isValidating: boolean
      value: any
      isDirty: boolean
      errors: any[]
    },
    {
      setValue: (value: unknown) => boolean
      handleBlur: () => void
      handleChange: (value: any) => void
      handleValidate: () => void
    },
  ]
>([
  {
    name: '',
    isTouched: false,
    isValidating: false,
    value: undefined,
    isDirty: false,
    errors: [] as any[],
  },
  {
    setValue: (() => false) as (value: unknown) => boolean,
    handleBlur: () => {},
    handleChange: () => {},
    handleValidate: () => {},
  },
])
