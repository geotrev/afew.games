import propTypes from "prop-types"
import { forwardRef, ReactElement, Ref } from "react"
import { EssayListItem } from "../essay-list-item"
import { EssayListComponentProps } from "./types"
import styles from "./styles.module.scss"

const EssayList = forwardRef<HTMLUListElement, EssayListComponentProps>(
  EssayListComponent
)

EssayList.propTypes = {
  data: propTypes.shape({
    index: propTypes.number.isRequired,
    totalPages: propTypes.number.isRequired,
    essays: propTypes.arrayOf(
      propTypes.shape({
        title: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
        metadata: propTypes.shape({
          urlPath: propTypes.string.isRequired,
          date: propTypes.string.isRequired,
          slug: propTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}

function EssayListComponent(
  { data }: EssayListComponentProps,
  ref: Ref<HTMLUListElement>
): ReactElement {
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

export { EssayList }
