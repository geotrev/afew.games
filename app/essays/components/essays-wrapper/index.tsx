"use client"

import { useEffect, useCallback, useRef, MouseEventHandler } from "react"
import { debounce } from "lodash-es"
import { EssayPageData } from "app/types/essays"
import { useFetchEssays } from "../../utils/use-fetch-essays"
import { Pagination } from "app/components"
import { EssayListLoader } from "../essay-list-loader"
import { EssayListError } from "../essay-list-error"
import { EssayList } from "../essay-list"
import { setSearchParams } from "app/utils/helpers"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const VISIBLE_PAGES = 5

type EssaysWrapperProps = {
  initialData: EssayPageData
}

export function EssaysWrapper({ initialData }: EssaysWrapperProps) {
  const { isLoading, isError, data, setPage } = useFetchEssays(initialData)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    return () => {
      initialLoad = true
    }
  }, [])

  useEffect(() => {
    if (initialLoad) {
      toggleInitialLoad()
      return
    }

    setSearchParams(data.index > 0 ? { page: data.index + 1 } : { page: null })

    if (listRef.current) {
      const list = listRef.current
      list.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      })
      list.setAttribute("tabindex", "-1")
      list.focus({ preventScroll: true })
      list.removeAttribute("tabindex")
    }
  }, [data.index])

  const onPreviousClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === 0) return
    setPage(data.index - 1)
  }, [data.index, setPage])

  const onPageClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const target = event.target as HTMLButtonElement
      const targetPageIdx: number = parseInt(target.innerText, 10) - 1
      if (data.index !== targetPageIdx) {
        setPage(targetPageIdx)
      }
    },
    [data.index, setPage]
  )

  const onNextClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.index + 1)
  }, [data.index, data.totalPages, setPage])

  const onFirstPageClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === 0) return
    setPage(0)
  }, [data.index, setPage])

  const onLastPageClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.totalPages - 1)
  }, [data.index, data.totalPages, setPage])

  return isLoading ? (
    <EssayListLoader />
  ) : isError ? (
    <EssayListError />
  ) : (
    <>
      <EssayList data={data} ref={listRef} />
      <Pagination
        count={data.totalPages}
        maxVisiblePageCount={VISIBLE_PAGES}
        activePageIndex={data.index}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        onPageClick={onPageClick}
        onFirstPageClick={onFirstPageClick}
        onLastPageClick={onLastPageClick}
      />
    </>
  )
}
