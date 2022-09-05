import cn from "classnames"
import styles from "./styles.module.scss"

export function GameCellMetadata({ name, value }) {
  return (
    <>
      <dt
        className={cn(styles.gameCellLabel, styles.gameCellDataItem, "text-sm")}
      >
        {name}
      </dt>
      <dd className={cn(styles.gameCellDataItem, "text-sm")}>{value}</dd>
    </>
  )
}
