import { SubscribeForm } from "../subscribe-form"
import styles from "./styles.module.scss"

export function SiteFooter() {
  return (
    <footer className={styles.pageFooter}>
      <h2 className={styles.subscribeHeader}>Subscribe to A Few Games!</h2>
      <p>
        Get occasional emails about game collecting. Unsubscribe at any time.
      </p>
      <SubscribeForm />
    </footer>
  )
}
