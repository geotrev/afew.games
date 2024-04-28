"use client"

import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useSearchParams } from "next/navigation"
import xss from "xss"
import { debounce } from "lodash-es"
import { useFilter, useFetchGames } from "../../utils/hooks"
import { getNextUrlState } from "../../utils/set-params"
import { Search } from "./Search"
import { FilterOptions } from "./FilterOptions"
import { GameList } from "./GameList"
import { StateMessages } from "./StateMessages"
import { CountDropdown } from "./CountDropdown"
import { LoadMoreButton } from "./LoadMorebutton"

interface DatabaseWrapperProps {
  platformList: string[]
}

export function DatabaseWrapper({ platformList }: DatabaseWrapperProps) {
  /**
   * Check params
   */
  const searchParams = useSearchParams()
  const searchQuery = xss(searchParams.get("search") || "")
  const platformParam = searchParams.getAll("platform")
  const platformQuery = Array.isArray(platformParam)
    ? platformParam.map((p) => xss(p).toLowerCase())
    : platformParam
      ? [xss(platformParam).toLowerCase()]
      : []

  /**
   * Initialize search value with search param
   */
  const [searchValue, setSearchValue] = useState<string>(searchQuery)

  /**
   * Initialize games from a specialized fetch hook.
   */
  const { query, games, noMatches, isLoading, isError } =
    useFetchGames(searchValue)

  const totalGameCount = useMemo(
    () => games.reduce((count, p) => (count += p.games.length), 0),
    [games]
  )

  /**
   * Initialize platform filter hook to narrow down search options
   */
  const { setFilteredPlatforms, filteredPlatforms, noneSelected } = useFilter({
    platformQuery,
    platformList,
  })

  /**
   * Maximum number of games to show on page
   */
  const [filterValue, setFilterValue] = useState<number | null>(10)

  /**
   * Active value in the <select> element, not correlated to the list
   * or items displayed.
   */
  const [selectedCount, setSelectedCount] = useState<string>(
    String(filterValue)
  )

  /**
   * Given a search result (`games`) and selected platforms (`filteredPlatforms`),
   * count the number of games that _could_ be displayed. If no platforms selected,
   * return the `totalGameCount`.
   */
  const filteredGameCount = useMemo(
    () =>
      noneSelected
        ? totalGameCount
        : filteredPlatforms.reduce((count, platform) => {
            if (!platform.selected) return count

            const entryCount = games.find(
              (entry) => entry.platform === platform.value
            )?.games.length

            return typeof entryCount === "number" && entryCount > 0
              ? count + entryCount
              : count
          }, 0),
    [filteredPlatforms, games, noneSelected, totalGameCount]
  )

  const setDebouncedURLState = useMemo(
    () => debounce((url) => window.history.pushState({}, "", url), 300),
    []
  )

  /**
   * When the search value or platform selection changes, reflect to params
   */
  useEffect(() => {
    const url = getNextUrlState({ filteredPlatforms, searchValue })
    setDebouncedURLState(url)
  }, [filteredPlatforms, searchValue, setDebouncedURLState])

  /**
   * When search value or selected platforms change, reset filter value
   */
  useEffect(() => {
    const value = parseInt(selectedCount)
    setFilterValue(typeof value === "number" ? value : null)
  }, [filteredPlatforms, searchValue, selectedCount])

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    query(searchValue)
  }

  const handlePillClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const platform = (event.target as HTMLButtonElement).dataset.itemValue
    setFilteredPlatforms(
      filteredPlatforms.map((p) =>
        p.value === platform ? { ...p, selected: !p.selected } : p
      )
    )
  }

  const handlePillResetClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (noneSelected) return

    setFilteredPlatforms(
      filteredPlatforms.map((p) => ({
        ...p,
        selected: false,
      }))
    )
  }

  const handleCountSelect: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setSelectedCount(value)

    const rawValue = parseInt(value, 10)

    if (value === "all") {
      setFilterValue(null)
    } else {
      setFilterValue(rawValue)
    }
  }

  return (
    <>
      <Search
        label="Search for games"
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
        value={searchValue}
      />
      <StateMessages
        isLoading={isLoading}
        isError={isError}
        noMatches={noMatches}
        totalGameCount={totalGameCount}
      />
      <FilterOptions
        totalGameCount={totalGameCount}
        isLoading={isLoading}
        searchValue={searchValue}
        filteredPlatforms={filteredPlatforms}
        handleClick={handlePillClick}
        handleReset={handlePillResetClick}
      />
      <CountDropdown
        totalGameCount={totalGameCount}
        isLoading={isLoading}
        selectedCount={selectedCount}
        handleCountSelect={handleCountSelect}
      />
      <GameList
        totalGameCount={totalGameCount}
        isLoading={isLoading}
        entries={games}
        filteredPlatforms={filteredPlatforms}
        filterValue={filterValue}
        arePlatformsFiltered={!noneSelected}
      />
      <LoadMoreButton
        isLoading={isLoading}
        filterValue={filterValue}
        selectedCount={selectedCount}
        filteredGameCount={filteredGameCount}
        setFilterValue={setFilterValue}
      />
    </>
  )
}
