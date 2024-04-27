import { DatabaseList } from "../database-list"
import { DatabasePlatform, FilterItem } from "types/games"

function getFilteredEntries(
  entries: DatabasePlatform[],
  filteredPlatforms: FilterItem[],
  filterCount: number,
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

  let inc = filterCount
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
  arePlatformsFiltered,
  filteredPlatforms,
  filterCount,
  entries,
}: {
  arePlatformsFiltered: boolean
  filteredPlatforms: FilterItem[]
  filterCount: number | null
  entries: DatabasePlatform[]
}) {
  const filteredEntries =
    filterCount === null
      ? entries
      : getFilteredEntries(
          entries,
          filteredPlatforms,
          filterCount,
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
