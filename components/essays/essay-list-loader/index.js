import cn from "classnames"
import styles from "./styles.module.scss"

export function EssayListLoader() {
  const placeholderIterator = Array(5).fill(null)

  return (
    <div>
      {placeholderIterator.map((_, idx) => {
        return (
          <div key={idx} className={styles.empyStateContainer}>
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
    </div>
  )
}
