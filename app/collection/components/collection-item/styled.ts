import styled from "styled-components"

export const StyledCollectionItem = styled.li`
  background-color: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.15);
  padding: 1rem;
`

export const StyledCollectionItemDataList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 0.5rem;
`
