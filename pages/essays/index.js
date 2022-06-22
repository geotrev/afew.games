import { useState, useEffect } from "react"
import Link from "next/link"

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

  function renderList() {
    return (
      <>
        <ul>
          {essays.map((entry) => {
            const {
              title,
              description,
              metadata: { urlPath, date, slug },
            } = entry

            return (
              <li key={slug}>
                <h3>
                  <Link href={urlPath}>{title}</Link>
                </h3>
                <p>{description}</p>
                <time dateTime={date}>{date}</time>
              </li>
            )
          })}
        </ul>
        <ul>
          <li>
            <button
              type="button"
              disabled={pageIdx === 0}
              onClick={goToPrevious}
            >
              {"<"}
            </button>
          </li>
          {Array(count)
            .fill(null)
            .map((_, idx) => {
              return (
                <li key={idx}>
                  <button
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
              type="button"
              disabled={lastPageIdx === pageIdx}
              onClick={goToNext}
            >
              {">"}
            </button>
          </li>
        </ul>
      </>
    )
  }

  function renderLoader() {
    return <div>Loading chips...</div>
  }

  return (
    <div>
      <h1>Essays</h1>
      {essays.length > 0 ? renderList() : renderLoader()}
    </div>
  )
}
