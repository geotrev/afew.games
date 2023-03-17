import styled from "styled-components"

export const StyledSearchContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 0 1rem 0;
`

export const StyledSearchLabel = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  margin-block-end: 1rem;
`

export const StyledSearchInput = styled.input`
  outline: none;
  appearance: none;
  font-size: 14px;
  border: 2px solid ${(p) => p.theme.colors.secondary2};
  background-color: transparent;
  color: #ddd;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;

  &:focus,
  &:hover {
    border-color: ${(p) => p.theme.colors.secondary1};
  }

  &::-webkit-search-cancel-button {
    cursor: pointer;
    margin-left: 1rem;
  }

  @media (min-width: 640px) {
    font-size: 18px;
    padding: 0.75rem 1rem;
  }
`
