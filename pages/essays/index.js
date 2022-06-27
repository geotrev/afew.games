import { useState, useEffect } from "react"
import Link from "next/link"
import classNames from "classnames"
import Layout from "components/layout"
import Pagination from "components/pagination"
import styles from "./essays.module.scss"

async function fetchEssayItems(pageIdx, setPageData) {
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
      setPageData({
        pageIdx,
        ...pageData,
      })
    })
    .catch((e) => {
      throw new Error("FETCH ESSAYS ERROR:", e)
    })
}

export default function Essays() {
  const [pageData, setPageData] = useState({
    count: -1,
    essays: [],
    pageIdx: -1,
  })
  const { count, essays, pageIdx } = pageData

  const placeholderIterator = Array(5).fill(null)

  useEffect(() => {
    fetchEssayItems(0, setPageData)
  }, [])

  function onPreviousClick() {
    const prevPageIdx = pageIdx - 1
    fetchEssayItems(prevPageIdx, setPageData)
  }

  function onPageClick(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (pageIdx !== targetPageIdx) {
      fetchEssayItems(targetPageIdx, setPageData)
    }
  }

  function onNextClick() {
    const nextPageIdx = pageIdx + 1
    fetchEssayItems(nextPageIdx, setPageData)
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
        <ul className={styles.essayList}>{essays.map(renderEssayItem)}</ul>
        <Pagination
          count={count}
          activePageIndex={pageIdx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          onPageClick={onPageClick}
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

  return (
    <Layout>
      <h1>./Essays</h1>
      {essays.length > 0 ? renderList() : renderLoader()}
    </Layout>
  )
}
