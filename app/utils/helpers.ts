import { Game } from "app/types/games"

export function sortByKey(key: string) {
  return (a: any, b: any): 0 | 1 | -1 => {
    const aName: string = a[key as keyof typeof a].toLowerCase()
    const bName: string = b[key as keyof typeof b].toLowerCase()
    return aName > bName ? 1 : aName < bName ? -1 : 0
  }
}

export function flattenObjectValues(items: Game[]) {
  return items.map((item: Game) =>
    Object.values(item).reduce(
      (acc: string, val: string) => acc.concat(val.toLowerCase()),
      ""
    )
  )
}

export function setSearchParams(
  paramsObject: Record<string, any>,
  title?: any
): void {
  if (Object.keys(paramsObject).length === 0) return

  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  for (const key in paramsObject) {
    params.set(key, String(paramsObject[key]))
  }
  url.search = params.toString()
  window.history.pushState({}, "", url.toString())

  if (title) {
    document.title = title
  }
}
