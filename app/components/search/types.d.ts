import { ChangeEventHandler } from "react"

export type SearchProps = {
  label: string
  placeholder: string
  value?: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}
