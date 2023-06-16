"use client"

import {
  useCallback,
  ReactElement,
} from "react"
import propTypes from "prop-types"
import { PaginationProps } from "./types"
import { PaginationListItems } from "./pagination-list-items"

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

const BUTTON_CLASSNAMES =
  "btn-ghost btn-xs btn rounded-md !h-auto !min-h-0 py-3 md:btn-md"

export function Pagination(props: PaginationProps): ReactElement | null {
  const {
    count,
    activePageIndex,
    onNextClick,
    onPreviousClick,
    onPageClick,
    onFirstPageClick,
    onLastPageClick,
    maxVisiblePageCount,
  } = props
  const lastPageIdx = count - 1

  const getVisiblePageIdxRange = useCallback<() => number[]>(() => {
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
      let rangeStart = visiblePageCountIsEven
        ? activePageIndex - buffer + 1
        : activePageIndex - buffer
      let rangeEnd = activePageIndex + buffer

      if (rangeEnd > lastPageIdx) {
        rangeStart--
        rangeEnd = lastPageIdx
      }

      if (rangeStart < 0) {
        rangeStart = 0
      }

      range = [
        rangeStart < 0 ? 0 : rangeStart,
        rangeEnd > lastPageIdx ? lastPageIdx : rangeEnd,
      ]
    }

    const iterator = []
    for (let i = range[0]; i <= range[1]; i++) {
      iterator.push(i)
    }

    return iterator
  }, [activePageIndex, count, lastPageIdx, maxVisiblePageCount])

  const visibleIndexRange = getVisiblePageIdxRange()

  if (count < 1) {
    return null
  }

  return (
    <div
      role="group"
      aria-label="Use left and right arrow keys to focus page numbers"
    >
      <nav aria-label="Pagination">
        <ul className="flex gap-1 sm:gap-2">
          <button
            className={BUTTON_CLASSNAMES}
            onKeyDown={(e) => e.stopPropagation()}
            aria-disabled={activePageIndex === 0 ? true : undefined}
            onClick={onFirstPageClick}
            aria-label="Goto First Page"
          >
            <span>{"≪"}</span>
          </button>
          <button
            className={BUTTON_CLASSNAMES}
            onKeyDown={(e) => e.stopPropagation()}
            aria-disabled={activePageIndex === 0 ? true : undefined}
            onClick={onPreviousClick}
          >
            Newer
          </button>
          <PaginationListItems
            indices={visibleIndexRange}
            activeIndex={activePageIndex}
            handleClick={onPageClick}
          />
          <button
            className={BUTTON_CLASSNAMES}
            onKeyDown={(e) => e.stopPropagation()}
            aria-disabled={lastPageIdx === activePageIndex ? true : undefined}
            onClick={onNextClick}
          >
            Older
          </button>
          <button
            className={BUTTON_CLASSNAMES}
            onKeyDown={(e) => e.stopPropagation()}
            aria-disabled={activePageIndex === count - 1 ? true : undefined}
            onClick={onLastPageClick}
            aria-label="Goto Last Page"
          >
            <span>{"≫"}</span>
          </button>
        </ul>
      </nav>
    </div>
  )
}
