import { MouseEventHandler } from "react"

export type PaginationProps = {
  count: number
  activePageIndex: number
  onNextClick: MouseEventHandler<HTMLButtonElement>
  onPreviousClick: MouseEventHandler<HTMLButtonElement>
  onPageClick: MouseEventHandler<HTMLButtonElement>
  onFirstPageClick: MouseEventHandler<HTMLButtonElement>
  onLastPageClick: MouseEventHandler<HTMLButtonElement>
  maxVisiblePageCount: number
}

export type PaginationListItemsProps = {
  indices: number[]
  activeIndex: number
  handleClick: MouseEventHandler<HTMLButtonElement>
}
