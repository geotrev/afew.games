import cn from "classnames"
import styles from "./styles.module.scss"

export function EssayHeader({ title, description, date }) {
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
