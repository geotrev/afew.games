import styles from "./styles.module.scss"

export function Layout({ children }) {
  return <div className={styles.layoutContainer}>{children}</div>
}
