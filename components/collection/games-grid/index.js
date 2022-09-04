import { GameCell } from "../game-cell"
import styles from "./styles.module.scss"

export function GamesGrid({ games, label }) {
  return (
    <>
      <h2>VGA Graded</h2>
      {games.length ? (
        <div
          role="grid"
          className={styles.gameGrid}
          aria-label={label}
          aria-colcount="2"
        >
          {games.map((data) => (
            <GameCell key={`${data.name}-${data.grade}`} data={data} />
          ))}
        </div>
      ) : (
        <p className={styles.gameGrid}>Sorry, no matches found.</p>
      )}
    </>
  )
}
