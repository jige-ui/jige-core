export type SimpleData = string | number | boolean | null | undefined

// 定义数据的类型
export interface DataType {
  [key: string]: SimpleData | { data: SimpleData, width: number }
}

export interface HeaderType {
  colspan: number
  rowspan: number
  data: string
}

export function normalizeData(data: DataType[]): [Record<string, SimpleData>[], Record<string, number>, string[]] {
  const result: Record<string, SimpleData>[] = []
  const colConfigs: Record<string, number> = {}
  const safeList: string[] = []

  if (data.length === 0)
    return [result, colConfigs, safeList]

  const firstItem = data[0]
  for (const key in firstItem) {
    if (typeof firstItem[key] === 'object') {
      if (firstItem[key]!.width) {
        colConfigs[key] = firstItem[key]!.width
        safeList.push(key)
      }
    }
  }

  for (const item of data) {
    const row: Record<string, SimpleData> = {}
    for (const key in item) {
      if (typeof item[key] === 'object') {
        row[key] = item[key]!.data
      }
      else {
        row[key] = item[key] as SimpleData
      }
    }
    result.push(row)
  }
  return [result, colConfigs, safeList]
}
