import { DraggableCore, ModalCore } from '@/build'
import type { JSX } from 'solid-js/jsx-runtime'

import { watch } from 'solid-uses'
import './test.css'

function Dialog(props: {
	children: JSX.Element
}) {
	let triggerRef!: HTMLButtonElement
	let contentRef!: HTMLDivElement

	return (
		<ModalCore preventScroll={true}>
			<ModalCore.Trigger>
				<button type='button' class='bg-amber p-2' ref={triggerRef}>
					Trigger
				</button>
			</ModalCore.Trigger>
			<ModalCore.Portal>
				<ModalCore.Mask class='bg-gray bg-op-20 backdrop-blur-sm' />
				<ModalCore.Content class='flex justify-center items-center '>
					{(state, actions) => {
						watch(
							() => state.status,
							(status) => {
								if (status === 'opening') {
									contentRef.style.animationName = 'none'
									const triggerRect = triggerRef.getBoundingClientRect()
									const contentRect = contentRef.getBoundingClientRect()
									contentRef.style.animationName = ''

									const getCenter = (rect: DOMRect) => ({
										x: rect.left + (rect.right - rect.left) / 2,
										y: rect.top + (rect.bottom - rect.top) / 2,
									})

									const centerTrigger = getCenter(triggerRect)
									const centerContent = getCenter(contentRect)

									// set transform origin
									contentRef.style.setProperty(
										'--origin-x',
										`${centerTrigger.x - centerContent.x + contentRect.width / 2}px`,
									)
									contentRef.style.setProperty(
										'--origin-y',
										`${centerTrigger.y - centerContent.y + contentRect.height / 2}px`,
									)
								}
							},
						)
						return (
							<div
								class='ani-modal'
								data-status={state.status}
								ref={contentRef}
								style={{
									'transform-origin': 'var(--origin-x) var(--origin-y)',
								}}
							>
								<DraggableCore>
									<DraggableCore.Content>
										<div class='p-2 bg-gray-4 flex flex-col gap-3 '>
											<DraggableCore.Handler>
												<div class='bg-blue p-2 cursor-move select-none'>Drag me</div>
											</DraggableCore.Handler>
											{props.children}
											<button
												type='button'
												class='bg-amber p-2'
												onClick={() => actions.setOpen(false)}
											>
												Close
											</button>
											<button type='button' class='bg-red p-2' onClick={() => ModalCore.closeAll()}>
												Close All
											</button>
										</div>
									</DraggableCore.Content>
								</DraggableCore>
							</div>
						)
					}}
				</ModalCore.Content>
			</ModalCore.Portal>
		</ModalCore>
	)
}

export default function TestModal() {
	return (
		<Dialog>
			<div>1</div>
			<Dialog>
				<div>2</div>
				<Dialog>
					<div>3</div>
					<div>
						<input type='text' />
					</div>
				</Dialog>
			</Dialog>
		</Dialog>
	)
}
