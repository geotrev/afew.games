import { FilterItem } from "types/games"

export type FilterListProps = {
  items: FilterItem[]
  searchValue: string
  filteredPlatforms: FilterItem[]
  handleClick: any
  handleReset: any
}
