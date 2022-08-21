import { useEffect, useRef } from "react"
import { debounce } from "lodash-es"
import classNames from "classnames"
import Link from "next/link"
import Layout from "components/layout"
import Pagination from "components/pagination"
import styles from "./essays.module.scss"
import { useFetchEssays } from "hooks/use-fetch-essays"

let initialLoad = true
const toggleInitialLoad = debounce(() => (initialLoad = false), 50)

export default function Essays() {
  const { isLoading, isError, data, setData } = useFetchEssays()
  const placeholderIterator = Array(5).fill(null)
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
          aria-label={`Essays, data ${data.index + 1}`}
        >
          {data.essays.map(renderEssayItem)}
        </ul>
        <Pagination
          count={data.totalPages}
          maxVisiblePageCount={5}
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

  function renderError() {
    return (
      <div>
        <p>
          {"Uh oh, looks like there was an error. Refresh or try again later."}
        </p>
      </div>
    )
  }

  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>Essays
      </h1>
      {isLoading ? renderLoader() : isError ? renderError() : renderList()}
    </Layout>
  )
}
