"use client"

import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react"

interface PaginationProps {
  index: number
  totalPages: number
  handleNewestClick: () => void
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleLastClick: () => void
}

export const Pagination = ({
  index,
  totalPages,
  handleNewestClick,
  handlePreviousClick,
  handleNextClick,
  handleLastClick,
}: PaginationProps) => {
  return (
    <>
      <div className="text-center" id="page-detail">
        Showing page <strong>{index + 1}</strong> of{" "}
        <strong>{totalPages}</strong>
      </div>
      <nav
        aria-label="pagination"
        aria-describedby="page-detail"
        className="mt-8 flex justify-center gap-4"
      >
        <button
          disabled={index === 0}
          onClick={handleNewestClick}
          className="btn btn-ghost btn-sm rounded-md"
          aria-label="first page"
        >
          <ChevronFirst />
        </button>
        <button
          disabled={index === 0}
          onClick={handlePreviousClick}
          className="btn btn-ghost btn-sm rounded-md"
        >
          <ChevronLeft />
          Previous <span className="sr-only">page</span>
        </button>
        <button
          disabled={index + 1 === totalPages}
          onClick={handleNextClick}
          className="btn btn-ghost btn-sm rounded-md"
        >
          Next <span className="sr-only">page</span>
          <ChevronRight />
        </button>
        <button
          disabled={index + 1 === totalPages}
          onClick={handleLastClick}
          className="btn btn-ghost btn-sm rounded-md"
          aria-label="last page"
        >
          <ChevronLast />
        </button>
      </nav>
    </>
  )
}
