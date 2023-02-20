import Link from "next/link"
import { ReactElement } from "react"
import propTypes from "prop-types"
import cn from "classnames"
import { EssayListItemProps } from "./types"
import styles from "./styles.module.scss"

EssayListItem.propTypes = {
  entry: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    metadata: propTypes.shape({
      urlPath: propTypes.string,
      date: propTypes.string,
    }),
  }).isRequired,
}

export function EssayListItem({ entry }: EssayListItemProps): ReactElement {
  const {
    title,
    description,
    metadata: { urlPath, date },
  } = entry
  const id = `${title.split(" ").join("-").slice(0, 16)}`

  return (
    <li className={styles.essayItem}>
      <p className={cn(styles.essayItemTimePara, "text-xs")}>
        <time className={styles.essayItemTime} dateTime={date} id={id}>
          {date}
        </time>
      </p>
      <h2 className={styles.essayItemHeading} aria-describedby={id}>
        <Link href={urlPath} legacyBehavior>
          {title}
        </Link>
      </h2>
      <p className={styles.essayItemDescription}>{description}</p>
    </li>
  )
}
