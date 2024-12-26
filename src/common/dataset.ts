export function dataSets(prefix: string, dataSet: { [key: string]: string | boolean }) {
  return Object.entries(dataSet).reduce((acc, [key, value]) => {
    const attrName = `data-${prefix}-${key}`
    if (typeof value === 'boolean') {
      return value ? { ...acc, [attrName]: '' } : acc
    }
    return { ...acc, [attrName]: value }
  }, {})
}
