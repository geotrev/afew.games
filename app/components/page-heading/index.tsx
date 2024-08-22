"use client"

import { XXL } from "@zendeskgarden/react-typography"
import { PropsWithChildren } from "react"

export function PageHeading({ children }: PropsWithChildren) {
  return (
    <XXL className="mb-6" isBold>
      <span aria-hidden="true">./</span>
      {children}
    </XXL>
  )
}
