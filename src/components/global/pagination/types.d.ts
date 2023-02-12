import { MouseEventHandler } from "react"

export type IPaginationProps = {
  count: number
  activePageIndex: number
  onNextClick: MouseEventHandler<HTMLButtonElement>
  onPreviousClick: MouseEventHandler<HTMLButtonElement>
  onPageClick: MouseEventHandler<HTMLButtonElement>
  onFirstPageClick: MouseEventHandler<HTMLButtonElement>
  onLastPageClick: MouseEventHandler<HTMLButtonElement>
  maxVisiblePageCount: number
}

export type IPaginationListItemsProps = {
  indices: number[]
  activeIndex: number
  handleClick: MouseEventHandler<HTMLButtonElement>
  paginationIndex: number
}
