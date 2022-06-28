import Types from "prop-types"
import classNames from "classnames"
import styles from "./styles.module.scss"

export default function Pagination({
  count,
  activePageIndex,
  onNextClick,
  onPreviousClick,
  onPageClick,
  onFirstPageClick,
  onLastPageClick,
  maxVisiblePageCount,
}) {
  if (count === -1 || !count) return null

  const lastPageIdx = count - 1

  function getVisiblePageIdxRange() {
    let range
    const visibleCount =
      maxVisiblePageCount > count ? count : maxVisiblePageCount
    const visiblePageCountIsEven = visibleCount % 2 === 0
    const buffer = visiblePageCountIsEven
      ? visibleCount / 2
      : Math.floor(visibleCount / 2)

    if (activePageIndex < buffer) {
      range = [0, visibleCount - 1]
    } else if (activePageIndex > count - buffer) {
      range = [count - visibleCount, lastPageIdx]
    } else {
      let bufferStart = visiblePageCountIsEven
        ? activePageIndex - buffer + 1
        : activePageIndex - buffer
      let bufferEnd = activePageIndex + buffer

      if (bufferEnd > lastPageIdx) {
        bufferStart--
        bufferEnd = lastPageIdx
      }

      if (bufferStart < 0) {
        bufferStart = 0
      }

      range = [
        bufferStart < 0 ? 0 : bufferStart,
        bufferEnd > lastPageIdx ? lastPageIdx : bufferEnd,
      ]
    }

    const iterator = []
    for (let i = range[0]; i <= range[1]; i++) {
      iterator.push(i)
    }

    return iterator
  }

  function renderVisiblePageItems() {
    const itemIterator = getVisiblePageIdxRange()

    return itemIterator.map((idx) => {
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
            aria-disabled={idx === activePageIndex ? "true" : null}
            onClick={onPageClick}
          >
            {idx + 1}
          </button>
        </li>
      )
    })
  }

  return (
    <nav aria-label="Pagination navigation">
      <ul className={styles.pagination}>
        <li>
          <button
            className={classNames(
              styles.paginationButton,
              styles.paginationPaginateButton
            )}
            type="button"
            aria-disabled={activePageIndex === 0 ? "true" : null}
            onClick={onFirstPageClick}
          >
            {"≪"}
          </button>
        </li>
        <li>
          <button
            className={classNames(
              styles.paginationButton,
              styles.paginationPaginateButton
            )}
            type="button"
            aria-disabled={activePageIndex === 0 ? "true" : null}
            onClick={onPreviousClick}
          >
            {"ᐸ"}
          </button>
        </li>
        {renderVisiblePageItems()}
        <li>
          <button
            className={classNames(
              styles.paginationButton,
              styles.paginationPaginateButton
            )}
            type="button"
            aria-disabled={lastPageIdx === activePageIndex ? "true" : null}
            onClick={onNextClick}
          >
            {"ᐳ"}
          </button>
        </li>
        <li>
          <button
            className={classNames(
              styles.paginationButton,
              styles.paginationPaginateButton
            )}
            type="button"
            aria-disabled={activePageIndex === count - 1 ? "true" : null}
            onClick={onLastPageClick}
          >
            {"≫"}
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.defaultProps = {
  count: -1,
  activePageIndex: 0,
  maxVisiblePageCount: 5,
}

Pagination.propTypes = {
  count: Types.number.isRequired,
  maxVisiblePageCount: Types.number.isRequired,
  activePageIndex: Types.number.isRequired,
  onNextClick: Types.func.isRequired,
  onPreviousClick: Types.func.isRequired,
  onPageClick: Types.func.isRequired,
}
