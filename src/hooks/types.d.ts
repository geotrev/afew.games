import { Dispatch, SetStateAction } from "react"
import { EssayPageData } from "types/essays"

export interface FetchEssaysArgs {
  index: number
  setData: Dispatch<SetStateAction<EssayPageData>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsError: Dispatch<SetStateAction<boolean>>
  isError: boolean
}
