import type { JSX } from 'solid-js/jsx-runtime'

interface Context { useContext: () => [{}, {}, {}] }
type ContextChild<T extends [{}, {}, {}]> = (state: T[0], actions: T[1], staticData: T[2]) => JSX.Element
export type MaybeContextChild<T extends Context> = ContextChild<ReturnType<T['useContext']>> | JSX.Element
export type PropsWithContextChild<T extends Context, U> = Omit<U, 'children'> & { children: MaybeContextChild<T> }
export function callMaybeContextChild<T extends Context>(context: T, children: MaybeContextChild<T>) {
  return typeof children === 'function' ? children(...context.useContext()) : children
}

export type MaybeCallableChild<T extends any[] = []> = JSX.Element | ((...args: T) => JSX.Element)
export function callMaybeCallableChild(children: MaybeCallableChild<any[]>, ...args: any) {
  return typeof children === 'function' ? children(...args) : children
}
