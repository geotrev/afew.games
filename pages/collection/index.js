import { Fragment, Component } from "react"
import { debounce } from "lodash-es"
import Layout from "components/layout"
import { flattenValues } from "lib/flatten-values"
import vgaGames from "public/games/vga-games.json"
import wataGames from "public/games/wata-games.json"
import styles from "./styles.module.scss"
import classNames from "classnames"
import Types from "prop-types"

export default class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      wata: this.props.games.wata,
      vga: this.props.games.vga,
    }
    this.filterGames = this.filterGames.bind(this)
    this.debounceFilter = debounce(this.filterGames, 200)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.debounceFilter()
    }
  }

  matchGame(acc, queryString, idx, { search, type }) {
    const game = this.props.games[type][idx]

    if (queryString.includes(search)) {
      return acc.concat(game)
    }

    return acc
  }

  filterGames() {
    const search = this.state.search.toLowerCase()
    const {
      games: { wata, vga },
      queryData,
    } = this.props

    if (search) {
      const wataFiltered = queryData.wata.reduce(
        (a, e, i) => this.matchGame(a, e, i, { search, type: "wata" }),
        []
      )
      const vgaFiltered = queryData.vga.reduce(
        (a, e, i) => this.matchGame(a, e, i, { search, type: "vga" }),
        []
      )

      this.setState({
        wata: wataFiltered,
        vga: vgaFiltered,
      })
    } else {
      this.setState({ wata, vga })
    }
  }

  toFieldTuples(data) {
    return Object.keys(data).reduce((acc, fieldName) => {
      if (fieldName === "name") {
        return acc
      }
      return [...acc, [fieldName, data[fieldName]]]
    }, [])
  }

  renderGamesTable(games, label) {
    if (!games.length) {
      return <p className={styles.gameGrid}>Sorry, no matches found.</p>
    }

    return (
      <div
        role="grid"
        className={styles.gameGrid}
        aria-label={label}
        aria-colcount="2"
      >
        {games.map((data, idx) => {
          const fieldData = this.toFieldTuples(data)
          const describedById = `game-${idx}`

          return (
            <div key={idx} role="gridcell" className={styles.gameCell}>
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

  renderInput() {
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
          onChange={this.handleChange}
          value={this.state.search}
        />
      </div>
    )
  }

  render() {
    return (
      <Layout>
        <h1>
          <span aria-hidden="true">./</span>Collection
        </h1>
        <p>I own some games.</p>
        {this.renderInput()}
        <h2>VGA Graded</h2>
        {this.renderGamesTable(this.state.vga, "VGA Graded Games")}
        <h2>Wata Graded</h2>
        {this.renderGamesTable(this.state.wata, "Wata Graded Games")}
      </Layout>
    )
  }
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
      games: { vga, wata },
      queryData: { vga: flattenValues(vga), wata: flattenValues(wata) },
    },
  }
}
