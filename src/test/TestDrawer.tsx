import { DrawerCore, ModalCore } from '@/build'

export default function TestDrawer() {
  return (
    <div>
      <DrawerCore closeOnClickMask closeOnEsc>
        <DrawerCore.Trigger>
          <button type='button'>Open Drawer</button>
        </DrawerCore.Trigger>
        <ModalCore.Portal>
          <DrawerCore.Mask class='data-status:bg-op-30 backdrop-blur-sm' />
          <DrawerCore.Content class='flex fixed transition-transform duration-300 ease-in-out bg-blue inset-x-0 bottom-0 max-h-125 h-full flex items-center justify-center'>
            <div>hello</div>
            <input type='text' class='b b-amber p-1' />
          </DrawerCore.Content>
        </ModalCore.Portal>
      </DrawerCore>
    </div>
  )
}
