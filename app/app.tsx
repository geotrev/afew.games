"use client"

import React, { PropsWithChildren, Suspense, useEffect, useState } from "react"
import styled from "styled-components"
import cn from "classnames"
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { IThemeContext, ThemeContext } from "./theme-context"

const saveTheme = (value: IThemeContext["base"]) => {
  localStorage.setItem("afg__theme", value)
}

const getTheme = (): IThemeContext["base"] | null => {
  return localStorage.getItem("afg__theme") as IThemeContext["base"]
}

const StyledContainer = styled.div<{ $base: "light" | "dark" }>`
  color-scheme: only ${(p) => p.$base};

  &,
  *,
  * > * {
    transition:
      background-color 0.05s ease-in-out,
      color 0.05s ease-in-out,
      border-color 0.05s ease-in-out;
  }
`

export function App({ children }: PropsWithChildren) {
  const [base, setBase] = useState<IThemeContext["base"]>(getTheme() || "dark")

  useEffect(() => {
    saveTheme(base)
  }, [base])

  return (
    <ThemeContext.Provider value={{ base, setBase }}>
      <ThemeProvider
        theme={{
          ...DEFAULT_THEME,
          colors: { ...DEFAULT_THEME.colors, base },
        }}
      >
        <Suspense>
          <StyledContainer
            $base={base}
            className={cn("h-auto min-h-full w-screen", {
              "bg-grey-1100 text-grey-200": base === "dark",
              "bg-white text-grey-1000": base === "light",
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
    </ThemeContext.Provider>
  )
}
