import { GameCell } from "../game-cell"
import styles from "./styles.module.scss"

export function GamesGrid({ games, label, id }) {
  return (
    <>
      <h2 id={id}>{label}</h2>
      <div className={styles.listInfo}>
        <p>{games.length} games shown</p>
      </div>
      {games.length ? (
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
