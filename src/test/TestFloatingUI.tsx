import { FloatingUiCore } from '@/build'
import { createSignal } from 'solid-js'
import './test.css'

function ManualTrigger() {
  const [state, actions] = FloatingUiCore.useContext()

  return (
    <input
      style={{
        border: '1px solid black',
        width: '80px',
      }}
      value={state.status}
      onFocus={() => actions.setOpen(true)}
      onBlur={() => actions.setOpen(false)}
    />
  )
}

export default function TestFloatingUI() {
  const [offset, setOffset] = createSignal(4)
  const [placement, setPlacement] = createSignal('top')
  const [disabled, setDisabled] = createSignal(false)
  return (
    <div class='pt-10 ml-40 '>
      <div class='overflow-auto h-250px w-full mt-100'>
        <FloatingUiCore
          openDelay={3000}
          closeDelay={1500}
          disabled={disabled()}
          canHoverContent={true}
          trigger='manual'
          placement={placement() as any}
          floatingOption={{
            shift: true,
            flip: true,
            offset: offset(),
          }}
        >
          <FloatingUiCore.Trigger>
            <ManualTrigger />
          </FloatingUiCore.Trigger>
          <FloatingUiCore.Content class='p-2 rounded-md drop-shadow  bg-white'>
            <div
              onMouseDown={(e) => {
                e.preventDefault()
              }}
            >
              <div class='w-100px h-200px' />
            </div>
            <FloatingUiCore.Arrow class='bg-white' size={8} />
          </FloatingUiCore.Content>
        </FloatingUiCore>
        <div class='w-100px h-200px bg-red-200' />
        <div class='w-100px h-200px bg-red-200' />
        <div class='w-100px h-200px bg-red-200' />
      </div>
      <div>
        <input
          type='checkbox'
          checked={disabled()}
          onChange={(e) => setDisabled(e.currentTarget.checked)}
        />
        <input type='number' value={offset()} onInput={(e) => setOffset(+e.currentTarget.value)} />
        <select value={placement()} onChange={(e) => setPlacement(e.currentTarget.value)}>
          <option value='top'>top</option>
          <option value='right'>right</option>
          <option value='bottom'>bottom</option>
          <option value='left'>left</option>
          <option value='top-start'>top-start</option>
          <option value='top-end'>top-end</option>
          <option value='right-start'>right-start</option>
          <option value='right-end'>right-end</option>
          <option value='bottom-start'>bottom-start</option>
          <option value='bottom-end'>bottom-end</option>
          <option value='left-start'>left-start</option>
          <option value='left-end'>left-end</option>
        </select>
      </div>
    </div>
  )
}
