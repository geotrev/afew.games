import { ReactElement } from "react"
import styles from "./styles.module.scss"
// import Logo from "./logo"

export function SiteFooter(): ReactElement {
  return (
    <footer className={styles.pageFooter}>
      <h2>Subscribe to A Few Games!</h2>
      <p>Get weekly emails with the newest essays. Unsubscribe at any time.</p>
      <form>
        <label>Email Address</label>
        <input />
        <button>Subscribe</button>
      </form>
    </footer>
  )
}
