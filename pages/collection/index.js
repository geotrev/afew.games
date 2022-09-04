import { useState, useMemo, useEffect } from "react"
import { debounce } from "lodash-es"
import Layout from "components/layout"
import { flattenValues } from "lib/flatten-values"
import vgaGames from "public/games/vga-games.json"
import wataGames from "public/games/wata-games.json"
import Types from "prop-types"
import { GamesGrid } from "components/collection/games-grid"
import { Search } from "components/collection/search"

const WATA_TYPE = "wata"
const VGA_TYPE = "vga"

export default function Collection({ games, queryData }) {
  const [searchValue, setSearchValue] = useState("")
  const [queryValue, setQueryValue] = useState("")
  const debounceQueryValue = useMemo(() => debounce(setQueryValue, 200), [])

  useEffect(() => {
    debounceQueryValue(searchValue)
  }, [debounceQueryValue, searchValue])

  function handleChange(e) {
    setSearchValue(e.target.value)
  }

  function filterGamesBySearchTerm(type) {
    const graderGames = games[type]
    const query = queryValue.toLowerCase()
    if (!queryValue) return graderGames

    const graderQueryData = queryData[type]

    return graderQueryData.reduce((acc, queryString, idx) => {
      const game = graderGames[idx]

      if (queryString.includes(query)) {
        return acc.concat(game)
      }

      return acc
    }, [])
  }

  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>Collection
      </h1>
      <p>Just some games.</p>
      <Search value={searchValue} handleChange={handleChange} />
      <GamesGrid
        games={filterGamesBySearchTerm(VGA_TYPE)}
        label="VGA Graded"
        ariaLabel="VGA Graded Games"
      />
      <GamesGrid
        games={filterGamesBySearchTerm(WATA_TYPE)}
        label="Wata Graded"
        ariaLabel="Wata Graded Games"
      />
    </Layout>
  )
}

Collection.propTypes = {
  games: Types.shape({
    wata: Types.arrayOf(Types.object).isRequired,
    vga: Types.arrayOf(Types.object).isRequired,
  }).isRequired,
  queryData: Types.shape({
    wata: Types.arrayOf(Types.string).isRequired,
    vga: Types.arrayOf(Types.string).isRequired,
  }),
}

export function getStaticProps() {
  const wata = wataGames.games.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })

  const vga = vgaGames.games.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })

  return {
    props: {
      games: {
        vga,
        wata,
      },
      queryData: {
        vga: flattenValues(vga),
        wata: flattenValues(wata),
      },
    },
  }
}
