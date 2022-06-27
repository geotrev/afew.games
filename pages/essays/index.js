import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import classNames from "classnames"
import Layout from "components/layout"
import Pagination from "components/pagination"
import styles from "./essays.module.scss"

const PageMap = new Map()

function purgeMapData() {
  PageMap.clear()
}

function fetchEssayItems({ pageIdx, setPageData, pageData, focusHeading }) {
  if (PageMap.has(pageIdx)) {
    return setPageData({ ...PageMap.get(pageIdx) })
  }

  // Sets loading state
  setPageData({ ...pageData, essays: [] })

  // Fetch target pageIdx and load its items
  fetch("/api/essays", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageIdx }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((pageData) => {
      const payload = {
        ...pageData,
        pageIdx,
      }

      // This is only really so initial page load doesn't
      // steal focus. All other cases, focus heading
      // to reflect new page content
      if (focusHeading) {
        payload.focusHeading = true
      }

      setPageData(payload)

      // Memoize payload for quicker change next time
      PageMap.set(pageIdx, { ...payload, focusHeading: true })
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

export default function Essays() {
  const [pageData, setPageData] = useState({
    count: 0,
    essays: [],
    pageIdx: -1,
    focusHeading: false,
  })
  const { count, essays, pageIdx } = pageData
  const placeholderIterator = Array(5).fill(null)
  const headingRef = useRef(null)

  useEffect(() => {
    fetchEssayItems({ pageIdx: 0, setPageData })
    return purgeMapData
  }, [])

  useEffect(() => {
    if (pageData.focusHeading) {
      const heading = headingRef.current
      heading.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
      })

      heading.setAttribute("tabindex", "-1")
      heading.focus({ preventScroll: true })
      heading.removeAttribute("tabindex")

      setPageData({ ...pageData, focusHeading: false })
    }
  }, [pageData])

  function onPreviousClick() {
    const prevPageIdx = pageIdx - 1
    fetchEssayItems({
      pageIdx: prevPageIdx,
      setPageData,
      pageData,
      focusHeading: true,
    })
  }

  function onPageClick(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (pageIdx !== targetPageIdx) {
      fetchEssayItems({
        pageIdx: targetPageIdx,
        setPageData,
        pageData,
        focusHeading: true,
      })
    }
  }

  function onNextClick() {
    const nextPageIdx = pageIdx + 1
    fetchEssayItems({
      pageIdx: nextPageIdx,
      setPageData,
      pageData,
      focusHeading: true,
    })
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
    return <ul className={styles.essayList}>{essays.map(renderEssayItem)}</ul>
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
      <h1 ref={headingRef}>
        <span aria-hidden="true">./</span>Essays
      </h1>
      {essays.length > 0 ? renderList() : renderLoader()}
      {count > 0 && (
        <Pagination
          count={count}
          activePageIndex={pageIdx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          onPageClick={onPageClick}
        />
      )}
    </Layout>
  )
}
