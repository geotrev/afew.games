import { useState, useEffect } from "react"

const PageMap = new Map()
const method = "POST"
const headers = { "Content-Type": "application/json" }
let initialLoad = true

function fetchEssays(pageIdx, setData, setIsLoading, setIsError, isError) {
  if (isError) {
    setIsError(false)
  }

  if (PageMap.has(pageIdx)) {
    return setData({ ...PageMap.get(pageIdx) })
  }

  setIsLoading(true)

  fetch("/api/essays", {
    method,
    headers,
    body: JSON.stringify({ pageIdx }),
  })
    .then((res) => res.json())
    .then((payload) => {
      setData(payload)
      setIsLoading(false)

      // cache the result locally.
      PageMap.set(pageIdx, payload)
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e)
      setIsError(true)
    })
}

export function useFetchEssays(initialData) {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (!initialLoad) return
    initialLoad = false
    PageMap.set(initialData.index, initialData)

    return () => {
      PageMap.clear()
      initialLoad = true
    }
  }, [initialData])

  return {
    isLoading,
    isError,
    data,
    setData: (pageIdx) =>
      fetchEssays(pageIdx, setData, setIsLoading, setIsError, isError),
  }
}
