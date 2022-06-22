import { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "components/layout"
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
  const lastPageIdx = count - 1

  useEffect(() => {
    fetchEssayItems(0, setPageData)
  }, [])

  function goToPrevious() {
    const prevPageIdx = pageIdx - 1
    fetchEssayItems(prevPageIdx, setPageData)
  }

  function goToPage(e) {
    const targetPageIdx = parseInt(e.target.innerText, 10) - 1
    if (pageIdx !== targetPageIdx) {
      fetchEssayItems(targetPageIdx, setPageData)
    }
  }

  function goToNext() {
    const nextPageIdx = pageIdx + 1
    fetchEssayItems(nextPageIdx, setPageData)
  }

  function renderPagination() {
    return (
      <ul className={styles.pagination}>
        <li>
          <button
            className={styles.paginationButton}
            type="button"
            disabled={pageIdx === 0}
            onClick={goToPrevious}
          >
            {"ᐊ"}
          </button>
        </li>
        {Array(count)
          .fill(null)
          .map((_, idx) => {
            return (
              <li key={idx}>
                <button
                  className={styles.paginationButton}
                  type="button"
                  disabled={idx === pageIdx}
                  onClick={goToPage}
                >
                  {idx + 1}
                </button>
              </li>
            )
          })}
        <li>
          <button
            className={styles.paginationButton}
            type="button"
            disabled={lastPageIdx === pageIdx}
            onClick={goToNext}
          >
            {"ᐅ"}
          </button>
        </li>
      </ul>
    )
  }

  function renderList() {
    return (
      <>
        <ul className={styles.essayList}>
          {essays.map((entry) => {
            const {
              title,
              description,
              metadata: { urlPath, date, slug },
            } = entry

            return (
              <li key={slug} className={styles.essayItem}>
                <h2 className={styles.essayItemHeading}>
                  <Link href={urlPath}>{title}</Link>
                </h2>
                <p className={styles.essayItemDescription}>{description}</p>
                <time className={styles.essayItemTime} dateTime={date}>
                  {date}
                </time>
              </li>
            )
          })}
        </ul>
        {renderPagination()}
      </>
    )
  }

  function renderLoader() {
    return <div>Loading chips...</div>
  }

  return (
    <Layout>
      <h1>Essays</h1>
      {essays.length > 0 ? renderList() : renderLoader()}
    </Layout>
  )
}
