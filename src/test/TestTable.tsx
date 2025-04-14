import { ScrollbarCore, TableCore } from '@/build'
import { random, uid } from 'radash'
import { For, createResource } from 'solid-js'

export default function TestTable() {
  const generateData = () => {
    const data: {
      name: string
      age: number
      sex: string
      address: string
      'info.phone': string
      'info.email': string
    }[] = []
    for (let i = 0; i < 100; i++) {
      data.push({
        name: `${uid(7)}`,
        age: random(1, 100),
        sex: random(0, 1) === 0 ? '男' : '女',
        address: `${uid(10)}`,
        'info.phone': `${random(13000000000, 19999999999)}`,
        'info.email': `${uid(7)}@gmail.com`,
      })
    }
    return new Promise<typeof data>((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  const [data, { refetch }] = createResource(generateData, { initialValue: [] })

  let ref!: HTMLDivElement

  return (
    <div>
      <TableCore>
        <div
          ref={ref}
          style={{
            overflow: 'hidden',
          }}
        >
          <TableCore.Header class='bg-gray-2 b b-b-cyan'>
            <TableCore.Row>
              <TableCore.Column rowSpan={2}>名字</TableCore.Column>
              <TableCore.Column rowSpan={2}>年龄</TableCore.Column>
              <TableCore.Column rowSpan={2}>性别</TableCore.Column>
              <TableCore.Column rowSpan={2}>地址</TableCore.Column>
              <TableCore.Column rowSpan={1} colSpan={2}>
                信息
              </TableCore.Column>
            </TableCore.Row>
            <TableCore.Row>
              <TableCore.Column width={125}>电话</TableCore.Column>
              <TableCore.Column width={200}>邮箱</TableCore.Column>
            </TableCore.Row>
          </TableCore.Header>
        </div>

        <ScrollbarCore height='400px'>
          <ScrollbarCore.ScrollArea
            onScroll={(e) => {
              ref.scrollLeft = e.currentTarget.scrollLeft
            }}
          >
            <ScrollbarCore.Content>
              <TableCore.Body>
                <For each={data()}>
                  {(item) => (
                    <TableCore.Row>
                      <TableCore.Cell class='p-1'>{item.name}</TableCore.Cell>
                      <TableCore.Cell class='p-1'>{item.age}</TableCore.Cell>
                      <TableCore.Cell class='p-1'>{item.sex}</TableCore.Cell>
                      <TableCore.Cell class='p-1'>{item.address}</TableCore.Cell>
                      <TableCore.Cell class='p-1'>{item['info.phone']}</TableCore.Cell>
                      <TableCore.Cell class='p-1'>{item['info.email']}</TableCore.Cell>
                    </TableCore.Row>
                  )}
                </For>
              </TableCore.Body>
            </ScrollbarCore.Content>
          </ScrollbarCore.ScrollArea>
          <ScrollbarCore.Bar
            type='vertical'
            class='absolute bottom-[2px] top-[2px] right-[2px] bg-gray-2 w-8px'
          >
            <ScrollbarCore.Thumb type='vertical' class='bg-amber' />
          </ScrollbarCore.Bar>
          <ScrollbarCore.Bar
            type='horizontal'
            class='absolute left-[2px] bottom-[2px] right-[10px] bg-gray-2 h-8px'
          >
            <ScrollbarCore.Thumb type='horizontal' class='bg-amber' />
          </ScrollbarCore.Bar>
        </ScrollbarCore>
      </TableCore>
      <div>
        <button onClick={() => refetch()} type='button'>
          refetch
        </button>
      </div>
    </div>
  )
}
