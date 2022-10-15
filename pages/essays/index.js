import { useEffect, useCallback, useRef } from "react"
import { debounce } from "lodash-es"
import { getEssayList } from "lib/get-essay-list"
import { useFetchEssays } from "hooks/use-fetch-essays"
import { PageHeading, Layout, Pagination } from "components/global"
import { EssayListLoader, EssayListError, EssayList } from "components/essays"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const VISIBLE_PAGES = 5

export default function Essays({ initialData }) {
  const { isLoading, isError, data, setData } = useFetchEssays(initialData)
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

  const onPreviousClick = useCallback(() => {
    if (data.index === 0) return
    setData(data.index - 1)
  }, [data.index, setData])

  const onPageClick = useCallback(
    (e) => {
      const targetPageIdx = parseInt(e.target.innerText, 10) - 1
      if (data.index === targetPageIdx) return
      setData(targetPageIdx)
    },
    [data.index, setData]
  )

  const onNextClick = useCallback(() => {
    if (data.index === data.totalPages - 1) return
    setData(data.index + 1)
  }, [data.index, data.totalPages, setData])

  const onFirstPageClick = useCallback(() => {
    if (data.index === 0) return
    setData(0)
  }, [data.index, setData])

  const onLastPageClick = useCallback(() => {
    if (data.index === data.totalPages - 1) return
    setData(data.totalPages - 1)
  }, [data.index, data.totalPages, setData])

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
  const FIRST_PAGE_INDEX = 0
  const initialData = await getEssayList(FIRST_PAGE_INDEX)
  return { props: { initialData } }
}
