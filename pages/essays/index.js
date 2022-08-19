import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import classNames from "classnames"
import Layout from "components/layout"
import Pagination from "components/pagination"
import styles from "./essays.module.scss"

const PageMap = new Map()
const method = "POST"
const headers = { "Content-Type": "application/json" }

function purgeMapData() {
  PageMap.clear()
}

function fetchEssayItems({ pageIdx, setPageData, pageData, focusList = true }) {
  if (PageMap.has(pageIdx)) {
    return setPageData({ ...PageMap.get(pageIdx) })
  }

  // Sets loading state
  setPageData({ ...(pageData || {}), essays: [] })

  // Fetch target pageIdx and load its items
  fetch("/api/essays", {
    method,
    headers,
    body: JSON.stringify({ pageIdx }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((res) => {
      const payload = { ...res, focusList, pageIdx }
      setPageData(payload)
      PageMap.set(pageIdx, payload)
    })
    .catch((e) => {
      if (pageData) {
        setPageData({ ...pageData })
        return
      }

      // eslint-disable-next-line no-console
      console.error(e)
    })
}

let initialLoadFinished = false

export default function Essays() {
  const [pageData, setPageData] = useState({
    count: 0,
    essays: [],
    pageIdx: -1,
    focusList: false,
  })
  const { count, essays, pageIdx } = pageData
  const placeholderIterator = Array(5).fill(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (initialLoadFinished) return
    // Initial fetch does not focus the list
    // or need to rely on previous state
    fetchEssayItems({ pageIdx: 0, setPageData, focusList: false })
    initialLoadFinished = true

    return () => {
      purgeMapData()
      initialLoadFinished = false
    }
  }, [])

  useEffect(() => {
    if (pageData.focusList) {
      const list = listRef.current
      list.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      })
      list.setAttribute("tabindex", "-1")
      list.focus({ preventScroll: true })
      list.removeAttribute("tabindex")

      setPageData({ ...pageData, focusList: false })
    }
  }, [pageData])

  function onPreviousClick() {
    if (pageIdx === 0) return
    fetchEssayItems({ pageIdx: pageIdx - 1, setPageData, pageData })
  }

  function onPageClick(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (pageIdx === targetPageIdx) return
    fetchEssayItems({ pageIdx: targetPageIdx, setPageData, pageData })
  }

  function onNextClick() {
    const nextPageIdx = pageIdx + 1
    if (pageIdx === count - 1) return
    fetchEssayItems({ pageIdx: nextPageIdx, setPageData, pageData })
  }

  function onFirstPageClick() {
    if (pageIdx === 0) return
    fetchEssayItems({ pageIdx: 0, setPageData, pageData })
  }

  function onLastPageClick() {
    if (pageIdx === count - 1) return
    fetchEssayItems({ pageIdx: count - 1, setPageData, pageData })
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
      <ul
        ref={listRef}
        className={styles.essayList}
        aria-label={`Essays, page ${pageIdx + 1}`}
      >
        {essays.map(renderEssayItem)}
      </ul>
    )
  }

  function renderLoader() {
    return (
      <div>
        {placeholderIterator.map((_, idx) => {
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
      </div>
    )
  }

  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>Essays
      </h1>
      {essays.length > 0 ? renderList() : renderLoader()}
      {count > 0 && (
        <Pagination
          count={count}
          maxVisiblePageCount={5}
          activePageIndex={pageIdx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          onPageClick={onPageClick}
          onFirstPageClick={onFirstPageClick}
          onLastPageClick={onLastPageClick}
        />
      )}
    </Layout>
  )
}
