import { memo, ReactElement } from "react"
import cn from "classnames"
import styles from "./styles.module.scss"

export function Component(): ReactElement<{}> {
  const placeholderIterator = Array(5).fill(null)

  return (
    <section aria-label="Loading essays">
      {placeholderIterator.map((_, idx) => {
        return (
          <div
            key={idx}
            aria-hidden="true"
            className={styles.empyStateContainer}
          >
            <div
              className={cn(
                styles.animateBg,
                styles.bgHeightSm,
                styles.bgNarrow,
                styles.metadataAnim
              )}
            >
              <div className={styles.bgMask}></div>
            </div>
            <div className={cn(styles.animateBg, styles.titleAnim)}>
              <div className={styles.bgMask}></div>
            </div>
            <div
              className={cn(
                styles.animateBg,
                styles.bgHeightMd,
                styles.descAnim
              )}
            >
              <div className={styles.bgMask}></div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export const EssayListLoader = memo(Component)
