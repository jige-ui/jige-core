import { mergeRefs } from '@solid-primitives/refs'
import { For } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import Colgroup from './Colgroup'
import { NormalTable } from './common'
import context from './context'
import type { DataType, HeaderType } from './types'

// calculate colspan by counting the same prefix near the current key
function countStartInArray(array: string[], value: string, fromIndex: number) {
  let count = 0
  for (let i = fromIndex; i < array.length; i++) {
    if (array[i].startsWith(`${value}.`)) {
      count++
    } else {
      break
    }
  }
  return count
}

// 解析数据的keys，生成嵌套表头结构
function parseKeys(data: DataType[]) {
  const headers: HeaderType[][] = []
  if (data.length === 0) return headers

  let rows = 0
  const keys = Object.keys(data[0])

  // 遍历第一遍keys，获取行数
  for (const key in data[0]) {
    const keys = key.split('.')
    rows = Math.max(rows, keys.length)
  }

  // range secend time to generate headers
  for (let i = 0; i < rows; i++) {
    headers.push([])
    let current = ''
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      const keySplit = key.split('.')
      if (keySplit.length > i) {
        if (keySplit[i] === current) {
          continue
        }
        const tmp: HeaderType = {
          colspan: countStartInArray(keys, [...keySplit].slice(0, i + 1).join('.'), j),
          rowspan: keySplit.length === i + 1 ? rows - i : 1,
          data: keySplit[i],
        }
        headers[i].push(tmp)
        current = keySplit[i]
      }
    }
  }

  return headers
}

export default function TableHead(props: {
  children: (header: HeaderType) => JSX.Element
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void)
}) {
  const [state, actions] = context.useContext()
  return (
    <div
      style={{
        overflow: 'hidden',
      }}
      ref={mergeRefs(props.ref, actions.setHeaderScrollRef)}
    >
      <NormalTable>
        <Colgroup type='header' />
        <thead>
          <For each={parseKeys(state.data)}>
            {(row) => (
              <tr>
                <For each={row}>{(col) => props.children(col)}</For>
              </tr>
            )}
          </For>
        </thead>
      </NormalTable>
    </div>
  )
}
