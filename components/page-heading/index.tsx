import { PropsWithChildren } from "react"

export function PageHeading({ children }: PropsWithChildren) {
  return (
    <h1>
      <span aria-hidden="true">./</span>
      {children}
    </h1>
  )
}
