import { Dispatch, SetStateAction } from "react"

export type ListToolbarProps = {
  label: string
  pluralLabel: string
  itemsLength: number
  id: string
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}
