import type { JSX } from 'solid-js/jsx-runtime'

export function getElementHeight(el: HTMLElement) {
	if (!el) return 0
	const oldTransitionDuration = el.style.transitionDuration
	const oldMaxHeight = el.style.maxHeight
	const oldAnimationName = el.style.animationName

	el.style.transitionDuration = '0s !important'
	el.style.maxHeight = ''
	el.style.animationName = 'none'

	const height = el.offsetHeight

	el.style.transitionDuration = oldTransitionDuration
	el.style.maxHeight = oldMaxHeight
	el.style.animationName = oldAnimationName

	return height
}

export const hiddenStyle =
	'border: 0px;clip: rect(0px, 0px, 0px, 0px);clip-path: inset(50%);height: 1px;margin: 0px -1px -1px 0px;overflow: hidden;padding: 0px;position: absolute;width: 1px;white-space: nowrap;'

export function hasAnimation(el: HTMLElement) {
	return getComputedStyle(el).animationName !== 'none'
}

export function uiRefreshDo(cb: () => void) {
	requestAnimationFrame(cb)
}

// eslint-disable-next-line regexp/no-super-linear-backtracking
const extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g
export function stringStyleToObject(style: string): JSX.CSSProperties {
	const object: Record<string, string> = {}
	let match: RegExpExecArray | null
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((match = extractCSSregex.exec(style))) {
		object[match[1]!] = match[2]!
	}
	return object
}

export function combineStyle(
	a: JSX.CSSProperties,
	b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties | string {
	let bb = {}
	if (typeof b === 'string') {
		bb = stringStyleToObject(b)
	}
	return { ...a, ...bb }
}

export function preventBodyScroll(enable: boolean) {
	const $body = document.body.style
	const paddingRight = window.innerWidth - document.documentElement.clientWidth
	if (enable) {
		$body.overflow = 'hidden'
		$body.pointerEvents = 'none'
		$body.paddingRight = `${paddingRight}px`
	} else {
		$body.overflow = ''
		$body.pointerEvents = ''
		$body.paddingRight = ''
	}
}
