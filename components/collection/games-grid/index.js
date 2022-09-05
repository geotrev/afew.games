import { GameCell } from "../game-cell"
import styles from "./styles.module.scss"

export function GamesGrid({ games, label, id }) {
  const length = games.length
  return (
    <>
      <h2 id={id}>{label}</h2>
      <div className={styles.listInfo}>
        {games.length > 0 && (
          <p>
            {length} {length === 1 ? "game" : "games"} shown
          </p>
        )}
      </div>
      {length > 0 ? (
        <ul aria-labelledby={id} className={styles.gameGrid} aria-label={label}>
          {games.map((data) => (
            <GameCell key={`${data.name}-${data.grade}`} data={data} />
          ))}
        </ul>
      ) : (
        <p className={styles.gameGrid}>Sorry, no matches found.</p>
      )}
    </>
  )
}
