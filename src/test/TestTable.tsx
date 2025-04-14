import { ContextMenuCore, ScrollbarCore } from '@/build'
import Table from '@/components/table/Table'
import TableBody from '@/components/table/TableBody'
import TableHead from '@/components/table/TableHead'
import type { DataType } from '@/components/table/types'
import { For, createResource } from 'solid-js'

export default function TestTable() {
  // 示例数据
  const d: DataType[] = [
    {
      id: 1,
      'delivery.name': 'John',
      'delivery.address.state': 'CA',
      'delivery.address.city': 'Los Angeles',
      'delivery.address.street': { data: 'xxxxxxxxxxxxxx', width: 200 },
      'delivery.address.zip': '90001',
    },
    {
      id: 2,
      'delivery.name': 'Jane',
      'delivery.address.state': 'NY',
      'delivery.address.city': 'New York',
      'delivery.address.street': { data: 'xxxxxxxxxxxxxx', width: 200 },
      'delivery.address.zip': '10001',
    },
    {
      id: 3,
      'delivery.name': 'Doe',
      'delivery.address.state': 'TX',
      'delivery.address.city': 'Houston',
      'delivery.address.street': { data: 'xxxxxxxxxxxxxx', width: 200 },
      'delivery.address.zip': '77001',
    },
  ]

  let i = 1

  const getData = async () => {
    return new Promise<DataType[]>((resolve) => {
      setTimeout(() => {
        if (i === 1) {
          resolve(d)
          i++
          return
        }

        const newD = [
          {
            id: i,
            'delivery.name': 'John',
          },
        ]

        resolve(newD)
      }, 1000)
    })
  }

  const [data, { refetch }] = createResource(getData, { initialValue: [] })

  let ref!: HTMLDivElement

  return (
    <div>
      <Table data={data()}>
        <TableHead ref={ref}>
          {(data) => (
            <th colspan={data.colspan} rowspan={data.rowspan} class='b'>
              {data.key}
            </th>
          )}
        </TableHead>
        <ScrollbarCore height='200px'>
          <ScrollbarCore.Content
            onScroll={(e) => {
              // 同步滚动
              if (!ref) return
              ref.scrollLeft = e.currentTarget.scrollLeft
            }}
          >
            <TableBody>
              {(row) => (
                <ContextMenuCore>
                  <ContextMenuCore.Trigger as='tr' class='hover:bg-amber'>
                    <For each={Object.keys(row)}>
                      {(key) => <td class='p-2 text-center'>{row[key]}</td>}
                    </For>
                  </ContextMenuCore.Trigger>
                  <ContextMenuCore.Content>
                    <div class='p-2 w-100px h-200px bg-blue flex items-center justify-center'>
                      Content
                    </div>
                  </ContextMenuCore.Content>
                </ContextMenuCore>
              )}
            </TableBody>
          </ScrollbarCore.Content>
          <ScrollbarCore.Bar
            type='vertical'
            class='absolute bottom-[2px] top-[2px] right-[2px] bg-gray-2 w-8px transition'
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
      </Table>
      <div>
        <button
          type='button'
          onClick={() => {
            refetch()
          }}
        >
          Add Row
        </button>
      </div>
    </div>
  )
}
