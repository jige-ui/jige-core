// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
	shortcuts: {
		'color-main': 'text-gray-900 dark:text-gray-300',
		'color-fade': 'text-gray-900/50 dark:text-gray-300/50',
		'bg-main': 'bg-white dark:bg-dark-100',
	},
	theme: {
		colors: {
			// ...
		},
	},
	rules: [
		// 添加一个规则来重置 input 元素的样式
		[
			'reset-input',
			{
				all: 'unset',
				'box-sizing': 'border-box',
				appearance: 'none',
				'-webkit-appearance': 'none',
				outline: 'none',
			},
		],
	],
	variants: [
		// 通用变体处理器
		(matcher) => {
			const regex = /^data-([\w-]+):/
			const match = matcher.match(regex)

			// 如果没有匹配到 gm-xxx: 前缀，返回原始 matcher
			if (!match) return matcher

			// 提取 gm- 后的部分
			const rest = match[1]

			// 返回修改后的 matcher 和 selector
			return {
				matcher: matcher.replace(regex, ''),
				selector: (s) => `${s}[data-${rest}]`,
			}
		},
	],
	presets: [presetUno(), presetIcons()],
})
