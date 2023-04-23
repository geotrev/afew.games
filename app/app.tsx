"use client"

import { PropsWithChildren } from "react"
import styled, { ThemeProvider } from "styled-components"
import { SiteHeader } from "components/site-header"
import { SiteFooter } from "components/site-footer"
import { GlobalStyle } from "styles/globals"
import { theme } from "styles/theme"

const StyledApp = styled.div`
  padding: 0 1rem 1rem 1rem;
  margin: 0 auto;
  max-width: 800px;
`

const StyledMain = styled.main`
  padding-block-end: 1rem;
`

export function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <SiteHeader />
        <StyledMain>{children}</StyledMain>
        <SiteFooter />
      </StyledApp>
    </ThemeProvider>
  )
}
