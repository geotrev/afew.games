import Types from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.scss"

export default function Pagination({
  count,
  activePageIndex,
  onNextClick,
  onPreviousClick,
  onPageClick,
}) {
  if (count === -1) return null

  const lastPageIdx = count - 1
  const itemIterator = count > -1 ? Array(count).fill(null) : []

  return (
    <ul className={styles.pagination}>
      <li>
        <button
          className={styles.paginationButton}
          type="button"
          disabled={activePageIndex === 0}
          onClick={onPreviousClick}
        >
          {"ᐊ"}
        </button>
      </li>
      {itemIterator.map((_, idx) => {
        return (
          <li key={idx}>
            <button
              className={classNames(styles.paginationButton, {
                [styles.isActive]: idx === activePageIndex,
              })}
              type="button"
              disabled={idx === activePageIndex}
              onClick={onPageClick}
            >
              {idx + 1}
            </button>
          </li>
        )
      })}
      <li>
        <button
          className={styles.paginationButton}
          type="button"
          disabled={lastPageIdx === activePageIndex}
          onClick={onNextClick}
        >
          {"ᐅ"}
        </button>
      </li>
    </ul>
  )
}

Pagination.defaultProps = {
  count: -1,
  activePageIndex: 0,
}

Pagination.propTypes = {
  count: Types.number.isRequired,
  activePageIndex: Types.number.isRequired,
  onNextClick: Types.func.isRequired,
  onPreviousClick: Types.func.isRequired,
  onPageClick: Types.func.isRequired,
}
