import styled from "styled-components"

export const StyledFilterList = styled.div`
  margin-block-end: 3rem;
`

export const StyledFilterListItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;
  margin-block-end: 1rem;

  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`

export const StyledFilterListReset = styled.div`
  display: flex;
  gap: 0.25rem;

  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`

export const StyledFilterListToggle = styled.div`
  display: block;
  margin-block-end: 1rem;

  @media (min-width: 640px) {
    display: none;
  }
`

export const StyledFilterControls = styled.div<{ $hidden: boolean }>`
  display: ${(p) => (p.$hidden ? "none" : "block")};

  @media (min-width: 640px) {
    display: block;
  }
`
