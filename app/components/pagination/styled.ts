import styled from "styled-components"

export const StyledPagination = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  justify-content: center;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`

export const StyledPageItemBreak = styled.div`
  flex-basis: 100%;

  @media (min-width: 640px) {
    flex-basis: 0;
  }
`
