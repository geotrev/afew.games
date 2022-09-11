import { useState, useEffect } from "react"
import propTypes from "prop-types"
import { Button } from "../button"
import styles from "./styles.module.scss"

export function Pagination({
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

  if (count < 1) {
    return null
  }

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
    const parentNode = e.target.parentNode
    if (e.key === "ArrowLeft" && rovingIndex > visibleIndexRange[0]) {
      setRovingTarget(parentNode.previousElementSibling.firstElementChild, -1)
    } else if (e.key === "ArrowRight" && rovingIndex < lastVisibleIndex) {
      setRovingTarget(parentNode.nextElementSibling.firstElementChild, 1)
    }
  }

  function renderVisiblePageItems() {
    return visibleIndexRange.map((idx) => {
      const isActive = idx === activePageIndex
      const label = `Page ${idx + 1}`
      return (
        <li key={idx} data-pagination-index={idx}>
          <Button
            selected={isActive}
            tabIndex={rovingIndex === idx ? "0" : "-1"}
            onClick={onPageClick}
            aria-current={isActive ? "true" : null}
            aria-label={isActive ? `${label}, current page` : `Goto ${label}`}
          >
            {idx + 1}
          </Button>
        </li>
      )
    })
  }

  return (
    <div
      role="group"
      aria-label="Use left and right arrow keys to focus available page numbers"
    >
      <nav aria-label="Pagination" onKeyDown={handleKeydown}>
        <ul className={styles.pagination}>
          <li>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === 0 ? "true" : null}
              onClick={onFirstPageClick}
              aria-label={"Goto First Page"}
              bare
            >
              <span aria-hidden="true">{"≪"}</span>
            </Button>
          </li>
          <li>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === 0 ? "true" : null}
              onClick={onPreviousClick}
              bare
            >
              {"Previous"}
            </Button>
          </li>
          {renderVisiblePageItems()}
          <li>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={lastPageIdx === activePageIndex ? "true" : null}
              onClick={onNextClick}
              bare
            >
              {"Next"}
            </Button>
          </li>
          <li>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === count - 1 ? "true" : null}
              onClick={onLastPageClick}
              aria-label={"Goto Last Page"}
              bare
            >
              <span aria-hidden="true">{"≫"}</span>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  maxVisiblePageCount: propTypes.number.isRequired,
  activePageIndex: propTypes.number.isRequired,
  onNextClick: propTypes.func.isRequired,
  onPreviousClick: propTypes.func.isRequired,
  onFirstPageClick: propTypes.func.isRequired,
  onLastPageClick: propTypes.func.isRequired,
  onPageClick: propTypes.func.isRequired,
}
