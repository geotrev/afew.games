import { Fragment } from "react"
import Layout from "components/layout"
import vgaGames from "../../public/games/vga-games.json"
import wataGames from "../../public/games/wata-games.json"
import styles from "./styles.module.scss"
import classNames from "classnames"

function toFieldTuples(data) {
  return Object.keys(data).reduce((acc, fieldName) => {
    if (fieldName === "name") {
      return acc
    }
    return [...acc, [fieldName, data[fieldName]]]
  }, [])
}

function renderGamesTable(games, label) {
  return (
    <div
      role="grid"
      className={styles.gameGrid}
      aria-label={label}
      aria-colcount="2"
    >
      {games.map((data, idx) => {
        const fieldData = toFieldTuples(data)
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
                      className={classNames(styles.gameCellDataItem, "text-sm")}
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

export default function Games({ games }) {
  return (
    <Layout>
      <h1>./Games</h1>
      <p>
        {
          "Many of the games I own are graded by third party authenticators. Namely, VGA (Video Game Authority) and Wata Games. Due to the rising prices of this service, I've opted to stop grading games and simply encase them in reusable acrylic holders."
        }
      </p>
      <h2>VGA Graded</h2>
      {renderGamesTable(games.vga, "VGA Graded Games")}
      <h2>Wata Graded</h2>
      {renderGamesTable(games.wata, "Wata Graded Games")}
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      games: {
        vga: vgaGames.games.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        }),
        wata: wataGames.games.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        }),
      },
    },
  }
}
