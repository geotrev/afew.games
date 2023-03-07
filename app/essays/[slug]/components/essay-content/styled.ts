import styled from "styled-components"

export const StyledEssayContent = styled.div`
  line-height: 2;
  max-width: 100%;

  p {
    line-height: 2;
  }

  h2 {
    font-size: 32px;
    margin-block-start: 3rem;
  }

  h3 {
    margin-block-start: 2rem;
    font-size: 24px;
  }

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

  code {
    font-family: monospace;
    background-color: ${(p) => p.theme.colors.tertiary2};
    border-radius: 2px;
  }

  pre {
    background-color: ${(p) => p.theme.colors.tertiary2};
    padding: 1rem;
    border-radius: 2px;
    word-break: break-word;
    white-space: normal;
    line-height: 1.5;

    code {
      background-color: transparent;
      border-radius: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    border: none;
    border-block-start: 1px solid ${(p) => p.theme.colors.primary2};
    margin: 3rem 0;
  }

  ul,
  ol {
    margin: 1rem 0 2rem 0;

    li {
      margin-inline-start: 1rem;
      padding-inline-start: 0.5rem;

      &:not(:last-child) {
        margin-block-end: 0.5rem;
      }
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    margin-block-end: 2rem;
    font-style: italic;
    padding-inline-start: 1.5rem;
    border-inline-start: 3px solid
      rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.2);
  }
`

export const StyledEssayBody = styled.div`
  > p:first-of-type::first-letter {
    font-family: Georgia, "Times New Roman", Times, serif;
    color: ${(p) => p.theme.colors.tertiary1};
    float: left;
    font-size: 4.5rem;
    padding: 0;
    box-sizing: border-box;
    margin: 0.65rem 0.75rem 0 0;
    line-height: 0.85;
  }
`
