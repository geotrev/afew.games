"use client"

import {
  useState,
  useMemo,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from "react"
import { debounce } from "lodash-es"
import propTypes from "prop-types"
import { DatabaseGame, DatabasePlatform, PlatformFilter } from "app/types/games"
// import { DatabasePlatformList } from "../database-platform-list"
import { FilterOptions } from "app/components/filter-list"
import { Search } from "app/components/search"
import { useSearchParams } from "next/navigation"
import xss from "xss"

type DatabaseWrapperProps = {
  games: DatabasePlatform[]
  queryData: Array<string[]>
}

type FilterCallback = () => DatabasePlatform[]

DatabaseWrapper.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      platform: propTypes.string,
      games: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string,
          variants: propTypes.arrayOf(
            propTypes.shape({
              part_code: propTypes.string,
              satellite_code: propTypes.string,
              manufactured: propTypes.string,
              mpn: propTypes.string,
              notes: propTypes.string,
            })
          ),
        })
      ),
    })
  ).isRequired,
  queryData: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
}

export function DatabaseWrapper({ games, queryData }: DatabaseWrapperProps) {
  const searchParams = useSearchParams()
  const rawSearchParam = searchParams.get("search")
  const defaultSearchValue =
    typeof rawSearchParam === "string" ? xss(rawSearchParam) : ""
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue)
  const [filterValue, setFilterValue] = useState<string>(defaultSearchValue)
  const [filterPlatforms, setFilterPlatforms] = useState<PlatformFilter[]>(
    games.map((p) => ({ value: p.platform, selected: false }))
  )

  const debouncedFilterValue = useMemo(() => debounce(setFilterValue, 300), [])
  const allSelected: boolean = filterPlatforms.every((p) => p.selected)
  const noneSelected: boolean = filterPlatforms.every((p) => !p.selected)
  const selectedPlatforms: string[] = filterPlatforms.reduce(
    (acc, p: PlatformFilter) => {
      if (p.selected) {
        acc.push(p.value)
        return acc
      }
      return acc
    },
    [] as string[]
  )
  let gameCount = 0

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setSearchValue(event.target.value)
      debouncedFilterValue(event.target.value)
    },
    [debouncedFilterValue]
  )

  const handlePillClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const platform = (event.target as HTMLButtonElement).dataset.itemValue
      setFilterPlatforms(
        filterPlatforms.map((p) =>
          p.value === platform ? { ...p, selected: !p.selected } : p
        )
      )
    },
    [filterPlatforms]
  )

  const handlePillResetClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (noneSelected) return
    const FilterPlatforms = filterPlatforms.map((p) => ({
      ...p,
      selected: false,
    }))
    setFilterPlatforms(FilterPlatforms)
  }, [filterPlatforms, noneSelected])

  // Reduce the games in the list based on:
  // 1. Search query
  // 2. Selected platforms
  const filterGames = useCallback<FilterCallback>(() => {
    const query = filterValue.toLowerCase()
    if (!filterValue && allSelected) return games

    return queryData.reduce((acc, queryableGames: string[], idx) => {
      const gameList: DatabaseGame[] = games[idx].games
      const filteredEntry: DatabasePlatform = { ...games[idx], games: [] }
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
    }, [] as DatabasePlatform[])
  }, [
    allSelected,
    noneSelected,
    filterValue,
    games,
    queryData,
    selectedPlatforms,
  ])

  const filteredGames = filterGames()
  filteredGames.forEach((p) => (gameCount += p.games.length))

  // function renderCollectionLists(p: DatabasePlatform) {
  //   return (
  //     <DatabasePlatformList
  //       key={p.platform}
  //       games={p.games}
  //       label={p.platform}
  //       id={p.platform.split(" ").join("-")}
  //     />
  //   )
  // }

  return (
    <>
      <Search value={searchValue} handleChange={handleChange} />
      <FilterOptions
        items={filterPlatforms}
        handleClick={handlePillClick}
        handleReset={handlePillResetClick}
      />
      {gameCount === 0 ? (
        <p>No matches found, sorry.</p>
      ) : (
        <pre>{JSON.stringify(filteredGames, null, 2)}</pre>
        // .map(renderCollectionLists)
      )}
    </>
  )
}
