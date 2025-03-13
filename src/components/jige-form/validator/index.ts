export interface JigeFormValidatorCorrectReturn {
  message: string
  type: string
  [key: string]: any
}
export type JigeFormValidatorReturn =
  | {
      message: string
      type: string
      [key: string]: any
    }
  | string
  | undefined
export type JigeFormValidator = (
  fieldValue: any,
  formData: Record<string, any>,
) => JigeFormValidatorReturn
export type JigeFormAsyncValidator = (
  fieldValue: any,
  formData: Record<string, any>,
) => Promise<JigeFormValidatorReturn>

export function normalizeValidator(
  validateReturn: JigeFormValidatorReturn,
): JigeFormValidatorCorrectReturn | undefined {
  if (typeof validateReturn === 'string' && validateReturn) {
    return {
      message: validateReturn,
      type: 'error',
    }
  }
  return validateReturn as JigeFormValidatorCorrectReturn | undefined
}
