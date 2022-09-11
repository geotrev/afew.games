export function sortByKey(key) {
  return (a, b) => {
    const aName = a[key].toLowerCase()
    const bName = b[key].toLowerCase()
    return aName > bName ? 1 : aName < bName ? -1 : 0
  }
}

export function flattenObjectValues(items) {
  return items.map((item) =>
    Object.values(item).reduce((acc, val) => acc.concat(val.toLowerCase()), "")
  )
}
