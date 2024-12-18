"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { pageView } from "@/src/app/_utils/helpers"

export function RouteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    pageView(window.location.href)
  }, [pathname])

  return null
}
