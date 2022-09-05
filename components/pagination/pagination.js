import { useState, useEffect } from "react"
import Types from "prop-types"
import cn from "classnames"
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
  const [rovingIndex, setRovingIndex] = useState(0)
  const lastPageIdx = count - 1
  const visibleIndexRange = getVisiblePageIdxRange()
  const visibleRangeLength = visibleIndexRange.length
  const lastVisibleIndex = visibleIndexRange[visibleRangeLength - 1]

  useEffect(() => {
    setRovingIndex(activePageIndex)
  }, [activePageIndex])

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

  function setRovingTarget(target, delta) {
    target.focus()
    setRovingIndex(rovingIndex + delta)
  }

  function handleKeydown(e) {
    if (e.key === "ArrowLeft" && rovingIndex > visibleIndexRange[0]) {
      setRovingTarget(
        e.target.parentNode.previousElementSibling.firstElementChild,
        -1
      )
    } else if (e.key === "ArrowRight" && rovingIndex < lastVisibleIndex) {
      setRovingTarget(
        e.target.parentNode.nextElementSibling.firstElementChild,
        1
      )
    }
  }

  function renderVisiblePageItems() {
    return visibleIndexRange.map((idx) => {
      const isActive = idx === activePageIndex
      const label = `Page ${idx + 1}`
      return (
        <li key={idx} data-pagination-index={idx}>
          <button
            className={cn(styles.paginationButton, {
              [styles.isActive]: isActive,
            })}
            tabIndex={rovingIndex === idx ? "0" : "-1"}
            aria-current={isActive ? "true" : null}
            aria-label={isActive ? `${label}, current page` : `Goto ${label}`}
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

  // There's nothing to render when the count is non-positive.
  if (count < 1) {
    return null
  }

  return (
    <div
      role="group"
      aria-label="Use left and right arrow keys to focus available page numbers"
    >
      <nav aria-label="Pagination" onKeyDown={handleKeydown}>
        <ul className={styles.pagination}>
          <li>
            <button
              onKeyDown={(e) => e.stopPropagation()}
              className={cn(styles.paginationButton, styles.paginateSkipbutton)}
              type="button"
              aria-disabled={activePageIndex === 0 ? "true" : null}
              onClick={onFirstPageClick}
            >
              {"≪"}
            </button>
          </li>
          <li>
            <button
              onKeyDown={(e) => e.stopPropagation()}
              className={cn(styles.paginationButton, styles.paginateSkipbutton)}
              type="button"
              aria-disabled={activePageIndex === 0 ? "true" : null}
              onClick={onPreviousClick}
            >
              {"Previous"}
            </button>
          </li>
          {renderVisiblePageItems()}
          <li>
            <button
              onKeyDown={(e) => e.stopPropagation()}
              className={cn(styles.paginationButton, styles.paginateSkipbutton)}
              type="button"
              aria-disabled={lastPageIdx === activePageIndex ? "true" : null}
              onClick={onNextClick}
            >
              {"Next"}
            </button>
          </li>
          <li>
            <button
              onKeyDown={(e) => e.stopPropagation()}
              className={cn(styles.paginationButton, styles.paginateSkipbutton)}
              type="button"
              aria-disabled={activePageIndex === count - 1 ? "true" : null}
              onClick={onLastPageClick}
            >
              {"≫"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
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
