import styled from "styled-components"

export const StyledPagination = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  justify-content: center;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`
export const StyledPageItemBreak = styled.li`
  flex-basis: 100%;

  @media (min-width: 640px) {
    flex-basis: 0;
  }
`
