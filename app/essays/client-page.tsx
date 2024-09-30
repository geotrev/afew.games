"use client"

import { useCallback, useState } from "react"
import { PaginatedEssay, queryEssays } from "@/app/_queries/essays"
import { EssayList } from "./_components/essay-list"
import { PAGE_SIZE } from "./constants"
import { EssayListLoader } from "./_components/essay-list-loader"
import { Pagination } from "./_components/pagination"

interface EssaysProps {
  essays: PaginatedEssay[]
  pageInfo: {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  pages: number
}

interface PageData extends Omit<EssaysProps, "pages"> {
  index: number
}

export function Essays({
  essays: _essays,
  pageInfo: _pageInfo,
  pages,
}: EssaysProps) {
  const [pageData, setPageData] = useState<PageData>({
    essays: _essays,
    pageInfo: _pageInfo,
    index: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleNewestClick = useCallback(async () => {
    if (pageData.index === 0) return
    setIsLoading(true)

    const result = await queryEssays({
      sort: "publish_date",
      last: 5,
    })

    if (result.essays?.length && result.pageInfo) {
      setPageData({ ...(result as EssaysProps), index: 0 })
      setIsLoading(false)
    }
  }, [pageData])

  const handlePreviousClick = useCallback(async () => {
    if (pageData.index === 0) return
    setIsLoading(true)

    const result = await queryEssays({
      sort: "publish_date",
      ...(pageData.index > 1 ? { first: 5 } : { last: 5 }),
      ...(pageData.index > 1 && { after: pageData.essays[0].cursor }),
    })

    if (result.essays?.length && result.pageInfo) {
      setPageData({
        essays: pageData.index > 1 ? result.essays.reverse() : result.essays,
        pageInfo: result.pageInfo,
        index: pageData.index - 1,
      })
      setIsLoading(false)
    }
  }, [pageData])

  const handleNextClick = useCallback(async () => {
    if (pageData.index + 1 === pages) return

    setIsLoading(true)

    const result = await queryEssays({
      sort: "publish_date",
      last: 5,
      before: pageData.essays[pageData.essays.length - 1].cursor,
    })

    if (result.essays?.length && result.pageInfo) {
      setPageData({ ...(result as EssaysProps), index: pageData.index + 1 })
      setIsLoading(false)
    }
  }, [pageData, pages])

  const handleLastClick = useCallback(async () => {
    if (pageData.index + 1 === pages) return

    setIsLoading(true)

    const result = await queryEssays({ sort: "publish_date" })

    if (result.essays?.length && result.pageInfo) {
      const index = Math.floor(result.essays.length / PAGE_SIZE)
      const lastFiveEssays = result.essays.reverse().slice(-5)

      setPageData({
        essays: lastFiveEssays,
        pageInfo: result.pageInfo,
        index,
      })
      setIsLoading(false)
    }
  }, [pageData, pages])

  return (
    <>
      {isLoading ? (
        <EssayListLoader />
      ) : (
        <EssayList essays={pageData.essays!} />
      )}
      <Pagination
        index={pageData.index}
        totalPages={pages}
        handleNewestClick={handleNewestClick}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        handleLastClick={handleLastClick}
      />
    </>
  )
}
