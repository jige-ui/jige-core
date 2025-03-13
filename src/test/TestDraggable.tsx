import { DraggableCore } from '@/build'

function DraggableArea() {
  const [state] = DraggableCore.useContext()
  return (
    <div class='bg-blue'>
      Drage me to {state.x}, {state.y}
    </div>
  )
}

export default function TestDraggable() {
  return (
    <DraggableCore
      bounds={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <DraggableCore.Content class='fixed'>
        <div class='p-5 bg-amber cursor-move select-none'>
          <DraggableCore.Handler>
            <DraggableArea />
          </DraggableCore.Handler>
          I tried, please know that I tried
        </div>
      </DraggableCore.Content>
    </DraggableCore>
  )
}
