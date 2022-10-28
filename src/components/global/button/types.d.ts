import { ButtonHTMLAttributes, PropsWithChildren } from "react"

interface ButtonApiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: string
  cornerType: string
  bare: boolean
  selected: boolean
}

export type ButtonProps = PropsWithChildren<ButtonApiProps>
