"use client"

import { Dispatch, SetStateAction } from "react"

interface LoadMoreButtonProps {
  isLoading: boolean
  filterValue: number | null
  selectedCount: string
  filteredGameCount: number
  setFilterValue: Dispatch<SetStateAction<number | null>>
}

export const LoadMoreButton = ({
  isLoading,
  filterValue,
  filteredGameCount,
  setFilterValue,
}: LoadMoreButtonProps) => {
  if (isLoading || filterValue === null || filterValue >= filteredGameCount) {
    return null
  }

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="btn btn-outline btn-secondary btn-xs !h-auto !min-h-0 rounded-md py-3 md:btn-md"
        onClick={() => setFilterValue((ct) => ct! + filterValue)}
      >
        Load more
      </button>
    </div>
  )
}
