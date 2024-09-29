import { FilterItem } from "types/games"

export function getNextUrlState({
  searchValue,
  filteredPlatforms,
}: {
  searchValue: string
  filteredPlatforms: FilterItem[]
}): URL {
  const platformValues = filteredPlatforms
    .filter((item) => item.selected)
    .map((item) => item.value)

  const url = new URL(window.location.origin)

  if (searchValue) {
    url.searchParams.set("search", searchValue)
  } else if (url.searchParams.has("search")) {
    url.searchParams.delete("search")
  }

  if (platformValues.length > 0) {
    platformValues.forEach((p) => url.searchParams.append("platform", p))
  } else if (url.searchParams.has("platform")) {
    url.searchParams.delete("platform")
  }

  return url
}
