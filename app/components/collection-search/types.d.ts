import { ComponentType } from "react"
import { PlatformRecord } from "app/types/games"

export type CollectionSearchProps = {
  label: string
  placeholder: string
  listComponent: ComponentType<any>
  games: PlatformRecord[]
  queryData: Array<string[]>
}
