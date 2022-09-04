import classNames from "classnames"
import styles from "./styles.module.scss"

export function GameCellMetadata({ name, value }) {
  return (
    <>
      <dt
        className={classNames(
          styles.gameCellLabel,
          styles.gameCellDataItem,
          "text-sm"
        )}
      >
        {name}
      </dt>
      <dd className={classNames(styles.gameCellDataItem, "text-sm")}>
        {value}
      </dd>
    </>
  )
}
