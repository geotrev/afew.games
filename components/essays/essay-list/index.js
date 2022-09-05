import { forwardRef } from "react"
import { EssayListItem } from "../essay-list-item"
import styles from "./styles.module.scss"

function EssayListBase({ data }, ref) {
  return (
    <ul
      ref={ref}
      className={styles.essayList}
      aria-label={`Essays, page ${data.index + 1}`}
    >
      {data.essays.map((entry) => (
        <EssayListItem key={entry.metadata.slug} entry={entry} />
      ))}
    </ul>
  )
}

export const EssayList = forwardRef(EssayListBase)
