export function flattenValues(items) {
  return items.map((item) => {
    let merged = ""
    for (const key in item) {
      merged += item[key].toLowerCase()
    }
    return merged
  })
}
