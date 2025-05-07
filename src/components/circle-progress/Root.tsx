import type { JSX } from 'solid-js/jsx-runtime'
import { watch } from 'solid-uses'
import context from './context'

export function Root(props: {
  children: JSX.Element
  gapOffsetDegree?: number
  gapDegree?: number
}) {
  const Context = context.initial()
  const [state, actions] = Context.value

  watch(
    () => props.gapDegree,
    () => {
      actions.setState('gapDegree', props.gapDegree || 0)
    },
  )

  return (
    <Context.Provider>
      <div
        style={{
          transform: `rotate(${props.gapOffsetDegree || 0}deg)`,
        }}
      >
        <svg
          role='img'
          aria-label='progress'
          viewBox={`0 0 ${state.viewBoxSize} ${state.viewBoxSize}`}
        >
          {props.children}
        </svg>
      </div>
    </Context.Provider>
  )
}
