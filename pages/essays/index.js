import { debounce } from "lodash-es"
import { useEffect, useRef } from "react"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import classNames from "classnames"
import Layout from "components/layout"
import Pagination from "components/pagination"
import styles from "./essays.module.scss"

const method = "POST"
const headers = { "Content-Type": "application/json" }
const QUERY_KEY = "essays"

async function postEssays({ pageIdx = 0 } = {}) {
  return fetch("/api/essays", {
    method,
    headers,
    body: JSON.stringify({ pageIdx }),
  }).then((res) => res.json())
}

let initialLoad = true

// react-query automatically refetches when user navigates away
// from this page, then back. Debouncing prevents
// focus from suddenly moving back to the essay list.
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)
const PlaceholderIterator = Array(5).fill(null)

export default function Essays() {
  const listRef = useRef(null)
  const queryClient = useQueryClient()

  const { isError, data } = useQuery([QUERY_KEY], postEssays, {
    initialData: { pageIdx: 0, essays: [], count: 0 },
  })

  const mutation = useMutation(postEssays, {
    onSuccess: (res) => {
      queryClient.setQueryData([QUERY_KEY], res)
    },
  })

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
  }, [data.pageIdx])

  function onPreviousClick() {
    if (data.pageIdx === 0) return
    mutation.mutate({ pageIdx: data.pageIdx - 1 })
  }

  function onPageClick(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (data.pageIdx === targetPageIdx) return
    mutation.mutate({ pageIdx: targetPageIdx })
  }

  function onNextClick() {
    if (data.pageIdx === data.count - 1) return
    mutation.mutate({ pageIdx: data.pageIdx + 1 })
  }

  function onFirstPageClick() {
    if (data.pageIdx === 0) return
    mutation.mutate({ pageIdx: 0 })
  }

  function onLastPageClick() {
    if (data.pageIdx === data.count - 1) return
    mutation.mutate({ pageIdx: data.count - 1 })
  }

  function renderEssayItem(entry) {
    const {
      title,
      description,
      metadata: { urlPath, date, slug },
    } = entry

    return (
      <li key={slug} className={styles.essayItem}>
        <p className={classNames(styles.essayItemTimePara, "text-xs")}>
          <time className={styles.essayItemTime} dateTime={date}>
            {date}
          </time>
        </p>
        <h2 className={classNames(styles.essayItemHeading, "text-xl")}>
          <Link href={urlPath}>{title}</Link>
        </h2>
        <p className={styles.essayItemDescription}>{description}</p>
      </li>
    )
  }

  function renderList() {
    return (
      <>
        <ul
          ref={listRef}
          className={styles.essayList}
          aria-label={`Essays, page ${data.pageIdx + 1}`}
        >
          {data.essays.map(renderEssayItem)}
        </ul>
        <Pagination
          count={data.count}
          maxVisiblePageCount={5}
          activePageIndex={data.pageIdx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          onPageClick={onPageClick}
          onFirstPageClick={onFirstPageClick}
          onLastPageClick={onLastPageClick}
        />
      </>
    )
  }

  function renderLoader() {
    return (
      <>
        {PlaceholderIterator.map((_, idx) => {
          return (
            <div key={idx} className={styles.empyStateContainer}>
              <div
                className={classNames(
                  styles.animateBg,
                  styles.bgHeightSm,
                  styles.bgNarrow,
                  styles.metadataAnim
                )}
              >
                <div className={styles.bgMask}></div>
              </div>
              <div className={classNames(styles.animateBg, styles.titleAnim)}>
                <div className={styles.bgMask}></div>
              </div>
              <div
                className={classNames(
                  styles.animateBg,
                  styles.bgHeightMd,
                  styles.descAnim
                )}
              >
                <div className={styles.bgMask}></div>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  function renderError() {
    return (
      <p>
        Uh oh... there was an error fetching the essays. Refresh or try again
        later.
      </p>
    )
  }

  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>Essays
      </h1>
      {isError
        ? renderError()
        : data?.count > 0
        ? renderList()
        : renderLoader()}
    </Layout>
  )
}
