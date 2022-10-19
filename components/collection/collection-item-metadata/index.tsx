import cn from "classnames"
import propTypes from "prop-types"
import { ReactElement } from "react"
import styles from "./styles.module.scss"

type CollectionItemMetadataProps = {
  name: string
  value: string
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

CollectionItemMetadata.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
}
