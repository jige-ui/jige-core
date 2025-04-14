import { ModalCore } from '../modal'
import { context } from './context'

export function Root(props: Parameters<typeof ModalCore>[0] & {}) {
  const Context = context.initial()

  return (
    <ModalCore {...props}>
      <Context.Provider>{props.children}</Context.Provider>
    </ModalCore>
  )
}
