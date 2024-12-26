import type { JSX } from 'solid-js/jsx-runtime'
import context from './context'

export function Root(props: { children: JSX.Element }) {
  const Context = context.initial()

  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>
  )
}
