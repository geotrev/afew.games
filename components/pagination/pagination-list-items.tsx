import { ReactElement } from "react"
import { StyledPaginationItem } from "./styled"
import { PaginationListItemsProps } from "./types"
import { Button } from "../button"

export function PaginationListItems({
  indices,
  activeIndex,
  handleClick,
  paginationIndex,
}: PaginationListItemsProps): ReactElement {
  return (
    <>
      {indices.map((idx: number) => {
        const isActive = idx === activeIndex
        const label = `Page ${idx + 1}`

        return (
          <StyledPaginationItem key={idx} data-pagination-index={idx}>
            <Button
              key={label}
              selected={isActive}
              tabIndex={paginationIndex === idx ? 0 : -1}
              onClick={handleClick}
              aria-current={isActive ? true : undefined}
              aria-label={isActive ? `${label}, current page` : `Goto ${label}`}
            >
              {idx + 1}
            </Button>
          </StyledPaginationItem>
        )
      })}
    </>
  )
}
