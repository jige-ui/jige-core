import { CircleProgressCore, SliderCore } from '@/build'
import { createSignal } from 'solid-js'

export default function TestCircleProgress() {
  const [progress, setProgress] = createSignal(50)
  return (
    <div>
      <div class='m-2 w-100px h-100px'>
        <CircleProgressCore gapOffsetDegree={0} gapDegree={60}>
          <CircleProgressCore.Rail color='#f0f0f0' radius={50} strokeWidth={16} />
          <CircleProgressCore.Fill
            color='#1890ff'
            radius={50}
            strokeWidth={10}
            percent={progress()}
            offsetDegree={20}
          />
        </CircleProgressCore>
      </div>

      <div>
        <SliderCore value={progress()} onChange={setProgress}>
          <SliderCore.Native class='test-slider-native' />
          <SliderCore.Track class='w-200px h-10px bg-blue rounded-lg'>
            <SliderCore.Fill class='bg-gray-5 rounded-lg' />
            <SliderCore.Thumb class='bg-amber h-20px w-20px rounded-50% top-[-5px] translate-x-[-50%] test-slider-thumb ' />
          </SliderCore.Track>
        </SliderCore>
      </div>
    </div>
  )
}
