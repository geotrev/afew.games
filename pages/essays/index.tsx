import { useEffect, useCallback, useRef } from "react"
import { debounce } from "lodash-es"

import { EssayPageData } from "types/essays"
import { getEssayList } from "lib/get-essay-list"
import { useFetchEssays } from "hooks/use-fetch-essays"
import {
  PageHeading,
  Layout,
  Pagination,
  PaginationClickHandler,
} from "components/global"
import { EssayListLoader, EssayListError, EssayList } from "components/essays"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const VISIBLE_PAGES = 5
const DEFAULT_PAGE = 0

type EssaysProps = {
  initialData: EssayPageData
}

export default function Essays({ initialData }: EssaysProps) {
  const { isLoading, isError, data, setPage } = useFetchEssays(initialData)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect((): (() => void) => {
    return () => (initialLoad = true)
  }, [])

  useEffect((): void => {
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

  const onPreviousClick = useCallback<PaginationClickHandler>(() => {
    if (data.index === 0) return
    setPage(data.index - 1)
  }, [data.index, setPage])

  const onPageClick = useCallback<PaginationClickHandler>(
    (event) => {
      const target = event.target as HTMLButtonElement
      const targetPageIdx: number = parseInt(target.innerText, 10) - 1
      if (data.index !== targetPageIdx) {
        setPage(targetPageIdx)
      }
    },
    [data.index, setPage]
  )

  const onNextClick = useCallback<PaginationClickHandler>(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.index + 1)
  }, [data.index, data.totalPages, setPage])

  const onFirstPageClick = useCallback<PaginationClickHandler>(() => {
    if (data.index === 0) return
    setPage(0)
  }, [data.index, setPage])

  const onLastPageClick = useCallback<PaginationClickHandler>(() => {
    if (data.index === data.totalPages - 1) return
    setPage(data.totalPages - 1)
  }, [data.index, data.totalPages, setPage])

  return (
    <Layout>
      <PageHeading heading="Essays" />
      {isLoading ? (
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
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const initialData: EssayPageData = getEssayList(DEFAULT_PAGE) as EssayPageData
  return { props: { initialData } }
}
