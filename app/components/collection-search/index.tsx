"use client"

import { ChangeEventHandler, MouseEventHandler } from "react"
import { FilterOptions } from "app/components/filter-list"
import { Search } from "app/components/search"
import { PlatformRecord } from "app/types/games"
import { useFilter, useSearch } from "./hooks"
import { CollectionSearchProps } from "./types"

export function CollectionSearch({
  label,
  placeholder,
  listComponent: ListComponent,
  games,
  queryData,
}: CollectionSearchProps) {
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
      <ListComponent
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
        label={label}
        placeholder={placeholder}
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
