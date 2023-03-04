"use client"

import { useEffect, useCallback, useRef, MouseEventHandler } from "react"
import { debounce } from "lodash-es"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Pagination } from "app/components"
import { EssayPageData } from "app/types/essays"
import { useFetchEssays } from "../../utils/use-fetch-essays"
import { EssayListLoader } from "../essay-list-loader"
import { EssayListError } from "../essay-list-error"
import { EssayList } from "../essay-list"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const VISIBLE_PAGES = 5

type EssaysWrapperProps = {
  initialData: EssayPageData
}

export function EssaysWrapper({ initialData }: EssaysWrapperProps) {
  const { isLoading, isError, data, setPage } = useFetchEssays(initialData)
  const listRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

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

  const setSearchParamsPage = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams)

      if (value === 0) {
        params.delete("page")
      } else {
        params.set("page", String(value + 1))
      }

      const stringifiedParams = params.toString()

      router.push(
        pathname + (params.get("page") ? "?" + stringifiedParams : "")
      )
    },
    [searchParams, pathname, router]
  )

  const onPreviousClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === 0) return
    setPage(data.index - 1)
    setSearchParamsPage(data.index - 1)
  }, [data.index, setPage, setSearchParamsPage])

  const onPageClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const target = event.target as HTMLButtonElement
      const targetPageIdx: number = parseInt(target.innerText, 10) - 1
      if (data.index !== targetPageIdx) {
        setPage(targetPageIdx)
        setSearchParamsPage(targetPageIdx)
      }
    },
    [data.index, setPage, setSearchParamsPage]
  )

  const onNextClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.index + 1)
    setSearchParamsPage(data.index + 1)
  }, [data.index, data.totalPages, setPage, setSearchParamsPage])

  const onFirstPageClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === 0) return
    setPage(0)
    setSearchParamsPage(0)
  }, [data.index, setPage, setSearchParamsPage])

  const onLastPageClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.totalPages - 1)
    setSearchParamsPage(data.totalPages - 1)
  }, [data.index, data.totalPages, setPage, setSearchParamsPage])

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
