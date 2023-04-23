import styled, { css } from "styled-components"
import * as constants from "./constants"

type StyledButtonTransientProps = {
  $bare: boolean
  $selected: boolean
  $cornerStyle: string
  $size: string
}

function getVariantStyles(props: StyledButtonTransientProps) {
  if (props.$bare) {
    return css`
      &[aria-disabled] {
        cursor: not-allowed;
        color: ${(p) => p.theme.colors.tertiary2};
        background-color: none;
      }

      &:not([aria-disabled]) {
        background-color: rgba(${(p) => p.theme.colors.triplets.primary}, 0.25);

        &:hover {
          background-color: rgba(
            ${(p) => p.theme.colors.triplets.primary},
            0.35
          );
        }

        &:active {
          background-color: rgba(
            ${(p) => p.theme.colors.triplets.primary},
            0.25
          );
        }
      }
    `
  }

  return css`
    &[aria-disabled] {
      cursor: not-allowed;
      color: ${(p) => p.theme.colors.tertiary2};
      border-color: rgba(${(p) => p.theme.colors.triplets.primary}, 0.5);
    }

    &:not([aria-disabled]) {
      border: 2px solid rgba(${(p) => p.theme.colors.triplets.primary}, 0.8);

      &:hover {
        background-color: rgba(${(p) => p.theme.colors.triplets.primary}, 0.35);
      }

      &:active {
        background-color: rgba(${(p) => p.theme.colors.triplets.primary}, 0.25);
      }
    }
  `
}

function getSelectedStyles(props: StyledButtonTransientProps) {
  return (
    props.$selected &&
    css`
      &:not([aria-disabled]) {
        color: ${(p) => p.theme.colors.text};
        background-color: rgba(${(p) => p.theme.colors.triplets.primary}, 0.8);
        border-color: transparent;

        &:hover {
          background-color: rgba(
            ${(p) => p.theme.colors.triplets.primary},
            0.9
          );
          border-color: transparent;
        }

        &:active {
          background-color: rgba(
            ${(p) => p.theme.colors.triplets.primary},
            0.7
          );
          border-color: transparent;
        }
      }
    `
  )
}

function getSizeStyles(props: StyledButtonTransientProps) {
  if (props.$size === constants.SM) {
    return css`
      padding: 0.25rem 0.5rem;
    `
  } else if (props.$size === constants.MD) {
    return css`
      padding: 0.25rem;

      @media (min-width: 640px) {
        font-size: 16px;
        padding-block-start: 0.5rem;
        padding-block-end: 0.5rem;
      }
    `
  }
}

function getShapeStyles(props: StyledButtonTransientProps) {
  if (props.$cornerStyle === constants.SQUIRCLE) {
    return css`
      border-radius: 4px;
    `
  } else if (props.$cornerStyle === constants.ROUND) {
    return css`
      border-radius: 10rem;
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;
    `
  }
}

export const StyledButton = styled.button<StyledButtonTransientProps>`
  min-width: 2.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  font-family: ${(p) => p.theme.fonts.sans};
  font-size: 14px;
  font-weight: normal
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 1;

  ${getVariantStyles}
  ${getSelectedStyles}
  ${getSizeStyles}
  ${getShapeStyles}
`
