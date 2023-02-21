import { PropsWithChildren } from "react"
import styles from "./styles.module.scss"

export function Layout({ children }: PropsWithChildren) {
  return <div className={styles.layoutContainer}>{children}</div>
}
