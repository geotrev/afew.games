import cn from "classnames"
import { PaginationListItemsProps } from "./types"

export function PaginationListItems({
  indices,
  activeIndex,
  handleClick,
  paginationIndex,
}: PaginationListItemsProps) {
  return (
    <>
      {indices.map((idx: number) => {
        const isActive = idx === activeIndex
        const label = `Page ${idx + 1}`

        return (
          <button
            className={cn(
              "rounded-md btn-xs btn !h-auto !min-h-0 py-3 md:btn-md",
              {
                "btn-primary": isActive,
                "btn-ghost": !isActive,
              }
            )}
            key={label}
            data-pagination-index={idx}
            tabIndex={paginationIndex === idx ? 0 : -1}
            onClick={handleClick}
            aria-current={isActive ? true : undefined}
            aria-label={isActive ? `${label}, current page` : `Goto ${label}`}
          >
            {idx + 1}
          </button>
        )
      })}
    </>
  )
}
