"use client"

import { ChangeEventHandler } from "react"

interface CountDropdownProps {
  totalGameCount: number
  isLoading: boolean
  selectedCount: string
  handleCountSelect: ChangeEventHandler<HTMLSelectElement>
}

export const CountDropdown = ({
  totalGameCount,
  isLoading,
  selectedCount,
  handleCountSelect,
}: CountDropdownProps) => {
  if (totalGameCount <= 0 || isLoading) return null

  return (
    <div className="flex justify-end">
      <label className="label pe-4">Games shown</label>
      <select
        value={selectedCount}
        name="quantity"
        onChange={handleCountSelect}
        className="select select-bordered"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">All</option>
      </select>
    </div>
  )
}
