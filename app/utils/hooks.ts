import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { debounce } from "lodash-es"
import xss from "xss"

import { DatabasePlatform, DatabaseGame, FilterItem } from "types/games"

type FilterCallback = () => DatabasePlatform[]

export function useSearch(searchQuery: string) {
  const [searchValue, setSearchValue] = useState<string>(searchQuery)

  return { defaultSearchValue: searchQuery, searchValue, setSearchValue }
}

export function useFilter({
  defaultSearchValue,
  platformQuery,
  games,
  queryData,
}: {
  defaultSearchValue: string
  platformQuery: string[]
  games: DatabasePlatform[]
  queryData: Array<string[]>
}) {
  const [filterValue, setFilterValue] = useState<string>(defaultSearchValue)
  const setDebouncedFilterValue = useMemo(
    () => debounce(setFilterValue, 300),
    []
  )

  const [filteredPlatforms, setFilteredPlatforms] = useState<FilterItem[]>(
    games.map((p) => ({
      value: p.platform,
      selected: platformQuery.indexOf(p.platform.toLowerCase()) > -1,
    }))
  )
  const allSelected: boolean = filteredPlatforms.every((p) => p.selected)
  const noneSelected: boolean = filteredPlatforms.every((p) => !p.selected)
  const selectedPlatforms: string[] = filteredPlatforms.reduce<string[]>(
    (acc, p: FilterItem) => {
      if (p.selected) {
        acc.push(p.value)
        return acc
      }
      return acc
    },
    []
  )

  // Reduce the games in the list based on:
  // 1. Search query
  // 2. Selected platforms
  const filterGames = useCallback<FilterCallback>(() => {
    const query = filterValue.toLowerCase()
    if (!filterValue && allSelected) return games

    return queryData.reduce<DatabasePlatform[]>(
      (acc, queryableGames: string[], idx) => {
        const gameList: DatabaseGame[] = games[idx].games
        const filteredEntry: DatabasePlatform = {
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
      },
      []
    )
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
