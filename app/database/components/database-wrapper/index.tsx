"use client"

import { ChangeEventHandler, MouseEventHandler } from "react"
import propTypes from "prop-types"
import { DatabasePlatform } from "app/types/games"
import { FilterOptions } from "app/components/filter-list"
import { Search } from "app/components/search"
import { useFilter, useSearch } from "utils/search-helpers"
// import { DatabasePlatformList } from "../database-platform-list"

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

  // function renderCollectionLists(p: DatabasePlatform) {
  //   return (
  //     <CollectionList
  //       key={p.platform}
  //       games={p.games}
  //       label={p.platform}
  //       id={p.platform.split(" ").join("-")}
  //     />
  //   )
  // }

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
        <pre>{JSON.stringify(filteredGames, null, 2)}</pre>
        // .map(renderCollectionLists)
      )}
    </>
  )
}
