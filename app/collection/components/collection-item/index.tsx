import { omit } from "lodash-es"
import propTypes from "prop-types"
import { ReactElement } from "react"
import { CollectionItemMetadata } from "../collection-item-metadata"
import { CollectionItemProps } from "./types"
import { StyledCollectionItem, StyledCollectionItemDataList } from "./styled"

CollectionItem.propTypes = {
  data: propTypes.shape({
    name: propTypes.string,
    variant: propTypes.string,
    grade: propTypes.string,
    grader: propTypes.oneOf(["Wata", "VGA", "CGC", "P1G"]),
  }),
}

export function CollectionItem({ data }: CollectionItemProps): ReactElement {
  const metadata = Object.entries(omit(data, ["name"]))
  return (
    <StyledCollectionItem>
      <h3 id={data.name}>{data.name}</h3>
      <StyledCollectionItemDataList aria-describedby={data.name}>
        {metadata.map(([name, value]) => (
          <CollectionItemMetadata key={name} name={name} value={value} />
        ))}
      </StyledCollectionItemDataList>
    </StyledCollectionItem>
  )
}
