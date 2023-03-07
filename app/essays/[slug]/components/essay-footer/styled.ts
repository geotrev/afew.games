import styled from "styled-components"

export const StyledEssayFooter = styled.footer`
  color: rgba(${(p) => p.theme.colors.triplets.text}, 0.7);
  line-height: 1.5;
  margin-block-end: 1rem;

  em,
  italic,
  i {
    font-style: italic;
  }

  bold,
  b,
  strong {
    font-weight: bold;
  }
`
