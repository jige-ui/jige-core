import type { SetStoreFunction } from 'solid-js/store'
import { createStore } from 'solid-js/store'

export interface FormDataType {
  [key: string]: string | number | boolean | string[]
}

export interface FormInstance<T extends FormDataType> {
  getFieldsValue: () => T
  setFieldsValue: SetStoreFunction<T>
  initialFieldsValue: Partial<T>
}

export function useForm<T extends FormDataType = {}>(InitialData?: Partial<T>): FormInstance<T> {
  const [state, setState] = createStore(InitialData || {})

  return {
    getFieldsValue: () => state as T,
    setFieldsValue: setState as SetStoreFunction<T>,
    initialFieldsValue: InitialData || {},
  }
}
