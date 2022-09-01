export function flattenValues(items) {
  return items.map((item) =>
    Object.values(item).reduce((acc, val) => acc.concat(val.toLowerCase()), "")
  )
}
