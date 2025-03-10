import context from './context'
import Fill from './Fill'
import Native from './Native'
import Root from './Root'
import Thumb from './Thumb'
import Track from './Track'

export const SliderCore = Object.assign(Root, {
  Thumb,
  Fill,
  Track,
  Native,
  useContext: context.useContext,
})
