import styled from "styled-components"

export const StyledEssayTitle = styled.h1`
  color: white;
  margin-block-end: 1rem;
  line-height: 1.2;
`

export const StyledEssayItemTimePara = styled.p`
  line-height: 1.5;
  margin-block-end: 0.5rem;
  color: ${(p) => p.theme.colors.tertiary1};
`

export const StyledEssayDescription = styled.p`
  font-size: 1.25rem;
  margin-block-end: 2rem;

  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-block-end: 3rem;
  }
`
