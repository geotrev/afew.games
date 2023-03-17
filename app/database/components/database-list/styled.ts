import styled from "styled-components"

export const StyledDatabaseList = styled.ul`
  display: grid;
  gap: 1rem;
  line-height: 1.5;
  margin-block-end: 2rem;

  &:last-child {
    margin-block-end: 0;
  }
`

export const StyledDatabaseMinimizeBar = styled.hr`
  border-inline-start: 0;
  border-inline-end: 0;
  border-block-start: 0;
  border-block-end: 0.5rem solid
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25);
  margin-block-end: 3rem;
`

export const StyledGameHeading = styled.h3`
  font-weight: normal;
  margin-block-end: 2px;
`

export const StyledGameHeadingLabel = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: ${(p) => p.theme.colors.tertiary2};
`

export const StyledPlatformHeading = styled.h2`
  font-size: 1.25rem;
`
