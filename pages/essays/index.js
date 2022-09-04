import { useEffect, useRef } from "react"
import { debounce } from "lodash-es"
import { useFetchEssays } from "hooks/use-fetch-essays"
import Layout from "components/layout"
import Pagination from "components/pagination"
import { PageHeading } from "components/heading"
import { ListLoader } from "components/essays/list-loader"
import { ListError } from "components/essays/list-error"
import { List } from "components/essays/list"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const VISIBLE_PAGES = 5

export default function Essays() {
  const { isLoading, isError, data, setData } = useFetchEssays()
  const listRef = useRef(null)

  useEffect(() => {
    return () => (initialLoad = true)
  }, [])

  useEffect(() => {
    if (initialLoad) {
      toggleInitialLoad()
      return
    }

    const list = listRef.current
    list.scrollIntoView({
      block: "start",
      inline: "start",
      behavior: "smooth",
    })
    list.setAttribute("tabindex", "-1")
    list.focus({ preventScroll: true })
    list.removeAttribute("tabindex")
  }, [data.index])

  function onPreviousClick() {
    if (data.index === 0) return
    setData(data.index - 1)
  }

  function onPageClick(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (data.index === targetPageIdx) return
    setData(targetPageIdx)
  }

  function onNextClick() {
    const nextPageIdx = data.index + 1
    if (data.index === data.totalPages - 1) return
    setData(nextPageIdx)
  }

  function onFirstPageClick() {
    if (data.index === 0) return
    setData(0)
  }

  function onLastPageClick() {
    if (data.index === data.totalPages - 1) return
    setData(data.totalPages - 1)
  }

  return (
    <Layout>
      <PageHeading heading="Essays" />
      {isLoading ? (
        <ListLoader />
      ) : isError ? (
        <ListError />
      ) : (
        <>
          <List data={data} ref={listRef} />
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
