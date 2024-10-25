import { DatabasePlatform, FilterItem } from "@/app/types"
import { DatabaseList } from "./DatabaseList"

function getFilteredEntries(
  entries: DatabasePlatform[],
  filteredPlatforms: FilterItem[],
  filterValue: number,
  arePlatformsFiltered: boolean
): DatabasePlatform[] {
  let filteredEntries: DatabasePlatform[] = []

  if (arePlatformsFiltered) {
    const selectedPlatforms = filteredPlatforms.reduce<string[]>(
      (acc, p) => (p.selected ? [...acc, p.value] : acc),
      []
    )

    for (const entry of entries) {
      if (selectedPlatforms.includes(entry.platform)) {
        filteredEntries.push(entry)
      }
    }
  } else {
    filteredEntries = entries
  }

  let inc = filterValue
  const retVal: DatabasePlatform[] = []

  for (const p of filteredEntries) {
    if (inc <= 0) break

    if (p.games.length <= inc) {
      retVal.push(p)
      inc -= p.games.length
    } else {
      const pushedVal = p.games.slice(0, inc)
      retVal.push({
        platform: p.platform,
        games: pushedVal,
      })
      inc -= pushedVal.length
    }
  }

  return retVal
}

export function GameList({
  totalGameCount,
  isLoading,
  arePlatformsFiltered,
  filteredPlatforms,
  filterValue,
  entries,
}: {
  totalGameCount: number
  isLoading: boolean
  arePlatformsFiltered: boolean
  filteredPlatforms: FilterItem[]
  filterValue: number | null
  entries: DatabasePlatform[]
}) {
  if (totalGameCount <= 0 || isLoading) return null

  const filteredEntries =
    filterValue === null
      ? entries
      : getFilteredEntries(
          entries,
          filteredPlatforms,
          filterValue,
          arePlatformsFiltered
        )

  return filteredEntries?.map((p: DatabasePlatform) => (
    <DatabaseList
      key={p.platform}
      games={p.games}
      label={p.platform}
      id={p.platform.split(" ").join("-")}
    />
  ))
}
