import styled, { css, keyframes } from "styled-components"
import { SubscribeFormStatuses, SubscribeFormStates } from "utils/constants"

const { ERROR, LOADING, SUCCESS } = SubscribeFormStatuses

type FormStatus = { $status: SubscribeFormStates }
type StyledCallbackArgs = FormStatus & { theme: any }

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

function getInputStatusStyles(props: StyledCallbackArgs) {
  const values: Record<string, string> = {
    [LOADING]: `rgba(${props.theme.colors.triplets.primary}, 0.15)`,
    [ERROR]: "orangered",
  }

  return {
    borderBlockEndColor: values[props.$status],
    borderBlockEndWidth: "2px",
  }
}

function getMessageStatusStyles(props: StyledCallbackArgs) {
  if (props.$status === LOADING) {
    return {
      color: props.theme.colors.text,
    }
  } else if (props.$status === ERROR) {
    return {
      color: "orangered",
    }
  }
}

export const StyledFieldset = styled.fieldset`
  display: flex;
  align-items: stretch;
`

export const StyledSpinner = styled.span<FormStatus>`
  display: block;
  animation: ${(p) =>
    p.$status === LOADING &&
    css`
      ${spin} 1s infinite linear
    `};
`

export const StyledInput = styled.input<FormStatus>`
  color: white;
  appearance: none;
  font-size: 14px;
  border-radius: 4px;
  border: 2px solid transparent;
  margin-inline-end: 0.5rem;
  background: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.2);
  padding: 0.25rem 0.5rem;

  &:focus,
  &:hover {
    background: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.2);
    border-block-end-color: ${(p) => p.theme.colors.secondary1};
    border-block-end-width: 2px;
    outline: 0;
  }

  ${getInputStatusStyles}
`

export const StyledMessage = styled.p<FormStatus>`
  align-self: center;
  margin: 0;
  padding-inline-start: ${(p) => p.$status !== SUCCESS && "16px"};
  font-size: 0.75rem;

  ${getMessageStatusStyles}
`
