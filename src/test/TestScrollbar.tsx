import { ScrollbarCore } from '@/build'
import { For, createSignal } from 'solid-js'

export default function TestScrollbar() {
	const [isIn, setIsIn] = createSignal(false)
	return (
		<div
			style={{
				height: '600px',
			}}
		>
			<ScrollbarCore
				maxHeight='300px'
				class='pr-4 pb-4'
				onMouseEnter={() => {
					setIsIn(true)
				}}
				onMouseLeave={() => {
					setIsIn(false)
				}}
			>
				<ScrollbarCore.Content>
					<For each={[...Array.from({ length: 100 }).keys()]}>
						{(i) => (
							<div>
								{i}
								xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
							</div>
						)}
					</For>
				</ScrollbarCore.Content>
				<ScrollbarCore.Bar
					type='vertical'
					class='absolute bottom-[2px] top-[2px] right-[2px] bg-gray-2 w-8px transition'
					classList={{
						'opacity-0': !isIn(),
						'opacity-100': isIn(),
					}}
				>
					<ScrollbarCore.Thumb type='vertical' class='bg-amber cursor-pointer' />
				</ScrollbarCore.Bar>
				<ScrollbarCore.Bar
					type='horizontal'
					class='absolute left-[2px] bottom-[2px]  right-[10px] bg-gray-2 h-8px'
				>
					<ScrollbarCore.Thumb type='horizontal' class='bg-amber' />
				</ScrollbarCore.Bar>
			</ScrollbarCore>
		</div>
	)
}
