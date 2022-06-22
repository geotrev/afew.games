import Script from "next/script"
import Link from "next/link"
import styles from "./styles.module.scss"

export default function Header() {
  return (
    <header className={styles.pageHeader}>
      <Script
        defer
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <p className={styles.pageHeading}>A few games...</p>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navListItem}>
            <Link href="/essays">Essays</Link>
          </li>
          <li className={styles.navListItem}>
            <Link href="/games">Games</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
