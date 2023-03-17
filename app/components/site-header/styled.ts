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

export const StyledHeaderList = styled.ul`
  display: flex;
  gap: 1rem;
`

export const StyledNavLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  font-weight: normal;
  padding-block-end: 0.5rem;
  text-decoration: none;
  border-block-end-style: solid;
  border-block-end-width: 3px;
  border-block-end-color: ${(p) =>
    p.$isActive ? p.theme.colors.secondary1 : "transparent"};

  &:hover {
    border-block-end-color: ${(p) => !p.$isActive && p.theme.colors.secondary2};
  }
`
