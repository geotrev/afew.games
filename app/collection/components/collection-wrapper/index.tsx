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
import { Game, Platform, PlatformFilter } from "app/types/games"
import { CollectionList } from "../collection-list"
import { CollectionFilter } from "../collection-filter"
import { CollectionSearch } from "../collection-search"

type CollectionWrapperProps = {
  games: Platform[]
  queryData: Array<string[]>
}

type FilterCallback = () => Platform[]

CollectionWrapper.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      platform: propTypes.string,
      games: propTypes.arrayOf(
        propTypes.shape({
          name: propTypes.string,
          variant: propTypes.string,
          grade: propTypes.string,
          grader: propTypes.oneOf(["Wata", "VGA", "CGC", "P1G"]),
        })
      ),
    })
  ).isRequired,
  queryData: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
}

export function CollectionWrapper({
  games,
  queryData,
}: CollectionWrapperProps) {
  const [searchValue, setSearchValue] = useState<string>("")
  const [filterValue, setFilterValue] = useState<string>("")
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
      const gameList: Game[] = games[idx].games
      const filteredEntry: Platform = { ...games[idx], games: [] }
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
    }, [] as Platform[])
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

  function renderCollectionLists(p: Platform) {
    return (
      <CollectionList
        key={p.platform}
        games={p.games}
        label={p.platform}
        id={p.platform.split(" ").join("-")}
      />
    )
  }

  return (
    <>
      <CollectionSearch value={searchValue} handleChange={handleChange} />
      <CollectionFilter
        items={filterPlatforms}
        handleClick={handlePillClick}
        handleReset={handlePillResetClick}
      />
      {gameCount === 0 ? (
        <p>No matches found, sorry.</p>
      ) : (
        filteredGames.map(renderCollectionLists)
      )}
    </>
  )
}
