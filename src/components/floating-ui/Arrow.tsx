import { createMemo, mergeProps, onCleanup } from 'solid-js'
import { watch } from 'solid-uses'
import { context } from './context'

export function Arrow(props: {
  size?: number
  class?: string
}) {
  const [state, actions] = context.useContext()
  const finalProps = mergeProps({ size: 6 }, props)

  watch(
    () => finalProps.size,
    () => {
      actions.setArrow(finalProps.size)
    },
  )

  onCleanup(() => {
    actions.setArrow(0)
  })

  const getObjPos = (pos: string) => {
    return {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[pos]
  }

  const getPosMain = () => {
    return state.placement.split('-')[0]
  }

  const getPosCross = () => {
    return state.placement.split('-')[1]
  }

  const getWrapperStyle = () => {
    const posMain = getPosMain()
    return `position:absolute;inset:0;${getObjPos(posMain)}:auto;${posMain}:100%;z-index:-1`
  }

  const getStyle = createMemo(() => {
    let style = ''
    const posMain = getPosMain()
    if (!posMain) return ''
    if (!posMain) return ''

    const isVertical = posMain === 'top' || posMain === 'bottom'
    const mainPositionStyle = `${posMain}: -${finalProps.size / 2}px`
    const crossMain = `${isVertical ? 'left' : 'top'}`
    const crossStart = () => {
      if (getPosCross() === 'start') {
        return '0%'
      }
      if (getPosCross() === 'end') {
        return '100%'
      }
      return '50%'
    }
    const crossShift = () => {
      const shift = state.middlewareData.shift[isVertical ? 'x' : 'y']
      if (getPosCross() === 'start') {
        return shift - finalProps.size
      }
      if (getPosCross() === 'end') {
        return -shift + finalProps.size * 2
      }
      return shift
    }
    const crossPositionStyle = `${crossMain}: calc(${crossStart()} - ${crossShift()}px)`
    const transformStyle = () => {
      if (getPosCross() === undefined)
        return `transform: translate${isVertical ? 'X' : 'Y'}(-${finalProps.size / 2}px) rotate(45deg)`
      return 'transform: rotate(45deg)'
    }

    style += `${mainPositionStyle};${crossPositionStyle};${transformStyle()};position:absolute;width:${finalProps.size}px;height:${finalProps.size}px`
    return style
  })

  return (
    <div style={getWrapperStyle()}>
      <div style={getStyle()} class={finalProps.class} />
    </div>
  )
}
