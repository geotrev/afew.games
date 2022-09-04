import { forwardRef } from "react"
import { ListItem } from "../list-item"
import styles from "./styles.module.scss"

function EssayList({ data }, ref) {
  return (
    <ul
      ref={ref}
      className={styles.essayList}
      aria-label={`Essays, page ${data.index + 1}`}
    >
      {data.essays.map((entry) => (
        <ListItem key={entry.metadata.slug} entry={entry} />
      ))}
    </ul>
  )
}

export const List = forwardRef(EssayList)
