import cn from "classnames"
import propTypes from "prop-types"
import { ReactElement } from "react"
import { CollectionItemMetadataProps } from "./types"
import styles from "./styles.module.scss"

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
      <dt
        className={cn(
          styles.collectionItemTitle,
          styles.collectionItemData,
          "text-sm"
        )}
      >
        {name}
      </dt>
      <dd className={cn(styles.collectionItemData, "text-sm")}>{value}</dd>
    </>
  )
}
