import { FetchEssaysResponse } from "types/essays"
import { useState, useEffect, Dispatch, SetStateAction } from "react"

interface FetchEssaysParameters {
  index: number
  setData: Dispatch<SetStateAction<FetchEssaysResponse>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsError: Dispatch<SetStateAction<boolean>>
  isError: boolean
}

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
}: FetchEssaysParameters) {
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
    body: JSON.stringify({ index }),
  })
    .then((res) => res.json())
    .then((payload: FetchEssaysResponse) => {
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

export function useFetchEssays(initialData: FetchEssaysResponse) {
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<FetchEssaysResponse>(initialData)

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
