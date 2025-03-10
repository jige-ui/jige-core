import type { AnyFieldApi, AnyFormApi, SolidFormApi } from '@tanstack/solid-form'

import { createComponentState } from 'solid-uses'

export const formContext = createComponentState({
  state: () => ({}),
  nowrapData: {
    tanstackForm: {} as AnyFormApi & SolidFormApi<any, any, any, any, any, any, any, any, any, any>,
  },
})

export const fieldContext = createComponentState({
  state: () => ({
    name: '',
  }),
  nowrapData: {
    fieldInstance: () => ({}) as AnyFieldApi,
  },
})

export type ExtendsForTanstackFormInstance = SolidFormApi<any, any, any, any, any, any, any, any, any, any>
