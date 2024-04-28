interface StateMessagesProps {
  isLoading: boolean
  isError: boolean
  noMatches: boolean
  totalGameCount: number
}

export const StateMessages = ({
  isLoading,
  isError,
  noMatches,
  totalGameCount,
}: StateMessagesProps) => {
  if (isLoading) {
    return (
      <p className="align-center flex">
        <span className="loading" aria-hidden="true" />{" "}
        <span className="ps-2">Fetching games...</span>
      </p>
    )
  }

  if (isError) {
    return <p className="text-red-500">A search value is required.</p>
  }

  if (noMatches) {
    return <p>No matches found. Try another search.</p>
  }

  if (totalGameCount > 0) {
    return <p>Found {totalGameCount} matches</p>
  }

  return null
}
