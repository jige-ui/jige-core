import { CollapsibleCore } from '@/build'

import './test.css'

export default function TestCollapsible() {
  return (
    <div class="space-y-4">
      <CollapsibleCore parentID="eee">
        <div>
          <div class="p-4 bg-gray-100">
            {
              CollapsibleCore.useContext()[0].status
            }
          </div>
        </div>
        <CollapsibleCore.Trigger>
          <button>toggle</button>
        </CollapsibleCore.Trigger>
        <CollapsibleCore.Content class="ani-collapse overflow-hidden m-0!">
          <div class="p-4 bg-gray-100">Hello</div>
        </CollapsibleCore.Content>
      </CollapsibleCore>

      <CollapsibleCore parentID="eee">
        <div>
          <div class="p-4 bg-gray-100">
            {
              CollapsibleCore.useContext()[0].status
            }
          </div>
        </div>
        <CollapsibleCore.Trigger>
          <button>toggle</button>
        </CollapsibleCore.Trigger>
        <CollapsibleCore.Content>
          <div class="p-4 bg-gray-100">Hello2</div>
        </CollapsibleCore.Content>
      </CollapsibleCore>

    </div>

  )
}
