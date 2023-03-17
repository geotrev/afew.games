import propTypes from "prop-types"
import { ReactElement } from "react"
import { CollectionItemMetadataProps } from "./types"
import { StyledCollectionTitle, StyledCollectionDescriptor } from "./styled"

CollectionItemMetadata.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
}

export function CollectionItemMetadata({
  name,
  value,
}: CollectionItemMetadataProps): ReactElement {
  return (
    <>
      <StyledCollectionTitle className="text-sm">{name}</StyledCollectionTitle>
      <StyledCollectionDescriptor className="text-sm">
        {value}
      </StyledCollectionDescriptor>
    </>
  )
}
