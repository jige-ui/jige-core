import { combineStyle } from '@/common/dom'
import { type PropsWithContextChild, callMaybeContextChild } from '@/common/props'
import { mergeRefs } from '@solid-primitives/refs'
import createFocusTrap from 'solid-focus-trap'
import { type ComponentProps, splitProps } from 'solid-js'
import { watch } from 'solid-uses'
import { ModalCore } from '../modal'
import { context } from './context'

export function Content(
  props: PropsWithContextChild<typeof context, Omit<ComponentProps<'div'>, 'children'>>,
) {
  let ref!: HTMLDivElement
  const [localProps, otherProps] = splitProps(props, ['children', 'style', 'ref'])
  const [state, acts] = context.useContext()
  const [modalState, modalActs] = ModalCore.useContext()

  watch(
    () => modalState.status,
    () => {
      if (modalState.status === 'opening') {
        acts.setTranslateValue('0')
      } else if (modalState.status === 'closing') {
        acts.setTranslateValue('100%')
      }
    },
  )

  createFocusTrap({
    element: () => ref,
    enabled: () => modalState.status === 'opened',
  })

  return (
    <div
      tabIndex={-1}
      data-status={modalState.status}
      ref={mergeRefs(localProps.ref, (el) => {
        ref = el
      })}
      onTransitionEnd={() => {
        modalActs.setStatus(modalState.status.replace('ing', 'ed') as 'opened' | 'closed')
      }}
      onTransitionRun={() => {}}
      style={combineStyle(
        {
          transform: state.transformStr,
          'pointer-events': 'auto',
        },
        localProps.style,
      )}
      {...otherProps}
    >
      {callMaybeContextChild(context, props.children)}
    </div>
  )
}
