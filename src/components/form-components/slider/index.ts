import Fill from './Fill'
import Native from './Native'
import Root from './Root'
import Thumb from './Thumb'
import Track from './Track'
import context from './context'

export const SliderCore = Object.assign(Root, {
	Thumb,
	Fill,
	Track,
	Native,
	useContext: context.useContext,
})
