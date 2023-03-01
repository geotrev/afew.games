import { ChangeEventHandler } from "react"

export type SearchProps = {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}
