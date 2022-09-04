import classNames from "classnames"
import Link from "next/link"
import styles from "./styles.module.scss"

export function ListItem({ entry }) {
  const {
    title,
    description,
    metadata: { urlPath, date },
  } = entry

  return (
    <li className={styles.essayItem}>
      <p className={classNames(styles.essayItemTimePara, "text-xs")}>
        <time className={styles.essayItemTime} dateTime={date}>
          {date}
        </time>
      </p>
      <h2 className={classNames(styles.essayItemHeading, "text-xl")}>
        <Link href={urlPath}>{title}</Link>
      </h2>
      <p className={styles.essayItemDescription}>{description}</p>
    </li>
  )
}
