import { useState, useMemo, useCallback } from "react"
import { debounce } from "lodash-es"
import propTypes from "prop-types"
import gamesData from "public/games/collection.json"
import { flattenObjectValues, sortByKey } from "lib/helpers"
import { PageHeading, Layout } from "components/global"
import { CollectionList, CollectionFilter, Search } from "components/collection"

export default function Collection({ games, queryData }) {
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [filterPlatforms, setFilterPlatforms] = useState(
    games.map((p) => ({ value: p.platform, selected: false }))
  )
  const debouncedFilterValue = useMemo(() => debounce(setFilterValue, 300), [])
  const allSelected = filterPlatforms.every((p) => p.selected)
  const noneSelected = filterPlatforms.every((p) => !p.selected)
  const selectedPlatforms = filterPlatforms.reduce(
    (acc, p) => (p.selected ? [...acc, p.value] : acc),
    []
  )
  let gameCount = 0

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value)
      debouncedFilterValue(e.target.value)
    },
    [debouncedFilterValue]
  )

  const handlePillClick = useCallback(
    (e) => {
      const platform = e.target.dataset.itemValue
      setFilterPlatforms(
        filterPlatforms.map((p) =>
          p.value === platform ? { ...p, selected: !p.selected } : p
        )
      )
    },
    [filterPlatforms]
  )

  const handlePillReset = useCallback(() => {
    if (noneSelected) return
    const filteredPlatforms = filterPlatforms.map((p) => ({
      ...p,
      selected: false,
    }))
    setFilterPlatforms(filteredPlatforms)
  }, [filterPlatforms, noneSelected])

  // Reduce the games in the list based on:
  // 1. Search query
  // 2. Selected platforms
  const filterGames = useCallback(() => {
    const query = filterValue.toLowerCase()
    if (!filterValue && allSelected) return games

    return queryData.reduce((acc, queryGames, idx) => {
      const gameList = games[idx].games
      const filteredEntry = { ...games[idx], games: [] }
      let shouldQuery = true

      if (
        !noneSelected &&
        !allSelected &&
        selectedPlatforms.indexOf(games[idx].platform) === -1
      ) {
        shouldQuery = false
      }

      if (shouldQuery) {
        if (query) {
          queryGames.forEach((q, gameIdx) => {
            if (!q.includes(query)) return
            filteredEntry.games.push(gameList[gameIdx])
          })
        } else {
          filteredEntry.games.push(...gameList)
        }
      }

      acc.push(filteredEntry)
      return acc
    }, [])
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

  function renderCollectionLists(p) {
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
      <CollectionFilter
        items={filterPlatforms}
        handleSelect={handlePillClick}
        handleReset={handlePillReset}
      />
    )
  }

  function renderGameLists() {
    if (gameCount === 0) {
      return <p>No matches found, sorry.</p>
    }

    return filteredGames.map(renderCollectionLists)
  }

  return (
    <Layout>
      <PageHeading
        heading="Collection"
        subheading={`There ${
          gameCount === 1 ? `is 1 game` : `are ${gameCount} games`
        } down yonder.`}
        liveSubheading
      />
      <Search value={searchValue} handleChange={handleChange} />
      {renderPlatformPills()}
      {renderGameLists()}
    </Layout>
  )
}

Collection.propTypes = {
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

export function getStaticProps() {
  const games = gamesData.platforms.sort(sortByKey("platform")).map((p) => {
    return {
      platform: p.platform,
      games: p.games.sort(sortByKey("name")),
    }
  })

  const queryData = games.map((p) => {
    return flattenObjectValues(p.games)
  })

  return { props: { games, queryData } }
}
