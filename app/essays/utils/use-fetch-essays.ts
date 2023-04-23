import { useState, useEffect } from "react"
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

  fetch(`/api/essays?page=${index}`, {
    method,
    headers,
    cache: "no-store",
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

  return {
    isLoading,
    isError,
    data,
    setPage: (index: number) => {
      fetchEssays({ index, setData, setIsLoading, setIsError, isError })
    },
  }
}
