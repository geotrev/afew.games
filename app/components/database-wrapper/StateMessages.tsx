import { Dots } from "@zendeskgarden/react-loaders"
import { getColor, IGardenTheme } from "@zendeskgarden/react-theming"
import { useTheme } from "styled-components"

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
  const theme = useTheme()

  if (isLoading) {
    return (
      <p className="mb-6 flex items-center justify-center gap-3">
        <Dots
          color={getColor({
            variable: "foreground.subtle",
            theme: theme as IGardenTheme,
          })}
        />
        <span>Fetching games...</span>
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
