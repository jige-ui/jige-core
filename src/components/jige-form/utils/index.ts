export function getValueFromPath(obj: Record<string, any>, path: string) {
  const keys = path.split('.')
  // consider undefined
  let result = obj
  for (const key of keys) {
    if (result === undefined) {
      return undefined
    }
    result = result[key]
  }
  return result as any
}
