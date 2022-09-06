import { omit } from "lodash-es"
import { CollectionItemMetadata } from "../collection-item-metadata"
import styles from "./styles.module.scss"

export function CollectionItem({ data }) {
  const metadata = Object.entries(omit(data, ["name"]))
  return (
    <li className={styles.collectionItem}>
      <h3 id={data.name}>{data.name}</h3>
      <dl
        className={styles.collectionItemDataList}
        aria-describedby={data.name}
      >
        {metadata.map(([name, value]) => (
          <CollectionItemMetadata key={name} name={name} value={value} />
        ))}
      </dl>
    </li>
  )
}
