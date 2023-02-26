import { Dispatch, SetStateAction } from "react"
import { EssayPageData } from "app/types/essays"

export type FetchEssaysArgs = {
  index: number
  setData: Dispatch<SetStateAction<EssayPageData>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsError: Dispatch<SetStateAction<boolean>>
  isError: boolean
}
