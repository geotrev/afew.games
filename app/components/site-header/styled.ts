import Link from "next/link"
import styled from "styled-components"

export const StyledHeader = styled.header`
  padding: 1rem 0 3rem 0;
`

export const StyledLogoLink = styled(Link)`
  display: inline-block;
  max-width: 100px;
  height: auto;
  margin: 1rem 0 2rem 0;
`

export const StyledUL = styled.ul`
  display: flex;
  gap: 1rem;
`

export const StyledNavLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  font-weight: normal;
  padding-block-end: 0.5rem;
  text-decoration: none;
  border-block-end: ${(p) =>
    p.$isActive && `3px solid ${p.theme.colors.primary}`};

  &:hover {
    border-block-end: ${(p) =>
      !p.$isActive && `3px solid ${p.theme.colors.primaryAlt}`};
  }
`
