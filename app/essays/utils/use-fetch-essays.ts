import { useState, useEffect, useMemo, useCallback } from "react"
import { EssayPageData } from "types/essays"
import { FetchEssaysArgs } from "./types"

const PageMap = new Map()
const method = "POST"
const headers = { "Content-Type": "application/json" }
let initialLoad = true

function fetchEssays({
  index,
  setData,
  setIsLoading,
  setIsError,
  isError,
}: FetchEssaysArgs) {
  if (isError) {
    setIsError(false)
  }

  if (PageMap.has(index)) {
    return setData({ ...PageMap.get(index) })
  }

  setIsLoading(true)

  fetch("/api/essays", {
    method,
    headers,
    cache: "no-store",
    body: JSON.stringify({ page: index }),
  })
    .then((res) => res.json())
    .then((payload: EssayPageData) => {
      setData(payload)
      setIsLoading(false)

      // cache the result locally.
      PageMap.set(index, payload)
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e)
      setIsError(true)
    })
}

export function useFetchEssays(initialData: EssayPageData) {
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<EssayPageData>(initialData)

  useEffect(() => {
    if (!initialLoad) return
    initialLoad = false
    PageMap.set(initialData.index, initialData)

    return () => {
      PageMap.clear()
      initialLoad = true
    }
  }, [initialData])

  const setPage = useCallback(
    (index: number) => {
      fetchEssays({ index, setData, setIsLoading, setIsError, isError })
    },
    [isError]
  )

  return useMemo(
    () => ({
      isLoading,
      isError,
      data,
      setPage,
    }),
    [isLoading, isError, data, setPage]
  )
}
