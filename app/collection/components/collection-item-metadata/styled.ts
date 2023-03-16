import styled, { css } from "styled-components"

const CssDataItem = css`
  padding: 0.25rem 0.5rem;
  border-block-end: 1px solid
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25);
`

export const StyledCollectionDescriptor = styled.dd`
  ${CssDataItem}
`

export const StyledCollectionTitle = styled.dt`
  ${CssDataItem}

  text-align: end;
  font-weight: bold;
  text-transform: capitalize;
  background-color: rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25);
  border-block-end-color: transparent;
`
