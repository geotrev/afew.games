import styled from "styled-components"

export const StyledEssayItem = styled.li`
  margin-block-end: 3rem;
`

export const StyledEssayItemHeading = styled.h2`
  font-size: 1.25rem;
  margin-block-end: 0.8rem;

  > a {
    color: ${(p) => p.theme.colors.text};
    text-decoration: none;

    &:hover {
      color: white;
    }
  }

  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-block-end: 1rem;
  }
`

export const StyledEssayItemTimePara = styled.p`
  margin-block-end: 0.5rem;
`

export const StyledEssayItemTime = styled.time`
  font-weight: bold;
  color: ${(p) => p.theme.colors.tertiary1};
`
