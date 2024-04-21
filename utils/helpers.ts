import { DatabaseGame, DatabasePlatform } from "types/games"
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
export function flattenObjectValues(items: DatabaseGame[]): string[] {
  return items.map((item: DatabaseGame) =>
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

export function transformGameData(database: { platforms: DatabasePlatform[] }) {
  const games: DatabasePlatform[] = database.platforms
    .sort(sortByKey("platform"))
    .map((p) => ({
      platform: p.platform,
      games: p.games.sort(sortByKey("name")),
    }))

  const queryData: string[][] = games.map((p) => {
    return flattenObjectValues(p.games)
  })

  return { games, queryData }
}
