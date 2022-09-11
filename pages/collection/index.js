import { useState, useMemo, useEffect } from "react"
import { debounce } from "lodash-es"
import Types from "prop-types"
import gamesData from "public/games/graded-games.json"
import { flattenValues } from "lib/flatten-values"
import { PageHeading, Layout } from "components/global"
import {
  CollectionList,
  CollectionPlatformPills,
  Search,
} from "components/collection"

export default function Collection({ games, queryData }) {
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [filterPlatforms, setFilterPlatforms] = useState(
    games.map((p) => ({ value: p.platform, selected: true }))
  )
  const debouncedFilterValue = useMemo(() => debounce(setFilterValue, 200), [])
  const allSelected = filterPlatforms.every((p) => p.selected)
  const noneSelected = filterPlatforms.every((p) => !p.selected)

  useEffect(() => {
    debouncedFilterValue(searchValue)
  }, [debouncedFilterValue, searchValue])

  function handleChange(e) {
    setSearchValue(e.target.value)
  }

  function handlePillSelect(e) {
    const platform = e.target.dataset.platform
    setFilterPlatforms(
      filterPlatforms.map((p) =>
        p.value === platform ? { ...p, selected: !p.selected } : p
      )
    )
  }

  function handlePillReset() {
    if (noneSelected) return
    const filteredPlatforms = filterPlatforms.map((p) => ({
      ...p,
      selected: false,
    }))
    setFilterPlatforms(filteredPlatforms)
  }

  function handlePillSelectAll() {
    if (allSelected) return
    setFilterPlatforms(
      filterPlatforms.map((p) => ({
        ...p,
        selected: true,
      }))
    )
  }

  // Reduce the games in the list based on:
  // 1. Search query
  // 2. Selected platforms
  function filterGames() {
    const query = filterValue.toLowerCase()
    if (!filterValue && allSelected) return games

    return queryData.reduce((acc, p, idx) => {
      const gameList = games[idx].games
      const filteredEntry = { ...games[idx], games: [] }

      filteredEntry.selected = filterPlatforms[idx].selected

      if (query) {
        p.games.forEach((game, gameIdx) => {
          if (game.includes(query)) {
            filteredEntry.games.push(gameList[gameIdx])
          }
        })
      } else {
        filteredEntry.games.push(...p.games)
      }

      acc.push(filteredEntry)
      return acc
    }, [])
  }

  function renderCollectionLists(p) {
    if (!p.selected) return

    return (
      <CollectionList
        key={p.platform}
        games={p.games}
        label={p.platform}
        id={p.platform.split(" ").join("-")}
      />
    )
  }

  function renderPlatformPills() {
    return (
      <CollectionPlatformPills
        items={filterPlatforms}
        handleSelect={handlePillSelect}
        handleReset={handlePillReset}
        handleSelectAll={handlePillSelectAll}
      />
    )
  }

  const filteredGames = filterGames()
  return (
    <Layout>
      <PageHeading heading="Collection" subheading="Just some games." />
      <Search value={searchValue} handleChange={handleChange} />
      {renderPlatformPills()}
      {filteredGames.map(renderCollectionLists)}
    </Layout>
  )
}

Collection.propTypes = {
  games: Types.arrayOf(Types.object).isRequired,
  queryData: Types.arrayOf(Types.object).isRequired,
}

export function getStaticProps() {
  const games = gamesData.platforms.map((p) => {
    return {
      platform: p.platform,
      selected: true,
      games: p.games.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      }),
    }
  })

  const queryData = gamesData.platforms.map((p) => {
    return {
      platform: p.platform,
      games: flattenValues(p.games),
    }
  })

  return { props: { games, queryData } }
}
