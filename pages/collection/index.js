import { Fragment, useState, useCallback } from "react"
import debounce from "lodash-es/debounce"
import Layout from "components/layout"
import { flattenValues } from "lib/flatten-values"
import vgaGames from "public/games/vga-games.json"
import wataGames from "public/games/wata-games.json"
import styles from "./styles.module.scss"
import classNames from "classnames"
import Types from "prop-types"

const WATA_TYPE = "wata"
const VGA_TYPE = "vga"

export default function Collection({ games, queryData }) {
  const [search, setSearch] = useState("")
  const debounceChange = useCallback(() => {
    debounce((e) => setSearch(e.target.value), 250)
  }, [])

  function filterGamesBySearchTerm(type) {
    const graderGames = games[type]
    const normalizedSearch = search.toLowerCase()
    if (!search) return graderGames

    const graderQueryData = queryData[type]

    return graderQueryData.reduce((acc, queryString, idx) => {
      const game = graderGames[idx]

      if (queryString.includes(normalizedSearch)) {
        return acc.concat(game)
      }

      return acc
    }, [])
  }

  function toFieldTuples(data) {
    return Object.keys(data).reduce(
      (acc, fieldName) =>
        fieldName === "name" ? acc : [...acc, [fieldName, data[fieldName]]],
      []
    )
  }

  function renderGamesTable(graderGames, label) {
    if (!graderGames.length) {
      return <p className={styles.gameGrid}>Sorry, no matches found.</p>
    }

    return (
      <div
        role="grid"
        className={styles.gameGrid}
        aria-label={label}
        aria-colcount="2"
      >
        {graderGames.map((data, idx) => {
          const fieldData = toFieldTuples(data)
          const describedById = `game-${idx}`

          return (
            <div
              key={data.name + (data.boxGrade || data.grade)}
              role="gridcell"
              className={styles.gameCell}
            >
              <h3 id={describedById}>{data.name}</h3>
              <dl
                className={styles.gameCellData}
                aria-describedby={describedById}
              >
                {fieldData.map((tuple) => {
                  return (
                    <Fragment key={tuple[0]}>
                      <dt
                        className={classNames(
                          styles.gameCellLabel,
                          styles.gameCellDataItem,
                          "text-sm"
                        )}
                      >
                        {tuple[0]}
                      </dt>
                      <dd
                        className={classNames(
                          styles.gameCellDataItem,
                          "text-sm"
                        )}
                      >
                        {tuple[1]}
                      </dd>
                    </Fragment>
                  )
                })}
              </dl>
            </div>
          )
        })}
      </div>
    )
  }

  function renderInput() {
    return (
      <div className={styles.search}>
        <label htmlFor="search" className={styles.searchLabel}>
          Filter games
        </label>
        <input
          className={styles.searchInput}
          name="search"
          type="text"
          placeholder="E.g., Mega Man"
          id="search"
          onChange={debounceChange}
          value={search}
        />
      </div>
    )
  }

  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>Collection
      </h1>
      <p>Just some games.</p>
      {renderInput()}
      <h2>VGA Graded</h2>
      {renderGamesTable(filterGamesBySearchTerm(VGA_TYPE), "VGA Graded Games")}
      <h2>Wata Graded</h2>
      {renderGamesTable(
        filterGamesBySearchTerm(WATA_TYPE),
        "Wata Graded Games"
      )}
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
