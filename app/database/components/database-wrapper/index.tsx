"use client"

import propTypes from "prop-types"

import { FilterOptions } from "../filter-options"
import { DatabaseList } from "../database-list"
import { Search } from "../search"
import { useFilter, useSearch } from "../../utils/hooks"
import { DatabasePlatform, PlatformRecord } from "types/games"
import { ChangeEventHandler, MouseEventHandler } from "react"

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
  const { defaultSearchValue, searchValue, setSearchValue } = useSearch()
  const {
    setDebouncedFilterValue,
    setFilteredPlatforms,
    filteredPlatforms,
    noneSelected,
    filteredGames,
    gameCount,
  } = useFilter({
    defaultSearchValue,
    games,
    queryData,
  })

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

  function renderCollectionLists(p: PlatformRecord) {
    return (
      <DatabaseList
        key={p.platform}
        games={p.games}
        label={p.platform}
        id={p.platform.split(" ").join("-")}
      />
    )
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
        items={filteredPlatforms}
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
