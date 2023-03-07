import { css } from "styled-components"

export const html = css`
  html,
  body {
    font-family: ${(p) => p.theme.fonts.sans};
    background-color: ${(p) => p.theme.colors.backgroundColor};
    color: ${(p) => p.theme.colors.text};
  }

  a {
    color: rgba(${(p) => p.theme.colors.triplets.text}, 0.7);
    font-weight: bold;

    &:hover {
      color: ${(p) => p.theme.colors.text};
    }
  }

  p {
    line-height: 1.5;
    margin-block-start: 0;
    margin-block-end: 1rem;
  }

  button {
    color: ${(p) => p.theme.colors.text};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: 0;
    font-weight: bold;
  }

  h1 {
    line-height: 1.2;
    font-size: 34px;
    margin-block-end: 2rem;

    @media (min-width: 640px) {
      font-size: 44px;
      margin-block-end: 3rem;
    }
  }

  h2 {
    line-height: 1.2;
    margin-block-end: 1.15rem;
  }

  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2;
    margin-block-end: 1rem;
  }

  // Tables

  table {
    margin-block-end: 2rem;
    border-spacing: 0.5rem;
    border-collapse: separate;
    background: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.15);
    font-size: 14px;
    width: 100%;
    max-width: 100%;

    th,
    td {
      padding: 0.25rem 0.5rem;
    }

    th {
      font-weight: bold;
      text-align: start;
    }

    td {
      background-color: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25);
    }
  }
`
