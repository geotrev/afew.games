"use client"

import { Button } from "@zendeskgarden/react-buttons"
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
    <div className="mb-12 flex justify-center">
      <Button
        type="button"
        isStretched
        onClick={() => setFilterValue((ct) => ct! + filterValue)}
      >
        Load more
      </Button>
    </div>
  )
}
