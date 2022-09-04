import { omit } from "lodash-es"
import { GameCellMetadata } from "../game-cell-metadata"
import styles from "./styles.module.scss"

export function GameCell({ data }) {
  const metadata = Object.entries(omit(data, ["name"]))
  return (
    <div role="gridcell" className={styles.gameCell}>
      <h3 id={data.name}>{data.name}</h3>
      <dl className={styles.gameCellData} aria-describedby={data.name}>
        {metadata.map(([name, value]) => (
          <GameCellMetadata key={name} name={name} value={value} />
        ))}
      </dl>
    </div>
  )
}
