import cn from "classnames"
import propTypes from "prop-types"
import Link from "next/link"
import styles from "./styles.module.scss"

export function EssayListItem({ entry }) {
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
      <h2 className={cn(styles.essayItemHeading, "text-xl")} id={id}>
        <Link href={urlPath}>{title}</Link>
      </h2>
      <p className={styles.essayItemDescription}>{description}</p>
    </li>
  )
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
