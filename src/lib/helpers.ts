import { Game } from "src/types/games"

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
