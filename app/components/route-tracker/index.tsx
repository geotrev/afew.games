"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { pageView } from "utils/page-view"

export function RouteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    pageView(window.location.href)
  }, [pathname])

  return null
}
