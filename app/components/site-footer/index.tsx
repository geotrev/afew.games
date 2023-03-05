"use client"

import styled from "styled-components"
import { SubscribeForm } from "../subscribe-form"

const StyledFooter = styled.footer`
  border: 2px solid ${(p) => p.theme.colors.tertiaryAlt};
  margin: 1rem 0 2rem 0;
  padding: 1rem;
  text-align: center;
`

const StyledHeader = styled.h2`
  margin-block-end: 0.5rem;
`

export function SiteFooter() {
  return (
    <StyledFooter>
      <StyledHeader>Subscribe to A Few Games!</StyledHeader>
      <p>
        Get occasional emails about game collecting. Unsubscribe at any time.
      </p>
      <SubscribeForm />
    </StyledFooter>
  )
}
