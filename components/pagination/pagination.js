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
  if (count === -1 || !count) return null

  const lastPageIdx = count - 1
  const itemIterator = Array(count).fill(null)

  return (
    <nav aria-label="Pagination navigation">
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
          const isActive = idx === activePageIndex
          const label = `Page ${idx + 1}`
          return (
            <li key={idx}>
              <button
                className={classNames(styles.paginationButton, {
                  [styles.isActive]: isActive,
                })}
                aria-current={isActive ? "true" : null}
                aria-label={isActive ? `${label}, current page` : label}
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
    </nav>
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
