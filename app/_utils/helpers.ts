import { isPlainObject, isString, pickBy } from "lodash-es"
import { DatabaseGame, DatabasePlatform, FilterItem } from "@/app/types"

export function getNextUrlState({
  searchValue,
  filteredPlatforms,
}: {
  searchValue: string
  filteredPlatforms: FilterItem[]
}): URL {
  const platformValues = filteredPlatforms
    .filter((item) => item.selected)
    .map((item) => item.value)

  const url = new URL(window.location.origin)

  if (searchValue) {
    url.searchParams.set("search", searchValue)
  } else if (url.searchParams.has("search")) {
    url.searchParams.delete("search")
  }

  if (platformValues.length > 0) {
    platformValues.forEach((p) => url.searchParams.append("platform", p))
  } else if (url.searchParams.has("platform")) {
    url.searchParams.delete("platform")
  }

  return url
}

export function sortByKey(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function pageView(path_url: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window?.gtag?.("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    path_url,
  })
}
