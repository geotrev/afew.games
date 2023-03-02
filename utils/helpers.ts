import { Game, DatabaseGame, PlatformRecord } from "app/types/games"
import { isPlainObject, isString, pickBy } from "lodash-es"

export function sortByKey(key: string) {
  return (a: any, b: any): 0 | 1 | -1 => {
    const aName: string = a[key as keyof typeof a].toLowerCase()
    const bName: string = b[key as keyof typeof b].toLowerCase()
    return aName > bName ? 1 : aName < bName ? -1 : 0
  }
}

/**
 * Recursively traverse an array of objects, returning an array strings equivalent
 * to each objects values (only string values are counted).
 */
export function flattenObjectValues(items: Game[] | DatabaseGame[]): string[] {
  return items.map((item: Game | DatabaseGame) =>
    Object.values(item).reduce((acc: string, val: string) => {
      if (typeof val === "string") {
        // concat the string
        return acc.concat(val.toLowerCase())
      } else if (Array.isArray(val)) {
        // iterate over and flatten each object's values, then concat
        return acc.concat(...flattenObjectValues(val))
      } else if (isPlainObject(val)) {
        // only concat string values from the object
        return acc.concat(...Object.values(pickBy(val, isString)))
      }

      return acc
    }, "")
  )
}

export function setSearchParams(paramsObject: Record<string, any>) {
  if (Object.keys(paramsObject).length === 0) return

  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  for (const key in paramsObject) {
    if (paramsObject[key] === null) {
      params.delete(key)
      continue
    }
    params.set(key, String(paramsObject[key]))
  }
  url.search = params.toString()
  window.history.pushState({}, "", url.toString())
}

export function transformGameProps(database: { platforms: PlatformRecord[] }) {
  const games: PlatformRecord[] = database.platforms
    .sort(sortByKey("platform"))
    .map((p) => ({
      platform: p.platform,
      games: p.games.sort(sortByKey("name")),
    }))

  let count = 0
  const queryData: string[][] = games.map((p) => {
    count += p.games.length
    return flattenObjectValues(p.games)
  })

  return { games, queryData, count }
}
