"use client"

import {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  ReactElement,
} from "react"
import propTypes from "prop-types"
import { PaginationProps } from "./types"
import { PaginationListItems } from "./pagination-list-items"
import {
  StyledPagination,
  StyledPageItemBreak,
  StyledPaginationItem,
} from "./styled"
import { Button } from "../button"

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
  const [rovingIndex, setRovingIndex] = useState<number>(0)
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
  const visibleRangeLength = visibleIndexRange.length
  const lastVisibleIndex = visibleIndexRange[visibleRangeLength - 1]

  useEffect(() => {
    setRovingIndex(activePageIndex)
  }, [activePageIndex])

  if (count < 1) {
    return null
  }

  function setRovingTarget(target: HTMLButtonElement, delta: number) {
    target.focus()
    setRovingIndex(rovingIndex + delta)
  }

  function handleKeydown(event: KeyboardEvent<HTMLButtonElement>) {
    const parentNode = (event.target as HTMLButtonElement)
      .parentNode as HTMLDivElement
    if (event.key === "ArrowLeft" && rovingIndex > visibleIndexRange[0]) {
      const target = parentNode?.previousElementSibling
        ?.firstElementChild as HTMLButtonElement
      setRovingTarget(target, -1)
    } else if (event.key === "ArrowRight" && rovingIndex < lastVisibleIndex) {
      const target = parentNode?.nextElementSibling
        ?.firstElementChild as HTMLButtonElement
      setRovingTarget(target, 1)
    }
  }

  return (
    <div
      role="group"
      aria-label="Use left and right arrow keys to focus page numbers"
    >
      <nav aria-label="Pagination" onKeyDown={handleKeydown}>
        <StyledPagination>
          <StyledPaginationItem>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === 0 ? true : undefined}
              onClick={onFirstPageClick}
              aria-label={"Goto First Page"}
              bare
            >
              <span aria-hidden="true">{"≪"}</span>
            </Button>
          </StyledPaginationItem>
          <StyledPaginationItem>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === 0 ? true : undefined}
              onClick={onPreviousClick}
              bare
            >
              Newer
            </Button>
          </StyledPaginationItem>
          <StyledPageItemBreak aria-hidden="true" />
          <PaginationListItems
            indices={visibleIndexRange}
            activeIndex={activePageIndex}
            handleClick={onPageClick}
            paginationIndex={rovingIndex}
          />
          <StyledPageItemBreak aria-hidden="true" />
          <StyledPaginationItem>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={lastPageIdx === activePageIndex ? true : undefined}
              onClick={onNextClick}
              bare
            >
              Older
            </Button>
          </StyledPaginationItem>
          <StyledPaginationItem>
            <Button
              onKeyDown={(e) => e.stopPropagation()}
              aria-disabled={activePageIndex === count - 1 ? true : undefined}
              onClick={onLastPageClick}
              aria-label={"Goto Last Page"}
              bare
            >
              <span aria-hidden="true">{"≫"}</span>
            </Button>
          </StyledPaginationItem>
        </StyledPagination>
      </nav>
    </div>
  )
}
