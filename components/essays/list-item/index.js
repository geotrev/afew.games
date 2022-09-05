import cn from "classnames"
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
      <p className={cn(styles.essayItemTimePara, "text-xs")}>
        <time className={styles.essayItemTime} dateTime={date}>
          {date}
        </time>
      </p>
      <h2 className={cn(styles.essayItemHeading, "text-xl")}>
        <Link href={urlPath}>{title}</Link>
      </h2>
      <p className={styles.essayItemDescription}>{description}</p>
    </li>
  )
}
