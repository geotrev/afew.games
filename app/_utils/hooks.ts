import { useCallback, useEffect, useMemo, useState } from "react"
import { DatabasePlatform, FilterItem } from "@/app/types"

interface UseFetchGamesReturnValue {
  query: (value: string) => void
  noMatches: boolean
  isLoading: boolean
  isError: boolean
  games: DatabasePlatform[]
}

export function useFetchGames(initialValue?: string): UseFetchGamesReturnValue {
  const [noMatches, setNoMatches] = useState<boolean>(false)
  const [games, setGames] = useState<DatabasePlatform[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const query = useCallback<UseFetchGamesReturnValue["query"]>(
    async (value) => {
      if (!value) {
        setIsError(true)

        return
      }

      setIsLoading(true)
      setIsError(false)
      setNoMatches(false)

      await fetch("/api/search-games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ value }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setGames(data.matches)

            if (data.matches.length === 0) {
              setNoMatches(true)
            }
          }

          if (data.status === "error") {
            setIsError(true)
          }

          setIsLoading(false)
        })
        .catch(() => {
          setIsError(true)
          setIsLoading(false)
        })
    },
    []
  )

  useEffect(() => {
    if (!initialValue) return

    query(initialValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(
    () => ({
      games,
      query,
      noMatches,
      isError,
      isLoading,
    }),
    [games, query, noMatches, isError, isLoading]
  )
}

export function useFilter({
  platformQuery,
  platformList,
}: {
  platformQuery: string[]
  platformList: string[]
}) {
  const [filteredPlatforms, setFilteredPlatforms] = useState<FilterItem[]>(
    platformList.map((p: string) => ({
      value: p,
      selected: platformQuery.indexOf(p.toLowerCase()) > -1,
    }))
  )
  const noneSelected: boolean = filteredPlatforms.every((p) => !p.selected)

  return useMemo(
    () => ({
      setFilteredPlatforms,
      filteredPlatforms,
      noneSelected,
    }),
    [setFilteredPlatforms, filteredPlatforms, noneSelected]
  )
}
