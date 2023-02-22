import { PropsWithChildren } from "react"
import styles from "./styles.module.scss"

export function Layout({ children }: PropsWithChildren) {
  return <main className={styles.layoutContainer}>{children}</main>
}
