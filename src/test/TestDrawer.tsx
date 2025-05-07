import { ModalCore } from '@/build'

import './drawer.css'

export default function TestDrawer() {
  return (
    <div>
      <ModalCore closeOnClickMask closeOnEsc>
        <ModalCore.Trigger>
          <button type='button'>Open Drawer</button>
        </ModalCore.Trigger>
        <ModalCore.Portal>
          <ModalCore.Mask class='data-status:bg-op-30 backdrop-blur-sm' />
          <ModalCore.Content>
            {(state) => (
              <div
                data-status={state.status}
                class='ani-drawer flex fixed transition-transform duration-300 ease-in-out bg-blue inset-y-0 right-0 w-125 h-full flex items-center justify-center'
              >
                <div>hello</div>
              </div>
            )}
          </ModalCore.Content>
        </ModalCore.Portal>
      </ModalCore>
    </div>
  )
}
