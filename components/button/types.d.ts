import { ButtonHTMLAttributes, PropsWithChildren } from "react"

interface IButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string
  cornerStyle?: string
  bare?: boolean
  selected?: boolean
}

export type GlobalButtonProps = PropsWithChildren<IButtonComponentProps>
