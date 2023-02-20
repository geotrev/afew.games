import { ReactElement } from "react"
import propTypes from "prop-types"
import cn from "classnames"
import { EssayHeaderProps } from "./types"
import styles from "./styles.module.scss"

EssayHeader.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
}

export function EssayHeader({
  title,
  description,
  date,
}: EssayHeaderProps): ReactElement {
  return (
    <>
      <p className={styles.essayItemTimePara}>
        Published{" "}
        <time aria-labelledby="essay-heading" dateTime={date}>
          {date}
        </time>
      </p>
      <h1 id="essay-heading" className={styles.essayTitle}>
        {title}
      </h1>
      {description && (
        <p className={cn(styles.essayDescription, "text-lg")}>{description}</p>
      )}
      <h2>{"By George W."}</h2>
    </>
  )
}
