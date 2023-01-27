import cn from "classnames"
import propTypes from "prop-types"
import Link from "next/link"
import styles from "./styles.module.scss"
import { Essay } from "types/essays"
import { ReactElement } from "react"

type EssayListItemProps = {
  entry: Essay
}

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
        <time
          className={styles.essayItemTime}
          dateTime={date}
          aria-describedby={id}
        >
          {date}
        </time>
      </p>
      <h2 className={styles.essayItemHeading} id={id}>
        <Link href={urlPath} legacyBehavior>{title}</Link>
      </h2>
      <p className={styles.essayItemDescription}>{description}</p>
    </li>
  );
}
