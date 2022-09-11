import propTypes from "prop-types"
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

const EssayList = forwardRef(EssayListBase)

EssayList.propTypes = {
  data: propTypes.shape({
    index: propTypes.number,
    totalPages: propTypes.number,
    essays: propTypes.arrayOf(
      propTypes.shape({
        title: propTypes.string,
        description: propTypes.string,
        metadata: propTypes.shape({
          urlPath: propTypes.string,
          date: propTypes.string,
        }),
      })
    ).isRequired,
  }),
}

export { EssayList }
