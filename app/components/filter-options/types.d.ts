import { MouseEventHandler } from "react"
import { FilterItem } from "types/games"

export type FilterListProps = {
  searchValue: string
  filteredPlatforms: FilterItem[]
  handleClick: MouseEventHandler<HTMLButtonElement>
  handleReset: MouseEventHandler<HTMLButtonElement>
}
