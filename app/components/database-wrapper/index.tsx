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
import { FilterOptions } from "../filter-options"
import { Search } from "../search"
import { useFilter, useFetchGames } from "../../utils/hooks"
import { getNextUrlState } from "../../utils/set-params"
import { GameList } from "./GameList"

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

  const gameCount = useMemo(
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
  const [count, setCount] = useState<number | null>(10)
  const [selectedCount, setSelectedCount] = useState<string>(String(count))

  const setDebouncedURLState = useMemo(
    () => debounce((url) => window.history.pushState({}, "", url), 300),
    []
  )

  useEffect(() => {
    const url = getNextUrlState({ filteredPlatforms, searchValue })
    setDebouncedURLState(url)
  }, [filteredPlatforms, searchValue, setDebouncedURLState])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setSelectedCount(value)

    const rawValue = parseInt(value, 10)

    if (value === "all") {
      setCount(null)
    } else {
      setCount(rawValue)
    }
  }

  return (
    <>
      <Search
        label="Search variants"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={searchValue}
      />

      {isLoading && (
        <p className="align-center flex">
          <span className="loading" aria-hidden="true" />{" "}
          <span className="ps-2">Fetching games...</span>
        </p>
      )}

      {isError && (
        <p className="text-red-500">
          Uh-oh, check your search value and try again.
        </p>
      )}

      {noMatches && <p>No matches found, sorry.</p>}

      {gameCount > 0 && !isLoading && (
        <FilterOptions
          searchValue={searchValue}
          filteredPlatforms={filteredPlatforms}
          handleClick={handlePillClick}
          handleReset={handlePillResetClick}
        />
      )}

      {gameCount > 0 && !isLoading && (
        <div className="flex justify-end">
          <label className="label pe-4">Games shown</label>
          <select
            value={selectedCount}
            name="quantity"
            onChange={handleSelectChange}
            className="select select-bordered"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </div>
      )}

      {gameCount > 0 && !isLoading && (
        <GameList
          entries={games}
          filteredPlatforms={filteredPlatforms}
          filterCount={count}
          arePlatformsFiltered={!noneSelected}
        />
      )}

      {!isLoading &&
        typeof count === "number" &&
        selectedCount !== "all" &&
        count < gameCount && (
          <div className="flex justify-center">
            <button
              type="button"
              className="btn btn-outline btn-secondary btn-xs !h-auto !min-h-0 rounded-md py-3 md:btn-md"
              onClick={() => setCount(count + parseInt(selectedCount, 10))}
            >
              Load more
            </button>
          </div>
        )}
    </>
  )
}
