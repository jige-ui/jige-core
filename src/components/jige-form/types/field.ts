export type FieldValue = string | string[] | number | number[] | boolean
export type FieldValues = {
  [name: string]: FieldValue | FieldValues | (FieldValue | FieldValues)[]
}
