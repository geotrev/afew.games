"use client"

import { PropsWithChildren, Suspense } from "react"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming"

export function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      theme={{
        ...DEFAULT_THEME,
        colors: { ...DEFAULT_THEME.colors, base: "dark" },
      }}
    >
      <Suspense>
        <div className="mx-auto mb-0 max-w-screen-md p-4 pt-8">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </Suspense>
    </ThemeProvider>
  )
}
