export type Fn = () => void
export type AnyFn = (...args: any[]) => any
export type CloseableStatus = 'closed' | 'closing' | 'opened' | 'opening'
export const isUndefined = (value: any): value is undefined => value === undefined
export type MaybeAsyncFn<T = undefined, U = void> = (args: T) => U | Promise<U>
export type AsyncFn<T = undefined, U = void> = (args: T) => Promise<U>
export type Maybe<T> = T | undefined
export type MaybePromise<T> = T | Promise<T>
export type IsTuple<T extends Array<any>> = number extends T['length'] ? false : true
export type TupleKeys<T extends Array<any>> = Exclude<keyof T, keyof any[]>
/**
 * Can be used to index an array or tuple type.
 */
export type ArrayKey = number
