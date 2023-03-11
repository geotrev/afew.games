import styled from "styled-components"

export const StyledCollectionList = styled.ul`
  display: grid;
  gap: 1rem;
  line-height: 1.5;
  margin-block-end: 2rem;

  &:last-child {
    margin-block-end: 0;
  }

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const StyledCollectionMinimizeBar = styled.hr`
  border-inline-start: 0;
  border-inline-end: 0;
  border-block-start: 0;
  border-block-end: 0.5rem solid
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25);
  margin-block-end: 3rem;
`

export const StyledPlatformHeading = styled.h2`
  font-size: 1.25rem;
`
