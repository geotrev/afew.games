"use client"

import styled from "styled-components"
import { SubscribeForm } from "../subscribe-form"

const StyledFooter = styled.footer`
  margin: 1rem 0 2rem 0;
`

const StyledSubscribe = styled.div`
  border: 2px solid ${(p) => p.theme.colors.tertiary2};
  padding: 1rem;
  margin-block-end: 1rem;
`

const StyledHeader = styled.h2`
  margin-block-end: 0.5rem;
`

const StyledCopyrightNotice = styled.p`
  color: rgba(${(p) => p.theme.colors.triplets.text}, 0.7);
`

export function SiteFooter() {
  return (
    <StyledFooter>
      <StyledSubscribe>
        <StyledHeader>Subscribe to A Few Games!</StyledHeader>
        <p>
          Get occasional emails about game collecting. Unsubscribe at any time.
        </p>
        <SubscribeForm />
      </StyledSubscribe>
      <StyledCopyrightNotice className="text-xs">Copyright &copy; A Few Games</StyledCopyrightNotice>
    </StyledFooter>
  )
}
