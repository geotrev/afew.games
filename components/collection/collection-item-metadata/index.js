import cn from "classnames"
import propTypes from "prop-types"
import styles from "./styles.module.scss"

export function CollectionItemMetadata({ name, value }) {
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
