"use client"

import propTypes from "prop-types"

import { FilterOptions } from "../filter-options"
import { Search } from "../search"
import { useFilter, useSearch } from "../../utils/hooks"
import { DatabasePlatform } from "types/games"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { GameList } from "./GameList"
import { useSearchParams } from "next/navigation"
import xss from "xss"

type DatabaseWrapperProps = {
  games: DatabasePlatform[]
  queryData: Array<string[]>
}

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
              country: propTypes.string,
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

  const searchQuery = xss(searchParams.get("search") || "")
  const platformParam = searchParams.getAll("platform")
  const platformQuery = Array.isArray(platformParam)
    ? platformParam.map((p) => xss(p).toLowerCase())
    : platformParam
      ? [xss(platformParam).toLowerCase()]
      : []

  const { defaultSearchValue, searchValue, setSearchValue } =
    useSearch(searchQuery)
  const {
    setDebouncedFilterValue,
    setFilteredPlatforms,
    filteredPlatforms,
    noneSelected,
    filteredGames,
    gameCount,
  } = useFilter({
    defaultSearchValue,
    platformQuery,
    games,
    queryData,
  })
  const [count, setCount] = useState<number | null>(10)
  const [selectedCount, setSelectedCount] = useState<string>(String(count))

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value)
    setDebouncedFilterValue(event.target.value)
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
        placeholder="Mario Kart"
        value={searchValue}
        handleChange={handleChange}
      />
      <FilterOptions
        searchValue={searchValue}
        filteredPlatforms={filteredPlatforms}
        items={filteredPlatforms}
        handleClick={handlePillClick}
        handleReset={handlePillResetClick}
      />

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

      {gameCount === 0 ? (
        <p>No matches found, sorry.</p>
      ) : (
        <GameList count={count} games={filteredGames} />
      )}

      {typeof count === "number" &&
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
