import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { debounce } from "lodash-es"
import xss from "xss"

import {
  PlatformRecord,
  DatabasePlatform,
  GameRecord,
  Platform,
  FilterItem,
} from "types/games"

type FilterCallback = () => (Platform | DatabasePlatform)[]

export function useSearch() {
  const searchParams = useSearchParams()
  const rawSearchParam = searchParams.get("search")
  const defaultSearchValue =
    typeof rawSearchParam === "string" ? xss(rawSearchParam) : ""
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue)

  return { defaultSearchValue, searchValue, setSearchValue }
}

export function useFilter({
  games,
  queryData,
  defaultSearchValue,
}: {
  games: Platform[]
  queryData: Array<string[]>
  defaultSearchValue: string
}) {
  const [filterValue, setFilterValue] = useState<string>(defaultSearchValue)
  const setDebouncedFilterValue = useMemo(
    () => debounce(setFilterValue, 300),
    []
  )

  const [filteredPlatforms, setFilteredPlatforms] = useState<FilterItem[]>(
    games.map((p) => ({ value: p.platform, selected: false }))
  )
  const allSelected: boolean = filteredPlatforms.every((p) => p.selected)
  const noneSelected: boolean = filteredPlatforms.every((p) => !p.selected)
  const selectedPlatforms: string[] = filteredPlatforms.reduce(
    (acc, p: FilterItem) => {
      if (p.selected) {
        acc.push(p.value)
        return acc
      }
      return acc
    },
    [] as string[]
  )

  // Reduce the games in the list based on:
  // 1. Search query
  // 2. Selected platforms
  const filterGames = useCallback<FilterCallback>(() => {
    const query = filterValue.toLowerCase()
    if (!filterValue && allSelected) return games

    return queryData.reduce((acc, queryableGames: string[], idx) => {
      const gameList: GameRecord[] = games[idx].games
      const filteredEntry: PlatformRecord = {
        ...games[idx],
        games: [],
      }
      let shouldQuery: boolean = true

      if (
        !noneSelected &&
        !allSelected &&
        selectedPlatforms.indexOf(games[idx].platform) === -1
      ) {
        shouldQuery = false
      }

      if (shouldQuery) {
        if (query) {
          queryableGames.forEach((q, gameIdx) => {
            if (!q.includes(query)) return
            filteredEntry.games.push(gameList[gameIdx])
          })
        } else {
          filteredEntry.games.push(...gameList)
        }
      }

      acc.push(filteredEntry)
      return acc
    }, [] as PlatformRecord[])
  }, [
    allSelected,
    noneSelected,
    filterValue,
    games,
    queryData,
    selectedPlatforms,
  ])

  const filteredGames = filterGames()

  let gameCount = 0
  filteredGames.forEach((p) => (gameCount += p.games.length))

  return {
    setDebouncedFilterValue,
    setFilteredPlatforms,
    filteredPlatforms,
    noneSelected,
    filteredGames,
    gameCount,
  }
}
