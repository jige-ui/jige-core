export function dataIf(value?: string | boolean | number) {
  if (typeof value === 'boolean') {
    return value ? '' : undefined
  }

  return value
}
