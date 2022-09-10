import { useState, useMemo, useEffect } from "react"
import { debounce } from "lodash-es"
import Layout from "components/layout"
import { flattenValues } from "lib/flatten-values"
import gamesData from "public/games/graded-games.json"
import Types from "prop-types"
import { CollectionList } from "components/collection/collection-list"
import { Search } from "components/collection/search"
import { PageHeading } from "components/global/page-heading"

export default function Collection({ games, queryData }) {
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const debouncedFilterValue = useMemo(() => debounce(setFilterValue, 200), [])

  useEffect(() => {
    debouncedFilterValue(searchValue)
  }, [debouncedFilterValue, searchValue])

  function handleChange(e) {
    setSearchValue(e.target.value)
  }

  function filterGamesBySearchTerm() {
    const query = filterValue.toLowerCase()
    if (!filterValue) return games

    return queryData.reduce((acc, p, idx) => {
      const gameList = games[idx].games
      let picked = []

      p.games.forEach((game, gameIdx) => {
        if (game.includes(query)) {
          picked.push(gameList[gameIdx])
        }
      })

      acc.push({ platform: p.platform, games: picked })
      return acc
    }, [])
  }

  const filteredGames = filterGamesBySearchTerm()

  function renderCollectionLists(p) {
    return (
      <CollectionList
        key={p.platform}
        games={p.games}
        label={p.platform}
        id={p.platform}
      />
    )
  }

  return (
    <Layout>
      <PageHeading heading="Collection" subheading="Just some games." />
      <Search value={searchValue} handleChange={handleChange} />
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
