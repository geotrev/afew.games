import { ReactElement } from "react"
import { Button } from "../button"
import { IPaginationListItemsProps } from "./types"

export function PaginationListItems({
  indices,
  activeIndex,
  handleClick,
  paginationIndex,
}: IPaginationListItemsProps): ReactElement {
  return (
    <>
      {indices.map((idx: number) => {
        const isActive = idx === activeIndex
        const label = `Page ${idx + 1}`

        return (
          <li key={idx} data-pagination-index={idx}>
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
          </li>
        )
      })}
    </>
  )
}
