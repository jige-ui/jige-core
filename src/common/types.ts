export type Fn = () => void
export type AnyFn = (...args: any[]) => any
export type CloseableStatus = 'closed' | 'closing' | 'opened' | 'opening'
export const isUndefined = (value: any): value is undefined => value === undefined
export type MaybeAsyncFn<T> = (args: T) => void | Promise<void>
