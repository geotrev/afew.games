"use client"

import { PropsWithChildren, Suspense } from "react"
import styled from "styled-components"
import cn from "classnames"
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"

const StyledContainer = styled.div<{ $base: "light" | "dark" }>`
  color-scheme: only ${(p) => p.$base};
`

export function App({ children }: PropsWithChildren) {
  const base = "dark"

  return (
    <ThemeProvider
      theme={{
        ...DEFAULT_THEME,
        colors: { ...DEFAULT_THEME.colors, base },
      }}
    >
      <Suspense>
        <StyledContainer
          $base={base}
          className={cn({
            "bg-grey-1100 text-grey-200": base === "dark",
            // "bg-white text-grey-1000": base === "light",
          })}
        >
          <div className="mx-auto mb-0 max-w-screen-md p-4 pt-8">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </StyledContainer>
      </Suspense>
    </ThemeProvider>
  )
}
