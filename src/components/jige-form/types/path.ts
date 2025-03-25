import type { ArrayKey, IsTuple, TupleKeys } from '@/common/types'
import type { FieldValue, FieldValues } from './field'

type ValuePath<TKey extends string | number, TValue> = TValue extends string[]
  ? `${TKey}` | `${TKey}.${ValuePaths<TValue>}`
  : TValue extends FieldValue | Blob
    ? `${TKey}`
    : `${TKey}.${ValuePaths<TValue>}`

type ValuePaths<TValue> = TValue extends Array<infer TChild>
  ? IsTuple<TValue> extends true
    ? {
        [TKey in TupleKeys<TValue>]-?: ValuePath<TKey & string, TValue[TKey]>
      }[TupleKeys<TValue>]
    : ValuePath<ArrayKey, TChild>
  : {
      [TKey in keyof TValue]-?: ValuePath<TKey & string, TValue[TKey]>
    }[keyof TValue]

/**
 * Returns a path of a type that leads to a field array.
 */
type ArrayPath<TKey extends string | number, Value> = Value extends Array<any>
  ? `${TKey}` | `${TKey}.${ArrayPaths<Value>}`
  : Value extends FieldValues
    ? `${TKey}.${ArrayPaths<Value>}`
    : never

/**
 * Returns all paths of a type that lead to a field array.
 */
type ArrayPaths<TValue> = TValue extends Array<infer TChild>
  ? IsTuple<TValue> extends true
    ? {
        [TKey in TupleKeys<TValue>]-?: ArrayPath<TKey & string, TValue[TKey]>
      }[TupleKeys<TValue>]
    : ArrayPath<ArrayKey, TChild>
  : {
      [TKey in keyof TValue]-?: ArrayPath<TKey & string, TValue[TKey]>
    }[keyof TValue]

type PathValue<TValue, TPath> = TPath extends `${infer TKey1}.${infer TKey2}`
  ? TKey1 extends keyof TValue
    ? TKey2 extends ValuePaths<TValue[TKey1]> | ArrayPaths<TValue[TKey1]>
      ? PathValue<TValue[TKey1], TKey2>
      : never
    : TKey1 extends `${ArrayKey}`
      ? TValue extends Array<infer TChild>
        ? PathValue<TChild, TKey2 & (ValuePaths<TChild> | ArrayPaths<TChild>)>
        : never
      : never
  : TPath extends keyof TValue
    ? TValue[TPath]
    : never

export type FieldPath<TFieldValues extends FieldValues> = ValuePaths<TFieldValues>

export type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldPath>

/**
 * See {@link ArrayPaths}
 */
export type FieldArrayPath<TFieldValues extends FieldValues> = ArrayPaths<TFieldValues>
/**
 * See {@link PathValue}
 */
export type FieldArrayPathValue<
  TFieldValues extends FieldValues,
  TFieldArrayPath extends FieldArrayPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldArrayPath> & Array<unknown>
