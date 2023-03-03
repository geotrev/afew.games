import { ComponentType } from "react"
import { PlatformRecord } from "app/types/games"

export type CollectionSearchProps = {
  listComponent: ComponentType<any>
  games: PlatformRecord[]
  queryData: Array<string[]>
}
