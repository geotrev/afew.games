"use client"

import { useState } from "react"
import { Essay } from "types/essays"
import { EssayList } from "./_components/essay-list"
// import { Pagination } from "./_components/pagination"

export interface PaginatedEssay extends Essay {
  cursor?: string
}

interface EssaysProps {
  essays: PaginatedEssay[]
}

// https://tina.io/docs/data-fetching/overview/#pagination

export function Essays({ essays: _essays }: EssaysProps) {
  const [essays] = useState(_essays)
  const [index] = useState(0)

  return (
    <>
      <EssayList essays={essays} index={index} />
      {/* <Pagination /> */}
    </>
  )
}
