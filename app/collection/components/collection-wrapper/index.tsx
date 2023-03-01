"use client"

import { ChangeEventHandler, MouseEventHandler } from "react"
import propTypes from "prop-types"
import { Platform } from "app/types/games"
import { CollectionList } from "../collection-list"
import { FilterOptions } from "app/components/filter-list"
import { Search } from "app/components/search"
import { useFilter, useSearch } from "utils/search-helpers"

type CollectionWrapperProps = {
  games: Platform[]
  queryData: Array<string[]>
}

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
      <Search
        label="Filter games"
        placeholder="Mega Man"
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
